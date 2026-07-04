import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import aboutHeroImg from "@/assets/about-hero.png";
import aboutPaperImg from "@/assets/about-paper.png";
import doctorPng from "@/assets/doctor.png";
import treatmentsImg from "@/assets/treatments.jpg";
import { FaqSection } from "@/components/site/FaqSection";
import { TrustedIcons } from "@/components/site/TrustedIcons";

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

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        sanskrit="आयुर्वेदः जीवनस्य आधारः"
        title="A family practice, twenty-six years young."
        intro="We are three generations of vaidyas, one in-house pharmacy, and a stubborn belief that healing should never be rushed."
        image={aboutHeroImg}
      />

      <section className="container-page pt-24 pb-8 grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="max-w-md mx-auto">
            <img src={doctorPng} alt="Lead Ayurvedic Physician" width={1600} height={900} loading="lazy" className="rounded-3xl" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-4">Ayurvedic Expert</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Meet Our Ayurvedic Expert</h2>
          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Dr. Ganesh Kumar Patil (B.A.M.S.) is a dedicated Ayurvedic physician committed to providing authentic, patient-centered healthcare through the timeless principles of Ayurveda. With expertise in classical Ayurvedic treatments and Panchakarma therapies, he focuses on restoring health naturally by addressing the root cause of disease.
          </p>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Based in Pune, Maharashtra, Dr. Patil offers personalized Ayurvedic consultations, customized herbal treatments, Panchakarma therapies, and diet &amp; lifestyle guidance tailored to each individual's unique body constitution (Prakriti) and health needs.
          </p>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Driven by a vision of holistic healing, his approach combines traditional Ayurvedic wisdom with compassionate care to help patients achieve lasting wellness, improved quality of life, and a healthier future.
          </p>
        </Reveal>
      </section>

      <section className="container-page pt-8 pb-24 grid gap-8 lg:grid-cols-3">
        {[
          { t: "Mission", d: "Deliver classical Ayurveda with modern precision — every patient assessed, every formula personalised, every plan revisited." },
          { t: "Vision", d: "To become the standard of care for people who want to be treated as more than a diagnosis." },
          { t: "Values", d: "Honesty over hype. Slow over fast. Root cause over quick fix. Always, patient over protocol." },
        ].map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <article className="relative h-full">
              {/* Parchment background image */}
              <img
                src={aboutPaperImg}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
              />
              <div className="relative z-10 text-center px-8 py-14 md:px-10 md:py-16">
                <div className="font-sanskrit text-[#a87c3b] text-xl mb-3">◈</div>
                <h3 className="font-display text-2xl md:text-3xl mb-3 text-[#4a3520]">{v.t}</h3>
                <p className="text-sm md:text-base text-[#6b5744] leading-relaxed">{v.d}</p>
              </div>
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

      <TrustedIcons />

      <FaqSection showCta={false} />
    </PageShell>
  );
}
