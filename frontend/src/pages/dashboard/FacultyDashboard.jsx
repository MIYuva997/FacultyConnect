import React from 'react';
import { Link } from 'react-router-dom';

export default function FacultyDashboard() {
    return (
        <div className="min-h-screen bg-[#F0FDF4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-[#064E3B] mb-2">
                        Welcome Back, Faculty Member!
                    </h1>
                    <p className="text-gray-600">
                        Ready to find your next opportunity? Let's get started.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Applications</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Profile Views</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0%</div>
                        <div className="text-sm text-gray-600 mt-1">Profile Completed</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Saved Jobs</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-[#064E3B] mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/profile/complete"
                            className="flex items-center p-4 border-2 border-[#10B981] rounded-lg hover:bg-[#F0FDF4] transition-all"
                        >
                            <div className="w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center mr-4">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-[#064E3B]">
                                    Complete Profile
                                </div>
                                <div className="text-sm text-gray-600">Get better matches</div>
                            </div>
                        </Link>

                        <Link
                            to="/jobs"
                            className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-[#10B981] hover:bg-[#F0FDF4] transition-all"
                        >
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-[#064E3B]">Search Jobs</div>
                                <div className="text-sm text-gray-600">
                                    Find opportunities
                                </div>
                            </div>
                        </Link>

                        <Link
                            to="/applications"
                            className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-[#10B981] hover:bg-[#F0FDF4] transition-all"
                        >
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-[#064E3B]">
                                    My Applications
                                </div>
                                <div className="text-sm text-gray-600">Track progress</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recommended Jobs */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-[#064E3B] mb-6">
                        Recommended for You
                    </h2>
                    <div className="text-center py-12 text-gray-500">
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-lg font-medium">No recommendations yet</p>
                        <p className="text-sm mt-2">
                            Complete your profile to get personalized job recommendations
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
