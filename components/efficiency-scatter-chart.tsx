'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { EfficiencyData } from '@/lib/dashboard-data';
import { Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EfficiencyScatterChartProps {
  data: EfficiencyData[];
}

const COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export function EfficiencyScatterChart({ data }: EfficiencyScatterChartProps) {
  const scatterData = data.map((item) => ({
    x: item.returnRate,
    y: item.averageSpeed,
    name: item.department,
  }));

  // Calculate median values for reference lines
  const medianReturnRate = data.reduce((sum, d) => sum + d.returnRate, 0) / data.length;
  const medianSpeed = data.reduce((sum, d) => sum + d.averageSpeed, 0) / data.length;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
          <p className="text-sm font-semibold text-slate-900">{payload[0].payload.name}</p>
          <p className="text-xs text-slate-600">
            Return Rate: {payload[0].payload.x}%
          </p>
          <p className="text-xs text-slate-600">
            Avg Speed: {payload[0].payload.y} days
          </p>
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
            Efficiency vs. Rework Quadrant
          </CardTitle>
          <TooltipProvider>
            <UITooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Info size={14} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[250px] text-xs">
                <p>Analyzes department performance by plotting return rate (quality) against average speed (velocity). The chart is divided into quadrants by median lines. Departments in the top-left quadrant are high-performing benchmarks, while those in the bottom-right need attention.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80" tabIndex={-1} style={{ outline: 'none' }} role="img" aria-label="Efficiency vs Rework Quadrant Chart">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 40, right: 45, bottom: 30, left: 15 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                dataKey="x"
                name="Return Rate"
                label={{ 
                  value: 'Return Rate (Quality)', 
                  position: 'insideBottom', 
                  offset: -5,
                  style: {
                    fontFamily: "Inter, 'July Font', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    fill: '#64748b'
                  }
                }}
                domain={[0, 20]}
                stroke="#64748b"
                tick={{ 
                  fill: '#64748b', 
                  fontSize: 11,
                  fontFamily: "Inter, 'July Font', sans-serif",
                  fontWeight: 500
                }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Average Speed"
                label={{ 
                  value: 'Avg Speed (Velocity)', 
                  angle: -90, 
                  position: 'left',
                  offset: 0,
                  style: {
                    fontFamily: "Inter, 'July Font', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    fill: '#64748b',
                    textAnchor: 'middle'
                  }
                }}
                domain={[0, 8]}
                stroke="#64748b"
                tick={{ 
                  fill: '#64748b', 
                  fontSize: 11,
                  fontFamily: "Inter, 'July Font', sans-serif",
                  fontWeight: 500
                }}
              />
              <Tooltip 
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 9999, pointerEvents: 'auto' }}
              />
              {/* Reference lines dividing quadrants */}
              <ReferenceLine
                x={medianReturnRate}
                stroke="#94a3b8"
                strokeDasharray="2 2"
                label={{ 
                  value: 'Median', 
                  position: 'top',
                  offset: 5,
                  style: {
                    fontFamily: "Inter, 'July Font', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    fill: '#64748b'
                  }
                }}
              />
              <ReferenceLine
                y={medianSpeed}
                stroke="#94a3b8"
                strokeDasharray="2 2"
                label={{ 
                  value: 'Median', 
                  position: 'right',
                  offset: 5,
                  style: {
                    fontFamily: "Inter, 'July Font', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    fill: '#64748b'
                  }
                }}
              />
              <Scatter name="Departments" data={scatterData} fill="#3b82f6">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500"></div>
              <span>Problem Area</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500"></div>
              <span>Benchmark</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

