import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layers, Zap, Database, Share2, BarChart3, Users, Globe, ArrowRight, Search } from 'lucide-react';

const Partners = () => {
    return (
        <div className="partners-page min-h-screen bg-slate-50">
            <Helmet>
                <title>Partners & Tech Stack | GTM360</title>
                <meta name="description" content="We are tool-agnostic. We don't take referral fees. We work with the best-in-class revenue technology providers to build systems that actually flow." />
            </Helmet>

            {/* BLOCK 1: INTRO */}
            <section className="section pt-32 pb-20 bg-white">
                <div className="container max-w-4xl text-center opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6 block">
                        The Revenue Stack
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-gray-900 tracking-tight">
                        Tools don’t create leverage. <span className="text-indigo-600">Systems do.</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                        The GTM technology landscape is noisy. We act as a filter, not a funnel. We architect the stack to serve the strategy, not the other way around.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-bold border border-green-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        100% Independent. Zero Referral Fees.
                    </div>
                </div>
            </section>

            {/* BLOCK 2: ECOSYSTEM GRID */}
            <section className="section py-20">
                <div className="container max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Database,
                                category: "System of Record",
                                desc: "The source of truth.",
                                logos: [
                                    { name: 'Salesforce', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Salesforce' },
                                    { name: 'HubSpot', url: 'https://placehold.co/120x40/f1f5f9/475569?text=HubSpot' }
                                ]
                            },
                            {
                                icon: BarChart3,
                                category: "Revenue Intelligence",
                                desc: "Forecasting & signals.",
                                logos: [
                                    { name: 'Gong', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Gong' },
                                    { name: 'Clari', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Clari' },
                                    { name: 'BoostUp', url: 'https://placehold.co/120x40/f1f5f9/475569?text=BoostUp' }
                                ]
                            },
                            {
                                icon: Zap,
                                category: "Sales Engagement",
                                desc: "Outbound velocity.",
                                logos: [
                                    { name: 'Outreach', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Outreach' },
                                    { name: 'Salesloft', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Salesloft' }
                                ]
                            },
                            {
                                icon: Search, // Using Lucide component defined below in map
                                category: "Intent & Data",
                                desc: "Market visibility.",
                                logos: [
                                    { name: '6sense', url: 'https://placehold.co/120x40/f1f5f9/475569?text=6sense' },
                                    { name: 'ZoomInfo', url: 'https://placehold.co/120x40/f1f5f9/475569?text=ZoomInfo' },
                                    { name: 'Clearbit', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Clearbit' }
                                ]
                            },
                            {
                                icon: Share2,
                                category: "Marketing Automation",
                                desc: "Nurture & capture.",
                                logos: [
                                    { name: 'Marketo', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Marketo' },
                                    { name: 'HubSpot', url: 'https://placehold.co/120x40/f1f5f9/475569?text=HubSpot' }
                                ]
                            },
                            {
                                icon: Users,
                                category: "Customer Success",
                                desc: "Retention engine.",
                                logos: [
                                    { name: 'Gainsight', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Gainsight' },
                                    { name: 'Catalyst', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Catalyst' }
                                ]
                            },
                            {
                                icon: Globe,
                                category: "Partner Ecosystem",
                                desc: "Indirect revenue.",
                                logos: [
                                    { name: 'Crossbeam', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Crossbeam' },
                                    { name: 'Impartner', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Impartner' }
                                ]
                            },
                            {
                                icon: Layers,
                                category: "PLG & Product",
                                desc: "Usage telemetry.",
                                logos: [
                                    { name: 'Pendo', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Pendo' },
                                    { name: 'Amplitude', url: 'https://placehold.co/120x40/f1f5f9/475569?text=Amplitude' }
                                ]
                            }
                        ].map((item, i) => (
                            <div key={i} className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {/* Lucide Icon render logic helper */}
                                        {item.category === "Intent & Data" ? <Globe className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.category}</h3>
                                        <p className="text-xs text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {item.logos.map(logo => (
                                        <div key={logo.name} className="h-10 w-full bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center overflow-hidden relative">
                                            <img
                                                src={logo.url}
                                                alt={logo.name}
                                                className="h-full w-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 3: ETHICS */}
            <section className="section bg-slate-900 text-white py-24">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                                Ethical Standards
                            </span>
                            <h2 className="text-3xl font-bold mb-6">Our stance on partnerships</h2>
                            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                                We maintain strong technical relationships with vendors to understand their roadmaps, but we maintain strict commercial neutrality.
                            </p>
                            <p className="text-lg text-slate-400">
                                You pay us for optimizing your system, not for selling you licenses.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
                            {[
                                "We do NOT accept referral fees.",
                                "We do NOT resell licenses.",
                                "We do NOT recommend tools based on perks."
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-slate-200 font-medium">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mr-4 flex-shrink-0">
                                        ✕
                                    </div>
                                    {item}
                                </div>
                            ))}
                            <div className="border-t border-white/10 pt-6 mt-2">
                                <div className="flex items-center text-white font-bold">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-4 flex-shrink-0">
                                        ✓
                                    </div>
                                    We recommend what fixes the system.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 4: CTA */}
            <section className="section bg-white text-center py-24 border-t border-gray-100">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Unbiased advice. System-first architecture.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold flex items-center justify-center">
                            Assess your stack <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Partners;
