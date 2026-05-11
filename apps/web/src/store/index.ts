import { create } from 'zustand';

interface MapState {
  selectedCountryCode: string | null;
  mapZoom: number;
  filter: 'all' | 'active' | 'critical';
}

interface AppState extends MapState {
  isNavOpen: boolean;
  isRealtimeActive: boolean;
  // Actions
  setNavOpen: (open: boolean) => void;
  toggleRealtime: () => void;
  setSelectedCountry: (code: string | null) => void;
  setMapZoom: (zoom: number) => void;
  setFilter: (filter: MapState['filter']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isNavOpen: false,
  isRealtimeActive: true,
  selectedCountryCode: null,
  mapZoom: 1.5,
  filter: 'all',

  setNavOpen: (open) => set({ isNavOpen: open }),
  toggleRealtime: () => set((s) => ({ isRealtimeActive: !s.isRealtimeActive })),
  setSelectedCountry: (code) => set({ selectedCountryCode: code }),
  setMapZoom: (zoom) => set({ mapZoom: zoom }),
  setFilter: (filter) => set({ filter }),
}));
