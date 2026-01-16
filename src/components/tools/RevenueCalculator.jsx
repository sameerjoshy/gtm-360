import React, { useState } from 'react';
import { ArrowRight, Check, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const RevenueCalculator = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const questions = [
        {
            id: 1,
            text: "How accurate is your revenue forecast week-to-week?",
            options: [
                { text: "Within 5% variance", points: 10 },
                { text: "It swings 10-20%", points: 5 },
                { text: "We mostly guess", points: 0 }
            ]
        },
        {
            id: 2,
            text: "When sales misses a target, what happens?",
            options: [
                { text: "We analyze the root cause systemically", points: 10 },
                { text: "We increase activity metrics (calls/emails)", points: 5 },
                { text: "We blame the leads / marketing", points: 0 }
            ]
        },
        {
            id: 3,
            text: "Is your GTM strategy documented and aligned?",
            options: [
                { text: "Yes, fully clearly defined", points: 10 },
                { text: "Sort of, it's in a few decks", points: 5 },
                { text: "No, it's mostly in people's heads", points: 0 }
            ]
        }
    ];

    const handleAnswer = (points) => {
        setScore(score + points);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setIsFinished(true);
        }
    };

    const reset = () => {
        setStep(0);
        setScore(0);
        setIsFinished(false);
    };

    const getResult = () => {
        if (score >= 25) return {
            tier: "Elite System",
            msg: "Your engine is tuned. You likely just need optimization."
        };
        if (score >= 15) return {
            tier: "Constrained System",
            msg: "You have potential, but friction is slowing you down."
        };
        return {
            tier: "Chaotic System",
            msg: "Your growth is accidental, not engineered. You are at risk."
        };
    };

    return (
        <div className="bg-slate-900 rounded-sm p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10">
                <div className="mb-8">
                    <span className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase mb-2 block">
                        Micro-Diagnostic
                    </span>
                    <h3 className="text-2xl font-bold">Revenue Maturity Calculator</h3>
                </div>

                {!isFinished ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
                            <span>Question {step + 1} of {questions.length}</span>
                            <span>{Math.round(((step) / questions.length) * 100)}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-800 h-1 mb-8 rounded-full overflow-hidden">
                            <div
                                className="bg-[var(--color-primary)] h-full transition-all duration-500 ease-out"
                                style={{ width: `${((step) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <h4 className="text-xl md:text-2xl mb-8 font-light">
                            {questions[step].text}
                        </h4>

                        <div className="flex flex-col gap-3">
                            {questions[step].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.points)}
                                    className="text-left p-4 rounded bg-slate-800 hover:bg-slate-700 hover:text-[var(--color-primary)] border border-transparent hover:border-[var(--color-primary)] transition-all duration-200 group flex items-center justify-between"
                                >
                                    <span>{opt.text}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-4">
                        <div className="inline-block p-4 rounded-full bg-slate-800 mb-6">
                            <Check className="w-8 h-8 text-green-400" />
                        </div>

                        <h4 className="text-gray-400 uppercase tracking-widest text-sm mb-2">Diagnosis Complete</h4>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            {getResult().tier}
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
                            {getResult().msg}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                to="/diagnostic"
                                className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 px-8 py-3"
                            >
                                Get Full Plan
                            </Link>
                            <button
                                onClick={reset}
                                className="flex items-center justify-center gap-2 text-gray-400 hover:text-white px-8 py-3"
                            >
                                <RefreshCcw className="w-4 h-4" /> Retake
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueCalculator;
