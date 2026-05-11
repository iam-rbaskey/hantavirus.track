'use client';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const OutbreakMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    
    // Safe initialization block
    try {
      const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      if (!token) return; // Exit early if no token is provided to prevent crashes
      
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 1.5,
        projection: 'globe' as any, // 3D globe projection
      });

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(5, 8, 22)',
          'high-color': 'rgb(6, 182, 212)',
          'horizon-blend': 0.1,
          'space-color': 'rgb(2, 4, 10)'
        });
      });
    } catch (e) {
      console.warn("Mapbox failed to initialize.", e);
    }

    return () => map.current?.remove();
  }, []);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-white/10 relative bg-black/50">
       {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
         <div className="absolute inset-0 z-10 flex items-center justify-center flex-col p-6 text-center backdrop-blur-md">
            <h3 className="text-xl font-bold text-warning mb-2">Geospatial Intelligence Offline</h3>
            <p className="text-sm text-white/60 max-w-md">Please add NEXT_PUBLIC_MAPBOX_TOKEN to your frontend .env variables to activate live Mapbox globe tracking.</p>
         </div>
       )}
       <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
