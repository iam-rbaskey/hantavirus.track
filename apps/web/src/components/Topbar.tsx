'use client';
import { Bell, Search, Menu } from 'lucide-react';
import { useAppStore } from '@/store';
import { useSocket } from '@/providers/SocketProvider';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
  '/':          'Global Dashboard',
  '/map':       'Outbreak Map',
  '/countries': 'Countries',
  '/news':      'Intelligence Feed',
  '/timeline':  'Event Timeline',
};

export const Topbar = () => {
  const { setNavOpen } = useAppStore();
  const { isConnected } = useSocket();
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? 'HantaTrack';

  return (
    <header className="h-16 w-full px-4 md:px-6 flex items-center gap-4 sticky top-0 z-40
                       glass-dark border-b border-white/[0.05] shrink-0">
      {/* Mobile menu */}
      <button
        onClick={() => setNavOpen(true)}
        className="md:hidden p-2 -ml-1 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-white font-semibold text-base truncate">{title}</h1>
      </div>

      {/* Search (desktop) */}
      <div className="hidden sm:flex items-center gap-2 glass border-white/[0.07] rounded-xl px-3 py-2 w-56 lg:w-72 focus-within:border-white/20 transition-all">
        <Search className="w-3.5 h-3.5 text-text-muted shrink-0" />
        <input
          type="text"
          placeholder="Search outbreaks..."
          className="bg-transparent text-sm text-white placeholder:text-text-muted outline-none flex-1 min-w-0"
        />
      </div>

      {/* Connection badge */}
      <div className={`hidden sm:flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1.5 rounded-lg border glass-sm ${
        isConnected
          ? 'text-success border-success/20'
          : 'text-text-muted border-white/[0.05]'
      }`}>
        <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-text-muted'}`} />
        {isConnected ? 'Live' : 'Offline'}
      </div>

      {/* Bell */}
      <button className="relative p-2 text-text-secondary hover:text-white transition-colors rounded-xl hover:bg-white/[0.05] glass-sm">
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
      </button>
    </header>
  );
};
