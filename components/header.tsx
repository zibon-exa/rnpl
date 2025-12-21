'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useFiles } from '@/lib/files-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Search, Bell, Clock, CheckCircle, X, FileText, ArrowRight, AlertCircle, LayoutDashboard, Folder, Library, Archive, BarChart, HelpCircle, ChevronDown, Plus } from 'lucide-react';
import { Notification } from '@/types/file';
import { cn } from '@/lib/utils';
import { matchesSearch } from '@/lib/search-utils';
import { getAvatarPath, getInitials } from '@/lib/avatar-utils';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout } = useAuth();
  const { files } = useFiles();
  const pathname = usePathname();
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Search state
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtered files for global search
  const searchResults = useMemo(() => {
    if (!globalSearchTerm.trim()) return [];
    return files.filter(f =>
      matchesSearch(f.title, globalSearchTerm) ||
      matchesSearch(f.id, globalSearchTerm)
    ).slice(0, 5); // Limit to top 5 results
  }, [files, globalSearchTerm]);

  // Handle clicking outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (fileId: string) => {
    router.push(`/files/${fileId}`);
    setGlobalSearchTerm('');
    setIsSearchOpen(false);
  };

  // Generate notifications based on actual file data
  const notifications = useMemo<Notification[]>(() => {
    if (!user) return [];

    const notifs: Notification[] = [];
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    files.forEach((file) => {
      // Get the most recent history entry
      const latestHistory = file.history?.[0];
      if (!latestHistory) return;

      const historyDate = new Date(latestHistory.timestamp);

      // Only include notifications from the last 7 days
      if (historyDate < sevenDaysAgo) return;

      // Pending files requiring approval (for Admin/Approver)
      if (file.status === 'Pending' && file.isApproverAction && user.role === 'Admin') {
        notifs.push({
          id: `notif-pending-${file.id}`,
          type: 'Action',
          message: `Approval Request: ${file.title}`,
          subtext: `From: ${file.sender} • ${file.category}`,
          icon: <Clock size={16} className="text-amber-500" />,
          fileId: file.id,
          timestamp: historyDate,
        });
      }

      // Returned files (for the sender)
      if (file.status === 'Returned' && file.sender === user.name) {
        notifs.push({
          id: `notif-returned-${file.id}`,
          type: 'Attention',
          message: `Returned: ${file.title}`,
          subtext: file.returnComment || 'Review comments required',
          icon: <X size={16} className="text-rose-500" />,
          fileId: file.id,
          timestamp: historyDate,
        });
      }

      // Approved files (for the sender)
      if (file.status === 'Approved' && file.sender === user.name && latestHistory.event === 'Approved') {
        notifs.push({
          id: `notif-approved-${file.id}`,
          type: 'Success',
          message: `Approved: ${file.title}`,
          subtext: `Approved by: ${latestHistory.actor}`,
          icon: <CheckCircle size={16} className="text-emerald-500" />,
          fileId: file.id,
          timestamp: historyDate,
        });
      }

      // Forwarded files
      if (latestHistory.event === 'Forwarded' && latestHistory.actor !== user.name) {
        notifs.push({
          id: `notif-forwarded-${file.id}`,
          type: 'Info',
          message: `File Forwarded: ${file.title}`,
          subtext: `Forwarded by: ${latestHistory.actor}`,
          icon: <ArrowRight size={16} className="text-blue-500" />,
          fileId: file.id,
          timestamp: historyDate,
        });
      }

      // Urgent pending files (pending for more than 3 days)
      if (file.status === 'Pending' && file.isApproverAction) {
        const daysPending = Math.floor((now.getTime() - historyDate.getTime()) / (24 * 60 * 60 * 1000));
        if (daysPending >= 3 && user.role === 'Admin') {
          notifs.push({
            id: `notif-urgent-${file.id}`,
            type: 'Urgent',
            message: `Urgent: ${file.title}`,
            subtext: `Pending for ${daysPending} days • From: ${file.sender}`,
            icon: <AlertCircle size={16} className="text-rose-500" />,
            fileId: file.id,
            timestamp: historyDate,
          });
        }
      }
    });

    // Sort by timestamp (most recent first)
    return notifs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [files, user]);

  // Close notification popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  if (!user) return null;



  const formatNotificationTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };



  // Determine if a nav item is active based on pathname
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.includes(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto px-6 py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="RNPL Note Logo"
                width={45}
                height={14}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Menu - Centered */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className="gap-1">
                {/* Main Navigation Items */}
                {[
                  { label: 'Dashboard', href: '/dashboard', value: 'dashboard', icon: LayoutDashboard },
                  { label: 'Pending', href: '/pending', value: 'pending', icon: Clock },
                  { label: 'My Files', href: '/files', value: 'files', icon: Folder },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavigationMenuItem key={item.value}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                            'hover:bg-slate-100 hover:text-slate-900',
                            'focus:bg-slate-100 focus:text-slate-900 focus:outline-none',
                            isActive(item.href)
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-600'
                          )}
                        >
                          <Icon size={14} />
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}

                {/* More Dropdown */}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          'inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                          'hover:bg-slate-100 hover:text-slate-900 text-slate-600 focus:outline-none'
                        )}
                      >
                        <span>More</span>
                        <ChevronDown size={14} className="text-slate-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {[
                        { label: 'Library', href: '/library', value: 'library', icon: Library },
                        { label: 'Archive', href: '/archive', value: 'archive', icon: Archive },
                        { label: 'Reports', href: '/reports', value: 'reports', icon: BarChart },
                        { label: 'Help', href: '/help', value: 'help', icon: HelpCircle },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <DropdownMenuItem key={item.value} asChild>
                            <Link href={item.href} className="flex w-full cursor-pointer items-center gap-2">
                              <Icon size={14} className="text-slate-500" />
                              <span>{item.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Global Search Bar */}
          <div className="flex-shrink-0 w-72 mx-4 relative" ref={searchRef}>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search files..."
                value={globalSearchTerm}
                onChange={(e) => {
                  setGlobalSearchTerm(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 pl-10 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 focus:bg-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && globalSearchTerm && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Results</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-1">
                  {searchResults.length > 0 ? (
                    searchResults.map(file => (
                      <button
                        key={file.id}
                        onClick={() => handleSearchResultClick(file.id)}
                        className="w-full text-left p-2.5 hover:bg-slate-100 rounded-md flex flex-col gap-1 transition-colors group/item"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-medium text-slate-700 group-hover/item:text-slate-900 font-bangla">{file.title}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 group-hover/item:bg-white px-1.5 py-0.5 rounded border border-slate-200">{file.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                            <span>{file.sender}</span>
                          </div>
                          <span>•</span>
                          <span>{file.category}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-8 text-center text-slate-400 text-sm">
                      <p>No results found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions: New File, Notifications and User Profile */}
          <div className="flex items-center gap-2">
            {/* New File Button */}
            {pathname !== '/create' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size="icon"
                      className="h-10 w-10 mr-1 bg-[hsl(var(--color-brand))] hover:bg-[hsl(var(--color-brand-hover))] text-white shadow-sm transition-all active:scale-95 rounded-full"
                    >
                      <Link href="/create">
                        <Plus size={20} />
                        <span className="sr-only">New File</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Create New File</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="text-slate-500 hover:text-[hsl(var(--color-brand))] p-2 rounded-full hover:bg-[hsl(var(--color-brand))]/10 transition-all relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-4 w-96 max-h-[60vh] overflow-y-auto rounded-2xl shadow-xl bg-white ring-1 ring-black/5 z-50 origin-top-right notification-scrollbar">
                  <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Notifications</h3>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                        >
                          <div className="flex gap-3 items-start">
                            <div className="flex-shrink-0 bg-white p-1.5 rounded-full shadow-sm ring-1 ring-slate-100 h-fit">
                              {notif.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800 group-hover:text-[hsl(var(--color-brand))] transition-colors font-bangla">
                                {notif.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5 font-bangla">{notif.subtext}</p>
                              <p className="text-[10px] text-slate-400 mt-2 font-medium">
                                {formatNotificationTime(notif.timestamp)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 text-sm">No new updates</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative h-10 w-10 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-brand))]/20">
                  <Avatar className="h-10 w-10 ring-1 ring-slate-200">
                    <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                    <AvatarFallback className="bg-[hsl(196,60%,56%)] text-white">
                      {getInitials(user.nameEn)}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-slate-100">
                      <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                      <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-base">
                        {getInitials(user.nameEn)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium leading-none">{user.nameEn}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-[10px] leading-none text-muted-foreground font-medium uppercase tracking-wider text-[hsl(var(--color-brand))]">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                {user.role === 'Admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

