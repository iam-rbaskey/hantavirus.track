'use client';
import { use } from 'react';
import { useCountry } from '@/hooks/useCountries';
import { PageLoader, ErrorState } from '@/components/ui/States';
import { getSeverity } from '@/types';
import { ArrowLeft, Biohazard, Activity, Calendar } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SEVERITY_CONFIG = {
  critical: { label: 'Critical',  color: 'text-danger',    bg: 'bg-danger/10',   border: 'border-danger/25' },
  high:     { label: 'High',      color: 'text-warning',   bg: 'bg-warning/10',  border: 'border-warning/25' },
  medium:   { label: 'Moderate',  color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/25' },
  low:      { label: 'Active',    color: 'text-white',     bg: 'bg-white/[0.05]', border: 'border-white/15' },
  none:     { label: 'No Cases',  color: 'text-success',   bg: 'bg-success/10',  border: 'border-success/25' },
};

export default function CountryDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { data: country, isLoading, error } = useCountry(code.toUpperCase());

  if (isLoading) return <PageLoader />;
  if (error || !country) return <ErrorState message={`No data found for country: ${code.toUpperCase()}`} />;

  const latestOutbreak = country.outbreaks?.[0];
  const totalCases  = latestOutbreak?.confirmedCases ?? 0;
  const totalDeaths = latestOutbreak?.deaths ?? 0;
  const severity    = getSeverity(totalCases);
  const cfg         = SEVERITY_CONFIG[severity];
  const cfr = totalCases > 0 ? ((totalDeaths / totalCases) * 100).toFixed(1) : '0.0';

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-10">
      {/* Back */}
      <Link href="/countries" className="inline-flex items-center gap-2 text-text-secondary hover:text-white text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Countries
      </Link>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl glass-card border ${cfg.border} p-6`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{country.region ?? 'Global'}</p>
            <h1 className="text-white text-2xl font-black">{country.name}</h1>
            <p className="text-text-muted font-mono text-sm mt-0.5">{country.code}</p>
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
            {cfg.label}
          </span>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Confirmed', value: totalCases,  color: 'text-warning', icon: <Activity className="w-4 h-4" /> },
          { label: 'Deaths',    value: totalDeaths,  color: 'text-danger',  icon: <Biohazard className="w-4 h-4" /> },
          { label: 'CFR',       value: `${cfr}%`,    color: 'text-text-secondary', icon: <Calendar className="w-4 h-4" /> },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl glass-card border border-white/[0.07] p-4 text-center"
          >
            <div className="flex justify-center mb-2 text-text-muted">{m.icon}</div>
            <p suppressHydrationWarning className={`text-2xl font-black ${m.color}`}>
              {typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
            </p>
            <p className="text-text-muted text-[10px] uppercase tracking-wider mt-1">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Outbreak history */}
      {country.outbreaks && country.outbreaks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl glass-card border border-white/[0.07] overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-white/[0.05]">
            <h2 className="text-white font-semibold text-sm">Outbreak History</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {country.outbreaks.map((ob) => (
              <div key={ob.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <span suppressHydrationWarning className="text-text-muted text-xs font-mono">
                    {new Date(ob.reportedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <p className={`text-xs mt-0.5 uppercase font-bold tracking-wider ${ob.status === 'ACTIVE' ? 'text-warning' : 'text-success'}`}>
                    {ob.status}
                  </p>
                </div>
                <div className="flex gap-6 text-right">
                  <div>
                    <p className="text-[10px] text-text-muted">Cases</p>
                    <p suppressHydrationWarning className="text-warning font-bold text-sm">{ob.confirmedCases.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted">Deaths</p>
                    <p suppressHydrationWarning className="text-danger font-bold text-sm">{ob.deaths.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
