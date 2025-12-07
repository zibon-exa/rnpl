'use client';

import { useAuth } from '@/lib/auth-context';
import { Header } from '@/components/header';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading before redirecting
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
              <p className="text-slate-500 mt-1">System administration and management</p>
            </div>
          </div>

          <div className="text-center py-16 text-slate-400">
            <p className="text-lg font-medium">Admin Panel</p>
            <p className="text-sm mt-2">Content coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
