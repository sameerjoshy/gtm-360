import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { caseStudies } from '../../data/insightsData';
import { Helmet } from 'react-helmet-async';

const CaseStudyPost = () => {
    const { slug } = useParams();
    // Use the slug directly if it matches the key, or parse if needed.
    // Our keys are just the filename part e.g. "fixing-the-wrong-problem".
    // The route /insights/case-studies/:slug will pass "fixing-the-wrong-problem".
    const lastSegment = slug.split('/').pop();
    // Since slug in URL is just the last part "fixing-the-wrong-problem", we need to match it.
    // My data uses full slug. Let's fix data access or URL logic.
    // Simpler: The route in App.jsx will be /insights/case-studies/:slug

    // In insightsData.js, keys are "fixing-the-wrong-problem"
    const study = caseStudies[lastSegment];

    if (!study) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="case-study-post bg-white min-h-screen font-sans">
            <Helmet>
                <title>{study.title} | GTM-360</title>
                <meta name="description" content={study.description} />
                <link rel="canonical" href={`https://gtm-360.com${study.slug}`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": study.title,
                        "description": study.description,
                        "author": {
                            "@type": "Organization",
                            "name": "GTM-360"
                        },
                        "articleSection": "Diagnostic Case Study"
                    })}
                </script>
            </Helmet>

            {/* HEADER */}
            <header className="pt-32 pb-16 bg-white border-b border-gray-100">
                <div className="container max-w-3xl">
                    <span className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-6 block">
                        Diagnostic Case Study
                    </span>
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 leading-[1.15]">
                        {study.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-serif leading-relaxed italic">
                        {study.subtitle}
                    </p>
                </div>
            </header>

            {/* BODY CONTENT */}
            <article className="py-20">
                <div className="container max-w-2xl prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">

                    {/* SECTION 1: CONTEXT */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">1. Context</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.context }} />
                    </div>

                    {/* SECTION 2: INITIAL BELIEF */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">2. The Initial Belief (The Misdiagnosis)</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.initialBelief }} />
                    </div>

                    {/* SECTION 3: WHY REASONABLE */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">3. Why That Explanation Seemed Reasonable</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.whyReasonable }} />
                    </div>

                    {/* SECTION 4: DIAGNOSTIC REVEAL */}
                    <div className="mb-16 p-8 bg-slate-50 border-l-4 border-[var(--color-primary)] rounded-r-sm">
                        <h3 className="text-sm font-bold uppercase text-[var(--color-primary)] mb-4 tracking-widest">4. What the Diagnostic Actually Revealed</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.diagnosticReveal }} />
                    </div>

                    {/* SECTION 5: WHAT CHANGED */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">5. What Changed (Structurally)</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.whatChanged }} />
                    </div>

                    {/* SECTION 6: OUTCOME */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">6. The Outcome</h3>
                        <div dangerouslySetInnerHTML={{ __html: study.sections.outcome }} />
                    </div>

                    {/* SECTION 7: WHY MATTERS */}
                    <div className="mb-16">
                        <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">7. Why This Case Matters</h3>
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
            </article>

            {/* CTA BLOCK (Mandatory Soft) */}
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
