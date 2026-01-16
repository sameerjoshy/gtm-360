import React, { useEffect, useState } from 'react';
import { Filter, PauseCircle } from 'lucide-react';

const PipelineFunnel = () => {
    const [step, setStep] = useState(0);

    // Simple animation loop
    useEffect(() => {
        const timer = setInterval(() => {
            setStep(s => (s + 1) % 4);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-sm relative aspect-square">
            {/* Background Grid */}
            <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* THE "BEFORE" (Leaky Funnel) - Ghosted */}
                <g opacity="0.1" transform="translate(50, 50)">
                    <path d="M0,0 L120,300 L180,300 L300,0 Z" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="150" y="150" fill="white" textAnchor="middle" fontSize="12" fontFamily="monospace">UNDEFINED LOGIC</text>
                </g>

                {/* THE "AFTER" (Gated Pipe) */}
                <g transform="translate(50, 50)">
                    {/* Stage 1: Qualification */}
                    <rect x="50" y="0" width="200" height="60" rx="4"
                        fill={step >= 0 ? "rgba(59, 130, 246, 0.2)" : "none"}
                        stroke="#3B82F6" strokeWidth="2" />
                    <text x="150" y="35" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">1. DECISION FILTER</text>

                    {/* Arrow */}
                    <path d="M150,60 L150,80" stroke="white" strokeWidth="2" markerEnd="url(#arrow)" />

                    {/* Stage 2: Diagnostic */}
                    <rect x="70" y="80" width="160" height="60" rx="4"
                        fill={step >= 1 ? "rgba(59, 130, 246, 0.4)" : "none"}
                        stroke="#3B82F6" strokeWidth="2" />
                    <text x="150" y="115" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">2. DIAGNOSTIC</text>

                    {/* Arrow */}
                    <path d="M150,140 L150,160" stroke="white" strokeWidth="2" />

                    {/* Stage 3: Solution */}
                    <rect x="90" y="160" width="120" height="60" rx="4"
                        fill={step >= 2 ? "rgba(59, 130, 246, 0.6)" : "none"}
                        stroke="#3B82F6" strokeWidth="2" />
                    <text x="150" y="195" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">3. SOLUTION</text>

                    {/* Output */}
                    <circle cx="150" cy="270" r="30" fill={step >= 3 ? "#3B82F6" : "none"} stroke="#3B82F6" strokeWidth="2" />
                    <text x="150" y="275" fill="white" textAnchor="middle" fontSize="10" fontWeight="bold">REVENUE</text>
                </g>

                {/* Animated Particles */}
                {step === 0 && <circle cx="150" cy="30" r="4" fill="#00e5ff" />}
                {step === 1 && <circle cx="150" cy="110" r="4" fill="#00e5ff" />}
                {step === 2 && <circle cx="150" cy="190" r="4" fill="#00e5ff" />}
                {step === 3 && <circle cx="150" cy="270" r="4" fill="#00e5ff" />}
            </svg>

            {/* Status Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 text-[var(--color-primary)] text-xs font-mono">
                <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
                SYSTEM_ACTIVE
            </div>
        </div>
    );
};

export default PipelineFunnel;
