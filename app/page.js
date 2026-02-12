"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

const proofStrip = [
  "Professional Standard Gear",
  "Friendly Attendant Included",
  "Unlimited Sessions + Prints + Online Gallery",
  "100+ Google Reviews (rated “Excellent”)"
];

const uspSteps = [
  {
    icon: "◎",
    title: "Canon Mirrorless Camera",
    detail: "crisp detail + flattering skin tones"
  },
  {
    icon: "✦",
    title: "Studio Flash Lighting",
    detail: "consistent results in any venue lighting (even dark receptions)"
  },
  {
    icon: "▣",
    title: "Dye-Sub Lab Printing",
    detail: "fast, vibrant, smudge-proof keepsakes"
  },
  {
    icon: "◌",
    title: "Pro Booth Software",
    detail: "quick flow, reliable printing, zero awkward delays"
  }
];

const uspGalleryMedia = [
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea52c952d96af3e3b6.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aeaa41b8733c9917f81.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7f6dcf403b054768.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7305aa276b75fcec.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7f6dcf717005476c.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aeaa41b8783b0917f80.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aeaa41b873f29917f82.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7305aa6f1075fceb.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7f6dcf6c7c05476a.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7f6dcf4a78054769.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7305aad98575fced.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c3aea7f6dcfa79105476b.jpg"
];

const audiences = [
  {
    illustration: "dial",
    name: "Weddings",
    copy: "For couples who want frame-worthy photos and a team that understands wedding timelines—from cocktail hour to dancefloor."
  },
  {
    illustration: "bars",
    name: "Corporate Events & Brand Activations",
    copy: "For brands that need high participation and high-volume content—fast. Perfect for launches, conferences, EOFY and activations."
  },
  {
    illustration: "sync",
    name: "Private Parties & Milestones",
    copy: "Birthdays, engagements, anniversaries, formals—premium fun without cheap-looking prints."
  }
];

const audiencePartnerLogos = [
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b0cfbcd72ed672c84b.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b0bfda3ca0d23bc65d.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b0bfda3c5fbe3bc65c.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b0bfe00f27e6f7f39a.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b07f6dcf306d384dc0.png",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d58b0bfe00fd241f7f399.png"
];

const audienceIllustrationImages = {
  dial: "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2e6ca41b87e4da8fb24c.png",
  bars: "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c04f57305aa09b06d58d4.jpg",
  sync: "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c04f652c95251f1eb398d.jpg"
};

const standardRates = [
  {
    name: "Open Air Booth",
    badge: "Flagship / best for high-end photos",
    description:
      "Sleek, compact, fits almost anywhere—and delivers the biggest “wow, we look amazing” factor.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f277f6dcf6f1903c436.png",
    features: [
      "Studio-grade mirrorless photo output",
      "Unlimited sessions during hire",
      "Instant dye-sub prints available",
      "Online gallery included after event",
      "Friendly on-site attendant included"
    ],
    pricingLines: ["3hrs $730", "4hrs $850", "5hrs $970"],
    outputs: ["Prints", "Digitals"]
  },
  {
    name: "Mirror Booth",
    badge: "Interactive + statement piece",
    description:
      "The “walk up and play” booth guests crowd around—perfect if you want theatre + wow.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f27017707587ac557d5.png",
    features: [
      "Interactive mirror experience guests love",
      "Unlimited sessions during hire",
      "Fast high-quality lab prints",
      "Digital gallery for instant sharing",
      "Best for high-traffic event moments"
    ],
    pricingLines: ["3hrs $930", "4hrs $1,050", "5hrs $1,170"],
    featured: true,
    outputs: ["Prints", "Digitals"]
  },
  {
    name: "360 Video Booth",
    badge: "Viral content energy",
    description:
      "For the hype reels, spins, dance moves, and instant share moments.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f277305aa17ea747c77.png",
    features: [
      "High-energy rotating video moments",
      "Instant share-ready clips for socials",
      "Attendant-managed guest flow",
      "Branding overlays available",
      "Perfect for dancefloor or activations"
    ],
    pricingLines: ["3hrs $980", "4hrs $1,100", "5hrs $1,220"],
    outputs: ["Video", "Digitals"]
  },
  {
    name: "Roaming Booth",
    badge: "The booth comes to the guests",
    description:
      "Photographer-style roaming—perfect for cocktail hour, big venues, and guests who won’t queue.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f2752c952b70bf254ff.png",
    features: [
      "Photographer-style roaming coverage",
      "Captures guests who do not queue",
      "Great for cocktail hour and large venues",
      "Fast digital delivery flow",
      "Optional print-enabled roaming setup"
    ],
    pricingLines: [
      "Digitals only: 3hrs $1,000 | 4hrs $1,200 | 5hrs $1,400",
      "Digitals + printing: 3hrs $1,150 | 4hrs $1,300 | 5hrs $1,550"
    ],
    layout: "horizontal",
    outputs: ["Roaming Coverage", "Digitals", "Prints (optional)"]
  }
];

