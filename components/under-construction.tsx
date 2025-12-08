'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface UnderConstructionProps {
  title?: string;
  message?: string;
  standalone?: boolean;
}

export function UnderConstruction({ 
  title = 'Under Construction',
  message = 'This page is not ready yet. We\'re building it and will roll it out soon.',
  standalone = false
}: UnderConstructionProps) {
  const router = useRouter();

  const content = (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="bg-white border border-slate-200 shadow-md rounded-xl p-10 max-w-xl w-full text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--color-brand))]/10 text-[hsl(var(--color-brand))] font-semibold text-xl">
          🚧
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600">
          {message}
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
    </div>
  );

  if (standalone) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col">
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm font-medium text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))]"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
        {content}
      </div>
    );
  }

  return content;
}

