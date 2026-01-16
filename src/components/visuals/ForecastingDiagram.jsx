import React, { useEffect, useState } from 'react';

const ForecastingDiagram = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-sm relative aspect-square">
            <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                    <pattern id="grid-fc" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-fc)" />

                {/* OPINION CLOUD (Step 0) */}
                <g style={{ transition: 'all 1s ease', opacity: step < 2 ? 1 : 0.1, transform: step < 2 ? 'translate(0,0)' : 'translate(-50px, -50px) scale(0.8)' }}>
                    <path d="M100,200 Q100,150 150,150 Q170,100 220,120 Q280,100 300,150 Q350,150 350,200 Q350,250 300,250 L100,250 Q50,250 100,200 Z"
                        fill="rgba(255,255,255,0.1)" stroke="gray" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="200" y="210" fill="gray" textAnchor="middle" fontSize="16">OPINION / HOPE</text>
                    <text x="200" y="180" fill="gray" textAnchor="middle" fontSize="24">?</text>
                </g>

                {/* EVIDENCE GRID (Step 2+) */}
                <g style={{ transition: 'all 1s ease', opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? 'translate(0,0)' : 'translate(0, 50px)' }}>
                    {/* Axes */}
                    <line x1="50" y1="350" x2="350" y2="350" stroke="white" strokeWidth="2" />
                    <line x1="50" y1="350" x2="50" y2="50" stroke="white" strokeWidth="2" />

                    {/* Bars */}
                    <rect x="80" y={step >= 2 ? 250 : 350} width="40" height={step >= 2 ? 100 : 0} fill="#3B82F6" style={{ transition: 'all 1s 0.2s' }} />
                    <rect x="150" y={step >= 2 ? 200 : 350} width="40" height={step >= 2 ? 150 : 0} fill="#3B82F6" style={{ transition: 'all 1s 0.4s' }} />
                    <rect x="220" y={step >= 2 ? 150 : 350} width="40" height={step >= 2 ? 200 : 0} fill="#3B82F6" style={{ transition: 'all 1s 0.6s' }} />
                    <rect x="290" y={step >= 2 ? 100 : 350} width="40" height={step >= 2 ? 250 : 0} fill="#3B82F6" style={{ transition: 'all 1s 0.8s' }} />

                    {/* Trend Line */}
                    {step === 3 && (
                        <polyline points="100,250 170,200 240,150 310,100" fill="none" stroke="#22D3EE" strokeWidth="3" className="animate-pulse" />
                    )}
                    <text x="200" y="380" fill="white" textAnchor="middle" fontSize="14" letterSpacing="2">EVIDENCE</text>
                </g>
            </svg>
            <div className="absolute top-4 right-4 text-[var(--color-primary)] text-xs font-mono">
                {step < 2 ? 'MODE: GUESSING' : 'MODE: MATHEMATICAL'}
            </div>
        </div>
    );
};

export default ForecastingDiagram;
