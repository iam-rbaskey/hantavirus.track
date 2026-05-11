import { OutbreakMap } from '@/components/OutbreakMap';

export default function OutbreaksPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <header className="pb-6 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white tracking-tight">Active Outbreaks</h1>
        <p className="text-text-secondary text-sm mt-2 uppercase tracking-widest">Global Situational Awareness</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
          <div className="px-6 py-4 border-b border-border/50 bg-bg-secondary/50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,210,255,0.8)]"></span>
              Live Geotracking
            </h2>
          </div>
          <div className="flex-1 min-h-[600px] relative">
            <OutbreakMap />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-warning shadow-[0_0_8px_rgba(255,181,71,0.8)]"></span>
            Critical Zones
          </h2>
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center opacity-50">
            <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center mb-4">
              <span className="text-text-secondary font-mono tracking-widest">NO DATA</span>
            </div>
            <p className="text-sm text-text-secondary tracking-widest uppercase">Select a region to view detailed metrics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
