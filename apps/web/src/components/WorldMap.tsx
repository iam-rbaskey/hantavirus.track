'use client';
import dynamic from 'next/dynamic';
import { useCountries } from '@/hooks/useCountries';
import type { CountryOutbreak } from '@/types';

/* Dynamically import to avoid SSR issues with MapLibre */
const MapLibreOutbreakMap = dynamic(
  () => import('./MapLibreOutbreakMap').then((m) => m.MapLibreOutbreakMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[320px] rounded-xl bg-[#0A0F1E] border border-white/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-text-muted text-xs uppercase tracking-widest">Initializing map...</p>
        </div>
      </div>
    ),
  }
);

interface Props {
  /** Optional override data — if omitted, component fetches all countries itself */
  hotspots?: CountryOutbreak[];
}

export const WorldMap = ({ hotspots }: Props) => {
  const { data: countriesData } = useCountries();

  /* Build full list from /countries API, merging confirmed cases + deaths */
  const allCountries: CountryOutbreak[] = (countriesData?.data ?? []).map((c) => ({
    country: c.name,
    code: c.code,
    cases:  c.outbreaks?.[0]?.confirmedCases ?? 0,
    deaths: c.outbreaks?.[0]?.deaths ?? 0,
  }));

  /* Use override if provided (e.g. from dashboard topCountries), else use all countries */
  const markers = hotspots ?? allCountries;

  return <MapLibreOutbreakMap markers={markers} />;
};
