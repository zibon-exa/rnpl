'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function ArchivePage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <main className="flex-1">
                <UnderConstruction
                    title="Archive"
                    message="Our historical records are being digitized. The archive will be available for research and reference shortly."
                />
            </main>
        </div>
    );
}
