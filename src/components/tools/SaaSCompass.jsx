import React, { useState, useEffect } from 'react';
import { Compass, TrendingUp, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const SaaSCompass = () => {
    // INPUTS
    const [inputs, setInputs] = useState({
        cac: 15000, // Customer Acquisition Cost
        arpa: 45000, // Average Revenue Per Account
        grossMargin: 80, // %
        churnRate: 15 // % Annual Churn
    });

    const [metrics, setMetrics] = useState(null);
    const { submit, status } = useSubmitLead();
    const [email, setEmail] = useState('');

    useEffect(() => {
        calculate();
    }, [inputs]);

    const calculate = () => {
        // 1. LTV (Lifetime Value)
        // Simple LTV = (ARPA * Gross Margin %) / Churn Rate %
        // Need to be careful with decimals
        const marginDecimal = inputs.grossMargin / 100;
        const churnDecimal = inputs.churnRate / 100;

        // Prevent division by zero
        const effectiveChurn = churnDecimal < 0.01 ? 0.01 : churnDecimal;

        const ltv = (inputs.arpa * marginDecimal) / effectiveChurn;

        // 2. LTV:CAC Ratio
        const ltvCac = ltv / inputs.cac;

        // 3. Payback Period (Months)
        // Payback = CAC / (Monthly Gross Profit)
        // Monthly Gross Profit = (ARPA / 12) * Margin
        const monthlyGrossProfit = (inputs.arpa / 12) * marginDecimal;
        const paybackMonths = inputs.cac / monthlyGrossProfit;

        // Health Scores
        let health = 'neutral';
        if (ltvCac > 3 && paybackMonths < 12) health = 'healthy';
        if (ltvCac < 1.5 || paybackMonths > 18) health = 'danger';

        setMetrics({
            ltv: Math.round(ltv),
            ltvCac: ltvCac.toFixed(1),
            payback: paybackMonths.toFixed(1),
            health
        });
    };

    const handleInvite = (e) => {
        e.preventDefault();
        submit('saas_compass', [
            { name: 'email', value: email },
            { name: 'message', value: `LTV:CAC ${metrics.ltvCac}, Payback: ${metrics.payback}mo` }
        ]);
    };

    const getColor = () => {
        if (metrics?.health === 'healthy') return 'text-emerald-400';
        if (metrics?.health === 'danger') return 'text-red-400';
        return 'text-yellow-400';
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden h-full">
            {/* Background Texture */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                    <Compass className="w-4 h-4" /> Unit Economics
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">The SaaS Compass</h3>
                <p className="text-slate-400 mb-8 text-sm">
                    A sanity check for your business model. Are you default dead or default alive?
                </p>

                {/* CONTROLS */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">CAC ($)</label>
                            <input
                                type="number"
                                value={inputs.cac}
                                onChange={(e) => setInputs({ ...inputs, cac: e.target.value })}
                                className="w-full bg-slate-800 border-b border-slate-600 focus:border-emerald-500 text-white p-1 text-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">ARPA ($)</label>
                            <input
                                type="number"
                                value={inputs.arpa}
                                onChange={(e) => setInputs({ ...inputs, arpa: e.target.value })}
                                className="w-full bg-slate-800 border-b border-slate-600 focus:border-emerald-500 text-white p-1 text-sm focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Gross Margin (%)</label>
                            <input
                                type="number"
                                value={inputs.grossMargin}
                                onChange={(e) => setInputs({ ...inputs, grossMargin: e.target.value })}
                                className="w-full bg-slate-800 border-b border-slate-600 focus:border-emerald-500 text-white p-1 text-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Annual Churn (%)</label>
                            <input
                                type="number"
                                value={inputs.churnRate}
                                onChange={(e) => setInputs({ ...inputs, churnRate: e.target.value })}
                                className="w-full bg-slate-800 border-b border-slate-600 focus:border-emerald-500 text-white p-1 text-sm focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* RESULTS */}
                {metrics && (
                    <div className="bg-black/30 rounded-xl p-6 border border-white/5 backdrop-blur-sm">
                        <div className="grid grid-cols-2 gap-8 text-center mb-6">
                            <div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">LTV : CAC</div>
                                <div className={`text-3xl font-bold ${getColor()}`}>{metrics.ltvCac}x</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Payback</div>
                                <div className={`text-3xl font-bold ${metrics.payback < 12 ? 'text-white' : 'text-red-400'}`}>
                                    {metrics.payback}<span className="text-sm font-normal text-slate-500">mo</span>
                                </div>
                            </div>
                        </div>

                        <div className={`p-3 rounded-lg text-xs font-bold text-center uppercase tracking-widest bg-white/5 border border-white/10 ${getColor()}`}>
                            Status: {metrics.health === 'healthy' ? 'Growth Ready' : metrics.health === 'danger' ? 'Burn Warning' : 'Stable'}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-500 mb-3">Want the full CFO dashboard?</p>
                    {status === 'success' ? (
                        <span className="text-emerald-400 text-xs font-bold">Access requested.</span>
                    ) : (
                        <form onSubmit={handleInvite} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email for access"
                                className="w-full bg-slate-800 border border-slate-600 rounded-full py-2 px-4 text-xs text-white focus:outline-none focus:border-emerald-500 pr-20"
                            />
                            <button type="submit" disabled={status === 'submitting'} className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-3 text-xs font-bold transition-colors">
                                Get It
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SaaSCompass;
