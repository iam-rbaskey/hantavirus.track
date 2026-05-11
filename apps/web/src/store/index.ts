import { create } from 'zustand';

interface AppState {
  isRealtimeActive: boolean;
  toggleRealtime: () => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isRealtimeActive: true,
  toggleRealtime: () => set((state) => ({ isRealtimeActive: !state.isRealtimeActive })),
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));
