'use client';

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import {
    Download, Calendar, ExternalLink, Timer, Leaf, TrendingUp, FileText, Construction
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Modal } from '@/components/ui/modal';
import { KpiSparklineCard } from '@/components/kpi-sparkline-card';
import {
    reportKpiData,
    departmentPerformance,
    impactSummary
} from '@/lib/reports-data';
import { useFiles } from '@/lib/files-context';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const { files } = useFiles();

    // Derive bottleneck files from existing files context
    const bottleneckFiles = useMemo(() => {
        const today = new Date();
        return files
            .filter(f => f.status === 'Pending' || f.status === 'Returned')
            .map(f => {
                const lastUpdatedDate = new Date(f.lastUpdated);
                const daysStuck = Math.floor((today.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60 * 24));
                return { ...f, daysStuck };
            })
            .sort((a, b) => b.daysStuck - a.daysStuck)
            .slice(0, 4);
    }, [files]);

    const handleDrillDown = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <main className="max-w-7xl mx-auto py-8 px-4 md:px-6 space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
                        <p className="text-slate-500 mt-1 text-sm">
                            Strategic performance overview for RNPL.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-9 bg-white border-slate-200 gap-2 text-xs">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            Last 30 Days
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 bg-white border-slate-200 gap-2 text-xs"
                            onClick={() => handleDrillDown('Export Report')}
                        >
                            <Download className="h-4 w-4 text-slate-500" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* KPI Strip - Reusing KpiSparklineCard */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    {reportKpiData.map((kpi, index) => (
                        <KpiSparklineCard key={index} data={kpi} />
                    ))}
                </div>

                {/* Main Insights Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">

                    {/* Left: Bottlenecks Table */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-base font-bold">Active Bottlenecks</CardTitle>
                                    <CardDescription>Files stuck the longest this week.</CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-indigo-600 font-bold hover:bg-indigo-50"
                                    onClick={() => handleDrillDown('Full Bottleneck Analysis')}
                                >
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/80">
                                    <TableRow>
                                        <TableHead className="text-[10px] uppercase font-bold">File</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold hidden md:table-cell">Stage</TableHead>
                                        <TableHead className="text-[10px] uppercase font-bold text-right">Days Stuck</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bottleneckFiles.map((file) => (
                                        <TableRow
                                            key={file.id}
                                            className="cursor-pointer hover:bg-slate-50"
                                            onClick={() => handleDrillDown(`Details for ${file.id}`)}
                                        >
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm text-slate-900 line-clamp-1">{file.title}</span>
                                                    <span className="text-xs text-slate-500">{file.sender} • {file.category}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full font-medium border",
                                                    file.status === 'Returned' ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-amber-50 text-amber-700 border-amber-100"
                                                )}>
                                                    {file.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <span className={cn(
                                                    "text-sm font-bold",
                                                    file.daysStuck > 10 ? "text-rose-600" : "text-amber-600"
                                                )}>
                                                    {file.daysStuck}d
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Right: Department Performance Chart */}
                    <Card className="border-slate-100 shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-base font-bold">Workflow Health</CardTitle>
                                    <CardDescription>Avg. cycle time by department (days).</CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-indigo-600 font-bold hover:bg-indigo-50"
                                    onClick={() => handleDrillDown('Department Deep Dive')}
                                >
                                    Details
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-64 pt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={departmentPerformance} layout="vertical" margin={{ left: -10, right: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" axisLine={false} tickLine={false} fontSize={10} domain={[0, 6]} />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={11} width={55} />
                                    <RechartsTooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`${value} days`, 'Avg Cycle']}
                                    />
                                    <Bar dataKey="avgDays" radius={[0, 6, 6, 0]} barSize={20} fill="#6366f1" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Impact Summary Strip */}
                <Card className="border-slate-100 shadow-sm bg-gradient-to-r from-slate-50 to-indigo-50/30">
                    <CardContent className="py-4 px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900">Digital Transformation Impact</h3>
                                    <p className="text-xs text-slate-500">Cumulative savings since system adoption.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 md:gap-10">
                                <div className="flex items-center gap-3 text-center md:text-left">
                                    <Timer className="h-5 w-5 text-slate-400 hidden md:block" />
                                    <div>
                                        <span className="text-xl font-bold text-slate-900">{impactSummary.manHoursSaved.toLocaleString()}</span>
                                        <p className="text-[10px] text-slate-500 uppercase font-medium">Man-Hours Saved</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-slate-200 hidden md:block" />
                                <div className="flex items-center gap-3 text-center md:text-left">
                                    <Leaf className="h-5 w-5 text-emerald-500 hidden md:block" />
                                    <div>
                                        <span className="text-xl font-bold text-slate-900">{impactSummary.papersSaved.toLocaleString()}</span>
                                        <p className="text-[10px] text-slate-500 uppercase font-medium">Papers Saved</p>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs gap-1.5 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                onClick={() => handleDrillDown('Full Impact Report')}
                            >
                                Full Impact Report <ExternalLink className="h-3 w-3" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Generate Report CTA */}
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 text-sm border-dashed border-slate-300 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50"
                        onClick={() => handleDrillDown('Custom Report Builder')}
                    >
                        <FileText className="h-4 w-4" />
                        Generate Custom Report
                    </Button>
                </div>

            </main>

            {/* Under Construction Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
            >
                <div className="flex flex-col items-center text-center py-6">
                    <div className="h-16 w-16 rounded-full bg-amber-50 flex items-center justify-center mb-4 text-amber-500">
                        <Construction className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Under Development</h3>
                    <p className="text-sm text-slate-500 max-w-xs">
                        The <strong>"{modalTitle}"</strong> feature is currently being built. Check back soon!
                    </p>
                    <Button
                        className="mt-6"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Got it
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
