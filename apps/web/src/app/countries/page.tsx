'use client';
import { useCountries } from '@/hooks/useCountries';
import { CountryCard } from '@/components/CountryCard';
import { PageLoader, ErrorState, EmptyState } from '@/components/ui/States';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';
import type { CountryOutbreak } from '@/types';

export default function CountriesPage() {
  const { data, isLoading, error } = useCountries();
  const [search, setSearch] = useState('');

  if (isLoading) return <PageLoader />;
  if (error)     return <ErrorState />;

  const countries = data?.data ?? [];

  const hotspots: CountryOutbreak[] = countries.map((c) => ({
    country: c.name,
    code: c.code,
    cases:  c.outbreaks?.[0]?.confirmedCases ?? 0,
    deaths: c.outbreaks?.[0]?.deaths ?? 0,
  }));

  const filtered = hotspots.filter(
    (c) => c.country.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => b.cases - a.cases);

  return (
    <div className="space-y-5 pb-10">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by country or code..."
          className="w-full glass border border-white/[0.07] rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-white/20 transition-colors"
        />
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span>{sorted.length} countries tracked</span>
        <span className="text-text-muted/30">·</span>
        <span>{sorted.filter(c => c.cases > 0).length} with active cases</span>
      </div>

      {/* Country grid */}
      {sorted.length === 0 ? (
        <EmptyState label="No countries match your search" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {sorted.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.4) }}
            >
              <CountryCard country={c} rank={i + 1} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
