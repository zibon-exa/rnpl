'use client';

import { useMemo } from 'react';
import { CheckCircle, RotateCcw, Send, File, Clock } from 'lucide-react';
import { HistoryEntry, FileStatus } from '@/types/file';

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
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

function getIconForEvent(event: string) {
  switch(event) {
    case 'Approved': return <CheckCircle size={16} className="text-emerald-600" />;
    case 'Returned': return <RotateCcw size={16} className="text-rose-600" />;
    case 'Sent for Approval': 
    case 'Resubmitted for Approval': 
    case 'Forwarded': return <Send size={16} className="text-amber-600" />;
    case 'Draft Created':
    case 'Draft Saved': return <File size={16} className="text-slate-500" />;
    default: return <Clock size={16} className="text-indigo-600" />;
  }
}

export function DocumentHistory({ history }: DocumentHistoryProps) {
  // History is already ordered chronologically (oldest first) in mock data, 
  // so we reverse it for display (newest first).
  const reversedHistory = useMemo(() => [...history].reverse(), [history]);
  const totalSteps = reversedHistory.length;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
        File Journey ({totalSteps} Steps)
      </h3>
      <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200">
        {reversedHistory.map((step, index) => {
          const isCurrent = index === 0;
          const eventIcon = getIconForEvent(step.event);

          return (
            <div key={index} className="relative pl-6 pb-2 group">
              {/* Timeline Dot */}
              <div className={`absolute left-[-6px] top-1 w-3 h-3 rounded-full flex items-center justify-center 
                ${isCurrent ? 'bg-indigo-600 ring-4 ring-indigo-50/50' : 'bg-slate-300 ring-4 ring-white'}`}>
                <div className="p-0.5 bg-white rounded-full">
                  {eventIcon}
                </div>
              </div>
              
              <p className="text-xs text-slate-400 mb-0.5 font-mono">{formatTimestamp(step.timestamp)}</p>
              <p className={`text-sm font-semibold ${isCurrent ? 'text-indigo-700' : 'text-slate-800'}`}>
                {step.event}
                <span className="text-xs font-normal text-slate-500 ml-2">by {step.actor}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Status: <span className="font-medium text-slate-700">{step.stateChange}</span>
              </p>

              {step.note && (
                <p className="text-xs mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 italic max-w-sm">
                  <span className="font-semibold text-slate-800 mr-1">Note:</span> {step.note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

