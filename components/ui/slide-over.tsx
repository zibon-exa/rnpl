'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  tabs?: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, children, title, tabs }: SlideOverProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="absolute inset-y-0 right-0 max-w-4xl w-full flex">
        <div className="w-full h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col">
          {/* Header */}
          <div className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
              {tabs && (
                <div className="absolute left-1/2 -translate-x-1/2">
                  {tabs}
                </div>
              )}
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ml-auto"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar noise-texture relative">
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

