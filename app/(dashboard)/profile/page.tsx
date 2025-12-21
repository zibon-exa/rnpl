'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function ProfilePlaceholderPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1">
        <UnderConstruction
          message="The Profile page is not ready yet. We're building it and will roll it out soon."
        />
      </main>
    </div>
  );
}

