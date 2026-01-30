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
        <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#064E3B] mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {/* User Type Toggle */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <label
                            className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${userType === 'faculty'
                                    ? 'border-[#10B981] bg-[#F0FDF4]'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <input
                                type="radio"
                                value="faculty"
                                {...register('userType')}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-sm font-semibold text-[#064E3B]">
                                    Faculty
                                </div>
                            </div>
                            {userType === 'faculty' && (
                                <div className="absolute top-2 right-2">
                                    <svg
                                        className="w-5 h-5 text-[#10B981]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </label>

                        <label
                            className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${userType === 'institution'
                                    ? 'border-[#10B981] bg-[#F0FDF4]'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <input
                                type="radio"
                                value="institution"
                                {...register('userType')}
                                className="sr-only"
                            />
                            <div className="text-center">
                                <div className="text-sm font-semibold text-[#064E3B]">
                                    Institution
                                </div>
                            </div>
                            {userType === 'institution' && (
                                <div className="absolute top-2 right-2">
                                    <svg
                                        className="w-5 h-5 text-[#10B981]"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="you@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.password
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
                                />
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-[#10B981] hover:text-[#059669] font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${isLoading
                                    ? 'bg-[#10B981]/50 cursor-not-allowed'
                                    : 'bg-[#10B981] hover:bg-[#059669] active:scale-98'
                                } shadow-lg hover:shadow-xl`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    Google
                                </span>
                            </button>

                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    LinkedIn
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to={
                                    userType === 'faculty'
                                        ? '/register/faculty'
                                        : '/register/institution'
                                }
                                className="text-[#10B981] hover:text-[#059669] font-medium"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
