'use client';

interface DocumentContentProps {
  title?: string;
  category?: string;
  documentBody?: string;
  sender?: string;
  designation?: string;
  showPlaceholders?: boolean;
  language?: 'bn' | 'en';
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
  designation,
  showPlaceholders = true,
  language = 'bn'
}: DocumentContentProps) {
  return (
    <div className="font-bangla text-slate-800 leading-relaxed text-xs whitespace-pre-wrap mb-12">
      {/* Subject */}
      <div className="mb-4 text-center">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়</p>
        <p className="text-sm font-semibold text-slate-900 font-bangla-serif">
          {title || (showPlaceholders ? <span className="text-slate-400 italic">বিষয়বস্তু যোগ করুন...</span> : '')}
        </p>
      </div>
      
      {/* Document Body */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla-serif">বিষয়বস্তু</p>
        <div 
          className="text-[15px] leading-7 text-slate-700 font-bangla [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2 [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_th]:bg-slate-50 [&_th]:font-semibold [&_p]:my-1"
          dangerouslySetInnerHTML={{ 
            __html: documentBody || (showPlaceholders ? '<span class="text-slate-400 italic">কোন নথি বিষয়বস্তু পাওয়া যায়নি।</span>' : '') 
          }}
        />
      </div>

      {/* Signature Area */}
      {sender && (
        <div className="mt-16 flex justify-end">
          <div className="text-center space-y-1 font-bangla-serif min-w-[200px]">
            <div className="border-b border-slate-300 mb-2"></div>
            <p className="text-sm font-semibold text-slate-900">
              ({sender})
            </p>
            {designation && (
              <p className="text-[12px] text-slate-700">
                {designation}
              </p>
            )}
            <p className="text-[12px] text-slate-700">
              {language === 'bn' ? 'আরএনপিএল' : 'RNPL'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

