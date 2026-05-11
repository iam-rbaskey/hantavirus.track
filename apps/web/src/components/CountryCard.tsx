import Link from 'next/link';
import { type CountryOutbreak, getSeverity } from '@/types';
import { TrendingUp } from 'lucide-react';

interface Props {
  country: CountryOutbreak;
  rank?: number;
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', color: 'text-danger',  bg: 'bg-danger/10',  border: 'border-danger/20',  bar: 'bg-danger' },
  high:     { label: 'High',     color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', bar: 'bg-warning' },
  medium:   { label: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', bar: 'bg-amber-400' },
  low:      { label: 'Active',   color: 'text-white',   bg: 'bg-white/[0.05]', border: 'border-white/10', bar: 'bg-white/40' },
  none:     { label: 'Clear',    color: 'text-success', bg: 'bg-success/10',  border: 'border-success/20', bar: 'bg-success' },
};

export const CountryCard = ({ country, rank }: Props) => {
  const severity = getSeverity(country.cases);
  const cfg = SEVERITY_CONFIG[severity];
  const cfr = country.cases > 0 ? ((country.deaths / country.cases) * 100).toFixed(1) : '0.0';

  return (
    <Link
      href={`/country/${country.code}`}
      className="block rounded-2xl glass-card border border-white/[0.06] p-4 card-hover group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {rank && (
            <span className="text-text-muted text-xs font-mono w-5 shrink-0">#{rank}</span>
          )}
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate group-hover:text-text-secondary transition-colors">
              {country.country}
            </p>
            <p className="text-text-muted font-mono text-[11px]">{country.code}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${cfg.color} ${cfg.bg} ${cfg.border} shrink-0`}>
          {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Cases</p>
          <p suppressHydrationWarning className="text-warning font-bold text-lg mt-0.5">{country.cases.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-text-muted text-[10px] uppercase tracking-wider">Deaths</p>
          <p suppressHydrationWarning className="text-danger font-bold text-lg mt-0.5">{country.deaths.toLocaleString()}</p>
        </div>
      </div>

      {/* CFR bar */}
      <div>
        <div className="flex justify-between text-[10px] text-text-muted mb-1">
          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> CFR</span>
          <span className="font-mono">{cfr}%</span>
        </div>
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${cfg.bar}`}
            style={{ width: `${Math.min(parseFloat(cfr) * 5, 100)}%` }}
          />
        </div>
      </div>
    </Link>
  );
};
