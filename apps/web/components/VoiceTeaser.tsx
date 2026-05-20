import { Reveal } from "./Reveal";

/* Voice-wave bar geometry — abstract, geometric, no stock imagery. */
const WAVE_BARS = [
  { x: 12, h: 22 },
  { x: 32, h: 44 },
  { x: 52, h: 70 },
  { x: 72, h: 38 },
  { x: 92, h: 86 },
  { x: 112, h: 54 },
  { x: 132, h: 100, accent: true },
  { x: 152, h: 60 },
  { x: 172, h: 92 },
  { x: 192, h: 46 },
  { x: 212, h: 78 },
  { x: 232, h: 36 },
  { x: 252, h: 24 },
];

/**
 * VoiceTeaser — section 5. Teaser for the Phase 2 voice integration.
 * Single short paragraph; understated. Dark panel for contrast.
 */
export function VoiceTeaser() {
  return (
    <section className="border-b border-bone-200 bg-bone-900">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <div>
              <p className="font-mono text-xs tracking-wide text-accent-300">Voice — binnenkort</p>
              <h2 className="mt-4 max-w-[20ch] text-3xl leading-tight text-bone-100 sm:text-4xl">
                Als de klant je vindt, neemt onze AI op.
              </h2>
              <p className="mt-6 max-w-[42ch] font-body text-lg leading-[1.7] text-bone-300">
                Zichtbaarheid is pas de helft. Wie via AI bij jou uitkomt en belt, wordt opgevangen
                door een AI-stemagent die de afspraak inplant — getraind op jouw bedrijf, dag en
                nacht. PiekAI sluit de cirkel van vindbaarheid naar gesprek.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <svg
              viewBox="0 0 280 120"
              className="h-auto w-full max-w-sm"
              role="img"
              aria-label="Abstracte geluidsgolf van verticale balken."
            >
              <title>Abstracte geluidsgolf</title>
              {WAVE_BARS.map((bar) => (
                <rect
                  key={bar.x}
                  x={bar.x}
                  y={60 - bar.h / 2}
                  width="4"
                  height={bar.h}
                  rx="2"
                  fill={bar.accent ? "var(--accent-300)" : "var(--bone-700)"}
                />
              ))}
            </svg>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
