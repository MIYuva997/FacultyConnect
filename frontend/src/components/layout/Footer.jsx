import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#064E3B] text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Faculty<span className="text-[#10B981]">Connect</span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Connecting academic talent with opportunities across India.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Faculty</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register/faculty"
                                    className="hover:text-[#10B981] transition-colors"
                                >
                                    Create Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Career Resources
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">For Institutions</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Post Jobs
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Search Candidates
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-[#10B981] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>
                        © 2026 FacultyConnect.com. All rights reserved. Empowering academic
                        careers across India.
                    </p>
                </div>
            </div>
        </footer>
    );
}
