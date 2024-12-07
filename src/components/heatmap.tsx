import { useEffect, useMemo } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import type { FeatureCollection, Point } from 'geojson'

interface HeatmapProps {
  geojson: FeatureCollection<Point>
  radius: number
  opacity: number
}

export function Heatmap({ geojson, radius, opacity }: HeatmapProps) {
  const map = useMap()
  const visualization = useMapsLibrary('visualization')

  const heatmap = useMemo(() => {
    if (!visualization) return null

    return new google.maps.visualization.HeatmapLayer({
      radius,
      opacity
    })
  }, [visualization, radius, opacity])

  useEffect(() => {
    if (!heatmap) return

    heatmap.setData(
      geojson.features.map(point => {
        const [lng, lat] = point.geometry.coordinates

        return {
          location: new google.maps.LatLng(lat, lng),
          weight: point.properties?.mag
        }
      })
    )
  }, [heatmap, geojson])

  useEffect(() => {
    if (!heatmap) return

    heatmap.setMap(map)

    return () => {
      heatmap.setMap(null)
    }
  }, [heatmap, map])

  return null
}

