'use client';

import { Header } from '@/components/header';
import { UnderConstruction } from '@/components/under-construction';

export default function AdminPanelPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />
      <main className="flex-1">
        <UnderConstruction
          message="The Admin Panel is not ready yet. We're building it and will roll it out soon."
        />
      </main>
    </div>
  );
}

