import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const handleNewsletter = (e) => {
        e.preventDefault();
        alert('Thanks for subscribing!');
    };

    return (
        <footer id="contact" className="bg-dark text-white pt-16 pb-8 mt-auto" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">FC</span>
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white">Faculty</span>
                                <span className="text-xl font-bold text-secondary">Connect</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">India's #1 academic job portal connecting talented faculty with top institutions.</p>
                        <div className="flex space-x-4">
                            {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                                    <span className="text-white">📱</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
                        <ul className="space-y-2">
                            {['Browse Jobs', 'For Institutions', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-secondary transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-secondary">Resources</h3>
                        <ul className="space-y-2">
                            {['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQs'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-secondary transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-secondary">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">Get the latest job alerts delivered to your inbox</p>
                        <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary"
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2024 FacultyConnect. All rights reserved. Made with ❤️ for educators.
                    </p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
