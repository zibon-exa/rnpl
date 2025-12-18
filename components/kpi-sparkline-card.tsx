'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KpiData } from '@/lib/dashboard-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface KpiSparklineCardProps {
  data: KpiData;
}

export function KpiSparklineCard({ data }: KpiSparklineCardProps) {
  const { title, value, subtext, trend, status, sparklineData, description } = data;

  // Explicit hex codes to ensure no CSS variable conflicts
  const statusConfig = {
    success: {
      color: '#10b981', // emerald-500
      tailwindText: 'text-emerald-500',
      tailwindBg: 'bg-emerald-500/10',
    },
    warning: {
      color: '#f59e0b', // amber-500
      tailwindText: 'text-amber-500',
      tailwindBg: 'bg-amber-500/10',
    },
    critical: {
      color: '#f43f5e', // rose-500
      tailwindText: 'text-rose-500',
      tailwindBg: 'bg-rose-500/10',
    },
  };

  const config = statusConfig[status];
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
  
  const trendColorClass = config.tailwindText;

  // Create a unique ID for the gradient to avoid conflicts between cards
  const gradientId = `gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Card className="bg-white border-slate-100 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 pb-0">
          <div className="flex justify-between items-start mb-1">
            <div className="w-full">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {title}
                </p>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Info size={12} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-[200px] text-xs">
                      {description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
                <div className={cn('flex items-center gap-1 text-xs font-medium', trendColorClass)}>
                  <TrendIcon size={14} />
                </div>
              </div>
            </div>
          </div>
          <p className={cn('text-[10px] font-medium', config.tailwindText)}>
            {subtext}
          </p>
        </div>

        {/* Chart Container */}
        <div className="h-[45px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={config.color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone" // Smooth curves
                dataKey="value"
                stroke={config.color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
