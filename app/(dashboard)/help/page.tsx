'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <main className="flex-1">
                <UnderConstruction
                    title="Help Center"
                    message="We're compiling guides and FAQs to help you navigate the RNPL Note system more effectively."
                />
            </main>
        </div>
    );
}
