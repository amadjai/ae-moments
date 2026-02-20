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
    detail: "Pin sharp photos and always in focus with eye tracking autofocus"
  },
  {
    icon: "✦",
    title: "Studio Flash Lighting",
    detail: "Consistent results in any venue lighting for that perfect photo"
  },
  {
    icon: "▣",
    title: "Professional Printer",
    detail: "Fast printing, vibrant, high quality, smudge-proof keepsakes"
  },
  {
    icon: "◌",
    title: "Professional Photo Booth Software",
    detail: "Professional software ensuring reliability for every event"
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
    copy: "For couples who want frame-worthy photos and a team that understands wedding timelines."
  },
  {
    illustration: "bars",
    name: "Corporate Events & Brand Activations",
    copy: "For brands that need high participation and high-volume content—fast. Perfect for launches, conferences, EOFY and activations."
  },
  {
    illustration: "sync",
    name: "Private Parties & Milestones",
    copy: "Birthdays, engagements, anniversaries, formals to save those memories."
  }
];

const audiencePartnerLogos = [
  {
    name: "UNSW",
    src: "/logo/unsw_0.png"
  },
  {
    name: "Commonwealth Bank",
    src: "/logo/commBank-logo.svg"
  },
  {
    name: "Gelatissimo",
    src: "/logo/Gelatissimo_Logo_Orange_RGB-e1662101441530.png"
  },
  {
    name: "White Elephant",
    src: "/logo/WE-Logo-HOZ.webp"
  },
  {
    name: "Moam",
    src: "/logo/MOAM-Header-Logo-1.png"
  },
  {
    name: "Headstart",
    src: "/logo/headstart-els.avif"
  },
  {
    name: "Caltex House",
    src: "/logo/621cd52c20e6c6635cc8d924_Logo.svg"
  },
  {
    name: "CFD",
    src: "/logo/CFD_Full+no+bg.webp"
  },
  {
    name: "AE Moments Mark",
    src: "/logo/NEW-LOGO-v6-outline-2.png"
  },
  {
    name: "JNJG",
    src: "/logo/jnjg_001-white.png"
  },
  {
    name: "Brand Mark",
    src: "/logo/logo-sticky-1.png"
  },
  {
    name: "Brand Monogram",
    src: "/logo/logo.svg"
  },
  {
    name: "Logo 22",
    src: "/logo/logo22.jpg"
  },
  {
    name: "SI",
    src: "/logo/si_logo_L.avif"
  },
  {
    name: "Wannian",
    src: "/logo/wannian_logo_web5.avif"
  }
];

const audiencePartnerRowA = audiencePartnerLogos.filter(
  (_, index) => index % 2 === 0
);
const audiencePartnerRowB = audiencePartnerLogos.filter(
  (_, index) => index % 2 === 1
);

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
      "Instant high-quality prints available",
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
      "Interactive mirror for the perfect wow factor",
      "Instant high-quality prints available",
      "Online gallery provided after event via email",
      "Luxury look that instantly elevates any event space"
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
      "Mobile camera/tripod setup that moves around the venue, capturing guests wherever the action is.",
    image:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698c2f2752c952b70bf254ff.png",
    features: [
      "Candid, fun shots with real reactions and energy",
      "Great for large venues/outdoor spaces",
      "Ideal for corporate events and brand activations",
      "Flexible setup with fast event coverage",
      "Moves around the venue wherever the action is"
    ],
    pricingLines: [
      "Digitals only: 3hrs $1,000 | 4hrs $1,200 | 5hrs $1,400",
      "Digitals + printing: 3hrs $1,150 | 4hrs $1,300 | 5hrs $1,550"
    ],
    outputs: ["Roaming Coverage", "Digitals", "Prints (optional)"]
  }
];

const bundles = [
  {
    name: "Open Air Booth Essentials Bundle",
    label: "Silver Value",
    tier: "silver",
    tierLabel: "Silver Value",
    tierCopy: "Best value starter bundle",
    plan: "5-hour bundle",
    bestFor: "Best for up to 350 guests",
    intro: "",
    includes: [
      "Open Air Booth (5hrs) — $970",
      "Glam Booth (B&W Hollywood) — $110",
      "Guest Book Print Service — $55",
      "Signature Guest Book Set — $135"
    ],
    trueCost: "$1,215",
    bundlePrice: "$1,124",
    savings: "$91",
    why: [
      "Studio quality output with a clean, simple setup",
      "Includes premium keepsake upgrades",
      "Great value for medium to large guest counts"
    ]
  },
  {
    name: "Corporate Brand Experience Bundle",
    label: "Gold Value",
    tier: "gold",
    tierLabel: "Gold Value",
    tierCopy: "Corporate content bundle",
    plan: "5-hour bundle",
    featured: true,
    bestFor: "Best for corporate events",
    intro: "",
    includes: [
      "Open Air Booth (5hrs) — $970",
      "360 Booth (5hrs) — $1,220",
      "Glam Booth — $110",
      "Print Upgrade (Postcard 4×6 or Polaroid 3×4) — $165",
      "Commemorative Photo Album — $100"
    ],
    trueCost: "$2,565",
    bundlePrice: "$2,270",
    savings: "$295",
    why: [
      "Built for engagement and content variety",
      "Mix of booth, video, and branded print upgrades",
      "Great fit for conferences and activations"
    ]
  },
  {
    name: "Platinum Celebration Bundle",
    label: "Platinum Value",
    tier: "platinum",
    tierLabel: "Platinum Value",
    tierCopy: "Maximum event coverage",
    plan: "5-hour bundle",
    bestFor: "Best for 400+ guests",
    intro: "",
    includes: [
      "Open Air Booth (5hrs) — $970",
      "Mirror Booth (5hrs) — $1,170",
      "360 Booth (5hrs) — $1,220",
      "Roaming Booth (5hrs, digitals + printing) — $1,550",
      "Dry Ice (Dancing on clouds) — $420",
      "Audio Guest Book — $300",
      "Glam Booth — $110",
      "Print Upgrade (Polaroid 3×4 or Postcard 4×6) — $165",
      "Commemorative Photo Album — $100"
    ],
    trueCost: "$4,840",
    bundlePrice: "$4,114",
    savings: "$726",
    why: [
      "Built for large guest numbers and event scale",
      "Maximum variety and throughput across the venue",
      "Premium keepsakes and visual upgrades included"
    ]
  }
];

