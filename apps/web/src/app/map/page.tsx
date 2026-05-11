'use client';
import { useCountries } from '@/hooks/useCountries';
import { CountryCard } from '@/components/CountryCard';
import { WorldMap } from '@/components/WorldMap';
import { PageLoader, ErrorState } from '@/components/ui/States';
import { useAppStore } from '@/store';
import { motion } from 'framer-motion';
import type { CountryOutbreak } from '@/types';

export default function MapPage() {
  const { data, isLoading, error } = useCountries();
  const { selectedCountryCode } = useAppStore();

  if (isLoading) return <PageLoader />;
  if (error)     return <ErrorState />;

  const allHotspots: CountryOutbreak[] = (data?.data ?? []).map((c) => ({
    country: c.name,
    code: c.code,
    cases:  c.outbreaks?.[0]?.confirmedCases ?? 0,
    deaths: c.outbreaks?.[0]?.deaths ?? 0,
  }));

  const active = allHotspots.filter((c) => c.cases > 0);

  const selected = selectedCountryCode
    ? allHotspots.find((c) => c.code === selectedCountryCode)
    : null;

  return (
    <div className="space-y-5 pb-10">
      <p className="text-text-secondary text-xs uppercase tracking-wider">
        {active.length} active hotspot{active.length !== 1 ? 's' : ''} · {allHotspots.length} countries tracked
      </p>

      {/* Full-screen map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border overflow-hidden"
        style={{ height: 'min(70vh, 580px)' }}
      >
        {/* WorldMap self-fetches all countries */}
        <WorldMap />
      </motion.div>

      {/* Selected country highlight */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-primary/30 bg-primary/5 p-5"
        >
          <p className="text-primary text-xs uppercase tracking-wider mb-3">Selected Country</p>
          <CountryCard country={selected} />
        </motion.div>
      )}

      {/* Active hotspots grid */}
      <div>
        <h2 className="text-white font-semibold text-sm mb-3">Active Hotspots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {active.map((c, i) => (
            <CountryCard key={c.code} country={c} rank={i + 1} />
          ))}
          {active.length === 0 && (
            <div className="col-span-full text-center py-12 text-text-muted text-sm">
              No active outbreaks detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
