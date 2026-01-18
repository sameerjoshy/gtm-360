import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { engineStages, glossaryTerms } from '../data/glossary';
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

const Glossary = () => {
    const [activeStage, setActiveStage] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesStage = activeStage === 'all' || term.stage === activeStage;
        const matchesSearch = term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStage && matchesSearch;
    });

    const getStageColor = (stageId) => {
        const stage = engineStages.find(s => s.id === stageId);
        return stage ? stage.color : 'gray';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Revenue Intelligence Map | GTM-360 Glossary"
                description="The definitive glossary for RevOps and GTM engineering. Learn the language of the Revenue Operating System."
            />

            {/* Hero Section */}
            <section className="pt-20 pb-12 bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[var(--color-primary)] uppercase bg-blue-50 rounded-full border border-blue-100">
                            The Revenue Operating System
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Revenue Intelligence <span className="text-gradient">Map</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Stop using a dictionary. Start using a blueprint. Our interactive map decodes the complexity of modern GTM engineering.
                        </p>
                    </motion.div>

                    {/* Search & Filter Controls */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Search term, metric, or strategy..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-lg"
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => setActiveStage('all')}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeStage === 'all'
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                                    }`}
                            >
                                All Components
                            </button>
                            {engineStages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setActiveStage(stage.id)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${activeStage === stage.id
                                        ? `bg-white text-gray-900 border-${stage.color}-500 ring-2 ring-${stage.color}-100 shadow-md`
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {stage.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence>
                            {filteredTerms.map((term) => (
                                <Link
                                    to={`/glossary/${term.slug}`}
                                    key={term.id}
                                >
                                    <motion.div
                                        variants={itemVariants}
                                        layout
                                        className="group relative h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Background Accent */}
                                        <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-${getStageColor(term.stage)}-50 rounded-full transition-transform group-hover:scale-150 duration-500 opacity-50`}></div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-6">
                                                <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-${getStageColor(term.stage)}-100 text-${getStageColor(term.stage)}-700 border border-${getStageColor(term.stage)}-200`}>
                                                    {term.type}
                                                </span>
                                                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[var(--color-primary)] transition-colors`}>
                                                    <IconRenderer icon={term.visualIcon} />
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                                {term.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
                                                {term.shortDefinition}
                                            </p>

                                            <div className="flex items-center text-sm font-bold text-[var(--color-secondary)] group-hover:underline">
                                                Analyze Component
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredTerms.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-xl text-gray-500 font-medium">No components found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <h2 className="text-3xl font-bold mb-6">Need the full playbook?</h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            Go beyond definitions and learn how to engineer these concepts into your growth engine.
                        </p>
                        <Link to="/playbooks" className="inline-block bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                            Browse All Playbooks
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Glossary;
