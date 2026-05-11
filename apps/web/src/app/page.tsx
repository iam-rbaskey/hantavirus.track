'use client';
import { Activity, Biohazard, Globe, Wifi } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import { useSocket } from '@/providers/SocketProvider';
import { MetricCard } from '@/components/MetricCard';
import { WorldMap } from '@/components/WorldMap';
import { PageLoader, ErrorState } from '@/components/ui/States';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

const SectionHeader = ({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) => (
  <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
    <h2 className="text-white font-semibold text-sm">{children}</h2>
    {right}
  </div>
);

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  const { isConnected } = useSocket();

  if (isLoading) return <PageLoader />;
  if (error)     return <ErrorState message="Could not reach the intelligence backend." />;

  const g            = data?.global;
  const topCountries = data?.topCountries ?? [];
  const recentNews   = data?.recentNews ?? [];

  return (
    <div className="space-y-5 pb-10">

      {/* ── Metric cards ─────────────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { title: 'Confirmed Cases',    value: g?.totalCases ?? 0,       color: 'warning' as const, icon: <Activity className="w-4 h-4" /> },
          { title: 'Total Deaths',       value: g?.totalDeaths ?? 0,      color: 'danger' as const,  icon: <Biohazard className="w-4 h-4" /> },
          { title: 'Affected Countries', value: g?.affectedCountries ?? 0, color: 'accent' as const,  icon: <Globe className="w-4 h-4" /> },
          {
            title: 'System Status',
            value: isConnected ? 'LIVE' : 'OFFLINE',
            color: isConnected ? 'success' as const : 'danger' as const,
            icon: <Wifi className="w-4 h-4" />,
            trend: g?.reportedAt ? `Updated ${new Date(g.reportedAt).toLocaleTimeString()}` : undefined,
          },
        ].map((m, i) => (
          <motion.div key={m.title} custom={i} initial="hidden" animate="show" variants={fadeUp}>
            <MetricCard {...m} />
          </motion.div>
        ))}
      </section>

      {/* ── Full-width outbreak map ──────────────────────────── */}
      <motion.section
        className="rounded-2xl glass-card border border-white/[0.07] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SectionHeader
          right={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-warning" />
                <span className="text-[10px] text-text-muted">Cases</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-danger" />
                <span className="text-[10px] text-text-muted">Deaths</span>
              </div>
              <span className="text-[10px] font-mono text-text-muted border border-white/[0.06] rounded-lg px-2 py-0.5 glass-sm uppercase tracking-wider">
                All Countries
              </span>
            </div>
          }
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            Global Outbreak Intelligence Map
          </span>
        </SectionHeader>

        <div className="h-[340px] md:h-[500px] lg:h-[560px]">
          <WorldMap />
        </div>
      </motion.section>

      {/* ── Intelligence Feed + Severity Index ──────────────── */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5">

        {/* Live Intelligence Feed */}
        <motion.div
          className="xl:col-span-2 rounded-2xl glass-card border border-white/[0.07] overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionHeader
            right={
              <span className="text-[10px] px-2 py-0.5 rounded-lg glass-sm border border-white/[0.06] text-text-muted uppercase tracking-wider">
                Auto-sync
              </span>
            }
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              Live Intelligence
            </span>
          </SectionHeader>

          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04] max-h-[360px]">
            {recentNews.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">No recent intelligence</div>
            ) : recentNews.map((n, i) => (
              <motion.a
                key={i}
                href={n.url}
                target="_blank"
                rel="noreferrer"
                custom={i}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="block px-5 py-4 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10 bg-white/[0.03] px-2 py-0.5 rounded-lg truncate max-w-[70%]">
                    {n.source}
                  </span>
                  <span suppressHydrationWarning className="text-[10px] text-text-muted font-mono shrink-0">
                    {new Date(n.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-secondary group-hover:text-white transition-colors leading-relaxed line-clamp-2">
                  {n.title}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Severity Index */}
        <motion.div
          className="rounded-2xl glass-card border border-white/[0.07] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionHeader>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              Severity Index
            </span>
          </SectionHeader>
          <div className="divide-y divide-white/[0.04] overflow-y-auto max-h-[360px]">
            {topCountries.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">No outbreak data</div>
            ) : topCountries.map((c, i) => {
              const cfr = c.cases > 0 ? ((c.deaths / c.cases) * 100).toFixed(1) : '—';
              return (
                <div key={i} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/[0.02] transition-colors">
                  <span className="text-text-muted font-mono text-xs w-4 shrink-0">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{c.country}</p>
                    <p className="text-text-muted font-mono text-[10px]">{c.code}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5 shrink-0">
                    <span suppressHydrationWarning className="text-warning font-bold font-mono text-xs">{c.cases.toLocaleString()}</span>
                    <span suppressHydrationWarning className="text-danger font-bold font-mono text-xs">{c.deaths.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
