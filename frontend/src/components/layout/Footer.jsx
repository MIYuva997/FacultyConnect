import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleNewsletter = (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
    };

    return (
        <footer id="contact" className="bg-[#020617] text-white pt-16 pb-8 mt-auto border-t border-white/5" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2.5 mb-6 group cursor-pointer">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                                <span className="text-white font-black text-xl tracking-tighter">FC</span>
                            </div>
                            <div>
                                <span className="text-xl font-black text-white tracking-tight">Faculty</span>
                                <span className="text-xl font-black text-secondary tracking-tight">Connect</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                            India's #1 academic job portal connecting talented faculty with top-tier premier institutions.
                        </p>
                        <div className="flex space-x-3">
                            {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:-translate-y-1 transition-all border border-white/5">
                                    <span className="text-white opacity-70 group-hover:opacity-100">📱</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-black mb-6 text-white uppercase tracking-[0.2em]">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Browse Jobs', 'For Institutions', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-[15px] text-gray-400 hover:text-primary font-bold transition-all flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-black mb-6 text-white uppercase tracking-[0.2em]">Resources</h3>
                        <ul className="space-y-3">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQs'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-[15px] text-gray-400 hover:text-primary font-bold transition-all flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-black mb-6 text-white uppercase tracking-[0.2em]">Stay Updated</h3>
                        <p className="text-gray-500 text-sm mb-6 font-medium">Get the latest job alerts delivered to your inbox weekly.</p>
                        <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Your work email"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-3 bg-primary text-white rounded-xl font-black text-sm hover:bg-accent hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
                            >
                                Get Weekly Alerts
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 mt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                        <p className="text-gray-600 text-[13px] font-bold">
                            © 2024 FacultyConnect. All rights reserved. Built with ❤️ for the academic community.
                        </p>
                        <div className="flex gap-6 text-[13px] font-bold text-gray-600">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
