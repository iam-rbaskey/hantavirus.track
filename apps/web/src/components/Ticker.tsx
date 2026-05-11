'use client';
import { useDashboard } from '@/hooks/useDashboard';
import { motion } from 'framer-motion';

export const NewsTicker = () => {
  const { data } = useDashboard();
  
  if (!data?.recentNews || data.recentNews.length === 0) return null;

  return (
    <div className="w-full bg-bg-secondary/80 backdrop-blur-md text-white py-2 overflow-hidden flex items-center border-b border-border/50 relative z-40">
       <span className="bg-bg-secondary px-6 font-bold uppercase tracking-widest text-xs z-10 h-full absolute left-0 flex items-center border-r border-border/50 text-danger shadow-[10px_0_20px_rgba(11,11,15,0.9)]">
         <div className="h-1.5 w-1.5 bg-danger rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(255,77,77,0.8)]" />
         ALERT
       </span>
       <div className="whitespace-nowrap flex pl-32 w-full overflow-hidden mask-image-fade">
         <motion.div
           animate={{ x: [0, -2000] }}
           transition={{ ease: "linear", duration: 40, repeat: Infinity }}
           className="flex gap-12"
         >
           {data.recentNews.map((news, i) => (
             <span key={i} className="text-xs font-medium tracking-wide">
               <span className="text-primary/70 mr-2 uppercase tracking-widest font-mono text-[10px] border border-primary/20 px-1.5 py-0.5 rounded bg-primary/5">{news.source}</span>
               <span className="text-white/80">{news.title}</span>
             </span>
           ))}
           {data.recentNews.map((news, i) => (
             <span key={`dup-${i}`} className="text-xs font-medium tracking-wide">
               <span className="text-primary/70 mr-2 uppercase tracking-widest font-mono text-[10px] border border-primary/20 px-1.5 py-0.5 rounded bg-primary/5">{news.source}</span>
               <span className="text-white/80">{news.title}</span>
             </span>
           ))}
         </motion.div>
       </div>
    </div>
  );
};
