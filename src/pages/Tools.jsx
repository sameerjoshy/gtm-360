import React from 'react';
import { Helmet } from 'react-helmet-async';
import CapacityCalculator from '../components/tools/CapacityCalculator';
import SaaSCompass from '../components/tools/SaaSCompass';
import RevenueCalculator from '../components/tools/RevenueCalculator';
import PipelineVelocity from '../components/tools/PipelineVelocity';
import ICPCalculator from '../components/tools/ICPCalculator';
import RuleOf40 from '../components/tools/RuleOf40';

const Tools = () => {
    return (
        <div className="tools-page min-h-screen bg-slate-50">
            <Helmet>
                <title>The Workbench | GTM360</title>
                <meta name="description" content="Diagnostic models to audit your GTM system—positioning, funnel economics, and revenue leakage. Interactive calculators for growth-stage B2B tech companies." />
            </Helmet>

            {/* HEADER */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="container max-w-5xl text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-mono uppercase tracking-widest mb-6 border border-indigo-100">
                        Ungated Alpha
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        The Revenue Engineering <span className="text-indigo-600">Workbench</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Diagnostic models to audit your GTM system—positioning, funnel economics, and revenue leakage—before you spend another dollar.
                    </p>
                </div>
            </section>

            {/* TOOLS GRID */}
            <section className="py-20">
                <div className="container max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* ROW 1: STRATEGY & PLANNING */}
                        <div className="lg:col-span-8">
                            <CapacityCalculator />
                        </div>
                        <div className="lg:col-span-4 h-full">
                            <SaaSCompass />
                        </div>

                        {/* ROW 2: EXECUTION & DIAGNOSTICS */}
                        <div className="lg:col-span-4 h-full">
                            <PipelineVelocity />
                        </div>
                        <div className="lg:col-span-4 h-full">
                            <ICPCalculator />
                        </div>
                        <div className="lg:col-span-4 h-full">
                            <RuleOf40 />
                        </div>

                        {/* ROW 3: SYSTEM AUDIT (Full Width) */}
                        <div className="lg:col-span-12">
                            <div className="h-full">
                                <RevenueCalculator />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BANNER */}
            <section className="py-20 border-t border-gray-200 bg-white text-center">
                <div className="container max-w-3xl">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Get Your GTM Diagnostic</h3>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Use these models to audit your system—or engage us to redesign and operationalize your GTM based on the findings.
                    </p>
                    <a href="/contact" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg">
                        Request Strategic Engagement
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Tools;
