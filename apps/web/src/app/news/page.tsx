'use client';
import { useState } from 'react';
import { useNews } from '@/hooks/useNews';

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNews(page);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <header className="pb-6 border-b border-white/10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Intelligence Feed</h1>
          <p className="text-white/60 text-sm mt-2 uppercase tracking-widest">Real-Time Outbreak Reports</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
           </span>
           <span className="text-xs text-primary font-bold uppercase tracking-widest">Live Updates</span>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center p-20 text-primary animate-pulse tracking-widest uppercase">Fetching Intelligence...</div>
      ) : (
        <div className="space-y-4">
          {data?.data.map((article) => (
            <a key={article.id} href={article.url} target="_blank" rel="noreferrer" className="block p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition group">
              <div className="flex items-center gap-4 mb-3">
                 <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${article.severity === 'WARNING' ? 'bg-warning/20 text-warning' : article.severity === 'CRITICAL' ? 'bg-danger/20 text-danger' : 'bg-primary/20 text-primary'}`}>
                   {article.severity || 'INFO'}
                 </span>
                 <span className="text-xs text-white/50 font-mono">{new Date(article.publishedAt).toLocaleString()}</span>
                 <span className="text-xs text-white/50 font-mono ml-auto">{article.source.name}</span>
              </div>
              <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">{article.title}</h2>
              <p className="text-white/70 mt-3 text-sm leading-relaxed">{article.summary}</p>
            </a>
          ))}
        </div>
      )}

      {/* Basic Pagination Controls */}
      {data?.meta && (
        <div className="flex justify-center gap-4 pt-8">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition">PREVIOUS</button>
          <span className="flex items-center px-4 font-mono">PAGE {page} OF {data.meta.totalPages}</span>
          <button disabled={page === data.meta.totalPages} onClick={() => setPage(p => p + 1)} className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition">NEXT</button>
        </div>
      )}
    </div>
  );
}
