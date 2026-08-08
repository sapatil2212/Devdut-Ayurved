import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import { SITE } from "@/lib/site";
import therapyImg from "@/assets/therapy.jpg";

export const Route = createFileRoute("/nadipariksha")({
  head: () => ({
    meta: [
      { title: "Nadipariksha — Devdut Ayurved Clinic" },
      {
        name: "description",
        content: `Classical Nadipariksha (pulse diagnosis) at Devdut Ayurved — our clinic USP. Special sessions every month on the ${SITE.nadiparikshaDates}.`,
      },
      { property: "og:url", content: "/nadipariksha" },
    ],
    links: [{ rel: "canonical", href: "/nadipariksha" }],
  }),
  component: NadiparikshaPage,
});

function NadiparikshaPage() {
  const points = [
    "Reads Vata, Pitta and Kapha through classical three-finger pulse",
    "Maps Prakriti (constitution) and Vikriti (current imbalance)",
    "Guides personalised herbs, diet and Panchakarma decisions",
    "Detects early imbalance before symptoms become chronic",
    "Forms the foundation of every treatment plan at Devdut",
  ];

  return (
    <PageShell>
      <PageHeader
        sanskrit="नाडी परीक्षा"
        title="Nadipariksha — our clinic USP."
        intro="Classical pulse diagnosis that listens to your body before any medicine is prescribed. Precise. Personal. Proven over 30 years of practice."
        image={therapyImg}
      />

      <section className="container-page py-10">
        <Reveal>
          <div className="rounded-3xl border border-[var(--gold)]/40 bg-forest-gradient text-[var(--parchment)] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold mb-2">Promo highlight</div>
              <h2 className="font-display text-3xl md:text-4xl">Nadipariksha every month on the 1st &amp; 15th</h2>
              <p className="mt-3 text-[var(--parchment)]/80 max-w-xl">
                Book a dedicated pulse-diagnosis day with Dr. Ganesh Kumar Patil. Ideal for first consultations and treatment reviews.
              </p>
            </div>
            <BookAppointmentDialog
              trigger={
                <button className="inline-flex items-center gap-2 rounded-full bg-gold-gradient text-[var(--forest-deep)] font-semibold py-3 px-6 shadow-gold cursor-pointer">
                  Book Nadipariksha <Calendar className="size-4" />
                </button>
              }
            />
          </div>
        </Reveal>
      </section>

      <section className="container-page py-16 grid gap-12 lg:grid-cols-2 items-start">
        <Reveal>
          <div className="eyebrow mb-3">What it is</div>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">
            Pulse diagnosis that designs your care
          </h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            Nadipariksha is the classical Ayurvedic art of reading the pulse to understand doshas, tissues (dhatus) and vital channels.
            At Devdut Ayurved Clinic, it is not an add-on — it is the starting point of every meaningful protocol under Dr. Ganesh Kumar Patil (B.A.M.S.).
          </p>
          <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
            A short, focused session gives clarity that symptom lists alone cannot: why your digestion falters, why sleep breaks, why a chronic condition keeps returning — and what to do next.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                <CheckCircle2 className="size-5 text-[var(--gold)] mt-0.5 shrink-0" />
                <span className="text-sm md:text-base">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--cream)] p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">Ready to begin with the pulse?</h2>
            <p className="mt-3 text-[var(--muted-foreground)] max-w-xl mx-auto">
              Kindly call first to check availability, then visit. Prefer {SITE.nadiparikshaDates} for dedicated Nadipariksha slots.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <BookAppointmentDialog
                trigger={
                  <button className="rounded-full bg-forest-gradient text-[var(--parchment)] px-6 py-3 text-sm font-medium cursor-pointer">
                    Book appointment
                  </button>
                }
              />
              <Link
                to="/treatments/$slug"
                params={{ slug: "nadipariksha" }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--forest-deep)] px-6 py-3 text-sm font-medium text-[var(--forest-deep)]"
              >
                Treatment overview <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
