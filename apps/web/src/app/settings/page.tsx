export default function SettingsPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto space-y-6">
      <header className="pb-6 border-b border-border/50">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-text-secondary text-sm mt-2 uppercase tracking-widest">Platform Configuration & API Keys</p>
      </header>

      <div className="rounded-2xl border border-border bg-bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-8">
        <div className="max-w-md space-y-6">
          <div>
            <label className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">Mapbox Access Token</label>
            <input 
              type="password" 
              placeholder="pk.eyJ1..." 
              defaultValue={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''}
              className="w-full bg-bg-primary border border-border rounded p-3 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <p className="text-[10px] text-text-secondary mt-2 uppercase tracking-widest">Required for Geospatial Intelligence</p>
          </div>
          
          <button className="bg-primary/20 text-primary border border-primary/50 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded hover:bg-primary/30 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
