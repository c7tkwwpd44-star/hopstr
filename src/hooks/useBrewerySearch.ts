import { useQuery } from '@tanstack/react-query';

interface Brewery {
  id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
}

export function useBrewerySearch(query: string) {
  return useQuery({
    queryKey: ['brewery-search', query],
    queryFn: async () => {
      if (!query || query.length < 2) {
        return [];
      }

      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(query)}&per_page=10`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch breweries');
        }

        const data = await response.json();
        
        return data.map((brewery: any): Brewery => ({
          id: brewery.id,
          name: brewery.name,
          city: brewery.city,
          state: brewery.state_province,
          country: brewery.country,
        }));
      } catch (error) {
        console.error('Error fetching breweries:', error);
        return [];
      }
    },
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
