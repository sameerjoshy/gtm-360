import React, { useState, useEffect } from 'react';
import { Gauge, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const PipelineVelocity = () => {
    // INPUTS
    const [inputs, setInputs] = useState({
        opportunities: 50,
        dealValue: 25000,
        winRate: 20, // %
        salesCycle: 90 // days
    });

    const [velocity, setVelocity] = useState(0);
    const { submit, status } = useSubmitLead();
    const [email, setEmail] = useState('');

    useEffect(() => {
        calculate();
    }, [inputs]);

    const calculate = () => {
        // Velocity (Revenue per Month) = (Ops * Value * Win%) / (Cycle Days / 30)

        const totalPipelineValue = inputs.opportunities * inputs.dealValue;
        const expectedRevenue = totalPipelineValue * (inputs.winRate / 100);

        // Cycle in months
        const cycleMonths = inputs.salesCycle / 30;

        // Avoid division by zero
        const effectiveCycle = cycleMonths < 0.1 ? 0.1 : cycleMonths;

        const v = expectedRevenue / effectiveCycle;
        setVelocity(Math.round(v));
    };

    const formatMoney = (n) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(n);
    };

    const handleInvite = (e) => {
        e.preventDefault();
        submit('pipeline_velocity', [
            { name: 'email', value: email },
            { name: 'message', value: `Velocity: ${formatMoney(velocity)}/mo` }
        ]);
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-6 text-orange-400 font-mono text-xs uppercase tracking-widest relative z-10">
                <Gauge className="w-4 h-4" /> Pipeline Physics
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Revenue Velocity</h3>
            <p className="text-slate-400 mb-8 text-sm relative z-10">
                Coverage is vanity. Velocity is sanity. Calculate your true revenue throughput per month.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 flex-grow relative z-10">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Opportunities</label>
                    <input
                        type="number"
                        value={inputs.opportunities}
                        onChange={(e) => setInputs({ ...inputs, opportunities: e.target.value })}
                        className="w-full bg-slate-800 border-b border-slate-600 focus:border-orange-500 text-white p-1 text-sm focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Deal Value ($)</label>
                    <input
                        type="number"
                        value={inputs.dealValue}
                        onChange={(e) => setInputs({ ...inputs, dealValue: e.target.value })}
                        className="w-full bg-slate-800 border-b border-slate-600 focus:border-orange-500 text-white p-1 text-sm focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Win Rate (%)</label>
                    <input
                        type="number"
                        value={inputs.winRate}
                        onChange={(e) => setInputs({ ...inputs, winRate: e.target.value })}
                        className="w-full bg-slate-800 border-b border-slate-600 focus:border-orange-500 text-white p-1 text-sm focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Cycle Length (Days)</label>
                    <input
                        type="number"
                        value={inputs.salesCycle}
                        onChange={(e) => setInputs({ ...inputs, salesCycle: e.target.value })}
                        className="w-full bg-slate-800 border-b border-slate-600 focus:border-orange-500 text-white p-1 text-sm focus:outline-none"
                    />
                </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20 text-center relative z-10">
                <div className="text-xs text-orange-300 uppercase tracking-widest mb-2">Revenue Velocity</div>
                <div className="text-3xl font-bold text-white mb-1">{formatMoney(velocity)}</div>
                <div className="text-xs text-slate-400">per month of throughput</div>
            </div>

            <div className="mt-6 border-t border-slate-800 pt-4 relative z-10">
                {status === 'success' ? (
                    <div className="text-green-400 text-xs text-center font-bold">Velocity Report Sent ✓</div>
                ) : (
                    <form onSubmit={handleInvite} className="flex gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email output..."
                            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                        />
                        <button type="submit" disabled={status === 'submitting'} className="bg-orange-600 hover:bg-orange-500 text-white rounded px-3 py-2 text-xs font-bold transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PipelineVelocity;
