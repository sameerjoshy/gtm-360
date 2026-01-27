import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const transparencyContent = `
# Agent Transparency & FAQ

## 🤖 The Researcher Agent (v1)

### What does this agent actually do?
The Researcher Agent behaves like a **Junior RevOps Analyst**. It does not "guess"; it follows a strict procedure to gather evidence and form a diagnosis.

### 🧠 How it thinks (The Logic)
1.  **Collection**: It visits the company's Homepage, Careers Page, and searches for recent Funding News using specific search operators (e.g., \`site:linkedin.com "Acme" funding\`).
2.  **Extraction**: It reads the raw text from these pages, stripping away ads and navigation menus.
3.  **Analysis**: It uses **Google Gemini 1.5 Pro** to compare the evidence against your **ICP Ruleset**.
4.  **Veto**: Any claim (e.g., "They are Series B") is **rejected** unless the agent can link it to a specific URL (Source of Truth).

### 🛡️ Safety Protocols
*   **Read-Only on External Sites**: The agent never fills out forms or logs into external sites.
*   **Suggestion Mode**: By default, the agent **cannot** overwrite your CRM data. It creates a "Suggested Update" that you must approve.
*   **Hallucination Check**: We enforce a "Source Citation" rule. If the AI cannot find a URL for a fact, it is downgraded to a "Hypothesis" (Low Confidence).

### ❓ Frequently Asked Questions

**Q: Can I trust the "Fit Tier" score?**
A: The score is a recommendation based on *publicly available signals*. It is 80% accurate for detecting "Growth Signals" (Hiring, Funding) but may miss private context (e.g., internal restructuring). Always verify before sending a high-stakes email.

**Q: Does it see my private Email/Slack?**
A: **No.** The Researcher Agent only has access to:
1.  The Domain URL you provide.
2.  Public Internet Data.
3.  The specific CRM Fields you allow it to read.

**Q: Why did it miss a funding round?**
A: The agent relies on search engines (Tavily/Google). If the news is very recent (last 24h) or behind a paywall (WSJ), the agent might miss it. You can manually add a source URL to help it correct itself.
`;

const AgentTransparency = () => {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 max-w-4xl mx-auto my-8 shadow-sm">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {transparencyContent}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default AgentTransparency;
