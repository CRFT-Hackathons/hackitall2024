"use client";

import { useState, useCallback, useMemo } from "react";
import { APIProvider, Map, useMap, MapEvent, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapPin, X, ZoomIn, ZoomOut, Flame } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generateBucharestGeoJSON } from "./utils/generateGeoJSON";
import { Heatmap } from "./heatmap";

interface ExpandableMapProps {
  apiKey: string;
}
// a
function ZoomControls({
  zoom,
  setZoom,
}: {
  zoom: number;
  setZoom: (zoom: number) => void;
}) {
  const map = useMap();

  const handleZoomIn = useCallback(() => {
    setZoom(zoom + 1);
    if (map) {
      map.setZoom(zoom + 1);
    }
  }, [map, zoom, setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom(zoom - 1);
    if (map) {
      map.setZoom(zoom - 1);
    }
  }, [map, zoom, setZoom]);

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={handleZoomIn}
        aria-label="Zoom in"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={handleZoomOut}
        aria-label="Zoom out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function ExpandableMap({ apiKey }: ExpandableMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const bucharestCoordinates = { lat: 44.4268, lng: 26.1025 };
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    bucharestCoordinates
  );
  const [zoom, setZoom] = useState(11);

  const heatmapData = useMemo(() => generateBucharestGeoJSON(300), []);
  
  const markerPositions = useMemo(() => {
    const features = heatmapData.features;
    const selectedPoints = features.filter((_, index) => index % 2 === 0); // Select every other point
    return selectedPoints.map(feature => ({
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
      names: [
        'UNICEF',
        'Orphan for Adoption',
        'Red Cross International',
        'Microsoft Romania',
        'Google Romania',
        'Save the Children',
        'World Wildlife Fund',
        'Orange Romania',
        'Vodafone Foundation',
        'Greenpeace Romania',
        'Adobe Romania'
      ].sort(() => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 3))
    }));
  }, [heatmapData]);

  const handleMapIdle = useCallback((mapInstance: google.maps.Map) => {
    const center = mapInstance.getCenter();
    if (center) {
      setMapCenter({ lat: center.lat(), lng: center.lng() });
    }
  }, []);

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 group"
        onMouseEnter={() => !isExpanded && setIsExpanded(true)}
        onMouseLeave={() => isExpanded && setIsExpanded(false)}
      >
        <div className="relative">
          <div className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 ${isExpanded ? 'scale-110' : ''}`}>
            <MapPin className="h-6 w-6 text-white" />
          </div>
          {isExpanded && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-transparent rounded-lg overflow-hidden flex flex-col relative">
                <div className="relative flex-grow">
                  <APIProvider apiKey={apiKey} libraries={["visualization", "marker"]}>
                    <Map
                      mapId="hackitall2024"
                      center={mapCenter}
                      zoom={zoom}
                      gestureHandling="greedy"
                      disableDefaultUI={true}
                      scrollwheel={true}
                      onIdle={(e: MapEvent<unknown>) => handleMapIdle(e.map)}
                      onZoomChanged={(e: MapEvent<unknown>) =>
                        setZoom(e.map.getZoom() ?? 11)
                      }
                    >
                      {showHeatmap ? (
                        <Heatmap geojson={heatmapData} radius={20} opacity={0.6} />
                      ) : (
                        markerPositions.map((position, index) => (
                          <AdvancedMarker
                            key={index}
                            position={position}
                            onMouseEnter={() => setHoveredMarker(index)}
                            onMouseLeave={() => setHoveredMarker(null)}
                          >
                            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110" />
                            {hoveredMarker === index && (
                              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg whitespace-nowrap z-10">
                                <div className="text-sm font-medium">
                                  {position.names.map((name, idx) => (
                                    <div key={idx}>{name}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </AdvancedMarker>
                        ))
                      )}
                      <ZoomControls zoom={zoom} setZoom={setZoom} />
                    </Map>
                  </APIProvider>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10 rounded-full bg-white"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close map</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 left-2 z-10 rounded-full bg-white"
                  onClick={() => setShowHeatmap((prev) => !prev)}
                >
                  <Flame className="h-4 w-4" />
                  <span className="sr-only">Toggle Heatmap</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
