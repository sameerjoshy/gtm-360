import os
import httpx
from typing import Optional, Dict, Any

class HubSpotService:
    def __init__(self):
        self.access_token = os.getenv("HUBSPOT_ACCESS_TOKEN")
        self.base_url = "https://api.hubapi.com/crm/v3/objects"
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

    async def get_company_by_domain(self, domain: str) -> Optional[Dict[str, Any]]:
        if not self.access_token:
            return None # Mock mode or error
            
        # Search endpoint
        url = "https://api.hubapi.com/crm/v3/objects/companies/search"
        payload = {
            "filterGroups": [{
                "filters": [{
                    "propertyName": "domain",
                    "operator": "EQ",
                    "value": domain
                }]
            }],
            "properties": ["name", "domain", "city", "description", "industry"]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=self.headers, json=payload)
            if response.status_code == 200:
                results = response.json().get('results')
                return results[0] if results else None
            return None

    async def update_company(self, company_id: str, properties: Dict[str, str]):
        if not self.access_token:
            print(f"[MOCK] Would update Company {company_id} with {properties}")
            return
            
        url = f"{self.base_url}/companies/{company_id}"
        async with httpx.AsyncClient() as client:
            await client.patch(url, headers=self.headers, json={"properties": properties})
