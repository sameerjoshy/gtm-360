from datetime import datetime
from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

# --- 2.2 Evidence Contract (Source of Truth) ---
class EvidenceItem(BaseModel):
    evidence_id: str
    domain: str
    source_type: str = Field(..., description="HOMEPAGE|CAREERS|NEWS|BLOG|DOC|TECH_DETECT|OTHER")
    url: str
    retrieved_at: datetime
    extract_method: str = "requests"
    excerpt: Optional[str] = None
    reliability: str = "MED" # HIGH|MED|LOW

# --- 2.3 Signal Structure ---
class Signal(BaseModel):
    signal_type: str = Field(..., description="EXEC_HIRE|FUNDING|TECH_STACK|GTM_TOOLING|PARTNER|EXPANSION|COMPLIANCE|PRODUCT_LAUNCH")
    label: str
    value: str
    confidence: float
    evidence_ids: List[str] = []

# --- 2.4 Account Dossier (The Output) ---
class Firmographics(BaseModel):
    company_name: Optional[str] = None
    hq_location: Optional[str] = None
    employee_range: Optional[str] = None
    industry: Optional[str] = None

class Positioning(BaseModel):
    one_liner: Optional[str] = None
    category: Optional[str] = None
    ideal_customer: Optional[str] = None

class GTMDiagnosis(BaseModel):
    fit_tier: str = "C" # A|B|C|D
    diagnosis_label: Optional[str] = None
    reasoning_bullets: List[str] = []
    confidence: float = 0.0
    evidence_ids: List[str] = []

class MetaInfo(BaseModel):
    config_id: str
    generated_at: datetime
    version: str = "dossier_v1"

class AccountDossier(BaseModel):
    domain: str
    record_id: Optional[str] = None
    firmographics: Firmographics = Field(default_factory=Firmographics)
    positioning: Positioning = Field(default_factory=Positioning)
    signals: List[Signal] = []
    gtm_diagnosis: GTMDiagnosis = Field(default_factory=GTMDiagnosis)
    hypotheses: List[Any] = [] # Flexible for now, or define strict Hypothesis model
    meta: MetaInfo

# --- 2.1 Research Config (Context) ---
class RefreshPolicy(BaseModel):
    ttl_days: int = 14
    force_refresh_signals: List[str] = ["FUNDING", "EXEC_HIRE"]

class ResearchConfig(BaseModel):
    config_id: str
    proposition: str
    persona: str
    icp_ruleset_id: str
    refresh_policy: RefreshPolicy = Field(default_factory=RefreshPolicy)
    crm_update_mode: str = "suggest"

# --- Run State for LangGraph ---
class ResearcherState(BaseModel):
    domain: str
    record_id: Optional[str] = None
    config: ResearchConfig
    
    # Accumulators
    evidence_items: List[EvidenceItem] = []
    dossier: Optional[AccountDossier] = None
    status: str = "IDLE" 
