'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';

export default function Home() {
  // Redirect to /dashboard if authenticated, /login if not
  useRequireAuth('/dashboard');

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
