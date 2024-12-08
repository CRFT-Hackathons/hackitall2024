import type { FeatureCollection, Point, Feature } from 'geojson'

export function generateBucharestGeoJSON(count: number): FeatureCollection<Point> {
  const bucharestCenter = { lat: 44.4268, lng: 26.1025 }
  const radius = 0.1 // Approximately 11km radius

  const features: Feature<Point>[] = Array.from({ length: count }, () => {
    const r = radius * Math.sqrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          bucharestCenter.lng + r * Math.sin(theta),
          bucharestCenter.lat + r * Math.cos(theta)
        ]
      },
      properties: {
        mag: Math.random() * 2 // Random weight between 0 and 2
      }
    }
  })

  return {
    type: 'FeatureCollection',
    features
  }
}

