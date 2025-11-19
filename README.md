# 🍺 Hopstr - Decentralized Beer Check-ins on Nostr

A beautiful, modern beer check-in application built on the Nostr protocol. Share your beer experiences, discover new brews, and connect with fellow beer enthusiasts—all without centralized servers.

![Hopstr](https://img.shields.io/badge/Built%20on-Nostr-7c3aed)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)

## ✨ Features

### 🍻 **Beer Check-ins**
- **Rate & Review** - Give beers 1-5 star ratings with detailed tasting notes
- **Rich Metadata** - Track ABV, IBU, serving style, and location
- **Photo Upload** - Share photos via Blossom servers (NIP-96)
- **Smart Autocomplete** - Instantly see popular beers and breweries

### 🔍 **Discovery & Exploration**
- **Browse 25 Sample Beers** - Works instantly without login
- **Top Beers & Breweries** - See what's popular on the network
- **Search & Filter** - Find beers by name, brewery, or style
- **Real-time Updates** - See new check-ins as they happen

### 🌐 **Decentralized & Open**
- **No Sign-up Required** - Browse beers without creating an account
- **Nostr Protocol** - Your data lives on decentralized relays
- **Interoperable** - Works with any Nostr client
- **Open Source** - Fully transparent and auditable

### 🎨 **Beautiful UI**
- **Modern Design** - Polished interface with smooth animations
- **Dark/Light Mode** - Automatic theme switching
- **Responsive** - Works perfectly on mobile and desktop
- **Accessible** - WCAG 2.1 AA compliant

## 🚀 Quick Start

### For Users

1. **Visit Hopstr** (your deployment URL)
2. **Explore Beers** - Browse 25 sample beers immediately (no login needed)
3. **Log in with Nostr** - Use a browser extension (nos2x, Alby) or private key
4. **Check in a Beer** - Share your first beer experience!

### For Developers

```bash
# Clone the repository
git clone <your-repo-url>
cd hopstr

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 📋 Sample Beers

Hopstr comes with **25 curated beers** that display automatically when no Nostr events exist:

**Featured Beers:**
- 🍺 Pliny the Elder (Russian River) - Double IPA - 4.8★
- 🍺 Heady Topper (The Alchemist) - Double IPA - 4.7★
- 🍺 Guinness Draught (Guinness) - Irish Dry Stout - 4.2★
- 🍺 Weihenstephaner Hefeweissbier - Hefeweizen - 4.5★
- 🍺 Bourbon County Stout (Goose Island) - Imperial Stout - 4.6★

[See all 25 beers →](./BROWSING_BEERS.md)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS 3** - Utility-first styling
- **shadcn/ui** - Accessible component library

### Nostr Integration
- **Nostrify** - Nostr protocol framework
- **NIP-07** - Browser extension signing
- **NIP-19** - Identifier encoding (npub, nevent, naddr)
- **NIP-65** - Relay list management
- **Custom Events** - Kind 35467 for beer check-ins

### State Management
- **TanStack Query** - Data fetching and caching
- **React Context** - Global app state
- **Local Storage** - Persistent user preferences

## 📖 Documentation

- **[User Guide](./docs/USER_GUIDE.md)** - Complete guide for using Hopstr
- **[Browsing Beers](./BROWSING_BEERS.md)** - How the sample data system works
- **[Seed Data](./docs/SEED_DATA.md)** - Technical documentation for seed data
- **[Changelog](./CHANGELOG.md)** - Recent updates and changes
- **[NIP-HOPSTR](./NIP.md)** - Custom Nostr event definitions

## 🎯 Core Features Explained

### Static Fallback System

Hopstr uses a smart fallback system:

- **No Login Required** - See 25 sample beers immediately
- **Automatic Switching** - Transitions to real Nostr data when available
- **Visual Indicators** - "Sample" badges show when displaying fallback data
- **Seamless UX** - Users don't notice the difference

### Beer Check-in Event (Kind 35467)

```json
{
  "kind": 35467,
  "tags": [
    ["d", "unique-id"],
    ["beer-name", "Pliny the Elder"],
    ["brewery-name", "Russian River Brewing Company"],
    ["beer-style", "Double IPA"],
    ["rating", "4.8"],
    ["abv", "8.0"],
    ["ibu", "100"],
    ["serving-style", "draft"],
    ["location", "Oakland, CA"]
  ],
  "content": "Tasting notes and review..."
}
```

### Smart Autocomplete

- Shows **top 10 popular beers** instantly when opened
- No typing required to browse
- Search filters results in real-time
- Works with both beers and breweries

## 🗂️ Project Structure

```
hopstr/
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── auth/       # Login and auth components
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   │   ├── useBeerCheckins.ts
│   │   ├── useSeedBeers.ts
│   │   └── ...
│   ├── lib/            # Utilities and helpers
│   │   ├── seedData.ts # 25 sample beers
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Explore.tsx
│   │   ├── CheckIn.tsx
│   │   └── ...
│   └── contexts/       # React contexts
├── docs/               # Documentation
├── public/             # Static assets
└── dist/              # Build output
```

## 🔧 Configuration

### Relay Configuration

Default relays (configurable in Settings):
- `wss://relay.ditto.pub`
- `wss://relay.nostr.band`
- `wss://relay.damus.io`

### Custom Event Kinds

- **35467** - Beer Check-in (addressable)
- **35468** - Brewery Profile (addressable, not yet implemented)
- **35469** - Beer Profile (addressable, not yet implemented)

## 🌟 Key Components

### `SeedDataDialog`
One-click UI for publishing 25 sample beers to Nostr with progress tracking.

### `BeerCombobox`
Smart autocomplete showing popular beers, with search and filtering.

### `Explore Page`
Displays top beers and breweries with automatic fallback to sample data.

### `CheckIn Page`
Full-featured form for creating beer check-ins with photo upload.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Type checking
npx tsc --noEmit

# Linting
npx eslint

# Unit tests
npx vitest
```

## 📦 Building & Deployment

```bash
# Build for production
npm run build

# Output: dist/ directory
# - Optimized JavaScript bundles
# - CSS with Tailwind
# - Static assets
# - HTML with proper routing

# Deploy to Nostr
npm run deploy
```

## 🤝 Contributing

This is a decentralized project built on open protocols. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Custom NIPs

Hopstr defines custom Nostr event kinds in [NIP.md](./NIP.md):

- Beer check-ins (kind 35467)
- Brewery profiles (kind 35468)
- Beer profiles (kind 35469)

These events are designed to be interoperable with other Nostr clients.

## 🎨 Design Philosophy

- **Mobile-first** - Great experience on all screen sizes
- **Fast by default** - Optimized for performance
- **Accessible** - WCAG 2.1 AA compliance
- **Beautiful** - Apple/Stripe-level polish
- **Intuitive** - No learning curve required

## 🔒 Privacy & Security

- **No data collection** - We don't track you
- **Your keys** - You control your identity
- **Decentralized** - No single point of failure
- **Open source** - Fully auditable code
- **Optional location** - Share as much or little as you want

## 🍺 Beer Styles Supported

Our sample data includes beers across major styles:

- IPAs & Double IPAs
- Imperial Stouts
- Belgian styles (Tripel, Quad, Saison)
- Wheat Beers (Hefeweizen, Weizenbock)
- Classic Stouts
- Pale Ales
- Doppelbocks

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Roadmap

- [ ] Beer profiles (kind 35469)
- [ ] Brewery profiles (kind 35468)
- [ ] Comments on check-ins (NIP-1111)
- [ ] Zaps for great reviews (NIP-57)
- [ ] Location-based discovery
- [ ] Follow other users
- [ ] Personal statistics & achievements
- [ ] Beer wishlists
- [ ] Progressive Web App (PWA)

## 📄 License

[Your chosen license]

## 🙏 Acknowledgments

- Built with [MKStack](https://soapbox.pub/mkstack)
- Powered by [Nostr](https://nostr.com)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

## 💬 Community

- Nostr: Search for `#hopstr` tag
- Issues: [GitHub Issues](your-repo-url/issues)
- Discussions: [GitHub Discussions](your-repo-url/discussions)

---

**Built with ❤️ on Nostr**

Enjoy responsibly! 🍻
