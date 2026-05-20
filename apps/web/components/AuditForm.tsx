"use client";

import { AuditRequest, SECTOR_OPTIONS } from "@piekai/types";
import { useId, useState } from "react";
import type { z } from "zod";
import { Button } from "./Button";

/**
 * AuditForm — section 7. Free Audit request form with client-side Zod
 * validation. The submit handler is a Phase 0 stub: it validates, shows a
 * confirmation state, and does NOT call a backend.
 *
 * >>> DAY 11-13: replace `submitAuditRequest` below with a real POST to the
 * Supabase Edge Function / tRPC route that inserts into `audit_requests`
 * and triggers the Brevo confirmation email. The AuditRequest schema in
 * @piekai/types is the shared contract — reuse it server-side. <<<
 */

type FieldName = keyof z.infer<typeof AuditRequest>;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success";

const EMPTY = {
  companyName: "",
  websiteUrl: "",
  sector: "",
  email: "",
  phone: "",
};

/* Phase 0 stub — see file header. No network call. */
async function submitAuditRequest(_data: z.infer<typeof AuditRequest>): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
}

const inputClass = (hasError: boolean) =>
  [
    "h-11 w-full rounded-[4px] border bg-bone-50 px-4 font-body text-base text-bone-800",
    "placeholder:text-bone-400 transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-500",
    hasError ? "border-danger" : "border-bone-300 focus:border-accent-500",
  ].join(" ");

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-body text-sm font-medium text-bone-700">
        {label}
        {optional && <span className="ml-1.5 font-normal text-bone-400">(optioneel)</span>}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 font-body text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function AuditForm() {
  const baseId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      companyName: values.companyName,
      websiteUrl: values.websiteUrl,
      sector: values.sector,
      email: values.email,
      phone: values.phone || undefined,
    };
    const result = AuditRequest.safeParse(payload);

    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    await submitAuditRequest(result.data);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent-500 bg-bone-50 p-8 text-center sm:p-12">
        <svg viewBox="0 0 48 48" className="mx-auto h-12 w-12" role="img" aria-label="Verzonden">
          <title>Verzonden</title>
          <circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent-500)" strokeWidth="1.5" />
          <path
            d="M15 24.5 21 30.5 33 17"
            fill="none"
            stroke="var(--accent-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="mt-6 text-2xl text-bone-800">Aanvraag ontvangen.</h3>
        <p className="mx-auto mt-3 max-w-[40ch] font-body text-base leading-[1.7] text-bone-500">
          Bedankt. We bekijken je AI-zichtbaarheid en sturen je rapport binnen 24 uur naar{" "}
          <span className="font-mono text-sm text-bone-700">{values.email}</span>. Geen verkoper,
          alleen het rapport.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-bone-200 bg-bone-50 p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${baseId}-companyName`}
          label="Bedrijfsnaam"
          required
          error={errors.companyName}
        >
          <input
            id={`${baseId}-companyName`}
            name="companyName"
            type="text"
            autoComplete="organization"
            value={values.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            aria-invalid={errors.companyName ? true : undefined}
            aria-describedby={errors.companyName ? `${baseId}-companyName-err` : undefined}
            className={inputClass(!!errors.companyName)}
          />
        </Field>

        <Field id={`${baseId}-websiteUrl`} label="Website-URL" required error={errors.websiteUrl}>
          <input
            id={`${baseId}-websiteUrl`}
            name="websiteUrl"
            type="text"
            inputMode="url"
            placeholder="jouwbedrijf.nl"
            autoComplete="url"
            value={values.websiteUrl}
            onChange={(e) => update("websiteUrl", e.target.value)}
            aria-invalid={errors.websiteUrl ? true : undefined}
            aria-describedby={errors.websiteUrl ? `${baseId}-websiteUrl-err` : undefined}
            className={inputClass(!!errors.websiteUrl)}
          />
        </Field>

        <Field id={`${baseId}-sector`} label="Sector" required error={errors.sector}>
          <select
            id={`${baseId}-sector`}
            name="sector"
            value={values.sector}
            onChange={(e) => update("sector", e.target.value)}
            aria-invalid={errors.sector ? true : undefined}
            aria-describedby={errors.sector ? `${baseId}-sector-err` : undefined}
            className={inputClass(!!errors.sector)}
          >
            <option value="" disabled>
              Kies je sector
            </option>
            {SECTOR_OPTIONS.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${baseId}-email`} label="E-mailadres" required error={errors.email}>
          <input
            id={`${baseId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${baseId}-email-err` : undefined}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id={`${baseId}-phone`} label="Telefoon" optional error={errors.phone}>
            <input
              id={`${baseId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${baseId}-phone-err` : undefined}
              className={inputClass(!!errors.phone)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Bezig met versturen…" : "Vraag gratis audit aan"}
        </Button>
        <p className="font-body text-sm text-bone-400">
          90 seconden. Geen verkoper. Rapport binnen 24 uur.
        </p>
      </div>
    </form>
  );
}
