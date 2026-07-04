import { createFileRoute, Link } from "@tanstack/react-router";
import * as CountUpModule from "react-countup";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
function unwrapCountUp(mod: any): any {
  if (typeof mod === "function") return mod;
  if (mod?.default && typeof mod.default === "function") return mod.default;
  if (mod?.default?.default && typeof mod.default.default === "function") return mod.default.default;
  return mod;
}
const CountUp = unwrapCountUp(CountUpModule);
import { Award, GraduationCap, Sparkles, Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import doctorImg from "@/assets/doctor.jpg";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Dr. Devdut Sharma — Senior Ayurvedic Physician" },
      { name: "description", content: "Meet Dr. Devdut Sharma — BAMS, MD (Ayu.), 26 years of clinical Ayurvedic practice, Panchakarma specialist." },
      { property: "og:url", content: "/doctor" },
    ],
    links: [{ rel: "canonical", href: "/doctor" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Physician",
        name: "Dr. Devdut Sharma",
        medicalSpecialty: "Ayurveda",
        alumniOf: "Institute of Medical Sciences, BHU",
      }),
    }],
  }),
  component: DoctorPage,
});

const quals = [
  { icon: GraduationCap, t: "BAMS", d: "Institute of Medical Sciences, BHU (1996)" },
  { icon: GraduationCap, t: "MD (Ayurveda) — Panchakarma", d: "Gujarat Ayurved University (2000)" },
  { icon: Award, t: "Vaidya Ratna", d: "Kerala Ayurveda Vaidya Sabha (2015)" },
  { icon: Sparkles, t: "Classical training", d: "5-year apprenticeship, Kerala tradition" },
];

const speciality = [
  "Classical Panchakarma", "Chronic skin conditions", "PCOD, PCOS & infertility", "Autoimmune care",
  "Migraine & neurological", "Diabetes co-management", "Pain & spinal disorders", "Preventive Rasayana",
];

const timeline = [
  { y: "1996", t: "Graduated BAMS, BHU Varanasi" },
  { y: "2000", t: "MD Ayurveda (Panchakarma), Gujarat Ayurved University" },
  { y: "2001–2005", t: "Classical apprenticeship in Kerala under Ashtavaidya lineage" },
  { y: "2006", t: "Consultant, Arya Vaidya Sala Kottakkal" },
  { y: "2010", t: "Head of Panchakarma, Devdut Clinic" },
  { y: "2015", t: "Vaidya Ratna award" },
  { y: "2019", t: "Fellow, International Academy of Ayurveda" },
  { y: "2024", t: "Author, 'The Modern Vaidya' (Penguin)" },
];

function DoctorPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The Vaidya"
        sanskrit="वैद्यो नारायणो हरिः"
        title="Dr. Devdut Sharma"
        intro="Twenty-six years of clinical practice. Classical training in Kerala. A patient list that spans four continents."
      />

      <section className="container-page py-16 grid gap-16 lg:grid-cols-[1fr_1.2fr] items-start">
        <Reveal>
          <div className="relative">
            <img src={doctorImg} alt="Dr. Devdut Sharma" width={1024} height={1280} loading="lazy" className="rounded-3xl shadow-elegant" />
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[var(--cream)] p-5 shadow-elegant border border-[var(--border)]">
              <div className="flex items-center gap-1 text-[var(--gold)] mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <div className="font-display text-2xl">4.9<span className="text-base text-[var(--muted-foreground)]">/5</span></div>
              <div className="text-xs text-[var(--muted-foreground)]">620+ Google reviews</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="eyebrow mb-3">Practice</div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">A physician's philosophy, on record.</h2>
          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Dr. Sharma is one of India's most respected authorities on classical Panchakarma. He believes the vaidya's first job is not to prescribe but to listen — and he keeps consultations at 60 minutes, even after twenty-six years of practice, because that is how long it takes to actually understand a person.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[{ n: 26, s: "+", l: "Years" }, { n: 12000, s: "+", l: "Patients" }, { n: 15, s: "", l: "Awards" }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl text-[var(--forest-deep)]">
                  <CountUp end={s.n} duration={2.5} enableScrollSpy scrollSpyOnce separator="," />{s.s}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <BookAppointmentDialog
              trigger={
                <Button className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-6 cursor-pointer">
                  Book consultation
                </Button>
              }
            />
            <Button asChild variant="outline" className="rounded-full h-12 px-6"><Link to="/treatments">See treatments</Link></Button>
          </div>
        </Reveal>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quals.map((q, i) => (
            <Reveal key={q.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
                <q.icon className="size-6 text-[var(--gold)]" />
                <div className="mt-4 font-display text-xl">{q.t}</div>
                <div className="mt-1 text-sm text-[var(--muted-foreground)]">{q.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--cream)] border-y border-[var(--border)]">
        <div className="container-page py-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="eyebrow mb-3">Specialisation</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">Where Dr. Sharma has done his deepest work.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid sm:grid-cols-2 gap-3">
              {speciality.map((s) => (
                <li key={s} className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 text-sm">
                  <span className="size-1.5 rounded-full bg-[var(--gold)]" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="text-center mb-16">
          <Reveal>
            <div className="eyebrow mb-3">Journey</div>
            <h2 className="font-display text-4xl md:text-5xl">Career timeline.</h2>
          </Reveal>
        </div>
        <ol className="relative border-l-2 border-[var(--gold)]/30 max-w-3xl mx-auto space-y-10 pl-8">
          {timeline.map((s, i) => (
            <Reveal key={s.y} delay={i * 0.04} as="li">
              <div className="absolute -left-[11px] mt-1.5 size-5 rounded-full bg-gold-gradient ring-4 ring-[var(--parchment)]" />
              <div className="font-display text-2xl text-[var(--gold)]">{s.y}</div>
              <div className="mt-1 text-lg">{s.t}</div>
            </Reveal>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
