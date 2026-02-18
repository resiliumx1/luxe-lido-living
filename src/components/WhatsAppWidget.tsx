export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/12684000000?text=Hello%20Ashante%2C%20I%27m%20interested%20in%20a%20property."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with Ashante on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="wa-pulse-ring absolute inset-0 rounded-full"
        style={{ backgroundColor: "rgba(37,211,102,0.4)" }}
      />
      {/* Button */}
      <span
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.637 4.627 1.846 6.627L2.667 29.333l6.87-1.8A13.293 13.293 0 0016.004 29.333c7.363 0 13.329-5.97 13.329-13.333S23.367 2.667 16.004 2.667zm0 24c-1.99 0-3.941-.533-5.647-1.539l-.403-.24-4.078 1.069 1.09-3.978-.263-.41A10.613 10.613 0 015.333 16c0-5.88 4.787-10.667 10.671-10.667S26.667 10.12 26.667 16 21.884 26.667 16.004 26.667zm5.84-7.973c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.24-.187.213-.347.24-.667.08-.32-.16-1.347-.497-2.563-1.587-.947-.84-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.147-.14.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.267-.627-.533-.533-.72-.547-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.827.763.333 1.36.533 1.827.68.763.24 1.467.213 2.013.133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </span>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-ocean-deep text-off-white text-xs font-sans whitespace-nowrap px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        Chat with Ashante
      </span>
    </a>
  );
}
