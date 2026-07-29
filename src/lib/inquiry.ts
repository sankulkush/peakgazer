"use server";

import { headers } from "next/headers";
import { getJourney } from "@/lib/content";
import { RESPONSE_TIME } from "@/content/company";
import {
  EXPERIENCE_LABELS,
  inquirySchema,
  type InquiryInput,
  type InquiryResult,
} from "@/lib/inquiry-schema";

/**
 * In-memory rate limit. Deliberately not a database: this is a static site with
 * no persistence, and a per-instance counter is enough to stop a script hammering
 * the endpoint. It resets on deploy, which is acceptable for this threat model.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function formatInquiry(data: InquiryInput): string {
  const journey =
    data.journey === "unsure"
      ? "Not sure yet"
      : (getJourney(data.journey)?.name ?? data.journey);

  return [
    `Trek:        ${journey}`,
    `Dates:       ${data.dates}`,
    `Group size:  ${data.groupSize}`,
    `Experience:  ${EXPERIENCE_LABELS[data.experience]}`,
    `Contact:     ${data.contact}`,
    "",
    "Notes:",
    data.notes?.trim() ? data.notes.trim() : "(none)",
  ].join("\n");
}

/**
 * Delivery address. Lives here rather than in content/company.ts on purpose:
 * that module is imported by client components, so anything in it ships in the
 * browser bundle. This file is "use server" and never reaches the client.
 *
 * TODO before launch: replace with an address on the real brand's domain. This
 * one carries the wrong name and must never be shown to a customer — WhatsApp
 * is the visible contact channel.
 */
const FALLBACK_TO_EMAIL = "uthbus021@gmail.com";

async function deliver(subject: string, body: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL ?? FALLBACK_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;

  // No key configured: log and succeed, so the flow is testable locally
  // without standing up an email provider first.
  if (!apiKey || !to || !from) {
    console.log(
      `\n[inquiry] RESEND_API_KEY / INQUIRY_TO_EMAIL / INQUIRY_FROM_EMAIL not all set — logging instead of sending.\n[inquiry] ${subject}\n${body}\n`,
    );
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text: body }),
  });

  if (!res.ok) {
    console.error("[inquiry] Resend failed:", res.status, await res.text());
    return false;
  }
  return true;
}

export async function submitInquiry(
  _prev: InquiryResult | null,
  formData: FormData,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Some details need another look.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Honeypot: a bot fills every field it finds. Report success so it learns nothing.
  if (parsed.data.website) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return {
      ok: false,
      message:
        "That's several inquiries from here already. Message us on WhatsApp and we'll pick it up faster.",
    };
  }

  const journeyName =
    parsed.data.journey === "unsure"
      ? "Not sure yet"
      : (getJourney(parsed.data.journey)?.name ?? parsed.data.journey);

  const sent = await deliver(
    `Inquiry — ${journeyName}, ${parsed.data.groupSize} ${parsed.data.groupSize === 1 ? "person" : "people"}`,
    formatInquiry(parsed.data),
  );

  if (!sent) {
    return {
      ok: false,
      message:
        "Something failed on our end. Message us on WhatsApp instead and we'll answer straight away.",
    };
  }

  return {
    ok: true,
    message: `Thanks — that's with us. We reply ${RESPONSE_TIME}.`,
  };
}
