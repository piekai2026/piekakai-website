import { Reveal } from "./Reveal";

/**
 * Differentiator — section 4. Three-column comparison.
 * Klusio is never named (per spec); the middle column is the generic
 * "AI-zichtbaarheidsmonitors" category.
 */

type Column = {
  name: string;
  tag: string;
  rows: string[];
  highlight: boolean;
};

const COLUMNS: Column[] = [
  {
    name: "Traditionele SEO-tools",
    tag: "Ahrefs, Semrush",
    rows: [
      "Alleen klassieke zoekresultaten",
      "Meet — je voert zelf uit",
      "Eén kanaal: blauwe links",
      "Rapporten, geen handelingen",
    ],
    highlight: false,
  },
  {
    name: "AI-zichtbaarheidsmonitors",
    tag: "De nieuwe generatie",
    rows: [
      "Volgt AI-engines, niet Google",
      "Signaleert — je voert zelf uit",
      "Eén kanaal: AI-antwoorden",
      "Dashboards, geen handelingen",
    ],
    highlight: false,
  },
  {
    name: "PiekAI",
    tag: "Autonoom, volledig",
    rows: [
      "Google én alle 5 AI-engines, samen",
      "Voert autonoom uit — geen huiswerk",
      "Drie kanalen: links, AI én voice",
      "Een agent die handelt en meet",
    ],
    highlight: true,
  },
];

const Check = (
  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path
      d="M3 8.5 6.5 12 13 4"
      fill="none"
      stroke="var(--accent-500)"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Dot = (
  <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="2.5" fill="var(--bone-300)" />
  </svg>
);

export function Differentiator() {
  return (
    <section className="border-b border-bone-200 bg-bone-100">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-accent-700">Het verschil</p>
          <h2 className="mt-4 max-w-[26ch] text-3xl leading-tight text-bone-800 sm:text-4xl">
            Anderen meten. PiekAI handelt.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-0">
          {COLUMNS.map((col, i) => (
            <Reveal
              key={col.name}
              delay={i * 0.08}
              className={[
                "flex flex-col rounded-lg border p-8 sm:p-9",
                col.highlight
                  ? "border-accent-500 bg-bone-50 lg:scale-[1.03] lg:shadow-md"
                  : "border-bone-200 bg-bone-50",
                !col.highlight && i === 0 ? "lg:rounded-r-none lg:border-r-0" : "",
                !col.highlight && i === 1 ? "lg:rounded-none lg:border-r-0" : "",
              ].join(" ")}
            >
              <p
                className={
                  col.highlight
                    ? "font-mono text-xs tracking-wide text-accent-700"
                    : "font-mono text-xs tracking-wide text-bone-400"
                }
              >
                {col.tag}
              </p>
              <h3 className="mt-2 text-2xl text-bone-800">{col.name}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {col.rows.map((row) => (
                  <li key={row} className="flex items-start gap-3">
                    {col.highlight ? Check : Dot}
                    <span
                      className={
                        col.highlight
                          ? "font-body text-base leading-snug text-bone-700"
                          : "font-body text-base leading-snug text-bone-500"
                      }
                    >
                      {row}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
