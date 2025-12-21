'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { useFiles } from '@/lib/files-context';
import { CheckCircle, RotateCcw, Forward, Download, Printer, Copy, Check, Paperclip, ArrowLeft, Hash, FolderOpen, Calendar, User, FileText, FileSpreadsheet, FileImage, File as FileIcon, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { File, FileStatus } from '@/types/file';
import { StatusBadge } from '@/components/ui/status-badge';
import { DocumentHistory } from '@/components/document-history';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { formatFileIdToBangla } from '@/lib/utils';
import { DocumentHeader } from '@/components/document-header';
import { mockUsers } from '@/lib/mock-users';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommentSection } from '@/components/comment-section';
import { CreateFileForm } from '@/components/create-file-form';
import { Comment } from '@/types/file';

export default function FileViewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useRequireAuth();
  const { files, updateFile } = useFiles();
  const [action, setAction] = useState<'approve' | 'return' | 'forward' | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [actionNote, setActionNote] = useState('');

  const fileId = params.id as string;
  const file = files.find(f => f.id === fileId);

  useEffect(() => {
    if (!file) {
      router.push('/dashboard');
    }
  }, [file, router]);

  if (!user || !file) {
    return null;
  }

  const isApprover = user.role === 'Approver' || user.role === 'Admin';
  // Sender can edit if Draft or Returned
  const canEdit = file.sender === user.name && (file.status === 'Draft' || file.status === 'Returned');
  const canAct = isApprover && file.isApproverAction && (file.status === 'Pending' || file.status === 'Returned');

  const handleActionSubmit = (note: string) => {
    if (!note.trim()) return; // Mandatory check

    let updates: Partial<File> = { lastUpdated: new Date().toISOString().slice(0, 10) };
    const newTimestamp = new Date().toISOString();
    const actor = user.name + (isApprover ? ' (Approver)' : '');

    let newHistoryEntry = {
      timestamp: newTimestamp,
      actor: actor,
      note: note,
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

    updates.history = [newHistoryEntry, ...file.history];
    updateFile(file.id, updates);
    setAction(null);
    setActionNote('');
    router.push('/dashboard');
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: user.nameEn,
      text: text,
      timestamp: new Date().toISOString(),
      avatarId: user.avatarId,
    };

    updateFile(file.id, {
      comments: [newComment, ...(file.comments || [])]
    });
  };

  const handleEditSuccess = (updatedFile: File, isDraft: boolean) => {
    updateFile(file.id, updatedFile);
    if (!isDraft) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="h-screen overflow-hidden">
        <CreateFileForm
          user={user}
          initialFile={file}
          onCreateSuccess={(f, isDraft) => handleEditSuccess(f, isDraft)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  const createdDate = file.history && file.history.length > 0
    ? new Date(file.history[file.history.length - 1].timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'N/A';

  const lastUpdatedDate = new Date(file.lastUpdated + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Get file type icon
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'excel':
        return <FileSpreadsheet size={20} className="text-emerald-600" />;
      case 'pdf':
        return <FileText size={20} className="text-rose-600" />;
      case 'image':
        return <FileImage size={20} className="text-[hsl(var(--color-brand))]" />;
      case 'word':
        return <FileText size={20} className="text-[hsl(var(--color-brand))]" />;
      default:
        return <FileIcon size={20} className="text-[hsl(var(--color-brand))]" />;
    }
  };

  // Get role title from role
  const getRoleTitle = (role: string): string => {
    const roleMap: Record<string, string> = {
      'Admin': 'Administrator',
      'Approver': 'Senior Audit Officer',
      'Reviewer': 'Review Officer',
      'User': 'Officer',
    };
    return roleMap[role] || 'Officer';
  };

  const handleDownload = (format: string) => {
    console.log(`Download ${format} for file ${file.id}`);
  };

  // Default role for sender (could be enhanced with user lookup)
  const senderRole = 'Approver';

  return (
    <div className="h-screen overflow-hidden bg-slate-50/50 flex flex-col">
      {/* Page Header with Controls */}
      <div className="bg-white border-b border-slate-200 flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left: Back Button & Context */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft size={18} />
              </Button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Current File</span>
                <span className="text-sm font-semibold text-slate-900 leading-none truncate max-w-[200px]">{file.title}</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Edit Button */}
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
                >
                  <FileText size={16} className="mr-2" />
                  Edit File
                </Button>
              )}

              {/* Download and Print */}
              <TooltipProvider>
                <ButtonGroup>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer">
                        <Download size={16} />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52" align="start">
                      <DropdownMenuLabel className="text-sm font-semibold text-slate-800">
                        Download as
                      </DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload('PNG')}>
                        <FileImage size={16} className="mr-2 text-sky-500" />
                        PNG
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload('JPG')}>
                        <FileImage size={16} className="mr-2 text-amber-500" />
                        JPG
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload('PDF')}>
                        <FileText size={16} className="mr-2 text-rose-500" />
                        PDF
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload('DOCX')}>
                        <FileText size={16} className="mr-2 text-indigo-500" />
                        DOCX
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          window.print();
                        }}
                      >
                        <Printer size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Print</p>
                    </TooltipContent>
                  </Tooltip>
                </ButtonGroup>
              </TooltipProvider>

              {/* Action Buttons */}
              {canAct && (
                <TooltipProvider>
                  <div className="flex items-center gap-3">
                    <ButtonGroup>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAction('return')}
                          >
                            <RotateCcw size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
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
                            <Forward size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Forward</p>
                        </TooltipContent>
                      </Tooltip>
                    </ButtonGroup>

                    <Button
                      onClick={() => setAction('approve')}
                      variant="default"
                      size="sm"
                      className="bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                  </div>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Page */}
      <main className="bg-slate-50 flex-1 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-visible lg:overflow-y-auto px-4 sm:px-14 pt-8 sm:pt-14 pb-12 lg:pb-32 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              {/* White Paper Container */}
              <div className="bg-white rounded-lg shadow-lg border border-slate-200/50 min-h-full">

                {/* Blog Post Style Content */}
                <article className="prose prose-slate max-w-none relative z-10 p-6 sm:p-16">
                  {/* Document Header */}
                  <DocumentHeader fileId={file.id} date={file.lastUpdated} />

                  {/* Title */}
                  <header className="mb-8 text-center">
                    <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 leading-tight font-bangla-serif">
                      {file.title}
                    </h1>
                  </header>

                  {/* Main Content */}
                  <div className="mb-12">
                    {file.documentBody ? (
                      <div className="prose prose-slate max-w-none">
                        <div
                          className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700 font-bangla"
                          dangerouslySetInnerHTML={{ __html: file.documentBody }}
                        />
                      </div>
                    ) : (
                      <p className="text-slate-400 italic">No content provided.</p>
                    )}
                  </div>

                  {/* Signature Area */}
                  <div className="mt-16 flex justify-end">
                    {(() => {
                      const sender = mockUsers.find(u => u.nameEn === file.sender || u.nameBn === file.sender);
                      return (
                        <div className="text-center space-y-1 font-bangla-serif min-w-[200px]">
                          <div className="border-b border-slate-300 mb-2"></div>
                          <p className="text-sm font-semibold text-slate-900">
                            ({sender?.nameBn || file.sender})
                          </p>
                          <p className="text-[12px] text-slate-700">
                            {sender?.designationBn || 'কোম্পানি সচিব'}
                          </p>
                          <p className="text-[12px] text-slate-700">
                            আরএনপিএল
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Distribution List */}
                  <div className="mt-12">
                    <p className="text-[13px] font-semibold text-slate-900 mb-3 font-bangla-serif">
                      বিতরণ জ্ঞাতার্থে / জ্ঞাতার্থে ও কার্যার্থে (জ্যেষ্ঠতার ক্রমানুসারে নয়):
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-[13px] leading-6 text-slate-800 font-bangla">
                      <li>সচিব, বিদ্যুৎ বিভাগ, বিদ্যুৎ, জ্বালানি ও খনিজ সম্পদ মন্ত্রণালয়;</li>
                      <li>সচিব, অর্থ বিভাগ, অর্থ মন্ত্রণালয়;</li>
                      <li>চেয়ারম্যান, বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড;</li>
                      <li>চেয়ারম্যান, বাংলাদেশ পল্লী বিদ্যুতায়ন বোর্ড;</li>
                      <li>চেয়ারম্যান, জাতীয় রাজস্ব বোর্ড;</li>
                      <li>চেয়ারম্যান, টেকসই ও নবায়নযোগ্য জ্বালানি উন্নয়ন কর্তৃপক্ষ (স্রেডা);</li>
                      <li>চেয়ারম্যান, বাংলাদেশ এনার্জি রেগুলেটরি কমিশন;</li>
                    </ol>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Sticky Tabs */}
          <aside className="w-full lg:w-[396px] lg:min-w-[396px] shrink-0 block bg-white border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="h-[600px] lg:h-full flex flex-col">
              <Tabs defaultValue="comments" className="flex-1 flex flex-col h-full">
                <TabsList className="grid grid-cols-2 w-full rounded-none border-b h-12 bg-white p-0">
                  <TabsTrigger
                    value="comments"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--color-brand))] data-[state=active]:bg-white data-[state=active]:shadow-none transition-all font-bold text-xs uppercase tracking-wider"
                  >
                    Comments
                  </TabsTrigger>
                  <TabsTrigger
                    value="info"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(var(--color-brand))] data-[state=active]:bg-white data-[state=active]:shadow-none transition-all font-bold text-xs uppercase tracking-wider"
                  >
                    Info
                  </TabsTrigger>
                </TabsList>

                {/* Comments Content */}
                <TabsContent value="comments" className="flex-1 m-0 overflow-hidden">
                  <CommentSection
                    comments={file.comments || []}
                    user={user}
                    onAddComment={handleAddComment}
                  />
                </TabsContent>

                {/* Info Content */}
                <TabsContent value="info" className="flex-1 m-0 overflow-y-auto custom-scrollbar p-6 space-y-8">
                  {/* File Details Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-slate-600" />
                      <h3 className="text-sm font-semibold text-slate-900">File Details</h3>
                    </div>

                    {/* Reference */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reference</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900 font-bangla">{formatFileIdToBangla(file.id)}</span>
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
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</div>
                      <span className="text-sm font-medium text-slate-900 font-bangla">{file.category}</span>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</div>
                      <div className="w-fit">
                        <StatusBadge status={file.status} />
                      </div>
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Author</div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getAvatarPath(file.sender)} alt={file.sender} />
                          <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                            {getInitials(file.sender)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{file.sender}</span>
                          <span className="text-xs text-slate-500">{getRoleTitle(senderRole)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Attachments</div>
                      {file.attachments && file.attachments.length > 0 ? (
                        <div className="space-y-2">
                          {file.attachments.map((attachment) => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                            >
                              <div className="shrink-0">
                                {getFileIcon(attachment.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-slate-900 truncate">{attachment.name}</div>
                                <div className="text-xs text-slate-500">{formatFileSize(attachment.size)}</div>
                              </div>
                              <button
                                onClick={() => {
                                  if (attachment.url) {
                                    window.open(attachment.url, '_blank');
                                  } else {
                                    console.log('Download attachment:', attachment.id);
                                  }
                                }}
                                className="shrink-0 p-1.5 hover:bg-slate-200 rounded transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Download size={16} className="text-slate-600" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">None</span>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Timeline Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-slate-600" />
                      <h3 className="text-sm font-semibold text-slate-900">Timeline</h3>
                    </div>

                    {/* Created */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</div>
                      <span className="text-sm font-medium text-slate-900">{createdDate}</span>
                    </div>

                    {/* Last Updated */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Last Updated</div>
                      <span className="text-sm font-medium text-slate-900">{lastUpdatedDate}</span>
                    </div>
                  </div>

                  {/* History Section */}
                  {file.history && (
                    <>
                      <Separator />
                      <div className="space-y-4 pb-8">
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-slate-600" />
                          <h3 className="text-sm font-semibold text-slate-900">History</h3>
                        </div>
                        <DocumentHistory history={file.history} />
                      </div>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </aside>
        </div>
      </main>

      {/* Action Modal */}
      <Modal
        isOpen={!!action}
        onClose={() => {
          setAction(null);
          setActionNote('');
        }}
        title={`${action ? action.charAt(0).toUpperCase() + action.slice(1) : ''} File`}
      >
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Please provide mandatory official comments for this action.
          </p>
          <textarea
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm min-h-[120px]"
            rows={4}
            placeholder="Type your official comments here... (Required)"
          />
          {actionNote.trim().length === 0 && (
            <p className="text-rose-500 text-xs font-medium">Comments are required to proceed.</p>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setAction(null);
                setActionNote('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleActionSubmit(actionNote)}
              disabled={!actionNote.trim()}
              className="bg-[hsl(var(--color-brand))] text-white hover:bg-[hsl(var(--color-brand-hover))]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


