import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const swarms = [
    {
        id: 'outbound-swarm',
        title: 'Outbound Motion',
        color: 'bg-blue-50 border-blue-200',
        icon: '🚀',
        agents: [
            { id: 'researcher', name: 'Contact Enrichment', role: 'Deep Research & Scraping', status: 'ACTIVE' },
            { id: 'sniper', name: 'Multi-Channel Outbound', role: 'Email & LinkedIn Seq', status: 'PLANNED' },
            { id: 'scraper', name: 'Contact Data Scraping', role: 'List Building', status: 'PLANNED' }
        ]
    },
    {
        id: 'inbound-swarm',
        title: 'Inbound & Content',
        color: 'bg-purple-50 border-purple-200',
        icon: '🧲',
        agents: [
            { id: 'content-led', name: 'Content-Led Outbound', role: 'Distribute Assets', status: 'PLANNED' },
            { id: 'inbox', name: 'Inbox Management', role: 'Reply Handling', status: 'PLANNED' },
            { id: 'deanonymize', name: 'Website Visitors', role: 'De-anonymize MB2B', status: 'PLANNED' }
        ]
    },
    {
        id: 'ops-swarm',
        title: 'RevOps Infrastructure',
        color: 'bg-slate-50 border-slate-200',
        icon: '⚙️',
        agents: [
            { id: 'crm-sync', name: 'CRM Sync', role: 'HubSpot Hygiene', status: 'PLANNED' },
            { id: 'calendly', name: 'Pre-Call Sequence', role: 'Meeting Prep', status: 'PLANNED' }
        ]
    }
];

const SwarmMap = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {swarms.map((swarm) => (
                <div key={swarm.id} className={`rounded-xl border p-6 ${swarm.color}`}>
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="text-2xl">{swarm.icon}</span>
                        <h3 className="font-bold text-slate-800">{swarm.title}</h3>
                    </div>

                    <div className="space-y-3">
                        {swarm.agents.map((agent) => (
                            <motion.div
                                key={agent.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(`/agents/${agent.id}`)}
                                className={`bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-pointer flex justify-between items-center ${agent.status !== 'ACTIVE' ? 'opacity-60 grayscale' : 'hover:border-indigo-400'}`}
                            >
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">{agent.name}</h4>
                                    <p className="text-xs text-slate-500">{agent.role}</p>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${agent.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SwarmMap;
