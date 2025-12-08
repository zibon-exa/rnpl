'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfilePlaceholderPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white border border-slate-200 shadow-md rounded-xl p-10 max-w-xl w-full text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--color-brand))]/10 text-[hsl(var(--color-brand))] font-semibold text-xl">
            🚧
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Under Construction</h1>
          <p className="text-slate-600">
            This page is not ready yet. We&apos;re building it and will roll it out soon.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button onClick={() => router.push('/dashboard')} className="bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

