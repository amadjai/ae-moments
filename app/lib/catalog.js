export const standardRates = [
  {
    name: "Open Air Booth",
    quoteLabel: "Open Air Booth (Prints + Digitals)",
    badge: "Flagship / best for high-end photos",
    description:
      "Sleek, compact, fits almost anywhere—and delivers the biggest “wow, we look amazing” factor.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f277f6dcf6f1903c436.png",
    features: [
      "Studio-grade mirrorless photo output",
      "Unlimited sessions during hire",
      "Instant high-quality prints available",
      "Online gallery included after event",
      "Friendly on-site attendant included"
    ],
    pricingLines: ["3hrs $760", "4hrs $880", "5hrs $1,000"],
    outputs: ["Prints", "Digitals"]
  },
  {
    name: "Mirror Booth",
    quoteLabel: "Mirror Booth (Prints + Digitals)",
    badge: "Interactive + statement piece",
    description:
      "The “walk up and play” booth guests crowd around—perfect if you want theatre + wow.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f27017707587ac557d5.png",
    features: [
      "Interactive mirror for the perfect wow factor",
      "Instant high-quality prints available",
      "Online gallery provided after event via email",
      "Luxury look that instantly elevates any event space"
    ],
    pricingLines: ["3hrs $960", "4hrs $1,080", "5hrs $1,200"],
    featured: true,
    outputs: ["Prints", "Digitals"]
  },
  {
    name: "360 Video Booth",
    quoteLabel: "360 Video Booth (360 clips)",
    badge: "Viral content energy",
    description:
      "For the hype reels, spins, dance moves, and instant share moments.",
    image: "/images/booths/360-booth.jpeg",
    features: [
      "High-energy rotating video moments",
      "Instant share-ready clips for socials",
      "Attendant-managed guest flow",
      "Branding overlays available",
      "Perfect for dancefloor or activations"
    ],
    pricingLines: ["3hrs $1,000", "4hrs $1,120", "5hrs $1,240"],
    outputs: ["Video", "Digitals"]
  },
  {
    name: "Roaming Booth",
    quoteLabel: "Roaming Booth (Digitals)",
    badge: "The booth comes to the guests",
    description:
      "Mobile camera/tripod setup that moves around the venue, capturing guests wherever the action is.",
    image: "/images/booths/roaming-booth.png",
    features: [
      "Candid, fun shots with real reactions and energy",
      "Great for large venues/outdoor spaces",
      "Ideal for corporate events and brand activations",
      "Flexible setup with fast event coverage",
      "Moves around the venue wherever the action is"
    ],
    pricingLines: [
      "Digitals only: 3hrs $1,020 | 4hrs $1,220 | 5hrs $1,420",
      "Digitals + printing: 3hrs $1,170 | 4hrs $1,370 | 5hrs $1,570"
    ],
    outputs: ["Roaming Coverage", "Digitals", "Prints (optional)"]
  },
  {
    name: "Wooden Luxe Booth",
    quoteLabel: "Wooden Luxe Booth (Prints + Digitals)",
    badge: "Double screens, double the wow",
    description:
      "Double screens for double the wow factor – photos on the front screen and a slideshow/video on the rear screen.",
    image: "/images/booths/wooden-luxe-booth.png",
    features: [
      "Latest mirrorless camera technology",
      "Unlimited sessions during hire",
      "Instant high-quality prints available",
      "Friendly on-site attendant included",
      "Both screens customisable"
    ],
    pricingLines: ["3hrs $960", "4hrs $1,080", "5hrs $1,200"],
    outputs: ["Prints", "Digitals", "Dual Screens"]
  },
  {
    name: "Long term Enclosed Booth",
    quoteLabel: "Long term Enclosed Booth (Custom quote)",
    badge: "Long-term brand activations",
    description:
      "Ultimate brand activation experience – a blank slate ready for decals and wrapping to match your branding needs.",
    image: "/images/booths/enclosed-booth.png",
    features: [
      "Constant light for consistently amazing photos",
      "Instant high-quality prints available",
      "Digital prints available",
      "Latest mirrorless camera technology",
      "QR code payment available"
    ],
    priceHeading: "Custom pricing",
    pricingLines: ["Inquire via quote"],
    outputs: ["Prints", "Digitals", "Custom Branding"]
  }
];

