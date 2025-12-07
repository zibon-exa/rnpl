'use client';

interface DocumentContentProps {
  title?: string;
  category?: string;
  documentBody?: string;
  sender?: string;
  showPlaceholders?: boolean;
}

/**
 * Centralized document content component
 * Used in all document previews to ensure consistent structure and styling
 */
export function DocumentContent({ 
  title, 
  category, 
  documentBody, 
  sender,
  showPlaceholders = true 
}: DocumentContentProps) {
  return (
    <div className="font-bangla text-slate-800 leading-relaxed text-xs whitespace-pre-wrap mb-12">
      {/* Subject */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়</p>
        <p className="text-sm font-semibold text-slate-900 font-bangla">
          {title || (showPlaceholders ? <span className="text-slate-400 italic">বিষয়বস্তু যোগ করুন...</span> : '')}
        </p>
      </div>
      
      {/* Category */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিভাগ</p>
        <p className="text-xs text-slate-700 font-bangla">
          {category || (showPlaceholders ? <span className="text-slate-400 italic">বিভাগ নির্বাচন করুন...</span> : '')}
        </p>
      </div>
      
      {/* Document Body */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়বস্তু</p>
        <div className="text-xs text-slate-700 leading-relaxed font-bangla">
          {documentBody || (showPlaceholders ? <span className="text-slate-400 italic">কোন নথি বিষয়বস্তু পাওয়া যায়নি।</span> : '')}
        </div>
      </div>

      {/* Signature Area */}
      {sender && (
        <div className="absolute bottom-12 right-12 text-left z-10">
          <div className="mb-2">
            <p className="text-[10px] text-slate-500 mb-1 font-bangla">প্রস্তুত করেছেন:</p>
            <div className="font-cursive text-sm text-slate-900 mb-1 leading-none">{sender}</div>
            <div className="border-t border-slate-400 w-40 pt-1 mt-2">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bangla">ডিজিটাল স্বাক্ষর</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

