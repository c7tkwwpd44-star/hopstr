import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Beer, Camera, MapPin, Star, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useToast } from '@/hooks/useToast';
import { LoginArea } from '@/components/auth/LoginArea';

const BEER_STYLES = [
  'IPA',
  'Double IPA',
  'Session IPA',
  'Hazy IPA',
  'Pale Ale',
  'Amber Ale',
  'Brown Ale',
  'Stout',
  'Porter',
  'Lager',
  'Pilsner',
  'Wheat Beer',
  'Hefeweizen',
  'Saison',
  'Sour',
  'Gose',
  'Barleywine',
  'Belgian Ale',
  'Blonde Ale',
  'Kolsch',
  'Other',
];

const SERVING_STYLES = ['Draft', 'Bottle', 'Can', 'Cask', 'Growler', 'Crowler'];

export default function CheckIn() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { mutate: createEvent, isPending: isPublishing } = useNostrPublish();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    beerName: '',
    breweryName: '',
    beerStyle: '',
    rating: '',
    abv: '',
    ibu: '',
    servingStyle: '',
    location: '',
    review: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select an image under 10MB',
          variant: 'destructive',
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setUploadedImageUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Not logged in',
        description: 'Please log in to check in a beer',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.beerName || !formData.breweryName) {
      toast({
        title: 'Missing information',
        description: 'Please provide at least the beer name and brewery',
        variant: 'destructive',
      });
      return;
    }

    try {
      let imageUrl = uploadedImageUrl;
      let imageMetaTags: string[][] = [];

      // Upload image if selected
      if (selectedFile && !uploadedImageUrl) {
        const tags = await uploadFile(selectedFile);
        const [[_, url]] = tags;
        imageUrl = url;
        setUploadedImageUrl(url);
        imageMetaTags = tags;
      }

      // Build tags
      const tags: string[][] = [
        ['d', `${Date.now()}-${Math.random().toString(36).substring(7)}`],
        ['beer-name', formData.beerName],
        ['brewery-name', formData.breweryName],
        ['t', 'beer'],
        ['alt', `Beer check-in: ${formData.beerName} - ${formData.breweryName}`],
      ];

      if (formData.beerStyle) tags.push(['beer-style', formData.beerStyle]);
      if (formData.rating) tags.push(['rating', formData.rating]);
      if (formData.abv) tags.push(['abv', formData.abv]);
      if (formData.ibu) tags.push(['ibu', formData.ibu]);
      if (formData.servingStyle) tags.push(['serving-style', formData.servingStyle]);
      if (formData.location) tags.push(['location', formData.location]);
      
      if (imageUrl) {
        tags.push(['image', imageUrl]);
        if (imageMetaTags.length > 0) {
          tags.push(...imageMetaTags);
        }
      }

      createEvent(
        {
          kind: 35467,
          content: formData.review,
          tags,
        },
        {
          onSuccess: () => {
            toast({
              title: 'Check-in posted!',
              description: 'Your beer check-in has been published',
            });
            navigate('/');
          },
          onError: (error) => {
            toast({
              title: 'Failed to post check-in',
              description: error.message,
              variant: 'destructive',
            });
          },
        }
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create check-in',
        variant: 'destructive',
      });
    }
  };

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
              <h1 className="text-xl font-bold">Check In</h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center space-y-6">
              <div className="bg-muted/50 rounded-full p-6 w-fit mx-auto">
                <Beer className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Login Required</h2>
                <p className="text-muted-foreground mb-6">
                  Please log in with your Nostr account to check in beers
                </p>
                <LoginArea className="w-full max-w-xs mx-auto" />
              </div>
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
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Check In a Beer</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Photo
                </CardTitle>
                <CardDescription>Add a photo of your beer (optional)</CardDescription>
              </CardHeader>
              <CardContent>
                {previewUrl ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                )}
              </CardContent>
            </Card>

            {/* Beer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beer className="h-5 w-5" />
                  Beer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="beerName">
                    Beer Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="beerName"
                    placeholder="e.g., Pliny the Elder"
                    value={formData.beerName}
                    onChange={(e) =>
                      setFormData({ ...formData, beerName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breweryName">
                    Brewery <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="breweryName"
                    placeholder="e.g., Russian River Brewing"
                    value={formData.breweryName}
                    onChange={(e) =>
                      setFormData({ ...formData, breweryName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="beerStyle">Style</Label>
                    <Select
                      value={formData.beerStyle}
                      onValueChange={(value) =>
                        setFormData({ ...formData, beerStyle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        {BEER_STYLES.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servingStyle">Serving</Label>
                    <Select
                      value={formData.servingStyle}
                      onValueChange={(value) =>
                        setFormData({ ...formData, servingStyle: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select serving" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVING_STYLES.map((serving) => (
                          <SelectItem key={serving} value={serving}>
                            {serving}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="abv">ABV %</Label>
                    <Input
                      id="abv"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8.0"
                      value={formData.abv}
                      onChange={(e) =>
                        setFormData({ ...formData, abv: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ibu">IBU</Label>
                    <Input
                      id="ibu"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.ibu}
                      onChange={(e) =>
                        setFormData({ ...formData, ibu: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating & Review */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Rating & Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    value={formData.rating}
                    onValueChange={(value) =>
                      setFormData({ ...formData, rating: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} {rating === 1 ? 'star' : 'stars'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review">Review</Label>
                  <Textarea
                    id="review"
                    placeholder="Share your thoughts about this beer..."
                    rows={4}
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({ ...formData, review: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
                <CardDescription>Where are you enjoying this beer?</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  id="location"
                  placeholder="e.g., The Trappist, Oakland, CA"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-lg border-t pt-4 -mx-4 px-4">
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={isPublishing || isUploading}
              >
                {isUploading
                  ? 'Uploading photo...'
                  : isPublishing
                  ? 'Publishing...'
                  : 'Check In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