const included = [
  "Delivery, setup, pack-down and travel",
  "Dedicated booth attendant for the full duration of your booking",
  "Custom tailored prints to match the theme of your event",
  "Unlimited sessions + 1 print per person (where printing is included)",
  "Private online gallery for high-res downloads",
  "Props included (or go prop-less for a clean editorial look)",
  "Backdrop included (subject to availability)",
  "Strict quality check of equipment, camera settings and photos before event starts"
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
    id: "print-magnets",
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
    name: "Grand entrance fireworks + dry ice",
    category: "Atmosphere & Entrance",
    summary: "Full wow-moment package for dramatic stage reveal and spotlight entry.",
    price: 1100,
    priceLabel: "from $1,100",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc6324813cdf927d0cbb.jpg"
  },
  {
    id: "dj-service",
    name: "DJ services",
    category: "Entertainment",
    summary: "Subject-to-availability DJ set to keep energy and dancefloor flow high.",
    price: 1200,
    priceLabel: "from $1,200",
    photo:
      "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698dcc635ea0711e86d7057c.jpg"
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
const googleReviewsUrl =
  "https://www.google.com/search?q=aemoments&oq=aemoments#lrd=0x2fb04e6d9c28587f:0x923cf8688c516466,1,,,,";

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
    author: "Juliana and David",
    role: "Google Review",
    summary:
      "AE Moments was one of the best decisions we made for our wedding! Andrew and his team were so organised, fun and professional throughout the night. The photo booth was a huge hit with all of the guests and the quality of the prints was amazing. Highly recommend!"
  },
  {
    author: "Janet Chan",
    role: "Google Review",
    summary:
      "AE Moments provided exceptional service for our wedding. The quality of the prints is really good and we got the flexibility to keep the photo booth running during cocktail hour which made the guests really happy. Highly recommend for any event!"
  },
  {
    author: "Kim",
    role: "Google Review",
    summary:
      "Andrew and the team at AE Moments were wonderful vendors for our wedding reception and photo booth hire! Friendly and professional, which is so valuable when planning a wedding. The entire process including set up was seamless."
  },
  {
    author: "Daniel Guo",
    role: "Google Review",
    summary:
      "We hired AE Moments for our wedding and couldn't be happier with the service! From start to finish, the team was fantastic - they worked closely with us to personalise the photo templates, making it feel really special and unique to us."
  },
  {
    author: "Johnny Huang Nguyen",
    role: "Google Review",
    summary:
      "I had the pleasure of working alongside AE Moments at a wedding as the photographer. Overall, the setup was visually aesthetic. Guests were very fun with the props and booth!"
  },
  {
    author: "Ethan Kaces",
    role: "Google Review",
    summary:
      "Andrew & his team were amazing to work with! We hired a Photo Booth for several year presentations for our work and their service was outstanding. From the first point of contact till the event, they were 10/10 in all aspects. Highly recommend!"
  },
  {
    author: "Jocelyn",
    role: "Google Review",
    summary:
      "AE Moments were amazing! Andrew was very helpful throughout the whole process, and went above and beyond to assist us and ensure that everything was perfect on the day. Highly recommend for your next function!"
  },
  {
    author: "Samantha Wallace",
    role: "Google Review",
    summary:
      "I booked AE Moments Photo Booth for my wedding in November 2023 and it was amazing! The team were incredible and professional since the setup to pack down. They provided fun downloads (singles, strips and GIFs) I love them!"
  },
  {
    author: "Austin So",
    role: "Google Review",
    summary:
      "We hired AE Moments for our wedding and couldn't be happier! Guests loved it, prints are high quality and the team were friendly and accommodating. Everything ran smoothly from start to finish."
  },
  {
    author: "Daniela Gonzalez",
    role: "Google Review",
    summary:
      "Andrew was amazingly responsive and helpful from the very first contact. The AE Moments team delivered top-notch service and high quality booth for our function. Thank you Andrew & team."
  }
];

const founderQuote = {
  author: "Andrew Chung",
  role: "Founder of AE Moments",
  text:
    "Born from a search for perfection, AE Moments started with a custom-built photo booth for my own wedding. What began as a personal quest to 'get it right' quickly evolved into a full scale business after friends and family fell in love with the experience."
};

const logistics = [
  {
    title: "Space & Power",
    detail:
      "Allow approx 3m (W) × 3m (D) × 2.4m (H) with one nearby power point.",
    icon: "⌂",
    graphic: "space"
  },
  {
    title: "Seamless Setup",
    detail:
      "Setup and pack-down are included. We arrive early so guests only see the polished final setup.",
    icon: "◔",
    graphic: "setup"
  },
  {
    title: "Fully Insured",
    detail:
      "AE Moments operates with public liability insurance for venue compliance and peace of mind.",
    icon: "✓",
    graphic: "insured"
  },
  {
    title: "Travel Clarity",
    detail:
      "Standard pricing includes travel within 30 minutes of areas surrounding 2141. Travel is pro-rata at $70/hr + parking outside of these areas.",
    icon: "↗",
    graphic: "travel"
  }
];

