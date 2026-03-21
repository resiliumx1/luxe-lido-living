export interface Property {
  id: string;
  name: string;
  price: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  sqft?: string;
  parking?: number;
  pool?: boolean;
  type: "luxury" | "container" | "prefab";
  images: string[];
  description: string;
  features: string[];
  badge?: "New Listing" | "Featured" | "Under Offer";
  categoryHref: string;
}

const properties: Property[] = [
  // Luxury
  {
    id: "sunset-ridge",
    name: "Sunset Ridge Estate",
    price: "$3,200,000",
    location: "English Harbour",
    area: "English Harbour",
    beds: 5,
    baths: 4,
    sqft: "6,200 sq ft",
    parking: 3,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    description: "Perched above English Harbour, Sunset Ridge Estate offers panoramic ocean views from every room. This meticulously designed five-bedroom villa features an infinity pool, open-air dining pavilion, and lush tropical landscaping. The chef's kitchen flows into expansive living areas ideal for entertaining.",
    features: ["Infinity pool with ocean views", "Chef's kitchen with Italian appliances", "Private guest cottage", "Tropical landscaped gardens", "Home cinema room", "Hurricane-rated construction", "Solar power system", "Smart home automation"],
    badge: "Featured",
    categoryHref: "/luxury-homes",
  },
  {
    id: "hillcrest-infinity",
    name: "Hillcrest Infinity Villa",
    price: "$4,800,000",
    location: "Half Moon Bay",
    area: "Half Moon Bay",
    beds: 6,
    baths: 5,
    sqft: "8,400 sq ft",
    parking: 4,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    description: "A masterwork of modern Caribbean architecture, Hillcrest Infinity Villa dominates a hilltop overlooking Half Moon Bay. Six bedrooms, each with en-suite bathrooms, surround a central courtyard with a 20-metre infinity pool. Unrivalled privacy and breathtaking sunsets.",
    features: ["20-metre infinity pool", "360-degree panoramic views", "Six en-suite bedrooms", "Private helipad", "Wine cellar", "Outdoor kitchen and bar", "Staff quarters"],
    categoryHref: "/luxury-homes",
  },
  {
    id: "azure-cove",
    name: "Azure Cove Residence",
    price: "$2,500,000",
    location: "Jolly Harbour",
    area: "Jolly Harbour",
    beds: 4,
    baths: 3,
    sqft: "4,800 sq ft",
    parking: 2,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    description: "Set within the gated marina community of Jolly Harbour, Azure Cove offers waterfront living at its finest. Step from your terrace directly onto your private dock. Four bedrooms with floor-to-ceiling glass capture Caribbean light and sea breezes.",
    features: ["Private boat dock", "Waterfront terrace", "Floor-to-ceiling glass walls", "Gated community", "Resort-style pool", "Modern open-plan kitchen"],
    badge: "New Listing",
    categoryHref: "/luxury-homes",
  },
  {
    id: "pelican-point",
    name: "Pelican Point Villa",
    price: "$5,500,000",
    location: "St. John's",
    area: "St. John's",
    beds: 7,
    baths: 6,
    sqft: "9,600 sq ft",
    parking: 4,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    ],
    description: "The crown jewel of St. John's luxury real estate, Pelican Point is a grand estate with seven bedrooms spread across a main residence and two guest pavilions. Ideal for large families or as a boutique hospitality investment.",
    features: ["Main residence + 2 guest pavilions", "Tennis court", "Staff accommodation", "Landscaped estate grounds", "Ocean views from every level", "Commercial kitchen", "Event-ready outdoor spaces"],
    categoryHref: "/luxury-homes",
  },
  {
    id: "harbour-heights",
    name: "Harbour Heights Manor",
    price: "$2,800,000",
    location: "Jolly Harbour",
    area: "Jolly Harbour",
    beds: 4,
    baths: 4,
    sqft: "5,200 sq ft",
    parking: 2,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    description: "Elevated above Jolly Harbour with sweeping marina views, this contemporary manor blends indoor-outdoor living. Four generous bedroom suites, a rooftop terrace, and resort-style pool create a sanctuary of refined Caribbean luxury.",
    features: ["Rooftop terrace with bar", "Marina views", "Contemporary architecture", "Resort-style pool", "Home office", "Hurricane shutters"],
    categoryHref: "/luxury-homes",
  },
  {
    id: "cliffside-retreat",
    name: "The Cliffside Retreat",
    price: "$6,200,000",
    location: "Half Moon Bay",
    area: "Half Moon Bay",
    beds: 5,
    baths: 5,
    sqft: "7,800 sq ft",
    parking: 3,
    pool: true,
    type: "luxury",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    description: "Dramatically sited on a cliff edge above Half Moon Bay, this estate offers uninterrupted Atlantic Ocean views. Architectural concrete and glass design with five luxury suites, each opening onto private terraces suspended above the sea.",
    features: ["Cliff-edge infinity pool", "Atlantic Ocean panorama", "Architectural concrete design", "Five private terrace suites", "Outdoor shower garden", "Yoga pavilion"],
    badge: "Featured",
    categoryHref: "/luxury-homes",
  },

  // Container
  {
    id: "beachfront-container",
    name: "Beachfront Container Villa",
    price: "$780,000",
    location: "Jolly Harbour",
    area: "Jolly Harbour",
    beds: 3,
    baths: 2,
    sqft: "1,800 sq ft",
    parking: 1,
    pool: false,
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    description: "Steps from the sand, this three-container residence proves that sustainable living and beachfront luxury are not mutually exclusive. Open-plan living with folding glass walls that dissolve the boundary between indoors and the Caribbean Sea.",
    features: ["Beachfront location", "Folding glass walls", "Sustainable construction", "Open-plan living", "Outdoor deck", "Solar-ready roof"],
    categoryHref: "/container-homes",
  },
  {
    id: "rooftop-retreat",
    name: "Rooftop Retreat",
    price: "$1,100,000",
    location: "English Harbour",
    area: "English Harbour",
    beds: 4,
    baths: 3,
    sqft: "2,400 sq ft",
    parking: 2,
    pool: true,
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    description: "A multilevel container stack in the heart of English Harbour with a spectacular rooftop terrace and plunge pool. Four bedrooms arranged across three levels with harbour views from every floor.",
    features: ["Rooftop plunge pool", "Harbour views", "Three-level design", "Modern industrial aesthetic", "Smart home ready", "Rainwater collection"],
    badge: "New Listing",
    categoryHref: "/container-homes",
  },
  {
    id: "courtyard-oasis",
    name: "Courtyard Oasis",
    price: "$950,000",
    location: "Half Moon Bay",
    area: "Half Moon Bay",
    beds: 4,
    baths: 3,
    sqft: "2,200 sq ft",
    parking: 2,
    pool: true,
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
    description: "Four containers arranged around a central courtyard with plunge pool create an oasis of privacy. Natural ventilation, tropical landscaping, and a seamless indoor-outdoor flow define this innovative residence.",
    features: ["Central courtyard design", "Plunge pool", "Cross-ventilation optimised", "Tropical landscaping", "Covered outdoor dining", "Energy efficient"],
    categoryHref: "/container-homes",
  },
  {
    id: "ocean-loft",
    name: "Open-Plan Ocean Loft",
    price: "$620,000",
    location: "St. John's",
    area: "St. John's",
    beds: 2,
    baths: 2,
    sqft: "1,200 sq ft",
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    description: "A sleek two-container conversion in St. John's featuring soaring ceilings, polished concrete floors, and a mezzanine bedroom overlooking the Caribbean Sea. Perfect for couples or a rental investment.",
    features: ["Mezzanine bedroom", "Polished concrete floors", "Ocean views", "Industrial-chic design", "Low maintenance"],
    categoryHref: "/container-homes",
  },
  {
    id: "jungle-loft",
    name: "The Jungle Loft",
    price: "$520,000",
    location: "English Harbour",
    area: "English Harbour",
    beds: 2,
    baths: 1,
    sqft: "1,000 sq ft",
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    ],
    description: "Tucked into the tropical canopy near English Harbour, The Jungle Loft is an eco-conscious container home that embraces its natural surroundings. A wraparound deck and floor-to-ceiling glass bring the rainforest indoors.",
    features: ["Rainforest setting", "Wraparound deck", "Eco-conscious design", "Floor-to-ceiling glass", "Off-grid capable"],
    categoryHref: "/container-homes",
  },
  {
    id: "sunset-container",
    name: "Sunset Container Suite",
    price: "$890,000",
    location: "Jolly Harbour",
    area: "Jolly Harbour",
    beds: 3,
    baths: 2,
    sqft: "1,600 sq ft",
    parking: 1,
    pool: false,
    type: "container",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    description: "West-facing in Jolly Harbour, this container suite is designed to capture Antigua's legendary sunsets. Three bedrooms, modern finishes, and a generous rooftop deck for sundowners and stargazing.",
    features: ["West-facing sunset views", "Rooftop deck", "Modern finishes", "Three bedrooms", "Marina proximity"],
    categoryHref: "/container-homes",
  },

  // Prefab
  {
    id: "palm-grove",
    name: "Palm Grove Prefab Villa",
    price: "$420,000",
    location: "St. John's",
    area: "St. John's",
    beds: 3,
    baths: 2,
    sqft: "1,800 sq ft",
    parking: 1,
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    description: "A beautifully designed prefab home nestled among palm trees in St. John's. Three bedrooms, modern open-plan living, and a covered veranda for alfresco Caribbean dining. Factory-built precision, island charm.",
    features: ["Covered veranda", "Open-plan living", "Factory-built precision", "Hurricane-rated", "Energy efficient", "Quick assembly"],
    categoryHref: "/prefab-homes",
  },
  {
    id: "caribbean-sunrise",
    name: "Caribbean Sunrise Cottage",
    price: "$295,000",
    location: "Jolly Harbour",
    area: "Jolly Harbour",
    beds: 2,
    baths: 2,
    sqft: "1,200 sq ft",
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    description: "An affordable entry into Caribbean property, this two-bedroom prefab cottage is perfect for couples, retirees, or rental investors. East-facing orientation captures every morning sunrise over the harbour.",
    features: ["East-facing sunrise views", "Affordable luxury", "Two generous bedrooms", "Low maintenance", "Rental-ready"],
    categoryHref: "/prefab-homes",
  },
  {
    id: "harbour-view-prefab",
    name: "Harbour View Prefab",
    price: "$510,000",
    location: "English Harbour",
    area: "English Harbour",
    beds: 3,
    baths: 3,
    sqft: "2,000 sq ft",
    parking: 1,
    pool: false,
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    ],
    description: "Overlooking the historic English Harbour, this prefab home delivers three bedrooms and contemporary design at a fraction of traditional build costs. Assembled in under 12 weeks.",
    features: ["Harbour views", "12-week assembly", "Three en-suite bedrooms", "Contemporary design", "Weather-resistant materials"],
    categoryHref: "/prefab-homes",
  },
  {
    id: "coral-bay",
    name: "Coral Bay Prefab",
    price: "$380,000",
    location: "Half Moon Bay",
    area: "Half Moon Bay",
    beds: 3,
    baths: 2,
    sqft: "1,600 sq ft",
    parking: 1,
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    description: "Set near the pristine sands of Half Moon Bay, Coral Bay Prefab offers three bedrooms, a sun-drenched patio, and smart home features — all precision-manufactured for Caribbean durability.",
    features: ["Near Half Moon Bay beach", "Sun-drenched patio", "Smart home features", "Caribbean-rated construction", "Three bedrooms"],
    categoryHref: "/prefab-homes",
  },
  {
    id: "tradewind-villa",
    name: "Tradewind Villa",
    price: "$640,000",
    location: "St. John's",
    area: "St. John's",
    beds: 4,
    baths: 3,
    sqft: "2,400 sq ft",
    parking: 2,
    pool: false,
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    ],
    description: "The most spacious prefab in our portfolio, Tradewind Villa features four bedrooms, a double carport, and expansive indoor-outdoor living areas. Designed to harness the Caribbean trade winds for natural cooling.",
    features: ["Natural cross-ventilation", "Four bedrooms", "Double carport", "Expansive living areas", "Energy efficient design", "Customizable layout"],
    categoryHref: "/prefab-homes",
  },
  {
    id: "skyview-prefab",
    name: "Skyview Prefab",
    price: "$725,000",
    location: "English Harbour",
    area: "English Harbour",
    beds: 4,
    baths: 3,
    sqft: "2,600 sq ft",
    parking: 2,
    pool: true,
    type: "prefab",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    ],
    description: "Premium prefab living in English Harbour with four bedrooms, a rooftop observation deck, and a plunge pool. Floor-to-ceiling windows frame harbour views from every room. The pinnacle of prefab luxury.",
    features: ["Rooftop observation deck", "Plunge pool", "Floor-to-ceiling windows", "Harbour views", "Premium finishes", "Solar power ready"],
    badge: "New Listing",
    categoryHref: "/prefab-homes",
  },
];

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertiesByType(type: Property["type"]): Property[] {
  return properties.filter((p) => p.type === type);
}

export function getSimilarProperties(id: string, limit = 3): Property[] {
  const current = getPropertyById(id);
  if (!current) return properties.slice(0, limit);
  return properties
    .filter((p) => p.id !== id && (p.area === current.area || p.type === current.type))
    .slice(0, limit);
}

export default properties;
