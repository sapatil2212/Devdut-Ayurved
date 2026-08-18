import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import aboutHeroImg from "@/assets/about-hero.png";
import aboutPaperImg from "@/assets/about-paper.png";
import doctorImg from "@/assets/doctor-2.png";
import { Mandala } from "@/components/site/Ornament";
import homeAboutImg from "@/assets/home-about.png";
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
      { name: "description", content: "The story, mission and values of Devdut Ayurved Clinic — 26+ years of classical Ayurveda with Nadipariksha at the heart of every consultation." },
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
        title="Where body, mind and spirit find balance."
        intro="Rooted in classical Ayurveda — Prakriti assessment, Nadipariksha, herbal formulations and Panchakarma — we treat the cause of imbalance, not only the symptoms."
        image={aboutHeroImg}
        introMaxWidthClass="max-w-5xl"
      />

      <section className="container-page pt-24 pb-8 grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative flex justify-center items-end rounded-[2.5rem] bg-gradient-to-b from-[#fbf7ee] via-[#f5edd9] to-[#ebdcc4] border border-[var(--gold)]/40 px-6 pt-10 pb-0 shadow-lg overflow-hidden max-w-lg mx-auto group h-[480px] md:h-[550px]">
            {/* Faint ambient gold background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--gold)]/20 via-transparent to-transparent pointer-events-none" />
            <Mandala className="absolute -left-20 -top-20 size-[320px] text-[var(--gold)]/25 pointer-events-none" />
            <Mandala className="absolute -right-20 -bottom-20 size-[260px] text-[var(--gold)]/15 pointer-events-none" />

            <img
              src={doctorImg}
              alt="Dr. Ganeshkumar Patil, Ayurvedic Physician"
              width={1024}
              height={1280}
              loading="lazy"
              className="relative z-20 w-full max-w-[440px] md:max-w-[480px] h-full object-contain object-bottom block transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-4">Ayurvedic Practitioner in Pune.</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Meet Our Ayurvedic Practitioner</h2>
          <p className="mt-5 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            Dr. Ganeshkumar Patil (BAMS, M.D.(A.M.), DNYS, M.D. (EH)) is a dedicated Ayurvedic physician committed to providing authentic, patient-centered healthcare through the timeless principles of Ayurveda. With expertise in classical Ayurvedic treatments, Panchakarma therapies, and Nadipariksha (pulse diagnosis), he focuses on restoring health naturally by addressing the root cause of disease.
          </p>
          <p className="mt-3.5 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            Based in Pune, Maharashtra, Dr. Patil offers personalized Ayurvedic consultations, customized herbal treatments, Panchakarma therapies, and diet &amp; lifestyle guidance tailored to each individual's unique body constitution (Prakriti) and health needs.
          </p>
          <p className="mt-3.5 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            Driven by a vision of holistic healing, his approach combines traditional Ayurvedic wisdom with compassionate care to help patients achieve lasting wellness, improved quality of life, and a healthier future.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { t: "Qualification", d: "BAMS, M.D.(A.M.), DNYS, M.D. (EH)" },
              { t: "Experience", d: "26+ years of clinical practice" },
            ].map((q) => (
              <div key={q.t} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">{q.t}</div>
                <div className="mt-1 font-display text-lg text-[var(--forest-deep)]">{q.d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>


      <section className="container-page pt-8 pb-24 space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              t: "Mission",
              d: "For the past 26+ years, our mission has been to provide safe, natural, and effective Ayurvedic healthcare based on authentic Ayurvedic principles. We are committed to delivering personalized treatments and compassionate care, helping every patient achieve long-term health, balance, and overall well-being.",
            },
            {
              t: "Vision",
              d: "To be a trusted center of excellence in Ayurveda and set the standard for holistic healthcare by treating every individual as more than just a diagnosis.",
            },
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
        </div>

        <Reveal delay={0.12}>
          <article className="relative">
            <img
              src={aboutPaperImg}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            />
            <div className="relative z-10 px-8 py-14 md:px-12 md:py-16">
              <div className="text-center mb-8">
                <div className="font-sanskrit text-[#a87c3b] text-xl mb-3">◈</div>
                <h3 className="font-display text-2xl md:text-3xl text-[#4a3520]">Values</h3>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {[
                  { t: "Integrity", d: "Upholding honesty, ethics, and transparency in every aspect of care." },
                  { t: "Compassion", d: "Providing empathetic, patient-centered treatment with kindness and respect." },
                  { t: "Trust", d: "Building lasting relationships through reliability, confidentiality, and excellence in care." },
                  { t: "Excellence", d: "Striving for the highest standards in Ayurvedic treatment and patient outcomes." },
                  { t: "Holistic Care", d: "Treating the mind, body, and spirit to promote complete health and long-term wellness." },
                ].map((item) => (
                  <li key={item.t} className="text-center sm:text-left">
                    <div className="font-display text-lg text-[#4a3520] mb-1">{item.t}</div>
                    <p className="text-sm text-[#6b5744] leading-relaxed">{item.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
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
            <div className="mt-8 text-[var(--parchment)]/70">— Dr. Ganeshkumar Patil, Founder · BAMS, M.D.(A.M.), DNYS, M.D. (EH)</div>
          </Reveal>
        </div>
      </section>

      <TrustedIcons />

      <FaqSection />
    </PageShell>
  );
}
