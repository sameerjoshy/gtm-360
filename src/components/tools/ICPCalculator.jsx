import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const ICPCalculator = () => {
    // SCORING CRITERIA
    const [scores, setScores] = useState({
        budget: 0,
        authority: 0,
        need: 0,
        timeline: 0,
        techFit: 0
    });

    const [totalScore, setTotalScore] = useState(0);
    const { submit, status } = useSubmitLead();
    const [leadName, setLeadName] = useState('');

    useEffect(() => {
        const total = Object.values(scores).reduce((a, b) => a + Number(b), 0);
        setTotalScore(total);
    }, [scores]);

    const getSignalStrength = () => {
        if (totalScore >= 80) return { label: 'High Signal', color: 'text-green-400', bg: 'bg-green-500' };
        if (totalScore >= 50) return { label: 'Medium Signal', color: 'text-yellow-400', bg: 'bg-yellow-500' };
        return { label: 'Low Signal', color: 'text-red-400', bg: 'bg-red-500' };
    };

    const handleSave = (e) => {
        e.preventDefault();
        submit('icp_score', [
            { name: 'firstname', value: leadName }, // reusing firstname field for Lead Name context
            { name: 'message', value: `ICP Score: ${totalScore}/100 (${getSignalStrength().label})` }
        ]);
    };

    const criteria = [
        { key: 'budget', label: 'Budget Confirmed', max: 20 },
        { key: 'authority', label: 'Access to DM', max: 20 },
        { key: 'need', label: 'Pain Quantified', max: 20 },
        { key: 'timeline', label: 'Timeline < 90 Days', max: 20 },
        { key: 'techFit', label: 'Tech Stack Match', max: 20 }
    ];

    const signal = getSignalStrength();

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-6 text-purple-400 font-mono text-xs uppercase tracking-widest relative z-10">
                <Target className="w-4 h-4" /> Qualification Engine
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">ICP Signal Scorer</h3>
            <p className="text-slate-400 mb-8 text-sm relative z-10">
                Stop guessing. Quantify the fit.
            </p>

            <div className="space-y-4 mb-8 flex-grow relative z-10">
                {criteria.map((c) => (
                    <div key={c.key} className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">{c.label}</label>
                        <select
                            value={scores[c.key]}
                            onChange={(e) => setScores({ ...scores, [c.key]: e.target.value })}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:border-purple-500 outline-none w-20 text-right"
                        >
                            <option value="0">0</option>
                            <option value={c.max / 2}>Partial</option>
                            <option value={c.max}>Yes</option>
                        </select>
                    </div>
                ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center relative z-10">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <div className={`text-4xl font-bold text-white`}>{totalScore}</div>
                    <span className="text-slate-500 text-xl">/ 100</span>
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block bg-slate-900 ${signal.color}`}>
                    {signal.label}
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                        className={`h-full ${signal.bg} transition-all duration-500`}
                        style={{ width: `${totalScore}%` }}
                    ></div>
                </div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4 relative z-10">
                {status === 'success' ? (
                    <div className="text-green-400 text-xs text-center font-bold">Score Saved ✓</div>
                ) : (
                    <form onSubmit={handleSave} className="flex gap-2">
                        <input
                            type="text"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="Lead / Company Name"
                            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                        <button type="submit" disabled={status === 'submitting'} className="bg-purple-600 hover:bg-purple-500 text-white rounded px-3 py-2 text-xs font-bold transition-colors text-nowrap">
                            Save Lead
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ICPCalculator;
