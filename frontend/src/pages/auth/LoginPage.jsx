import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    password: yup.string().required('Password is required'),
    userType: yup.string().required('Please select user type'),
});

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            userType: 'faculty',
        },
    });

    const userType = watch('userType');

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with actual API call
            console.log('Login data:', data);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Navigate to appropriate dashboard
            if (data.userType === 'faculty') {
                navigate('/dashboard/faculty');
            } else {
                navigate('/dashboard/institution');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center px-4 py-8">
            {/* Background Decoration - Hero Grid Style */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[440px] relative z-10">
                <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 md:p-9 border border-slate-100 relative overflow-hidden">
                    {/* Header with Hero-style Badge */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">Sign in to your account</p>
                    </div>

                    {/* Compact User Type Toggle - Segmented style */}
                    <div className="grid grid-cols-2 p-1 bg-slate-50 rounded-xl mb-8 border border-slate-100">
                        <button
                            type="button"
                            onClick={() => register('userType').onChange({ target: { value: 'faculty', name: 'userType' } })}
                            className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all ${userType === 'faculty'
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {userType === 'faculty' && (
                                <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            Faculty
                        </button>
                        <button
                            type="button"
                            onClick={() => register('userType').onChange({ target: { value: 'institution', name: 'userType' } })}
                            className={`flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold transition-all ${userType === 'institution'
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {userType === 'institution' && (
                                <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            Institution
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                            <span className="text-red-500">⚠️</span>
                            <p className="text-red-800 text-xs font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field with Icon */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.email ? 'border-red-300 ring-red-100' : ''}`}
                                    placeholder="name@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs font-medium text-red-500 ml-0.5">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field with Icon */}
                        <div className="space-y-1.5">
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
                                    type="password"
                                    {...register('password')}
                                    className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.password ? 'border-red-300 ring-red-100' : ''}`}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2 px-0.5">
                                <label className="flex items-center text-xs font-medium text-slate-500 cursor-pointer group">
                                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary mr-2 transition-colors" />
                                    Remember me
                                </label>
                                <Link to="/forgot-password" size="xs" className="text-xs font-semibold text-primary hover:text-accent transition-colors underline-offset-4 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            {errors.password && (
                                <p className="text-xs font-medium text-red-500 ml-0.5">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button - Hero Gradient */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-5 px-6 rounded-2xl font-bold text-base text-white transition-all duration-300 font-sans flex items-center justify-center group tracking-wide ${isLoading
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary via-accent to-secondary hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.98]'
                                } shadow-lg mt-2`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In Now'}
                            {!isLoading && (
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs font-medium text-slate-400">
                                <span className="px-3 bg-white">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all group font-sans">
                                <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">Google</span>
                            </button>
                            <button className="flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all group font-sans">
                                <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">LinkedIn</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center font-sans">
                        <p className="text-sm text-slate-500 font-medium">
                            Don't have an account?{' '}
                            <Link
                                to={userType === 'faculty' ? '/register/faculty' : '/register/institution'}
                                className="text-primary hover:text-accent font-bold transition-colors"
                            >
                                Sign Up Free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
