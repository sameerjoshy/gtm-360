import React, { useState, useEffect } from 'react';
import { Users, TrendingDown, ArrowRight, BarChart2, AlertCircle } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const CapacityCalculator = () => {
    // INPUTS
    const [inputs, setInputs] = useState({
        startingReps: 10,
        quotaPerRep: 500000, // Annual Quota
        attritionRate: 15, // % per year
        rampTime: 6, // Months
        hiringPlan: 2 // New reps per month
    });

    const [result, setResult] = useState(null);
    const [leadForm, setLeadForm] = useState({ email: '' });
    const { submit, status } = useSubmitLead();

    // CALCULATE ON CHANGE
    useEffect(() => {
        calculate();
    }, [inputs]);

    const calculate = () => {
        // 1. Spreadsheet Capacity (The Lie)
        // Simple: (Start + Total Hires) * Quota
        // We'll calculate for a 12-month period
        const totalHires = inputs.hiringPlan * 12;
        const endHeadcount = inputs.startingReps + totalHires;
        // Average headcount roughly
        const avgHeadcountSimple = (inputs.startingReps + endHeadcount) / 2;
        const spreadsheetCapacity = avgHeadcountSimple * inputs.quotaPerRep;

        // 2. Street Capacity (The Truth)
        // We need to model month by month
        let currentReps = inputs.startingReps;
        let totalStreetRevenue = 0;

        // Simulating 12 months
        for (let month = 1; month <= 12; month++) {
            // Attrition hits (simplified monthly rate)
            const attritionCount = (currentReps * (inputs.attritionRate / 100)) / 12;
            currentReps -= attritionCount;

            // Existing fully ramped reps produce full quota (monthly portion)
            const fullyRampedRevenue = currentReps * (inputs.quotaPerRep / 12);

            // New hires this month (produce 0)
            // But we need to account for previous hires ramping up
            // This is a simplified linear ramp model for the sake of the tool
            // Ideally we'd track cohorts, but for a lead magnet, an efficiency factor is often used.
            // Let's use a "Gap Factor" based on ramp time.

            // If ramp is 6 months, a rep is ~50% productive on average in their first year? 
            // Let's strictly subtract capacity for ramping reps.

            // Simplified Logic: 
            // Real Capacity = (Avg Headcount - (Hires * RampImpact) - AttritionImpact) * Quota

            totalStreetRevenue += fullyRampedRevenue;

            // Add new hires for next month
            currentReps += inputs.hiringPlan;
        }

        // Refined Logic for "Street Capacity" to make it punchy:
        // Street Capacity = Spreadsheet Capacity * (1 - Attrition) * (Ramp Factor)

        // Ramp Factor heuristic: If ramp is 6 months, you lose 50% of year 1 productivity for new hires.
        const newHireRatio = totalHires / endHeadcount;
        const rampDrag = (inputs.rampTime / 12) * 0.5 * newHireRatio;
        // 0.5 because linear ramp (0 to 100%) averages 50% during ramp period? 
        // Actually simpler: You lose X months of productivity per new hire.
        const lostMonths = totalHires * (inputs.rampTime * 0.6); // 60% inefficiency during ramp
        const lostRevenueRamp = lostMonths * (inputs.quotaPerRep / 12);

        const lostRevenueAttrition = (inputs.startingReps * (inputs.attritionRate / 100) * 0.5 * inputs.quotaPerRep); // Lost half year of revenue for churned reps

        const streetCapacity = spreadsheetCapacity - lostRevenueRamp - lostRevenueAttrition;
        const gap = spreadsheetCapacity - streetCapacity;

        setResult({
            spreadsheet: Math.round(spreadsheetCapacity),
            street: Math.round(streetCapacity),
            gap: Math.round(gap),
            gapPct: Math.round((gap / spreadsheetCapacity) * 100)
        });
    };

    const formatMoney = (n) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(n);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        submit('quota_cliff', [
            { name: 'email', value: leadForm.email },
            { name: 'message', value: `Gap Identified: ${result.gapPct}% (${formatMoney(result.gap)})` }
        ]);
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
            {/* Gradient glow */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* LEFT: INPUTS */}
                <div>
                    <div className="flex items-center gap-2 mb-6 text-indigo-400 font-mono text-xs uppercase tracking-widest">
                        <Users className="w-4 h-4" /> Capacity Planner
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">The Quota Cliff</h3>
                    <p className="text-slate-400 mb-8 text-sm">
                        Stop confusing headcount with capacity. See the gap between your hiring plan and your actual revenue reality.
                    </p>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Reps (Fully Ramped)</label>
                            <input
                                type="number"
                                value={inputs.startingReps}
                                onChange={(e) => setInputs({ ...inputs, startingReps: Number(e.target.value) })}
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Annual Quota / Rep</label>
                                <input
                                    type="number"
                                    value={inputs.quotaPerRep}
                                    onChange={(e) => setInputs({ ...inputs, quotaPerRep: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Attrition Rate (%)</label>
                                <input
                                    type="number"
                                    value={inputs.attritionRate}
                                    onChange={(e) => setInputs({ ...inputs, attritionRate: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Hires / Month</label>
                                <input
                                    type="number"
                                    value={inputs.hiringPlan}
                                    onChange={(e) => setInputs({ ...inputs, hiringPlan: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Ramp Time (Months)</label>
                                <input
                                    type="number"
                                    value={inputs.rampTime}
                                    onChange={(e) => setInputs({ ...inputs, rampTime: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: OUTPUTS */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
                    {result && (
                        <>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Simulation Results (Year 1)</h4>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-slate-400">Spreadsheet Capacity</span>
                                            <span className="text-slate-400 font-mono">Top-down Model</span>
                                        </div>
                                        <div className="text-2xl font-bold text-slate-300">
                                            {formatMoney(result.spreadsheet)}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-emerald-500 rounded-full"></div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white font-bold">Street Capacity</span>
                                            <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded">REALITY</span>
                                        </div>
                                        <div className="text-3xl lg:text-4xl font-bold text-white">
                                            {formatMoney(result.street)}
                                        </div>
                                    </div>

                                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-red-400 font-bold text-sm">The Quota Cliff</div>
                                                <div className="text-red-300 text-xs mt-1">
                                                    You are missing <span className="font-bold">{formatMoney(result.gap)}</span> ({result.gapPct}%) of your plan due to ramp and attrition drag.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-700">
                                {status === 'success' ? (
                                    <div className="text-green-400 text-center text-sm font-medium">
                                        ✓ Report sent to your inbox.
                                    </div>
                                ) : (
                                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                                        <input
                                            type="email"
                                            className="bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white text-sm w-full focus:outline-none focus:border-indigo-500"
                                            placeholder="Email report to board..."
                                            required
                                            value={leadForm.email}
                                            onChange={(e) => setLeadForm({ email: e.target.value })}
                                        />
                                        <button type="submit" disabled={status === 'submitting'} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-4 py-2 text-sm font-bold flex-shrink-0 transition-colors">
                                            {status === 'submitting' ? '...' : 'Send'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CapacityCalculator;
