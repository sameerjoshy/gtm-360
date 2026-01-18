import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div className="not-found-page text-center pt-32 pb-20">
            <SEO title="404 - System Disconnected" />
            <section className="section">
                <div className="container max-w-2xl">
                    <h1 className="text-8xl font-bold text-gray-200 mb-6">404</h1>
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">System Disconnected</h2>
                    <p className="text-xl text-gray-600 mb-10">
                        The requested signal could not be found. This path may have been deprecated or never existed.
                    </p>
                    <Link to="/" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90">
                        Return to Dashboard
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
