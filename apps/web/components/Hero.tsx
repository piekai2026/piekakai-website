import { Button } from "./Button";
import { HeroGraph } from "./HeroGraph";
import { Wordmark } from "./Wordmark";

/**
 * Hero — section 1. Headline, sub, two CTAs, animated hero graph.
 * Server Component; only HeroGraph (the animation) is a Client Component.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-bone-200 bg-bone-50">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-24 sm:px-12 sm:pt-10 sm:pb-32">
        {/* Minimal top bar — wordmark only. */}
        <header className="flex items-center justify-between">
          <Wordmark />
          <a
            href="#audit"
            className="font-body text-sm text-bone-500 transition-colors hover:text-bone-800"
          >
            Gratis audit
          </a>
        </header>

        <div className="mt-20 grid items-center gap-16 sm:mt-28 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left column — copy. */}
          <div>
            <p className="font-mono text-xs tracking-wide text-accent-700">
              AI-zichtbaarheid &middot; autonoom
            </p>
            <h1 className="mt-5 text-[2.75rem] leading-[1.06] text-bone-800 sm:text-5xl lg:text-6xl">
              Word de standaard. In Google. In ChatGPT. Overal.
            </h1>
            <p className="mt-7 max-w-[34rem] font-body text-lg leading-[1.65] text-bone-500">
              PiekAI is een autonome AI-agent die jouw bedrijf naar #1 brengt — en daar houdt. In
              Google én in elke AI-zoekmachine.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#audit" size="xl">
                Vraag gratis audit aan
              </Button>
              <Button href="#hoe-het-werkt" variant="secondary" size="xl">
                Lees hoe het werkt
              </Button>
            </div>
          </div>

          {/* Right column — animated graph. */}
          <div className="rounded-lg border border-bone-200 bg-bone-100 p-7 sm:p-9">
            <div className="flex items-baseline justify-between">
              <span className="font-body text-sm text-bone-500">Zichtbaarheidsindex</span>
              <span className="font-mono text-sm text-accent-700">+47%</span>
            </div>
            <div className="mt-5">
              <HeroGraph />
            </div>
            <p className="mt-5 font-body text-sm leading-relaxed text-bone-500">
              Eén lijn, twee werelden: klassieke zoekresultaten én AI-antwoorden, samen gemeten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
