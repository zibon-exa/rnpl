'use client';

import Image from 'next/image';
import { formatFileIdToBangla, formatDateToBangla } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit2, Check } from 'lucide-react';

interface DocumentHeaderProps {
  fileId?: string;
  date?: string;
  language?: 'bn' | 'en';
  onFileIdChange?: (fileId: string) => void;
  onDateChange?: (date: string) => void;
  isEditingRef?: boolean;
  isEditingDate?: boolean;
  onEditRef?: () => void;
  onEditDate?: () => void;
  onSaveRef?: () => void;
  onSaveDate?: () => void;
  reference?: string;
}

/**
 * Centralized document header component
 * Used in all document previews to ensure consistent design
 */
export function DocumentHeader({ 
  fileId, 
  date, 
  language = 'bn',
  onFileIdChange,
  onDateChange,
  isEditingRef = false,
  isEditingDate = false,
  onEditRef,
  onEditDate,
  onSaveRef,
  onSaveDate,
  reference
}: DocumentHeaderProps) {
  const previewFileId = fileId || 'RNPL-0000';
  const previewDate = date || new Date().toISOString().slice(0, 10);

  const formattedDate =
    language === 'en'
      ? new Date(previewDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : formatDateToBangla(previewDate);

  const formattedRef = language === 'en' ? previewFileId : formatFileIdToBangla(previewFileId);
  
  const refLabel = language === 'en' ? 'Ref No:' : 'স্মারক নং:';
  const dateLabel = language === 'en' ? 'Date:' : 'তারিখ:';

  return (
    <div className="mb-6 pb-4">
      {/* Logo and Company Names - Horizontal Layout */}
      <div className="flex items-center gap-4 mb-4">
        {/* Logo - Smaller */}
        <div className="shrink-0">
          <Image
            src="/logo.png"
            alt="RNPL Logo"
            width={50}
            height={50}
            className="h-auto w-auto"
            priority
          />
        </div>
        
        {/* Company Names - Left Aligned */}
        <div className="flex-1">
          <p className="text-xl font-bangla font-semibold mb-0" style={{ color: 'hsl(197, 60%, 56%)' }}>
            আরপিসিএল-নরিনকো ইন্টারন্যাশনাল পাওয়ার লিমিটেড
          </p>
          <p className="text-base font-semibold leading-tight" style={{ color: 'hsl(197, 60%, 56%)' }}>
            RPCL-NORINCO INTL POWER LIMITED
          </p>
        </div>
      </div>
      
      {/* Divider between logo+names and address */}
      <div className="border-t border-slate-200 mb-3"></div>
      
      {/* Corporate Office Section */}
      <div className="text-[12px] text-slate-700 mb-3">
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
      
      {/* Reference and Date */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2">
          {isEditingRef && onFileIdChange && reference !== undefined ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={reference}
                onChange={(e) => onFileIdChange(e.target.value)}
                className="text-[14px] px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="RNPL-0000"
                autoFocus
                onBlur={onSaveRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSaveRef) {
                    onSaveRef();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onSaveRef}
              >
                <Check size={14} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className={`text-[14px] text-slate-600 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {refLabel} {formattedRef}
              </p>
              {onEditRef && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-slate-400 hover:text-slate-600"
                  onClick={onEditRef}
                >
                  <Edit2 size={12} />
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditingDate && onDateChange ? (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={previewDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="text-[14px] px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                autoFocus
                onBlur={onSaveDate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSaveDate) {
                    onSaveDate();
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={onSaveDate}
              >
                <Check size={14} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className={`text-[14px] text-slate-600 ${language === 'bn' ? 'font-bangla' : ''}`}>
                {dateLabel} {formattedDate}
              </p>
              {onEditDate && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-slate-400 hover:text-slate-600"
                  onClick={onEditDate}
                >
                  <Edit2 size={12} />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

