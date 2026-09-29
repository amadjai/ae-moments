"use client";

import { useState } from "react";
import { quoteBoothChoices, quoteQuickUpgrades } from "../lib/catalog";
import {
  formatEventDate,
  quoteEventTypes,
  quoteFormInitialState,
  getQuoteStepError,
  getQuoteSubmissionError,
  buildQuoteWebhookPayload
} from "../lib/quote";


const siteLogoUrl =
  "https://storage.googleapis.com/msgsndr/KbLyUwHy2FrboitSpuPl/media/698d55d552c9526c6c263eb3.png";

const quoteWebhookUrl =
  "https://services.leadconnectorhq.com/hooks/KbLyUwHy2FrboitSpuPl/webhook-trigger/0f7be69b-cbc2-41a4-bb9f-b384ba8ae0d7";
const googleAdsQuoteConversionSendTo = "AW-17980189545/r1fKCK-HhIAcEOnWz_1C";

const trackQuoteConversion = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: googleAdsQuoteConversionSendTo
  });
};

const trackMetaLead = () => {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", "Lead");
};

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(quoteFormInitialState);
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isWedding = formData.eventType === "Wedding";
  const isRoamingBooth = formData.boothChoice === "Roaming Booth (Digitals)";
  const validationState = { isWedding, isRoamingBooth };
  const progressWidth = `${(step / 4) * 100}%`;
  const stepTag = String(step);

  const setField = (field, value) => {
    setFormData((current) => {
      const next = { ...current, [field]: value };

      if (field === "eventType" && value !== "Wedding") {
        next.partnerName = "";
        next.sameVenue = "";
      }

      if (field === "boothChoice" && value !== current.boothChoice) {
        next.hireDuration = "";
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

  const validateStep = (stepToValidate = step) =>
    getQuoteStepError(stepToValidate, formData, validationState);

  const validateSubmission = () => getQuoteSubmissionError(formData, validationState);

  const handleNext = () => {
    if (isSubmitting) return;
    const error = validateStep();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    setStep((current) => Math.min(4, current + 1));
  };

  const handleBack = () => {
    if (isSubmitting) return;
    setFormError("");
    setStep((current) => Math.max(1, current - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, step: invalidStep } = validateSubmission();
    if (error) {
      setFormError(error);
      setStep(invalidStep);
      return;
    }
    setFormError("");
    setIsSubmitting(true);

    const payload = buildQuoteWebhookPayload(formData);

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

      trackQuoteConversion();
      trackMetaLead();
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
          trackQuoteConversion();
          trackMetaLead();
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
                  <p className="quote-modal-kicker">Step {stepTag} of 4</p>
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
                        <div
                          className={`quote-date-proxy ${
                            formData.dateNotSure ? "is-disabled" : ""
                          }`}
                        >
                          <input
                            className="quote-date-native"
                            type="date"
                            value={formData.eventDate}
                            onChange={(event) =>
                              setField("eventDate", event.target.value)
                            }
                            lang="en-AU"
                            disabled={formData.dateNotSure}
                            aria-label="Event date"
                          />
                          <span
                            className={`quote-date-display ${
                              formData.eventDate ? "has-value" : ""
                            }`}
                          >
                            {formData.eventDate
                              ? formatEventDate(formData.eventDate)
                              : "dd/mm/yyyy"}
                          </span>
                          <span className="quote-date-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" role="presentation">
                              <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9Zm-1-4H6a1 1 0 0 0-1 1v1h14V7a1 1 0 0 0-1-1Z" />
                            </svg>
                          </span>
                        </div>
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
                    <h3>Choose your main experience</h3>
                    <div className="quote-choice-grid">
                      {quoteBoothChoices.map((option) => (
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

                {step === 3 && (
                  <section className="quote-step-body">
                    <h3>Event timing & location</h3>

                    <fieldset className="quote-fieldset">
                      <legend>Hire duration*</legend>
                      <p className="quote-helper">
                        For weddings, the booth must be set up before guests arrive
                        and packed down after formalities to avoid disruption. For
                        this reason, we require a minimum 4 hour booking.
                      </p>
                      <select
                        className="quote-select"
                        value={formData.hireDuration}
                        onChange={(event) => setField("hireDuration", event.target.value)}
                        required
                      >
                        <option value="">Select duration</option>
                        {formData.boothChoice === "Long term Enclosed Booth (Custom quote)" && (
                          <option value="Long-term hire / discuss duration">
                            Long-term hire / discuss duration
                          </option>
                        )}
                        {[
                          "3 hours",
                          "3.5 hours",
                          "4 hours",
                          "4.5 hours",
                          "5 hours",
                          "5.5 hours",
                          "6 hours",
                          "6.5 hours",
                          "7 or more hours"
                        ].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
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
                      <span>Venue Name*</span>
                      <input
                        type="text"
                        value={formData.venueName}
                        onChange={(event) => setField("venueName", event.target.value)}
                        placeholder="E.g. Highline Venue"
                        required
                      />
                    </label>

                    <label className="quote-field">
                      <span>Venue Address*</span>
                      <input
                        type="text"
                        value={formData.venueAddress}
                        onChange={(event) =>
                          setField("venueAddress", event.target.value)
                        }
                        placeholder="E.g. Level 3/462 Chapel Rd, Bankstown"
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

                {step === 4 && (
                  <section className="quote-step-body">
                    <h3>Where should we send your quote?</h3>

                    <label className="quote-field">
                      <span>Full Name*</span>
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

                  {step < 4 ? (
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
