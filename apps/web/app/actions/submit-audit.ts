"use server";

/**
 * Server Action: submitAuditRequest
 *
 * Validates the Free Audit form payload server-side, inserts a row into
 * `audit_requests`, and dispatches two Brevo emails (if configured).
 *
 * Return type is a discriminated union so the client can branch on `ok`
 * without catching exceptions.
 *
 * TODO Day 5+: The /admin/audits view (auth-gated) will also read from this
 * table via the same service-role `db` client.
 */

import { auditRequests, db } from "@piekai/db";
import { AuditRequest } from "@piekai/types";
import { sendAuditRequestEmails } from "@/lib/email";

export type SubmitAuditResult = { ok: true } | { ok: false; error: string };

/**
 * Normalizes a URL value to start with `https://`.
 * Handles: "jouwbedrijf.nl", "http://…", "https://…"
 */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/^http:\/\//i, "https://");
  }
  return `https://${trimmed}`;
}

export async function submitAuditRequest(payload: unknown): Promise<SubmitAuditResult> {
  // --- 1. Server-side validation (never trust client) ---
  const parsed = AuditRequest.safeParse(payload);
  if (!parsed.success) {
    // Return the first validation message — these are already user-friendly
    // Dutch strings from the Zod schema in @piekai/types.
    const firstMessage = parsed.error.issues[0]?.message ?? "Ongeldige invoer.";
    return { ok: false, error: firstMessage };
  }

  const data = parsed.data;

  // --- 2. Normalize websiteUrl ---
  const websiteUrl = normalizeUrl(data.websiteUrl);

  // --- 3. Insert into audit_requests ---
  try {
    await db.insert(auditRequests).values({
      companyName: data.companyName,
      websiteUrl,
      sector: data.sector,
      email: data.email,
      phone: data.phone ?? null,
      // status defaults to "pending" in the schema
    });
  } catch (error: unknown) {
    console.error("[audit] DB insert failed:", error);
    return {
      ok: false,
      error:
        "Er is iets misgegaan bij het opslaan van je aanvraag. " +
        "Probeer het opnieuw of stuur een e-mail naar hello@piekai.nl.",
    };
  }

  // --- 4. Send Brevo emails (best-effort — never throw) ---
  try {
    await sendAuditRequestEmails({
      companyName: data.companyName,
      websiteUrl,
      email: data.email,
    });
  } catch (error: unknown) {
    // Email failure must not surface as a form error — the lead is already
    // saved. Log and continue.
    console.error("[audit] Email dispatch failed:", error);
  }

  return { ok: true };
}
