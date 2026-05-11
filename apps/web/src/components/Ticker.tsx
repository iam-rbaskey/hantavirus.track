'use client';
import { useDashboard } from '@/hooks/useDashboard';
import { motion } from 'framer-motion';

export const NewsTicker = () => {
  const { data } = useDashboard();
  const news = data?.recentNews;
  if (!news || news.length === 0) return null;

  const items = [...news, ...news, ...news];

  return (
    <div className="w-full h-9 flex items-center overflow-hidden border-b border-white/[0.05] glass-dark relative shrink-0">
      {/* Breaking label */}
      <div className="absolute left-0 top-0 h-full flex items-center px-4 bg-danger/20 border-r border-danger/30 z-10 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-danger">Breaking</span>
        </div>
      </div>

      {/* Scrolling track */}
      <div className="flex-1 ml-28 overflow-hidden ticker-mask">
        <motion.div
          className="flex gap-10 items-center whitespace-nowrap"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-text-secondary hover:text-white transition-colors shrink-0"
            >
              <span className="text-danger/60 font-mono text-[10px]">●</span>
              <span className="truncate max-w-[400px]">{item.title}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
