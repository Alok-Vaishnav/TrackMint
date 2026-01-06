'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/app/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(email, password);

      if (response.error) {
        setError(response.error);
        return;
      }

      // Login successful, redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 px-4 py-12">
      {/* Soft floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-10 w-96 h-96 bg-sky-200 rounded-full blur-3xl opacity-35 animate-blob"></div>
        <div className="absolute right-5 top-1/2 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-35 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-35 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,195,247,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.15),transparent_35%)]\"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-amber-100 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-700 font-medium">✨ Welcome back</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900">
              Sign In
            </h1>
            <p className="text-lg text-slate-600">
              Access your expense tracking dashboard
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-2xl p-8 animate-fade-in animation-delay-200">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-600 hover:to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-sky-200/80 hover:shadow-emerald-200/80 transition-all duration-300 hover:translate-y-[-1px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">New to us?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              href="/register"
              className="block text-center px-6 py-3 bg-white border border-slate-200 hover:border-sky-300 text-slate-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              Create Account
            </Link>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-slate-600">
            <Link href="#" className="text-sky-600 hover:text-sky-700 font-semibold">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
