import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { caseStudies } from '../../data/caseStudies'; // Correct Import
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const CaseStudyPost = () => {
    const { slug } = useParams();
    // The route is /insights/case-studies/:slug
    // The slug coming in is likely just "scaling-past-series-b-plateau"

    // Check if the exact key exists
    const study = caseStudies[slug];

    if (!study) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="case-study-post bg-white min-h-screen font-sans">
            <Helmet>
                <title>{study.title} | GTM-360</title>
                <meta name="description" content={study.subtitle} />
                <link rel="canonical" href={`https://gtm-360.com${study.slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": study.title,
                        "description": study.subtitle,
                        "author": {
                            "@type": "Organization",
                            "name": "GTM-360"
                        },
                        "articleSection": "Case Study"
                    })}
                </script>
            </Helmet>

            {/* HEADER */}
            <header className="pt-32 pb-16 bg-white border-b border-gray-100">
                <div className="container max-w-4xl">
                    <Link to="/insights" className="flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Insights
                    </Link>

                    <span className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-6 block">
                        Case Study /// {study.client_profile}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 leading-[1.15]">
                        {study.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-serif leading-relaxed italic max-w-3xl">
                        {study.subtitle}
                    </p>
                </div>
            </header>

            {/* METRICS DASHBOARD (BEFORE / AFTER) */}
            <section className="bg-slate-50 border-b border-gray-200 py-12">
                <div className="container max-w-4xl">
                    <h3 className="text-xs font-bold uppercase text-gray-400 mb-6 tracking-widest text-center">Impact Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 text-center">
                            <span className="block text-gray-500 text-sm mb-2 uppercase tracking-wide">Win Rate</span>
                            <div className="flex items-end justify-center gap-3">
                                <span className="text-2xl text-gray-400 line-through decoration-red-400">{study.metrics.before.win_rate}</span>
                                <span className="text-3xl font-bold text-green-600">→ {study.metrics.after.win_rate}</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 text-center">
                            <span className="block text-gray-500 text-sm mb-2 uppercase tracking-wide">YoY Growth</span>
                            <div className="flex items-end justify-center gap-3">
                                <span className="text-2xl text-gray-400 line-through decoration-red-400">{study.metrics.before.growth}</span>
                                <span className="text-3xl font-bold text-green-600">→ {study.metrics.after.growth}</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm border border-gray-100 text-center">
                            <span className="block text-gray-500 text-sm mb-2 uppercase tracking-wide">CAC Payback</span>
                            <div className="flex items-end justify-center gap-3">
                                <span className="text-2xl text-gray-400 line-through decoration-red-400">{study.metrics.before.cac_payback}</span>
                                <span className="text-3xl font-bold text-green-600">→ {study.metrics.after.cac_payback}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BODY CONTENT WITH SIDEBAR NAVIGATION */}
            <article className="py-20">
                <div className="container max-w-6xl text-center md:text-left">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* LEFT: STICKY TOC (Desktop Only) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">Contents</h4>
                                    <nav className="space-y-1 border-l border-gray-200">
                                        <a href="#context" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">1. Context</a>
                                        <a href="#misdiagnosis" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">2. The Misdiagnosis</a>
                                        <a href="#why-reasonable" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">3. Why it seemed right</a>
                                        <a href="#diagnostic" className="block pl-4 py-2 text-sm font-bold text-[var(--color-primary)] border-l-2 border-[var(--color-primary)] -ml-[1px] bg-blue-50/50">4. The Diagnostic Reveal</a>
                                        <a href="#changes" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">5. Structural Changes</a>
                                        <a href="#outcome" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">6. The Outcome</a>
                                        <a href="#why-matters" className="block pl-4 py-2 text-sm text-gray-600 hover:text-[var(--color-primary)] hover:border-l-2 hover:border-[var(--color-primary)] -ml-[1px] transition-all">7. Why it matters</a>
                                    </nav>
                                </div>

                                {/* Mini CTA in Sidebar */}
                                <div className="p-6 bg-slate-50 rounded border border-gray-100">
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Sound familiar?</h4>
                                    <p className="text-xs text-gray-600 mb-4">See if your system has similar constraints.</p>
                                    <Link to="/diagnostic" className="text-xs font-bold text-[var(--color-primary)] hover:underline">Start Diagnostic →</Link>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT: CONTENT */}
                        <div className="lg:col-span-8 prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 max-w-none">

                            {/* SECTION 1: CONTEXT */}
                            <div id="context" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 1. Context
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.context }} />
                            </div>

                            {/* SECTION 2: INITIAL BELIEF */}
                            <div id="misdiagnosis" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 2. The Misdiagnosis
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.initialBelief }} />
                            </div>

                            {/* SECTION 3: WHY REASONABLE */}
                            <div id="why-reasonable" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 3. Why That Explanation Seemed Reasonable
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.whyReasonable }} />
                            </div>

                            {/* SECTION 4: DIAGNOSTIC REVEAL */}
                            <div id="diagnostic" className="scroll-mt-32 mb-16 p-8 bg-indigo-50/50 border-l-4 border-[var(--color-primary)] rounded-r-sm">
                                <h3 className="text-sm font-bold uppercase text-[var(--color-primary)] mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-[var(--color-primary)]"></span> 4. What the Diagnostic Actually Revealed
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.diagnosticReveal }} />
                            </div>

                            {/* SECTION 5: WHAT CHANGED */}
                            <div id="changes" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 5. Structural Changes
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.whatChanged }} />
                            </div>

                            {/* SECTION 6: OUTCOME */}
                            <div id="outcome" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 6. The Outcome
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.outcome }} />
                            </div>

                            {/* SECTION 7: WHY MATTERS */}
                            <div id="why-matters" className="scroll-mt-32 mb-16">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-gray-300"></span> 7. Why This Matters
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: study.sections.whyMatters }} />
                            </div>

                            {/* INTERNAL LINKING (System Context) */}
                            {study.relatedLinks && (
                                <div className="mt-16 pt-10 border-t border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-900 mb-4">Related System Components</h4>
                                    <div className="flex flex-col gap-3">
                                        {study.relatedLinks.map((link, idx) => (
                                            <Link key={idx} to={link.url} className="text-[var(--color-primary)] hover:text-blue-700 font-medium flex items-center group">
                                                {link.text}
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA BLOCK */}
            <section className="py-20 bg-slate-900 text-center">
                <div className="container max-w-2xl">
                    <h3 className="text-[var(--color-primary)] font-bold tracking-widest uppercase text-sm mb-6">
                        Where teams usually start
                    </h3>
                    <p className="text-2xl text-white font-serif italic mb-10 leading-relaxed">
                        When this pattern shows up,<br />
                        most teams begin with a short diagnostic<br />
                        to ensure they are fixing the right constraint.
                    </p>
                    <Link to="/diagnostic" className="btn bg-white text-slate-900 hover:bg-gray-100 px-8 py-3 font-semibold">
                        Start with a Diagnostic →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPost;
