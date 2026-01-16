import React, { useEffect, useState } from 'react';

const SignalNoiseDiagram = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    // Generate random noise dots
    const noiseDots = Array.from({ length: 20 }).map((_, i) => ({
        cx: Math.random() * 300 + 50,
        cy: Math.random() * 300 + 50,
        r: Math.random() * 3 + 1
    }));

    return (
        <div className="w-full max-w-sm relative aspect-square">
            <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                    <pattern id="grid-sn" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-sn)" />

                {/* NOISE (Step 0) */}
                <g style={{ transition: 'all 1s', opacity: step < 2 ? 1 : 0.2 }}>
                    {noiseDots.map((d, i) => (
                        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="gray" className={step < 2 ? "animate-pulse" : ""} />
                    ))}
                    <text x="200" y="380" fill="gray" textAnchor="middle" fontSize="12">UNFILTERED SIGNALS</text>
                </g>

                {/* FILTER (Step 1) */}
                <g style={{ transition: 'all 0.5s', opacity: step >= 1 ? 1 : 0 }}>
                    <rect x="150" y="0" width="100" height="400" fill="rgba(59, 130, 246, 0.1)" />
                    <line x1="150" y1="0" x2="150" y2="400" stroke="#3B82F6" strokeWidth="1" />
                    <line x1="250" y1="0" x2="250" y2="400" stroke="#3B82F6" strokeWidth="1" />
                </g>

                {/* CLARITY (Step 2+) */}
                {step >= 2 && (
                    <g>
                        <circle cx="200" cy="100" r="8" fill="#22D3EE" className="animate-bounce" />
                        <circle cx="200" cy="200" r="8" fill="#22D3EE" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <circle cx="200" cy="300" r="8" fill="#22D3EE" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <text x="200" y="350" fill="#22D3EE" textAnchor="middle" fontSize="14" fontWeight="bold">VALIDATED INTENT</text>
                    </g>
                )}
            </svg>
            <div className="absolute top-4 right-4 text-[var(--color-primary)] text-xs font-mono">
                {step < 2 ? 'SIGNAL: NOSY' : 'SIGNAL: FILTERED'}
            </div>
        </div>
    );
};

export default SignalNoiseDiagram;
