"use client";

import { Search, Bell, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Topbar = () => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) + ' · ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-20 w-full px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl bg-bg-topbar/60 border-b border-border/50">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search outbreaks, regions, or alerts..." 
            className="w-full bg-bg-card/50 border border-border rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center text-xs font-medium text-text-secondary tracking-widest uppercase bg-bg-card/40 px-4 py-2 rounded-full border border-border/30">
          {dateStr || 'Loading date...'}
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-full bg-bg-card/50 border border-border hover:border-primary/30 transition-colors group">
            <Bell className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-danger rounded-full shadow-[0_0_8px_rgba(255,77,77,0.8)]" />
          </button>
          
          <button className="h-9 w-9 rounded-full bg-bg-card border border-border flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors">
            <User className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
};
