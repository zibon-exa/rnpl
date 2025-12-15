'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1">
        <UnderConstruction
          title="Under Development"
          message="This page is currently under development and will be available soon."
        />
      </main>
    </div>
  );
}

