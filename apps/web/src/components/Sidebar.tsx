"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Activity, Map, Clock, Newspaper, BarChart2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Outbreaks', icon: Activity, href: '/outbreaks' },
  { name: 'Countries', icon: Map, href: '/countries' },
  { name: 'Timeline', icon: Clock, href: '/timeline' },
  { name: 'News', icon: Newspaper, href: '/news' },
  { name: 'Analytics', icon: BarChart2, href: '/analytics' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-sidebar/80 backdrop-blur-2xl border-r border-border z-50 flex flex-col transition-all duration-300">
      <div className="h-20 flex items-center px-6 border-b border-border/50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-8 w-8 rounded-lg border border-primary/30 flex items-center justify-center bg-primary/10 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            <div className="h-2 w-2 bg-primary rounded-full shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none tracking-tight">HANTA</span>
            <span className="text-primary font-medium text-xs tracking-widest uppercase">Intelligence</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'text-white' : 'text-text-secondary hover:text-white'}`}>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]' : 'group-hover:text-white'}`} strokeWidth={1.5} />
                <span className="relative z-10 font-medium text-sm tracking-wide">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="p-4 rounded-xl bg-bg-card border border-border flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(61,220,151,0.6)] animate-pulse" />
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">System Online</span>
        </div>
      </div>
    </aside>
  );
};
