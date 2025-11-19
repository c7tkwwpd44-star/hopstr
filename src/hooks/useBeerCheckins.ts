import { useQuery } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';
import type { NostrEvent } from '@nostrify/nostrify';

interface CheckinFilters {
  authors?: string[];
  beerName?: string;
  breweryName?: string;
  limit?: number;
}

export function useBeerCheckins(filters: CheckinFilters = {}) {
  const { nostr } = useNostr();

  return useQuery({
    queryKey: ['beer-checkins', filters],
    queryFn: async (c) => {
      const signal = AbortSignal.any([c.signal, AbortSignal.timeout(3000)]);
      
      const queryFilters: any = {
        kinds: [35467],
        limit: filters.limit || 50,
      };

      if (filters.authors) {
        queryFilters.authors = filters.authors;
      }

      if (filters.beerName) {
        queryFilters['#beer-name'] = [filters.beerName];
      }

      if (filters.breweryName) {
        queryFilters['#brewery-name'] = [filters.breweryName];
      }

      const events = await nostr.query([queryFilters], { signal });
      
      // Sort by created_at descending
      return events.sort((a, b) => b.created_at - a.created_at);
    },
  });
}

export function validateBeerCheckin(event: NostrEvent): boolean {
  if (event.kind !== 35467) return false;

  const d = event.tags.find(([name]) => name === 'd')?.[1];
  const beerName = event.tags.find(([name]) => name === 'beer-name')?.[1];
  const breweryName = event.tags.find(([name]) => name === 'brewery-name')?.[1];

  return !!(d && beerName && breweryName);
}

export function getBeerCheckinData(event: NostrEvent) {
  const tags = Object.fromEntries(
    event.tags.map(([key, value]) => [key, value])
  );

  return {
    id: tags['d'],
    beerName: tags['beer-name'],
    breweryName: tags['brewery-name'],
    beerStyle: tags['beer-style'],
    rating: tags['rating'] ? parseFloat(tags['rating']) : undefined,
    abv: tags['abv'],
    ibu: tags['ibu'],
    servingStyle: tags['serving-style'],
    location: tags['location'],
    image: tags['image'],
    review: event.content,
    createdAt: event.created_at,
    author: event.pubkey,
  };
}