const bundles = [
  {
    name: "Mirror Essentials Bundle",
    label: "Small Events",
    tier: "silver",
    tierCopy: "Starter value bundle",
    bestFor: "Best for: Small events (max 100 people)",
    intro:
      "A premium single-booth setup + the key upgrades people usually add later.",
    includes: [
      "Mirror Booth (4hrs) — $1,050",
      "Glam Booth (B&W Hollywood) — $110",
      "Guest Book Print Service — $55",
      "Signature Guest Book Set — $135"
    ],
    trueCost: "$1,350",
    bundlePrice: "$1,249",
    savings: "$101",
    why: [
      "One feature station = simple + elegant",
      "Guest book is handled for you",
      "Glam makes every shot look high-end"
    ]
  },
  {
    name: "Corporate Brand Experience Bundle",
    label: "Most Popular",
    tier: "gold",
    tierCopy: "High-engagement bundle",
    featured: true,
    bestFor:
      "Best for: Corporate events (activations, EOFY, conferences, brand nights)",
    intro:
      "Built for engagement + variety + content volume (without wedding-only production).",
    includes: [
      "Mirror Booth (4hrs) — $1,050",
      "360 Booth (4hrs) — $1,100",
      "Roaming Booth (4hrs, digitals only) — $1,200",
      "Print Upgrade (Postcard 4×6 or Polaroid 3×4) — $165",
      "Glam Booth — $110"
    ],
    trueCost: "$3,625",
    bundlePrice: "$3,190",
    savings: "$435",
    why: [
      "Three experiences = higher participation",
      "More content (360 clips + roaming moments + prints)",
      "Shorter lines and better flow",
      "Better coverage of networking + highlights"
    ]
  },
  {
    name: "Wedding Takeover Ultimate Bundle",
    label: "Best Value",
    tier: "platinum",
    tierCopy: "Complete wedding takeover",
    bestFor: "Best for: Large weddings (300+ people)",
    intro:
      "The only bundle intentionally built for weddings because it covers every moment: cocktail hour → reception → dancefloor → the cinematic highlight.",
    includes: [
      "Open Air Booth (4hrs) — $850",
      "Mirror Booth (4hrs) — $1,050",
      "360 Booth (4hrs) — $1,100",
      "Roaming Booth (4hrs, digitals + printing) — $1,300",
      "Atmospheric Waltz (Dry Ice) — $420",
      "Luxury Rose Wall — $440",
      "Audio Guest Book — $300",
      "Glam Booth — $110",
      "Guest Book Print Service — $55",
      "Signature Guest Book Set — $135",
      "Print Upgrade (Polaroid 3×4 or Postcard 4×6) — $165",
      "Commemorative Photo Album — $100"
    ],
    trueCost: "$6,025",
    bundlePrice: "$4,990",
    savings: "$1,035",
    why: [
      "Captures the entire night (not just one corner)",
      "Maximum variety for every guest type",
      "Faster throughput, fewer queues",
      "More take-home value (guest book + album + upgraded prints + audio messages)",
      "The wow moment (dry ice + rose wall = full experience)"
    ]
  }
];

const included = [
  "Delivery, setup, pack-down, travel (standard zone)",
  "Dedicated booth host/attendant (full hire)",
  "Custom-designed print template matched to your theme",
  "Unlimited sessions + unlimited prints (where printing is included)",
  "Private online gallery for high-res downloads",
  "Props (or go prop-less for a clean editorial look)",
  "Backdrop included (subject to availability)"
];

const bookingAccessDetails = [
  {
    title: "Attendant included",
    meta: "Dedicated booth host, full hire"
  },
  {
    title: "Unlimited sessions",
    meta: "Unlimited prints where printing is included"
  },
  {
    title: "Custom print template",
    meta: "Matched to your event theme"
  },
  {
    title: "Private online gallery",
    meta: "High-res download access"
  }
];

const upgrades = [
  {
    id: "guest-book-print",
    name: "Guest book print service",
    category: "Print & Keepsakes",
    summary: "We print and place duplicate strips directly into your guest book.",
    price: 55,
    priceLabel: "$55",
    photo: uspGalleryMedia[0]
  },
  {
    id: "leather-guest-book",
    name: "Leather guest book set",
    category: "Print & Keepsakes",
    summary: "Premium leather guest book kit styled for elegant keepsake signing.",
    price: 135,
    priceLabel: "$135",
    photo: uspGalleryMedia[1]
  },
  {
    id: "photo-album",
    name: "Photo album",
    category: "Print & Keepsakes",
    summary: "Commemorative event album that collects your standout moments.",
    price: 100,
    priceLabel: "$100",
    photo: uspGalleryMedia[2]
  },
  {
    id: "polaroid-3x4",
    name: "Polaroid-style 3×4",
    category: "Print & Keepsakes",
    summary: "Retro-style mini print format with a classic border finish.",
    price: 165,
    priceLabel: "$165",
    photo: uspGalleryMedia[3]
  },
  {
    id: "postcard-4x6",
    name: "Postcard 4×6",
    category: "Print & Keepsakes",
    summary: "Larger postcard print format for premium, frame-ready outputs.",
    price: 165,
    priceLabel: "$165",
    photo: uspGalleryMedia[4]
  },
  {
    id: "glam-booth",
    name: "Glam Booth (B&W Hollywood)",
    category: "Photo Styling",
    summary: "High-contrast black-and-white look with smooth, flattering skin finish.",
    price: 110,
    priceLabel: "$110",
    photo: uspGalleryMedia[5]
  },
  {
    id: "luxury-rose-wall",
    name: "Luxury rose wall",
    category: "Photo Styling",
    summary: "Statement floral backdrop for editorial portraits and styled arrivals.",
    price: 440,
    priceLabel: "$440",
    photo: uspGalleryMedia[6]
  },
  {
    id: "audio-guest-book",
    name: "Audio guest book",
    category: "Experience Add-ons",
    summary: "Capture heartfelt voice messages your couple or host can replay later.",
    price: 300,
    priceLabel: "$300",
    photo: uspGalleryMedia[7]
  },
  {
    id: "dry-ice",
    name: "Dry ice “dancing on clouds”",
    category: "Atmosphere & Entrance",
    summary: "Cloud-floor effect for cinematic first dance and reception entrance.",
    price: 420,
    priceLabel: "$420",
    photo: uspGalleryMedia[8]
  },
  {
    id: "fireworks-dry-ice",
    name: "Grand entrance fireworks + dry ice",
    category: "Atmosphere & Entrance",
    summary: "Full wow-moment package for dramatic stage reveal and spotlight entry.",
    price: 1100,
    priceLabel: "from $1,100",
    photo: uspGalleryMedia[9]
  },
  {
    id: "dj-service",
    name: "DJ services",
    category: "Entertainment",
    summary: "Subject-to-availability DJ set to keep energy and dancefloor flow high.",
    price: 1200,
    priceLabel: "from $1,200",
    photo: uspGalleryMedia[10]
  }
];

const upgradeCategoryOrder = [
  "Print & Keepsakes",
  "Photo Styling",
  "Experience Add-ons",
  "Atmosphere & Entrance",
  "Entertainment"
];

const compareRows = [
  {
    label: "Image quality consistency",
    ae: "Mirrorless camera + studio flash + pro processing",
    typical: "Tablet camera + mixed venue lighting"
  },
  {
    label: "Print finish and speed",
    ae: "Fast dye-sub lab prints, vibrant and smudge-proof",
    typical: "Slower output and inconsistent print color"
  },
  {
    label: "Guest flow and service",
    ae: "Dedicated attendant + smooth queue control",
    typical: "Basic operation with limited flow support"
  },
  {
    label: "Coverage and content variety",
    ae: "Booth + 360 + roaming options in one plan",
    typical: "Single setup with limited content variety"
  },
  {
    label: "Setup reliability",
    ae: "Early setup, tested gear, contingency-ready workflow",
    typical: "Standard setup with variable reliability"
  },
  {
    label: "Take-home guest value",
    ae: "Premium prints + online gallery + optional guest book",
    typical: "Basic outputs and limited keepsake options"
  }
];

