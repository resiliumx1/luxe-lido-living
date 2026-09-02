import rumburgerSide from "@/assets/trailer-rumburger-side.jpg.asset.json";
import rumburgerAngle from "@/assets/trailer-rumburger-angle.jpg.asset.json";
import kitchenInterior from "@/assets/trailer-kitchen-interior.jpg.asset.json";
import containerGalvanised from "@/assets/container-unit-galvanised.jpg.asset.json";
import containerFinished from "@/assets/container-unit-finished.jpg.asset.json";
import steelChassis from "@/assets/build-steel-chassis.jpg.asset.json";
import panelAssembly from "@/assets/build-panel-assembly.jpg.asset.json";
import type { GalleryPhoto } from "@/components/PhotoGallery";

/** Real photographs from the workshop and completed deliveries — not renders. */
export const trailerRealBuilds: GalleryPhoto[] = [
  {
    src: rumburgerSide.url,
    alt: "Finished black RumBurger food trailer with orange flame branding and roof extraction fan, completed in the workshop before shipping to Antigua",
    caption:
      "RumBurger — a custom food trailer built and delivered to a customer in Antigua. Full-panel branding and roof-mounted extraction.",
  },
  {
    src: rumburgerAngle.url,
    alt: "Angled view of the delivered RumBurger food trailer showing the open serving window, hatch counters and twin-axle chassis",
    caption:
      "The same RumBurger unit — twin-axle chassis, large serving window and fold-down counters, ready for trading day one.",
  },
  {
    src: kitchenInterior.url,
    alt: "Stainless steel commercial kitchen interior of a finished food trailer with extraction hood, gas range, prep counters and roof air conditioning",
    caption:
      "Inside a finished trailer: commercial extraction hood, gas range, stainless prep counters, serving window and roof AC.",
  },
];

export const containerFinishedUnits: GalleryPhoto[] = [
  {
    src: containerGalvanised.url,
    alt: "Completed galvanised steel modular container unit with a hinged access door open, showing refrigeration equipment installed inside",
    caption: "A completed galvanised modular unit with fit-out installed, awaiting crating for shipping.",
  },
  {
    src: containerFinished.url,
    alt: "Finished white modular container unit on a blue steel base frame in the factory, ready for delivery",
    caption: "Finished modular unit on its steel base frame — inspected and ready for delivery.",
  },
];

export const containerBuildSteps: GalleryPhoto[] = [
  {
    src: steelChassis.url,
    alt: "Galvanised steel chassis members laid out and welded on a factory jig at the start of a modular unit build",
    caption: "1. Steel chassis — galvanised members welded on a jig for a true, square base.",
  },
  {
    src: panelAssembly.url,
    alt: "Wall panel assembly stage of a modular container unit, with insulated panels fixed to a galvanised steel frame in the factory",
    caption: "2. Wall panels — insulated foam-core panels fixed to the steel frame.",
  },
  {
    src: kitchenInterior.url,
    alt: "Stainless steel commercial fit-out inside a completed modular unit, showing extraction hood, range and prep counters",
    caption: "3. Fit-out — services, insulation and equipment installed inside.",
  },
  {
    src: containerFinished.url,
    alt: "Completed white modular container unit finished on its steel base frame, ready to be shipped",
    caption: "4. Delivered — inspected, crated and shipped across the Caribbean.",
  },
];
