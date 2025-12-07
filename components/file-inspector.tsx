'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, RotateCcw, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { File, FileStatus } from '@/types/file';
import { User } from '@/types/user';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentHistory } from '@/components/document-history';
import { Modal } from '@/components/ui/modal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FileInspectorProps {
  file: File;
  user: User;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<File>) => void;
  onTabsReady?: (tabs: React.ReactNode) => void;
}

function ActionButton({ 
  label, 
  icon: Icon, 
  color, 
  onClick 
}: { 
  label: string; 
  icon: React.ElementType; 
  color: string; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick} 
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border ${color} font-medium transition-all shadow-sm active:scale-95`}
    >
      <Icon size={18} /> {label}
    </button>
  );
}

function getNextActionGuidance(status: FileStatus, sender: string, userName: string, isApprover: boolean) {
  if (sender === userName) {
    if (status === 'Draft') return { type: 'Info', text: 'Edit your content and submit it for approval when ready.' };
    if (status === 'Returned') return { type: 'Warning', text: 'Review the Approver\'s comments and resubmit the file.' };
    if (status === 'Pending') return { type: 'Info', text: 'Waiting for the Approver to take action.' };
    if (status === 'Approved') return { type: 'Success', text: 'The file is complete. Proceed with the documented task.' };
  } else if (isApprover) {
    if (status === 'Pending') return { type: 'Action', text: 'You need to Approve, Return, or Forward this file.' };
    if (status === 'Returned') return { type: 'Action', text: 'The sender has resubmitted. Review and decide on approval.' };
  }
  return { type: 'Info', text: 'The file is currently following its established workflow path.' };
}

// Convert numbers to Bangla numerals
function toBanglaNumerals(num: number | string): string {
  const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => banglaNumerals[parseInt(d)] || d).join('');
}

// Format file ID to Bangla format: আরএনপিএল/১৩২০/২০২৫/০২১৫
function formatFileIdToBangla(fileId: string): string {
  // Extract numbers from file ID (e.g., RNPL-1001 -> 1001)
  const match = fileId.match(/(\d+)/);
  if (!match) return fileId;
  
  const num = parseInt(match[1]);
  const currentYear = new Date().getFullYear();
  const banglaYear = currentYear - 593; // Convert to Bangla year (1432 for 2025)
  
  // Format: আরএনপিএল/BanglaYear/EnglishYear/Sequence (all in Bangla numerals)
  const sequence = num.toString().padStart(4, '0');
  return `আরএনপিএল/${toBanglaNumerals(banglaYear)}/${toBanglaNumerals(currentYear)}/${toBanglaNumerals(sequence)}`;
}

// Format date to Bangla format: ৭ ডিসেম্বর ২০২৫ খ্রিষ্টাব্দ
function formatDateToBangla(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00'); // Ensure proper date parsing
  const day = date.getDate();
  const monthNames = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${toBanglaNumerals(day)} ${month} ${toBanglaNumerals(year)} খ্রিষ্টাব্দ`;
}

