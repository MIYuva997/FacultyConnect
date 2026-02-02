import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema
const schema = yup.object().shape({
    institutionName: yup.string().required('Institution name is required'),
    institutionType: yup.string().required('Please select institution type'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function InstitutionRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/institution/register',
                {
                    institutionName: data.institutionName,
                    institutionType: data.institutionType,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                }
            );

            setSuccessMessage('Registration successful! Redirecting to login...');
            reset();
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            if (error.response?.data?.message) {
                setApiError(error.response.data.message);
            } else if (error.response?.data?.error) {
                setApiError(error.response.data.error);
            } else {
                setApiError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const institutionTypes = [
        'School - CBSE',
        'School - ICSE',
        'School - State Board',
        'Engineering College',
        'Arts & Science College',
        'Pharmacy College',
        'Law College',
        'Medical College',
        'Management Institute',
        'University',
        'Training Center',
        'Other',
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center px-4 py-8">
            {/* Background Decoration - Hero Grid Style */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-xl relative z-10">
                <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 md:p-9 border border-slate-100 relative overflow-hidden">
                    {/* Header with Hero-style Badge */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                            Institution Portal
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">Join FacultyConnect as a leading employer</p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-8 p-4 bg-green-50/50 backdrop-blur-sm border border-green-100 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                            <span className="text-green-500 text-xl">✨</span>
                            <p className="text-green-800 text-sm font-bold leading-tight">{successMessage}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {apiError && (
                        <div className="mb-8 p-4 bg-red-50/50 backdrop-blur-sm border border-red-100 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                            <span className="text-red-500 text-xl">⚠️</span>
                            <p className="text-red-800 text-sm font-bold leading-tight">{apiError}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Institution Name Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Institution Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <input
                                        id="institutionName"
                                        type="text"
                                        {...register('institutionName')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.institutionName ? 'border-red-300 ring-red-100' : ''}`}
                                        placeholder="Global University"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.institutionName && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.institutionName.message}
                                    </p>
                                )}
                            </div>

                            {/* Institution Type Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Institution Type
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors z-10 pointer-events-none">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <select
                                        id="institutionType"
                                        {...register('institutionType')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium appearance-none text-slate-900 ${errors.institutionType ? 'border-red-300 ring-red-100' : ''}`}
                                        disabled={isLoading}
                                    >
                                        <option value="">Select Type</option>
                                        {institutionTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.institutionType && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.institutionType.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Email Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Official Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.email ? 'border-red-300 ring-red-100' : ''}`}
                                        placeholder="hr@university.edu"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone Number Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Contact Number
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        {...register('phone')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.phone ? 'border-red-300 ring-red-100' : ''}`}
                                        placeholder="10-digit number"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Password Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        {...register('password')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.password ? 'border-red-300 ring-red-100' : ''}`}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field with Icon */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                    Confirm
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        {...register('confirmPassword')}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.confirmPassword ? 'border-red-300 ring-red-100' : ''}`}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs font-medium text-red-500 ml-0.5">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button - Hero Gradient */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-5 px-6 mt-6 rounded-2xl font-bold text-base text-white transition-all duration-300 font-sans flex items-center justify-center group tracking-wide ${isLoading
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98]'
                                } shadow-lg`}
                        >
                            {isLoading ? 'Processing...' : 'Register Institution Now'}
                            {!isLoading && (
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                        <p className="text-sm text-slate-500 font-medium">
                            Already registered?{' '}
                            <a
                                href="/login"
                                className="text-primary hover:text-accent font-bold transition-colors"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
}
