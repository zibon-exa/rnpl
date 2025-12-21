'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export function GlobalCreateButton() {
    const pathname = usePathname();

    // Don't show on the create page itself to avoid redundancy/confusion
    if (pathname === '/create') return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/create">
                            <Button
                                size="icon"
                                className={cn(
                                    "h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
                                    "bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand))]/90 text-white",
                                    "hover:scale-110 active:scale-95 border-2 border-white/20"
                                )}
                            >
                                <Plus className="h-8 w-8" />
                                <span className="sr-only">Create New File</span>
                            </Button>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="px-3 py-1.5 text-xs font-medium">
                        Create New File
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
