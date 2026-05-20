import { AuditForm } from "./AuditForm";
import { Reveal } from "./Reveal";

/**
 * FreeAuditCta — section 7. Heading + intro copy wrapping the AuditForm.
 */
export function FreeAuditCta() {
  return (
    <section id="audit" className="scroll-mt-8 border-b border-bone-200 bg-bone-100">
      <div className="mx-auto max-w-[860px] px-6 py-24 sm:px-12 sm:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-wide text-accent-700">Gratis audit</p>
          <h2 className="mt-4 max-w-[24ch] text-3xl leading-tight text-bone-800 sm:text-4xl">
            Wil je weten waar je nu staat?
          </h2>
          <p className="mt-5 max-w-[52ch] font-body text-lg leading-[1.7] text-bone-500">
            Vraag een gratis AI-zichtbaarheidsrapport aan. We laten zien hoe vaak je wordt genoemd
            in Google én in de grote AI-engines — en wat je concurrenten voor hebben.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <AuditForm />
        </Reveal>
      </div>
    </section>
  );
}
