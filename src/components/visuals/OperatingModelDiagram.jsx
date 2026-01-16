import React, { useEffect, useState } from 'react';

const OperatingModelDiagram = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    // Steps: 0 = Silos, 1 = Connecting, 2 = Unified, 3 = Unified Pulse

    return (
        <div className="w-full max-w-sm relative aspect-square">
            <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                    <pattern id="grid-op" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-op)" />

                {/* SILOS (Step 0 & 1) */}
                <g style={{ transition: 'all 1s ease', opacity: step >= 2 ? 0.2 : 1 }}>
                    {/* Marketing */}
                    <circle cx="200" cy="100" r={step === 0 ? 30 : 10} fill="none" stroke="#F472B6" strokeWidth="2" />
                    <text x="200" y="85" fill="#F472B6" textAnchor="middle" fontSize="10" opacity={step === 0 ? 1 : 0}>MKTG</text>

                    {/* Sales */}
                    <circle cx="100" cy="300" r={step === 0 ? 30 : 10} fill="none" stroke="#60A5FA" strokeWidth="2" />
                    <text x="100" y="345" fill="#60A5FA" textAnchor="middle" fontSize="10" opacity={step === 0 ? 1 : 0}>SALES</text>

                    {/* CS */}
                    <circle cx="300" cy="300" r={step === 0 ? 30 : 10} fill="none" stroke="#34D399" strokeWidth="2" />
                    <text x="300" y="345" fill="#34D399" textAnchor="middle" fontSize="10" opacity={step === 0 ? 1 : 0}>CS</text>
                </g>

                {/* CONNECTIONS (Step 1) */}
                {step >= 1 && (
                    <g>
                        <line x1="200" y1="100" x2="100" y2="300" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                        <line x1="200" y1="100" x2="300" y2="300" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                        <line x1="100" y1="300" x2="300" y2="300" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
                    </g>
                )}

                {/* UNIFIED HUB (Step 2 & 3) */}
                <g style={{ transition: 'all 1s ease', opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'scale(1)' : 'scale(0.5)', transformOrigin: '200px 200px' }}>
                    <circle cx="200" cy="230" r="60" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="2" />
                    <text x="200" y="235" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">REVENUE OS</text>

                    {/* Orbiting dots */}
                    {step === 3 && (
                        <>
                            <circle cx="200" cy="170" r="4" fill="#3B82F6" className="animate-ping" />
                            <circle cx="260" cy="230" r="4" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.3s' }} />
                            <circle cx="140" cy="230" r="4" fill="#3B82F6" className="animate-ping" style={{ animationDelay: '0.6s' }} />
                        </>
                    )}
                </g>
            </svg>
            <div className="absolute top-4 right-4 text-[var(--color-primary)] text-xs font-mono">
                {step < 2 ? 'STATE: SILOED' : 'STATE: UNIFIED'}
            </div>
        </div>
    );
};

export default OperatingModelDiagram;
