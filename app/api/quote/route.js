import { NextResponse } from "next/server";

const quoteWebhookUrl =
  process.env.QUOTE_WEBHOOK_URL ||
  "https://services.leadconnectorhq.com/hooks/KbLyUwHy2FrboitSpuPl/webhook-trigger/0f7be69b-cbc2-41a4-bb9f-b384ba8ae0d7";

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");
const hasText = (value) => normalizeText(value).length > 0;
const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(normalizeText(value));

const getQuoteStepError = (step, payload) => {
  const eventType = normalizeText(payload?.eventBasics?.eventType ?? payload?.flat?.event_type);
  const eventDateStatus =
    payload?.eventBasics?.eventDateStatus ??
    (payload?.flat?.event_date_not_sure ? "not_sure_yet" : "confirmed_date");
  const eventDate = normalizeText(payload?.eventBasics?.eventDate ?? payload?.flat?.event_date);
  const guestCount = Number(payload?.eventBasics?.guestCount ?? payload?.flat?.guest_count);
  const buildPath = normalizeText(payload?.experiencePath?.pathMode ?? payload?.flat?.build_path);
  const boothChoice = normalizeText(
    payload?.experiencePath?.curate?.boothChoice ?? payload?.flat?.booth_choice
  );
  const roamingPrinting = normalizeText(
    payload?.experiencePath?.curate?.roamingPrintingPreference ??
      payload?.flat?.roaming_printing
  );
  const bundleChoice = normalizeText(
    payload?.experiencePath?.bundle?.bundleChoice ?? payload?.flat?.bundle_choice
  );
  const hireDuration = normalizeText(
    payload?.timingVenue?.hireDuration ?? payload?.flat?.hire_duration
  );
  const eventStartTime = normalizeText(
    payload?.timingVenue?.eventStartTime ?? payload?.flat?.event_start_time
  );
  const eventFinishTime = normalizeText(
    payload?.timingVenue?.eventFinishTime ?? payload?.flat?.event_finish_time
  );
  const venueAddress = normalizeText(
    payload?.timingVenue?.venueSuburbAddress ?? payload?.flat?.venue_address
  );
  const fullName = normalizeText(payload?.contact?.name ?? payload?.flat?.full_name);
  const mobile = normalizeText(payload?.contact?.mobile ?? payload?.flat?.mobile);
  const email = normalizeText(payload?.contact?.email ?? payload?.flat?.email);
  const isWedding = eventType === "Wedding";
  const isCuratePath = buildPath === "curate";
  const isBundlePath = buildPath === "bundle";
  const isRoamingBooth = boothChoice === "Roaming Booth (Digitals)";

  if (step === 1) {
    if (!hasText(eventType)) return "Please select your event type.";
    if (eventDateStatus !== "not_sure_yet" && !hasText(eventDate)) {
      return "Please choose your event date or tick “Not sure yet”.";
    }
    if (eventDateStatus !== "not_sure_yet" && !/^\d{2}\/\d{2}\/\d{4}$/.test(eventDate)) {
      return "Please choose a valid event date.";
    }
    if (!Number.isFinite(guestCount) || guestCount <= 0) {
      return "Please enter a valid guest count.";
    }
  }

  if (step === 2 && !hasText(buildPath)) {
    return "Please choose how you'd like to build your experience.";
  }

  if (step === 3) {
    if (isCuratePath) {
      if (!hasText(boothChoice)) return "Please choose your main booth experience.";
      if (isRoamingBooth && !hasText(roamingPrinting)) {
        return "Please select your roaming printing preference.";
      }
    }

    if (isBundlePath && !hasText(bundleChoice)) {
      return "Please choose a bundle option.";
    }
  }

  if (step === 4) {
    if (!hasText(hireDuration)) return "Please select the hire duration.";
    if (isWedding && hireDuration === "3 hours") {
      return "For weddings, minimum booking is 4 hours.";
    }
    if (!hasText(eventStartTime)) return "Please choose an event start time.";
    if (!hasText(eventFinishTime)) return "Please choose an event finish time.";
    if (!hasText(venueAddress)) return "Please add venue suburb or address.";
  }

  if (step === 5) {
    if (!hasText(fullName)) return "Please enter your name.";
    if (!hasText(mobile)) return "Please enter your mobile number.";
    if (!hasText(email)) return "Please enter your email address.";
    if (!isValidEmail(email)) {
      return "Please enter a valid email address.";
    }
  }

  return "";
};

const validateQuotePayload = (payload) => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "Invalid quote submission payload.";
  }

  for (const step of [1, 2, 3, 4, 5]) {
    const error = getQuoteStepError(step, payload);
    if (error) return error;
  }

  return "";
};

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validateQuotePayload(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    const response = await fetch(quoteWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Webhook request failed with status ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Couldn’t submit right now. Please try again, or contact us directly." },
      { status: 502 }
    );
  }
}
