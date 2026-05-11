'use client';
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from '@/components/ui/map';
import type { CountryOutbreak } from '@/types';
import { useAppStore } from '@/store';

const COUNTRY_LATLNG: Record<string, [number, number]> = {
  NL: [4.9041,    52.3676],  ZA: [18.4241,  -33.9249],  CH: [8.2275,   46.8182],
  FR: [2.3522,    48.8566],  CL: [-70.6693, -33.4489],  US: [-95.7129,  37.0902],
  BR: [-51.9253, -14.2350],  DE: [10.4515,  51.1657],   GB: [-0.1276,  51.5074],
  AR: [-63.6167, -38.4161],  RU: [105.3188,  61.5240],  CN: [104.1954,  35.8617],
  IN: [78.9629,   20.5937],  AU: [133.7751, -25.2744],  MX: [-102.5528, 23.6345],
  SH: [-5.7089,  -15.9650],  JP: [138.2529,  36.2048],  ES: [-3.7038,   40.4168],
  IT: [12.5674,   41.8719],  PT: [-8.2245,   39.3999],  CA: [-96.8165,  56.1304],
  KR: [127.7669,  35.9078],  NO: [8.4689,    60.4720],  SE: [18.6435,   60.1282],
  DK: [9.5018,    56.2639],  FI: [25.7482,   61.9241],  PL: [19.1451,   51.9194],
  AT: [14.5501,   47.5162],  BE: [4.4699,    50.5039],  CZ: [15.4730,   49.8175],
  HU: [19.5033,   47.1625],  RO: [24.9668,   45.9432],  UA: [31.1656,   48.3794],
  TR: [35.2433,   38.9637],  EG: [30.8025,   26.8206],  NG: [8.6753,     9.0820],
  KE: [37.9062,   -0.0236],  TZ: [34.8888,   -6.3690],  ET: [40.4897,    9.1450],
  GH: [-1.0232,    7.9465],  CO: [-74.2973,   4.5709],  PE: [-75.0152,  -9.1900],
  VE: [-66.5897,   6.4238],  EC: [-78.1834,  -1.8312],  BO: [-63.5887, -16.2902],
  PY: [-58.4438,  -23.4425], UY: [-55.7658,  -32.5228], PA: [-80.7821,   8.5380],
  CR: [-83.7534,   9.7489],  PH: [121.7740,  12.8797],  ID: [113.9213,  -0.7893],
  MY: [109.6959,   4.2105],  TH: [100.9925,  15.8700],  VN: [108.2772,  14.0583],
  PK: [69.3451,   30.3753],  BD: [90.3563,   23.6850],  IR: [53.6880,   32.4279],
  SA: [45.0792,   23.8859],  MA: [-7.0926,   31.7917],  DZ: [1.6596,    28.0339],
};

interface Props { markers: CountryOutbreak[] }

export const MapLibreOutbreakMap = ({ markers }: Props) => {
  const { setSelectedCountry } = useAppStore();

  const plotted = markers.filter((m) => COUNTRY_LATLNG[m.code] && (m.cases > 0 || m.deaths > 0));
  const casesCount  = plotted.filter((m) => m.cases  > 0).length;
  const deathsCount = plotted.filter((m) => m.deaths > 0).length;

  const caseSize  = (n: number) => n >= 100 ? 20 : n >= 10 ? 15 : 11;
  const deathSize = (n: number) => n >= 50  ? 16 : n >= 5  ? 12 : 9;
  const cfr = (c: number, d: number) => c > 0 ? ((d / c) * 100).toFixed(1) : '0.0';

  return (
    <div className="relative w-full h-full">
      <Map
        center={[10, 20]}
        zoom={1.4}
        theme="dark"
        className="w-full h-full"
        minZoom={1}
        maxZoom={12}
      >
        <MapControls position="bottom-right" showZoom />

        {plotted.map((m) => {
          const [lng, lat] = COUNTRY_LATLNG[m.code]!;
          return (
            <MapMarker
              key={m.code}
              longitude={lng}
              latitude={lat}
              onClick={() => setSelectedCountry(m.code)}
            >
              <MarkerContent>
                <div className="flex flex-col items-center gap-[3px] cursor-pointer" style={{ minWidth: 44 }}>
                  {/* Cases — yellow pill */}
                  {m.cases > 0 && (
                    <div className="flex items-center gap-1 rounded-full px-1.5 py-[3px] hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(245,158,11,0.12)',
                        border: '1px solid rgba(245,158,11,0.40)',
                        boxShadow: '0 0 10px rgba(245,158,11,0.25)',
                      }}
                    >
                      <span className="rounded-full shrink-0"
                        style={{ width: caseSize(m.cases), height: caseSize(m.cases), background: '#F59E0B', boxShadow: '0 0 6px rgba(245,158,11,0.8)' }} />
                      <span className="text-[9px] font-black text-[#F59E0B] font-mono leading-none">{m.cases}</span>
                    </div>
                  )}
                  {/* Deaths — red pill */}
                  {m.deaths > 0 && (
                    <div className="flex items-center gap-1 rounded-full px-1.5 py-[3px] hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(239,68,68,0.12)',
                        border: '1px solid rgba(239,68,68,0.40)',
                        boxShadow: '0 0 10px rgba(239,68,68,0.25)',
                      }}
                    >
                      <span className="rounded-full shrink-0"
                        style={{ width: deathSize(m.deaths), height: deathSize(m.deaths), background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.8)' }} />
                      <span className="text-[9px] font-black text-[#EF4444] font-mono leading-none">{m.deaths}</span>
                    </div>
                  )}
                </div>
              </MarkerContent>

              <MarkerPopup>
                {/* Dark glass popup */}
                <div style={{
                  background: 'rgba(14,14,14,0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  minWidth: 200,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
                }}>
                  <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center justify-between gap-3">
                      <span style={{ color: '#F1F5F9', fontWeight: 700, fontSize: 14 }}>{m.country}</span>
                      <span style={{ color: '#94A3B8', fontFamily: 'monospace', fontSize: 11,
                        background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 8 }}>
                        {m.code}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div style={{ height: 10, width: 10, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px rgba(245,158,11,0.7)' }} />
                        <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Cases</span>
                      </div>
                      <span style={{ color: '#F59E0B', fontWeight: 900, fontSize: 18, fontFamily: 'monospace' }}>{m.cases.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div style={{ height: 10, width: 10, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.7)' }} />
                        <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Deaths</span>
                      </div>
                      <span style={{ color: '#EF4444', fontWeight: 900, fontSize: 18, fontFamily: 'monospace' }}>{m.deaths.toLocaleString()}</span>
                    </div>
                    <div style={{ paddingTop: 8, marginTop: 2, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em' }}>CFR</span>
                      <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>{cfr(m.cases, m.deaths)}%</span>
                    </div>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>

      {/* Glass legend */}
      <div className="absolute bottom-10 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
        {[
          { color: '#F59E0B', label: `Cases · ${casesCount}`,  glow: 'rgba(245,158,11,0.6)' },
          { color: '#EF4444', label: `Deaths · ${deathsCount}`, glow: 'rgba(239,68,68,0.6)' },
        ].map((l) => (
          <div key={l.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
            padding: '5px 10px',
          }}>
            <span style={{ height: 8, width: 8, borderRadius: '50%', background: l.color, boxShadow: `0 0 6px ${l.glow}`, flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 500 }}>{l.label}</span>
          </div>
        ))}
      </div>

      {plotted.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-text-muted text-sm glass-dark px-4 py-2 rounded-xl border border-white/[0.05]">No active outbreak data</p>
        </div>
      )}
    </div>
  );
};
