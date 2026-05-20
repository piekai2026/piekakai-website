import { Reveal } from "./Reveal";

/**
 * TrustSignals — section 6. AanloopAI attribution, EU/AVG positioning,
 * and the infrastructure stack as a quality signal (text wordmarks keep
 * the page lightweight and avoid fetching third-party logos).
 */

const STACK = ["Cloudflare", "Supabase", "Hetzner"];

const TRUST_POINTS = [
  {
    title: "Gebouwd in Rotterdam",
    body: "Geen offshore-team, geen black box. PiekAI wordt ontwikkeld en onderhouden in Nederland.",
  },
  {
    title: "Data in de EU",
    body: "Opslag en verwerking blijven binnen de Europese Unie. Geen omweg via servers buiten Europa.",
  },
  {
    title: "AVG-compliant by design",
    body: "Privacy is geen bijlage achteraf, maar het uitgangspunt van de architectuur.",
  },
];

export function TrustSignals() {
  return (
    <section className="border-b border-bone-200 bg-bone-50">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-accent-700">Vertrouwen</p>
          <h2 className="mt-4 max-w-[24ch] text-3xl leading-tight text-bone-800 sm:text-4xl">
            Een product van AanloopAI.
          </h2>
          <p className="mt-5 max-w-[46ch] font-body text-lg leading-[1.7] text-bone-500">
            PiekAI is gebouwd door AanloopAI — een Nederlands AI-bureau met productie- ervaring in
            autonome agents en voice. Serieus werk voor wie het serieus meent.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-bone-200 bg-bone-200 sm:grid-cols-3">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08} className="bg-bone-50">
              <div className="h-full p-8">
                <h3 className="text-xl text-bone-700">{point.title}</h3>
                <p className="mt-3 font-body text-base leading-[1.7] text-bone-500">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-bone-200 pt-8">
            <span className="font-body text-sm text-bone-400">Gebouwd op</span>
            {STACK.map((name) => (
              <span
                key={name}
                className="font-display text-lg text-bone-500"
                style={{ letterSpacing: "-0.02em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
