import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { glossaryTerms, engineStages } from '../data/glossary';
import { playbooks } from '../data/playbooks';
import SEO from '../components/SEO';

const IconRenderer = ({ icon, className = "w-6 h-6" }) => {
    switch (icon) {
        case 'radar':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.297A8.609 8.609 0 0112 21c1.242 0 2.424-.263 3.491-.737M11 5.882a6.703 6.703 0 01-5-1.307M11 5.882a6.703 6.703 0 005-1.307M5 4.575V17.082a6.703 6.703 0 005 1.307M16 4.575V17.082a6.703 6.703 0 01-5 1.307" /></svg>;
        case 'gear':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
        case 'cpu':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
        case 'gauge':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
        case 'infinite':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;
        case 'filter':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
        case 'eye-off':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878l4.242 4.242m-9.878 9.878l12.728-12.728" /></svg>;
        case 'trending-up':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
        case 'alert-triangle':
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
        default:
            return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    }
};

const GlossaryDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const term = glossaryTerms.find(t => t.slug === slug);

    if (!term) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Component Not Found</h2>
                    <Link to="/glossary" className="text-[var(--color-primary)] font-bold">Return to Map</Link>
                </div>
            </div>
        );
    }

    const stage = engineStages.find(s => s.id === term.stage);
    const relatedPlaybook = playbooks.find(p => p.id === term.relatedPlaybook);

    const handleCopySocial = () => {
        navigator.clipboard.writeText(term.socialSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${term.title} | Revenue Intelligence Map`}
                description={term.shortDefinition}
            />

            {/* Breadcrumb / Navigation */}
            <div className="max-w-5xl mx-auto px-4 pt-12">
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12">
                    <Link to="/glossary" className="hover:text-gray-900 transition-colors">Revenue Map</Link>
                    <span>/</span>
                    <span className={`px-2 py-0.5 rounded bg-${stage?.color}-50 text-${stage?.color}-700 font-bold text-[10px] uppercase`}>
                        {stage?.title}
                    </span>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{term.title}</span>
                </nav>
            </div>

            <article className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Core Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="inline-block px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded">
                                    {term.type}
                                </span>
                                <span className="text-gray-400 font-mono text-sm">ID: {term.id}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                                {term.title}
                            </h1>

                            <div className="prose prose-lg prose-blue max-w-none text-gray-600 mb-12">
                                <p className="text-xl font-medium text-gray-900 mb-6 leading-relaxed">
                                    {term.shortDefinition}
                                </p>
                                <div className="h-px w-20 bg-gray-200 mb-8"></div>
                                <p className="leading-relaxed whitespace-pre-line">
                                    {term.longDefinition}
                                </p>
                            </div>

                            {/* Strategic Insight Block */}
                            <div className={`bg-${stage?.color}-50 rounded-[2rem] p-8 border border-${stage?.color}-100 relative overflow-hidden mb-12`}>
                                <div className={`absolute top-0 right-0 p-4 font-black text-4xl opacity-10 text-${stage?.color}-900`}>INSIGHT</div>
                                <h3 className={`text-xl font-bold mb-4 text-${stage?.color}-900 flex items-center`}>
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    Strategic Context
                                </h3>
                                <p className={`text-${stage?.color}-800 leading-relaxed font-medium`}>
                                    {term.strategicInsight}
                                </p>
                            </div>

                            {/* Calculation Model if applicable */}
                            {term.calculation !== "N/A" && (
                                <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 mb-12">
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Engineering Model</h3>
                                    <div className="bg-white p-6 rounded-2xl border border-gray-200 font-mono text-lg text-gray-900 shadow-inner overflow-x-auto">
                                        {term.calculation}
                                    </div>
                                </div>
                            )}

                            {/* Social Sharing Card CONCEPT */}
                            <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                                        </svg>
                                        Share Intelligence
                                    </h3>
                                    <button
                                        onClick={handleCopySocial}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                    >
                                        {copied ? 'Copied!' : 'Copy LinkedIn Snippet'}
                                    </button>
                                </div>
                                <p className="text-gray-400 italic mb-0 leading-relaxed">
                                    "{term.socialSnippet}"
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Related Actions */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-40 space-y-8">

                            {/* Key Stage Card */}
                            <div className="p-8 rounded-3xl border border-gray-100 bg-gray-50 shadow-sm text-center">
                                <div className={`w-16 h-16 rounded-2xl bg-${stage?.color}-500 text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-${stage?.color}-200`}>
                                    <IconRenderer icon={term.visualIcon} className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{stage?.title} Component</h4>
                                <p className="text-sm text-gray-500 mb-6">{stage?.description}</p>
                                <button
                                    onClick={() => navigate('/glossary')}
                                    className="text-xs font-black uppercase tracking-widest text-[var(--color-primary)] hover:underline"
                                >
                                    View Full Engine
                                </button>
                            </div>

                            {/* Related Playbook Card */}
                            {relatedPlaybook && (
                                <div className="p-8 rounded-3xl border border-gray-900 bg-gray-900 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Execution Guide</h4>
                                    <h5 className="text-xl font-bold mb-4">{relatedPlaybook.title}</h5>
                                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                                        Learn the exact tactical moves to optimize this component in your revenue engine.
                                    </p>
                                    <Link
                                        to={`/playbooks/${relatedPlaybook.category.toLowerCase()}/${relatedPlaybook.slug}`}
                                        className="inline-block w-full py-4 bg-white text-gray-900 rounded-2xl text-center font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg"
                                    >
                                        Analyze Playbook
                                    </Link>
                                </div>
                            )}

                            {/* Support CTA */}
                            <div className="p-8 rounded-3xl border-2 border-dashed border-gray-200 text-center">
                                <p className="text-sm text-gray-500 mb-4 font-medium">Need help implementing this?</p>
                                <Link to="/contact" className="text-sm font-bold text-gray-900 underline">
                                    Talk to an Operator
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default GlossaryDetail;
