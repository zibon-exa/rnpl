import { FileStatus } from '@/types/file';

interface StatusBadgeProps {
  status: FileStatus;
  variant?: 'full' | 'dot';
  className?: string;
}

export function StatusBadge({ status, variant = 'full', className = '' }: StatusBadgeProps) {
  const styles = {
    'Approved': { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
    'Pending': { color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' },
    'Returned': { color: 'text-rose-700', bg: 'bg-rose-50', dot: 'bg-rose-500' },
    'Draft': { color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400' },
    'In Review': { color: 'text-indigo-700', bg: 'bg-indigo-50', dot: 'bg-indigo-500' },
  };
  const style = styles[status] || styles['Draft'];

  if (variant === 'dot') {
    return (
      <span 
        className={`block w-3 h-3 rounded-full border-2 border-white ${style.dot} ${className}`} 
        title={status}
      />
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.color} border border-transparent ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${style.dot}`} />
      {status}
    </span>
  );
}

