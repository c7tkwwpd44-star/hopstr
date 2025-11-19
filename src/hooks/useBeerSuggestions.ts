import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';
import { getBeerCheckinData } from './useBeerCheckins';

interface BeerSuggestion {
  beerName: string;
  breweryName: string;
  beerStyle?: string;
  count: number;
}

export function useBeerSuggestions(query: string, breweryFilter?: string) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['beer-suggestions', query, breweryFilter],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(2000)]);

      try {
        // Query for beer check-ins to build suggestions
        const events = await nostr.query(
          [
            {
              kinds: [35467],
              limit: 500,
            },
          ],
          { signal }
        );

        // Build map of beers
        const beerMap = new Map<string, BeerSuggestion>();

        events.forEach((event) => {
          const data = getBeerCheckinData(event);

          // Apply brewery filter if specified
          if (breweryFilter && data.breweryName.toLowerCase() !== breweryFilter.toLowerCase()) {
            return;
          }

          // Check if beer name matches query (only if query is provided and has 2+ chars)
          if (query && query.length >= 2) {
            if (!data.beerName.toLowerCase().includes(query.toLowerCase())) {
              return;
            }
          }

          const key = `${data.beerName}|${data.breweryName}`;
          const existing = beerMap.get(key);

          if (existing) {
            existing.count++;
          } else {
            beerMap.set(key, {
              beerName: data.beerName,
              breweryName: data.breweryName,
              beerStyle: data.beerStyle,
              count: 1,
            });
          }
        });

        // Convert to array and sort by count
        const suggestions = Array.from(beerMap.values()).sort((a, b) => b.count - a.count);

        return suggestions.slice(0, 10);
      } catch (error) {
        console.error('Error fetching beer suggestions:', error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
  });
}
