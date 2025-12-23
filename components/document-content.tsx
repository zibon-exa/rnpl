'use client';

interface DocumentContentProps {
  title?: string;
  category?: string;
  documentBody?: string;
  sender?: string;
  designation?: string;
  showPlaceholders?: boolean;
  showCaptions?: boolean;
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
  showCaptions = false,
  language = 'bn'
}: DocumentContentProps) {
  return (
    <div className="font-bangla text-slate-800 leading-relaxed text-xs whitespace-pre-wrap mb-12">
      {/* Subject */}
      <div className="mb-8 text-center">
        {showCaptions && (
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 font-bangla">বিষয়</p>
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-tight font-bangla-serif">
          {title || (showPlaceholders ? <span className="text-slate-400 italic">বিষয়বস্তু যোগ করুন...</span> : '')}
        </h1>
      </div>

      {/* Document Body */}
      <div className="mb-4">
        {showCaptions && (
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-bangla-serif">বিষয়বস্তু</p>
        )}
        <div
          className="prose prose-sm max-w-none text-[15px] leading-7 text-slate-700 font-bangla [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_td]:border [&_td]:border-slate-300 [&_td]:p-2 [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_th]:bg-slate-50 [&_th]:font-semibold [&_p]:my-1 [&_p]:mb-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_s]:line-through"
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
            <p className="text-sm font-bold text-slate-900">
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

