'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value?: number;
  icon: LucideIcon;
  onClick?: () => void;
  colorClass: string;
}

export function StatCard({ title, value, icon: Icon, onClick, colorClass }: StatCardProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-xl shadow border border-slate-100 transition-all ${isClickable ? 'cursor-pointer hover:shadow-lg hover:border-[hsl(var(--color-brand))]/20 group' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg transition-transform duration-300 ${isClickable ? 'group-hover:scale-110' : ''}`} style={{ backgroundColor: 'hsl(var(--color-brand) / 0.1)' }}>
          <Icon className="text-[hsl(var(--color-brand))]" size={18} />
        </div>
        {value !== undefined && <span className="text-2xl font-bold text-slate-800">{value}</span>}
      </div>
      <h3 className={`text-xs font-medium text-slate-500 transition-colors ${isClickable ? 'group-hover:text-[hsl(var(--color-brand))]' : ''}`}>{title}</h3>
    </div>
  );
}