export function FileInspector({ file, user, onClose, onUpdate, onTabsReady }: FileInspectorProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'document'>('notes');
  const [action, setAction] = useState<'approve' | 'return' | 'forward' | null>(null);
  
  const isApprover = user.role === 'Approver' || user.role === 'Admin';
  const canAct = isApprover && file.isApproverAction && (file.status === 'Pending' || file.status === 'Returned');
  
  const handleActionSubmit = (note: string) => {
    let updates: Partial<File> = { lastUpdated: new Date().toISOString().slice(0, 10) };
    const newTimestamp = new Date().toISOString();
    const actor = user.name + (isApprover ? ' (Approver)' : '');

    let newHistoryEntry = {
      timestamp: newTimestamp,
      actor: actor,
      note: note || `Action taken by ${user.name}.`,
      event: '',
      stateChange: file.status,
    };

    if (action === 'approve') {
      updates = { 
        status: 'Approved', 
        approvalComment: note, 
        isApproverAction: false,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };
      newHistoryEntry = { ...newHistoryEntry, event: 'Approved', stateChange: 'Approved' };
    } else if (action === 'return') {
      updates = { 
        status: 'Returned', 
        returnComment: note, 
        isApproverAction: true,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };
      newHistoryEntry = { ...newHistoryEntry, event: 'Returned', stateChange: 'Returned' };
    } else if (action === 'forward') {
      updates = { 
        status: 'Pending', 
        forwardingNote: note, 
        isApproverAction: true,
        lastUpdated: new Date().toISOString().slice(0, 10),
      };
      newHistoryEntry = { ...newHistoryEntry, event: 'Forwarded', stateChange: 'Pending' };
    }
    
    // Prepend new entry to the existing history
    updates.history = [newHistoryEntry, ...file.history];
    
    onUpdate(file.id, updates);
    setAction(null);
    onClose();
  };

  const guidance = getNextActionGuidance(file.status, file.sender, user.name, isApprover);
  const guidanceStyles = {
    Info: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Warning: 'bg-rose-50 text-rose-700 border-rose-200',
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Action: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  const tabs = useMemo(() => (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'notes' | 'document')}>
      <TabsList className="bg-[hsl(var(--color-ghost-white))] p-1 h-8">
        <TabsTrigger 
          value="notes" 
          className="px-3 py-1 text-xs h-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Details
        </TabsTrigger>
        <TabsTrigger 
          value="document" 
          className="px-3 py-1 text-xs h-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Document
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ), [activeTab]);

  // Expose tabs to parent component
  useEffect(() => {
    if (onTabsReady) {
      onTabsReady(tabs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]); // Only update when activeTab changes to avoid infinite loop

  return (
    <>
      <div className="flex flex-col h-full">
        {/* VIEW 1: NOTE SHEET (Metadata & History) */}
        {activeTab === 'notes' && (
          <div className="px-6 pb-6 space-y-8 flex-1 pt-6 bg-white animate-in fade-in duration-300">
              {/* Status Header & Next Action Guidance */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold text-slate-900 leading-tight font-bangla">{file.title}</h1>
                    <p className="text-slate-400 text-xs mt-2 font-mono">{file.id}</p>
                  </div>
                  <StatusBadge status={file.status} />
                </div>
              
                {/* Next Action Guidance */}
                <div className={`mt-4 p-4 rounded-xl border ${guidanceStyles[guidance.type as keyof typeof guidanceStyles]} flex items-start gap-3`}>
                  <Zap size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-tight">Next Expected Action:</p>
                    <p className="text-sm mt-1 leading-relaxed">{guidance.text}</p>
                  </div>
                </div>

                {/* Primary Actions Area */}
                {canAct && (
                  <div className="mt-6 pt-6 border-t border-slate-100 flex gap-3">
                    <ActionButton 
                      label="Approve" 
                      icon={CheckCircle} 
                      color="bg-emerald-600 hover:bg-emerald-700 text-white border-transparent" 
                      onClick={() => setAction('approve')} 
                    />
                    <ActionButton 
                      label="Return" 
                      icon={RotateCcw} 
                      color="bg-white hover:bg-rose-50 text-rose-600 border-rose-200" 
                      onClick={() => setAction('return')} 
                    />
                    <ActionButton 
                      label="Forward" 
                      icon={ArrowRight} 
                      color="bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-200" 
                      onClick={() => setAction('forward')} 
                    />
                  </div>
                )}
                {/* Resubmit Action */}
                {file.sender === user.name && file.status === 'Returned' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => { 
                        const newHistoryEntry = { 
                          timestamp: new Date().toISOString(), 
                          actor: user.name, 
                          event: 'Resubmitted for Approval', 
                          stateChange: 'Pending' as FileStatus, 
                          note: 'File has been corrected and resubmitted.' 
                        };
                        onUpdate(file.id, { 
                          status: 'Pending', 
                          isApproverAction: true, 
                          history: [newHistoryEntry, ...file.history],
                          lastUpdated: new Date().toISOString().slice(0, 10),
                        }); 
                        onClose(); 
                      }} 
                      className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                      Resubmit File for Approval
                    </button>
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Category</p>
                  <p className="font-medium text-slate-800 font-bangla">{file.category}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Sender</p>
                  <p className="font-medium text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                      {file.sender[0]}
                    </span>
                    {file.sender}
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Executive Summary</p>
                  <p className="text-slate-600 leading-relaxed text-sm font-bangla">{file.summary || 'No summary provided.'}</p>
                </div>
              </div>

            {/* History Stream Component */}
            {file.history && <DocumentHistory history={file.history} />}
          </div>
        )}

        {/* VIEW 2: DOCUMENT PREVIEW (The "Attachment") */}
        {activeTab === 'document' && (
          <div className="flex-1 pt-6 pb-6 px-6 animate-in fade-in duration-300 flex flex-col items-center bg-slate-100 noise-texture overflow-y-auto">
            {/* The "Paper" Container */}
            <div className="bg-white w-full min-h-[1200px] shadow-lg border border-slate-200 p-8 md:p-12 relative mx-auto max-w-2xl z-10">
                {/* Official Document Header */}
                <div className="mb-8 pb-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Logo */}
                    <div className="mb-3">
                      <Image
                        src="/logo.png"
                        alt="RNPL Logo"
                        width={70}
                        height={70}
                        className="h-auto w-auto"
                        priority
                      />
                    </div>
                    
                    {/* Company Names - Center Aligned */}
                    <div className="mb-6">
                      <p className="text-sm font-bangla font-semibold mb-0.5" style={{ color: 'hsl(197, 60%, 56%)' }}>
                        আরপিসিএল-নরিনকো ইন্টারন্যাশনাল পাওয়ার লিমিটেড
                      </p>
                      <p className="text-sm font-semibold" style={{ color: 'hsl(197, 60%, 56%)' }}>
                        RPCL-NORINCO INTL POWER LIMITED
                      </p>
                    </div>
                    
                    {/* Corporate Office Section */}
                    <div className="text-[10px] text-slate-700 w-full">
                      <div className="flex items-start justify-between">
                        <div className="text-left">
                          <p>Atlanta Trade Center (Level-7)</p>
                          <p>House # 01, Road # 1/A, Sector # 04</p>
                          <p>Uttara, Dhaka-1230.</p>
                        </div>
                        <div className="text-right">
                          <p>+88 02 48956157, +88 02 48956158</p>
                          <p>rnpled@gmail.com</p>
                          <p>www.rnpl.com.bd</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Reference and Date */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-600 font-bangla">স্মারক নং: {formatFileIdToBangla(file.id)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-600 font-bangla">তারিখ: {formatDateToBangla(file.lastUpdated)}</p>
                    </div>
                  </div>
                </div>

                {/* Document Body */}
                <div className="font-bangla text-slate-800 leading-relaxed text-xs whitespace-pre-wrap mb-12">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়</p>
                    <p className="text-sm font-semibold text-slate-900 font-bangla">{file.title}</p>
                  </div>
                  
                  {file.category && (
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিভাগ</p>
                      <p className="text-xs text-slate-700 font-bangla">{file.category}</p>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়বস্তু</p>
                    <div className="text-xs text-slate-700 leading-relaxed font-bangla">
                      {file.documentBody || 'কোন নথি বিষয়বস্তু পাওয়া যায়নি।'}
                    </div>
                  </div>
                </div>

              {/* Signature Area */}
              <div className="absolute bottom-12 right-12 text-left z-10">
                <div className="mb-2">
                  <p className="text-[10px] text-slate-500 mb-1 font-bangla">প্রস্তুত করেছেন:</p>
                  <div className="font-cursive text-sm text-slate-900 mb-1 leading-none">{file.sender}</div>
                  <div className="border-t border-slate-400 w-40 pt-1 mt-2">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bangla">ডিজিটাল স্বাক্ষর</p>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Floating Action Button for Approver Context */}
            {canAct && (
              <div className="sticky bottom-6 mt-6 bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-2 z-10">
                <span className="text-sm font-medium">Ready to decide on this file?</span>
                <button 
                  onClick={() => setActiveTab('notes')} 
                  className="text-sm font-bold text-indigo-300 hover:text-white underline decoration-indigo-300/50 underline-offset-4"
                >
                  Go to Actions
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Modal */}
      <Modal 
        isOpen={!!action} 
        onClose={() => setAction(null)} 
        title={`${action ? action.charAt(0).toUpperCase() + action.slice(1) : ''} File`}
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">Please provide a comment or note for this action.</p>
          <textarea 
            id="action-note"
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm" 
            rows={4} 
            placeholder="Type your official comments here..." 
          />
          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={() => setAction(null)} 
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                const noteElement = document.getElementById('action-note') as HTMLTextAreaElement;
                handleActionSubmit(noteElement.value);
              }} 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm active:scale-95 transition-all text-sm font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

