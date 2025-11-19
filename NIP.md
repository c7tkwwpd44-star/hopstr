# NIP-HOPSTR: Beer Check-ins and Reviews

`draft` `optional`

This NIP defines a protocol for beer check-ins, reviews, and beer/brewery information on Nostr.

## Event Kinds

- `35467`: Beer Check-in (addressable)
- `35468`: Brewery Profile (addressable)
- `35469`: Beer Profile (addressable)

## Beer Check-in Event (Kind 35467)

A beer check-in represents a user's experience with a specific beer at a specific time.

**Required tags:**
- `d` - unique identifier (can be timestamp-based or uuid)
- `beer-name` - name of the beer
- `brewery-name` - name of the brewery

**Optional tags:**
- `beer-style` - style of beer (IPA, Stout, Lager, etc.)
- `rating` - numerical rating from 1-5 (can include decimals like "4.5")
- `abv` - alcohol by volume percentage
- `ibu` - International Bitterness Units
- `serving-style` - how the beer was served (draft, bottle, can, cask, etc.)
- `location` - where the check-in occurred (venue name or GPS coordinates)
- `beer-id` - unique identifier for the beer (for linking to Beer Profile events)
- `brewery-id` - unique identifier for the brewery (for linking to Brewery Profile events)
- `image` - URL to uploaded photo of the beer
- `imeta` - inline metadata for the image (as per NIP-92)
- `t` - hashtags for categorization (e.g., "beer", "ipa", "craftbeer")
- `g` - geohash for location-based discovery
- `alt` - short description for clients that don't support this kind

**Content:**
The `content` field contains the user's review text and tasting notes (plain text).

### Example

```json
{
  "kind": 35467,
  "pubkey": "...",
  "created_at": 1700000000,
  "tags": [
    ["d", "1700000000-abc123"],
    ["beer-name", "Pliny the Elder"],
    ["brewery-name", "Russian River Brewing Company"],
    ["beer-style", "Double IPA"],
    ["rating", "4.8"],
    ["abv", "8.0"],
    ["ibu", "100"],
    ["serving-style", "draft"],
    ["location", "The Trappist, Oakland, CA"],
    ["g", "9q9p1"],
    ["image", "https://example.com/beer-photo.jpg"],
    ["imeta", "url https://example.com/beer-photo.jpg", "m image/jpeg", "blurhash LEHV6nWB2yk8pyo0adR*.7kCMdnj"],
    ["t", "beer"],
    ["t", "ipa"],
    ["t", "craftbeer"],
    ["alt", "Beer check-in: Pliny the Elder - Russian River Brewing Company"]
  ],
  "content": "Absolutely fantastic! Perfectly balanced with citrus and pine notes. The bitterness is pronounced but not overwhelming. This is what a West Coast IPA should taste like.",
  "sig": "..."
}
```

## Brewery Profile Event (Kind 35468)

An addressable event containing information about a brewery.

**Required tags:**
- `d` - unique identifier for the brewery (slug or standardized name)
- `name` - brewery name

**Optional tags:**
- `location` - brewery location (city, state, country)
- `g` - geohash for the brewery location
- `founded` - year founded
- `website` - brewery website URL
- `image` - brewery logo or photo URL
- `description` - short description of the brewery
- `t` - hashtags for categorization

**Content:**
Extended description and history of the brewery (plain text).

## Beer Profile Event (Kind 35469)

An addressable event containing information about a specific beer.

**Required tags:**
- `d` - unique identifier for the beer (slug or standardized name)
- `beer-name` - name of the beer
- `brewery-id` - reference to the brewery's identifier

**Optional tags:**
- `beer-style` - style of beer
- `abv` - alcohol by volume percentage
- `ibu` - International Bitterness Units
- `description` - short description of the beer
- `image` - beer label or photo URL
- `t` - hashtags for categorization

**Content:**
Extended description of the beer, tasting notes, and other information (plain text).

## Reactions and Interactions

Users can interact with beer check-ins using standard Nostr reactions:
- Kind 7 (reactions) - like/toast a check-in
- Kind 1111 (comments) - comment on a check-in
- Kind 9735 (zaps) - zap a great review

## Discovery and Querying

Clients can query for:
- All check-ins by a user: `{ "kinds": [35467], "authors": ["<pubkey>"] }`
- Check-ins for a specific beer: `{ "kinds": [35467], "#beer-name": ["Pliny the Elder"] }`
- Check-ins by location: `{ "kinds": [35467], "#g": ["9q9p1"] }`
- Check-ins by beer style: `{ "kinds": [35467], "#beer-style": ["IPA"] }`
- Recent check-ins: `{ "kinds": [35467], "limit": 50 }`
- High-rated check-ins: Filter by `#rating` tag in client

## Implementation Notes

1. **Rating System**: Ratings are stored as strings to support decimal values. Clients should parse and validate these values.

2. **Location Privacy**: The `location` and `g` tags are optional. Users may choose to share venue names without GPS coordinates, or vice versa.

3. **Image Uploads**: Images should be uploaded using Blossom servers (NIP-B7) and referenced via the `image` tag with accompanying `imeta` metadata.

4. **Beer/Brewery Linking**: The `beer-id` and `brewery-id` tags allow linking check-ins to canonical Beer and Brewery Profile events, enabling aggregated statistics.

5. **Backwards Compatibility**: Clients that don't recognize kind 35467 should show the `alt` tag description if present.

## Privacy Considerations

Users should be aware that:
- Check-ins are public by default
- Location data may reveal patterns of behavior
- Photos may contain identifiable information
