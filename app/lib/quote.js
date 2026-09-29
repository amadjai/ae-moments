export const formatEventDate = (eventDate) => {
  const value = String(eventDate || "").trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  return `${day}/${month}/${year}`;
};

const hasFullName = (value) => {
  const normalized = String(value ?? "").trim().replace(/\s+/g, " ");
  return normalized.split(" ").filter(Boolean).length >= 2;
};

export const quoteEventTypes = [
  "Wedding",
  "Engagement",
  "Birthday",
  "Corporate events",
  "Product activation",
  "School formal",
  "Other occasion"
];

export const quoteFormInitialState = {
  eventType: "",
  eventDate: "",
  dateNotSure: false,
  guestCount: "",
  boothChoice: "",
  roamingPrinting: "",
  quickUpgrades: [],
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

export const getQuoteStepError = (step, formData, validationState) => {
  const { isWedding, isRoamingBooth } = validationState;

  if (step === 1) {
    if (!formData.eventType) return "Please select your event type.";
    if (!formData.dateNotSure && !formData.eventDate) {
      return "Please choose your event date or tick “Not sure yet”.";
    }
    if (!formData.dateNotSure && !/^\d{4}-\d{2}-\d{2}$/.test(formData.eventDate.trim())) {
      return "Please choose a valid event date.";
    }
    if (!formData.guestCount || Number(formData.guestCount) <= 0) {
      return "Please enter a valid guest count.";
    }
  }

  if (step === 2) {
    if (!formData.boothChoice) return "Please choose your main booth experience.";
    if (isRoamingBooth && !formData.roamingPrinting) {
      return "Please select your roaming printing preference.";
    }
  }

  if (step === 3) {
    if (!formData.hireDuration) return "Please select the hire duration.";
    if (isWedding && (formData.hireDuration === "3 hours" || formData.hireDuration === "3.5 hours")) {
      return "For weddings, minimum booking is 4 hours.";
    }
    if (!formData.eventStartTime) return "Please choose an event start time.";
    if (!formData.eventFinishTime) return "Please choose an event finish time.";
    if (!formData.venueName.trim()) return "Please enter a venue name.";
    if (!formData.venueAddress.trim()) return "Please add a venue address.";
  }

  if (step === 4) {
    if (!formData.fullName.trim()) return "Please enter your full name.";
    if (!hasFullName(formData.fullName)) {
      return "Please enter your first and last name.";
    }
    if (!formData.mobile.trim()) return "Please enter your mobile number.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }
  }

  return "";
};

export const getQuoteSubmissionError = (formData, validationState) => {
  for (const step of [1, 2, 3, 4]) {
    const error = getQuoteStepError(step, formData, validationState);
    if (error) {
      return { step, error };
    }
  }

  return { step: 4, error: "" };
};

export function buildQuoteWebhookPayload(formData, sourceForm = "AE Moments Quote Page") {
  const submittedAt = new Date().toISOString();
  const guestCount = Number(formData.guestCount) || 0;
  const isWedding = formData.eventType === "Wedding";
  const quickUpgrades = formData.quickUpgrades ?? [];
  const normalizedEventDate = formData.dateNotSure
    ? ""
    : formatEventDate(formData.eventDate);
  const selectedPathLabel = "Curate my own photo booth experience";
  const quickUpgradesText = quickUpgrades.length
    ? quickUpgrades.join("; ")
    : "None selected";
  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const summaryLine = [
    `${formData.eventType || "Event type not set"}`,
    `${guestCount || "?"} guests`,
    formData.dateNotSure ? "Date not set" : normalizedEventDate || "Date not set",
    selectedPathLabel
  ].join(" | ");

  const automationFields = {
    submittedAt,
    sourceForm,
    summaryLine,
    eventType: formData.eventType || "",
    eventDate: normalizedEventDate,
    eventDateNotSure: Boolean(formData.dateNotSure),
    guestCount: guestCount || "",
    buildPath: "curate",
    buildPathLabel: selectedPathLabel,
    boothChoice: formData.boothChoice || "",
    roamingPrinting: formData.roamingPrinting || "",
    bundleChoice: "",
    quickUpgrades: quickUpgrades,
    quickUpgradesText,
    hireDuration: formData.hireDuration || "",
    eventStartTime: formData.eventStartTime || "",
    eventFinishTime: formData.eventFinishTime || "",
    venueName: formData.venueName || "",
    venueAddress: formData.venueAddress || "",
    weddingSameVenue: formData.sameVenue || "",
    fullName: formData.fullName || "",
    partnerName: formData.partnerName || "",
    mobile: formData.mobile || "",
    email: formData.email || "",
    instagramHandle: formData.instagram || "",
    message: formData.message || ""
  };

  const automationDigestItems = [
    ["Submitted At", submittedAt],
    ["Form Source", sourceForm],
    ["Summary", summaryLine],
    ["Event Type", automationFields.eventType || "N/A"],
    [
      "Event Date",
      automationFields.eventDateNotSure
        ? "Not sure yet"
        : automationFields.eventDate || "N/A"
    ],
    ["Guest Count", automationFields.guestCount || "N/A"],
    ["Build Path", automationFields.buildPathLabel],
    ["Booth Choice", automationFields.boothChoice || "N/A"],
    ["Roaming Printing", automationFields.roamingPrinting || "N/A"],
    ["Quick Upgrades", quickUpgradesText],
    ["Hire Duration", automationFields.hireDuration || "N/A"],
    ["Event Start Time", automationFields.eventStartTime || "N/A"],
    ["Event Finish Time", automationFields.eventFinishTime || "N/A"],
    ["Venue Name", automationFields.venueName || "N/A"],
    ["Venue Address", automationFields.venueAddress || "N/A"],
    [
      "Ceremony & Reception Same Venue",
      automationFields.weddingSameVenue || "N/A"
    ],
    ["Name", automationFields.fullName || "N/A"],
    ["Partner Name", automationFields.partnerName || "N/A"],
    ["Mobile", automationFields.mobile || "N/A"],
    ["Email", automationFields.email || "N/A"],
    ["Instagram", automationFields.instagramHandle || "N/A"],
    ["Message", automationFields.message || "N/A"]
  ];

  const automationDigestText = `<ul>${automationDigestItems
    .map(
      ([label, value]) =>
        `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`
    )
    .join("")}</ul>`;

  return {
    webhookVersion: "1.2",
    submissionId:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    submittedAt,
    source: {
      formName: sourceForm,
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
      eventDate: normalizedEventDate || null,
      guestCount
    },
    experiencePath: {
      pathMode: "curate",
      pathLabel: selectedPathLabel,
      curate: {
        boothChoice: formData.boothChoice || null,
        roamingPrintingPreference: formData.roamingPrinting || null,
        quickUpgradesSelected: quickUpgrades,
        quickUpgradesCount: quickUpgrades.length
      },
      // Keep retired fields empty for existing webhook automations.
      bundle: null
    },
    timingVenue: {
      hireDuration: formData.hireDuration || null,
      eventStartTime: formData.eventStartTime || null,
      eventFinishTime: formData.eventFinishTime || null,
      venueName: formData.venueName || null,
      venueAddress: formData.venueAddress || null,
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
      selectedBooth: formData.boothChoice || null,
      selectedBundle: null,
      hasQuickUpgrades: quickUpgrades.length > 0
    },
    automationDigest: {
      text: automationDigestText,
      fields: automationFields
    },
    flat: {
      event_type: formData.eventType || "",
      event_date: normalizedEventDate,
      event_date_not_sure: Boolean(formData.dateNotSure),
      guest_count: guestCount || "",
      build_path: "curate",
      booth_choice: formData.boothChoice || "",
      roaming_printing: formData.roamingPrinting || "",
      bundle_choice: "",
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
