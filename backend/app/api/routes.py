import asyncio
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from app.models.contracts import ResearcherState, ResearchConfig, AccountDossier
from app.agents.graph import ResearcherGraph

router = APIRouter()

class RunResearchRequest(BaseModel):
    domain: str
    config: ResearchConfig

@router.post("/run", response_model=AccountDossier)
async def run_research_mission(request: RunResearchRequest):
    """
    Triggers the Researcher Agent Graph.
    """
    domain = request.domain
    config = request.config
    
    print(f"🚀 Starting Mission: Research {domain} for {config.persona}")
    
    # Initialize Graph
    agent = ResearcherGraph()
    app = agent.compile()
    
    # Initialize State
    initial_state = ResearcherState(
        domain=domain,
        config=config,
        status="STARTING"
    )
    
    # Run Graph (Await execution)
    # in production, this should be a background job (Celery/Arq)
    # but for v1, we await it to return the result immediately to the UI
    try:
        final_state = await app.ainvoke(initial_state)
        return final_state["dossier"]
    except Exception as e:
        print(f"❌ Mission Failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
