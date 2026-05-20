import { Reveal } from "./Reveal";

/**
 * HowItWorks — section 3. Three steps: Ziet / Diagnostiseert / Doet.
 * Each step carries a small hand-coded SVG glyph.
 */

type Step = {
  num: string;
  title: string;
  body: string;
  glyph: React.ReactNode;
};

/* Small monochromatic SVG glyphs — geometric, no stock imagery. */
const EyeGlyph = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
    <path
      d="M4 24c5-9 13-13 20-13s15 4 20 13c-5 9-13 13-20 13S9 33 4 24Z"
      fill="none"
      stroke="var(--bone-400)"
      strokeWidth="1.5"
    />
    <circle cx="24" cy="24" r="6" fill="none" stroke="var(--accent-500)" strokeWidth="1.5" />
    <circle cx="24" cy="24" r="2" fill="var(--accent-500)" />
  </svg>
);

const PulseGlyph = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
    <path
      d="M4 24h9l5-12 8 24 5-12h13"
      fill="none"
      stroke="var(--bone-400)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="30" cy="36" r="3" fill="var(--accent-500)" />
  </svg>
);

const BoltGlyph = (
  <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
    <path
      d="M26 4 10 28h11l-3 16 18-26H24l2-14Z"
      fill="none"
      stroke="var(--bone-400)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="33" cy="20" r="3" fill="var(--accent-500)" />
  </svg>
);

const STEPS: Step[] = [
  {
    num: "01",
    title: "Ziet",
    body: "PiekAI bewaakt je positie in Google én in alle 5 grote AI-engines, uur per uur.",
    glyph: EyeGlyph,
  },
  {
    num: "02",
    title: "Diagnostiseert",
    body: "Waarom sta je niet bovenaan? PiekAI analyseert exact wat ontbreekt en waarom concurrenten wél worden aanbevolen.",
    glyph: PulseGlyph,
  },
  {
    num: "03",
    title: "Doet",
    body: "Geen rapporten die je zelf moet uitvoeren. PiekAI past je website autonoom aan — content, schema, links — en meet de impact.",
    glyph: BoltGlyph,
  },
];

export function HowItWorks() {
  return (
    <section id="hoe-het-werkt" className="scroll-mt-8 border-b border-bone-200 bg-bone-50">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-accent-700">Hoe het werkt</p>
          <h2 className="mt-4 max-w-[24ch] text-3xl leading-tight text-bone-800 sm:text-4xl">
            Geen rapport. Een operatie.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-bone-200 bg-bone-200 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} as="li" delay={i * 0.08} className="bg-bone-50">
              <div className="flex h-full flex-col p-8 sm:p-9">
                {step.glyph}
                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-mono text-sm text-bone-400">{step.num}</span>
                  <h3 className="text-2xl text-bone-800">{step.title}</h3>
                </div>
                <p className="mt-3 font-body text-base leading-[1.7] text-bone-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