const googleLogoUrl =
  "https://www.gstatic.com/images/branding/product/2x/gsa_64dp.png";

const socialProofGalleryMedia = [
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3c6df83a6790.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfe00f6882f6a10f.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bcfbcd7a7ca71601d.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3c50213a6791.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfe00f6b45f6a10e.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501b7f6dcf215336e825.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bcfbcd76445716021.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bcfbcd70bbb716022.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3cb8b43a6792.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3c8ca43a6794.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bcfbcd76f7c716023.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfe00f165ff6a110.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3c6a6e3a6795.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfe00f4d57f6a111.jpg",
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d501bbfda3c1a773a6793.jpg"
];

const socialProofReviews = [
  {
    author: "Fatima Hosain",
    role: "Google Review",
    summary:
      "Praised Andrew and the team for smooth setup and standout photo booth quality with the dry-ice dance effect."
  },
  {
    author: "Ezra Garrett",
    role: "Google Review",
    summary:
      "Said the team was professional and easy to work with, and highly recommended AE Moments for event quality."
  },
  {
    author: "Adrian Aidasani",
    role: "Google Review",
    summary:
      "Called out high-quality photos and top-tier service, noting the booth looked premium and polished on-site."
  },
  {
    author: "Christian Husni",
    role: "Google Review",
    summary:
      "Mentioned the setup looked elegant, photos came out amazing, and communication stayed clear throughout."
  },
  {
    author: "Ricky Mulia",
    role: "Google Review",
    summary:
      "Shared that the team was reliable and professional, helping keep the event flow clean and stress-free."
  }
];

const founderQuote = {
  author: "Andrew Chung",
  role: "Founder of AE Moments",
  text:
    "I built our first booth for my own wedding when nothing felt right. It worked so well friends asked us next, and that became AE Moments."
};

const spotlightReview = {
  author: "Fatima Hosain",
  role: "Google Review",
  quote:
    "Hired Andrew for the photobooth and fog machine at our wedding. The setup looked beautiful and the photos turned out amazing."
};

const logistics = [
  {
    title: "Space & Power",
    detail:
      "Allow approx 3m (W) × 3m (D) × 2.7m (H) with one nearby power point.",
    icon: "⌂"
  },
  {
    title: "Seamless Setup",
    detail:
      "Setup and pack-down are included. We arrive early so guests only see the polished final setup.",
    icon: "◔"
  },
  {
    title: "Fully Insured",
    detail:
      "AE Moments operates with public liability insurance for venue compliance and peace of mind.",
    icon: "✓"
  },
  {
    title: "Travel Clarity",
    detail:
      "Standard pricing includes travel within 30 minutes of Lidcombe (Angel Storage). Beyond that, travel is pro-rata at $70/hr + parking. Minimum hires may apply.",
    icon: "↗"
  }
];

const siteLogoUrl =
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png";
const instagramUrl = "https://www.instagram.com/aemoments.au";
const facebookUrl = "https://www.facebook.com/aemoments.au";
const contactEmail = "admin@aemoments.com.au";
const contactPhone = "+61 452 195 855";
const contactPhoneHref = "tel:+61452195855";

const faqs = [
  {
    question:
      "What makes AE Moments different from a “normal” photo booth?",
    answer:
      "AE Moments runs a StudioBooth system: mirrorless camera, controlled studio flash, pro booth software, and dye-sub printing. This combination creates sharper photos, better skin tones, and consistent results regardless of venue lighting."
  },
  {
    question: "What’s included in the price?",
    answer:
      "Every booking includes setup/pack-down, attendant, custom print template, unlimited sessions, unlimited prints where printing is selected, and a private online gallery. Standard travel zone is included."
  },
  {
    question: "How much space do you need and what do we need to provide?",
    answer:
      "Plan for around 3m by 3m with 2.7m ceiling height and one power point. We bring the booth system, lighting, and operational setup."
  },
  {
    question:
      "When do you set up and will guests see equipment being installed?",
    answer:
      "Setup is handled before guest-facing time whenever possible. The team arrives early and aims for a polished final setup before your key event moments."
  },
  {
    question: "Do guests get prints and digitals?",
    answer:
      "Yes. Most booth options include both prints and digitals. Roaming can be booked as digitals-only or digitals + printing."
  },
  {
    question: "Can you match our wedding theme / branding?",
    answer:
      "Yes. Print templates are custom-designed for your event style or brand look so your output feels cohesive."
  },
  {
    question:
      "Do you travel outside Sydney, and how does travel pricing work?",
    answer:
      "Travel inside the standard zone is included. Beyond that, travel is charged pro-rata at $70/hr plus parking when applicable."
  },
  {
    question: "Which booth should I choose for my event?",
    answer:
      "Share your guest count, venue details, and vibe. AE Moments will recommend the best mix for flow, throughput, and the look you want."
  }
];

const heroTestimonialsLeft = [
  {
    text: "The photos looked insanely premium. Huge difference from normal booths.",
    author: "Sophie R"
  },
  {
    text: "Setup was smooth and the attendant kept everything flowing all night.",
    author: "Marcus T"
  },
  {
    text: "Our guests were obsessed with the print quality and lighting.",
    author: "Ethan J"
  },
  {
    text: "Love the flexibility—our brand looks amazing on this setup.",
    author: "Chloe D"
  }
];

const heroTestimonialsRight = [
  {
    text: "Exactly what we needed for a polished wedding guest experience.",
    author: "Daniel K"
  },
  {
    text: "Beautiful output, fast service, and zero awkward delays.",
    author: "Amelia R"
  },
  {
    text: "Would book again for our next corporate activation.",
    author: "Leo M"
  },
  {
    text: "Clean design, modern feel, and excellent support team.",
    author: "Sofia L"
  }
];

