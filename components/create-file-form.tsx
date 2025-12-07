'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import { File, FileStatus } from '@/types/file';

interface CreateFileFormProps {
  user: User;
  onCreateSuccess: (file: File, isDraft: boolean) => void;
  onCancel?: () => void;
}

const mockCategories = ['HR', 'Finance', 'IT', 'Administration', 'Operations'];

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
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
        <h2 className="text-xl font-bold text-slate-900">Create New File</h2>
        <p className="text-slate-500 text-sm mt-1">Start a new workflow or save a draft for later.</p>
      </div>
      <div className="p-8 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            File Title <span className="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
            placeholder="e.g. Q3 Marketing Budget"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Category <span className="text-rose-500">*</span>
            </label>
            <select 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none appearance-none"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select...</option>
              {mockCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Tags</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
              placeholder="comma, separated"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Executive Summary</label>
          <textarea 
            rows={2}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none" 
            placeholder="Brief description for the cover sheet..."
            value={formData.summary}
            onChange={e => setFormData({...formData, summary: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Document Body (The "Attachment")</label>
          <textarea 
            rows={6}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none font-serif" 
            placeholder="Draft the main content of the letter or report here..."
            value={formData.documentBody}
            onChange={e => setFormData({...formData, documentBody: e.target.value})}
          />
        </div>
        <div className="pt-6 flex items-center justify-end gap-3 border-t border-slate-100">
          {onCancel && (
            <button 
              onClick={onCancel} 
              className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => handleSave(true)} 
            className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button 
            onClick={() => handleSave(false)} 
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            Create & Submit
          </button>
        </div>
      </div>
    </div>
  );
}

