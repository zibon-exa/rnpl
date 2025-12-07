'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value?: number;
  icon: LucideIcon;
  onClick?: () => void;
  colorClass: string;
}

export function StatCard({ title, value, icon: Icon, onClick, colorClass }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={colorClass.replace('bg-', 'text-')} size={24} />
        </div>
        {value !== undefined && <span className="text-3xl font-bold text-slate-800">{value}</span>}
      </div>
      <h3 className="text-sm font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">{title}</h3>
    </div>
  );
}

