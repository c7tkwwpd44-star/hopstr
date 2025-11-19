import { Link } from 'react-router-dom';
import { ArrowLeft, Beer, Calendar, MapPin, Settings, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBeerCheckins, getBeerCheckinData } from '@/hooks/useBeerCheckins';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuthor } from '@/hooks/useAuthor';
import { genUserName } from '@/lib/genUserName';
import type { NostrEvent, NostrMetadata } from '@nostrify/nostrify';

function ProfileCheckinCard({ event }: { event: NostrEvent }) {
  const data = getBeerCheckinData(event);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        {data.image ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={data.image}
              alt={data.beerName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
            <Beer className="h-10 w-10 text-primary" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg leading-tight truncate">{data.beerName}</h3>
              <p className="text-sm text-muted-foreground truncate">{data.breweryName}</p>
            </div>
            {data.rating && (
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full flex-shrink-0">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-sm font-bold text-primary">{data.rating}</span>
              </div>
            )}
          </div>

          {data.beerStyle && (
            <p className="text-sm text-muted-foreground mb-2">{data.beerStyle}</p>
          )}

          {data.review && (
            <p className="text-sm line-clamp-2 mb-2">{data.review}</p>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(data.createdAt)}</span>
            </div>
            {data.location && (
              <div className="flex items-center gap-1 truncate">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{data.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ProfileCheckinSkeleton() {
  return (
    <Card>
      <div className="flex gap-4 p-4">
        <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </Card>
  );
}

export default function Profile() {
  const { user } = useCurrentUser();
  const author = useAuthor(user?.pubkey || '');
  const metadata: NostrMetadata | undefined = author.data?.metadata;

  const { data: checkins, isLoading } = useBeerCheckins({
    authors: user ? [user.pubkey] : undefined,
    limit: 100,
  });

  const displayName = metadata?.name || genUserName(user?.pubkey || '');
  const profileImage = metadata?.picture;
  const bio = metadata?.about;

  // Calculate stats
  const totalCheckins = checkins?.length || 0;
  const uniqueBeers = new Set(
    checkins?.map((event) => getBeerCheckinData(event).beerName)
  ).size;
  const uniqueBreweries = new Set(
    checkins?.map((event) => getBeerCheckinData(event).breweryName)
  ).size;
  const avgRating =
    checkins && checkins.length > 0
      ? (
          checkins.reduce((sum, event) => {
            const rating = getBeerCheckinData(event).rating;
            return sum + (rating || 0);
          }, 0) / checkins.filter((event) => getBeerCheckinData(event).rating).length
        ).toFixed(1)
      : '0.0';

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Please log in to view your profile</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 h-32" />
        <div className="container mx-auto px-4 pt-8 pb-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24 ring-4 ring-background shadow-xl">
                <AvatarImage src={profileImage} alt={displayName} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                  {displayName[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{displayName}</h2>
                {bio && (
                  <p className="text-muted-foreground mt-1 max-w-md">{bio}</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{totalCheckins}</div>
                  <div className="text-sm text-muted-foreground mt-1">Check-ins</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{uniqueBeers}</div>
                  <div className="text-sm text-muted-foreground mt-1">Unique Beers</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{uniqueBreweries}</div>
                  <div className="text-sm text-muted-foreground mt-1">Breweries</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{avgRating}</div>
                  <div className="text-sm text-muted-foreground mt-1">Avg Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Check-ins */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="top">Top Rated</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {isLoading ? (
                <>
                  <ProfileCheckinSkeleton />
                  <ProfileCheckinSkeleton />
                  <ProfileCheckinSkeleton />
                </>
              ) : !checkins || checkins.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-4">
                      <div className="bg-muted/50 rounded-full p-6 w-fit mx-auto">
                        <Beer className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        No check-ins yet. Start checking in beers!
                      </p>
                      <Link to="/checkin">
                        <Button className="rounded-full">Check In a Beer</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                checkins.map((event) => (
                  <ProfileCheckinCard key={event.id} event={event} />
                ))
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {isLoading ? (
                <>
                  <ProfileCheckinSkeleton />
                  <ProfileCheckinSkeleton />
                </>
              ) : (
                checkins
                  ?.slice(0, 10)
                  .map((event) => <ProfileCheckinCard key={event.id} event={event} />)
              )}
            </TabsContent>

            <TabsContent value="top" className="space-y-4">
              {isLoading ? (
                <>
                  <ProfileCheckinSkeleton />
                  <ProfileCheckinSkeleton />
                </>
              ) : (
                checkins
                  ?.filter((event) => getBeerCheckinData(event).rating)
                  .sort(
                    (a, b) =>
                      (getBeerCheckinData(b).rating || 0) -
                      (getBeerCheckinData(a).rating || 0)
                  )
                  .slice(0, 10)
                  .map((event) => <ProfileCheckinCard key={event.id} event={event} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
