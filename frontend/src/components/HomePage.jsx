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
            <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-amber-50">
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
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <span className="text-dark">Your Dream</span>
                                <br />
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-secondary via-amber-500 to-secondary bg-clip-text text-transparent animate-gradient">
                                        Teaching Career
                                    </span>
                                    {/* Underline Decoration */}
                                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-secondary/30 to-amber-500/30 blur-sm"></div>
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
                                    className="group px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-base hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <span>Get Started Free</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                                            className="w-full py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-semibold text-base hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <span>Search 500+ Jobs</span>
                                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
                    {/* Department Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {[
                            { name: 'Engineering', icon: '🏗️' },
                            { name: 'Medical', icon: '🏥' },
                            { name: 'Pharmacy', icon: '💊' },
                            { name: 'Arts & Science', icon: '🎨' },
                            { name: 'Law', icon: '⚖️' },
                            { name: 'Management', icon: '💼' },
                            { name: 'Education', icon: '📚' },
                            { name: 'Computer Science', icon: '💻' },
                        ].map((dept, index) => (
                            <button
                                key={index}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full hover:border-primary hover:shadow-md transition-all group"
                            >
                                <span className="text-xl">{dept.icon}</span>
                                <span className="font-medium text-gray-700 group-hover:text-primary">{dept.name}</span>
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}
                    </div>

                    {/* Top Institutions - Glass Cards */}
                    <div className="mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-3">Top <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Institutions</span> Hiring Now</h2>
                        <p className="text-center text-gray-500 mb-10">Join 50,000+ faculty members at India's premier institutions</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { name: 'IITs', count: '120+', jobs: 'Open Positions', icon: '🏛️', border: 'border-l-indigo-400', hover: 'hover:bg-indigo-50', countColor: 'text-indigo-600' },
                                { name: 'NITs', count: '85+', jobs: 'Open Positions', icon: '🎓', border: 'border-l-violet-400', hover: 'hover:bg-violet-50', countColor: 'text-violet-600' },
                                { name: 'Private', count: '200+', jobs: 'Open Positions', icon: '🏫', border: 'border-l-amber-400', hover: 'hover:bg-amber-50', countColor: 'text-amber-600' },
                                { name: 'Medical', count: '95+', jobs: 'Open Positions', icon: '🏥', border: 'border-l-rose-400', hover: 'hover:bg-rose-50', countColor: 'text-rose-600' },
                                { name: 'Engineering', count: '180+', jobs: 'Open Positions', icon: '⚙️', border: 'border-l-teal-400', hover: 'hover:bg-teal-50', countColor: 'text-teal-600' },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl p-6 cursor-pointer group border-l-4 ${item.border} border border-gray-100 ${item.hover} hover:shadow-lg transition-all duration-300 text-center`}
                                >
                                    {/* Icon */}
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>

                                    {/* Name */}
                                    <h3 className="font-bold text-dark text-lg mb-2">{item.name}</h3>

                                    {/* Count */}
                                    <p className={`text-3xl font-black ${item.countColor} mb-1`}>{item.count}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{item.jobs}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View All */}
                    <div className="text-center">
                        <button className="group px-8 py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2">
                            Explore All Institutions
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works - Floating Cards */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
                            How It <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Works</span>
                        </h2>
                        <p className="text-gray-500">Your journey to the perfect academic position in 3 simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Create Profile', desc: 'Build your comprehensive academic profile with qualifications, research & publications', icon: '👤', accent: 'bg-primary' },
                            { step: '02', title: 'Get Matched', desc: 'Our AI matches you with relevant opportunities from 500+ verified institutions', icon: '🤝', accent: 'bg-secondary' },
                            { step: '03', title: 'Start Working', desc: 'Apply with one click and receive interview calls within 48 hours', icon: '🚀', accent: 'bg-green-500' },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                {/* Card */}
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group">
                                    {/* Step Number Badge */}
                                    <div className={`${item.accent} text-white font-black text-sm w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                        {item.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-6xl mb-5">{item.icon}</div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>

                                {/* Connector Arrow */}
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                                            →
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section - Constrained Width */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 text-white rounded-[40px] p-8 md:p-14 relative overflow-hidden shadow-2xl shadow-indigo-200/20">
                        {/* Background decorations */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
                        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float-slow"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                                    Everything You Need, <span className="bg-gradient-to-r from-secondary via-amber-400 to-secondary bg-clip-text text-transparent animate-gradient">One Platform</span>
                                </h2>
                                <p className="text-sm text-white/60">
                                    Manage your entire academic career journey with our intuitive dashboard
                                </p>
                            </div>

                            {/* Dashboard Features Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                                {[
                                    { icon: '📊', title: 'Profile Analytics', desc: 'Track views, matches & performance', color: 'from-blue-500 to-indigo-600' },
                                    { icon: '💼', title: 'Job Tracker', desc: 'Monitor all your applications', color: 'from-purple-500 to-pink-600' },
                                    { icon: '📅', title: 'Interview Scheduler', desc: 'Manage upcoming interviews', color: 'from-secondary to-amber-600' },
                                    { icon: '📁', title: 'Document Vault', desc: 'Store certificates & resume', color: 'from-green-500 to-emerald-600' },
                                ].map((feature, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group hover:scale-105">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                                        <p className="text-white/60 text-sm">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Dashboard Preview Card */}
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">Faculty Dashboard Preview</h3>
                                        <ul className="space-y-4">
                                            {[
                                                { icon: '✓', text: 'Profile completion tracker with step-by-step guidance' },
                                                { icon: '✓', text: 'Real-time job recommendations based on your profile' },
                                                { icon: '✓', text: 'Application status with institution responses' },
                                                { icon: '✓', text: 'Saved jobs and custom job alerts' },
                                                { icon: '✓', text: 'Interview calendar with reminders' },
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shrink-0">{item.icon}</span>
                                                    <span className="text-white/80">{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={() => navigate('/register/faculty')}
                                            className="mt-8 px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-black text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                        >
                                            Get Your Dashboard
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Mock Dashboard UI */}
                                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                                                <span className="text-white/60 text-sm">Profile Completion</span>
                                                <span className="text-secondary font-bold">85%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full w-[85%] bg-gradient-to-r from-secondary to-amber-500 rounded-full"></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 mt-4">
                                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                                    <div className="text-2xl font-bold text-white">12</div>
                                                    <div className="text-xs text-white/60">Applied Jobs</div>
                                                </div>
                                                <div className="bg-white/10 rounded-lg p-3 text-center">
                                                    <div className="text-2xl font-bold text-green-400">5</div>
                                                    <div className="text-xs text-white/60">Interviews</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                            Why <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">FacultyConnect</span>?
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
                                className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                            >
                                {/* Subtle internal glow */}
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-2xl`}></div>

                                <div className="relative">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center text-white text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                        {benefit.icon}
                                    </div>

                                    <h3 className="text-lg font-black text-dark mb-3 tracking-tight">{benefit.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-8">{benefit.description}</p>

                                    {/* Stat badge */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                        <span className="text-xl font-black text-dark">{benefit.stat}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{benefit.statLabel}</span>
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
                            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
                                Featured <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Jobs</span>
                            </h2>
                            <p className="text-gray-500 mt-2">Discover hand-picked opportunities from top-tier institutions</p>
                        </div>
                        <button className="group mt-6 md:mt-0 px-6 py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
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
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-[32px] p-8 border border-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group relative">
                                {job.urgent && (
                                    <div className="absolute top-6 right-6">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider rounded-full border border-red-100">
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                                            Urgent
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform group-hover:rotate-6 transition-transform">
                                        {job.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-dark text-lg leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                                        <p className="text-gray-500 font-medium">{job.inst}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                        <span className="text-lg">📍</span> {job.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                                        <span className="text-lg">📚</span> {job.dept}
                                    </div>
                                    <div className="flex items-center justify-between bg-emerald-50/30 p-3 rounded-2xl border border-emerald-100/50">
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Salary</span>
                                        <span className="text-sm font-black text-emerald-600">{job.salary}/mo</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <span className="px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">{job.type}</span>
                                    <button className="flex items-center gap-2 text-primary font-black text-sm group-hover:gap-3 transition-all">
                                        Quick Apply
                                        <span className="text-lg">→</span>
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
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
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-[32px] p-10 border border-white shadow-sm hover:shadow-xl transition-all duration-500 group relative">
                                {/* Floating Quote Icon */}
                                <div className={`absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-xl flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform`}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V4H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.5693 13 5.017 13H3.017V4H13.017V15C13.017 18.3137 10.3307 21 7.017 21H5.017Z" />
                                    </svg>
                                </div>

                                <div className="mb-8">
                                    <p className="text-gray-700 text-lg leading-relaxed font-medium">"{testimonial.quote}"</p>
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-3xl shadow-md transform group-hover:scale-110 transition-transform`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-dark tracking-tight">{testimonial.name}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mt-6">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <span key={i} className="text-amber-400 text-sm">⭐</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section - Hero Style Match */}
            <section className="py-16 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-amber-50">
                {/* EXACT Hero Background Copy */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl"></div>

                    {/* Floating Shapes for that "Hero" feel */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-2xl rotate-12 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-2xl -rotate-12 animate-pulse"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/60 backdrop-blur-xl rounded-[40px] p-8 md:p-14 border border-white shadow-2xl text-center relative overflow-hidden group">
                        {/* Internal glows */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm mb-10 border border-primary/10">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-sm font-bold text-dark/80 tracking-wide">Join 150+ Top Indian Institutions</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-dark mb-6 leading-tight">
                                Ready to Transform <br />
                                <span className="bg-gradient-to-r from-secondary via-amber-500 to-secondary bg-clip-text text-transparent animate-gradient">
                                    Your Career?
                                </span>
                            </h2>

                            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
                                Experience the future of academic hiring. Your dream role at India's premier institution is just a registration away.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => navigate('/register/faculty')}
                                    className="group px-8 py-4 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-[18px] font-black text-base hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Faculty Registration</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => navigate('/register/institution')}
                                    className="px-8 py-4 bg-white text-dark border-2 border-gray-100 rounded-[18px] font-black text-base hover:border-primary hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Institution Login</span>
                                    <span className="text-primary text-xl">→</span>
                                </button>
                            </div>

                            {/* Trust indicators at bottom */}
                            <div className="mt-12 pt-8 border-t border-gray-100/50 flex flex-wrap justify-center items-center gap-8">
                                {[
                                    { label: 'Verified Profiles', val: '15k+' },
                                    { label: 'Partner Schools', val: '500+' },
                                    { label: 'Hire Time', val: '48hrs' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-xl font-black text-dark mb-0.5">{stat.val}</div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content handled by Global Footer */}
        </div >
    );
}
