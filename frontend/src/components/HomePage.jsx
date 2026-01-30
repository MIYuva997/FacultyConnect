import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');

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

    const categories = [
        { name: 'Engineering', icon: '⚙️', jobs: 180, color: 'from-blue-400 to-blue-600' },
        { name: 'Medical', icon: '🏥', jobs: 95, color: 'from-red-400 to-red-600' },
        { name: 'Pharmacy', icon: '💊', jobs: 65, color: 'from-green-400 to-green-600' },
        { name: 'Arts & Science', icon: '🎨', jobs: 120, color: 'from-purple-400 to-purple-600' },
        { name: 'Law', icon: '⚖️', jobs: 45, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Management', icon: '💼', jobs: 80, color: 'from-indigo-400 to-indigo-600' },
    ];

    const benefits = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: '100% Verified',
            description: 'All institutions verified with AICTE, UGC, and NAAC certifications',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Quick Hiring',
            description: 'Get interview calls within 48 hours of applying',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: 'Secure Platform',
            description: 'Your data is encrypted and never shared without permission',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: '24/7 Support',
            description: 'Dedicated support team to help you at every step',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section with Search */}
            <section className="relative bg-gradient-to-br from-[#D1FAE5] via-[#F0FDF4] to-[#A7F3D0] pt-20 pb-32 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#10B981] opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981] opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#10B981] opacity-5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md mb-8 animate-bounce">
                            <span className="w-2 h-2 bg-[#10B981] rounded-full mr-2 animate-pulse"></span>
                            <span className="text-sm font-semibold text-[#064E3B]">
                                Trusted by 150+ Institutions • 3,000+ Faculty
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#064E3B] leading-tight mb-6">
                            Find Your Dream Teaching{' '}
                            <span className="text-[#10B981] relative inline-block">
                                Position
                                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                                    <path d="M1 9C50 3.5 150 1 299 9" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">
                                In India's Top Institutions
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            Join India's #1 academic job portal. Connect with verified institutions,
                            apply with one click, and start your teaching career today.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8">
                            <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3 hover:shadow-3xl transition-shadow">
                                <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Job title, subject, or keyword..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                                    />
                                </div>

                                <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="City, state, or remote..."
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#10B981] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#059669] transition-all shadow-lg hover:shadow-xl flex items-center justify-center group"
                                >
                                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search Jobs
                                </button>
                            </div>
                        </form>

                        {/* Quick Search Tags */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="text-sm text-gray-600 font-medium">Trending:</span>
                            {['Professor', 'Assistant Professor', 'Lecturer', 'PhD Faculty', 'Research Associate'].map((tag) => (
                                <button
                                    key={tag}
                                    className="px-4 py-2 bg-white text-[#064E3B] rounded-full text-sm font-medium hover:bg-[#10B981] hover:text-white transition-all shadow-sm hover:shadow-md transform hover:scale-105"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Animated Stats Section */}
            <section className="py-12 bg-[#064E3B]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center transform hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold text-[#10B981] mb-2">{institutions}+</div>
                            <div className="text-white text-sm">Verified Institutions</div>
                        </div>
                        <div className="text-center transform hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold text-[#10B981] mb-2">{faculty.toLocaleString()}+</div>
                            <div className="text-white text-sm">Active Faculty</div>
                        </div>
                        <div className="text-center transform hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold text-[#10B981] mb-2">{jobs}+</div>
                            <div className="text-white text-sm">Job Openings</div>
                        </div>
                        <div className="text-center transform hover:scale-110 transition-transform">
                            <div className="text-5xl font-bold text-[#10B981] mb-2">95%</div>
                            <div className="text-white text-sm">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Browse by Category */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#064E3B] mb-4">Browse by Department</h2>
                        <p className="text-xl text-gray-600">Find opportunities in your field of expertise</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all cursor-pointer group transform hover:scale-105"
                            >
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform`}>
                                    {category.icon}
                                </div>
                                <h3 className="font-bold text-[#064E3B] mb-2">{category.name}</h3>
                                <p className="text-sm text-gray-600">{category.jobs} jobs</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#064E3B] mb-4">Why FacultyConnect?</h2>
                        <p className="text-xl text-gray-600">The most trusted platform for academic hiring</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-[#F0FDF4] to-white rounded-2xl p-8 border-2 border-transparent hover:border-[#10B981] transition-all group"
                            >
                                <div className="w-16 h-16 bg-[#10B981] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#064E3B] mb-3">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-br from-[#F0FDF4] to-[#D1FAE5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#064E3B] mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get hired in 3 simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: 1,
                                title: 'Create Profile',
                                description: 'Build your professional profile with qualifications, experience, teaching expertise, and research publications.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ),
                            },
                            {
                                step: 2,
                                title: 'Search & Apply',
                                description: 'Browse verified job openings, filter by location and subject, and apply with one click using your profile.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                ),
                            },
                            {
                                step: 3,
                                title: 'Get Hired',
                                description: 'Receive interview calls, track application status, and start your academic journey with top institutions.',
                                icon: (
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                            },
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative group">
                                <div className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-125 transition-transform">
                                    {item.step}
                                </div>
                                <div className="mt-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#F0FDF4] to-[#D1FAE5] rounded-2xl flex items-center justify-center text-[#10B981] mb-6 group-hover:rotate-6 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#064E3B] mb-4">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Jobs Preview */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-[#064E3B] mb-2">Latest Opportunities</h2>
                            <p className="text-gray-600">Hot jobs from top institutions</p>
                        </div>
                        <button className="px-8 py-3 border-2 border-[#10B981] text-[#10B981] rounded-xl font-semibold hover:bg-[#10B981] hover:text-white transition-all flex items-center group">
                            View All Jobs
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Assistant Professor', dept: 'Computer Science', location: 'Mumbai', salary: '₹6-8 LPA', type: 'Full-Time' },
                            { title: 'Associate Professor', dept: 'Pharmacy', location: 'Delhi', salary: '₹8-10 LPA', type: 'Full-Time' },
                            { title: 'Lecturer', dept: 'Arts & Science', location: 'Bangalore', salary: '₹4-6 LPA', type: 'Part-Time' },
                        ].map((job, index) => (
                            <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#10B981] hover:shadow-2xl transition-all cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#F0FDF4] to-[#D1FAE5] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full shadow-md">
                                        NEW
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-[#064E3B] mb-2 group-hover:text-[#10B981] transition-colors">{job.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{job.dept}</p>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        {job.location}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {job.salary}
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap mb-5">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{job.type}</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">PhD Preferred</span>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-xl font-semibold hover:from-[#059669] hover:to-[#047857] transition-all shadow-md hover:shadow-lg group-hover:scale-105">
                                    Apply Now →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gradient-to-br from-[#F0FDF4] to-[#D1FAE5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-[#064E3B] mb-4">Success Stories</h2>
                        <p className="text-xl text-gray-600">Hear from our community of 3,000+ faculty members</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Dr. Priya Sharma', role: 'Assistant Professor, Computer Science', institute: 'IIT Delhi', text: 'Found my dream job in just 2 weeks! The process was seamless and the support team was incredibly helpful throughout.' },
                            { name: 'Prof. Rajesh Kumar', role: 'Associate Professor, Pharmacy', institute: 'NIPER Mohali', text: 'The verified job postings saved me from scam opportunities. I got hired by a top institution with full transparency.' },
                            { name: 'Dr. Anjali Verma', role: 'Lecturer, Arts & Science', institute: 'Delhi University', text: 'As a fresh PhD graduate, I was worried about finding the right opportunity. FacultyConnect made it easy!' },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all group">
                                <div className="flex items-center mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#064E3B]">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                        <div className="text-xs text-[#10B981] font-semibold">{testimonial.institute}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-3xl p-12 text-center shadow-2xl">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Never Miss an Opportunity</h3>
                        <p className="text-white/90 mb-8 text-lg">
                            Subscribe to get the latest job postings delivered to your inbox weekly
                        </p>
                        <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="flex-1 px-6 py-4 rounded-xl border-none outline-none text-gray-700"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white text-[#10B981] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Career?
                    </h2>
                    <p className="text-xl text-white/90 mb-10">
                        Join 3,000+ faculty members who found their dream teaching positions through FacultyConnect
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/register/faculty')}
                            className="px-12 py-5 bg-white text-[#10B981] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105 flex items-center justify-center group"
                        >
                            Register as Faculty
                            <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate('/register/institution')}
                            className="px-12 py-5 bg-transparent border-3 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-[#10B981] transition-all shadow-2xl transform hover:scale-105"
                        >
                            Register as Institution
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
