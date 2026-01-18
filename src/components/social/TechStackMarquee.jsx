import React from 'react';

const Logo = ({ label, path, viewBox = "0 0 24 24" }) => (
    <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
        <svg viewBox={viewBox} className="h-6 w-auto fill-current">
            <path d={path} />
        </svg>
        <span className="font-semibold text-lg tracking-tight hidden md:block">{label}</span>
    </div>
);

const TechStackMarquee = () => {
    const tools = [
        { label: "Salesforce", path: "M16.1 7.2c-.7-.3-1.4-.4-2.1-.4-1.6 0-3.1.6-4.2 1.7-1.1-1-2.6-1.7-4.2-1.7-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5c1.1 0 2.2-.3 3.1-.9.9 1.5 2.6 2.6 4.6 2.6 1.7 0 3.2-.8 4.2-2.1.8.8 2 1.3 3.2 1.3 2.5 0 4.6-2 4.6-4.6-.2-2.5-2.2-4.5-4.7-4.5-.7 0-1.4.1-2 .3-.9-1.6-2.6-2.7-4.5-2.7z", viewBox: "0 0 24 24" },
        { label: "HubSpot", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm4 0h-2v-2h2v2zm-2-4h-2V7h2v6z", viewBox: "0 0 24 24" },
        { label: "6sense", path: "M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z", viewBox: "0 0 24 24" }, // Simplified triangle
        { label: "Gong", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M12 6l-4 8 8-4-8-4 4 8z", viewBox: "0 0 24 24" }, // Abstract
        { label: "Outreach", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z", viewBox: "0 0 24 24" },
        { label: "Clay", path: "M4 4h16v16H4z", viewBox: "0 0 24 24" } // Square
    ];

    // Duplicate for infinite scroll
    const items = [...tools, ...tools, ...tools];

    return (
        <section className="border-b border-gray-100 bg-white/50 backdrop-blur-sm overflow-hidden py-8">
            <div className="container flex items-center gap-8">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Systems we engineer
                </p>

                <div className="flex-1 overflow-hidden relative mask-linear-fade">
                    <div className="flex gap-16 animate-marquee whitespace-nowrap">
                        {items.map((tool, i) => (
                            <Logo key={i} {...tool} />
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default TechStackMarquee;
