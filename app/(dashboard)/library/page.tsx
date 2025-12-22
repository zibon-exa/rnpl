'use client';

import { useState, useMemo } from 'react';
import { initialFiles } from '@/lib/mock-data';
import { File } from '@/types/file';
import {
    FolderClosed,
    FolderOpen,
    Search,
    Filter,
    LayoutGrid,
    List as ListIcon,
    FileText,
    Clock,
    CheckCircle2,
    ArrowLeft,
    Calendar,
    User,
    History,
    AlertCircle,
    Landmark,
    Users,
    Server,
    Building2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileListTable } from '@/components/file-list-table';
import { useRouter } from 'next/navigation';


// Constants for Bengali to English mapping and Colors
const CATEGORY_MAP: Record<string, { label: string, color: string, icon: any }> = {
    'অর্থ': { label: 'Finance', color: 'bg-emerald-100 text-emerald-700', icon: Landmark },
    'মানবসম্পদ': { label: 'Human Resources', color: 'bg-blue-100 text-blue-700', icon: Users },
    'আইটি': { label: 'IT Department', color: 'bg-indigo-100 text-indigo-700', icon: Server },
    'প্রশাসন': { label: 'Administration', color: 'bg-amber-100 text-amber-700', icon: Building2 },
};

const DEFAULT_CATEGORY = { label: 'General', color: 'bg-slate-100 text-slate-700', icon: FolderClosed };

export default function LibraryPage() {
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Derived state for folders/categories
    const categories = useMemo(() => {
        const cats = new Set(initialFiles.map(f => f.category));
        return Array.from(cats);
    }, []);

    // Filtered files based on search and folder
    const filteredFiles = useMemo(() => {
        return initialFiles.filter(file => {
            const matchesFolder = currentFolder ? file.category === currentFolder : true;
            const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                file.id.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFolder && matchesSearch;
        });
    }, [currentFolder, searchQuery]);

    // Group files by category for the root view stats
    const folderStats = useMemo(() => {
        const stats: Record<string, number> = {};
        initialFiles.forEach(file => {
            stats[file.category] = (stats[file.category] || 0) + 1;
        });
        return stats;
    }, []);

    const handleOpenFile = (file: File) => {
        router.push(`/files/${file.id}`);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col p-6 space-y-6">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {!currentFolder && (
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Central Registry</h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Secure storage for all corporate records and audit trails.
                        </p>
                    </div>
                )}

                {/* Global Search & Filters */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                    {!currentFolder && (
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by Title, ID, or Tag..."
                                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-inter"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Breadcrumb / Navigation */}
            {currentFolder && (
                <div className="flex items-center gap-2 text-sm">
                    <button
                        onClick={() => setCurrentFolder(null)}
                        className="text-slate-500 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1"
                    >
                        <FolderOpen className="h-4 w-4" />
                        Registry Root
                    </button>
                    <span className="text-slate-400">/</span>
                    <span className="font-semibold text-slate-900">
                        {CATEGORY_MAP[currentFolder]?.label || currentFolder} Record Room
                    </span>
                </div>
            )}

            {/* Main Content Content */}
            <div className="flex-1">

                {/* VIEW 1: ROOT FOLDERS (If no search and no specific folder selected) */}
                {!currentFolder && !searchQuery ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => {
                            const meta = CATEGORY_MAP[category] || DEFAULT_CATEGORY;
                            return (
                                <Card
                                    key={category}
                                    className="group cursor-pointer border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                                    onClick={() => setCurrentFolder(category)}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${meta.color} mb-4 transition-transform group-hover:scale-110 duration-300`}>
                                                <meta.icon className="h-7 w-7" />
                                            </div>
                                            {/* Optional: Add a subtle arrow or indicator here if needed */}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {meta.label}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-slate-500">
                                                {folderStats[category] || 0} Files Stored
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
                                            <div className="bg-indigo-500 h-full rounded-full w-1/3 group-hover:w-2/3 transition-all duration-500 ease-out" />
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    /* VIEW 2: FILE LIST (Inside folder OR Searching) */
                    <div className="space-y-4">
                        <FileListTable
                            files={filteredFiles}
                            title={currentFolder ? `${CATEGORY_MAP[currentFolder]?.label || currentFolder} Documents` : 'Search Results'}
                            onOpenFile={handleOpenFile}
                        />
                    </div>
                )}
            </div>

        </div>
    );
}


