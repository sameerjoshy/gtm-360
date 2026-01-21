import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSubmitLead from '../hooks/useSubmitLead';

const Contact = () => {
    return (
        <div className="contact-page min-h-screen bg-slate-50 relative overflow-hidden">
            <Helmet>
                <title>Start a Conversation | GTM360</title>
                <meta name="description" content="No pitch decks. No pressure. Book a 30-minute diagnostic conversation to map your system constraints and see if we can help." />
            </Helmet>

            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-indigo-100 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

            <section className="section py-32 relative z-10">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* LEFT: Context */}
                        <div className="flex flex-col justify-center animate-fade-in-up">
                            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6">
                                Diagnostic
                            </span>
                            <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Stop guessing. <br />Start <span className="text-indigo-600">Engineering.</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                                We don’t do pitch decks or pressure tactics. The first step is a 30-minute diagnostic to map your system constraints and determine if our model fits your reality.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600 mr-6 flex-shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Zero Obligation</h3>
                                        <p className="text-gray-600 text-sm">If we're not the right fit, we'll tell you who is.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-indigo-600 mr-6 flex-shrink-0">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Direct Access</h3>
                                        <p className="text-gray-600 text-sm">You speak with principals, not account executives.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-200">
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-wider">Direct Lines</h4>
                                <div className="flex flex-col gap-3">
                                    <a href="mailto:sameer@gtm-360.com" className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                                        <Mail className="w-5 h-5 mr-3 text-gray-400" /> sameer@gtm-360.com
                                    </a>
                                    <a href="tel:+14155550123" className="flex items-center text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                                        <Phone className="w-5 h-5 mr-3 text-gray-400" /> +1 (415) 555-0123
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Console Form */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20"></div>
                            <div className="relative bg-slate-900 rounded-2xl p-8 md:p-10 shadow-2xl text-white">
                                <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="font-mono text-xs text-slate-500">diagnostic_terminal_v1.0</span>
                                </div>
                                <HubSpotForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const HubSpotForm = () => {
    const navigate = useNavigate();
    const { submit, status } = useSubmitLead();

    const [formData, setFormData] = React.useState({
        firstname: '',
        email: '',
        company: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await submit('contact', [
            { name: 'firstname', value: formData.firstname },
            { name: 'email', value: formData.email },
            { name: 'company', value: formData.company },
            { name: 'message', value: formData.message }
        ]);

        if (success) {
            navigate('/thank-you');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                <p className="text-slate-400">Signal confirmed. We will initiate contact shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
                <label className="block text-xs font-mono text-indigo-400 uppercase tracking-wider">Identity // Name</label>
                <input
                    type="text"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="Enter your name..."
                />
            </div>

            <div className="space-y-1">
                <label className="block text-xs font-mono text-indigo-400 uppercase tracking-wider">Signal // Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="name@company.com"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-xs font-mono text-indigo-400 uppercase tracking-wider">Entity // Company</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="Company Name / URL"
                />
            </div>

            <div className="space-y-1">
                <label className="block text-xs font-mono text-indigo-400 uppercase tracking-wider">Payload // Context</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none font-mono text-sm"
                    rows="4"
                    placeholder="Briefly describe system anomalies..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 mt-4 transition-all shadow-lg shadow-indigo-500/20"
            >
                {status === 'submitting' ? 'Transmitting...' : 'Initialize Diagnostic'} <ArrowRight className="w-5 h-5" />
            </button>
        </form>
    );
};

export default Contact;
