import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import templeImg from "@/assets/temple.jpg";
import treatmentsImg from "@/assets/treatments.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Devdut Ayurved Clinic" },
      { name: "description", content: "The story, mission and values of Devdut Ayurved Clinic — a family practice bringing classical Ayurveda to modern life." },
      { property: "og:title", content: "About — Devdut Ayurved Clinic" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  { y: "1998", t: "Foundation", d: "Dr. Devdut Sharma opens a small three-room clinic in Pune with one Panchakarma table." },
  { y: "2004", t: "In-house pharmacy", d: "The clinic begins formulating its own herbal medicines to guarantee purity." },
  { y: "2011", t: "Panchakarma centre", d: "A dedicated 12-bed classical Panchakarma wing is added." },
  { y: "2018", t: "Research & training", d: "Fellowships with three international wellness centres begin." },
  { y: "2023", t: "Virtual care", d: "Global patients begin receiving Prakriti-based consultations online." },
  { y: "2026", t: "New home", d: "Devdut moves into a purpose-built 24-therapy-room clinic and teaching centre." },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        sanskrit="चरैवेति चरैवेति"
        eyebrow="About the clinic"
        title="A family practice, twenty-six years young."
        intro="We are three generations of vaidyas, one in-house pharmacy, and a stubborn belief that healing should never be rushed."
      />

      <section className="container-page py-24 grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <img src={templeImg} alt="" width={1600} height={900} loading="lazy" className="rounded-3xl shadow-elegant" />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-4">Our story</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Started in a three-room clinic. Never stopped listening.</h2>
          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Devdut began in 1998 as a modest three-room clinic on a quiet street in Pune. Dr. Devdut Sharma had recently returned from a five-year classical apprenticeship in Kerala, and he wanted to build something small and honest — where every patient was known by name and every medicine was made in-house.
          </p>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Twenty-six years later, the philosophy has not changed. The building has.
          </p>
        </Reveal>
      </section>

      <section className="bg-[var(--cream)] border-y border-[var(--border)]">
        <div className="container-page py-24">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <div className="eyebrow mb-3">The journey</div>
              <h2 className="font-display text-4xl md:text-5xl">Milestones along the way.</h2>
              <Ornament className="mt-8" />
            </Reveal>
          </div>
          <ol className="mt-16 relative border-l-2 border-[var(--gold)]/30 max-w-3xl mx-auto space-y-12 pl-8">
            {timeline.map((step, i) => (
              <Reveal key={step.y} delay={i * 0.05} as="li">
                <div className="absolute -left-[11px] mt-1.5 size-5 rounded-full bg-gold-gradient ring-4 ring-[var(--cream)]" />
                <div className="font-display text-3xl text-[var(--gold)]">{step.y}</div>
                <h3 className="font-display text-2xl mt-1">{step.t}</h3>
                <p className="mt-2 text-[var(--muted-foreground)]">{step.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-24 grid gap-12 lg:grid-cols-3">
        {[
          { t: "Mission", d: "Deliver classical Ayurveda with modern precision — every patient assessed, every formula personalised, every plan revisited." },
          { t: "Vision", d: "To become the standard of care for people who want to be treated as more than a diagnosis." },
          { t: "Values", d: "Honesty over hype. Slow over fast. Root cause over quick fix. Always, patient over protocol." },
        ].map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <article className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10">
              <div className="font-sanskrit text-[var(--gold)] text-xl mb-3">◈</div>
              <h3 className="font-display text-3xl mb-4">{v.t}</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{v.d}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="relative overflow-hidden bg-forest-gradient text-[var(--parchment)]">
        <div className="container-page py-24 grid gap-16 lg:grid-cols-[1fr_1fr] items-center">
          <Reveal>
            <img src={treatmentsImg} alt="" width={1400} height={1000} loading="lazy" className="rounded-3xl" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="eyebrow mb-4 text-[var(--gold)]">Founder's note</div>
            <blockquote className="font-display text-3xl md:text-4xl leading-tight text-[var(--parchment)]">
              "The most powerful thing a physician can do is give patients back the sense that their body is on their side. Every therapy we practise here is in service of that."
            </blockquote>
            <div className="mt-8 text-[var(--parchment)]/70">— Dr. Devdut Sharma, Founder</div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
