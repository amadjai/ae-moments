"use client";

import { useMemo, useState } from "react";

const siteLogoUrl =
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png";

const quoteWebhookUrl =
  "https://services.leadconnectorhq.com/hooks/KbLyUwHy2FrboitSpuPl/webhook-trigger/0f7be69b-cbc2-41a4-bb9f-b384ba8ae0d7";

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
  const quickUpgradesText = quickUpgrades.length
    ? quickUpgrades.join("; ")
    : "None selected";
  const bundleChoicesText =
    bundleChoices && bundleChoices.length
      ? bundleChoices.join("; ")
      : "No bundle options";
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
    formData.dateNotSure ? "Date not set" : formData.eventDate || "Date not set",
    selectedPathLabel
  ].join(" | ");

  const automationFields = {
    submittedAt,
    sourceForm: "AE Moments Quote Page",
    summaryLine,
    eventType: formData.eventType || "",
    eventDate: formData.dateNotSure ? "" : formData.eventDate || "",
    eventDateNotSure: Boolean(formData.dateNotSure),
    guestCount: guestCount || "",
    buildPath: formData.buildPath || "",
    buildPathLabel: selectedPathLabel,
    boothChoice: formData.boothChoice || "",
    roamingPrinting: formData.roamingPrinting || "",
    bundleChoice: formData.bundleChoice || "",
    bundleChoicesShown: bundleChoicesText,
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
    ["Form Source", "AE Moments Quote Page"],
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
    ["Bundle Choice", automationFields.bundleChoice || "N/A"],
    ["Bundle Options Shown", automationFields.bundleChoicesShown],
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
      formName: "AE Moments Quote Page",
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
    automationDigest: {
      text: automationDigestText,
      fields: automationFields
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

export default function QuotePage() {
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
      if (
        !formData.dateNotSure &&
        !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.eventDate.trim())
      ) {
        return "Please enter event date in dd/mm/yyyy format.";
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
          window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <main className="page-shell quote-page">
      <header className="top-nav quote-page-nav">
        <a className="brand" href="/" aria-label="Go to AE Moments homepage">
          <img className="brand-logo" src={siteLogoUrl} alt="AE Moments" />
        </a>
        <nav className="nav-center" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/#studiobooth">Open Air Booth</a>
          <a href="/#packages">Packages</a>
          <a href="/printdesign">Print Designs</a>
        </nav>
        <a className="nav-cta" href="/">
          <span>Back Home</span>
          <span className="nav-cta-arrow" aria-hidden="true">
            ←
          </span>
        </a>
      </header>

      <section className="section quote-page-section">
        <div className="container quote-page-intro">
          <p className="section-pill quote-page-pill">
            <span aria-hidden="true">✱</span>
            <span>Quote</span>
          </p>
          <h1 className="quote-page-title">Check availability & get your quote</h1>
          <p className="section-lead quote-page-lead">
            Fill in your event details and AE Moments will send your recommended
            setup, availability, and pricing options.
          </p>
        </div>

        <div className="container">
          <div className="quote-modal-shell quote-page-shell">
            {isSubmitted ? (
              <section className="quote-success-view">
                <p className="quote-modal-kicker">Quote request received</p>
                <h3>Thanks, we&apos;ll confirm availability shortly.</h3>
                <p>
                  Your event details are in. The AE Moments team will send your
                  recommended setup and pricing quote as soon as possible.
                </p>
                <div className="quote-page-success-actions">
                  <a href="/" className="quote-btn quote-btn-solid">
                    Back to Home
                  </a>
                  <a href="/printdesign" className="quote-btn quote-btn-ghost">
                    View Print Designs
                  </a>
                </div>
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
                    <h3>Check availability for your event</h3>
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
                          type="text"
                          value={formData.eventDate}
                          onChange={(event) =>
                            setField("eventDate", event.target.value)
                          }
                          inputMode="numeric"
                          placeholder="dd/mm/yyyy"
                          pattern="\d{2}/\d{2}/\d{4}"
                          disabled={formData.dateNotSure}
                        />
                      </label>
                      <label className="quote-check-line">
                        <input
                          type="checkbox"
                          checked={formData.dateNotSure}
                          onChange={(event) =>
                            setField("dateNotSure", event.target.checked)
                          }
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
                        onChange={(event) =>
                          setField("guestCount", event.target.value)
                        }
                        placeholder="e.g. 120"
                        required
                      />
                    </label>
                  </section>
                )}

                {step === 2 && (
                  <section className="quote-step-body">
                    <h3>How would you like to build your experience?</h3>
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
                          onChange={(event) =>
                            setField("buildPath", event.target.value)
                          }
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
                          onChange={(event) =>
                            setField("buildPath", event.target.value)
                          }
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
                    <h3>Choose your main experience</h3>
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
                            onChange={(event) =>
                              setField("boothChoice", event.target.value)
                            }
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
                    <h3>Choose a bundle & save</h3>
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
                            onChange={(event) =>
                              setField("bundleChoice", event.target.value)
                            }
                          />
                          <span className="quote-choice-title">{option}</span>
                        </label>
                      ))}
                    </div>
                  </section>
                )}

                {step === 4 && (
                  <section className="quote-step-body">
                    <h3>Event timing & location</h3>

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
                                onChange={(event) =>
                                  setField("hireDuration", event.target.value)
                                }
                              />
                              <span>{option}</span>
                            </label>
                          )
                        )}
                      </div>
                    </fieldset>

                    <label className="quote-field">
                      <span>Event Start Time*</span>
                      <input
                        type="text"
                        value={formData.eventStartTime}
                        onChange={(event) =>
                          setField("eventStartTime", event.target.value)
                        }
                        placeholder="e.g. 5:30 PM"
                        required
                      />
                    </label>

                    <label className="quote-field">
                      <span>Event Finish Time*</span>
                      <input
                        type="text"
                        value={formData.eventFinishTime}
                        onChange={(event) =>
                          setField("eventFinishTime", event.target.value)
                        }
                        placeholder="e.g. 11:45 PM"
                        required
                      />
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
                        onChange={(event) =>
                          setField("venueAddress", event.target.value)
                        }
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
                                onChange={(event) =>
                                  setField("sameVenue", event.target.value)
                                }
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
                    <h3>Where should we send your quote?</h3>

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
                          onChange={(event) =>
                            setField("partnerName", event.target.value)
                          }
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
      </section>
    </main>
  );
}