export const upgrades = [
  {
    id: "print-magnets",
    quoteLabel: "15x15mm magnets (sheets of 100) (min. 1 per guest, rounded up to the nearest 100) - $22",
    name: "Print magnets",
    category: "Print & Keepsakes",
    summary:
      "15x15mm magnets (sheets of 100), ideal for practical keepsakes guests can take home.",
    price: 22,
    priceLabel: "$22",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/69980411f83453b98269564f.jpeg"
  },
  {
    id: "guest-book-print",
    quoteLabel: "1 extra print for your own guest book - $55",
    name: "Guest book print service",
    category: "Print & Keepsakes",
    summary: "We print and place duplicate strips directly into your guest book.",
    price: 55,
    priceLabel: "$55",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/699804113a2afdfe2641a03f.jpg"
  },
  {
    id: "leather-guest-book",
    quoteLabel: "Leather guest book + gold pens + glue + 1 extra print - $135",
    name: "Leather guest book set",
    category: "Print & Keepsakes",
    summary: "Premium leather guest book kit styled for elegant keepsake signing.",
    price: 135,
    priceLabel: "$135",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/69980411df9bdf7b2146893f.jpg"
  },
  {
    id: "photo-album",
    quoteLabel: "Photo Album + 1 extra print - $100",
    name: "Photo album",
    category: "Print & Keepsakes",
    summary: "Commemorative event album that collects your standout moments.",
    price: 100,
    priceLabel: "$100",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/69980411df9bdf7e2e46893e.jpg"
  },
  {
    id: "polaroid-3x4",
    quoteLabel: "Upgrade to 3x4\" polaroid prints - $165",
    name: "Polaroid-style 3×4",
    category: "Print & Keepsakes",
    summary: "Retro-style mini print format with a classic border finish.",
    price: 165,
    priceLabel: "$165",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc635ea0716cddd7057a.webp"
  },
  {
    id: "postcard-4x6",
    quoteLabel: "Upgrade to 4x6\" postcard prints - $165",
    name: "Postcard 4×6",
    category: "Print & Keepsakes",
    summary: "Larger postcard print format for premium, frame-ready outputs.",
    price: 165,
    priceLabel: "$165",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/69980411f83453c9e8695653.jpg"
  },
  {
    id: "glam-booth",
    quoteLabel: "Glam booth upgrade (black & white photos) - $110",
    name: "Glam Booth (B&W Hollywood)",
    category: "Photo Styling",
    summary: "High-contrast black-and-white look with smooth, flattering skin finish.",
    price: 110,
    priceLabel: "$110",
    photo:
      "https://assets.cdn.filesafe.space/KbLyUwHy2FrboitSpuPl/media/6998041120c035c29a42093b.jpg"
  },
  {
    id: "luxury-rose-wall",
    quoteLabel: "Rose Wall hire with photo booth package - $440",
    name: "Luxury rose wall",
    category: "Photo Styling",
    summary: "Statement floral backdrop for editorial portraits and styled arrivals.",
    price: 440,
    priceLabel: "$440",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc635b7c9687ccdd63e7.webp"
  },
  {
    id: "audio-guest-book",
    quoteLabel: "Audio Guest Book (white) - $300",
    name: "Audio guest book",
    category: "Experience Add-ons",
    summary: "Capture heartfelt voice messages your couple or host can replay later.",
    price: 300,
    priceLabel: "$300",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc63000761703fba2861.webp"
  },
  {
    id: "dry-ice",
    quoteLabel: "Dry Ice Fog Machine only - $420",
    name: "Dry ice “dancing on clouds”",
    category: "Atmosphere & Entrance",
    summary: "Cloud-floor effect for cinematic first dance and reception entrance.",
    price: 420,
    priceLabel: "$420",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc630084985ede7b56a0.jpeg"
  },
  {
    id: "fireworks-dry-ice",
    quoteLabel: "Fireworks & dry ice package - from $1100",
    name: "Fireworks & Dry Ice package",
    category: "Atmosphere & Entrance",
    summary:
      "Includes 4x FW for entrance, 2x FW for cake cutting, 6x FW for first dance, plus dry ice.",
    price: 1100,
    priceLabel: "from $1,100",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc6324813cdf927d0cbb.jpg"
  },
  {
    id: "dj-service",
    quoteLabel: "DJ package + equipment - 5 hours from $1200",
    name: "DJ services",
    category: "Entertainment",
    summary: "Subject-to-availability DJ set to keep energy and dancefloor flow high.",
    price: 1200,
    priceLabel: "from $1,200",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc635ea0711e86d7057c.jpg"
  },
  {
    id: "personalised-covers",
    name: "Personalised Guest Book & Photo Album covers",
    category: "Print & Keepsakes",
    summary: "Personalise your guest book or photo album cover for your event.",
    price: 55,
    priceLabel: "$55",
    photo: "/images/upgrades/personalised-covers.jpeg"
  },
  {
    id: "spotlight-glam-booth",
    name: "Spotlight Glam Booth",
    category: "Photo Styling",
    summary: "A spotlight portrait experience with a striking glam look.",
    price: 165,
    priceLabel: "$165",
    photo: "/images/upgrades/spotlight-glam-booth.jpeg"
  },
  {
    id: "retro-video-phone",
    name: "Retro Video Booth Phone + sign only",
    category: "Experience Add-ons",
    summary: "Retro video guest book phone and sign to capture your guests’ messages.",
    price: 440,
    priceLabel: "from $440",
    photo: "/images/upgrades/retro-video-booth.jpg"
  },
  {
    id: "retro-video-full-setup",
    name: "Retro Video Booth Phone full setup",
    category: "Experience Add-ons",
    summary: "The complete setup, including phone, plinth, flowers and sign.",
    quoteLabel: "Retro Video Booth Phone full setup (including plinth + flowers + sign) - from $880",
    price: 880,
    priceLabel: "from $880",
    photo: "/images/upgrades/retro-video-booth.jpg"
  },
  {
    id: "ai-booth-experience",
    name: "AI Booth Experience",
    category: "Experience Add-ons",
    summary: "Transform guest photos with a creative AI booth experience.",
    price: 385,
    priceLabel: "from $385",
    photo: "/images/upgrades/ai-booth-experience.png"
  },
  {
    id: "trading-card-experience",
    name: "Trading Card Experience",
    category: "Print & Keepsakes",
    summary: "Custom cards in sports, Pokemon or MTG styles.",
    quoteLabel: "Trading Card Experience (sports, Pokemon style, MTG style custom cards) - from $440",
    price: 440,
    priceLabel: "from $440",
    photo: "/images/upgrades/trading-card-experience.jpeg"
  }
];

export const upgradeCategoryOrder = [
  "Print & Keepsakes",
  "Photo Styling",
  "Experience Add-ons",
  "Atmosphere & Entrance",
  "Entertainment"
];

export const getUpgradeQuoteLabel = (item) =>
  item.quoteLabel || `${item.name} - ${item.priceLabel}`;

export const quoteBoothChoices = standardRates.map((item) => item.quoteLabel);
export const quoteQuickUpgrades = [
  ...upgrades.map(getUpgradeQuoteLabel),
  "Acrylic welcome sign - from $180",
  "Acrylic seating chart - from $250"
];
