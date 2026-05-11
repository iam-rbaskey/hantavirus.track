'use client';
import { useState } from 'react';
import { useCountries } from '@/hooks/useCountries';
import Link from 'next/link';

export default function CountriesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCountries(page);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <header className="pb-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Countries Intelligence Explorer</h1>
        <p className="text-white/60 text-sm mt-2 uppercase tracking-widest">Global Heatmap & Outbreak Statistics</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center p-20 text-primary animate-pulse tracking-widest uppercase">Connecting to Database...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.data.map((c) => {
            const latestOutbreak = c.outbreaks[0] || { confirmedCases: 0, deaths: 0 };
            return (
              <Link key={c.code} href={`/country/${c.code}`} className="block p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition group">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{c.name}</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-black/50 rounded border border-white/5">{c.code}</span>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Cases</span>
                    <p className="font-bold text-warning text-xl">{latestOutbreak.confirmedCases}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest opacity-60">Deaths</span>
                    <p className="font-bold text-danger text-xl">{latestOutbreak.deaths}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Basic Pagination Controls */}
      {data?.meta && (
        <div className="flex justify-center gap-4 pt-8">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(p => p - 1)}
            className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition"
          >
            PREVIOUS
          </button>
          <span className="flex items-center px-4 font-mono">PAGE {page} OF {data.meta.totalPages}</span>
          <button 
            disabled={page === data.meta.totalPages} 
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 border border-white/20 rounded disabled:opacity-50 hover:bg-white/5 transition"
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
}
