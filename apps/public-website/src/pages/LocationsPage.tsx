import { useEffect, useState } from 'react';
import { Geo } from '@aws-amplify/geo';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    async function loadLocations() {
      const results = await Geo.searchByText('K7 Stores');
      setLocations(
        results.map((result, index) => ({
          id: `${index}`,
          name: result.label ?? 'Store',
          coordinates: [result.geometry.point[0], result.geometry.point[1]] as [number, number]
        }))
      );
    }

    loadLocations().catch(console.error);
  }, []);

  return (
    <main>
      <h1>Find a store near you</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name} ({location.coordinates[1]}, {location.coordinates[0]})
          </li>
        ))}
      </ul>
    </main>
  );
}
