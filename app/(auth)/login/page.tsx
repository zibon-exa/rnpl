'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Modal } from '@/components/ui/modal';
import { Key } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const success = login(email, password);
    setIsLoading(false);
    
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setForgotPasswordLoading(false);
    setForgotPasswordSuccess(true);
    
    // Reset after 3 seconds and close modal
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
      setForgotPasswordSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--color-ghost-white))] to-[hsl(var(--color-white-smoke))] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="RNPL Note Logo"
                width={100}
                height={40}
                className="h-auto w-auto"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-[hsl(var(--color-charcoal))] mb-2">
              RNPL Note
            </h1>
            <p className="text-sm text-[hsl(var(--color-slate-gray))]">
              Digital Note & File Management System
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[hsl(var(--color-charcoal))] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--color-medium-turquoise))] focus:border-[hsl(var(--color-medium-turquoise))] outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[hsl(var(--color-charcoal))]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-[hsl(var(--color-brand))] hover:underline flex items-center gap-1.5"
                >
                  <Key size={14} />
                  Forgot Password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--color-medium-turquoise))] focus:border-[hsl(var(--color-medium-turquoise))] outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[hsl(196,60%,56%)] text-white py-3 rounded-lg font-medium hover:bg-[hsl(188,78%,41%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed opacity-100"
              style={{ backgroundColor: 'hsl(196, 60%, 56%)' }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          setForgotPasswordEmail('');
          setForgotPasswordSuccess(false);
        }}
        title="Forgot Password"
      >
        {forgotPasswordSuccess ? (
          <div className="text-center py-4">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[hsl(var(--color-charcoal))] mb-2">
                Reset Link Sent
              </h3>
              <p className="text-sm text-[hsl(var(--color-slate-gray))]">
                If an account exists with <strong>{forgotPasswordEmail}</strong>, we've sent a password reset link to your email.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-sm text-[hsl(var(--color-slate-gray))] mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium text-[hsl(var(--color-charcoal))] mb-2"
              >
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--color-medium-turquoise))] focus:border-[hsl(var(--color-medium-turquoise))] outline-none"
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordEmail('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[hsl(var(--color-charcoal))] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="flex-1 bg-[hsl(196,60%,56%)] text-white py-2 rounded-lg font-medium hover:bg-[hsl(188,78%,41%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'hsl(196, 60%, 56%)' }}
              >
                {forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

