import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TranslatedText from './TranslatedText';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface LocationProject {
  name: string;
  type: string;
  status: 'Live' | 'Dev' | 'Maintenance';
}

interface LocationMarker {
  name: string;
  coordinates: [number, number];
  projects: LocationProject[];
}

const GlobalPresence: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<LocationMarker | null>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0] as [number, number], zoom: 1 });

  const markers: LocationMarker[] = [
    { 
      name: t.global.markers.araraquara, 
      coordinates: [-48.1766, -21.7946],
      projects: [
        { name: "Hidrau Comp", type: t.global.project_types.industrial, status: "Dev" },
        { name: "PMC Cartomancia", type: t.global.project_types.global_platform, status: "Live" }
      ]
    },
    {
      name: t.global.markers.punta_del_este,
      coordinates: [-54.9433, -34.9644],
      projects: [
        { name: "Tanganika", type: t.global.project_types.corporate, status: "Live" }
      ]
    }
  ];

  // Update selected location when language changes
  useEffect(() => {
    if (selectedLocation) {
      const updatedLocation = markers.find(m => m.coordinates[0] === selectedLocation.coordinates[0] && m.coordinates[1] === selectedLocation.coordinates[1]);
      if (updatedLocation) {
        setSelectedLocation(updatedLocation);
      }
    }
  }, [t]);

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-[1px] bg-red-600"></div>
            <span className="text-xs font-mono text-red-600 uppercase tracking-widest">
              <TranslatedText text={t.global.label} duration={1000} />
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase leading-none mb-8">
            <TranslatedText text={t.global.title} duration={1200} /> <span className="text-red-600">/</span> <TranslatedText text={t.global.title_highlight} duration={1200} delay={200} />
          </h3>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            <TranslatedText text={t.global.description} duration={1500} delay={400} />
          </p>
        </div>

        <div className="w-full h-[600px] border border-white/10 bg-zinc-900/20 rounded-lg overflow-hidden relative">
          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <button 
              onClick={handleZoomIn}
              className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center rounded border border-white/10 transition-colors"
              title="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button 
              onClick={handleZoomOut}
              className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center rounded border border-white/10 transition-colors"
              title="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
              </svg>
            </button>
          </div>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
            }}
            className="w-full h-full"
            onClick={() => setSelectedLocation(null)} // Deselect on map click
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={handleMoveEnd}
              maxZoom={4}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a1a1a"
                      stroke="#333"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#2a2a2a", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {markers.map((marker) => (
                <Marker 
                  key={marker.name} 
                  coordinates={marker.coordinates}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLocation(marker);
                  }}
                  style={{
                    default: { cursor: 'pointer', outline: 'none' },
                    hover: { cursor: 'pointer', outline: 'none' },
                    pressed: { cursor: 'pointer', outline: 'none' }
                  }}
                >
                  <motion.circle
                    r={selectedLocation?.name === marker.name ? 8 : 4}
                    fill={selectedLocation?.name === marker.name ? "#fff" : "#dc2626"}
                    animate={{ 
                      scale: selectedLocation?.name === marker.name ? [1, 1.2, 1] : [1, 1.5, 1],
                      opacity: 1 
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <circle r={2} fill="#fff" />
                  <text
                    textAnchor="middle"
                    y={-15}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      fill: selectedLocation?.name === marker.name ? "#fff" : "#888",
                      fontWeight: selectedLocation?.name === marker.name ? "bold" : "normal",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      pointerEvents: 'auto' // Make text clickable
                    }}
                  >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
          
          {/* Location Detail Card */}
          <AnimatePresence>
            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-8 right-8 w-80 bg-black/90 backdrop-blur-md border border-white/10 p-6 rounded-lg shadow-2xl z-20"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-1">{t.global.location}</span>
                    <h4 className="text-2xl font-black text-white uppercase">{selectedLocation.name}</h4>
                  </div>
                  <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedLocation.projects.map((project, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <h5 className="text-sm font-bold text-white">{project.name}</h5>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                          project.status === 'Live' ? 'bg-green-900/30 text-green-400' :
                          project.status === 'Dev' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">{project.type}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    {t.global.operating}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Overlay Grid Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 pointer-events-none bg-grid opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
