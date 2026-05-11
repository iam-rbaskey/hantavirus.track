"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/countries', label: 'Countries' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/news', label: 'Intelligence Feed' },
  ];

  return (
    <nav className="border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="h-6 w-6 rounded border-2 border-primary flex items-center justify-center">
             <div className="h-2 w-2 bg-danger rounded-full animate-pulse" />
          </div>
          <span className="text-white">HANTA</span><span className="text-primary font-light">TRACK</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`transition-colors ${pathname === link.href ? 'text-primary' : 'text-white/60 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
