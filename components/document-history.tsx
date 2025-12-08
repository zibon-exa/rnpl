'use client';

import { useMemo } from 'react';
import { HistoryEntry } from '@/types/file';

interface DocumentHistoryProps {
  history: HistoryEntry[];
}

function formatTimestamp(isoDateString: string) {
  const date = new Date(isoDateString);
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
}

export function DocumentHistory({ history }: DocumentHistoryProps) {
  // History is already ordered reverse chronologically (newest first) in mock data.
  // We want to display it as is (Newest First).
  
  return (
    <div className="relative">
      {history.map((step, index) => {
        const isLast = index === history.length - 1;
        
        return (
          <div key={index} className="relative pl-8 pb-6 last:pb-0">
            {/* Timeline Line */}
            {!isLast && (
              <div 
                className="absolute left-3 top-[10px] bottom-0 w-px -translate-x-1/2 bg-slate-200" 
                aria-hidden="true"
              />
            )}

            {/* Timeline Dot */}
            <div className={`absolute left-3 top-[5px] w-2.5 h-2.5 rounded-full border-2 -translate-x-1/2 z-10 ${
              isLast ? 'bg-white border-slate-400' : 'bg-slate-400 border-white'
            }`}></div>
            
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide leading-none py-1">
              {formatTimestamp(step.timestamp)}
            </div>
            <div className="space-y-1 mt-2">
              <div className="text-sm font-medium text-slate-900">{step.event}</div>
              <div className="text-xs text-slate-500">by {step.actor}</div>
              <div className="text-xs text-slate-500">
                Status: <span className="font-medium text-slate-700">{step.stateChange}</span>
              </div>
              {step.note && (
                <div className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-100">
                  {step.note}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

