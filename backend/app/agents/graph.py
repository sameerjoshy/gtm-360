from datetime import datetime
from langgraph.graph import StateGraph, END
from app.models.contracts import ResearcherState, EvidenceItem, AccountDossier
from app.services.fetcher import Fetcher
from app.services.search_provider import TavilySearchProvider

class ResearcherGraph:
    def __init__(self):
        self.fetcher = Fetcher()
        self.search = TavilySearchProvider()
        
    async def collect_sources(self, state: ResearcherState):
        """Node 1: Gather raw URLs from Search + Homepage"""
        print(f"🕵️ Collecting components for {state.domain}...")
        
        # 1. Homepage
        homepage_url = f"https://{state.domain}"
        
        # 2. Search Queries
        queries = [
            f'site:{state.domain} "careers" OR "jobs"',
            f'site:{state.domain} "pricing"',
            f'"{state.domain}" funding news',
            f'"{state.domain}" tech stack'
        ]
        
        found_urls = [homepage_url]
        for q in queries:
            results = await self.search.search(q, max_results=1)
            if results:
                found_urls.append(results[0].url)
        
        # Dedupe
        unique_urls = list(set(found_urls))
        print(f"🔗 Found {len(unique_urls)} unique sources: {unique_urls}")
        
        # Create EvidenceItems (Empty content for now, fetched in next step)
        new_evidence = []
        for i, url in enumerate(unique_urls):
            new_evidence.append(EvidenceItem(
                evidence_id=f"ev_{int(datetime.now().timestamp())}_{i}",
                domain=state.domain,
                source_type="HOMEPAGE" if url == homepage_url else "SEARCH",
                url=url,
                retrieved_at=datetime.now(),
                reliability="MED"
            ))
            
        state.evidence_items = new_evidence
        state.status = "COLLECTING"
        return state

    async def extract_facts(self, state: ResearcherState):
        """Node 2: Visit URLs and extract text"""
        print(f"📥 Extracting facts from {len(state.evidence_items)} sources...")
        
        for item in state.evidence_items:
            data = await self.fetcher.fetch(item.url)
            if data["status"] == "success":
                # Truncate for token limits (simple logic for now)
                item.excerpt = data["content"][:5000] 
                item.extract_method = data.get("method", "requests")
            else:
                item.excerpt = "Failed to fetch"
                item.reliability = "LOW"
                
        state.status = "EXTRACTING"
        return state

    async def score_fit(self, state: ResearcherState):
        """Node 3: Analyze extracted text to score fit (LLM AI)"""
        print("🧠 Scoring fit using Gemini 1.5 Flash...")
        
        # 1. Initialize LLM
        # Use a cheaper/faster model for this task
        from langchain_google_genai import ChatGoogleGenerativeAI
        from langchain_core.messages import HumanMessage
        from app.agents.prompts import FIT_SCORING_PROMPT
        from app.core.config import settings
        import json

        if not settings.GOOGLE_API_KEY:
            print("⚠️ No GOOGLE_API_KEY found. Falling back to mock scoring.")
            # ... keep mock logic or simple rule-based ...
            dossier = AccountDossier(
                domain=state.domain,
                meta={"config_id": state.config.config_id, "generated_at": datetime.now(), "version": "v1-mock"}
            )
            dossier.gtm_diagnosis.diagnosis_label = "Key Missing: Google API Key"
            state.dossier = dossier
            state.status = "SCORING_SKIPPED"
            return state

        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash", 
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.0
        )

        # 2. Prepare Context
        # Aggregate evidence text
        evidence_text = "\n\n".join([
            f"SOURCE ({e.source_type} - {e.url}):\n{e.excerpt[:2000]}" 
            for e in state.evidence_items 
            if e.excerpt
        ])

        # 3. Call LLM
        prompt = FIT_SCORING_PROMPT.format(
            icp_ruleset=state.config.icp_ruleset_id, # Should be detailed text in future
            signals=evidence_text # We pass raw evidence as signals for now
        )
        
        try:
            # We ask for JSON_MODE (supported by Gemini)
            result = await llm.ainvoke(
                [HumanMessage(content=prompt)],
                config={"configurable": {"response_mime_type": "application/json"}} 
            )
            
            # 4. Parse JSON
            # Clean possible markdown fencing
            content = result.content.replace('```json', '').replace('```', '')
            data = json.loads(content)
            
            # 5. Hydrate Dossier
            dossier = AccountDossier(
                domain=state.domain,
                record_id=state.record_id,
                meta={
                    "config_id": state.config.config_id,
                    "generated_at": datetime.now(),
                    "version": "dossier_v1"
                }
            )
            dossier.gtm_diagnosis.fit_tier = data.get("fit_tier", "C")
            dossier.gtm_diagnosis.diagnosis_label = data.get("diagnosis_label", "Analyzed")
            dossier.gtm_diagnosis.reasoning_bullets = data.get("reasoning_bullets", [])
            dossier.gtm_diagnosis.confidence = data.get("confidence", 0.0)
            
            # Map evidence IDs (Future: Validate they exist)
            
            state.dossier = dossier
            state.status = "SCORING_COMPLETE"
            
        except Exception as e:
            print(f"❌ LLM Error: {e}")
            # Fallback
            state.status = "SCORING_FAILED"

        return state

    def compile(self):
        workflow = StateGraph(ResearcherState)
        
        workflow.add_node("collect", self.collect_sources)
        workflow.add_node("extract", self.extract_facts)
        workflow.add_node("score", self.score_fit)
        
        workflow.set_entry_point("collect")
        workflow.add_edge("collect", "extract")
        workflow.add_edge("extract", "score")
        workflow.add_edge("score", END)
        
        return workflow.compile()
