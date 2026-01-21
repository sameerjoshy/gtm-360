import React from 'react';
import { Helmet } from 'react-helmet-async';
import CapacityCalculator from '../components/tools/CapacityCalculator';
import SaaSCompass from '../components/tools/SaaSCompass';
import RevenueCalculator from '../components/tools/RevenueCalculator';

const Tools = () => {
    return (
        <div className="tools-page min-h-screen bg-slate-950">
            <Helmet>
                <title>The Workbench | GTM360</title>
                <meta name="description" content="Engineering-grade calculators for GTM leaders. Plan capacity, audit unit economics, and measure revenue leakage without the fluff." />
            </Helmet>

            {/* HEADER */}
            <section className="py-20 bg-slate-900 border-b border-slate-800">
                <div className="container max-w-5xl text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-mono uppercase tracking-widest mb-6 border border-indigo-500/20">
                        Ungated Alpha
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        The Revenue Engineering <span className="text-indigo-500">Workbench</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Precision tools for high-stakes decisions. No fluff. Just the math you need to defend your strategy.
                    </p>
                </div>
            </section>

            {/* TOOLS GRID */}
            <section className="py-20">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* TOOL 1: QUOTA CLIFF */}
                        <div className="lg:col-span-2">
                            <CapacityCalculator />
                        </div>

                        {/* TOOL 2: SAAS COMPASS */}
                        <div>
                            <SaaSCompass />
                        </div>

                        {/* TOOL 3: LEAKAGE (Existing) */}
                        <div>
                            {/* Wrapping existing calculator component to fit the theme if needed, but it already has its own container. 
                                 We might need to adjust it to fit the height or style. 
                                 For now, just dropping it in.
                             */}
                            <div className="h-full">
                                <RevenueCalculator />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BANNER */}
            <section className="py-20 border-t border-slate-900 bg-slate-950 text-center">
                <div className="container">
                    <h3 className="text-2xl font-bold text-white mb-4">Need a custom model?</h3>
                    <p className="text-slate-400 mb-8">We build bespoke revenue architectures for Enterprise clients.</p>
                    <a href="/contact" className="inline-block bg-white text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors">
                        Request Access
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Tools;
