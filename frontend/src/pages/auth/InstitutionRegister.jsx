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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0FDF4] to-[#D1FAE5] px-4 py-8">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#064E3B] mb-2">
                            Institution Registration
                        </h2>
                        <p className="text-gray-600">Join FacultyConnect as an employer</p>
                    </div>

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 text-sm font-medium">
                                {successMessage}
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {apiError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-800 text-sm font-medium">{apiError}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Institution Name Field */}
                        <div>
                            <label
                                htmlFor="institutionName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Institution Name
                            </label>
                            <input
                                id="institutionName"
                                type="text"
                                {...register('institutionName')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.institutionName
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="Enter institution name"
                                disabled={isLoading}
                            />
                            {errors.institutionName && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.institutionName.message}
                                </p>
                            )}
                        </div>

                        {/* Institution Type Field */}
                        <div>
                            <label
                                htmlFor="institutionType"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Institution Type
                            </label>
                            <select
                                id="institutionType"
                                {...register('institutionType')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.institutionType
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                disabled={isLoading}
                            >
                                <option value="">Select institution type</option>
                                {institutionTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.institutionType && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.institutionType.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Official Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.email
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="institution@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Contact Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                {...register('phone')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.phone
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="10-digit mobile number"
                                disabled={isLoading}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.phone.message}
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
                                placeholder="At least 6 characters"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword')}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all ${errors.confirmPassword
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                placeholder="Re-enter your password"
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
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
                                    Registering...
                                </span>
                            ) : (
                                'Register Institution'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-[#10B981] hover:text-[#059669] font-medium"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
