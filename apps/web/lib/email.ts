/**
 * Brevo transactional email helper — server-side only.
 *
 * Sends emails via the Brevo v3 SMTP API using template IDs + dynamic
 * parameter objects (never inline HTML — see CLAUDE.md "Every Brevo email
 * send must use template ID + dynamic data").
 *
 * Template IDs are read from env vars so the human can configure them in
 * the Brevo dashboard (Day 5 / Day 11-13 setup) and inject them via
 * .env.local without a code change.
 *
 * If BREVO_API_KEY or a template ID is missing, the send is skipped
 * gracefully with a [email skipped] log — so the funnel works end-to-end
 * in local dev and staging before the Brevo account is set up.
 */

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

/** Contact address for the PiekAI owner — M's inbox. */
const INTERNAL_INBOX = "hello@piekai.nl";

interface BrevoRecipient {
  email: string;
  name?: string;
}

interface SendTemplateEmailParams {
  to: BrevoRecipient[];
  /** Brevo template ID (numeric). */
  templateId: number;
  /** Mustache / Brevo param object passed to the template. */
  params: Record<string, string | number | undefined>;
}

async function sendTemplateEmail({
  to,
  templateId,
  params,
}: SendTemplateEmailParams): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.log("[email skipped] BREVO_API_KEY is not set.");
    return;
  }

  const body = JSON.stringify({ to, templateId, params });

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "(no body)");
    // Log but do NOT throw — a failed email must not block the DB insert.
    console.error(
      `[email error] Brevo returned ${response.status} for templateId ${templateId}: ${text}`,
    );
  }
}

/**
 * Sends both notification emails when a new audit request is submitted:
 *
 *  1. Internal alert → hello@piekai.nl  (template: BREVO_TEMPLATE_AUDIT_INTERNAL)
 *  2. Submitter confirmation             (template: BREVO_TEMPLATE_AUDIT_CONFIRM)
 *
 * Template IDs are resolved from env vars. If either env var is missing the
 * corresponding send is skipped (logged as [email skipped]).
 *
 * Day 5 / Day 11-13: create the two templates in the Brevo dashboard and set
 * BREVO_TEMPLATE_AUDIT_INTERNAL and BREVO_TEMPLATE_AUDIT_CONFIRM in .env.local
 * (and in Cloudflare Workers env for production).
 */
export async function sendAuditRequestEmails(data: {
  companyName: string;
  websiteUrl: string;
  email: string;
}): Promise<void> {
  const internalTemplateId = process.env.BREVO_TEMPLATE_AUDIT_INTERNAL;
  const confirmTemplateId = process.env.BREVO_TEMPLATE_AUDIT_CONFIRM;

  // Internal notification to M.
  if (!internalTemplateId) {
    console.log("[email skipped] BREVO_TEMPLATE_AUDIT_INTERNAL is not set.");
  } else {
    await sendTemplateEmail({
      to: [{ email: INTERNAL_INBOX, name: "PiekAI" }],
      templateId: Number(internalTemplateId),
      params: {
        companyName: data.companyName,
        websiteUrl: data.websiteUrl,
        submitterEmail: data.email,
      },
    });
  }

  // Confirmation to the submitter.
  if (!confirmTemplateId) {
    console.log("[email skipped] BREVO_TEMPLATE_AUDIT_CONFIRM is not set.");
  } else {
    await sendTemplateEmail({
      to: [{ email: data.email }],
      templateId: Number(confirmTemplateId),
      params: {
        companyName: data.companyName,
        websiteUrl: data.websiteUrl,
      },
    });
  }
}
