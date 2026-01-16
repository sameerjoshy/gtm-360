import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * AEOSchema - Renders JSON-LD for AI Search Optimization
 * @param {string} type - 'HowTo' | 'FAQPage' | 'Article'
 * @param {object} data - The data object to be converted to schema
 */
const AEOSchema = ({ type, data }) => {
    let schema = null;

    if (type === 'HowTo') {
        schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": data.name,
            "description": data.description,
            "step": data.steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.title,
                "text": step.text
            }))
        };
    } else if (type === 'FAQPage') {
        schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.questions.map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                }
            }))
        };
    }

    if (!schema) return null;

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default AEOSchema;
