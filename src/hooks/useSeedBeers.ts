import { useMutation } from '@tanstack/react-query';
import { useNostr } from '@nostrify/react';
import { useCurrentUser } from './useCurrentUser';
import { SEED_BEERS } from '@/lib/seedData';

interface SeedBeersResult {
  success: number;
  failed: number;
  total: number;
}

export function useSeedBeers() {
  const { nostr } = useNostr();
  const { user } = useCurrentUser();

  return useMutation({
    mutationFn: async (): Promise<SeedBeersResult> => {
      if (!user) {
        throw new Error('User must be logged in to seed beers');
      }

      const results: SeedBeersResult = {
        success: 0,
        failed: 0,
        total: SEED_BEERS.length,
      };

      // Publish each beer as a check-in with a small delay between each
      for (const beer of SEED_BEERS) {
        try {
          const timestamp = Math.floor(Date.now() / 1000) - results.success * 3600; // Stagger by hours
          const dTag = `seed-${Date.now()}-${Math.random().toString(36).substring(7)}`;

          await nostr.event({
            kind: 35467,
            created_at: timestamp,
            content: beer.description,
            tags: [
              ['d', dTag],
              ['beer-name', beer.beerName],
              ['brewery-name', beer.breweryName],
              ['beer-style', beer.beerStyle],
              ['rating', beer.rating],
              ['abv', beer.abv],
              ...(beer.ibu ? [['ibu', beer.ibu]] : []),
              ['serving-style', 'draft'],
              ['t', 'beer'],
              ['t', beer.beerStyle.toLowerCase().replace(/\s+/g, '')],
              ['alt', `Beer check-in: ${beer.beerName} - ${beer.breweryName}`],
            ],
          });

          results.success++;
          
          // Small delay to avoid overwhelming relays
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to seed beer: ${beer.beerName}`, error);
          results.failed++;
        }
      }

      return results;
    },
  });
}
