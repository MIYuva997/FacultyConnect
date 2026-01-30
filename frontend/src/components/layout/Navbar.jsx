import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // TODO: Get from AuthContext
    const isAuthenticated = false;
    const userRole = null; // 'faculty' or 'institution'

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-[#064E3B]">
                            Faculty<span className="text-[#10B981]">Connect</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-[#064E3B] hover:text-[#10B981] transition-colors font-medium"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/"
                            className="text-[#064E3B] hover:text-[#10B981] transition-colors font-medium"
                        >
                            Companies
                        </Link>
                        <Link
                            to="/"
                            className="text-[#064E3B] hover:text-[#10B981] transition-colors font-medium"
                        >
                            Services
                        </Link>

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-[#064E3B] hover:text-[#10B981] transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <div className="relative group">
                                    <button className="bg-[#10B981] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#059669] transition-all shadow-md hover:shadow-lg flex items-center">
                                        Register
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
                                        <Link
                                            to="/register/faculty"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0FDF4] hover:text-[#10B981] transition-colors"
                                        >
                                            <div className="font-semibold">Register as Faculty</div>
                                            <div className="text-xs text-gray-500">Find teaching jobs</div>
                                        </Link>
                                        <Link
                                            to="/register/institution"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#F0FDF4] hover:text-[#10B981] transition-colors"
                                        >
                                            <div className="font-semibold">Register as Institution</div>
                                            <div className="text-xs text-gray-500">Hire faculty members</div>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={`/dashboard/${userRole}`}
                                    className="text-[#064E3B] hover:text-[#10B981] transition-colors font-medium"
                                >
                                    Dashboard
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-[#064E3B] hover:text-[#10B981] transition-colors font-medium">
                                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white font-semibold">
                                            U
                                        </div>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                /* TODO: Logout */
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-[#064E3B] hover:bg-gray-100"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                        >
                            Companies
                        </Link>
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                        >
                            Services
                        </Link>

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                                >
                                    Login
                                </Link>
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                                        Register
                                    </div>
                                    <Link
                                        to="/register/faculty"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-[#F0FDF4]"
                                    >
                                        <div className="font-semibold">As Faculty</div>
                                        <div className="text-xs text-gray-500">Find teaching jobs</div>
                                    </Link>
                                    <Link
                                        to="/register/institution"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-[#F0FDF4]"
                                    >
                                        <div className="font-semibold">As Institution</div>
                                        <div className="text-xs text-gray-500">Hire faculty members</div>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={`/dashboard/${userRole}`}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        /* TODO: Logout */
                                    }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#064E3B] hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
