import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import App from './App.jsx';
import './index.css';

// Initialize GA4 with your Measurement ID
const MEASUREMENT_ID = "G-ZYCR2GTVQ8";
ReactGA.initialize(MEASUREMENT_ID);

const Root = () => {
    // Track initial page load
    // Track initial page load and signal pre-renderer
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });

        // Signal to vite-plugin-prerender that React has mounted
        // Small delay to ensure DOM paint
        setTimeout(() => {
            document.dispatchEvent(new Event('custom-render-trigger'));
        }, 500);
    }, []);

    return (
        <React.StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
