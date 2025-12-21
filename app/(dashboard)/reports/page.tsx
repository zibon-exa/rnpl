'use client';

import { UnderConstruction } from '@/components/under-construction';

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <main className="flex-1">
                <UnderConstruction
                    title="Reports & Analytics"
                    message="Detailed analytics and reporting tools are being developed to help you track file processing efficiency."
                />
            </main>
        </div>
    );
}
