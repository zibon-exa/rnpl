'use client';

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle, RotateCcw, Forward, Zap, Download, Printer, Copy, Check, Paperclip } from 'lucide-react';
import { File, FileStatus } from '@/types/file';
import { User } from '@/types/user';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentHistory } from '@/components/document-history';
import { Modal } from '@/components/ui/modal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { DocumentPaper } from '@/components/document-paper';
import { DocumentHeader } from '@/components/document-header';
import { DocumentContent } from '@/components/document-content';
import { formatFileIdToBangla } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FileInspectorProps {
  file: File;
  user: User;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<File>) => void;
  onTabsReady?: (tabs: React.ReactNode) => void;
  onActionsReady?: (actions: React.ReactNode) => void;
  onCenterActionsReady?: (actions: React.ReactNode) => void;
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

export function FileInspector({ file, user, onClose, onUpdate, onTabsReady, onActionsReady, onCenterActionsReady }: FileInspectorProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'document'>('notes');
  const [action, setAction] = useState<'approve' | 'return' | 'forward' | null>(null);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  
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
      <TabsList className="bg-[hsl(var(--color-ghost-white))] p-1 h-9">
        <TabsTrigger 
          value="notes" 
          className="px-3 py-1 text-xs h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Details
        </TabsTrigger>
        <TabsTrigger 
          value="document" 
          className="px-3 py-1 text-xs h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm"
        >
          Preview
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ), [activeTab]);

  // Action buttons for header (shown when viewing file preview tab and can act)
  // Gmail-style: Approve with label, Return/Forward icon-only with tooltips
  const headerActions = useMemo(() => {
    if (!canAct || activeTab !== 'document') return null;
    
    return (
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {/* Button group for Return and Forward */}
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAction('return')}
                >
                  <RotateCcw />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[9999]">
                <p>Return</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAction('forward')}
                >
                  <Forward />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="z-[9999]">
                <p>Forward</p>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
          
          {/* Approve button with label - positioned to the right */}
          <Button 
            onClick={() => setAction('approve')}
            variant="default"
            size="sm"
            className="bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
          >
            <CheckCircle />
            Approve
          </Button>
        </div>
      </TooltipProvider>
    );
  }, [canAct, activeTab]);

  // Expose tabs to parent component
  useEffect(() => {
    if (onTabsReady) {
      onTabsReady(tabs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]); // Only update when activeTab changes to avoid infinite loop

  // Center button group: Download and Print (always visible)
  const centerActions = useMemo(() => {
    return (
      <TooltipProvider>
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implement download functionality
                  console.log('Download file:', file.id);
                }}
              >
                <Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="z-[9999]">
              <p>Download</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // TODO: Implement print functionality
                  window.print();
                }}
              >
                <Printer />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="z-[9999]">
              <p>Print</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </TooltipProvider>
    );
  }, [file.id]);

  // Expose actions to parent component
  useEffect(() => {
    if (onActionsReady) {
      onActionsReady(headerActions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, canAct]); // Update when tab changes or canAct changes

  // Expose center actions to parent component
  useEffect(() => {
    if (onCenterActionsReady) {
      onCenterActionsReady(centerActions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Center actions don't change

  return (
    <>
      <div className="flex flex-col h-full">
        {/* VIEW 1: NOTE SHEET (Metadata & History) */}
        {activeTab === 'notes' && (
          <div className="px-6 pb-6 space-y-6 flex-1 pt-6 bg-white animate-in fade-in duration-300">
              {/* Header Section */}
              <div className="pb-6 border-b border-slate-100">
                {/* Subject Section */}
                <div className="mb-4 text-center">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Subject</p>
                  <h1 className="text-xl font-bold text-slate-900 leading-tight font-bangla">{file.title}</h1>
                </div>

                {/* Info Table */}
                <div className="border border-slate-200/60 rounded-lg overflow-hidden">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="py-2 px-3 w-[33%]">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Ref</p>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm text-slate-900 font-bangla leading-tight">{formatFileIdToBangla(file.id)}</p>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(formatFileIdToBangla(file.id));
                                      setCopiedRef(true);
                                      setTimeout(() => setCopiedRef(false), 2000);
                                    }}
                                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                                  >
                                    {copiedRef ? (
                                      <Check size={14} className="text-emerald-600" />
                                    ) : (
                                      <Copy size={14} className="text-slate-400" />
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{copiedRef ? 'Copied!' : 'Copy Ref'}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                        <TableCell className="py-2 px-3 w-[33%]">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Category</p>
                          <p className="text-sm font-medium text-slate-900 font-bangla leading-tight">{file.category}</p>
                        </TableCell>
                        <TableCell className="py-2 px-3 w-[34%]">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Status</p>
                          <div className="leading-tight">
                            <StatusBadge status={file.status} />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-2 px-3">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Sender</p>
                          <p className="text-sm font-medium text-slate-900 leading-tight">{file.sender}</p>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Created</p>
                          <p className="text-sm font-medium text-slate-900 leading-tight">
                            {file.history && file.history.length > 0 
                              ? new Date(file.history[file.history.length - 1].timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                              : 'N/A'}
                          </p>
                        </TableCell>
                        <TableCell className="py-2 px-3">
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide mb-1">Last Updated</p>
                          <p className="text-sm font-medium text-slate-900 leading-tight">
                            {new Date(file.lastUpdated + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Attachment Note */}
                {file.attachments && file.attachments.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                    <Paperclip size={16} className="text-slate-400" />
                    <span>This file has {file.attachments.length} attachment{file.attachments.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>

              {/* Details Section */}
              <div className="pt-6">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Details</p>
                <div className={`bg-slate-50 rounded-xl border border-slate-100 p-6 ${isDetailsExpanded ? '' : 'line-clamp-3'}`}>
                  <div className="max-w-3xl">
                    {file.documentBody ? (
                      <div className="whitespace-pre-wrap leading-7 text-[15px] text-slate-700 font-bangla">
                        {file.documentBody}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic leading-7">No details provided.</p>
                    )}
                  </div>
                </div>
                {file.documentBody && file.documentBody.length > 150 && (
                  <button
                    onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                    className="mt-3 text-xs text-[hsl(var(--color-brand))] hover:text-[hsl(var(--color-brand-hover))] font-medium"
                  >
                    {isDetailsExpanded ? 'View Less' : 'View More'}
                  </button>
                )}
              </div>

              {/* Primary Actions Area */}
              {canAct && (
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {/* Return and Forward on the left */}
                  <ButtonGroup>
                    <Button 
                      onClick={() => setAction('return')}
                      variant="outline"
                      size="sm"
                    >
                      <RotateCcw />
                      Return
                    </Button>
                    <Button 
                      onClick={() => setAction('forward')}
                      variant="outline"
                      size="sm"
                    >
                      <Forward />
                      Forward
                    </Button>
                  </ButtonGroup>
                  
                  {/* Approve on the right */}
                  <Button 
                    onClick={() => setAction('approve')}
                    variant="default"
                    size="sm"
                    className="bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
                  >
                    <CheckCircle />
                    Approve
                  </Button>
                </div>
              )}
              
              {/* Resubmit Action */}
              {file.sender === user.name && file.status === 'Returned' && (
                <div className="pt-6 border-t border-slate-100">
                  <Button 
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
                    className="w-full bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
                  >
                    Resubmit File for Approval
                  </Button>
                </div>
              )}

            {/* History Stream Component */}
            {file.history && <DocumentHistory history={file.history} />}
          </div>
        )}

        {/* VIEW 2: FILE PREVIEW (The "Attachment") */}
        {activeTab === 'document' && (
          <div className="flex-1 pt-6 pb-32 px-6 animate-in fade-in duration-300 flex flex-col items-center bg-slate-100 overflow-y-auto">
            <DocumentPaper>
              <DocumentHeader fileId={file.id} date={file.lastUpdated} />
              <DocumentContent 
                title={file.title}
                category={file.category}
                documentBody={file.documentBody}
                sender={file.sender}
                showPlaceholders={false}
                language="bn"
              />
            </DocumentPaper>
              
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
              className="px-4 py-2 bg-[hsl(var(--color-brand))] text-white rounded-lg hover:bg-[hsl(var(--color-brand-hover))] shadow-sm active:scale-95 transition-all text-sm font-medium"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

