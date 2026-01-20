import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { playbooks } from '../data/playbooks';
import { BookOpen, Video, Lock, ArrowRight, Filter } from 'lucide-react';

const Playbooks = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [notified, setNotified] = useState(null); // Track which playbook user asked to be notified about

    const categories = ["All", "Marketing", "Sales", "CS", "RevOps"];

    const filteredPlaybooks = activeCategory === "All"
        ? playbooks
        : playbooks.filter(p => p.category === activeCategory);

    const handleNotify = (e, playbookId) => {
        e.preventDefault();
        setNotified(playbookId);
        setTimeout(() => setNotified(null), 3000); // Reset after 3 seconds
    };

    return (
        <div className="playbooks-page min-h-screen bg-slate-50">
            <Helmet>
                <title>GTM Playbooks | The Source Code for Revenue Growth</title>
                <meta name="description" content="A repository of battle-tested GTM strategies, scripts, and frameworks. Open source revenue engineering." />
            </Helmet>

            {/* HEADER */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-20"></div>
                <div className="container max-w-6xl relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        The Repository
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
                        Open source "Source Code" for revenue growth.<br />
                        Strategies, Scripts, and Operating Models.
                    </p>
                </div>
            </section>

            {/* FILTER BAR */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
                <div className="container max-w-6xl">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* GRID */}
            <section className="section py-12">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlaybooks.map(playbook => (
                            <div key={playbook.id} className="relative">
                                <Link
                                    to={playbook.content ? `/playbooks/${playbook.category.toLowerCase()}/${playbook.slug}` : '#'}
                                    onClick={(e) => !playbook.content && handleNotify(e, playbook.id)}
                                    className={`group block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 h-full flex flex-col ${playbook.content ? 'hover:shadow-xl hover:-translate-y-1' : 'opacity-90 hover:border-orange-200'}`}
                                >
                                    <div className="p-8 h-full flex flex-col">
                                        {/* Meta */}
                                        <div className="flex justify-between items-center mb-6">
                                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${playbook.category === 'Marketing' ? 'bg-blue-100 text-blue-700' :
                                                playbook.category === 'Sales' ? 'bg-green-100 text-green-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {playbook.category}
                                            </span>
                                            {playbook.content ? (
                                                <span className="text-xs text-slate-400 font-mono">{playbook.readTime}</span>
                                            ) : (
                                                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full transition-colors ${notified === playbook.id ? 'bg-green-100 text-green-700' : 'text-orange-500 bg-orange-50'}`}>
                                                    {notified === playbook.id ? 'Waitlist Joined' : <><Lock className="w-3 h-3" /> Coming Soon</>}
                                                </span>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                            {playbook.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                                            {playbook.subtitle}
                                        </p>

                                        {/* Footer */}
                                        {playbook.content ? (
                                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-[var(--color-primary)]">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Doc</span>
                                                    <span className="flex items-center gap-1 text-gray-400">|</span>
                                                    <span className="flex items-center gap-1"><Video className="w-4 h-4" /> Script</span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        ) : (
                                            <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-orange-600/70">
                                                <span className="text-xs font-mono">Status: In Engineering</span>
                                                <span className="text-xs font-bold group-hover:text-orange-600 transition-colors">
                                                    {notified === playbook.id ? '✓ You will be notified' : 'Notify Me'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Playbooks;
