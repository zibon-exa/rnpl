'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DepartmentData } from '@/lib/dashboard-data';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';
import { AlertTriangle, Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DepartmentHeatmapProps {
  data: DepartmentData[];
}

interface ChartDataItem {
  name: string;
  value: number; // Overdue percentage
  overdueItems: number;
  totalItems: number;
  status: 'high' | 'medium' | 'low';
  fill: string;
  index?: number; // Index for label positioning
}

export function DepartmentHeatmap({ data }: DepartmentHeatmapProps) {
  // Get color based on status
  const getStatusColor = (status: 'high' | 'medium' | 'low'): string => {
    switch (status) {
      case 'high':
        return '#f43f5e'; // rose-500
      case 'medium':
        return '#f59e0b'; // amber-500
      case 'low':
        return '#10b981'; // emerald-500
    }
  };

  // Transform data for the chart
  const chartData: ChartDataItem[] = data.map((dept, index) => {
    const percentage = dept.totalItems > 0 
      ? Math.round((dept.overdueItems / dept.totalItems) * 100) 
      : 0;
    
    return {
      name: dept.name,
      value: percentage,
      overdueItems: dept.overdueItems,
      totalItems: dept.totalItems,
      status: dept.status,
      fill: getStatusColor(dept.status),
      index, // Add index for label positioning
    };
  });

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataItem;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-50 relative" style={{ zIndex: 9999 }}>
          <p className="text-sm font-semibold text-slate-900 mb-1">
            {data.name}
          </p>
          <div className="space-y-1">
            <p className="text-xs text-slate-600">
              <span className="font-medium text-slate-900">{data.overdueItems}</span> overdue items
            </p>
            <p className="text-xs text-slate-600">
              <span className="font-medium text-slate-900">{data.totalItems}</span> total items
            </p>
            <p className="text-xs font-medium" style={{ color: data.fill }}>
              {data.value}% overdue rate
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label function for radial bars - shows percentage on each bar
  const renderLabel = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, value, payload } = props;
    if (!value || value === 0 || !cx || !cy) return null;
    
    // Get index from payload if available, otherwise find it
    let currentIndex = -1;
    if (payload) {
      // Try to get index from payload first
      if (typeof payload.index === 'number') {
        currentIndex = payload.index;
      } else {
        // Find index by matching the payload with chartData
        currentIndex = chartData.findIndex(
          (item) => item.name === payload.name && item.value === value
        );
      }
    }
    
    // Fallback: if still no index, return null
    if (currentIndex === -1 || currentIndex >= chartData.length) return null;
    
    // Calculate the angle for this bar
    // RadialBarChart starts at 90 degrees (top) and goes clockwise to -270 degrees
    // Total span is 360 degrees divided equally among all bars
    const totalAngle = 360;
    const barAngle = totalAngle / chartData.length;
    
    // Calculate the center angle of this bar
    // Start from 90 degrees (top), each bar takes barAngle degrees
    // Center of bar = startAngle - (index * barAngle) - (barAngle / 2)
    const startAngleDeg = 90;
    const centerAngleDeg = startAngleDeg - (currentIndex * barAngle) - (barAngle / 2);
    const centerAngle = centerAngleDeg * (Math.PI / 180);
    
    // Position label at the outer edge of the bar, slightly outside
    const labelRadius = outerRadius + 20;
    const x = cx + labelRadius * Math.cos(centerAngle);
    const y = cy + labelRadius * Math.sin(centerAngle);
    
    return (
      <text
        x={x}
        y={y}
        fill="#64748b"
        fontSize="12"
        fontWeight="600"
        fontFamily="Inter, 'July Font', sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
        className="pointer-events-none"
      >
        {value}%
      </text>
    );
  };

  return (
    <Card className="bg-white border-slate-100 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-1.5">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Departmental Hotspot Heatmap
          </CardTitle>
          <TooltipProvider>
            <UITooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Info size={14} className="text-slate-400 hover:text-slate-600 cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-[250px] text-xs">
                <p>Shows the percentage of overdue items per department. Each radial bar represents a department, with colors indicating risk level: red (high), amber (medium), green (low). Hover over bars for detailed statistics.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 relative" tabIndex={-1} style={{ outline: 'none' }} role="img" aria-label="Departmental Hotspot Heatmap Chart">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="35%"
              outerRadius="85%"
              barSize={14}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <Tooltip 
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 9999, pointerEvents: 'auto' }}
              />
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                fill="#8884d8"
                label={renderLabel}
                animationBegin={0}
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center summary */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-xs font-medium text-slate-500 mb-1">Departments</p>
              <p className="text-2xl font-bold text-slate-900">{data.length}</p>
              <p className="text-[10px] text-slate-400 mt-1">
                {chartData.filter(d => d.status === 'high').length} high risk
              </p>
            </div>
          </div>
        </div>
        {/* Always visible legend below chart */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-4 border-t border-slate-100">
          {chartData.map((entry, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 px-2 py-1 rounded-md"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-xs font-semibold text-slate-800">
                {entry.name}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {entry.value}%
              </span>
              {entry.status === 'high' && (
                <AlertTriangle size={12} className="text-rose-500 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

