'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RiskTrendData } from '@/lib/dashboard-data';
import { Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RiskEscalationTrendProps {
  data: RiskTrendData[];
}

export function RiskEscalationTrend({ data }: RiskEscalationTrendProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
          <p className="text-sm font-semibold text-slate-900 mb-2">
            {payload[0].payload.month}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white border-slate-100 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Risk & Escalation Trend
          </CardTitle>
          <TooltipProvider>
            <UITooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Info size={14} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[250px] text-xs">
                <p>Tracks the monthly trend of escalations (red) and risks (amber) over the past 12 months. Helps identify patterns and spikes in organizational risk levels. Higher values indicate increased operational challenges requiring attention.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80" tabIndex={-1} style={{ outline: 'none' }} role="img" aria-label="Risk and Escalation Trend Chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEscalations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRisks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                tick={{ 
                  fill: '#64748b', 
                  fontSize: 12,
                  fontFamily: "Inter, 'July Font', sans-serif",
                  fontWeight: 500
                }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ 
                  fill: '#64748b', 
                  fontSize: 12,
                  fontFamily: "Inter, 'July Font', sans-serif",
                  fontWeight: 500
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 9999, pointerEvents: 'auto' }}
              />
              <Legend
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontFamily: "Inter, 'July Font', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500
                }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="escalations"
                name="Escalations"
                stroke="#f43f5e"
                fill="url(#colorEscalations)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="risks"
                name="Risks"
                stroke="#f59e0b"
                fill="url(#colorRisks)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

