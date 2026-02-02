import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const FacultyRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
        'http://localhost:5000/api/auth/faculty/register',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );

      setSuccessMessage('Registration successful! Welcome to FacultyConnect.');
      reset(); // Clear the form
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

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-amber-50/50 flex items-center justify-center px-4 py-12">
      {/* Background Decoration - Hero Grid Style */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] p-8 md:p-9 border border-slate-100 relative overflow-hidden">
          {/* Header with Hero-style Badge */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-1 tracking-tight">
              Faculty Join
            </h2>
            <p className="text-slate-500 text-sm font-medium">Create your professional academic profile</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
              <span className="text-green-500">✨</span>
              <p className="text-green-800 text-xs font-medium">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-red-800 text-xs font-medium">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field with Icon */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className={`w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm font-medium text-slate-900 ${errors.name ? 'border-red-300 ring-red-100' : ''}`}
                  placeholder="Dr. Jane Doe"
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-xs font-medium text-red-500 ml-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field with Icon */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-0.5 font-sans">
                Academic Email
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
                  placeholder="jane.doe@university.edu"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-red-500 ml-0.5">
                  {errors.email.message}
                </p>
              )}
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
              {isLoading ? 'Processing...' : 'Complete Registration Now'}
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
              Already part of FacultyConnect?{' '}
              <a
                href="/login"
                className="text-primary hover:text-accent font-bold transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegisterForm;
