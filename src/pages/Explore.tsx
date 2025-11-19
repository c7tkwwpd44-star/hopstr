import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Beer, Search, TrendingUp, Info, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBeerCheckins, getBeerCheckinData } from '@/hooks/useBeerCheckins';
import { SeedDataDialog } from '@/components/SeedDataDialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';

interface BeerStats {
  name: string;
  brewery: string;
  count: number;
  avgRating: number;
  style?: string;
}

interface BreweryStats {
  name: string;
  count: number;
  avgRating: number;
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useCurrentUser();
  const { data: checkins, isLoading } = useBeerCheckins({ limit: 200 });

  // Calculate top beers
  const topBeers: BeerStats[] = [];
  const beerMap = new Map<string, { count: number; ratings: number[]; brewery: string; style?: string }>();

  checkins?.forEach((event) => {
    const data = getBeerCheckinData(event);
    const key = `${data.beerName}|${data.breweryName}`;
    const existing = beerMap.get(key);

    if (existing) {
      existing.count++;
      if (data.rating) existing.ratings.push(data.rating);
    } else {
      beerMap.set(key, {
        count: 1,
        ratings: data.rating ? [data.rating] : [],
        brewery: data.breweryName,
        style: data.beerStyle,
      });
    }
  });

  beerMap.forEach((stats, key) => {
    const [name] = key.split('|');
    const avgRating = stats.ratings.length > 0
      ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
      : 0;

    topBeers.push({
      name,
      brewery: stats.brewery,
      count: stats.count,
      avgRating,
      style: stats.style,
    });
  });

  topBeers.sort((a, b) => b.count - a.count);

  // Calculate top breweries
  const topBreweries: BreweryStats[] = [];
  const breweryMap = new Map<string, { count: number; ratings: number[] }>();

  checkins?.forEach((event) => {
    const data = getBeerCheckinData(event);
    const existing = breweryMap.get(data.breweryName);

    if (existing) {
      existing.count++;
      if (data.rating) existing.ratings.push(data.rating);
    } else {
      breweryMap.set(data.breweryName, {
        count: 1,
        ratings: data.rating ? [data.rating] : [],
      });
    }
  });

  breweryMap.forEach((stats, name) => {
    const avgRating = stats.ratings.length > 0
      ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length
      : 0;

    topBreweries.push({
      name,
      count: stats.count,
      avgRating,
    });
  });

  topBreweries.sort((a, b) => b.count - a.count);

  // Filter by search (only if search query is not empty)
  const filteredBeers = searchQuery
    ? topBeers.filter(
        (beer) =>
          beer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.brewery.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topBeers;

  const filteredBreweries = searchQuery
    ? topBreweries.filter((brewery) =>
        brewery.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topBreweries;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Explore</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Discover popular beers and breweries from the Nostr network
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Getting Started Info */}
          {!isLoading && (!checkins || checkins.length === 0) && (
            <Alert className="border-primary/50 bg-primary/5">
              <Sparkles className="h-4 w-4 text-primary" />
              <AlertDescription className="ml-2">
                <strong>Welcome to Hopstr!</strong> This page shows beers from all check-ins across the Nostr network.
                {user ? (
                  <> To get started, click <strong>"Seed Sample Data"</strong> below to add 25 popular beers, or <Link to="/checkin" className="underline font-medium">check in your first beer</Link>!</>
                ) : (
                  <> <Link to="/" className="underline font-medium">Log in</Link> to add sample data or check in beers.</>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search beers or breweries..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {user && (
              <div className="flex items-center">
                <SeedDataDialog />
              </div>
            )}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="beers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="beers">Top Beers</TabsTrigger>
              <TabsTrigger value="breweries">Top Breweries</TabsTrigger>
            </TabsList>

            <TabsContent value="beers" className="space-y-4">
              {isLoading ? (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : filteredBeers.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-4">
                      <div className="bg-muted/50 rounded-full p-6 w-fit mx-auto">
                        <Beer className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? 'No beers found matching your search. Try a different search term or clear the search.'
                          : 'No beers found yet. Add some sample data to get started!'}
                      </p>
                      {!searchQuery && user && (
                        <div className="flex justify-center">
                          <SeedDataDialog />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredBeers.slice(0, 50).map((beer, index) => (
                  <Card key={`${beer.name}-${beer.brewery}`} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">{beer.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{beer.brewery}</p>
                          {beer.style && (
                            <p className="text-xs text-muted-foreground">{beer.style}</p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-primary font-bold">
                            <Beer className="h-4 w-4" />
                            <span>{beer.count}</span>
                          </div>
                          {beer.avgRating > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {beer.avgRating.toFixed(1)} ★
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="breweries" className="space-y-4">
              {isLoading ? (
                <>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-48" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : filteredBreweries.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-4">
                      <div className="bg-muted/50 rounded-full p-6 w-fit mx-auto">
                        <Beer className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? 'No breweries found matching your search. Try a different search term or clear the search.'
                          : 'No breweries found yet. Add some sample data to get started!'}
                      </p>
                      {!searchQuery && user && (
                        <div className="flex justify-center">
                          <SeedDataDialog />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredBreweries.slice(0, 50).map((brewery, index) => (
                  <Card key={brewery.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg truncate">{brewery.name}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-primary font-bold">
                            <TrendingUp className="h-4 w-4" />
                            <span>{brewery.count}</span>
                          </div>
                          {brewery.avgRating > 0 && (
                            <div className="text-sm text-muted-foreground">
                              {brewery.avgRating.toFixed(1)} ★
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
