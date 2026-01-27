import React, { useState, useEffect } from 'react';
import { Settings, Zap, ArrowRight, Download, Gauge } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';
import useLocalStorage from '../../hooks/useLocalStorage';

const PipelineVelocity = () => {
    // INPUTS
    const [inputs, setInputs] = useLocalStorage('gtm360_velocity_inputs', {
        opportunities: 50,
        dealValue: 25000,
        winRate: 20, // %
        salesCycle: 90 // days
    });

    const [velocity, setVelocity] = useState(0);
    const [impacts, setImpacts] = useState({});
    const { submit, status } = useSubmitLead();

    // CALCULATE
    useEffect(() => {
        const v = calculateVelocity(inputs);
        setVelocity(v);
        calculateImpacts(v, inputs);
    }, [inputs]);

    const calculateVelocity = (data) => {
        const totalPipelineValue = data.opportunities * data.dealValue;
        const expectedRevenue = totalPipelineValue * (data.winRate / 100);
        const cycleMonths = data.salesCycle / 30;
        const effectiveCycle = cycleMonths < 0.1 ? 0.1 : cycleMonths;
        return Math.round(expectedRevenue / effectiveCycle);
    };

    const calculateImpacts = (currentV, data) => {
        // Impact of 10% improvement in each metric
        const betterWinRate = calculateVelocity({ ...data, winRate: data.winRate * 1.1 });
        const betterCycle = calculateVelocity({ ...data, salesCycle: data.salesCycle * 0.9 });
        const betterValue = calculateVelocity({ ...data, dealValue: data.dealValue * 1.1 });

        setImpacts({
            winRate: betterWinRate - currentV,
            cycle: betterCycle - currentV,
            dealValue: betterValue - currentV
        });
    };

    const formatMoney = (n) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    const handleExport = () => {
        const headers = ["Metric", "Value"];
        const rows = [
            ["Opportunities", inputs.opportunities],
            ["Deal Value", inputs.dealValue],
            ["Win Rate", inputs.winRate + "%"],
            ["Sales Cycle", inputs.salesCycle + " days"],
            ["Calculated Velocity (per month)", velocity]
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pipeline_velocity_model.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Chart Data Config
    const chartData = [
        { name: 'Velocity', value: Math.min((velocity / 200000) * 100, 100), fill: '#f97316' }
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full border-t-4 border-t-orange-500">
            <div className="p-6 border-b border-slate-100 bg-white z-20 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-orange-600 font-mono text-xs uppercase tracking-widest mb-1">
                        <Gauge className="w-4 h-4" /> Pipeline Physics
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Velocity Engine</h2>
                </div>
                <button onClick={handleExport} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-200">
                    <Download className="w-3 h-3" /> Export CSV
                </button>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* VELOCITY GAUGE AREA */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                    <div className="h-48 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="100%"
                                barSize={20}
                                data={chartData}
                                startAngle={180}
                                endAngle={0}
                            >
                                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                                <RadialBar
                                    background={{ fill: '#e2e8f0' }}
                                    clockWise
                                    dataKey="value"
                                    cornerRadius={10}
                                />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#1e293b' }}
                                    formatter={(value) => [`${Math.round(value)}%`, 'Velocity Index']}
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <div className="text-3xl font-bold text-slate-900 tracking-tight">
                                {formatMoney(velocity)}
                            </div>
                            <div className="text-[10px] text-orange-600 font-mono uppercase">/ Month</div>
                        </div>
                    </div>
                </div>

                {/* LEVERS INPUTS */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Opportunities (Active)</label>
                            <span className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{inputs.opportunities}</span>
                        </div>
                        <input type="range" min="5" max="200" value={inputs.opportunities} onChange={(e) => setInputs({ ...inputs, opportunities: Number(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Deal Value ($)</label>
                            <span className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">${inputs.dealValue}</span>
                        </div>
                        <input type="range" min="1000" max="100000" step="1000" value={inputs.dealValue} onChange={(e) => setInputs({ ...inputs, dealValue: Number(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Win Rate (%)</label>
                            <span className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{inputs.winRate}%</span>
                        </div>
                        <input type="range" min="1" max="80" value={inputs.winRate} onChange={(e) => setInputs({ ...inputs, winRate: Number(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Sales Cycle (Days)</label>
                            <span className="text-xs font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{inputs.salesCycle}d</span>
                        </div>
                        <input type="range" min="15" max="365" value={inputs.salesCycle} onChange={(e) => setInputs({ ...inputs, salesCycle: Number(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                </div>
            </div>

            {/* IMPACT ANALYSIS */}
            <div className="bg-slate-50 p-6 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" /> Leverage Analysis (Impact of 10% Improvement)
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-500/50 transition-colors group cursor-pointer shadow-sm">
                        <div className="text-[10px] text-slate-400 mb-1 font-bold uppercase">Increase Win Rate</div>
                        <div className="text-sm font-bold text-emerald-600">+{formatMoney(impacts.winRate)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-500/50 transition-colors group cursor-pointer shadow-sm">
                        <div className="text-[10px] text-slate-400 mb-1 font-bold uppercase">Increase Deal Size</div>
                        <div className="text-sm font-bold text-emerald-600">+{formatMoney(impacts.dealValue)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-500/50 transition-colors group cursor-pointer border-l-4 border-l-orange-500 shadow-sm">
                        <div className="text-[10px] text-slate-400 mb-1 font-bold uppercase">Shorten Cycle</div>
                        <div className="text-sm font-bold text-emerald-600">+{formatMoney(impacts.cycle)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PipelineVelocity;
