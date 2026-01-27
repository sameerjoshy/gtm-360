import httpx
import random
from typing import Optional, Dict

class Fetcher:
    """
    Robust HTTP Client for the Researcher Agent.
    Features: User-Agent rotation, Timeout handling, Jina Reader fallback.
    """
    
    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ]

    def __init__(self):
        self.client = httpx.AsyncClient(timeout=10.0, follow_redirects=True)

    async def fetch(self, url: str) -> Dict[str, str]:
        """
        Attempts to fetch a URL. Returns dict with 'content', 'status', 'method'.
        """
        headers = {"User-Agent": random.choice(self.USER_AGENTS)}
        
        try:
            # 1. Direct Request
            print(f"🌐 Fetching {url}...")
            resp = await self.client.get(url, headers=headers)
            
            if resp.status_code == 200:
                return {
                    "content": resp.text,
                    "status": "success", 
                    "method": "direct",
                    "url": str(resp.url)
                }
            
            # 2. Fallback: Jina Reader (Free Markdown Proxy)
            # Used when sites block bots or possess complex JS
            if resp.status_code in [403, 401, 503]:
                print(f"⚠️ Direct access blocked ({resp.status_code}). Trying Jina Reader Proxy...")
                return await self._fetch_via_jina(url)
                
            return {"content": "", "status": "error", "error_code": resp.status_code}
            
        except Exception as e:
            print(f"❌ Error fetching {url}: {e}. Trying Fallback...")
            return await self._fetch_via_jina(url)

    async def _fetch_via_jina(self, url: str) -> Dict[str, str]:
        """
        Uses https://r.jina.ai/ to get a clean Markdown representation of the page.
        """
        jina_url = f"https://r.jina.ai/{url}"
        try:
            resp = await self.client.get(jina_url)
            if resp.status_code == 200:
                 return {
                    "content": resp.text,
                    "status": "success",
                    "method": "jina_proxy",
                    "url": url
                }
            return {"content": "", "status": "error", "error_code": resp.status_code}
        except Exception as e:
            return {"content": "", "status": "error", "error_msg": str(e)}

    async def close(self):
        await self.client.aclose()
