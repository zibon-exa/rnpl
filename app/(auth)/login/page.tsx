'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    login(password);
    setIsLoading(false);
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
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[hsl(var(--color-charcoal))] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password (prototype)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[hsl(var(--color-medium-turquoise))] focus:border-[hsl(var(--color-medium-turquoise))] outline-none"
                required
              />
              <p className="mt-1 text-xs text-[hsl(var(--color-slate-gray))]">
                Prototype: Any password will work
              </p>
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

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[hsl(var(--color-slate-gray))]">
              This is a prototype. No validation required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

