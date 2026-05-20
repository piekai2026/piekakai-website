import { z } from "zod";

/**
 * Shared domain types for PiekAI, expressed as Zod schemas so a single
 * definition validates at runtime and infers a TypeScript type.
 * Expanded as the data model lands in Phase 0 Day 3 / Phase 1.
 */

/** Agent autonomy tiers — see VISION.md "Safety model". */
export const SafetyTier = z.enum(["shadow", "auto_safe", "full_auto"]);
export type SafetyTier = z.infer<typeof SafetyTier>;

/** The seven consolidated agents — see VISION.md "The agent system". */
export const AgentKind = z.enum([
  "scout",
  "perception",
  "diagnostician",
  "strategist",
  "operator",
  "guardian",
  "analyst",
]);
export type AgentKind = z.infer<typeof AgentKind>;

/** Hand-curated Dutch business sectors for the audit form dropdown. */
export const SECTOR_OPTIONS = [
  "Bouw & installatie",
  "Zakelijke dienstverlening",
  "Detailhandel & webshop",
  "Horeca & toerisme",
  "Zorg & welzijn",
  "Financieel & advies",
  "Vastgoed & makelaardij",
  "Industrie & productie",
  "Transport & logistiek",
  "ICT & software",
  "Marketing & reclame",
  "Onderwijs & opleiding",
  "Anders",
] as const;

/**
 * Free Audit request — submitted from the landing page audit form.
 * Phase 0 Day 8-10 ships client-side validation against this schema;
 * Day 11-13 reuses it server-side for the Supabase `audit_requests` insert.
 */
export const AuditRequest = z.object({
  /** Company name. */
  companyName: z
    .string()
    .trim()
    .min(2, "Vul een bedrijfsnaam in van minstens 2 tekens.")
    .max(120, "Bedrijfsnaam is te lang."),
  /** Website URL — accepts bare domains; normalize to https:// before storing. */
  websiteUrl: z
    .string()
    .trim()
    .min(3, "Vul je website-URL in.")
    .max(255, "Website-URL is te lang.")
    .refine(
      (value) => /^([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(value.replace(/^https?:\/\//i, "")),
      "Vul een geldige website-URL in, bijvoorbeeld jouwbedrijf.nl.",
    ),
  /** Hand-curated NL sector — must be one of SECTOR_OPTIONS. */
  sector: z.enum(SECTOR_OPTIONS, { message: "Kies een sector." }),
  /** Contact e-mail. */
  email: z.email("Vul een geldig e-mailadres in."),
  /** Optional phone number. */
  phone: z
    .string()
    .trim()
    .max(32, "Telefoonnummer is te lang.")
    .refine((value) => value === "" || /^[+0-9()\s-]{6,}$/.test(value), {
      message: "Vul een geldig telefoonnummer in.",
    })
    .optional(),
});
export type AuditRequest = z.infer<typeof AuditRequest>;
