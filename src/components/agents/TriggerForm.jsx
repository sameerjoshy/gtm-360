import React, { useState } from 'react';

const TriggerForm = ({ onStart }) => {
    const [domain, setDomain] = useState('');
    const [persona, setPersona] = useState('VP of Sales');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API delay or call parent
        await onStart({ domain, persona });
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Start New Mission</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Domain</label>
                    <input
                        type="text"
                        placeholder="e.g. stripe.com"
                        className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Persona</label>
                    <select
                        className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                    >
                        <option>VP of Sales</option>
                        <option>Head of Finance</option>
                        <option>CTO</option>
                        <option>Chief Marketing Officer</option>
                    </select>
                </div>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn bg-indigo-600 text-white hover:bg-indigo-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Igniting Engines...' : 'Deploy Agent'}
                </button>
            </div>
        </form>
    );
};

export default TriggerForm;
