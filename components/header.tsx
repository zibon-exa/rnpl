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
import { RainbowButton } from '@/components/ui/rainbow-button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Search, Bell, Clock, CheckCircle, X, FileText, ArrowRight, AlertCircle, LayoutDashboard, Folder, Library, Archive, BarChart, HelpCircle, ChevronDown, Plus, Menu, Trash2 } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', value: 'dashboard', icon: LayoutDashboard },
    { label: 'Pending', href: '/pending', value: 'pending', icon: Clock },
    { label: 'My Files', href: '/files', value: 'files', icon: Folder },
  ];

  const moreItems = [
    { label: 'Library', href: '/library', value: 'library', icon: Library },
    { label: 'Archive', href: '/archive', value: 'archive', icon: Archive },
    { label: 'Recycle Bin', href: '/recycle-bin', value: 'recycle-bin', icon: Trash2 },
    { label: 'Reports', href: '/reports', value: 'reports', icon: BarChart },
    { label: 'Help', href: '/help', value: 'help', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section: Mobile Menu & Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-md text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu size={24} />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="RNPL Note Logo"
                width={40}
                height={12}
                className="h-7 md:h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center Section: Navigation Menu (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navItems.map((item) => {
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
                      {moreItems.map((item) => {
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

          {/* Right Section: Search & Actions */}
          <div className="flex items-center gap-1 md:gap-3 flex-1 lg:flex-none justify-end">
            {/* Mobile Search Overlay */}
            {isMobileSearchOpen && (
              <div className="absolute inset-0 bg-white z-50 flex items-center px-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="relative w-full flex items-center gap-2">
                  <Search className="absolute left-3 text-slate-400" size={18} />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    value={globalSearchTerm}
                    onChange={(e) => {
                      setGlobalSearchTerm(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    className="flex-1 h-10 w-full rounded-full border border-slate-200 bg-slate-50 px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => {
                      setIsMobileSearchOpen(false);
                      setGlobalSearchTerm('');
                    }}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                  >
                    <X size={20} />
                  </button>

                  {/* Mobile Search Results */}
                  {globalSearchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[100] max-h-[60vh] overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map(file => (
                          <button
                            key={file.id}
                            onClick={() => {
                              handleSearchResultClick(file.id);
                              setIsMobileSearchOpen(false);
                            }}
                            className="w-full text-left p-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex flex-col gap-1"
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm font-semibold text-slate-700 font-bangla truncate pr-2">{file.title}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span>{file.sender}</span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="py-4 text-center text-slate-400 text-sm">No results</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Search Bar - Hidden on very small screens, responsive on others */}
            <div className="hidden sm:block relative w-full max-w-[200px] md:max-w-xs" ref={searchRef}>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[hsl(var(--color-brand))] transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={globalSearchTerm}
                  onChange={(e) => {
                    setGlobalSearchTerm(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex h-10 w-full rounded-full border border-slate-200 bg-white px-3 py-2 pl-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 focus:bg-white transition-all"
                />
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && globalSearchTerm && (
                <div className="absolute top-full right-0 left-0 sm:left-auto sm:w-80 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-slate-50 bg-slate-50/50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Search Results</span>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-1">
                    {searchResults.length > 0 ? (
                      searchResults.map(file => (
                        <button
                          key={file.id}
                          onClick={() => handleSearchResultClick(file.id)}
                          className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex flex-col gap-1 transition-colors group/item"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-semibold text-slate-700 group-hover/item:text-[hsl(var(--color-brand))] font-bangla truncate pr-2">{file.title}</span>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">{file.id}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span>{file.sender}</span>
                            <span className="text-slate-300">•</span>
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

            {/* Actions: Mobile Search Icon, New File, Notifications, Profile */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Mobile Search Trigger */}
              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <Search size={20} />
              </button>

              {/* Notification Bell */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="text-slate-600 hover:text-[hsl(var(--color-brand))] p-2 rounded-full hover:bg-slate-100 transition-all relative"
                >
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                  )}
                </button>
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-4 w-[calc(100vw-2rem)] sm:w-96 max-h-[60vh] overflow-y-auto rounded-2xl shadow-2xl bg-white ring-1 ring-black/5 z-50 origin-top-right">
                    <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                            onClick={() => {
                              handleSearchResultClick(notif.fileId);
                              setIsNotificationOpen(false);
                            }}
                          >
                            <div className="flex gap-3 items-start">
                              <div className="flex-shrink-0 bg-white p-2 rounded-xl shadow-sm border border-slate-100 h-fit">
                                {notif.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 group-hover:text-[hsl(var(--color-brand))] transition-colors font-bangla line-clamp-1">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 font-bangla line-clamp-1">{notif.subtext}</p>
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
                  <button className="relative h-9 w-9 md:h-10 md:w-10 rounded-full hover:ring-2 hover:ring-[hsl(var(--color-brand))]/20 transition-all focus:outline-none">
                    <Avatar className="h-full w-full border border-slate-200">
                      <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                      <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs md:text-sm">
                        {getInitials(user.nameEn)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2 mt-2" align="end">
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-slate-50">
                        <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                        <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white">
                          {getInitials(user.nameEn)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-800">{user.nameEn}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <div className="mt-1">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-[hsl(var(--color-brand))]/10 text-[hsl(var(--color-brand))] rounded uppercase tracking-tighter">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center gap-2 p-2 cursor-pointer">
                      <LayoutDashboard size={14} className="text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user.role === 'Admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2 p-2 cursor-pointer">
                        <BarChart size={14} className="text-slate-400" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="p-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="w-px h-6 bg-slate-200 mx-1 md:mx-2"></div>

              {/* New File Button */}
              {pathname !== '/create' && (
                <RainbowButton
                  asChild
                  size="default"
                  className="h-9 md:h-10 rounded-full shadow-sm px-3 md:px-4 gap-2"
                >
                  <Link href="/create" className="flex items-center gap-2">
                    <Plus size={18} className="md:size-5" />
                    <span className="text-xs md:text-sm font-medium">New File</span>
                  </Link>
                </RainbowButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm md:hidden animate-in fade-in duration-300">
          <div
            className="absolute inset-0"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="RNPL Note Logo"
                  width={40}
                  height={12}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Main Menu</p>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.value}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all',
                      isActive(item.href)
                        ? 'bg-[hsl(var(--color-brand))]/10 text-[hsl(var(--color-brand))]'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}

              <div className="my-6 border-t border-slate-100 pt-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">More</p>
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.value}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all',
                        isActive(item.href)
                          ? 'bg-[hsl(var(--color-brand))]/10 text-[hsl(var(--color-brand))]'
                          : 'text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl mb-4">
                <Avatar className="h-10 w-10 border border-white shadow-sm">
                  <AvatarImage src={getAvatarPath(user.nameEn, user.avatarId)} alt={user.nameEn} />
                  <AvatarFallback className="bg-[hsl(var(--color-brand))] text-white text-xs">
                    {getInitials(user.nameEn)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{user.nameEn}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

