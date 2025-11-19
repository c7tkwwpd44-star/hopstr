# Hopstr User Guide

## Getting Started with Hopstr

Hopstr is a decentralized beer check-in app built on Nostr. Here's how to use it!

## 🍺 Browsing Beers

### How to See Beers in the System

1. **From the Home Page:**
   - Click the **"Explore Beers"** button in the hero section
   - This takes you to the Explore page

2. **On the Explore Page:**
   - You'll see two tabs: **Top Beers** and **Top Breweries**
   - Beers are ranked by number of check-ins
   - Each beer shows:
     - Beer name and style
     - Brewery name
     - Number of check-ins
     - Average rating (if rated)

3. **Search Feature:**
   - Use the search bar to filter by beer name or brewery name
   - Results update in real-time as you type
   - Works on both the Beers and Breweries tabs

### What if No Beers Show Up?

If you see "No beers found yet," it means:
- No one has checked in any beers on this Nostr relay network yet
- This is a new app, so there might not be much data yet

**Solution: Add Sample Data**
1. Make sure you're **logged in** with Nostr
2. Click the **"Seed Sample Data"** button (appears when logged in)
3. This will add 25 popular beers to get you started
4. Wait for the progress bar to complete
5. Refresh if needed - beers should now appear!

## 📝 Checking In a Beer

### How to Create a Check-In

1. **Click "Check In a Beer"** from:
   - Home page hero section
   - Floating action button (mobile)
   - Navigate to `/checkin`

2. **Fill Out the Form:**
   - **Brewery Name**: Type to search or enter a new brewery
   - **Beer Name**: Type to search or enter a new beer
   - **Beer Style**: Optional (IPA, Stout, Lager, etc.)
   - **Rating**: Optional 1-5 star rating
   - **ABV**: Optional alcohol percentage
   - **IBU**: Optional bitterness units
   - **Serving Style**: Optional (draft, bottle, can, etc.)
   - **Location**: Optional venue or location
   - **Review**: Optional tasting notes

3. **Add a Photo**: (Optional)
   - Click "Choose File" to upload a beer photo
   - Image will be uploaded to a Blossom server

4. **Submit:**
   - Click **"Post Check-In"**
   - Your check-in will be published to Nostr relays
   - It will appear in the global feed and your profile

## 🔍 Finding Beers to Check In

### Using the Beer Search

When checking in a beer, the beer name field has smart autocomplete:

1. **Click the beer name dropdown**
2. **See popular beers immediately** - no typing needed!
3. **Start typing** to filter beers
4. **Select a beer** from the list, or
5. **Type a new beer name** if it's not listed

The autocomplete shows:
- Beer name
- Brewery name
- Beer style
- Number of previous check-ins

### Using the Brewery Search

Similar to beer search:
1. Click the brewery dropdown
2. See popular breweries
3. Type to filter
4. Select or enter new brewery name

## 📱 Viewing Your Profile

1. Click your **profile icon** in the top navigation
2. See all your check-ins
3. View your stats and activity
4. Edit your profile (name, picture, bio)

## 🌐 Viewing Other Users

- Click on any user's avatar or name from a check-in
- See their profile and check-in history
- Their npub (Nostr public key) appears in the URL

## 🏠 Home Feed

The home page shows:
- **Recent check-ins** from all users on the network
- **Latest activity** sorted by time
- Each check-in displays:
  - User info
  - Beer photo (if included)
  - Beer name, brewery, style
  - Rating and review
  - ABV, IBU, serving style
  - Location
  - Time posted

## 🎯 Explore Page Features

### Top Beers Tab
- Shows beers ranked by check-in count
- Displays average rating
- Shows beer style
- Click search to filter

### Top Breweries Tab
- Shows breweries ranked by check-in count
- Displays average rating for all their beers
- Shows total check-ins per brewery

## 🔐 Login & Accounts

### How to Log In

1. Click **"Log in"** in the top navigation
2. Choose your login method:
   - **Nostr extension** (nos2x, Alby, etc.)
   - **Private key** (nsec)
   - **Create new account**

3. Your profile will be loaded automatically

### Multiple Accounts

- You can switch between accounts
- Click the account menu to see all logged-in accounts
- Add more accounts from the login menu

## 🔄 Relays

Hopstr connects to multiple Nostr relays to:
- Fetch beer check-ins from across the network
- Publish your check-ins to multiple relays
- Ensure data redundancy

Default relays:
- wss://relay.ditto.pub
- wss://relay.nostr.band
- wss://relay.damus.io

You can manage relays in Settings (coming soon).

## 📊 Data & Privacy

### What Data is Public?

- ✅ Beer check-ins (always public)
- ✅ Ratings and reviews
- ✅ Profile information (name, picture, bio)
- ✅ Photos you upload

### What Data is Private?

- ✅ Your private key (never shared)
- ✅ Your browsing activity
- ✅ Unpublished drafts

### Location Privacy

- Location tags are **optional**
- You control what location info to share
- Can share venue name without GPS coordinates
- Can share approximate location only

## 💡 Tips & Tricks

### For Best Experience

1. **Log in first** - Many features require authentication
2. **Seed sample data** - If the app is empty, add sample beers
3. **Add photos** - Make your check-ins more engaging
4. **Write reviews** - Help others discover great beers
5. **Rate beers** - Contribute to community ratings
6. **Be specific** - Include ABV, IBU, serving style when known

### Finding Great Beers

1. Check the **Explore** page for popular beers
2. Look for beers with **high ratings**
3. Read **reviews** from other users
4. Follow users with similar tastes (coming soon)

### Making Useful Check-Ins

Good check-ins include:
- ✅ Clear beer photo
- ✅ Accurate beer and brewery names
- ✅ Beer style
- ✅ Your rating
- ✅ Thoughtful tasting notes
- ✅ Serving style (important for comparison)
- ✅ Location (helps others find the beer)

## ❓ Troubleshooting

### "No beers found"
- **Cause**: No check-ins on the network yet
- **Solution**: Seed sample data or check in your first beer

### "Can't see my check-in"
- **Cause**: Relay delay or connection issue
- **Solution**: Wait a few seconds and refresh the page

### "Search not working"
- **Cause**: No matching beers in the system
- **Solution**: Try different search terms or add the beer manually

### "Upload failed"
- **Cause**: Blossom server issue
- **Solution**: Try again or skip the photo

### "Not logged in" message
- **Cause**: No Nostr account connected
- **Solution**: Click "Log in" and connect your account

## 🚀 Advanced Features

### Coming Soon

- 🏆 Achievements and badges
- 📈 Personal statistics
- 🍺 Beer wishlists
- 👥 Follow other users
- 💬 Comments on check-ins
- ⚡ Zap beers and reviews
- 🗺️ Location-based discovery
- 📱 Progressive Web App (PWA)
- 🔔 Notifications

## 📞 Support

Hopstr is built on Nostr, a decentralized protocol. There's no central support, but:

- Check the documentation in the `/docs` folder
- Ask questions on Nostr with the `#hopstr` tag
- Report issues to the app developer

## 🍻 Enjoy Responsibly!

Remember to drink responsibly and never drink and drive. Hopstr is for tracking and sharing your beer experiences, not encouraging overconsumption.

Cheers! 🍺
