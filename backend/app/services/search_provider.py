from typing import List, Protocol
from pydantic import BaseModel

# --- Inteface ---
class SearchResult(BaseModel):
    url: str
    title: str
    content: str
    score: float

class SearchProvider(Protocol):
    async def search(self, query: str, max_results: int = 5) -> List[SearchResult]:
        ...

# --- Implementation: Tavily (Free Tier) ---
import os
import httpx

class TavilySearchProvider:
    def __init__(self):
        self.api_key = os.getenv("TAVILY_API_KEY")
        self.base_url = "https://api.tavily.com/search"

    async def search(self, query: str, max_results: int = 5) -> List[SearchResult]:
        if not self.api_key:
            print("[WARN] No TAVILY_API_KEY found. Returning mock data.")
            return [SearchResult(url="https://example.com", title="Mock Result", content="Mock Content", score=1.0)]

        payload = {
            "api_key": self.api_key,
            "query": query,
            "search_depth": "basic",
            "max_results": max_results
        }
        
        async with httpx.AsyncClient() as client:
            resp = await client.post(self.base_url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            
            return [
                SearchResult(
                    url=r.get("url"),
                    title=r.get("title"),
                    content=r.get("content"),
                    score=r.get("score")
                ) for r in data.get("results", [])
            ]
