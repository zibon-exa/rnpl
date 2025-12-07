'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { File, FileStatus } from '@/types/file';
import { DocumentPreview } from '@/components/document-preview';
import { Button } from '@/components/ui/button';
import { Save, Send, X } from 'lucide-react';

interface CreateFileFormProps {
  user: User;
  onCreateSuccess: (file: File, isDraft: boolean) => void;
  onCancel?: () => void;
}

const mockCategories = ['অর্থ', 'মানবসম্পদ', 'আইটি', 'প্রশাসন', 'কার্যক্রম'];

export function CreateFileForm({ user, onCreateSuccess, onCancel }: CreateFileFormProps) {
  const [formData, setFormData] = useState({ 
    title: '', 
    summary: '', 
    category: '', 
    tags: '', 
    documentBody: '' 
  });
  
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
      lastUpdated: new Date().toISOString().slice(0, 10),
      isApproverAction: !isDraft,
      documentBody: formData.documentBody || 'No content provided.',
      history: newHistory,
    };
    onCreateSuccess(newFile, isDraft);
  };

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Input Fields */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Create New File</h2>
          <p className="text-slate-500 text-xs mt-1">Fill in the details below</p>
        </div>

        {/* Form Fields - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
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
              {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Executive Summary
            </label>
            <textarea 
              rows={3}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none" 
              placeholder="Brief description for the cover sheet..."
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Document Body <span className="text-rose-500">*</span>
            </label>
            <textarea 
              rows={8}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none font-mono" 
              placeholder="Draft the main content of the letter or report here..."
              value={formData.documentBody}
              onChange={e => setFormData({...formData, documentBody: e.target.value})}
            />
            <p className="text-xs text-slate-400 mt-1">This will appear in the document preview</p>
          </div>
        </div>

        {/* Secondary Actions - Fixed at Bottom */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
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
              variant="outline"
              onClick={() => handleSave(true)}
              disabled={!formData.title || !formData.category}
              className="flex-1"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave(false)}
              disabled={!formData.title || !formData.category || !formData.documentBody}
              className="flex-1 bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white"
            >
              <Send size={16} className="mr-2" />
              Submit
            </Button>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Preview updates in real-time as you type
          </p>
        </div>
      </div>

      {/* Right Side - Preview Area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Preview Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white">
          <h3 className="text-sm font-semibold text-slate-700">Document Preview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live preview of your document</p>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          <DocumentPreview
            title={formData.title}
            category={formData.category}
            documentBody={formData.documentBody}
            sender={user.name}
          />
        </div>
      </div>
    </div>
  );
}

