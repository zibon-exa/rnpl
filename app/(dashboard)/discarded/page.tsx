'use client';

import { useRequireAuth } from '@/hooks/use-require-auth';
import { Trash2, Clock, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RecycleBinPage() {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 md:px-6">
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">Discarded</h1>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Discarded files are kept for 30 days before permanent deletion
              </p>
            </div>

            {/* Info Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <Clock className="text-amber-600 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-semibold text-amber-800">30-Day Retention Policy</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Files in the discarded list are automatically deleted after 30 days. You can restore them before then.
                </p>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16 md:py-24">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-slate-200">
                <Trash2 className="text-slate-300" size={48} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Discarded list is empty</h3>
              <p className="text-slate-500 text-center max-w-md mb-6">
                When you discard files, they'll appear here for 30 days before being permanently removed.
              </p>

              {/* Action Buttons for Future Implementation */}
              <div className="flex gap-3">
                <Button variant="outline" disabled className="flex items-center gap-2">
                  <RotateCcw size={16} />
                  Restore All
                </Button>
                <Button variant="outline" disabled className="flex items-center gap-2 text-rose-600 border-rose-200 hover:bg-rose-50">
                  <Trash2 size={16} />
                  Empty Discarded
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}