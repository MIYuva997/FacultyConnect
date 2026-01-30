import React from 'react';
import { Link } from 'react-router-dom';

export default function InstitutionDashboard() {
    return (
        <div className="min-h-screen bg-[#F0FDF4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-[#064E3B] mb-2">
                        Institution Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your job postings and find the best faculty members.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Applications</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Shortlisted</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="text-2xl font-bold text-[#10B981]">0</div>
                        <div className="text-sm text-gray-600 mt-1">Hired</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-[#064E3B] mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            to="/jobs/post"
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-[#064E3B]">Post a Job</div>
                                <div className="text-sm text-gray-600">Find candidates</div>
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
                                    View Applications
                                </div>
                                <div className="text-sm text-gray-600">Manage candidates</div>
                            </div>
                        </Link>

                        <Link
                            to="/candidates/search"
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
                                <div className="font-semibold text-[#064E3B]">
                                    Search Candidates
                                </div>
                                <div className="text-sm text-gray-600">Find faculty</div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-[#064E3B] mb-6">
                        Recent Activity
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
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-lg font-medium">No recent activity</p>
                        <p className="text-sm mt-2">
                            Post your first job to start receiving applications
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
