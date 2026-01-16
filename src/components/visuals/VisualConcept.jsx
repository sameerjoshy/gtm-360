import React from 'react';

const VisualConcept = ({ title, description, children, theme = 'dark' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`visual-concept my-12 rounded-sm overflow-hidden border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="p-1 border-b border-opacity-20 border-white bg-opacity-10 bg-white">
                <div className="flex gap-1.5 px-2 py-1">
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                </div>
            </div>

            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h3 className={`text-lg font-bold tracking-widest uppercase mb-4 ${isDark ? 'text-[var(--color-primary)]' : 'text-blue-600'}`}>
                            {title}
                        </h3>
                        <p className={`text-xl font-serif italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                            {description}
                        </p>
                    </div>

                    <div className="order-1 lg:order-2 flex justify-center items-center min-h-[200px]">
                        {children}
                    </div>
                </div>
            </div>

            <div className={`px-4 py-2 text-xs text-center uppercase tracking-widest font-mono ${isDark ? 'text-slate-600 bg-slate-950' : 'text-gray-400 bg-gray-100'}`}>
                System Architecture Visualization
            </div>
        </div>
    );
};

export default VisualConcept;
