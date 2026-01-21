import React, { useState, useEffect } from 'react';
import { AreaChart, Check, X, ArrowRight } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const RuleOf40 = () => {
    // INPUTS
    const [inputs, setInputs] = useState({
        growthRate: 30, // %
        profitMargin: 15 // % (EBITDA or FCF)
    });

    const [score, setScore] = useState(0);
    const { submit, status } = useSubmitLead();
    const [email, setEmail] = useState('');

    useEffect(() => {
        calculate();
    }, [inputs]);

    const calculate = () => {
        setScore(Number(inputs.growthRate) + Number(inputs.profitMargin));
    };

    const handleShare = (e) => {
        e.preventDefault();
        submit('rule_of_40', [
            { name: 'email', value: email },
            { name: 'message', value: `Rule of 40 Score: ${score}` }
        ]);
    };

    const getAssessment = () => {
        if (score >= 40) return { label: 'Distressed / Efficient', color: 'text-emerald-400', desc: 'Valuation Premium likely.' };
        return { label: 'Burn Problem', color: 'text-red-400', desc: 'Efficiency drag on valuation.' };
    };

    const assessment = getAssessment();

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-6 text-blue-400 font-mono text-xs uppercase tracking-widest relative z-10">
                <AreaChart className="w-4 h-4" /> Valuation Logic
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">The Rule of 40</h3>
            <p className="text-slate-400 mb-8 text-sm relative z-10">
                The golden metric for SaaS valuation. Are you growing efficiently?
            </p>

            <div className="space-y-6 flex-grow relative z-10">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-500">Revenue Growth Rate (%)</label>
                        <span className="text-xs font-mono text-white">{inputs.growthRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="-20" max="100"
                        value={inputs.growthRate}
                        onChange={(e) => setInputs({ ...inputs, growthRate: e.target.value })}
                        className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-xs font-semibold text-slate-500">Profit Margin (%)</label>
                        <span className="text-xs font-mono text-white">{inputs.profitMargin}%</span>
                    </div>
                    <input
                        type="range"
                        min="-50" max="50"
                        value={inputs.profitMargin}
                        onChange={(e) => setInputs({ ...inputs, profitMargin: e.target.value })}
                        className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700 text-center relative z-10">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Combined Score</div>
                <div className={`text-4xl font-bold ${score >= 40 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {score}
                </div>
                <p className="text-xs text-slate-400 mt-2">{assessment.desc}</p>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4 relative z-10">
                {status === 'success' ? (
                    <div className="text-green-400 text-xs text-center font-bold">Valuation Report Sent ✓</div>
                ) : (
                    <form onSubmit={handleShare} className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email..."
                            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        />
                        <button type="submit" disabled={status === 'submitting'} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2 text-xs font-bold transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RuleOf40;