const heroReviewerAvatars = [
  "https://lh3.googleusercontent.com/a-/ALV-UjULkwbMs2eA0VJVIpd7hyeyEPKfNFJtzW0GnJsR7Dg0bwUdJs29=w144-h144-p-rp-mo-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjUzz-lvUu1vmOAcckRmuuDotFK93vXaObv5ZIbwCcNIVxkPLGQi=w144-h144-p-rp-mo-ba2-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjVMc_vkFmOcPLOjxeSPqrOwO1-91DNkO26q8o7dEN-VeeRgUHLg=w144-h144-p-rp-mo-ba3-br100",
  "https://lh3.googleusercontent.com/a-/ALV-UjX6hjlU2k3DO5wZHrE0D1df0MeVIG6yVd_SQ193SUNQ3ppS_FCI6Q=w144-h144-p-rp-mo-ba2-br100"
];
const tickerSlots = ["slot-top", "slot-center", "slot-bottom"];

function StandardCard({ item }) {
  return (
    <article
      className={`card package-card ${item.featured ? "featured" : ""} ${
        item.layout === "horizontal" ? "horizontal" : ""
      }`}
      data-reveal
    >
      {item.image && (
        <div className="package-visual">
          <img
            src={item.image}
            alt={`${item.name} sample`}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="package-card-head">
        <div className="package-head-row">
          <h3>{item.name}</h3>
          <p className="card-badge">{item.badge}</p>
        </div>
        <p className="package-desc">{item.description}</p>
      </div>
      <div className="package-rule" aria-hidden="true" />
      <ul className="package-feature-list">
        {item.features.map((feature) => (
          <li key={feature}>
            <span className="package-check" aria-hidden="true">
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="output-list package-output-list">
        {item.outputs.map((output) => (
          <span key={output} className="chip">
            {output}
          </span>
        ))}
      </div>
      <div className="package-price-block">
        <p className="package-price-label">Rates</p>
        <div className="package-price-lines">
          {item.pricingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <a href="#quote" className="package-action">
        Get Started
      </a>
    </article>
  );
}

function UspPointCard({ step, number }) {
  return (
    <article className="usp-point-card" data-reveal>
      <div className="usp-point-head">
        <p className="usp-point-number">{String(number).padStart(2, "0")}</p>
        <span className="usp-point-icon" aria-hidden="true">
          {step.icon}
        </span>
      </div>
      <h3>{step.title}</h3>
      <p>{step.detail}</p>
    </article>
  );
}

function AudienceIllustration({ type, label }) {
  return (
    <img
      className="audience-illus-image"
      src={audienceIllustrationImages[type]}
      alt={`${label} illustration`}
      loading="lazy"
      decoding="async"
    />
  );
}

function BundleCard({ item }) {
  return (
    <article
      className={`card bundle-card ${item.featured ? "featured" : ""}`}
      data-reveal
    >
      <div className={`bundle-tier-card ${item.tier}`}>
        <p className="bundle-tier-name">{item.tier} value pass</p>
        <p className="bundle-tier-brand">AE Moments</p>
        <p className="bundle-tier-copy">{item.tierCopy}</p>
        <p className="bundle-tier-save">Save {item.savings}</p>
      </div>
      <div className="bundle-top">
        <p className="bundle-plan">4-hour bundle</p>
        <p className="bundle-pill">{item.label}</p>
      </div>
      <h3>{item.name}</h3>
      <p className="meta">{item.bestFor}</p>
      <p>{item.intro}</p>
      <div className="bundle-pricing">
        <p className="bundle-price-row bundle-price-old">
          <span>True cost</span> <s>{item.trueCost}</s>
        </p>
        <p className="bundle-price-row bundle-price-now">
          <span>Bundle price</span> <strong>{item.bundlePrice}</strong>
        </p>
        <p className="save">Save {item.savings}</p>
      </div>
      <h4>Includes</h4>
      <ul className="line-list bundle-includes">
        {item.includes.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
      <h4>Why it works</h4>
      <ul className="line-list bundle-why">
        {item.why.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
      <a href="#quote" className="package-action bundle-action">
        Get Quote / Check Availability
      </a>
    </article>
  );
}

function FAQItem({ item, index, activeFaq, setActiveFaq }) {
  const expanded = activeFaq === index;

  return (
    <article className={`faq-item ${expanded ? "expanded" : ""} is-visible`}>
      <button
        className="faq-question"
        onClick={() => setActiveFaq(expanded ? -1 : index)}
        aria-expanded={expanded}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span>{item.question}</span>
        <span className="faq-icon">{expanded ? "−" : "+"}</span>
      </button>
      <div
        className="faq-answer"
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <p>{item.answer}</p>
      </div>
    </article>
  );
}

function SocialProofSection() {
  return (
    <section className="section social-proof-v2" id="reviews">
      <div className="container social-proof-shell">
        <div className="social-proof-top">
          <article className="sp-panel sp-intro" data-reveal>
            <p className="sp-kicker">What our clients say</p>
            <h2>Proof your event is in expert hands.</h2>
            <p className="sp-intro-copy">
              From wedding timelines to high-volume activations, clients trust
              AE Moments to deliver clear communication, premium output, and a
              smooth guest experience.
            </p>
            <p className="sp-note">
              Real feedback sourced from public Google Reviews for AE Moments.
            </p>
          </article>

          <article className="sp-panel sp-spotlight" data-reveal>
            <p className="sp-spotlight-title">Spotlight</p>
            <blockquote className="sp-quote">“{spotlightReview.quote}”</blockquote>
            <div className="sp-person">
              <span className="sp-avatar" aria-hidden="true">
                {spotlightReview.author
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <p className="sp-person-name">{spotlightReview.author}</p>
              <p className="sp-person-role">{spotlightReview.role}</p>
            </div>
          </article>
        </div>

        <div className="sp-gallery-ticker" data-reveal>
          <div className="sp-gallery-track" aria-hidden="true">
            {[...socialProofGalleryMedia, ...socialProofGalleryMedia].map(
              (media, index) => (
                <figure key={`${media}-${index}`} className="sp-gallery-item">
                  <img
                    src={media}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )
            )}
          </div>
        </div>

        <div className="sp-review-grid" data-reveal>
          {socialProofReviews.map((review) => (
            <article key={review.author} className="sp-review-card">
              <div className="sp-review-top">
                <div className="sp-review-google">
                  <img src={googleLogoUrl} alt="" aria-hidden="true" />
                  <span>Google</span>
                </div>
                <p className="sp-review-stars">★★★★★</p>
              </div>
              <p className="sp-review-text">“{review.summary}”</p>
              <div className="sp-review-meta">
                <span className="sp-review-avatar" aria-hidden="true">
                  {review.author
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <p className="sp-review-author">{review.author}</p>
                  <p className="sp-review-role">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("standard");
  const [activeFaq, setActiveFaq] = useState(0);
  const [isAccessFlipped, setIsAccessFlipped] = useState(false);
  const [leftVisible, setLeftVisible] = useState([0, 1, 2]);
  const [rightVisible, setRightVisible] = useState([0, 1, 2]);
  const [activeUspShot, setActiveUspShot] = useState(0);
  const [isUspStackEntered, setIsUspStackEntered] = useState(false);
  const [upgradeBasket, setUpgradeBasket] = useState([]);
  const [upgradeFlyers, setUpgradeFlyers] = useState([]);
  const uspSwiperRef = useRef(null);
  const upgradeFolderRef = useRef(null);
  const mobileQuoteRef = useRef(null);
  const uspLeftSteps = uspSteps.slice(0, 2);
  const uspRightSteps = uspSteps.slice(2);
  const upgradesByCategory = useMemo(
    () =>
      upgradeCategoryOrder
        .map((category) => ({
          category,
          items: upgrades.filter((item) => item.category === category)
        }))
        .filter((group) => group.items.length > 0),
    []
  );
  const selectedUpgradeIds = useMemo(
    () => new Set(upgradeBasket.map((item) => item.id)),
    [upgradeBasket]
  );
  const basketCount = upgradeBasket.length;
  const basketStackPhotos = useMemo(
    () => upgradeBasket.map((item) => item.photo).slice(-4),
    [upgradeBasket]
  );

  const spawnUpgradeFlyer = (item, triggerNode) => {
    if (!triggerNode || typeof window === "undefined") return;
    const isMobileViewport = window.matchMedia("(max-width: 820px)").matches;
    const folderNode = isMobileViewport
      ? mobileQuoteRef.current ?? upgradeFolderRef.current
      : upgradeFolderRef.current ?? mobileQuoteRef.current;
    if (!folderNode) return;

    const sourceCard = triggerNode.closest(".upgrade-dish-card");
    const sourceNode =
      sourceCard?.querySelector(".upgrade-dish-thumb") ?? triggerNode;
    const sourceRect = sourceNode.getBoundingClientRect();
    const targetRect = folderNode.getBoundingClientRect();

    const flyerId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const startX = sourceRect.left + sourceRect.width * 0.5;
    const startY = sourceRect.top + sourceRect.height * 0.5;
    const endX = targetRect.left + targetRect.width * 0.5 + (Math.random() * 20 - 10);
    const endY = targetRect.top + targetRect.height * 0.62 + (Math.random() * 10 - 5);

    setUpgradeFlyers((current) => [
      ...current,
      {
        id: flyerId,
        photo: item.photo,
        startX,
        startY,
        deltaX: endX - startX,
        deltaY: endY - startY,
        rotate: Math.random() * 22 - 11
      }
    ]);

    window.setTimeout(() => {
      setUpgradeFlyers((current) =>
        current.filter((flyer) => flyer.id !== flyerId)
      );
    }, 850);
  };

  const toggleUpgradeSelection = (item, triggerNode) => {
    const isSelected = selectedUpgradeIds.has(item.id);
    setUpgradeBasket((current) => {
      if (isSelected) {
        return current.filter((entry) => entry.id !== item.id);
      }
      return [...current, item];
    });

    if (!isSelected) {
      spawnUpgradeFlyer(item, triggerNode);
    }
  };

  const removeUpgradeFromBasket = (itemId) => {
    setUpgradeBasket((current) =>
      current.filter((entry) => entry.id !== itemId)
    );
  };

  const openBundleTab = () => {
    setActiveTab("bundle");
    if (typeof window !== "undefined") {
      document
        .getElementById("packages")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleUspKeyDown = (event) => {
    const swiper = uspSwiperRef.current;
    if (!swiper) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      swiper.slidePrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      swiper.slideNext();
    }
  };

  useEffect(() => {
    const rotateDown = (visible, total) => {
      const top = visible[0];
      const center = visible[1];
      const incoming = (top - 1 + total) % total;
      return [incoming, top, center];
    };

    const intervalId = window.setInterval(() => {
      setLeftVisible((current) => rotateDown(current, heroTestimonialsLeft.length));
      setRightVisible((current) =>
        rotateDown(current, heroTestimonialsRight.length)
      );
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const entranceId = window.setTimeout(() => setIsUspStackEntered(true), 180);
    return () => window.clearTimeout(entranceId);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <main className="page-shell">
      <header className="top-nav">
        <a className="brand" href="#top">
          <img className="brand-logo" src={siteLogoUrl} alt="AE Moments" />
        </a>
        <nav className="nav-center">
          <a href="#top">Home</a>
          <a href="#packages">Packages</a>
          <a href="#compare">Why Us</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#quote" className="nav-cta">
          <span>Get Quote</span>
          <span className="nav-cta-arrow">→</span>
        </a>
      </header>

      <section className="section hero" id="top">
        <div className="hero-pattern" />
        <div className="hero-rings" />
        <div className="container hero-centered">
          <div className="testimonial-ticker ticker-left" aria-hidden="true">
            {leftVisible.map((itemIndex, slotIndex) => {
              const item = heroTestimonialsLeft[itemIndex];
              return (
                <aside
                  key={`left-${itemIndex}`}
                  className={`floating-quote card ticker-card ${tickerSlots[slotIndex]}`}
                >
                  <p>{item.text}</p>
                  <strong>– {item.author}</strong>
                </aside>
              );
            })}
          </div>

          <div className="testimonial-ticker ticker-right" aria-hidden="true">
            {rightVisible.map((itemIndex, slotIndex) => {
              const item = heroTestimonialsRight[itemIndex];
              return (
                <aside
                  key={`right-${itemIndex}`}
                  className={`floating-quote card ticker-card ${tickerSlots[slotIndex]}`}
                >
                  <p>{item.text}</p>
                  <strong>– {item.author}</strong>
                </aside>
              );
            })}
          </div>

          <article className="hero-main" data-reveal>
            <p className="hero-status">
              <span aria-hidden="true">●</span> Open for Booking
            </p>
            <p className="eyebrow hero-eyebrow">
              Attention Sydney & Greater Sydney Event Hosters Needing A
              Photobooth
            </p>
            <h1>Get A Studio-Quality Photo Booth For Your Next Event</h1>
            <p className="lead hero-lead">
              An advanced, studio-grade photo booth system, engineered for
              unlimited, frame-worthy photos. Real camera, real lighting, real
              prints.
            </p>
            <div className="cta-row hero-cta">
              <a
                href="#quote"
                className="button solid hero-primary"
                style={{ color: "#fff" }}
              >
                <span>Get a Quote / Check Availability</span>
                <span className="button-arrow">→</span>
              </a>
              <a
                href="#packages"
                className="button outline hero-secondary"
                style={{ color: "#111" }}
              >
                View Packages
              </a>
            </div>
            <div className="hero-rating">
              <div className="avatar-stack" aria-hidden="true">
                {heroReviewerAvatars.map((avatar, index) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt={`Google reviewer ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <div>
                <p className="star-line">★★★★★</p>
                <p>112 Google Reviews</p>
              </div>
            </div>
            <div className="proof-strip hero-proof">
              {proofStrip.map((item) => (
                <p key={item}>✅ {item}</p>
              ))}
            </div>
            <p className="hook hero-hook">
              If you’ve ever seen a photo booth spit out dull, blurry,
              grey-skin photos… this is the upgrade.
            </p>
          </article>
        </div>
      </section>

      <section className="section usp">
        <div className="container usp-shell">
          <p className="eyebrow" data-reveal>
            Why AE Moments looks different
          </p>
          <h2 data-reveal>The StudioBooth System</h2>
          <p className="section-lead usp-lead" data-reveal>
            Most booths rely on tablet cameras and venue lighting. We don’t.
            StudioBooth System: mirrorless camera + studio flash + pro lab
            prints, so every guest can access photos of the highest quality.
          </p>

          <div className="usp-stage">
            <div className="usp-points usp-points-left">
              {uspLeftSteps.map((step, index) => (
                <UspPointCard key={step.title} step={step} number={index + 1} />
              ))}
            </div>

            <div
              className={`usp-stack-wrap ${isUspStackEntered ? "is-entered" : ""}`}
              role="region"
              aria-label="StudioBooth showcase gallery"
              tabIndex={0}
              onKeyDown={handleUspKeyDown}
            >
              <div className="usp-stack-meta" aria-live="polite">
                <span className="usp-stack-count">
                  {String(activeUspShot + 1).padStart(2, "0")} /{" "}
                  {String(uspGalleryMedia.length).padStart(2, "0")}
                </span>
              </div>
              <div className="usp-stack">
                <Swiper
                  modules={[EffectCards]}
                  effect="cards"
                  cardsEffect={{
                    rotate: true,
                    perSlideOffset: 10,
                    perSlideRotate: 3,
                    slideShadows: false
                  }}
                  grabCursor
                  loop
                  speed={520}
                  className="usp-swiper"
                  onSwiper={(swiper) => {
                    uspSwiperRef.current = swiper;
                    setActiveUspShot(swiper.realIndex ?? 0);
                  }}
                  onSlideChange={(swiper) => {
                    setActiveUspShot(
                      typeof swiper.realIndex === "number" ? swiper.realIndex : 0
                    );
                  }}
                >
                  {uspGalleryMedia.map((src, index) => (
                    <SwiperSlide key={src} className="usp-slide">
                      <article className="usp-slide-frame">
                        <img
                          src={src}
                          alt={`AE Moments gallery sample ${index + 1}`}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <p className="usp-stack-help">
                Swipe left or right to browse.
              </p>
            </div>

            <div className="usp-points usp-points-right">
              {uspRightSteps.map((step, index) => (
                <UspPointCard key={step.title} step={step} number={index + 3} />
              ))}
            </div>
          </div>

          <p className="result-copy" data-reveal>
            Result: photos you’d actually frame… and prints guests fight over.
          </p>
        </div>
      </section>

      <section className="section audience">
        <div className="container audience-shell">
          <div className="audience-head" data-reveal>
            <p className="audience-kicker">Built for</p>
            <h2>Who We Serve</h2>
            <p className="section-lead audience-lead">
              Built for events that care about how the photos actually look.
              Whether you’re hosting an intimate celebration or a 300+ guest
              wedding, AE Moments is for people who don’t want “just a photo
              booth”—they want studio-quality memories and a smooth experience
              guests rave about.
            </p>
          </div>
          <div className="audience-grid">
            {audiences.map((group) => (
              <article key={group.name} className="card audience-card" data-reveal>
                <div className="audience-visual">
                  <AudienceIllustration type={group.illustration} label={group.name} />
                </div>
                <h3>{group.name}</h3>
                <p>{group.copy}</p>
              </article>
            ))}
          </div>
          <div className="audience-pills" data-reveal>
            <p className="audience-partners-label">
              Other venues & brands we&apos;ve worked with:
            </p>
            <div className="audience-logo-grid">
              {audiencePartnerLogos.map((logo, index) => (
                <figure key={logo} className="audience-logo-item">
                  <img
                    src={logo}
                    alt={`Venue and brand partner logo ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
          <p className="recommend-note" data-reveal>
            Not sure what you need? Tell us your guest count + vibe and we’ll
            recommend the best setup for your space and timeline.
          </p>
        </div>
      </section>

      <SocialProofSection />

      <section className="section packages" id="packages">
        <div className="container">
          <span className="packages-glow" aria-hidden="true" data-reveal />
          <p className="eyebrow" data-reveal>
            Our Photo Booth Packages
          </p>
          <h2 data-reveal>Studio-quality booths. Seamless setup. Unforgettable guest experience.</h2>
          <p className="section-lead package-lead" data-reveal>
            Flexible hire durations and premium bundle options designed for weddings, corporate activations, and private events.
          </p>
          <div className="tabs" data-reveal>
            <button
              className={activeTab === "standard" ? "active" : ""}
              onClick={() => setActiveTab("standard")}
            >
              Standard Rates
            </button>
            <button
              className={activeTab === "bundle" ? "active" : ""}
              onClick={() => setActiveTab("bundle")}
            >
              Bundle & Save
            </button>
          </div>

          <div className="panel" key={activeTab}>
            {activeTab === "standard" ? (
              <div className="package-grid">
                {standardRates.map((item) => (
                  <StandardCard key={item.name} item={item} />
                ))}
              </div>
            ) : (
              <div className="bundle-grid">
                {bundles.map((item) => (
                  <BundleCard key={item.name} item={item} />
                ))}
              </div>
            )}
          </div>
          {activeTab === "bundle" && (
            <p className="tab-note" data-reveal>
              Bundle & Save tab shows curated 4-hour packages with true savings
              displayed.
            </p>
          )}
        </div>
      </section>

      <section className="section included">
        <div className="container included-layout">
          <article data-reveal>
            <p className="eyebrow">The AE Moments Standard (included)</p>
            <h2>What’s Included in Every Booking</h2>
            <ul className="line-list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <aside className="orbit-box access-illustration" data-reveal>
            <div className="access-glow" aria-hidden="true" />
            <button
              type="button"
              className={`access-flip ${isAccessFlipped ? "is-flipped" : ""}`}
              onClick={() => setIsAccessFlipped((value) => !value)}
              aria-pressed={isAccessFlipped}
              aria-label="Tap the card to flip and view included access details"
            >
              <span className="access-flip-inner">
                <span className="access-card-face access-card-front">
                  <span className="pass-lanyard" aria-hidden="true">
                    <span className="pass-lanyard-hole" />
                  </span>
                  <span className="silver-card-panel">
                    <span className="silver-card-topline">
                      <span className="silver-card-event">AE Moments Pass</span>
                      <span className="silver-card-date">AUG 16 2026</span>
                    </span>
                    <span className="silver-card-logo" aria-hidden="true">
                      <span className="logo-stroke a" />
                      <span className="logo-stroke b" />
                    </span>
                    <span className="silver-card-tap">Tap The Card</span>
                    <span className="silver-card-name">Included Access Pass</span>
                    <span className="silver-card-subtap">
                      Flip to view inclusions
                    </span>
                  </span>
                  <span className="silver-card-meta">
                    <span>StudioBooth System</span>
                    <span>Virtual Attendee</span>
                  </span>
                </span>
                <span className="access-card-face access-card-back">
                  <span className="access-back-kicker">Included Access</span>
                  <span className="access-back-title">
                    Everything in your standard booking
                  </span>
                  <span className="access-back-list">
                    {bookingAccessDetails.map((item) => (
                      <span key={item.title} className="access-back-item">
                        <span className="access-back-dot" aria-hidden="true">
                          •
                        </span>
                        <span>
                          <span className="access-back-item-title">
                            {item.title}
                          </span>
                          <span className="access-back-item-meta">
                            {item.meta}
                          </span>
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="silver-card-hint back">Tap to return</span>
                </span>
              </span>
            </button>
          </aside>
        </div>
      </section>

      <section className="section upgrades">
        <div className="container upgrades-order-shell">
          <div className="upgrades-order-head" data-reveal>
            <p className="eyebrow">Event Enhancements & Upgrades</p>
            <h2>Build your event extras like a curated menu</h2>
            <p className="section-lead">
              Check upgrades to build your shortlist. Each selected add-on drops
              into the basket folder with a stacked-photo animation so you can
              preview your final setup.
            </p>
          </div>

          <div className="upgrades-order-layout">
            <div className="upgrade-menu-board card" data-reveal>
              {upgradesByCategory.map((group) => (
                <section key={group.category} className="upgrade-menu-group">
                  <div className="upgrade-menu-group-head">
                    <p>{group.category}</p>
                    <span>{group.items.length} items</span>
                  </div>
                  <div className="upgrade-dish-list">
                    {group.items.map((item) => (
                      <article
                        key={item.id}
                        className={`upgrade-dish-card ${
                          selectedUpgradeIds.has(item.id) ? "is-selected" : ""
                        }`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedUpgradeIds.has(item.id)}
                        aria-label={`${
                          selectedUpgradeIds.has(item.id) ? "Remove" : "Add"
                        } ${item.name}`}
                        onClick={(event) =>
                          toggleUpgradeSelection(item, event.currentTarget)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            toggleUpgradeSelection(item, event.currentTarget);
                          }
                        }}
                      >
                        <img
                          className="upgrade-dish-thumb"
                          src={item.photo}
                          alt={`${item.name} preview`}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="upgrade-dish-copy">
                          <h3>{item.name}</h3>
                          <p>{item.summary}</p>
                          <strong>{item.priceLabel}</strong>
                        </div>
                        <button
                          type="button"
                          className={`upgrade-check-btn ${
                            selectedUpgradeIds.has(item.id) ? "is-selected" : ""
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleUpgradeSelection(item, event.currentTarget);
                          }}
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          <span className="upgrade-check-icon" aria-hidden="true">
                            {selectedUpgradeIds.has(item.id) ? "✓" : ""}
                          </span>
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <aside className="upgrade-basket-panel card" data-reveal>
              <div
                className={`upgrade-folder ${basketCount > 0 ? "is-filled" : ""}`}
              >
                <div className="upgrade-folder-stack" aria-hidden="true">
                  {basketStackPhotos.map((photo, index) => (
                    <span
                      key={`${photo}-${index}`}
                      className="upgrade-stack-photo"
                      style={{
                        "--stack-index": index,
                        backgroundImage: `url(${photo})`
                      }}
                    />
                  ))}
                </div>
                <div className="upgrade-folder-pocket" ref={upgradeFolderRef}>
                  <p className="upgrade-folder-kicker">Basket Folder</p>
                  <p className="upgrade-folder-title">AE Moments Add-ons</p>
                  <p className="upgrade-folder-meta">
                    {basketCount} item{basketCount === 1 ? "" : "s"} selected
                  </p>
                </div>
              </div>

              <div className="upgrade-basket-list">
                {upgradeBasket.length === 0 ? (
                  <p className="upgrade-basket-empty">
                    Your basket is empty. Check items from the menu to build your
                    custom quote list.
                  </p>
                ) : (
                  upgradeBasket.map((item) => (
                    <article key={item.id} className="upgrade-basket-item">
                      <div>
                        <p className="upgrade-basket-name">{item.name}</p>
                        <p className="upgrade-basket-price">{item.priceLabel}</p>
                      </div>
                      <button
                        type="button"
                        className="upgrade-remove-btn"
                        onClick={() => removeUpgradeFromBasket(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>
                    </article>
                  ))
                )}
              </div>

              <div className="upgrade-basket-footer">
                <a href="#quote" className="upgrade-basket-cta">
                  Send me custom quote
                </a>
                <button
                  type="button"
                  className="upgrade-basket-cta upgrade-basket-cta-secondary"
                  onClick={openBundleTab}
                >
                  View Package Bundles
                </button>
              </div>
            </aside>
          </div>

          <div className="upgrade-fly-layer" aria-hidden="true">
            {upgradeFlyers.map((flyer) => (
              <img
                key={flyer.id}
                className="upgrade-fly-photo"
                src={flyer.photo}
                alt=""
                style={{
                  left: `${flyer.startX}px`,
                  top: `${flyer.startY}px`,
                  "--fly-x": `${flyer.deltaX}px`,
                  "--fly-y": `${flyer.deltaY}px`,
                  "--fly-rotate": `${flyer.rotate}deg`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <a
        href="#quote"
        ref={mobileQuoteRef}
        className={`upgrade-mobile-quote ${basketCount > 0 ? "is-visible" : ""}`}
        aria-label={`Request quote with ${basketCount} selected upgrade${
          basketCount === 1 ? "" : "s"
        }`}
      >
        <span className="upgrade-mobile-folder" aria-hidden="true">
          <span className="upgrade-mobile-folder-tab" />
          <span className="upgrade-mobile-folder-stack">
            {basketStackPhotos.slice(-3).map((photo, index) => (
              <span
                key={`${photo}-mobile-${index}`}
                className="upgrade-mobile-stack-photo"
                style={{
                  "--mobile-stack-index": index,
                  backgroundImage: `url(${photo})`
                }}
              />
            ))}
          </span>
        </span>
        <span className="upgrade-mobile-quote-copy">
          <strong>Request Quote</strong>
          <span>{basketCount} add-on{basketCount === 1 ? "" : "s"}</span>
        </span>
      </a>

      <section className="section compare" id="compare">
        <div className="container">
          <p className="eyebrow" data-reveal>
            How Do We Compare
          </p>
          <h2 data-reveal>Why Choose AE Moments</h2>
          <p className="section-lead compare-lead" data-reveal>
            A side-by-side view of what you actually get when quality,
            reliability, and guest experience matter.
          </p>
          <div className="compare-shell" data-reveal>
            <div className="compare-scroll" role="region" aria-label="Comparison table">
              <div className="compare-matrix">
                <div className="compare-matrix-head">
                  <p className="compare-feature-head">What matters most</p>
                  <div className="compare-col-head compare-col-head-ae">
                    <span className="compare-ae-chip" aria-hidden="true">
                      AE
                    </span>
                    <p>AE Moments</p>
                  </div>
                  <div className="compare-col-head">
                    <p>Typical Booth</p>
                  </div>
                </div>
                {compareRows.map((row) => (
                  <div key={row.label} className="compare-matrix-row">
                    <div className="compare-feature-cell">
                      <p>{row.label}</p>
                    </div>
                    <div className="compare-value-cell compare-value-ae">
                      <span className="compare-status check" aria-hidden="true">
                        ✓
                      </span>
                      <p>{row.ae}</p>
                    </div>
                    <div className="compare-value-cell">
                      <span className="compare-status cross" aria-hidden="true">
                        ×
                      </span>
                      <p>{row.typical}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section logistics">
        <div className="container logistics-layout">
          <article className="logistics-intro card" data-reveal>
            <p className="eyebrow">Logistics (so you can stop thinking about it)</p>
            <h2>Everything handled before guests arrive</h2>
            <p>
              The team coordinates setup, operation, and pack-down so your event
              timeline stays clean and stress stays low.
            </p>
            <div className="logistics-trust-row">
              <span>Insured</span>
              <span>Early setup</span>
              <span>Travel confirmed upfront</span>
            </div>
          </article>
          <div className="logistics-list">
            {logistics.map((item, index) => (
              <article key={item.title} className="card logistics-item" data-reveal>
                <div className="logistics-item-head">
                  <span className="logistics-item-step">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="logistics-item-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="container">
          <p className="eyebrow" data-reveal>
            FAQ
          </p>
          <h2 data-reveal>Answers before you book</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                index={index}
                activeFaq={activeFaq}
                setActiveFaq={setActiveFaq}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta" id="quote">
        <div className="container" data-reveal>
          <article className="quote-footer-panel">
            <blockquote className="quote-footer-text">
              “{founderQuote.text}”
            </blockquote>
            <div className="quote-footer-author">
              <span className="quote-footer-avatar" aria-hidden="true">
                {founderQuote.author
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <p className="quote-footer-name">{founderQuote.author}</p>
                <p className="quote-footer-role">{founderQuote.role}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <video
          className="site-footer-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4"
          style={{
            cursor: "auto",
            width: "100%",
            height: "100%",
            borderRadius: "0px",
            display: "block",
            objectFit: "cover",
            backgroundColor: "rgba(204, 8, 8, 0)",
            objectPosition: "50% 50%",
            filter: "brightness(0.66) grayscale(1) invert(0.92)",
            opacity: 0.96
          }}
        />
        <div className="site-footer-overlay" />
        <div className="container site-footer-content">
          <div className="site-footer-shell">
            <div className="site-footer-socials" aria-label="Social links">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.9 2.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7.001A3.5 3.5 0 0 0 12 8.5Z" />
                </svg>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 22v-8h2.8l.42-3.25H13.5V8.67c0-.94.27-1.58 1.62-1.58h1.73V4.2a21.5 21.5 0 0 0-2.52-.13c-2.5 0-4.2 1.52-4.2 4.33v2.35H7.3V14h2.83v8h3.37Z" />
                </svg>
              </a>
            </div>
            <img className="site-footer-logo" src={siteLogoUrl} alt="AE Moments" />
            <p className="site-footer-copy">
              Studio-quality photo booth experiences across Sydney & Greater
              Sydney.
            </p>
            <div className="site-footer-contact">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={contactPhoneHref}>{contactPhone}</a>
            </div>
            <a href="#quote" className="button solid site-footer-button">
              <span>Get Started</span>
              <span className="button-arrow">→</span>
            </a>
          </div>
          <nav className="site-footer-links">
            <a href="#packages">Packages</a>
            <a href="#compare">Why Us</a>
            <a href="#faq">FAQ</a>
            <a href="#quote">Contact</a>
          </nav>
          <p className="site-footer-meta">AE Moments © 2026</p>
        </div>
      </footer>
    </main>
  );
}
