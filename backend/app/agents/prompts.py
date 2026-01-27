from langchain_core.prompts import PromptTemplate

# --- 1. Signal Extraction Prompt ---
SIGNAL_EXTRACTION_PROMPT = """
You are an expert Revenue Operations Analyst.
Your task is to analyze the following text from {domain} and extract specific GTM SIGNALS.

CONTEXT:
We are selling: {proposition}
Target Persona: {persona}

RULES:
1. Only extract signals that are HIGHLY RELEVANT to our proposition.
2. Signal Types allowed: EXEC_HIRE, FUNDING, TECH_STACK, GTM_TOOLING, PARTNER, EXPANSION.
3. Citation is MANDATORY. You must attribute every signal to a specific Evidence ID provided in the context if possible, or leave evidence_ids empty if inferred (but lower confidence).

INPUT TEXT:
{text_content}

OUTPUT SCHEMA (JSON):
Return a list of Signal objects:
[
  {{
    "signal_type": "EXEC_HIRE",
    "label": "Hiring VP Sales",
    "value": "VP Sales",
    "confidence": 0.9,
    "evidence_ids": ["ev_..."]
  }}
]
"""

# --- 2. Fit Scoring Prompt ---
FIT_SCORING_PROMPT = """
Analyze the following Account Dossier and determine the 'Fit Tier' (A, B, C, D).

CONTEXT:
ICP Definition: {icp_ruleset}

DOSSIER SIGNALS:
{signals}

DIAGNOSIS INSTRUCTIONS:
- Tier A: Perfect Match. Has Budget (Funding), Intent (Hiring), and Tech fit.
- Tier B: Good Match. Missing one key signal.
- Tier C: Low Match. Too small or wrong industry.
- Tier D: Disqualified. Competitor or unrelated.

OUTPUT SCHEMA (JSON):
{{
  "fit_tier": "A",
  "diagnosis_label": "High Fit - Scaling Pain",
  "reasoning_bullets": ["Reason 1", "Reason 2"],
  "confidence": 0.8
}}
"""
