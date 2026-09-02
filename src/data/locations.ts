// Single canonical list of Antigua & Barbuda locations surfaced across the site.
// Used by the homepage search bar, the scrolling marquee, and (as a subset
// with descriptions) the Neighborhood Guide section.

export const LOCATIONS = [
  "English Harbour",
  "Falmouth Harbour",
  "Jolly Harbour",
  "Dickenson Bay",
  "Galley Bay",
  "Hodges Bay",
  "Nonsuch Bay",
  "St. John's",
  "Barbuda",
] as const;

export type LocationName = (typeof LOCATIONS)[number];

// Editorial descriptions for the Neighborhood Guide cards.
// Keys must be members of LOCATIONS to stay in sync.
export const NEIGHBORHOOD_DETAILS: Record<
  string,
  { desc: string; image: string }
> = {
  "English Harbour": {
    desc: "Historic charm meets world-class yachting",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  },
  "Jolly Harbour": {
    desc: "Waterfront living with marina lifestyle",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
  },
  "Dickenson Bay": {
    desc: "Pristine white sand and vibrant nightlife",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  "Galley Bay": {
    desc: "Quiet west-coast living near the sea",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
  },
  "Hodges Bay": {
    desc: "Modern resort living and fine dining",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
};
