import { useState } from 'react';
import { Database, Loader2, CheckCircle2, XCircle, Beer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSeedBeers } from '@/hooks/useSeedBeers';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SEED_BEERS } from '@/lib/seedData';

export function SeedDataDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUser();
  const { mutate: seedBeers, isPending, isSuccess, isError, data, reset } = useSeedBeers();

  const handleSeed = () => {
    seedBeers();
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => reset(), 300); // Reset after dialog closes
  };

  if (!user) {
    return null;
  }

  const progress = data ? (data.success / data.total) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Database className="h-4 w-4" />
          Seed Sample Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Beer className="h-5 w-5 text-primary" />
            Populate Sample Beers
          </DialogTitle>
          <DialogDescription>
            This will add {SEED_BEERS.length} popular beers to the system as check-ins from your account.
            These beers will appear in the feed and exploration features.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!isPending && !isSuccess && !isError && (
            <Alert>
              <AlertDescription>
                Sample data includes well-known beers like Pliny the Elder, Heady Topper, 
                Guinness Draught, and many more from various styles and breweries.
              </AlertDescription>
            </Alert>
          )}

          {isPending && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Publishing beer check-ins...</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-muted-foreground">
                {data?.success || 0} of {SEED_BEERS.length} beers published
              </p>
            </div>
          )}

          {isSuccess && data && (
            <Alert className="border-green-500/50 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="ml-2">
                Successfully published {data.success} beers!
                {data.failed > 0 && ` (${data.failed} failed)`}
              </AlertDescription>
            </Alert>
          )}

          {isError && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <XCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="ml-2">
                Failed to seed beers. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {!isPending && !isSuccess ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSeed} disabled={!user}>
                <Database className="h-4 w-4 mr-2" />
                Seed {SEED_BEERS.length} Beers
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} className="w-full sm:w-auto">
              {isSuccess ? 'Done' : 'Close'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
