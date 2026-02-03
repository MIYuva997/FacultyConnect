import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animated counter hook
    const useCounter = (end, duration = 2000) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / duration;

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }, [end, duration]);

        return count;
    };

    const institutions = useCounter(150);
    const faculty = useCounter(3000);
    const jobs = useCounter(500);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm, 'in', location);
    };

    const handleNewsletter = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
        alert('Thanks for subscribing!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Content handled by Global Navbar */}

            {/* Hero Section - Ultra Modern Design */}
            <section className="relative pt-32 md:pt-44 pb-16 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-amber-50">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    {/* Gradient Orbs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"></div>

                    {/* Floating Shapes */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-2xl rotate-12 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute bottom-40 right-40 w-24 h-24 bg-accent/10 rounded-2xl -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="text-left">
                            {/* Trust Badge */}
                            <div className="inline-flex items-center px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-8 border border-primary/20 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white"></div>
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-amber-400 border-2 border-white"></div>
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white"></div>
                                    </div>
                                    <span className="text-sm font-semibold text-dark">
                                        Trusted by <span className="text-primary">150+ Institutions</span>
                                    </span>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.2] mb-6 tracking-tight">
                                <span className="text-dark">Your Dream</span>
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="bg-gradient-to-r from-secondary via-amber-500 to-secondary bg-clip-text text-transparent animate-gradient italic">
                                        Teaching Career
                                    </span>
                                    {/* Underline Decoration */}
                                    <div className="absolute -bottom-1.5 left-0 right-0 h-2 bg-gradient-to-r from-secondary/30 to-amber-500/30 blur-sm"></div>
                                </span>
                                <br />
                                <span className="text-dark">Starts Here</span>
                            </h1>

                            <p className="text-base text-gray-600 mb-8 max-w-xl leading-relaxed">
                                Connect with <span className="font-bold text-primary">India's top institutions</span>,
                                apply to <span className="font-bold text-secondary">500+ positions</span>,
                                and land your perfect role in <span className="font-bold text-accent">48 hours</span>.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button
                                    onClick={() => navigate('/register/faculty')}
                                    className="group px-8 py-3.5 bg-primary text-white rounded-xl font-bold text-base hover:bg-accent hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Get Started Free</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                                <button
                                    className="px-6 py-3 bg-white text-dark rounded-xl font-semibold text-base hover:shadow-xl transition-all border-2 border-gray-200 hover:border-primary"
                                >
                                    Watch Demo →
                                </button>
                            </div>

                            {/* Social Proof */}
                            <div className="flex items-center gap-8 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                                {String.fromCharCode(64 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="font-bold text-dark">3,000+</div>
                                        <div className="text-gray-500">Active Faculty</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <svg key={i} className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="font-bold text-dark">4.9/5</div>
                                        <div className="text-gray-500">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Search Card */}
                        <div className="relative max-w-md mx-auto">
                            {/* Attractive Search Card with Gradient */}
                            <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-amber-50/30 rounded-3xl shadow-2xl p-5 border-2 border-indigo-100 backdrop-blur-sm overflow-hidden">
                                {/* Decorative gradient orb */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold text-dark">Find Your Perfect Role</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 ml-12">Search from 500+ verified positions</p>

                                    <form onSubmit={handleSearch} className="space-y-3">
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-primary group-focus-within:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Job title or keyword..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm shadow-sm"
                                            />
                                        </div>

                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-primary group-focus-within:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Location or remote..."
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm shadow-sm"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base hover:bg-accent hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <span>Search 500+ Jobs</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </form>

                                    {/* 95% Success Rate Badge */}
                                    <div className="mt-4 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl p-3 border border-green-300/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-xl shadow-md">
                                                ✅
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-dark">95%</div>
                                                <div className="text-xs text-gray-600 font-semibold">Success Rate</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Popular Searches */}
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500 mb-2 font-semibold flex items-center gap-1">
                                            <span className="text-base">🔥</span> Popular Searches:
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Professor', 'Assistant Professor', 'Lecturer', 'PhD Faculty'].map((tag) => (
                                                <button
                                                    key={tag}
                                                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-primary rounded-lg text-xs font-medium hover:from-primary hover:to-accent hover:text-white transition-all hover:scale-105 shadow-sm"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section - Clean Modern */}
            <section className="py-10 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { number: institutions, suffix: '+', label: 'Institutions', icon: '🏛️' },
                            { number: faculty.toLocaleString(), suffix: '+', label: 'Faculty Members', icon: '👨‍🏫' },
                            { number: jobs, suffix: '+', label: 'Job Openings', icon: '💼' },
                            { number: '95', suffix: '%', label: 'Success Rate', icon: '✨' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <div className="text-2xl sm:text-3xl font-bold text-dark">
                                    {stat.number}{stat.suffix}
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted By - Clean Inline */}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
                        <p className="text-sm text-gray-500 font-medium">Trusted by leading institutions including:</p>
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {['IIT Delhi', 'AIIMS', 'VIT', 'NIT', 'BITS', 'Anna University'].map((inst, i) => (
                                <span key={i} className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-100 hover:border-primary hover:text-primary transition-colors">
                                    {inst}
                                </span>
                            ))}
                            <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold">
                                +140 more
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Department - Naukri Style */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Elite Department Discovery */}
                    <div className="flex flex-wrap justify-center gap-4 mb-20">
                        {[
                            { name: 'Engineering', icon: '🏗️', color: 'indigo' },
                            { name: 'Medical', icon: '🏥', color: 'rose' },
                            { name: 'Pharmacy', icon: '💊', color: 'emerald' },
                            { name: 'Arts & Science', icon: '🎨', color: 'amber' },
                            { name: 'Law', icon: '⚖️', color: 'slate' },
                            { name: 'Management', icon: '💼', color: 'blue' },
                            { name: 'Education', icon: '📚', color: 'violet' },
                            { name: 'Computer Science', icon: '💻', color: 'cyan' },
                        ].map((dept, index) => (
                            <button
                                key={index}
                                className="inline-flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="text-2xl group-hover:scale-125 transition-transform duration-500">{dept.icon}</div>
                                <span className="text-sm font-black text-dark/70 group-hover:text-primary tracking-tight transition-colors uppercase">{dept.name}</span>
                                <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <svg className="w-3 h-3 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Elite Institutional Partners - Showcase UI */}
                    <div className="mt-24 relative">
                        <div className="absolute inset-0 bg-slate-50/50 rounded-[48px] -rotate-1 origin-center"></div>
                        <div className="relative bg-white border border-slate-100 rounded-[40px] p-10 md:p-16 shadow-2xl shadow-indigo-500/5">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                                    <span>Global Network</span>
                                    <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black text-dark mb-6 tracking-tight">
                                    Trusted by India's <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">Premier Institutions</span>
                                </h2>
                                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                                    Join the elite network connecting 50,000+ top-tier faculty with the nation's most prestigious academic organizations.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {[
                                    { name: 'IIT NETWORK', count: '120+', jobs: 'Active Openings', icon: '🏛️', color: 'from-blue-600 to-indigo-700', badge: 'Tier 1' },
                                    { name: 'NIT SYSTEM', count: '85+', jobs: 'Active Openings', icon: '🏰', color: 'from-violet-600 to-purple-700', badge: 'Centrally Funded' },
                                    { name: 'DEEMED UNIV', count: '200+', jobs: 'Active Openings', icon: '🏫', color: 'from-amber-500 to-orange-600', badge: 'Private A+' },
                                    { name: 'MEDICAL COLLEGES', count: '95+', jobs: 'Active Openings', icon: '🩺', color: 'from-rose-500 to-pink-600', badge: 'NIRF Ranked' },
                                    { name: 'ENGG INSTITUTES', count: '180+', jobs: 'Active Openings', icon: '⚙️', color: 'from-emerald-500 to-teal-600', badge: 'NAAC A++' },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="group relative bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`}></div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white border border-slate-200 rounded-md shadow-sm">{item.badge}</span>
                                            </div>

                                            <h3 className="font-black text-dark text-xs uppercase tracking-[0.2em] mb-1 opacity-60">{item.name}</h3>
                                            <div className="text-4xl font-black text-dark mb-4 tracking-tighter tabular-nums flex items-baseline gap-1">
                                                {item.count}
                                                <span className="text-primary text-2xl animate-pulse">.</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                {item.jobs}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 text-center">
                                <button className="group relative px-10 py-5 bg-dark text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase overflow-hidden hover:shadow-2xl transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="relative z-10 flex items-center gap-3">
                                        Partner Engagement Hub
                                        <span className="text-lg">→</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - Elite Journey UI */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <span>The Roadmap</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-dark mb-6 tracking-tight">
                            Your Elite <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">Academic Journey</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                            Experience a streamlined, high-tech path from registration to your dream faculty position.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connecting Path - Desktop */}
                        <div className="hidden lg:block absolute top-[100px] left-[10%] right-[10%] h-[2px] bg-slate-100">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 relative">
                            {[
                                { step: '01', title: 'Power Profile', desc: 'Synthesize your research and academic achievements into a world-class digital portfolio.', icon: '⚡' },
                                { step: '02', title: 'Elite Match', desc: 'Our AI engine facilitates precision discovery within India\'s most celebrated institutions.', icon: '🎯' },
                                { step: '03', title: 'Career Launch', desc: 'Experience 48-hour interview response times and finalize your premier placement.', icon: '🦅' },
                            ].map((item, index) => (
                                <div key={index} className="relative group">
                                    {/* Step Number Node */}
                                    <div className="mb-12 relative flex justify-center">
                                        <div className="w-20 h-20 bg-white rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center text-3xl z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            {item.icon}
                                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-dark text-white rounded-xl text-[10px] font-black flex items-center justify-center shadow-lg group-hover:bg-primary transition-colors">
                                                {item.step}
                                            </div>
                                        </div>
                                        {/* Outer Ring Glow */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>

                                    <div className="text-center px-4">
                                        <h3 className="text-2xl font-black text-dark mb-4 tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Mobile Connector */}
                                    {index < 2 && (
                                        <div className="lg:hidden flex justify-center mt-12">
                                            <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent opacity-20"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section - Elite Premium Layered UI */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background Technical Grid & Orbs - Light Theme Optimized */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px]"></div>
                    <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-10 left-[-10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                            <span>Platform Intelligence</span>
                            <span className="w-1 h-1 bg-primary rounded-full animate-ping"></span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-black text-dark mb-6 tracking-tight leading-tight">
                            Everything You Need <br />
                            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">In One Powerful View</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                            The future of academic recruitment management, distilled into a high-fidelity experience.
                        </p>
                    </div>

                    {/* Elite Dashboard Stack */}
                    <div className="relative group">
                        {/* Decorative Outer Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity"></div>

                        <div className="bg-slate-900 rounded-[32px] p-2 md:p-3 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden">
                            {/* Inner Glass Glow */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <div className="bg-[#0f172a] rounded-[24px] overflow-hidden border border-white/10 flex flex-col md:flex-row min-h-[500px]">
                                {/* Mock Sidebar */}
                                <div className="w-full md:w-64 bg-slate-900/50 border-b md:border-b-0 md:border-r border-white/5 p-6 space-y-8">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-white font-black text-xl tracking-tighter">FC</span>
                                        </div>
                                        <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`h-10 rounded-xl flex items-center px-4 gap-3 ${i === 1 ? 'bg-primary/20 border border-primary/20' : 'hover:bg-white/5 transition-colors'}`}>
                                                <div className={`w-4 h-4 rounded ${i === 1 ? 'bg-primary' : 'bg-white/20'}`}></div>
                                                <div className={`h-3 rounded-full ${i === 1 ? 'bg-white/40 w-20' : 'bg-white/10 w-16'}`}></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mock Content Area */}
                                <div className="flex-1 p-6 md:p-10 bg-[radial-gradient(circle_at_top_right,#ffffff03,transparent)]">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="space-y-2">
                                            <div className="h-6 w-48 bg-white/20 rounded-lg"></div>
                                            <div className="h-3 w-32 bg-white/10 rounded-full"></div>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10"></div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                                        {[
                                            { label: 'Applications', val: '24', color: 'text-blue-400' },
                                            { label: 'Interviews', val: '08', color: 'text-emerald-400' },
                                            { label: 'Profile Views', val: '1.2k', color: 'text-amber-400' },
                                            { label: 'Job Alerts', val: '12', color: 'text-purple-400' }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group/card">
                                                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{stat.label}</div>
                                                <div className={`text-2xl font-black ${stat.color} tabular-nums`}>{stat.val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mock Main Section */}
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 space-y-4">
                                            <div className="h-40 bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group/chart">
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent translate-y-20 group-hover/chart:translate-y-0 transition-transform duration-700"></div>
                                                <div className="relative flex items-end justify-between h-full gap-2">
                                                    {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                                                        <div key={i} className="flex-1 bg-primary/20 rounded-t-lg transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-24 bg-white/5 border border-white/10 rounded-2xl"></div>
                                                <div className="h-24 bg-white/5 border border-white/10 rounded-2xl"></div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <div className="h-4 w-full bg-white/20 rounded-full"></div>
                                                <div className="h-3 w-3/4 bg-white/10 rounded-full"></div>
                                                <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
                                            </div>
                                            <button
                                                onClick={() => navigate('/register/faculty')}
                                                className="w-full py-4 bg-primary rounded-2xl text-white font-black text-xs tracking-widest uppercase hover:bg-accent hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] transition-all"
                                            >
                                                Go Premium Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Micro-Features */}
                        <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 space-y-4 translate-x-1/2">
                            {[
                                { icon: '🔒', text: 'Secure Vault' },
                                { icon: '⚡', text: 'Fast Match' },
                                { icon: '📊', text: 'Smart Insights' }
                            ].map((f, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 flex items-center gap-3 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-sm">{f.icon}</div>
                                    <span className="text-xs font-black text-dark tracking-tight pr-4 whitespace-nowrap">{f.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Hero Style */}
            <section id="about" className="py-20 relative overflow-hidden bg-white">
                {/* Decorative Elements - Grid & Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"></div>
                </div>

                <div id="institutions" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-dark mb-4 tracking-tight">
                            Why Faculty<span className="text-secondary italic">Connect</span>?
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">The most trusted platform for academic hiring, built for the modern educator.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '✅',
                                title: '100% Verified',
                                description: 'All institutions verified with AICTE, UGC, and NAAC certifications.',
                                gradient: 'from-green-500 to-emerald-600',
                                stat: '500+',
                                statLabel: 'Verified Jobs'
                            },
                            {
                                icon: '⚡',
                                title: 'Quick Hiring',
                                description: 'Get interview calls within 48 hours of applying to top positions.',
                                gradient: 'from-orange-400 to-amber-600',
                                stat: '48h',
                                statLabel: 'Response Time'
                            },
                            {
                                icon: '🔒',
                                title: 'Secure Platform',
                                description: 'Your data is encrypted and never shared without your written permission.',
                                gradient: 'from-indigo-500 to-primary',
                                stat: '100%',
                                statLabel: 'Data Privacy'
                            },
                            {
                                icon: '🎯',
                                title: '24/7 Support',
                                description: 'Dedicated academic support team to help you at every single step.',
                                gradient: 'from-accent to-indigo-700',
                                stat: '24/7',
                                statLabel: 'Available'
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white/90 backdrop-blur-md rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group relative overflow-hidden"
                            >
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center text-white text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-indigo-500/10`}>
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-dark tracking-tight">{benefit.title}</h3>
                                    </div>

                                    <p className="text-sm text-gray-500 leading-relaxed mb-6 h-12 line-clamp-2">{benefit.description}</p>

                                    {/* Stat badge - Integrated Tech Style */}
                                    <div className="flex items-center gap-4 pt-5 border-t border-slate-50">
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{benefit.statLabel}</div>
                                            <div className="text-xl font-black text-dark tabular-nums">{benefit.stat}</div>
                                        </div>
                                        <div className={`w-1.5 h-8 bg-gradient-to-b ${benefit.gradient} rounded-full opacity-20`}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section - Hero Style */}
            <section id="jobs" className="py-20 relative overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-amber-50/50">
                {/* Decorative Elements - Grid & Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-dark">
                                Featured <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Jobs</span>
                            </h2>
                            <p className="text-gray-500 mt-2">Discover hand-picked opportunities from top-tier institutions</p>
                        </div>
                        <button className="group mt-6 md:mt-0 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-accent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                            View All Jobs
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Associate Professor', dept: 'Computer Science', inst: 'IIT Delhi', location: 'New Delhi', salary: '₹1.5L - 2.2L', type: 'Full-time', urgent: true, icon: '🎓' },
                            { title: 'Assistant Professor', dept: 'Mechanical Engineering', inst: 'VIT Vellore', location: 'Tamil Nadu', salary: '₹80K - 1.2L', type: 'Full-time', urgent: false, icon: '⚙️' },
                            { title: 'Professor', dept: 'Management Studies', inst: 'XLRI Jamshedpur', location: 'Jharkhand', salary: '₹2.0L - 3.5L', type: 'Full-time', urgent: true, icon: '💼' },
                        ].map((job, index) => (
                            <div key={index} className="bg-white/90 backdrop-blur-md rounded-[24px] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group relative">
                                {job.urgent && (
                                    <div className="absolute top-5 right-5">
                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-wider rounded-lg border border-red-100">
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                                            Urgent
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary/10 transform transition-transform group-hover:scale-110">
                                        {job.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-base tracking-tight leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                                        <p className="text-gray-400 text-xs font-bold">{job.inst}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="opacity-70">📍</span> {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <span className="opacity-70">📚</span> {job.dept}
                                    </div>
                                    <div className="flex items-center justify-between bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/50">
                                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest leading-none">Monthly Salary</span>
                                        <span className="text-sm font-black text-emerald-600 leading-none">{job.salary}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                                    <span className="px-3 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-lg">Full Time</span>
                                    <button className="flex items-center gap-2 text-primary font-black text-xs hover:gap-3 transition-all tabular-nums">
                                        QUICK APPLY
                                        <span className="text-sm">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Hero Style */}
            <section className="py-20 relative overflow-hidden bg-white">
                {/* Decorative Elements - Grid & Orbs */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-dark mb-4">
                            What Our <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Faculty Say</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Join thousands of academic professionals who have transformed their careers through FacultyConnect.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Dr. Priya Sharma', role: 'Associate Professor, IIT Bombay', quote: 'FacultyConnect shifted my career trajectory. The seamless application process is unlike anything else in India.', avatar: '👩‍🏫', color: 'from-blue-500 to-indigo-600' },
                            { name: 'Prof. Rajesh Kumar', role: 'Professor, AIIMS Delhi', quote: 'Finally, a platform that understands the specific needs of academic research and faculty hiring.', avatar: '👨‍🏫', color: 'from-amber-500 to-orange-600' },
                            { name: 'Dr. Ananya Patel', role: 'Assistant Professor, NIT Trichy', quote: 'The transparency and speed of response from institutions through this portal is highly impressive.', avatar: '👩‍🏫', color: 'from-emerald-500 to-teal-600' },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white/90 backdrop-blur-md rounded-[24px] p-7 md:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group relative overflow-hidden">
                                {/* Quote Icon - Integrated Style */}
                                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${testimonial.color} opacity-10 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity`}></div>

                                <div className="relative">
                                    <div className="mb-6">
                                        <p className="text-gray-600 text-[15px] leading-relaxed font-bold italic">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-6 mt-auto border-t border-slate-50">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/10 transform transition-transform group-hover:scale-110`}>
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-dark tracking-tight text-sm uppercase">{testimonial.name}</h4>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mt-5">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <span key={i} className="text-amber-400 text-xs">⭐</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section - Elite Launchpad UI */}
            <section className="py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white/80 text-[9px] font-black uppercase tracking-[0.3em] mb-6 animate-bounce-slow">
                        <span>The Ultimate Launchpad</span>
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    </div>

                    <h2 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
                        Ready to <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent italic">Transform</span> <br />
                        Your Academic Career?
                    </h2>

                    <p className="text-gray-400 max-w-xl mx-auto text-base mb-8 font-medium">
                        Join 5,000+ elite faculty members already discovered by India's premier institutions.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/register/faculty')}
                            className="group relative w-full sm:w-auto px-8 py-3.5 bg-white text-dark rounded-xl font-black text-[12px] tracking-widest uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative z-10 group-hover:text-white transition-colors">Launch Your Career</span>
                        </button>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 backdrop-blur-md text-white rounded-xl font-black text-[12px] tracking-widest uppercase border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                        >
                            Log Into Dashboard
                        </button>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-10 gap-y-4 opacity-30">
                        {['IIT DELHI', 'BITS PILANI', 'VIT VELLORE', 'NIT TRICHY', 'RELIANCE'].map(n => (
                            <span key={n} className="text-[11px] font-black text-white tracking-[0.4em]">{n}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content handled by Global Footer */}
        </div >
    );
}
