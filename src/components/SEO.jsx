import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ title, description, canonical, type = 'website', children }) => {
    const siteName = 'GTM-360';
    const mainTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = "The Operating System for Revenue Teams. Stop acting like consultants. Start building like engineers.";
    const currentUrl = window.location.href;

    return (
        <Helmet>
            <title>{mainTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <link rel="canonical" href={canonical || currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonical || currentUrl} />
            <meta property="og:title" content={mainTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonical || currentUrl} />
            <meta property="twitter:title" content={mainTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />

            {children}
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    canonical: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.node
};

export default SEO;
