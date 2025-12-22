'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface UnderConstructionProps {
  title?: string;
  message?: string;
  standalone?: boolean;
}

export function UnderConstruction({
  title = 'Under Development',
  message = 'This section is currently under development. We\'re working hard to bring you the best experience!',
  standalone = false
}: UnderConstructionProps) {
  const router = useRouter();

  const content = (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-96 h-96 mb-2 text-[hsl(var(--color-brand))] relative">
        <Image
          src="/vectors/empty_state.svg"
          alt="Under Construction"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        {message}
      </p>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          className="bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white shadow-sm"
        >
          Back to My Desk
        </Button>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

