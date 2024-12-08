"use client";

import { useState, useCallback, useMemo } from "react";
import { APIProvider, Map, useMap, MapEvent } from "@vis.gl/react-google-maps";
import { MapPin, X, ZoomIn, ZoomOut, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateBucharestGeoJSON } from "./utils/generateGeoJSON";
import { Heatmap } from "./heatmap";

interface ExpandableMapProps {
  apiKey: string;
}

function ZoomControls() {
  const map = useMap();

  const handleZoomIn = useCallback(() => {
    if (map) {
      map.setZoom((map.getZoom() || 0) + 1);
    }
  }, [map]);

  const handleZoomOut = useCallback(() => {
    if (map) {
      map.setZoom((map.getZoom() || 0) - 1);
    }
  }, [map]);

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

  // Initial center and zoom for Bucharest
  const bucharestCoordinates = { lat: 44.4268, lng: 26.1025 };
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    bucharestCoordinates
  );
  const [mapZoom, setMapZoom] = useState<number>(11);

  const heatmapData = useMemo(() => generateBucharestGeoJSON(300), []);

  const handleMapIdle = useCallback((mapInstance: google.maps.Map) => {
    const center = mapInstance.getCenter();
    const zoom = mapInstance.getZoom();
    if (center && zoom !== null) {
      setMapCenter({ lat: center.lat(), lng: center.lng() });
      setMapZoom(zoom ?? 11);
    }
  }, []);

  return (
    <>
      {!isExpanded ? (
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <MapPin className="h-6 w-6" />
          <span className="sr-only">Open Bucharest Map</span>
        </Button>
      ) : (
        <div className="fixed inset-0 z-50 bg-transparent flex items-center justify-center">
          <div className="w-[60%] h-[60%] bg-transparent rounded-lg overflow-hidden flex flex-col relative">
            <div className="relative flex-grow">
              <APIProvider apiKey={apiKey} libraries={["visualization"]}>
                <Map
                  mapId="hackitall2024"
                  center={mapCenter}
                  zoom={mapZoom}
                  gestureHandling="greedy"
                  disableDefaultUI={true}
                  scrollwheel={true}
                  onIdle={(e: MapEvent<unknown>) => handleMapIdle(e.map)}
                >
                  {showHeatmap && (
                    <Heatmap geojson={heatmapData} radius={20} opacity={0.6} />
                  )}
                  <ZoomControls />
                </Map>
              </APIProvider>
            </div>
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10 rounded-full bg-white"
              onClick={() => setIsExpanded(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close map</span>
            </Button>
            {/* Toggle Heatmap Button */}
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
    </>
  );
}
