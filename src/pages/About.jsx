import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import founderAbstract from '../assets/founder_abstract.png';
import brandLogos from '../assets/brand_logos.png';
import { Target, Users, ShieldCheck, Zap, ArrowRight, Quote } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page bg-slate-50 min-h-screen">
            <SEO
                title="Team & Principals"
                description="We are operators, not consultants. Led by former AWS/Amazon executives, we bring architectural rigor to revenue problems."
                canonical="https://gtm-360.com/about"
            />

            {/* BLOCK 1: MANIFESTO INTRO */}
            <section className="section py-32 bg-white relative overflow-hidden">
                <div className="container max-w-5xl relative z-10 text-center opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <span className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase mb-6 block">
                        Our DNA
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-10 text-gray-900 tracking-tight">
                        We bridge the gap between <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-blue-600">Strategy and System.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                        Most companies have plenty of strategy. What they lack is a reliable operating model to translate that strategy into predictable revenue.
                    </p>
                </div>
            </section>

            {/* BLOCK 2: PERSPECTIVE (Dark Mode) */}
            <section className="section bg-slate-900 text-white py-24">
                <div className="container max-w-4xl text-center">
                    <Quote className="w-12 h-12 text-indigo-500 mx-auto mb-8 opacity-50" />
                    <p className="text-3xl md:text-5xl font-serif italic leading-tight text-slate-200 mb-8">
                        "Go-to-market is not a department. It is an operating model."
                    </p>
                    <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
                </div>
            </section>

            {/* BLOCK 3: FOUNDER */}
            <section className="section py-24">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            {/* Founder Image with Abstract Decor */}
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-sm opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700"></div>
                                <img
                                    src={founderAbstract}
                                    alt="Revenue Architecture - Founder Perspective"
                                    className="relative w-full h-auto rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold uppercase text-indigo-600 mb-4 tracking-widest">Founder & Principal</h2>
                            <h3 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Built by operators with 25+ years of scar tissue.</h3>

                            <div className="prose prose-lg text-gray-600 mb-10">
                                <p>
                                    <strong>Sameer</strong> formed GTM-360 after two decades scaling revenue engines at <strong>Pepsi</strong>, <strong>Deloitte</strong>, and <strong>Amazon/AWS</strong>.
                                </p>
                                <p>
                                    He realized that while tools became more abundant, growth became harder. The problem wasn't a lack of data—it was a breakdown in the <em>operating system</em> that governs how revenue decisions are made.
                                </p>
                                <p>
                                    Sameer built GTM-360 to give leadership teams what he wished he had: a rigorous, engineering-led approach to revenue architecture that replaces "heroics" with reliable systems.
                                </p>
                            </div>

                            {/* UPDATED LOGOS SECTION */}
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Previous Experience</p>
                                <img
                                    src={brandLogos}
                                    alt="Experienced at Amazon, AWS, Deloitte, Pepsi"
                                    className="max-w-xs h-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 4: TEAM GRID */}
            <section className="section bg-slate-50 border-t border-gray-200">
                <div className="container">
                    <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">The team behind the work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Users, role: "Revenue Architecture", desc: "Former CROs and VPs of Sales who understand the pressure of the number." },
                            { icon: Target, role: "Data Strategy", desc: "Engineers who treat your CRM as a product, not a database." },
                            { icon: ShieldCheck, role: "Change Governance", desc: "Experts in making new habits stick without cultural friction." }
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                    <member.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{member.role}</h3>
                                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 6: PRINCIPLES (Dark Cards) */}
            <section className="section bg-white">
                <div className="container max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">What we believe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Clarity first", desc: "We don't automate chaos. We fix the logic before we touch the tech." },
                            { title: "Less, but better", desc: "Most GTM systems are too complex. We remove friction." },
                            { title: "Evidence over opinion", desc: "Decisions should be driven by data, not the loudest voice." },
                            { title: "Transfer ownership", desc: "We build systems you can run. We don't want to live in your org." }
                        ].map((principle, i) => (
                            <div key={i} className="group p-8 rounded-xl border border-gray-100 bg-gray-50 hover:bg-slate-900 hover:text-white transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors"></div>
                                    <h3 className="text-xl font-bold group-hover:text-white transition-colors">{principle.title}</h3>
                                </div>
                                <p className="text-gray-600 group-hover:text-slate-400 transition-colors leading-relaxed">
                                    {principle.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-indigo-900 text-white text-center py-32 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container max-w-3xl relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Work with operators, not observers.</h2>
                    <p className="text-xl text-indigo-200 mb-10 font-light">
                        No juniors. No outsourcing. Just experienced hands building your system.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/contact" className="px-8 py-4 bg-white text-indigo-900 rounded-lg hover:bg-indigo-50 transition-colors font-bold flex items-center shadow-2xl">
                            Start a conversation <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
