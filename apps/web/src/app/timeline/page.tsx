'use client';
import { useState } from 'react';
import { useTimeline } from '@/hooks/useTimeline';

export default function TimelinePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTimeline(page);

  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6">
      <header className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Epidemiological Timeline</h1>
        <p className="text-white/60 text-sm mt-2 uppercase tracking-widest">Historical Outbreak Events & Global Spread</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center p-20 text-primary animate-pulse tracking-widest uppercase">Loading Timeline...</div>
      ) : (
        <div className="relative border-l border-white/20 ml-4 md:ml-6 mt-8 space-y-12">
          {data?.data.map((event) => (
            <div key={event.id} className="relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute left-[-5px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                 <span className="text-sm font-bold text-primary font-mono bg-primary/10 px-3 py-1 rounded inline-block w-max">
                   {new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                 </span>
                 <span className="text-xs text-white/40 uppercase tracking-widest">{event.source.name}</span>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">{event.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Basic Pagination Controls */}
      {data?.meta && (
        <div className="flex justify-center gap-4 pt-12">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition">PREVIOUS</button>
          <span className="flex items-center px-4 font-mono">PAGE {page} OF {data.meta.totalPages}</span>
          <button disabled={page === data.meta.totalPages} onClick={() => setPage(p => p + 1)} className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition">NEXT</button>
        </div>
      )}
    </div>
  );
}
