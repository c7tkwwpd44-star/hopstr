import { Beer, MapPin, Plus, Star, TrendingUp, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useBeerCheckins, getBeerCheckinData } from '@/hooks/useBeerCheckins';
import { useAuthor } from '@/hooks/useAuthor';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { genUserName } from '@/lib/genUserName';
import type { NostrEvent, NostrMetadata } from '@nostrify/nostrify';
import { LoginArea } from '@/components/auth/LoginArea';

function BeerCheckinCard({ event }: { event: NostrEvent }) {
  const data = getBeerCheckinData(event);
  const author = useAuthor(event.pubkey);
  const metadata: NostrMetadata | undefined = author.data?.metadata;

  const displayName = metadata?.name || genUserName(event.pubkey);
  const profileImage = metadata?.picture;
  
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor(Date.now() / 1000 - timestamp);
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/npub${event.pubkey}`}>
              <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                <AvatarImage src={profileImage} alt={displayName} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                  {displayName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link to={`/npub${event.pubkey}`} className="font-semibold hover:underline">
                {displayName}
              </Link>
              <p className="text-sm text-muted-foreground">{timeAgo(event.created_at)}</p>
            </div>
          </div>
          {data.rating && (
            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-bold text-primary">{data.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      {data.image && (
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={data.image}
            alt={data.beerName}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardContent className="pt-4 space-y-3">
        <div>
          <h3 className="font-bold text-xl">{data.beerName}</h3>
          <p className="text-muted-foreground">{data.breweryName}</p>
          {data.beerStyle && (
            <p className="text-sm text-muted-foreground mt-1">{data.beerStyle}</p>
          )}
        </div>

        {data.review && (
          <p className="text-sm leading-relaxed">{data.review}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {data.abv && (
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-xs">
              <Beer className="h-3 w-3" />
              <span>{data.abv}% ABV</span>
            </div>
          )}
          {data.ibu && (
            <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>{data.ibu} IBU</span>
            </div>
          )}
          {data.servingStyle && (
            <div className="bg-secondary px-2 py-1 rounded-md text-xs">
              {data.servingStyle}
            </div>
          )}
        </div>

        {data.location && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{data.location}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BeerCheckinSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </CardHeader>

      <Skeleton className="w-full aspect-square" />

      <CardContent className="pt-4 space-y-3">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { user } = useCurrentUser();
  const { data: checkins, isLoading, error } = useBeerCheckins({ limit: 50 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-primary/60 p-2 rounded-2xl shadow-lg">
                <Beer className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Hopstr
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              {user && (
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <LoginArea className="max-w-40" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Discover & Share
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Great Beers
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Check in your favorite brews, rate beers, and connect with beer lovers on Nostr
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/checkin">
                <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  <Plus className="h-5 w-5 mr-2" />
                  Check In a Beer
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Explore Beers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Check-ins</h2>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <>
                <BeerCheckinSkeleton />
                <BeerCheckinSkeleton />
                <BeerCheckinSkeleton />
              </>
            ) : error ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Failed to load check-ins. Please check your relay connections.
                  </p>
                </CardContent>
              </Card>
            ) : !checkins || checkins.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <div className="max-w-sm mx-auto space-y-4">
                    <div className="bg-muted/50 rounded-full p-6 w-fit mx-auto">
                      <Beer className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      No check-ins found yet. Be the first to check in a beer!
                    </p>
                    {user && (
                      <Link to="/checkin">
                        <Button className="rounded-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Check In Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              checkins.map((event) => (
                <BeerCheckinCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      {user && (
        <Link to="/checkin">
          <Button
            size="lg"
            className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all md:hidden"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </Link>
      )}

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Vibed with{' '}
            <a
              href="https://soapbox.pub/mkstack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MKStack
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