const siteLogoUrl =
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png";
const instagramUrl = "https://www.instagram.com/aemoments.au";
const facebookUrl = "https://www.facebook.com/aemoments.au";
const contactEmail = "admin@aemoments.com.au";
const contactPhone = "0452 195 855";
const contactPhoneHref = "tel:+61452195855";
const quoteWebhookUrl =
  "https://services.leadconnectorhq.com/hooks/KbLyUwHy2FrboitSpuPl/webhook-trigger/0f7be69b-cbc2-41a4-bb9f-b384ba8ae0d7";

function buildQuoteWebhookPayload(formData, bundleChoices) {
  const submittedAt = new Date().toISOString();
  const guestCount = Number(formData.guestCount) || 0;
  const isWedding = formData.eventType === "Wedding";
  const isCuratePath = formData.buildPath === "curate";
  const isBundlePath = formData.buildPath === "bundle";
  const quickUpgrades = formData.quickUpgrades ?? [];
  const selectedPathLabel = isBundlePath
    ? "Bundle & save money"
    : "Curate my own photo booth experience";

  const summaryLine = [
    `${formData.eventType || "Event type not set"}`,
    `${guestCount || "?"} guests`,
    formData.dateNotSure ? "Date not set" : formData.eventDate || "Date not set",
    selectedPathLabel
  ].join(" | ");

  return {
    webhookVersion: "1.1",
    submissionId:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    submittedAt,
    source: {
      formName: "AE Moments Quote Popup",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
    },
    eventBasics: {
      eventType: formData.eventType || null,
      eventDateStatus: formData.dateNotSure ? "not_sure_yet" : "confirmed_date",
      eventDate: formData.dateNotSure ? null : formData.eventDate || null,
      guestCount
    },
    experiencePath: {
      pathMode: formData.buildPath || null,
      pathLabel: selectedPathLabel,
      curate: isCuratePath
        ? {
            boothChoice: formData.boothChoice || null,
            roamingPrintingPreference: formData.roamingPrinting || null,
            quickUpgradesSelected: quickUpgrades,
            quickUpgradesCount: quickUpgrades.length
          }
        : null,
      bundle: isBundlePath
        ? {
            bundleChoice: formData.bundleChoice || null,
            optionsShown: bundleChoices
          }
        : null
    },
    timingVenue: {
      hireDuration: formData.hireDuration || null,
      eventStartTime: formData.eventStartTime || null,
      eventFinishTime: formData.eventFinishTime || null,
      venueName: formData.venueName || null,
      venueSuburbAddress: formData.venueAddress || null,
      ceremonyAndReceptionSameVenue: isWedding ? formData.sameVenue || null : null
    },
    contact: {
      name: formData.fullName || null,
      partnerName: isWedding ? formData.partnerName || null : null,
      mobile: formData.mobile || null,
      email: formData.email || null,
      instagramHandle: formData.instagram || null
    },
    notes: {
      message: formData.message || null
    },
    summary: {
      summaryLine,
      selectedBooth: isCuratePath ? formData.boothChoice || null : null,
      selectedBundle: isBundlePath ? formData.bundleChoice || null : null,
      hasQuickUpgrades: quickUpgrades.length > 0
    },
    flat: {
      event_type: formData.eventType || "",
      event_date: formData.dateNotSure ? "" : formData.eventDate || "",
      event_date_not_sure: Boolean(formData.dateNotSure),
      guest_count: guestCount || "",
      build_path: formData.buildPath || "",
      booth_choice: formData.boothChoice || "",
      roaming_printing: formData.roamingPrinting || "",
      bundle_choice: formData.bundleChoice || "",
      quick_upgrades: quickUpgrades.join(" | "),
      quick_upgrades_count: quickUpgrades.length,
      hire_duration: formData.hireDuration || "",
      event_start_time: formData.eventStartTime || "",
      event_finish_time: formData.eventFinishTime || "",
      venue_name: formData.venueName || "",
      venue_address: formData.venueAddress || "",
      wedding_same_venue: formData.sameVenue || "",
      full_name: formData.fullName || "",
      partner_name: formData.partnerName || "",
      mobile: formData.mobile || "",
      email: formData.email || "",
      instagram_handle: formData.instagram || "",
      special_requests: formData.message || ""
    }
  };
}

