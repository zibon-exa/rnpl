'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { User } from '@/types/user';
import { File, FileStatus } from '@/types/file';
import { DocumentHeader } from '@/components/document-header';
import { DocumentPreview } from '@/components/document-preview';
import { TipTapEditorWithToolbar } from '@/components/tiptap-editor-with-toolbar';
import { Button } from '@/components/ui/button';
import { Send, X, ArrowLeft, Calendar as CalendarIcon, Trash2, Plus, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUsers } from '@/lib/mock-users';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';

interface CreateFileFormProps {
  user: User;
  onCreateSuccess: (file: File, isDraft: boolean) => void;
  onCancel?: () => void;
}

const categoryOptions = [
  { key: 'finance', bn: 'অর্থ', en: 'Finance' },
  { key: 'hr', bn: 'মানবসম্পদ', en: 'Human Resources' },
  { key: 'it', bn: 'আইটি', en: 'IT' },
  { key: 'admin', bn: 'প্রশাসন', en: 'Administration' },
  { key: 'ops', bn: 'কার্যক্রম', en: 'Operations' },
];

export function CreateFileForm({ user, onCreateSuccess, onCancel }: CreateFileFormProps) {
  const [formData, setFormData] = useState({ 
    title: '', 
    summary: '', 
    category: '', 
    tags: '', 
    documentBody: '',
    date: new Date().toISOString().slice(0,10),
    language: 'bn' as 'bn' | 'en',
    sendTo: 'user-004', // Default to Fatima Ahmed (Approver)
    sendCopies: [''],
  });

  const recipientOptions = useMemo(() => {
    return mockUsers.filter(u => u.role === 'Reviewer' || u.role === 'Approver');
  }, []);
  const [reference, setReference] = useState('RNPL-0000');
  const [isEditingRef, setIsEditingRef] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [zoomControlLeft, setZoomControlLeft] = useState<number | null>(null);
  const subjectTextareaRef = useRef<HTMLTextAreaElement>(null);
  const sendCopiesTextareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generate file ID based on reference
  const generateFileId = (ref: string) => {
    const match = ref.match(/(\d+)/);
    if (match) {
      return `RNPL-${match[1]}`;
    }
    return ref;
  };
  
  // Auto-save functionality (like Google Docs)
  useEffect(() => {
    // Skip auto-save if required fields are empty
    if (!formData.title || !formData.category) return;

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (2 seconds after last change)
    autoSaveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      
      const newHistory = [
        { 
          timestamp: new Date().toISOString(), 
          actor: user.name, 
          event: 'Draft Saved', 
          stateChange: 'Draft' as FileStatus, 
          note: 'Auto-saved draft.'
        }
      ];

      const newFile: File = {
        ...formData,
        id: generateFileId(reference),
        sender: user.name,
        status: 'Draft',
        lastUpdated: formData.date,
        isApproverAction: false,
        documentBody: formData.documentBody || 'No content provided.',
        history: newHistory,
      };
      
      // In a real app, this would be an API call
      // For now, we'll just update the lastSaved time
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
      }, 500);
    }, 2000);

    // Cleanup on unmount
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [formData.title, formData.category, formData.documentBody, formData.date, reference, user.name]);

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.documentBody) return;
    
    const newHistory = [
      { 
        timestamp: new Date().toISOString(), 
        actor: user.name, 
        event: 'Sent for Approval', 
        stateChange: 'Pending' as FileStatus, 
        note: 'Initiated new approval request.'
      }
    ];

    const newFile: File = {
      ...formData,
      id: generateFileId(reference),
      sender: user.name,
      status: 'Pending',
      lastUpdated: formData.date,
      isApproverAction: true,
      documentBody: formData.documentBody || 'No content provided.',
      history: newHistory,
    };
    onCreateSuccess(newFile, false);
  };

  const displayCategory = useMemo(() => {
    const found = categoryOptions.find(c => c.key === formData.category);
    if (!found) return '';
    return formData.language === 'bn' ? found.bn : found.en;
  }, [formData.category, formData.language]);

  const handleSendCopyChange = (value: string, index: number) => {
    const updated = [...formData.sendCopies];
    updated[index] = value;
    setFormData({ ...formData, sendCopies: updated });
  };

  const handleAddCopy = () => {
    setFormData({ ...formData, sendCopies: [...formData.sendCopies, ''] });
  };

  const handleRemoveCopy = (index: number) => {
    const updated = formData.sendCopies.filter((_, i) => i !== index);
    setFormData({ ...formData, sendCopies: updated.length ? updated : [''] });
  };

  const handleMoveCopy = (index: number, direction: -1 | 1) => {
    const updated = [...formData.sendCopies];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= updated.length) return;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFormData({ ...formData, sendCopies: updated });
  };
  
  // Get user name based on selected language
  const getUserName = (lang: 'bn' | 'en') => {
    return lang === 'bn' ? user.nameBn : user.nameEn;
  };

  const getUserDesignation = (lang: 'bn' | 'en') => {
    return lang === 'bn' ? user.designationBn : user.designationEn;
  };
  
  const getUserInitials = (lang: 'bn' | 'en') => {
    const name = getUserName(lang);
    return name.split(' ').map(n => n[0]).join('. ').toUpperCase();
  };

  // Auto-resize subject textarea
  useEffect(() => {
    if (subjectTextareaRef.current) {
      subjectTextareaRef.current.style.height = 'auto';
      subjectTextareaRef.current.style.height = `${subjectTextareaRef.current.scrollHeight}px`;
    }
  }, [formData.title]);

  // Auto-resize send copies textareas
  useEffect(() => {
    sendCopiesTextareaRefs.current.forEach((textarea) => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 2}px`; // +2 for borders
      }
    });
  }, [formData.sendCopies]);

  // Calculate zoom control position relative to preview container
  useEffect(() => {
    if (viewMode !== 'preview' || !previewContainerRef.current) {
      setZoomControlLeft(null);
      return;
    }

    const updateZoomControlPosition = () => {
      if (!previewContainerRef.current) return;
      
      const container = previewContainerRef.current;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      setZoomControlLeft(centerX);
    };

    updateZoomControlPosition();

    // Find the scrollable parent container
    const scrollContainer = previewContainerRef.current.closest('.overflow-y-auto');
    
    // Update on scroll and resize
    const handleScroll = () => updateZoomControlPosition();
    const handleResize = () => updateZoomControlPosition();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode, previewZoom]);

  return (
    <div className="flex h-full">
      {/* Main Document Editor */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Back">
              <ArrowLeft size={18} />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">New File</h2>
          </div>
          <div className="flex items-center gap-3">
            {viewMode === 'edit' && (
              <Tabs value={formData.language} onValueChange={(val) => setFormData({ ...formData, language: val as 'bn' | 'en' })} className="w-auto">
                <TabsList className="grid grid-cols-2 w-[160px]">
                  <TabsTrigger value="bn">বাংলা</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
            <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as 'edit' | 'preview')} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[160px]">
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
            {isSaving && (
              <span className="text-xs text-slate-500">Saving...</span>
            )}
            {isSaving && (
              <span className="text-xs text-slate-500">Saving...</span>
            )}
            {!isSaving && lastSaved && (
              <span className="text-xs text-slate-500">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Document Editor Content */}
        {viewMode === 'edit' ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar flex items-start justify-center pt-8 pb-32 px-8">
            <div className="max-w-4xl w-full">
              {/* White Paper Container */}
              <div className="bg-white rounded-lg shadow-lg border border-slate-200/50 p-12">
                {/* Document Header */}
                <DocumentHeader 
                  fileId={generateFileId(reference)} 
                  date={formData.date} 
                  language={formData.language}
                  onFileIdChange={(value) => setReference(value)}
                  onDateChange={(value) => setFormData({ ...formData, date: value })}
                  isEditingRef={isEditingRef}
                  isEditingDate={isEditingDate}
                  onEditRef={() => setIsEditingRef(true)}
                  onEditDate={() => setIsEditingDate(true)}
                  onSaveRef={() => setIsEditingRef(false)}
                  onSaveDate={() => setIsEditingDate(false)}
                  reference={reference}
                />

                {/* Subject Line - Editable */}
                <div className="mb-6 text-center">
                  <textarea
                    ref={subjectTextareaRef}
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder={formData.language === 'bn' ? 'বিষয়: এখানে বিষয় লিখুন...' : 'Subject: Enter subject here...'}
                    className="w-full text-2xl font-semibold text-slate-900 mb-4 leading-tight font-bangla-serif border-none outline-none bg-transparent focus:ring-0 placeholder:text-slate-400 text-center resize-none overflow-hidden"
                    rows={1}
                  />
                </div>

                {/* Document Body with TipTap Toolbar */}
                <div className="mb-12">
                  <TipTapEditorWithToolbar
                    content={formData.documentBody}
                    onChange={(content) => setFormData({...formData, documentBody: content})}
                    placeholder={formData.language === 'bn' ? 'এখানে আপনার নথির মূল বিষয়বস্তু লিখুন...' : 'Start typing your document content here...'}
                  />
                </div>

                {/* Signature Area */}
                <div className="mt-16 flex justify-end">
                  <div className="text-center space-y-1 font-bangla-serif min-w-[200px]">
                    <div className="border-b border-slate-300 mb-2"></div>
                    <p className="text-sm font-semibold text-slate-900">
                      ({getUserName(formData.language)})
                    </p>
                    <p className="text-[12px] text-slate-700">
                      {getUserDesignation(formData.language)}
                    </p>
                    <p className="text-[12px] text-slate-700">
                      {formData.language === 'bn' ? 'আরএনপিএল' : 'RNPL'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <div ref={previewContainerRef} className="flex items-start justify-center pt-8 pb-32 px-8 min-h-full relative">
              <div className="relative">
                <DocumentPreview
                  title={formData.title}
                  category={displayCategory}
                  documentBody={formData.documentBody}
                  sender={getUserName(formData.language)}
                  designation={getUserDesignation(formData.language)}
                  fileId={generateFileId(reference)}
                  date={formData.date}
                  zoom={previewZoom}
                  language={formData.language}
                />
              </div>
              {/* Zoom Controls - Fixed at bottom, centered relative to preview container */}
              {zoomControlLeft !== null && (
                <div 
                  className="fixed bottom-8 bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 flex items-center gap-2 z-50"
                  style={{ left: `${zoomControlLeft}px`, transform: 'translateX(-50%)' }}
                >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewZoom(Math.max(0.5, previewZoom - 0.1))}
                  disabled={previewZoom <= 0.5}
                >
                  <ZoomOut size={16} />
                </Button>
                <span className="text-sm font-medium text-slate-700 min-w-[60px] text-center">
                  {Math.round(previewZoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewZoom(Math.min(2, previewZoom + 0.1))}
                  disabled={previewZoom >= 2}
                >
                  <ZoomIn size={16} />
                </Button>
                <div className="w-px h-6 bg-slate-300 mx-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPreviewZoom(1)}
                  disabled={previewZoom === 1}
                >
                  <RotateCcw size={16} />
                </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Metadata */}
      <div className="w-80 border-l border-slate-200 bg-white flex flex-col">
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Document Settings</h3>
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 custom-scrollbar">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Category <span className="text-rose-500">*</span>
            </label>
            <select 
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none appearance-none"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select category...</option>
              {categoryOptions.map(c => (
                <option key={c.key} value={c.key}>
                  {formData.language === 'bn' ? c.bn : c.en}
                </option>
              ))}
            </select>
          </div>

          {/* Send To */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Send To
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-12 px-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    {(() => {
                      const sel = recipientOptions.find(r => r.id === formData.sendTo);
                      if (!sel) return <span className="text-slate-500">Select recipient...</span>;
                      const displayName = formData.language === 'bn' ? sel.nameBn : sel.nameEn;
                      const displayDesignation = formData.language === 'bn' ? sel.designationBn : sel.designationEn;
                      return (
                        <>
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarImage src={getAvatarPath(sel.nameEn, sel.avatarId)} alt={sel.nameEn} />
                            <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs font-semibold">
                              {getInitials(sel.nameEn)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate w-full text-left">{displayName}</p>
                            <p className="text-xs text-slate-600 truncate w-full text-left">{displayDesignation}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 py-3">
                <DropdownMenuLabel className="text-xs font-semibold text-slate-600">Select recipient</DropdownMenuLabel>
                {recipientOptions.map(r => (
                  <DropdownMenuItem
                    key={r.id}
                    className="flex items-center gap-3 cursor-pointer py-2"
                    onClick={() => setFormData({ ...formData, sendTo: r.id })}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={getAvatarPath(r.nameEn, r.avatarId)} alt={r.nameEn} />
                      <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs font-semibold">
                        {getInitials(r.nameEn)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate w-full">
                        {formData.language === 'bn' ? r.nameBn : r.nameEn}
                      </p>
                      <p className="text-xs text-slate-600 truncate w-full">
                        {formData.language === 'bn' ? r.designationBn : r.designationEn}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Send Copies */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Send Copies To
            </label>
            <div className="space-y-2">
              {formData.sendCopies.map((copy, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2"
                  draggable
                  onDragStart={() => setDragIndex(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIndex === null || dragIndex === idx) return;
                    const updated = [...formData.sendCopies];
                    const [moved] = updated.splice(dragIndex, 1);
                    updated.splice(idx, 0, moved);
                    setFormData({ ...formData, sendCopies: updated });
                    setDragIndex(null);
                  }}
                >
                  <div className="h-9 w-2 rounded bg-slate-200 self-start mt-2" />
                  <textarea
                    ref={(el) => {
                      sendCopiesTextareaRefs.current[idx] = el;
                    }}
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none min-h-[36px] overflow-hidden"
                    placeholder="Enter recipient name/designation"
                    value={copy}
                    onChange={(e) => handleSendCopyChange(e.target.value, idx)}
                    rows={1}
                  />
                  <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-100 text-rose-500 self-start" onClick={() => handleRemoveCopy(idx)} aria-label="Remove">
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAddCopy}>
              <Plus size={14} className="mr-2" />
              Add Recipient
            </Button>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200">
            <Button
              onClick={handleSubmit}
              disabled={!formData.title || !formData.category || !formData.documentBody}
              className="w-full bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
            >
              <Send size={16} className="mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

