"use client";

import { useState, useCallback, useMemo } from "react";

import {
  APIProvider,
  Map,
  useMap,
  MapEvent,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MapPin, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateBucharestGeoJSON } from "./utils/generateGeoJSON";
import { Heatmap } from "./heatmap";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExpandableMapProps {
  apiKey: string;
}

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
        size="icon"
        onClick={handleZoomIn}
        aria-label="Zoom in"
        className="transition-all duration-300 border border-border hover:bg-black/80"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        onClick={handleZoomOut}
        aria-label="Zoom out"
        className="transition-all duration-300 border border-border hover:bg-black/80"
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
    const selectedPoints = features.filter((_, index) => index % 2 === 0);
    return selectedPoints.map((feature) => ({
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
      names: [
        "UNICEF",
        "Orphan for Adoption",
        "Red Cross International",
        "Microsoft Romania",
        "Google Romania",
        "Save the Children",
        "World Wildlife Fund",
        "Orange Romania",
        "Vodafone Foundation",
        "Greenpeace Romania",
        "Adobe Romania",
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 1 + Math.floor(Math.random() * 3)),
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
      <div className="fixed bottom-4 right-4 z-50 group">
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg cursor-pointer transition-all duration-200 ${
              isExpanded ? "scale-110" : ""
            }`}
            onClick={() => setIsExpanded(true)}
          >
            <MapPin className="h-6 w-6 text-white" />
          </div>
          {isExpanded && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
              <div className="w-[80%] h-[80%] bg-transparent rounded-lg overflow-hidden flex flex-col relative">
                <div className="relative flex-grow">
                  <APIProvider
                    apiKey={apiKey}
                    libraries={["visualization", "marker"]}
                  >
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
                      <div className="absolute top-2 left-2 z-10">
                        <Tabs
                          defaultValue={showHeatmap ? "heatmap" : "markers"}
                          onValueChange={(value) =>
                            setShowHeatmap(value === "heatmap")
                          }
                        >
                          <TabsList className="grid w-full grid-cols-2 bg-white/90 backdrop-blur-sm">
                            <TabsTrigger
                              value="heatmap"
                              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                            >
                              Heatmap
                            </TabsTrigger>
                            <TabsTrigger
                              value="markers"
                              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                            >
                              Markers
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      {showHeatmap ? (
                        <Heatmap
                          geojson={heatmapData}
                          radius={20}
                          opacity={0.6}
                        />
                      ) : (
                        markerPositions.map((position, index) => (
                          <AdvancedMarker
                            key={index}
                            position={position}
                            onMouseEnter={() => setHoveredMarker(index)}
                            onMouseLeave={() => setHoveredMarker(null)}
                          >
                            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-red-600 hover:shadow-lg" />
                            {hoveredMarker === index && (
                              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-2 rounded shadow-lg whitespace-nowrap z-10 transition-opacity duration-300">
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
                  className="absolute top-2 right-2 z-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close map</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
