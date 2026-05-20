import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

/**
 * ProblemStatement — section 2. The bifurcation of search:
 * a count-up on the headline stat plus three short paragraphs.
 */
export function ProblemStatement() {
  return (
    <section className="border-b border-bone-200 bg-bone-100">
      <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-12 sm:py-32">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-tight text-bone-800 sm:text-4xl">
            <span className="font-mono text-accent-500">
              <CountUp value={40} suffix="%" />
            </span>{" "}
            van je klanten begint nu in ChatGPT. Niet in Google.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          <Reveal delay={0.05}>
            <h3 className="text-xl text-bone-700">Zoeken splitst zich</h3>
            <p className="mt-3 font-body text-base leading-[1.7] text-bone-500">
              Een groeiend deel van je doelgroep stelt zijn vraag niet meer aan een zoekmachine,
              maar aan een AI-assistent. Twee kanalen, twee logica&apos;s — en de meeste bedrijven
              meten er maar één.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="text-xl text-bone-700">Klassieke SEO valt stil</h3>
            <p className="mt-3 font-body text-base leading-[1.7] text-bone-500">
              Ranken op blauwe links blijft belangrijk, maar het vertelt niet of een AI jouw bedrijf
              noemt wanneer een klant om advies vraagt. Daar beslist de taalmodel-context, niet je
              positie in de SERP.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h3 className="text-xl text-bone-700">Wat er op het spel staat</h3>
            <p className="mt-3 font-body text-base leading-[1.7] text-bone-500">
              Word je niet genoemd, dan besta je niet — voor die klant. De winnaar van het
              AI-tijdperk is het bedrijf dat het standaardantwoord wordt. Daar tussenin zit geen
              veilige plek.
            </p>
          </Reveal>
        </div>

        {/* Subtle live-style counter. */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-bone-200 pt-8">
            <span className="font-body text-sm text-bone-500">
              Geschatte AI-zoekopdrachten wereldwijd vandaag
            </span>
            <span className="font-mono text-2xl text-bone-800">
              <CountUp value={1284000000} duration={2.4} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
