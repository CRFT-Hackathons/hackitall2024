interface WeightedLocation {
  lat: number;
  lng: number;
  weight: number;
}

export function generateRandomLocations(count: number): WeightedLocation[] {
  const bucharestCenter = { lat: 44.4268, lng: 26.1025 };
  const radius = 0.1; // Approximately 11km radius

  return Array.from({ length: count }, () => {
    const r = radius * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    
    return {
      lat: bucharestCenter.lat + r * Math.cos(theta),
      lng: bucharestCenter.lng + r * Math.sin(theta),
      weight: Math.random(),
    };
  });
}

