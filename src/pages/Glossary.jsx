import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { engineStages, glossaryTerms } from '../data/glossary';
import SEO from '../components/SEO';
import IconRenderer from '../components/visuals/IconRenderer';

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
