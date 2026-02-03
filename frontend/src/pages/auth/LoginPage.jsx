import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authService from '../../services/auth.service';

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
            const response = await authService.login(data.email, data.password);

            if (response.success) {
                // Check if user is verified
                if (!response.data.user.isVerified) {
                    // Redirect to OTP verification
                    navigate('/verify-otp', {
                        state: {
                            email: data.email,
                            userType: response.data.user.userType
                        }
                    });
                    return;
                }

                // Navigate to appropriate dashboard based on user type
                if (response.data.user.userType === 'faculty') {
                    navigate('/dashboard/faculty');
                } else {
                    navigate('/dashboard/institution');
                }
            }
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] flex items-center justify-center px-4 pt-32 pb-12">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white"></div>
            </div>

            <div className="w-full max-w-[400px] relative z-10">
                <div className="bg-white rounded-[24px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-7 md:p-8 border border-slate-100">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-flex items-center space-x-2 mb-4 group">
                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <span className="text-white font-black text-lg tracking-tighter">FC</span>
                            </div>
                            <span className="text-xl font-black text-dark tracking-tight">Faculty<span className="text-secondary">Connect</span></span>
                        </Link>
                        <h2 className="text-2xl font-black text-dark mb-1 tracking-tight">
                            Sign In
                        </h2>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Access your dashboard</p>
                    </div>

                    {/* Compact User Type Toggle */}
                    <div className="flex p-1 bg-slate-50 rounded-xl mb-6 border border-slate-100">
                        <button
                            type="button"
                            onClick={() => register('userType').onChange({ target: { value: 'faculty', name: 'userType' } })}
                            className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${userType === 'faculty'
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Faculty
                        </button>
                        <button
                            type="button"
                            onClick={() => register('userType').onChange({ target: { value: 'institution', name: 'userType' } })}
                            className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${userType === 'institution'
                                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200'
                                : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Institution
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
                            <span className="text-red-500 text-sm">⚠️</span>
                            <p className="text-red-800 text-[11px] font-bold leading-tight">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.email ? 'border-red-300' : ''}`}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="text-[11px] font-black text-dark/70 uppercase tracking-widest">
                                    Password
                                </label>
                                <Link to="/forgot-password" className="text-[10px] font-black text-primary hover:text-accent transition-colors">
                                    FORGOT PASSWORD?
                                </Link>
                            </div>
                            <input
                                type="password"
                                {...register('password')}
                                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.password ? 'border-red-300' : ''}`}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center pt-1 px-1">
                            <label className="flex items-center text-[11px] font-bold text-slate-500 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary mr-2 transition-all group-hover:border-primary" />
                                Keep me signed in
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 px-6 rounded-xl font-black text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 group ${isLoading
                                ? 'bg-slate-200 cursor-not-allowed'
                                : 'bg-primary hover:bg-accent hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95'
                                } mt-4`}
                        >
                            {isLoading ? 'SIGNING IN...' : (
                                <>
                                    <span>SIGN IN NOW</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="px-3 bg-white">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[11px] text-slate-600 hover:text-primary">
                                GOOGLE
                            </button>
                            <button className="flex items-center justify-center py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-black text-[11px] text-slate-600 hover:text-primary">
                                LINKEDIN
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
                            New here?{' '}
                            <Link
                                to={userType === 'faculty' ? '/register/faculty' : '/register/institution'}
                                className="text-primary hover:text-accent font-black decoration-2 hover:underline transition-all underline-offset-4"
                            >
                                Create Free Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
