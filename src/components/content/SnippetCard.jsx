import React, { useState } from 'react';
import { Share2, Copy, CheckCircle, Twitter, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SnippetCard = ({ snippet }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleTweet = () => {
        const text = encodeURIComponent(`"${snippet}"\n\n— via GTM-360 Intelligence`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    return (
        <div className="group relative bg-white rounded-2xl p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-slate-100 hover:border-blue-100 hover:shadow-[0_8px_30px_-15px_rgba(37,99,235,0.2)] transition-all duration-300">
            {/* GRADIENT ACCENT */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex flex-col h-full justify-between gap-6">
                <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0" />
                    <p className="relative z-10 text-lg font-medium text-slate-700 leading-relaxed font-serif group-hover:text-slate-900 transition-colors">
                        "{snippet}"
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                            G
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                            GTM-360 Intelligence
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* TWEET BUTTON */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleTweet}
                            className="p-2 rounded-full text-slate-400 hover:text-sky-500 hover:bg-sky-50 transition-colors"
                            title="Share on X"
                        >
                            <Twitter className="w-4 h-4" />
                        </motion.button>

                        {/* COPY BUTTON */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className={`p-2 rounded-full transition-colors flex items-center gap-2 ${copied ? 'text-green-600 bg-green-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
                            title="Copy to clipboard"
                        >
                            <AnimatePresence mode='wait'>
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SnippetCard;
