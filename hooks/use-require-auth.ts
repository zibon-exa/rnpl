import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

/**
 * Custom hook to require authentication on a page
 * Automatically redirects to /login if not authenticated
 * 
 * @param redirectTo - Optional redirect path if already authenticated (e.g., '/dashboard')
 * @returns User object if authenticated, null otherwise
 */
export function useRequireAuth(redirectTo?: string) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push('/login');
    } else if (redirectTo && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { user, isAuthenticated, isLoading };
}

