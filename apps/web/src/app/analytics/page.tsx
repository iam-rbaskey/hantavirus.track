import { TrendChart } from '@/components/TrendChart';

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <header className="pb-6 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white tracking-tight">Advanced Analytics</h1>
        <p className="text-text-secondary text-sm mt-2 uppercase tracking-widest">Epidemiological Modeling & Projections</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 min-h-[400px] flex flex-col">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(123,97,255,0.8)]"></span>
            Global Trend Analysis
          </h2>
          <div className="flex-1 w-full h-full relative">
            <TrendChart />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6 min-h-[400px] flex flex-col">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,210,255,0.8)]"></span>
            Regional Vectors
          </h2>
          <div className="flex flex-col items-center justify-center flex-1 text-center opacity-50">
            <p className="text-sm text-text-secondary tracking-widest uppercase mb-2">Insufficient Data Points</p>
            <p className="text-xs text-text-secondary font-mono">Awaiting further intelligence gathering...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
