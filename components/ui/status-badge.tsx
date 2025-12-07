import { FileStatus } from '@/types/file';

interface StatusBadgeProps {
  status: FileStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    'Approved': { color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
    'Pending': { color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' },
    'Returned': { color: 'text-rose-700', bg: 'bg-rose-50', dot: 'bg-rose-500' },
    'Draft': { color: 'text-slate-600', bg: 'bg-slate-100', dot: 'bg-slate-400' },
    'In Review': { color: 'text-indigo-700', bg: 'bg-indigo-50', dot: 'bg-indigo-500' },
  };
  const style = styles[status] || styles['Draft'];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.color} border border-transparent`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${style.dot}`} />
      {status}
    </span>
  );
}

