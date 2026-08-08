import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import aboutHeroImg from "@/assets/about-hero.png";
import aboutPaperImg from "@/assets/about-paper.png";
import doctorPng from "@/assets/doctor.png";
import treatmentsImg from "@/assets/treatments.jpg";
import { FaqSection } from "@/components/site/FaqSection";
import { TrustedIcons } from "@/components/site/TrustedIcons";
import { SITE } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Devdut Ayurved Clinic" },
      { name: "description", content: "The story, mission and values of Devdut Ayurved Clinic — 30 years of classical Ayurveda with Nadipariksha at the heart of every consultation." },
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
        title="A family practice, thirty years strong."
        intro="Three decades of classical Ayurveda, one in-house pharmacy, and a stubborn belief that healing should never be rushed."
        image={aboutHeroImg}
      />

      <section className="container-page pt-24 pb-8 grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="max-w-md mx-auto">
            <img src={doctorPng} alt="Dr. Ganesh Kumar Patil" width={1600} height={900} loading="lazy" className="rounded-3xl" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-4">Ayurvedic Expert</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Meet Our Ayurvedic Expert</h2>
          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Dr. Ganesh Kumar Patil (B.A.M.S.) is a dedicated Ayurvedic physician committed to providing authentic, patient-centered healthcare through the timeless principles of Ayurveda. With expertise in classical Ayurvedic treatments, Panchakarma therapies, and Nadipariksha (pulse diagnosis), he focuses on restoring health naturally by addressing the root cause of disease.
          </p>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Based in Pune, Maharashtra, Dr. Patil offers personalized Ayurvedic consultations, customized herbal treatments, Panchakarma therapies, and diet &amp; lifestyle guidance tailored to each individual's unique body constitution (Prakriti) and health needs.
          </p>
          <p className="mt-4 text-lg text-[var(--muted-foreground)]">
            Driven by a vision of holistic healing, his approach combines traditional Ayurvedic wisdom with compassionate care to help patients achieve lasting wellness, improved quality of life, and a healthier future.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { t: "Qualification", d: "B.A.M.S." },
              { t: "Experience", d: "30 years of clinical practice" },
              { t: "Specialty", d: "Nadipariksha & Panchakarma" },
              { t: "Focus", d: "Root-cause, Prakriti-based care" },
            ].map((q) => (
              <div key={q.t} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">{q.t}</div>
                <div className="mt-1 font-display text-lg text-[var(--forest-deep)]">{q.d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-page pt-8 pb-16">
        <Reveal>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--cream)] p-8 md:p-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <div className="eyebrow mb-3">Clinic USP</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Nadipariksha at the heart of care</h2>
              <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
                Every meaningful protocol at Devdut begins with Nadipariksha — classical pulse diagnosis that reads doshas, tissues and vital channels. It is how Dr. Ganesh Kumar Patil designs treatments that fit your Prakriti, not a generic checklist.
              </p>
              <p className="mt-3 text-sm font-medium text-[var(--copper)]">
                Promo highlight: Nadipariksha on the {SITE.nadiparikshaDates}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/nadipariksha"
                className="inline-flex items-center gap-2 rounded-full bg-forest-gradient text-[var(--parchment)] px-5 py-3 text-sm font-medium"
              >
                Explore Nadipariksha <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page pt-8 pb-24 grid gap-8 lg:grid-cols-3">
        {[
          { t: "Mission", d: "Deliver classical Ayurveda with Nadipariksha-led precision — every patient assessed, every formula personalised, every plan revisited until balance returns." },
          { t: "Vision", d: "To be Pune's trusted home for authentic Ayurveda — where 30 years of clinical wisdom meet compassionate, root-cause care." },
          { t: "Values", d: "Honesty over hype. Slow over fast. Root cause over quick fix. Always, patient over protocol." },
        ].map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <article className="relative h-full">
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
            <div className="mt-8 text-[var(--parchment)]/70">— Dr. Ganesh Kumar Patil, Founder · B.A.M.S.</div>
          </Reveal>
        </div>
      </section>

      <TrustedIcons />

      <FaqSection showCta={false} />
    </PageShell>
  );
}
