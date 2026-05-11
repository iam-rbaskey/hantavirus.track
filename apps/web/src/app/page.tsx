'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { GlobalMetricsCard } from '@/components/GlobalMetricsCard';
import { OutbreakMap } from '@/components/OutbreakMap';
import { useSocket } from '@/providers/SocketProvider';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();
  const { isConnected } = useSocket();

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative h-12 w-12 rounded-xl border border-primary/30 flex items-center justify-center bg-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
        <div className="h-3 w-3 bg-primary rounded-full shadow-[0_0_15px_rgba(0,210,255,0.8)] animate-ping" />
      </div>
      <span className="text-primary font-medium tracking-widest uppercase text-sm">Initializing uplink...</span>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-danger">
      <div className="h-12 w-12 rounded-xl border border-danger/50 flex items-center justify-center bg-danger/10">
        <span className="text-2xl font-bold">!</span>
      </div>
      <span className="font-bold tracking-widest uppercase text-sm">CRITICAL UPLINK FAILURE</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Global Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlobalMetricsCard 
          title="Confirmed Cases" 
          value={data?.global.totalCases || 0} 
          type="warning" 
          trend="+12% vs last week"
        />
        <GlobalMetricsCard 
          title="Total Deaths" 
          value={data?.global.totalDeaths || 0} 
          type="danger" 
          trend="+5% vs last week"
        />
        <GlobalMetricsCard 
          title="Affected Countries" 
          value={data?.global.affectedCountries || 0} 
          type="primary" 
          trend="No change"
        />
        <GlobalMetricsCard 
          title="System Status" 
          value={isConnected ? "LIVE" : "OFFLINE"} 
          type={isConnected ? "success" : "danger"}
          isStatus={true}
          trend={`Last sync: ${new Date(data?.global.reportedAt || Date.now()).toLocaleTimeString()}`}
        />
      </section>

      {/* Main Intelligence Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Mapbox Geospatial Intelligence */}
        <div className="xl:col-span-2 rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="px-6 py-4 border-b border-border/50 bg-bg-secondary/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,210,255,0.8)]"></span>
              Global Outbreak Distribution
            </h2>
            <div className="flex gap-2">
              <span className="px-2 py-1 text-[10px] uppercase tracking-widest border border-border rounded bg-bg-card text-text-secondary">Heatmap</span>
              <span className="px-2 py-1 text-[10px] uppercase tracking-widest border border-primary/30 rounded bg-primary/10 text-primary">Clusters</span>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] relative">
            <OutbreakMap />
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="px-6 py-4 border-b border-border/50 bg-bg-secondary/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-danger uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-danger animate-pulse shadow-[0_0_8px_rgba(255,77,77,0.8)]"></span>
              Live Intelligence
            </h2>
            <span className="px-2 py-1 text-[10px] uppercase tracking-widest border border-border rounded bg-bg-card text-text-secondary">Auto-sync</span>
          </div>
          <div className="flex-1 p-0 overflow-y-auto max-h-[400px]">
             <ul className="divide-y divide-border/50">
               {data?.recentNews.map((n, i) => (
                 <motion.li 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-5 hover:bg-white/[0.02] transition-colors group"
                  >
                   <div className="flex items-center justify-between mb-3">
                     <p className="text-[10px] text-primary/80 uppercase tracking-widest font-mono border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">
                       {n.source}
                     </p>
                     <p className="text-[10px] text-text-secondary font-mono">
                       {new Date(n.publishedAt).toLocaleTimeString()}
                     </p>
                   </div>
                   <a href={n.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors leading-relaxed block">
                     {n.title}
                   </a>
                 </motion.li>
               ))}
             </ul>
          </div>
        </div>
      </section>

      {/* Analytics & Table Row */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Trend Chart (Placeholder for ECharts) */}
        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 min-h-[300px] flex flex-col">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,97,255,0.8)]"></span>
            Outbreak Trends (30 Days)
          </h2>
          <div className="flex-1 border border-border border-dashed rounded-lg flex items-center justify-center text-text-secondary text-sm font-mono tracking-widest">
            [ECHARTS TREND LINE RENDERER]
          </div>
        </div>

        {/* Hotspots Table */}
        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="px-6 py-4 border-b border-border/50 bg-bg-secondary/50">
            <h2 className="text-sm font-bold text-warning uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-warning shadow-[0_0_8px_rgba(255,181,71,0.8)]"></span>
              Severity Index
            </h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-text-secondary uppercase tracking-widest bg-bg-primary/50 border-b border-border/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Region</th>
                  <th className="px-6 py-4 font-medium">Code</th>
                  <th className="px-6 py-4 font-medium text-right">Confirmed</th>
                  <th className="px-6 py-4 font-medium text-right">Fatalities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {data?.topCountries.map((c, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{c.country}</td>
                    <td className="px-6 py-4 text-text-secondary font-mono">{c.code}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-warning font-mono font-medium bg-warning/10 px-2 py-1 rounded">{c.cases.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-danger font-mono font-medium bg-danger/10 px-2 py-1 rounded">{c.deaths.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
}
