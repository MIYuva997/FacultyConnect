import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // TODO: Get from AuthContext
    const isAuthenticated = false;
    const userRole = null; // 'faculty' or 'institution'

    const handleGetStarted = () => {
        navigate('/register/faculty');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-white/60 backdrop-blur-md py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-black text-xl tracking-tighter">FC</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl font-black text-dark tracking-tight">
                                Faculty
                            </span>
                            <span className="text-2xl font-black text-secondary tracking-tight">Connect</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Browse Jobs', 'For Institutions', 'About Us', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to="/"
                                className="text-[15px] text-gray-600 hover:text-primary font-semibold transition-all hover:-translate-y-0.5"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-5">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-[15px] text-gray-700 font-bold hover:text-primary transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={handleGetStarted}
                                    className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-[15px] hover:bg-accent hover:shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all active:scale-95"
                                >
                                    Get Started
                                </button>
                            </>
                        ) : (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-dark hover:text-primary transition-colors font-bold">
                                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
                                        {userRole?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl py-2 hidden group-hover:block border border-gray-100 animate-fadeIn backdrop-blur-xl">
                                    <Link to={`/dashboard/${userRole}`} className="block px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:text-primary transition-colors">Dashboard</Link>
                                    <Link to="/profile" className="block px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-indigo-50 hover:text-primary transition-colors">My Profile</Link>
                                    <div className="border-t border-gray-100 my-1 mx-2"></div>
                                    <button className="block w-full text-left px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">Logout</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all active:scale-90"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 animate-reveal-up shadow-2xl">
                    <div className="px-4 pt-4 pb-8 space-y-2">
                        {['Browse Jobs', 'For Institutions', 'About Us', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to="/"
                                className="block px-4 py-3 text-[16px] font-bold text-gray-700 hover:text-primary hover:bg-indigo-50 rounded-xl transition-all"
                            >
                                {item}
                            </Link>
                        ))}

                        {!isAuthenticated ? (
                            <div className="pt-6 space-y-4 px-2">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full px-4 py-3 text-left text-[16px] font-bold text-gray-700 hover:text-primary transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={handleGetStarted}
                                    className="w-full px-6 py-4 bg-primary text-white rounded-xl font-bold text-center shadow-lg shadow-primary/20 hover:bg-accent transition-all active:scale-95 text-[16px]"
                                >
                                    Get Started Free
                                </button>
                            </div>
                        ) : (
                            <div className="pt-6 border-t border-gray-100 mx-2">
                                <Link to={`/dashboard/${userRole}`} className="block px-4 py-3 text-[16px] font-bold text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
                                <button className="block w-full text-left px-4 py-3 text-[16px] font-bold text-red-600 transition-colors">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
