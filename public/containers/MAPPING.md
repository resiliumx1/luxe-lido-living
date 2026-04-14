# A. Lindsay Luxe — Container Images: Mapping & Usage

## Folder structure

```
src/assets/containers/
├── hub/                    # /container-solutions hero
├── studio-home/            # homes vertical
├── family-home/
├── estate-home/
├── coffee-shop/            # commercial vertical
├── retail-popup/
├── bar-lounge/
├── restaurant/
├── office/
├── guest-cabin/            # hospitality vertical
├── pool-cabana/
├── beach-bar/
├── glamping-unit/
├── storage-unit/           # utility vertical
├── workshop/
├── site-office/
└── security-booth/
```

## File naming convention

Each product folder contains the same file set:

| File | Size | Use |
|---|---|---|
| `hero.jpg` / `hero.webp` | 1600px wide, ~280KB / ~170KB | Product detail page hero, full-bleed |
| `hero-card.jpg` / `.webp` | 800px wide, ~115KB / ~70KB | Vertical page grid cards, homepage preview |
| `hero-thumb.jpg` / `.webp` | 400px wide, ~35KB / ~25KB | Nav dropdown, related products |
| `gallery-1.jpg` through `gallery-N.jpg` | 1600px wide | Product gallery lightbox, full size |
| `gallery-N-card.jpg` / `.webp` | 800px wide | Gallery thumbnail strip |
| `gallery-N-thumb.jpg` / `.webp` | 400px wide | Small preview grids |

Total package: **~40 MB across 354 files** (59 source renders × 3 sizes × 2 formats).

## Product image counts

| Product | Hero | Gallery shots |
|---|---|---|
| studio-home | ✓ | 4 |
| family-home | ✓ | 5 |
| estate-home | ✓ | 6 |
| coffee-shop | ✓ | 4 |
| retail-popup | ✓ | 3 |
| bar-lounge | ✓ | 4 |
| restaurant | ✓ | 2 |
| office | ✓ | 0 ← needs 2-3 more renders |
| guest-cabin | ✓ | 4 |
| pool-cabana | ✓ | 1 ← could use 1-2 more |
| beach-bar | ✓ | 2 |
| glamping-unit | ✓ | 3 |
| storage-unit | ✓ | 3 |
| workshop | ✓ | 1 |
| site-office | ✓ | 0 ← needs 1-2 more |
| security-booth | ✓ | 0 ← needs 1-2 more |

Products flagged above will display fine with just a hero for now, but re-run those prompts through Gemini when you have time.

## Serving tip (how to use in React)

For best performance, use the `<picture>` element so modern browsers pick up the WebP:

```tsx
<picture>
  <source srcSet={`/src/assets/containers/estate-home/hero.webp`} type="image/webp" />
  <img src={`/src/assets/containers/estate-home/hero.jpg`} alt="The Estate" />
</picture>
```

Or if you're using Vite's image imports directly, just import the `.jpg` and it'll work. The Lovable prompt below does this automatically.
