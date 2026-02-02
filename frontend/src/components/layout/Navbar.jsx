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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">FC</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Faculty
                            </span>
                            <span className="text-2xl font-bold text-secondary">Connect</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">Browse Jobs</Link>
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">For Institutions</Link>
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">About Us</Link>
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-2.5 text-primary font-semibold hover:text-accent transition-colors"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={handleGetStarted}
                                    className="px-6 py-2.5 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    Get Started
                                </button>
                            </>
                        ) : (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-dark hover:text-primary transition-colors font-medium">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shadow-sm">
                                        {userRole?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block border border-gray-100 animate-fadeIn">
                                    <Link to={`/dashboard/${userRole}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-primary">Dashboard</Link>
                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-primary">My Profile</Link>
                                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-indigo-50 rounded-lg">Browse Jobs</Link>
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-indigo-50 rounded-lg">For Institutions</Link>
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-indigo-50 rounded-lg">About Us</Link>
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-indigo-50 rounded-lg">Contact</Link>

                        {!isAuthenticated ? (
                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full px-3 py-2 text-left text-base font-medium text-gray-700 hover:text-primary"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={handleGetStarted}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-bold text-center shadow-lg"
                                >
                                    Get Started Free
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-100">
                                <Link to={`/dashboard/${userRole}`} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary">Dashboard</Link>
                                <button className="block w-full text-left px-3 py-2 text-base font-medium text-red-600">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
