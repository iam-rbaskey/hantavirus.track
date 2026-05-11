'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Globe, Newspaper, Clock, X } from 'lucide-react';
import { useAppStore } from '@/store';
import { useSocket } from '@/providers/SocketProvider';

const NAV_ITEMS = [
  { href: '/',          label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/map',       label: 'Outbreak Map', icon: Map },
  { href: '/countries', label: 'Countries',    icon: Globe },
  { href: '/news',      label: 'Intelligence', icon: Newspaper },
  { href: '/timeline',  label: 'Timeline',     icon: Clock },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p className="text-text-muted text-[10px] uppercase tracking-widest px-3 mb-3 font-semibold">Monitor</p>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
              active
                ? 'bg-white/[0.06] text-white border border-white/10'
                : 'text-text-secondary hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-white' : 'text-text-muted group-hover:text-text-secondary'}`} />
            {label}
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/60" />}
          </Link>
        );
      })}
    </nav>
  );
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 rounded-lg glass border border-white/10 flex items-center justify-center">
        <span className="text-white text-sm font-black">H</span>
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-danger animate-glow-danger" />
      </div>
      <div>
        <p className="text-white font-bold text-sm leading-none">HantaTrack</p>
        <p className="text-text-muted text-[10px] uppercase tracking-wider mt-0.5">Global Intelligence</p>
      </div>
    </div>
  );
}

function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  return (
    <div className="px-5 py-4 border-t border-white/[0.05] shrink-0">
      <div className="flex items-center gap-2.5">
        <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-text-muted'}`} />
        <span className="text-xs text-text-secondary">{isConnected ? 'Realtime Active' : 'Connecting...'}</span>
      </div>
    </div>
  );
}

export const Sidebar = () => {
  const { isConnected } = useSocket();

  return (
    <aside className="fixed top-0 left-0 h-full w-64 glass-dark border-r border-white/[0.05] flex flex-col z-50">
      <div className="h-16 px-5 flex items-center border-b border-white/[0.05] shrink-0">
        <BrandLogo />
      </div>
      <NavLinks />
      <ConnectionStatus isConnected={isConnected} />
    </aside>
  );
};

export const MobileNav = () => {
  const { isNavOpen, setNavOpen } = useAppStore();
  const { isConnected } = useSocket();

  if (!isNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setNavOpen(false)} />
      <aside className="relative w-72 max-w-[85vw] h-full glass-dark border-r border-white/[0.05] flex flex-col animate-in slide-in-from-left duration-200">
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.05] shrink-0">
          <BrandLogo />
          <button onClick={() => setNavOpen(false)} className="p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <NavLinks onClick={() => setNavOpen(false)} />
        <ConnectionStatus isConnected={isConnected} />
      </aside>
    </div>
  );
};
