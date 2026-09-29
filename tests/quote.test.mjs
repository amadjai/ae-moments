import assert from "node:assert/strict";
import test from "node:test";
import {
  buildQuoteWebhookPayload,
  getQuoteSubmissionError,
  quoteFormInitialState
} from "../app/lib/quote.js";
import { quoteBoothChoices, quoteQuickUpgrades } from "../app/lib/catalog.js";

const completeEnquiry = {
  ...quoteFormInitialState,
  eventType: "Corporate events",
  eventDate: "2026-12-15",
  guestCount: "120",
  boothChoice: "Wooden Luxe Booth (Prints + Digitals)",
  hireDuration: "4 hours",
  eventStartTime: "6 PM",
  eventFinishTime: "10 PM",
  venueName: "Example Venue",
  venueAddress: "Example address, Sydney",
  fullName: "Test Guest",
  mobile: "0400000000",
  email: "test@example.com"
};

const validate = (data) => getQuoteSubmissionError(data, {
  isWedding: data.eventType === "Wedding",
  isRoamingBooth: data.boothChoice === "Roaming Booth (Digitals)"
});

test("all current booths can complete an enquiry without choosing a build path", () => {
  for (const boothChoice of quoteBoothChoices) {
    const enquiry = { ...completeEnquiry, boothChoice, roamingPrinting: "Digitals only" };
    assert.equal(validate(enquiry).error, "");
    assert.equal(buildQuoteWebhookPayload(enquiry).flat.booth_choice, boothChoice);
  }
});

test("missing booth and roaming printing choices return to experience step 2", () => {
  for (const boothChoice of ["", "Roaming Booth (Digitals)"]) {
    const result = validate({ ...completeEnquiry, boothChoice });
    assert.equal(result.step, 2);
    assert.notEqual(result.error, "");
  }
});

test("wedding minimum duration still applies on timing step 3", () => {
  for (const hireDuration of ["3 hours", "3.5 hours"]) {
    const result = validate({ ...completeEnquiry, eventType: "Wedding", hireDuration });
    assert.equal(result.step, 3);
    assert.match(result.error, /minimum booking is 4 hours/);
  }
  assert.equal(validate({ ...completeEnquiry, eventType: "Wedding" }).error, "");
});

test("incomplete contact information returns to the final step 4", () => {
  const result = validate({ ...completeEnquiry, email: "invalid" });
  assert.equal(result.step, 4);
  assert.match(result.error, /valid email/);
});

test("long-term enquiries accept a discussed duration and undecided event date", () => {
  const data = {
    ...completeEnquiry,
    boothChoice: "Long term Enclosed Booth (Custom quote)",
    hireDuration: "Long-term hire / discuss duration",
    dateNotSure: true,
    eventDate: ""
  };
  assert.equal(validate(data).error, "");
  const payload = buildQuoteWebhookPayload(data);
  assert.equal(payload.eventBasics.eventDate, null);
  assert.equal(payload.timingVenue.hireDuration, data.hireDuration);
});

test("both form sources preserve add-on selections and existing automation fields", () => {
  for (const source of ["AE Moments Quote Popup", "AE Moments Quote Page"]) {
    const payload = buildQuoteWebhookPayload({
      ...completeEnquiry,
      quickUpgrades: quoteQuickUpgrades,
      // Stale client values must never re-enable the retired bundle path.
      buildPath: "bundle",
      bundleChoice: "Retired bundle",
      message: "<script>alert('test')</script>"
    }, source);
    assert.equal(payload.source.formName, source);
    assert.equal(payload.automationDigest.fields.sourceForm, source);
    assert.equal(payload.experiencePath.pathMode, "curate");
    assert.equal(payload.experiencePath.bundle, null);
    assert.equal(payload.flat.bundle_choice, "");
    assert.equal(payload.summary.selectedBundle, null);
    assert.equal(payload.flat.event_date, "15/12/2026");
    assert.deepEqual(payload.experiencePath.curate.quickUpgradesSelected, quoteQuickUpgrades);
    for (const upgrade of quoteQuickUpgrades) assert.ok(payload.flat.quick_upgrades.includes(upgrade));
    assert.doesNotMatch(payload.automationDigest.text, /Bundle Choice|<script>/);
    assert.match(payload.automationDigest.text, /&lt;script&gt;/);
  }
});
