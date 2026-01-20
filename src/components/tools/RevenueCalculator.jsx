import React, { useState } from 'react';
import { ArrowRight, DollarSign, Calculator, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSubmitLead from '../../hooks/useSubmitLead';

const RevenueLeakageCalculator = () => {
    // FORM STATE
    const [inputs, setInputs] = useState({
        arr: 5000000,
        growthRate: 20, // %
        salesCycle: 90, // days
        winRate: 25 // %
    });

    // UI STATE
    const [step, setStep] = useState('input'); // 'input', 'calculating', 'result'
    const [leadForm, setLeadForm] = useState({ email: '', role: '' });
    const { submit, status } = useSubmitLead();

    // CALCULATIONS
    const calculateLeakage = () => {
        // Simple heuristic model for "Revenue Leakage" based on industry benchmarks
        // Assumption: Most companies have ~15-25% inefficiency in their GTM engine

        const annualRevenue = Number(inputs.arr);

        // 1. Pipeline Slippage (Deals pushing due to bad qualification)
        const slippageFactor = 0.08;

        // 2. Churn / Expansion Miss (Poor handover)
        const handoffFactor = 0.05;

        // 3. CAC Inefficiency (Marketing waste)
        const wasteFactor = 0.04;

        const totalLeakagePct = slippageFactor + handoffFactor + wasteFactor;
        const totalLeakageAmount = Math.round(annualRevenue * totalLeakagePct);

        return {
            amount: totalLeakageAmount,
            pct: (totalLeakagePct * 100).toFixed(0)
        };
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        setStep('calculating');
        setTimeout(() => setStep('result'), 1500);
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(num);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!leadForm.email) return;

        const leakage = calculateLeakage();

        submit('revenue_leakage_result', [
            { name: 'email', value: leadForm.email },
            { name: 'jobtitle', value: leadForm.role },
            { name: 'annualrevenue', value: inputs.arr },
            { name: 'message', value: `Estimated Leakage: ${formatCurrency(leakage.amount)} (${leakage.pct}% of ARR)` }
        ]);
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-2 block flex items-center gap-2">
                            <Calculator className="w-3 h-3" /> GTM Engineering Tool
                        </span>
                        <h3 className="text-2xl font-bold text-white">Revenue Leakage Calculator</h3>
                    </div>
                </div>

                {step === 'input' && (
                    <form onSubmit={handleCalculate} className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <p className="text-gray-400 mb-8 max-w-md">
                            Estimate how much revenue your system is silently losing due to GTM friction (handoffs, slip, and waste).
                        </p>

                        <div className="space-y-6 mb-8">
                            {/* ARR INPUT */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Current Annual Revenue (ARR)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={inputs.arr}
                                        onChange={(e) => setInputs({ ...inputs, arr: e.target.value })}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-8 pr-4 text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all font-mono"
                                        placeholder="5000000"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Growth Target</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={inputs.growthRate}
                                            onChange={(e) => setInputs({ ...inputs, growthRate: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all font-mono"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Sales Cycle</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={inputs.salesCycle}
                                            onChange={(e) => setInputs({ ...inputs, salesCycle: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all font-mono"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 text-xs">Days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full btn bg-[var(--color-primary)] hover:bg-indigo-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-lg transition-all shadow-lg hover:shadow-indigo-500/25">
                            Calculate Loss <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                )}

                {step === 'calculating' && (
                    <div className="py-12 flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                        <p className="text-indigo-300 font-mono animate-pulse">Running system audit simulation...</p>
                    </div>
                )}

                {step === 'result' && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center mb-8">
                            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Estimated Annual Leakage</p>
                            <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-4">
                                {formatCurrency(calculateLeakage().amount)}
                            </h2>
                            <p className="text-xl text-gray-300">
                                Your system is wasting <span className="text-white font-bold">{calculateLeakage().pct}%</span> of its potential revenue.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 mb-8">
                            <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">Leakage Breakdown</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Pipeline Slippage</span>
                                    <span className="text-red-400">{formatCurrency(inputs.arr * 0.08)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Expansion Missed</span>
                                    <span className="text-red-400">{formatCurrency(inputs.arr * 0.05)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">CAC Inefficiency</span>
                                    <span className="text-red-400">{formatCurrency(inputs.arr * 0.04)}</span>
                                </div>
                            </div>
                        </div>

                        {/* EMAIL CAPTURE */}
                        {status === 'success' ? (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-center">
                                <p className="font-bold">Analysis Sent!</p>
                                <p className="text-sm">We've emailed you the full breakdown and fix plan.</p>
                            </div>
                        ) : (
                            <div className="bg-white/5 rounded-lg p-6">
                                <h4 className="font-semibold text-white mb-2">Get the "Leakage Fix" Report</h4>
                                <p className="text-sm text-gray-400 mb-4">Enter your email to see exactly where this money is going and how to recapture it.</p>
                                <form onSubmit={handleEmailSubmit} className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Work Email"
                                        value={leadForm.email}
                                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                        className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-[var(--color-primary)] text-sm text-white"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="btn bg-white text-slate-900 hover:bg-gray-100 px-4 py-2 text-sm font-bold"
                                    >
                                        {status === 'submitting' ? '...' : 'Send Report'}
                                    </button>
                                </form>
                            </div>
                        )}

                        <button
                            onClick={() => setStep('input')}
                            className="mt-6 w-full text-center text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            Start Over
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueLeakageCalculator;