const faqs = [
  {
    question:
      "What makes AE Moments different from a “normal” photo booth?",
    answer:
      "We offer three premium booth experiences: Open Air Booth for studio-quality photos, Mirror Booth for interactive wow-factor moments, and Roaming Booth for candid, on-the-move coverage. Each setup is quality-controlled for consistent output."
  },
  {
    question: "What’s included in the price?",
    answer:
      "Every booking includes setup/pack-down, a dedicated attendant, custom tailored print design, unlimited sessions, and a private online gallery. Printing inclusions depend on your selected package."
  },
  {
    question: "How much space do you need and what do we need to provide?",
    answer:
      "Open Air Booth and Mirror Booth need around 3m x 3m, 2.4m ceiling height, and one power point. 360 Booth needs around 4m x 4m and one power point."
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
      "Yes. We provide custom tailored prints to match your wedding theme or brand style so all take-home outputs look cohesive."
  },
  {
    question:
      "Do you travel outside Sydney, and how does travel pricing work?",
    answer:
      "Standard pricing includes travel within 30 minutes of areas surrounding 2141. Travel is pro-rata at $70/hr plus parking outside of these areas."
  },
  {
    question: "Which booth should I choose for my event?",
    answer:
      "Share your guest count, venue details, and vibe. AE Moments will recommend the best mix for flow, throughput, and the look you want."
  },
  {
    question: "What aspects of the photos do you quality control?",
    answer:
      "Before guests begin, we run test prints, calibrate lighting, confirm framing symmetry, and check camera settings for consistent exposure and focus. During the event, we monitor output quality in real time and adjust lighting/positioning as needed."
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

const quoteEventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Corporate events",
  "Product activation",
  "School formal",
  "Other occasion"
];

const quoteQuickUpgrades = [
  "1 extra print for your own guest book - $55",
  "Leather guest book + gold pens + glue + 1 extra print - $135",
  "Photo Album + 1 extra print - $100",
  "15x15mm magnets (sheets of 100) (min. 1 per guest, rounded up to the nearest 100) - $22",
  "Upgrade to 3x4\" polaroid prints - $165",
  "Upgrade to 4x6\" postcard prints - $165",
  "Glam booth upgrade (black & white photos) - $110",
  "Rose Wall hire with photo booth package - $440",
  "Audio Guest Book (white) - $300",
  "Dry Ice Fog Machine only - $420",
  "Fireworks & dry ice package - from $1100",
  "Acrylic welcome sign - from $180",
  "Acrylic seating chart - from $250",
  "DJ package + equipment - 5 hours from $1200"
];

const quoteFormInitialState = {
  eventType: "",
  eventDate: "",
  dateNotSure: false,
  guestCount: "",
  buildPath: "",
  boothChoice: "",
  roamingPrinting: "",
  quickUpgrades: [],
  bundleChoice: "",
  hireDuration: "",
  eventStartTime: "",
  eventFinishTime: "",
  venueName: "",
  venueAddress: "",
  sameVenue: "",
  fullName: "",
  partnerName: "",
  mobile: "",
  email: "",
  instagram: "",
  message: ""
};

function StandardCard({ item, onCtaClick }) {
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
        <p className="package-price-label">Standard rates from</p>
        <div className="package-price-lines">
          {item.pricingLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <a href="#quote" className="package-action" onClick={onCtaClick}>
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

function SectionPill({ label, centered = false }) {
  return (
    <p className={`section-pill ${centered ? "centered" : ""}`} data-reveal>
      <span aria-hidden="true">✱</span>
      <span>{label}</span>
    </p>
  );
}

function LogisticsGraphic({ type }) {
  if (type === "space") {
    return (
      <div className="logistics-graphic space" aria-hidden="true">
        <span className="logi-orb a" />
        <span className="logi-orb b" />
        <div className="space-blueprint">
          <span className="space-line v1" />
          <span className="space-line v2" />
          <span className="space-line h1" />
          <span className="space-line h2" />
          <span className="space-cam">CAM</span>
          <span className="space-light">FLASH</span>
          <span className="space-power">⚡ 1x power</span>
          <span className="space-width">3m</span>
          <span className="space-depth">3m</span>
          <span className="space-height">2.4m</span>
        </div>
      </div>
    );
  }

  if (type === "setup") {
    return (
      <div className="logistics-graphic setup" aria-hidden="true">
        <div className="setup-track">
          <span className="setup-line" />
          <span className="setup-progress" />
          <span className="setup-dot a">Arrive</span>
          <span className="setup-dot b">Setup</span>
          <span className="setup-dot c">Ready</span>
          <span className="setup-pulse" />
        </div>
      </div>
    );
  }

  if (type === "insured") {
    return (
      <div className="logistics-graphic insured" aria-hidden="true">
        <span className="insured-ring one" />
        <span className="insured-ring two" />
        <span className="insured-shield">✓</span>
        <span className="insured-tag">Public liability</span>
      </div>
    );
  }

  return (
    <div className="logistics-graphic travel" aria-hidden="true">
      <div className="travel-map">
        <span className="travel-dot start" />
        <span className="travel-route" />
        <span className="travel-car">➜</span>
        <span className="travel-dot end" />
        <span className="travel-pin">2141 zone</span>
      </div>
    </div>
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

function BundleCard({ item, onCtaClick }) {
  return (
    <article
      className={`card bundle-card ${item.featured ? "featured" : ""}`}
      data-reveal
    >
      <div className={`bundle-tier-card ${item.tier}`}>
        <p className="bundle-tier-name">{item.tierLabel}</p>
        <img
          className="bundle-tier-logo"
          src={siteLogoUrl}
          alt="AE Moments logo"
          loading="lazy"
          decoding="async"
        />
        <p className="bundle-tier-copy">{item.tierCopy}</p>
        <p className="bundle-tier-save">Save {item.savings}</p>
      </div>
      <div className="bundle-top">
        <p className="bundle-plan">{item.plan}</p>
        <p className="bundle-pill">{item.label}</p>
      </div>
      <h3>{item.name}</h3>
      <p className="meta">{item.bestFor}</p>
      {item.intro ? <p>{item.intro}</p> : null}
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
      <a href="#quote" className="package-action bundle-action" onClick={onCtaClick}>
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
        <SectionPill label="Proof" centered />
        <div className="social-proof-top">
          <article className="sp-panel sp-intro" data-reveal>
            <p className="sp-kicker">What our clients say</p>
            <h2>Proof your event is in expert hands.</h2>
            <p className="sp-note">
              Real feedback from public Google Reviews for AE Moments:{" "}
              <a href={googleReviewsUrl} target="_blank" rel="noreferrer">
                Read what our clients have to say
              </a>
            </p>
            <p className="sp-note-secondary">
              Want every new review auto-shown here? We can wire this to a live
              Google Places feed.
            </p>
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
        <div className="sp-social-follow" data-reveal>
          <p>Check us on out our socials.</p>
          <div className="sp-social-follow-links">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5Zm8.9 2.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7.001A3.5 3.5 0 0 0 12 8.5Z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.5 22v-8h2.8l.42-3.25H13.5V8.67c0-.94.27-1.58 1.62-1.58h1.73V4.2a21.5 21.5 0 0 0-2.52-.13c-2.5 0-4.2 1.52-4.2 4.33v2.35H7.3V14h2.83v8h3.37Z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareSection() {
  return (
    <section className="section compare" id="compare">
      <div className="container">
        <SectionPill label="Why Us" />
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
  );
}

function QuoteFormModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(quoteFormInitialState);
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWedding = formData.eventType === "Wedding";
  const isBundlePath = formData.buildPath === "bundle";
  const isCuratePath = formData.buildPath === "curate";
  const isRoamingBooth = formData.boothChoice === "Roaming Booth (Digitals)";
  const progressWidth = `${(step / 5) * 100}%`;
  const stepTag = step === 3 ? (isBundlePath ? "3B" : "3A") : String(step);

  const bundleChoices = useMemo(() => {
    const recommend = "Recommend for me";

    if (formData.eventType === "Wedding") {
      return [
        "Open Air Booth Essentials Bundle",
        "Platinum Celebration Bundle",
        "Corporate Brand Experience Bundle",
        recommend
      ];
    }

    if (
      formData.eventType === "Corporate events" ||
      formData.eventType === "Product activation"
    ) {
      return [
        "Corporate Brand Experience Bundle",
        "Open Air Booth Essentials Bundle",
        "Platinum Celebration Bundle",
        recommend
      ];
    }

    return [
      "Open Air Booth Essentials Bundle",
      "Corporate Brand Experience Bundle",
      "Platinum Celebration Bundle",
      recommend
    ];
  }, [formData.eventType]);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setFormData(quoteFormInitialState);
    setFormError("");
    setIsSubmitted(false);
    setIsSubmitting(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const setField = (field, value) => {
    setFormData((current) => {
      const next = { ...current, [field]: value };

      if (field === "eventType" && value !== "Wedding") {
        next.partnerName = "";
        next.sameVenue = "";
      }

      if (field === "buildPath") {
        if (value === "bundle") {
          next.boothChoice = "";
          next.roamingPrinting = "";
          next.quickUpgrades = [];
        } else {
          next.bundleChoice = "";
        }
      }

      if (field === "boothChoice" && value !== "Roaming Booth (Digitals)") {
        next.roamingPrinting = "";
      }

      if (field === "dateNotSure" && value) {
        next.eventDate = "";
      }

      return next;
    });
  };

  const toggleQuickUpgrade = (value) => {
    setFormData((current) => {
      const alreadySelected = current.quickUpgrades.includes(value);
      return {
        ...current,
        quickUpgrades: alreadySelected
          ? current.quickUpgrades.filter((entry) => entry !== value)
          : [...current.quickUpgrades, value]
      };
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.eventType) return "Please select your event type.";
      if (!formData.dateNotSure && !formData.eventDate) {
        return "Please choose your event date or tick “Not sure yet”.";
      }
      if (!formData.guestCount || Number(formData.guestCount) <= 0) {
        return "Please enter a valid guest count.";
      }
    }

    if (step === 2 && !formData.buildPath) {
      return "Please choose how you'd like to build your experience.";
    }

    if (step === 3) {
      if (isCuratePath) {
        if (!formData.boothChoice) return "Please choose your main booth experience.";
        if (isRoamingBooth && !formData.roamingPrinting) {
          return "Please select your roaming printing preference.";
        }
      }

      if (isBundlePath && !formData.bundleChoice) {
        return "Please choose a bundle option.";
      }
    }

    if (step === 4) {
      if (!formData.hireDuration) return "Please select the hire duration.";
      if (isWedding && formData.hireDuration === "3 hours") {
        return "For weddings, minimum booking is 4 hours.";
      }
      if (!formData.eventStartTime) return "Please choose an event start time.";
      if (!formData.eventFinishTime) return "Please choose an event finish time.";
      if (!formData.venueAddress.trim()) return "Please add venue suburb or address.";
    }

    if (step === 5) {
      if (!formData.fullName.trim()) return "Please enter your name.";
      if (!formData.mobile.trim()) return "Please enter your mobile number.";
      if (!formData.email.trim()) return "Please enter your email address.";
      if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    return "";
  };

  const handleNext = () => {
    if (isSubmitting) return;
    const error = validateStep();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setStep((current) => Math.min(5, current + 1));
  };

  const handleBack = () => {
    if (isSubmitting) return;
    setFormError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateStep();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const payload = buildQuoteWebhookPayload(formData, bundleChoices);

    try {
      const response = await fetch(quoteWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (errorCaught) {
      if (errorCaught instanceof TypeError) {
        try {
          await fetch(quoteWebhookUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain;charset=UTF-8"
            },
            body: JSON.stringify(payload)
          });
          setIsSubmitted(true);
        } catch {
          setFormError(
            "Couldn’t submit right now. Please try again, or contact us directly."
          );
        }
      } else {
        setFormError(
          "Couldn’t submit right now. Please try again, or contact us directly."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="quote-modal-overlay" onMouseDown={handleOverlayMouseDown}>
      <div
        className="quote-modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <button
          type="button"
          className="quote-modal-close"
          onClick={onClose}
          aria-label="Close quote form"
          disabled={isSubmitting}
        >
          ×
        </button>

        {isSubmitted ? (
          <section className="quote-success-view">
            <p className="quote-modal-kicker">Quote request received</p>
            <h3 id="quote-modal-title">Thanks, we’ll confirm availability shortly.</h3>
            <p>
              Your event details are in. The AE Moments team will send your
              recommended setup and pricing quote as soon as possible.
            </p>
            <button
              type="button"
              className="quote-btn quote-btn-solid"
              onClick={onClose}
            >
              Close
            </button>
          </section>
        ) : (
          <form className="quote-modal-form" onSubmit={handleSubmit}>
            <header className="quote-modal-head">
              <p className="quote-modal-kicker">Step {stepTag} of 5</p>
              <div className="quote-progress">
                <span style={{ width: progressWidth }} />
              </div>
            </header>

            {formError ? <p className="quote-form-error">{formError}</p> : null}

            {step === 1 && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">Check availability for your event</h3>
                <label className="quote-field">
                  <span>Event type*</span>
                  <select
                    value={formData.eventType}
                    onChange={(event) => setField("eventType", event.target.value)}
                    required
                  >
                    <option value="">Select event type</option>
                    {quoteEventTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="quote-field-row">
                  <label className="quote-field">
                    <span>Event date*</span>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(event) => setField("eventDate", event.target.value)}
                      disabled={formData.dateNotSure}
                    />
                  </label>
                  <label className="quote-check-line">
                    <input
                      type="checkbox"
                      checked={formData.dateNotSure}
                      onChange={(event) => setField("dateNotSure", event.target.checked)}
                    />
                    <span>Not sure yet</span>
                  </label>
                </div>

                <label className="quote-field">
                  <span>Guest count*</span>
                  <input
                    type="number"
                    min="1"
                    value={formData.guestCount}
                    onChange={(event) => setField("guestCount", event.target.value)}
                    placeholder="e.g. 120"
                    required
                  />
                </label>
              </section>
            )}

            {step === 2 && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">How would you like to build your experience?</h3>
                <div className="quote-choice-grid">
                  <label
                    className={`quote-choice-card ${
                      formData.buildPath === "curate" ? "is-active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="buildPath"
                      value="curate"
                      checked={formData.buildPath === "curate"}
                      onChange={(event) => setField("buildPath", event.target.value)}
                    />
                    <span className="quote-choice-title">
                      Curate my own photo booth experience
                    </span>
                    <span className="quote-choice-copy">
                      Choose your booth and a few quick add-ons.
                    </span>
                  </label>
                  <label
                    className={`quote-choice-card ${
                      formData.buildPath === "bundle" ? "is-active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="buildPath"
                      value="bundle"
                      checked={formData.buildPath === "bundle"}
                      onChange={(event) => setField("buildPath", event.target.value)}
                    />
                    <span className="quote-choice-title">Bundle & save money ⭐</span>
                    <span className="quote-choice-copy">
                      Pick a proven setup and lock in clear savings.
                    </span>
                  </label>
                </div>
              </section>
            )}

            {step === 3 && isCuratePath && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">Choose your main experience</h3>
                <div className="quote-choice-grid">
                  {[
                    "Open Air Booth (Prints + Digitals)",
                    "Mirror Booth (Prints + Digitals)",
                    "360 Video Booth (360 clips)",
                    "Roaming Booth (Digitals)"
                  ].map((option) => (
                    <label
                      key={option}
                      className={`quote-choice-card ${
                        formData.boothChoice === option ? "is-active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="boothChoice"
                        value={option}
                        checked={formData.boothChoice === option}
                        onChange={(event) => setField("boothChoice", event.target.value)}
                      />
                      <span className="quote-choice-title">{option}</span>
                    </label>
                  ))}
                </div>

                {isRoamingBooth && (
                  <fieldset className="quote-fieldset">
                    <legend>Printing?*</legend>
                    <div className="quote-inline-options">
                      {["Digitals only", "Digitals + printing"].map((option) => (
                        <label
                          key={option}
                          className={`quote-chip-option ${
                            formData.roamingPrinting === option ? "is-active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="roamingPrinting"
                            value={option}
                            checked={formData.roamingPrinting === option}
                            onChange={(event) =>
                              setField("roamingPrinting", event.target.value)
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <fieldset className="quote-fieldset">
                  <legend>Quick upgrades (optional)</legend>
                  <p className="quote-helper">
                    Full upgrades can be suggested later in our reply email.
                  </p>
                  <div className="quote-inline-options">
                    {quoteQuickUpgrades.map((item) => (
                      <label
                        key={item}
                        className={`quote-chip-option ${
                          formData.quickUpgrades.includes(item) ? "is-active" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.quickUpgrades.includes(item)}
                          onChange={() => toggleQuickUpgrade(item)}
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </section>
            )}

            {step === 3 && isBundlePath && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">Choose a bundle & save</h3>
                <p className="quote-helper">
                  Showing the most relevant bundles for your event type.
                </p>
                <div className="quote-choice-grid">
                  {bundleChoices.map((option) => (
                    <label
                      key={option}
                      className={`quote-choice-card ${
                        formData.bundleChoice === option ? "is-active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="bundleChoice"
                        value={option}
                        checked={formData.bundleChoice === option}
                        onChange={(event) => setField("bundleChoice", event.target.value)}
                      />
                      <span className="quote-choice-title">{option}</span>
                    </label>
                  ))}
                </div>
              </section>
            )}

            {step === 4 && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">Event timing & location</h3>

                <fieldset className="quote-fieldset">
                  <legend>Hire duration*</legend>
                  <p className="quote-helper">
                    For weddings, the booth must be set up before guests arrive
                    and packed down after formalities to avoid disruption. For
                    this reason, we require a minimum 4 hour booking.
                  </p>
                  <div className="quote-inline-options">
                    {["3 hours", "4 hours", "5 hours", "6 hours or more"].map(
                      (option) => (
                        <label
                          key={option}
                          className={`quote-chip-option ${
                            formData.hireDuration === option ? "is-active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="hireDuration"
                            value={option}
                            checked={formData.hireDuration === option}
                            onChange={(event) => setField("hireDuration", event.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </fieldset>

                <label className="quote-field">
                  <span>Event Start Time*</span>
                  <select
                    value={formData.eventStartTime}
                    onChange={(event) => setField("eventStartTime", event.target.value)}
                    required
                  >
                    <option value="">Select event start time</option>
                    <option value="Morning (8:00am - 11:59am)">
                      Morning (8:00am - 11:59am)
                    </option>
                    <option value="Midday (12:00pm - 2:59pm)">
                      Midday (12:00pm - 2:59pm)
                    </option>
                    <option value="Afternoon (3:00pm - 5:59pm)">
                      Afternoon (3:00pm - 5:59pm)
                    </option>
                    <option value="Evening (6:00pm - 8:59pm)">
                      Evening (6:00pm - 8:59pm)
                    </option>
                    <option value="Night (9:00pm onwards)">Night (9:00pm onwards)</option>
                  </select>
                </label>

                <label className="quote-field">
                  <span>Event Finish Time*</span>
                  <select
                    value={formData.eventFinishTime}
                    onChange={(event) => setField("eventFinishTime", event.target.value)}
                    required
                  >
                    <option value="">Select event finish time</option>
                    <option value="Before 4:00pm">Before 4:00pm</option>
                    <option value="4:00pm - 7:00pm">4:00pm - 7:00pm</option>
                    <option value="7:00pm - 10:00pm">7:00pm - 10:00pm</option>
                    <option value="10:00pm - Midnight">10:00pm - Midnight</option>
                    <option value="After Midnight">After Midnight</option>
                  </select>
                </label>

                <label className="quote-field">
                  <span>Venue name</span>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(event) => setField("venueName", event.target.value)}
                    placeholder="Optional"
                  />
                </label>

                <label className="quote-field">
                  <span>Venue suburb / address*</span>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(event) => setField("venueAddress", event.target.value)}
                    placeholder="Suburb or full address"
                    required
                  />
                </label>

                {isWedding && (
                  <fieldset className="quote-fieldset">
                    <legend>Ceremony & reception same venue? (optional)</legend>
                    <div className="quote-inline-options">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <label
                          key={option}
                          className={`quote-chip-option ${
                            formData.sameVenue === option ? "is-active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="sameVenue"
                            value={option}
                            checked={formData.sameVenue === option}
                            onChange={(event) => setField("sameVenue", event.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
              </section>
            )}

            {step === 5 && (
              <section className="quote-step-body">
                <h3 id="quote-modal-title">Where should we send your quote?</h3>

                <label className="quote-field">
                  <span>Name*</span>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) => setField("fullName", event.target.value)}
                    required
                  />
                </label>

                {isWedding && (
                  <label className="quote-field">
                    <span>Partner&apos;s name (optional)</span>
                    <input
                      type="text"
                      value={formData.partnerName}
                      onChange={(event) => setField("partnerName", event.target.value)}
                    />
                  </label>
                )}

                <div className="quote-field-row">
                  <label className="quote-field">
                    <span>Mobile*</span>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(event) => setField("mobile", event.target.value)}
                      required
                    />
                  </label>
                  <label className="quote-field">
                    <span>Email*</span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => setField("email", event.target.value)}
                      required
                    />
                  </label>
                </div>

                <label className="quote-field">
                  <span>Instagram handle (optional)</span>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(event) => setField("instagram", event.target.value)}
                    placeholder="@yourhandle"
                  />
                  <small>
                    Add this if you&apos;d like us to tag you in any content from your
                    event.
                  </small>
                </label>

                <label className="quote-field">
                  <span>Message / special requests (optional)</span>
                  <textarea
                    value={formData.message}
                    onChange={(event) => setField("message", event.target.value)}
                    rows={4}
                  />
                </label>
              </section>
            )}

            <footer className="quote-modal-actions">
              {step > 1 ? (
                <button
                  type="button"
                  className="quote-btn quote-btn-ghost"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              ) : (
                <span />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  className="quote-btn quote-btn-solid"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="quote-btn quote-btn-solid"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Check availability & get my quote"}
                </button>
              )}
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("standard");
  const [activeFaq, setActiveFaq] = useState(0);
  const [isAccessFlipped, setIsAccessFlipped] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
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

  const openQuoteModal = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

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

  const scrollToPackages = (tab) => {
    if (tab) {
      setActiveTab(tab);
    }
    if (typeof window !== "undefined") {
      document
        .getElementById("packages")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openPackagesSection = (event) => {
    if (event) {
      event.preventDefault();
    }
    scrollToPackages();
  };

  const openBundleTab = (event) => {
    if (event) {
      event.preventDefault();
    }
    scrollToPackages("bundle");
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
    }, 2600);

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
          <a href="#studiobooth">StudioBooth System</a>
          <a href="#packages">Packages</a>
          <a href="#compare">Why Us</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#quote" className="nav-cta" onClick={openQuoteModal}>
          <span>Get Quote</span>
          <span className="nav-cta-arrow">→</span>
        </a>
      </header>

      <section className="section hero" id="top">
        <div className="hero-pattern" />
        <div className="hero-ambient" aria-hidden="true" />
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
              <span aria-hidden="true">●</span>
              <span className="hero-status-desktop">
                Attention Sydney We Have Limited Availability - Book Now
              </span>
              <span className="hero-status-mobile">
                Limited Availability - Book Now
              </span>
            </p>
            <p className="eyebrow hero-eyebrow">
              Attention Sydney & Greater Sydney Event Hosters Needing A
              Photobooth
            </p>
            <h1>Studio Quality Photo Booth For Your Special Event</h1>
            <p className="lead hero-lead">
              Sydney&apos;s best studio grade photo booth. Real camera, real
              lighting real prints
            </p>
            <img
              className="hero-mobile-photo"
              src="https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698db13624813c1899793c73.png"
              alt="AE Moments photo booth showcase"
              loading="lazy"
              decoding="async"
            />
            <div className="cta-row hero-cta">
              <a
                href="#quote"
                className="button solid hero-primary"
                onClick={openQuoteModal}
                style={{ color: "#fff" }}
              >
                <span>Get a Quote / Check Availability</span>
                <span className="button-arrow">→</span>
              </a>
              <a
                href="#packages"
                className="button outline hero-secondary"
                onClick={openPackagesSection}
                style={{ color: "#111" }}
              >
                View Packages
              </a>
            </div>
            <p className="hero-cta-note">
              Popular dates fill fast. Send your date and we&apos;ll confirm
              availability upfront.
            </p>
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
                <p>
                  <a href={googleReviewsUrl} target="_blank" rel="noreferrer">
                    5 star Google reviews
                  </a>
                </p>
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

      <section className="section usp" id="studiobooth">
        <div className="container usp-shell">
          <p className="eyebrow" data-reveal>
            WHAT WE OFFER
          </p>
          <h2 data-reveal>Our Open Air Booth</h2>
          <p className="section-lead usp-lead" data-reveal>
            Most photo booths rely on using a tablet camera and venue lighting.
            We don&apos;t. Our Open Air Booth uses Canon&apos;s latest mirrorless
            camera model + studio flash + high-quality photo paper &
            professional printer, so you and your guest take home quality studio
            grade photos
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

        </div>
      </section>

      <CompareSection />

      <section className="section audience">
        <div className="container audience-shell">
          <div className="audience-head" data-reveal>
            <SectionPill label="Built For" />
            <h2>Book us for</h2>
            <p className="section-lead audience-lead">
              Whether you&apos;re hosting an intimate celebration or a large
              event, AE Moments is for people who don&apos;t want just a photo
              booth. We offer studio quality images, a seamless setup and strict
              quality control, resulting in the best forever keepsakes for you
              and your guests.
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
            <div className="audience-logo-ticker">
              <div className="audience-logo-marquee">
                <div className="audience-logo-track">
                  {[...audiencePartnerRowA, ...audiencePartnerRowA].map((logo, index) => (
                    <img
                      key={`${logo.src}-a-${index}`}
                      className="audience-logo-inline"
                      src={logo.src}
                      alt={`${logo.name} partner logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
              <div className="audience-logo-marquee audience-logo-marquee-reverse">
                <div className="audience-logo-track audience-logo-track-reverse">
                  {[...audiencePartnerRowB, ...audiencePartnerRowB].map((logo, index) => (
                    <img
                      key={`${logo.src}-b-${index}`}
                      className="audience-logo-inline"
                      src={logo.src}
                      alt={`${logo.name} partner logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialProofSection />

      <section className="section packages" id="packages">
        <div className="container">
          <span className="packages-glow" aria-hidden="true" data-reveal />
          <SectionPill label="Packages" />
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
            <div className="bundle-tab-wrap">
              <span
                className={`bundle-save-tooltip ${
                  activeTab === "bundle" ? "is-active" : ""
                }`}
                aria-hidden="true"
              >
                Save Up to 15%
              </span>
              <button
                className={`bundle-tab-button ${
                  activeTab === "bundle" ? "active" : ""
                }`}
                onClick={() => setActiveTab("bundle")}
              >
                <span className="bundle-tab-shimmer">
                  Bundle & Save (Save Up to 15%)
                </span>
              </button>
            </div>
          </div>

          <div className="panel" key={activeTab}>
            {activeTab === "standard" ? (
              <div className="package-grid">
                {standardRates.map((item) => (
                  <StandardCard
                    key={item.name}
                    item={item}
                    onCtaClick={openQuoteModal}
                  />
                ))}
              </div>
            ) : (
              <div className="bundle-grid">
                {bundles.map((item) => (
                  <BundleCard
                    key={item.name}
                    item={item}
                    onCtaClick={openQuoteModal}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section included">
        <div className="container included-layout">
          <article data-reveal>
            <SectionPill label="Included" />
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
            <SectionPill label="Upgrades" />
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
                <a
                  href="#quote"
                  className="upgrade-basket-cta"
                  onClick={openQuoteModal}
                >
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
        onClick={openQuoteModal}
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

      <section className="section logistics">
        <div className="container logistics-layout">
          <article className="logistics-intro card" data-reveal>
            <SectionPill label="Logistics" />
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
                <LogisticsGraphic type={item.graphic} />
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="container">
          <SectionPill label="FAQ" />
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

      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />

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
            <a
              href="#quote"
              className="button solid site-footer-button"
              onClick={openQuoteModal}
            >
              <span>Get Started</span>
              <span className="button-arrow">→</span>
            </a>
          </div>
          <nav className="site-footer-links">
            <a href="#studiobooth">StudioBooth System</a>
            <a href="#packages">Packages</a>
            <a href="#compare">Why Us</a>
            <a href="#faq">FAQ</a>
            <a href="/printdesign">Print Designs</a>
            <a href="#quote" onClick={openQuoteModal}>
              Contact
            </a>
          </nav>
          <p className="site-footer-meta">AE Moments © 2026</p>
          <p className="site-footer-credit">
            Made with ❤️ by{" "}
            <a href="https://originalsmartsite.com" target="_blank" rel="noreferrer">
              SmartSite
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
