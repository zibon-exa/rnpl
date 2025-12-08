'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { toBanglaNumerals } from '@/lib/utils';

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
      className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-[hsl(var(--color-brand))]/20 transition-all ${onClick ? 'cursor-pointer' : ''} group`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'hsl(var(--color-brand) / 0.1)' }}>
          <Icon className="text-[hsl(var(--color-brand))]" size={18} />
        </div>
        {value !== undefined && <span className="text-2xl font-bold text-slate-800">{toBanglaNumerals(value)}</span>}
      </div>
      <h3 className="text-xs font-medium text-slate-500 group-hover:text-[hsl(var(--color-brand))] transition-colors">{title}</h3>
    </div>
  );
}
