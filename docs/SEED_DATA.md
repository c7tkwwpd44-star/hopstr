# Beer Seed Data System

## Overview

Hopstr includes a built-in seed data system that allows users to quickly populate the application with 25 popular, real-world beers. This is useful for:

- Testing and demonstrating the app's features
- Providing initial data for new users
- Exploring beer discovery and search functionality

## How to Use

### For End Users

1. **Log in** to Hopstr with your Nostr account
2. Navigate to one of these locations:
   - **Home page** (when no check-ins exist)
   - **Explore page** (click the "Seed Sample Data" button in the top bar)
3. Click the **"Seed Sample Data"** button
4. Review the dialog explaining what will be added
5. Click **"Seed 25 Beers"** to publish the sample data
6. Wait for the progress bar to complete
7. The beers will now appear throughout the app!

### What Gets Added

The seed data includes 25 curated beers across various styles:

**Styles Included:**
- Double IPAs (Pliny the Elder, Heady Topper, Hop Stoopid)
- Imperial Stouts (Bourbon County, KBS, The Abyss, Kentucky Brunch Brand)
- American IPAs (Bell's Two Hearted, Stone IPA, Union Jack)
- Belgian styles (La Fin Du Monde, Rochefort 10, Westmalle Tripel, Orval)
- Wheat beers (Weihenstephaner, Paulaner Hefeweizen, Aventinus)
- Classic stouts (Guinness Draught, Samuel Smith's Oatmeal Stout, Left Hand Milk Stout)
- And more!

**Each beer includes:**
- Beer name and brewery
- Style classification
- ABV (Alcohol By Volume)
- IBU (International Bitterness Units) where applicable
- Rating (4.2 - 4.8 stars)
- Detailed tasting notes and description
- Proper Nostr event tags for discovery

## Technical Details

### Files

- **`src/lib/seedData.ts`**: Contains the SEED_BEERS array with all 25 beers
- **`src/hooks/useSeedBeers.ts`**: React hook that publishes beers as Nostr events
- **`src/components/SeedDataDialog.tsx`**: UI component for the seed data dialog

### Event Structure

Each seeded beer is published as a **kind 35467** event (Beer Check-in) with:

```json
{
  "kind": 35467,
  "created_at": "<staggered timestamp>",
  "content": "<beer description>",
  "tags": [
    ["d", "seed-<unique-id>"],
    ["beer-name", "<name>"],
    ["brewery-name", "<brewery>"],
    ["beer-style", "<style>"],
    ["rating", "<rating>"],
    ["abv", "<percentage>"],
    ["ibu", "<bitterness>"],
    ["serving-style", "draft"],
    ["t", "beer"],
    ["t", "<normalized-style>"],
    ["alt", "Beer check-in: <name> - <brewery>"]
  ]
}
```

### Timestamp Staggering

Beers are published with staggered timestamps (1 hour apart, working backwards from now) to make the feed look more natural and avoid all beers having identical timestamps.

### Performance

- Publishes beers sequentially with 100ms delay between each
- Shows real-time progress bar
- Handles errors gracefully
- Reports success/failure count

## Customization

To add or modify seed data:

1. Edit `src/lib/seedData.ts`
2. Add/modify entries in the `SEED_BEERS` array
3. Each entry should include:
   - `beerName`: Full beer name
   - `breweryName`: Brewery name
   - `beerStyle`: Style category
   - `abv`: Alcohol percentage as string
   - `ibu` (optional): Bitterness units as string
   - `description`: Tasting notes and review
   - `rating`: 1-5 star rating as string

Example:
```typescript
{
  beerName: "Your Beer Name",
  breweryName: "Your Brewery",
  beerStyle: "IPA",
  abv: "7.2",
  ibu: "65",
  description: "Detailed tasting notes and review text here.",
  rating: "4.5"
}
```

## Integration Points

The seed data system integrates with:

- **Beer Check-ins**: Creates proper kind 35467 events
- **Beer Discovery**: Beers appear in the Explore page
- **Search/Autocomplete**: Beers show up in the BeerCombobox suggestions
- **User Profiles**: Check-ins appear on the user's profile
- **Home Feed**: All check-ins appear in the global feed

## Future Enhancements

Potential improvements:
- Add brewery profiles (kind 35468)
- Add beer profiles (kind 35469)
- Include beer photos
- Add location data
- Support multiple seed data sets (different regions, styles, etc.)
- Import/export custom seed data
