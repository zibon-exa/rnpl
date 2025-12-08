'use client';

import { useMemo, useState } from 'react';
import { User } from '@/types/user';
import { File, FileStatus } from '@/types/file';
import { DocumentHeader } from '@/components/document-header';
import { Button } from '@/components/ui/button';
import { Save, Send, X, ArrowLeft, Calendar as CalendarIcon, Trash2, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const recipientOptions = [
  { id: '1', nameBn: 'আরিফ হাসান', nameEn: 'Arif Hasan', designation: 'Reviewer', avatar: 'AH' },
  { id: '2', nameBn: 'সাবরিনা রহমান', nameEn: 'Sabrina Rahman', designation: 'Approver', avatar: 'SR' },
  { id: '3', nameBn: 'মাহির ইসলাম', nameEn: 'Maher Islam', designation: 'Approver', avatar: 'MI' },
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
    sendTo: '2',
    sendCopies: [''],
  });
  const [reference] = useState('RNPL-0000');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  
  const handleSave = (isDraft: boolean) => {
    if (!formData.title || !formData.category) return; // Simple validation
    
    const newHistory = [
      { 
        timestamp: new Date().toISOString(), 
        actor: user.name, 
        event: isDraft ? 'Draft Saved' : 'Sent for Approval', 
        stateChange: (isDraft ? 'Draft' : 'Pending') as FileStatus, 
        note: isDraft ? 'File created and saved as draft.' : 'Initiated new approval request.'
      }
    ];

    const newFile: File = {
      ...formData,
      id: `RNPL-${Math.floor(Math.random() * 8999) + 1000}`,
      sender: user.name,
      status: isDraft ? 'Draft' : 'Pending',
      lastUpdated: formData.date,
      isApproverAction: !isDraft,
      documentBody: formData.documentBody || 'No content provided.',
      history: newHistory,
    };
    onCreateSuccess(newFile, isDraft);
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

  const formatDateForHeader = formData.date;
  const previewLanguage = formData.language;
  
  // Get user name based on selected language
  const getUserName = (lang: 'bn' | 'en') => {
    // Map current user's name to both languages
    const nameMap: Record<string, { bn: string; en: string }> = {
      'তৌফিক জোয়ার্দার': { bn: 'তৌফিক জোয়ার্দার', en: 'Toufique Joarder' },
    };
    const trimmedName = user.name.trim();
    const userNames = nameMap[trimmedName];
    
    if (userNames) {
      return lang === 'bn' ? userNames.bn : userNames.en;
    }
    
    // Fallback: if name contains both languages in parentheses, extract the appropriate one
    const match = trimmedName.match(/^(.+?)\s*\((.+?)\)$/);
    if (match) {
      const banglaName = match[1].trim();
      const englishName = match[2].trim();
      return lang === 'bn' ? banglaName : englishName;
    }
    
    // Final fallback: return as-is (assume it's Bangla)
    return trimmedName;
  };
  
  const getUserInitials = (lang: 'bn' | 'en') => {
    const name = getUserName(lang);
    return name.split(' ').map(n => n[0]).join('. ').toUpperCase();
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Input Fields */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Back">
            <ArrowLeft size={18} />
          </Button>
          <h2 className="text-lg font-bold text-slate-900">Create New File</h2>
        </div>

        {/* Form Fields - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 custom-scrollbar">
          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Language</span>
            <div className="flex-1 flex justify-end">
              <Tabs value={formData.language} onValueChange={(val) => setFormData({ ...formData, language: val as 'bn' | 'en' })} className="w-auto">
                <TabsList className="grid grid-cols-2 w-[160px]">
                  <TabsTrigger value="bn">বাংলা</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              File Title <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
              placeholder="Enter file title..."
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Reference */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Reference
            </label>
            <div className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
              {reference} <span className="text-slate-400">(Auto-generated on submit)</span>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Date
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
              <CalendarIcon size={16} className="text-slate-400" />
            </div>
          </div>

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

          {/* Details */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Details <span className="text-rose-500">*</span>
            </label>
            <textarea 
              rows={8}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none" 
              placeholder="Draft the main content of the letter or report here..."
              value={formData.documentBody}
              onChange={e => setFormData({...formData, documentBody: e.target.value})}
            />
            <p className="text-xs text-slate-400 mt-1">This will appear in the file preview</p>
          </div>

          {/* Send To */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Send To
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-12 px-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const sel = recipientOptions.find(r => r.id === formData.sendTo);
                      if (!sel) return <span className="text-slate-500">Select recipient...</span>;
                      const displayName = formData.language === 'bn' ? sel.nameBn : sel.nameEn;
                      return (
                        <>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs font-semibold">
                              {sel.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                            <p className="text-xs text-slate-600">{sel.designation}</p>
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
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs font-semibold">
                        {r.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-semibold text-slate-900">
                        {formData.language === 'bn' ? r.nameBn : r.nameEn}
                      </p>
                      <p className="text-xs text-slate-600">{r.designation}</p>
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
                  <div className="h-9 w-2 rounded bg-slate-200" />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                    placeholder="Enter recipient name/designation"
                    value={copy}
                    onChange={(e) => handleSendCopyChange(e.target.value, idx)}
                  />
                  <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-100 text-rose-500" onClick={() => handleRemoveCopy(idx)} aria-label="Remove">
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
        </div>

        {/* Secondary Actions - Fixed at Bottom */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            )}
            <Button
              onClick={() => handleSave(false)}
              disabled={!formData.title || !formData.category || !formData.documentBody}
              className="flex-1 bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
            >
              <Send size={16} className="mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side - Preview Area */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex items-start justify-center pt-6 pb-6 px-6">
          <div className="max-w-4xl w-full">
            {/* White Paper Container */}
            <div className="bg-white rounded-lg shadow-lg border border-slate-200/50">
              {/* Blog Post Style Content */}
              <article className="prose prose-slate max-w-none relative z-10 p-16">
                {/* Document Header */}
                <DocumentHeader date={formatDateForHeader} language={previewLanguage} />

                {/* Title */}
                <header className="mb-8 text-center">
                  <h1 className="text-2xl font-semibold text-slate-900 mb-4 leading-tight font-bangla-serif">
                    {formData.title || <span className="text-slate-400 italic">বিষয়বস্তু যোগ করুন...</span>}
                  </h1>
                </header>

                {/* Main Content */}
                <div className="mb-12">
                  {formData.documentBody ? (
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700 font-bangla">
                        {formData.documentBody}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">No content provided.</p>
                  )}
                </div>

                {/* Signature Area */}
                <div className="mt-16 flex justify-end">
                  <div className="text-center space-y-1 font-bangla-serif">
                    <div className="h-12 w-48 mx-auto relative">
                      <span className={`absolute inset-0 flex items-center justify-center text-slate-800 text-sm select-none pointer-events-none ${previewLanguage === 'bn' ? 'font-mina' : 'font-cursive'}`}>
                        {getUserName(previewLanguage)}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 border-b border-slate-300"></div>
                    </div>
                    <p className="text-[12px] text-slate-700">
                      {previewLanguage === 'bn' ? 'কোম্পানি সচিব' : 'Company Secretary'}
                    </p>
                    <p className="text-[12px] text-slate-700">
                      {previewLanguage === 'bn' ? 'আরএনপিএল' : 'RNPL'}
                    </p>
                  </div>
                </div>

                {/* Distribution List */}
                {formData.sendCopies.some(c => c.trim() !== '') && (
                  <div className="mt-12">
                    <p className="text-[13px] font-semibold text-slate-900 mb-3 font-bangla-serif">
                      বিতরণ জ্ঞাতার্থে / জ্ঞাতার্থে ও কার্যার্থে (জ্যেষ্ঠতার ক্রমানুসারে নয়):
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-[13px] leading-6 text-slate-800 font-bangla">
                      {formData.sendCopies
                        .map(c => c.trim())
                        .filter(Boolean)
                        .map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                    </ol>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

