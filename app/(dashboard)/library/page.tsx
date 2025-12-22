'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function LibraryPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <main className="flex-1">
                <UnderConstruction
                    title="Central Registry"
                    message="The digital library is currently being organized. You'll soon be able to access all corporate documents here."
                />
            </main>
        </div>
    );
}
