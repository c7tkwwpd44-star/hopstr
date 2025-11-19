/**
 * Seed data for popular beers to prepopulate the system
 */

export interface SeedBeer {
  beerName: string;
  breweryName: string;
  beerStyle: string;
  abv: string;
  ibu?: string;
  description: string;
  rating: string;
}

export const SEED_BEERS: SeedBeer[] = [
  {
    beerName: "Pliny the Elder",
    breweryName: "Russian River Brewing Company",
    beerStyle: "Double IPA",
    abv: "8.0",
    ibu: "100",
    description: "A legendary West Coast Double IPA with massive hop character, balanced by a solid malt backbone. Citrus and pine dominate the aroma and flavor.",
    rating: "4.8"
  },
  {
    beerName: "Heady Topper",
    breweryName: "The Alchemist",
    beerStyle: "Double IPA",
    abv: "8.0",
    ibu: "120",
    description: "Drink from the can! This hazy, unfiltered Double IPA is bursting with tropical fruit and citrus notes. A cult classic from Vermont.",
    rating: "4.7"
  },
  {
    beerName: "Bourbon County Stout",
    breweryName: "Goose Island Beer Company",
    beerStyle: "Imperial Stout",
    abv: "14.0",
    ibu: "60",
    description: "Rich, complex imperial stout aged in bourbon barrels. Notes of vanilla, oak, chocolate, and roasted coffee with a smooth, warming finish.",
    rating: "4.6"
  },
  {
    beerName: "Hazy Little Thing",
    breweryName: "Sierra Nevada Brewing Co.",
    beerStyle: "Hazy IPA",
    abv: "6.7",
    ibu: "35",
    description: "Aggressively dry-hopped and less filtered for a smooth, juicy haze. Tropical fruit, citrus, and stone fruit flavors shine through.",
    rating: "4.3"
  },
  {
    beerName: "Guinness Draught",
    breweryName: "Guinness",
    beerStyle: "Irish Dry Stout",
    abv: "4.2",
    ibu: "45",
    description: "The iconic Irish stout with a creamy head and smooth, roasted flavor. Notes of coffee and dark chocolate with a distinctive bitter finish.",
    rating: "4.2"
  },
  {
    beerName: "Weihenstephaner Hefeweissbier",
    breweryName: "Weihenstephan",
    beerStyle: "Hefeweizen",
    abv: "5.4",
    ibu: "14",
    description: "From the world's oldest brewery, this classic Bavarian wheat beer has banana and clove notes with a refreshing, cloudy appearance.",
    rating: "4.5"
  },
  {
    beerName: "Bell's Two Hearted Ale",
    breweryName: "Bell's Brewery",
    beerStyle: "American IPA",
    abv: "7.0",
    ibu: "55",
    description: "An all-Centennial hop IPA with bright citrus and floral notes. Balanced and drinkable with a clean finish.",
    rating: "4.4"
  },
  {
    beerName: "The Abyss",
    breweryName: "Deschutes Brewery",
    beerStyle: "Imperial Stout",
    abv: "11.1",
    ibu: "80",
    description: "Dark, complex imperial stout aged in bourbon and wine barrels. Rich layers of chocolate, coffee, licorice, and dark fruit.",
    rating: "4.5"
  },
  {
    beerName: "Dogfish Head 90 Minute IPA",
    breweryName: "Dogfish Head Craft Brewery",
    beerStyle: "Imperial IPA",
    abv: "9.0",
    ibu: "90",
    description: "Continuously hopped for 90 minutes during the boil. Pungent, bold, and balanced with a caramel malt backbone.",
    rating: "4.3"
  },
  {
    beerName: "Founders KBS",
    breweryName: "Founders Brewing Co.",
    beerStyle: "Imperial Stout",
    abv: "12.0",
    ibu: "70",
    description: "Kentucky Breakfast Stout aged in bourbon barrels with coffee and chocolate. Rich, smooth, and decadent.",
    rating: "4.7"
  },
  {
    beerName: "La Fin Du Monde",
    breweryName: "Unibroue",
    beerStyle: "Belgian Tripel",
    abv: "9.0",
    ibu: "19",
    description: "A golden Belgian-style tripel with fruity esters, spicy phenols, and a hint of honey. Complex and effervescent.",
    rating: "4.4"
  },
  {
    beerName: "Stone IPA",
    breweryName: "Stone Brewing",
    beerStyle: "American IPA",
    abv: "6.9",
    ibu: "77",
    description: "Bold, assertive West Coast IPA with intense hop bitterness and citrus-forward flavors. A modern classic.",
    rating: "4.2"
  },
  {
    beerName: "Samuel Smith's Oatmeal Stout",
    breweryName: "Samuel Smith Old Brewery",
    beerStyle: "Oatmeal Stout",
    abv: "5.0",
    ibu: "35",
    description: "Silky smooth stout with oatmeal adding body and complexity. Notes of coffee, chocolate, and roasted grains.",
    rating: "4.3"
  },
  {
    beerName: "Rochefort 10",
    breweryName: "Brasserie de Rochefort",
    beerStyle: "Belgian Quadrupel",
    abv: "11.3",
    ibu: "27",
    description: "Dark, rich Trappist ale with notes of figs, dates, dark fruit, and warming alcohol. Deeply complex and contemplative.",
    rating: "4.6"
  },
  {
    beerName: "Saison Dupont",
    breweryName: "Brasserie Dupont",
    beerStyle: "Saison",
    abv: "6.5",
    ibu: "35",
    description: "The benchmark farmhouse ale. Dry, peppery, and refreshing with fruity esters and a crisp finish.",
    rating: "4.4"
  },
  {
    beerName: "Zombie Dust",
    breweryName: "3 Floyds Brewing Co.",
    beerStyle: "American Pale Ale",
    abv: "6.4",
    ibu: "50",
    description: "Citra hop-forward pale ale with intense tropical fruit and citrus character. Dangerously drinkable.",
    rating: "4.6"
  },
  {
    beerName: "Paulaner Hefe-Weizen",
    breweryName: "Paulaner Brauerei",
    beerStyle: "Hefeweizen",
    abv: "5.5",
    ibu: "12",
    description: "Classic Bavarian wheat beer with banana and clove aromas. Naturally cloudy with a smooth, refreshing taste.",
    rating: "4.2"
  },
  {
    beerName: "Kentucky Brunch Brand Stout",
    breweryName: "Toppling Goliath Brewing Company",
    beerStyle: "Imperial Stout",
    abv: "12.0",
    ibu: "60",
    description: "Coffee-infused imperial stout aged in bourbon barrels. Intensely rich with notes of maple, vanilla, and espresso.",
    rating: "4.8"
  },
  {
    beerName: "Westmalle Tripel",
    breweryName: "Brouwerij der Trappisten van Westmalle",
    beerStyle: "Belgian Tripel",
    abv: "9.5",
    ibu: "39",
    description: "The original Trappist tripel. Complex with fruity esters, spicy phenols, and a dry, bitter finish.",
    rating: "4.5"
  },
  {
    beerName: "Hop Stoopid",
    breweryName: "Lagunitas Brewing Company",
    beerStyle: "Double IPA",
    abv: "8.0",
    ibu: "102",
    description: "Massively hopped double IPA with intense citrus, pine, and tropical fruit flavors. Bold and unapologetic.",
    rating: "4.3"
  },
  {
    beerName: "Aventinus",
    breweryName: "Schneider Weisse",
    beerStyle: "Weizenbock",
    abv: "8.2",
    ibu: "16",
    description: "World's oldest wheat doppelbock. Rich, complex, with banana, clove, and dark fruit notes. A winter classic.",
    rating: "4.4"
  },
  {
    beerName: "Firestone Walker Union Jack",
    breweryName: "Firestone Walker Brewing Company",
    beerStyle: "American IPA",
    abv: "7.5",
    ibu: "70",
    description: "West Coast IPA with bright citrus and floral hop character. Crisp, clean, and highly drinkable.",
    rating: "4.3"
  },
  {
    beerName: "Orval",
    breweryName: "Brasserie d'Orval",
    beerStyle: "Belgian Pale Ale",
    abv: "6.2",
    ibu: "45",
    description: "Unique Trappist ale with Brettanomyces fermentation. Dry, funky, and complex with evolving flavors over time.",
    rating: "4.5"
  },
  {
    beerName: "Left Hand Milk Stout Nitro",
    breweryName: "Left Hand Brewing Company",
    beerStyle: "Milk Stout",
    abv: "6.0",
    ibu: "25",
    description: "Creamy nitro stout with lactose adding sweetness. Notes of roasted coffee and dark chocolate with a silky mouthfeel.",
    rating: "4.2"
  },
  {
    beerName: "Celebrator Doppelbock",
    breweryName: "Ayinger",
    beerStyle: "Doppelbock",
    abv: "6.7",
    ibu: "25",
    description: "Rich, malty German doppelbock with notes of caramel, bread, and dark fruit. Smooth and warming.",
    rating: "4.3"
  }
];
