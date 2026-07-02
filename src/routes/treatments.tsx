import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { TREATMENTS, CATEGORIES } from "@/lib/treatments";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Devdut Ayurved Clinic" },
      { name: "description", content: "Classical Panchakarma, personalised herbal protocols and modern Ayurvedic care for skin, hair, PCOD, joints, diabetes, migraine and more." },
      { property: "og:url", content: "/treatments" },
    ],
    links: [{ rel: "canonical", href: "/treatments" }],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? TREATMENTS : TREATMENTS.filter((t) => t.category === active);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Treatments"
        sanskrit="स्वस्थस्य स्वास्थ्य रक्षणम्"
        title="Care for every body, every stage."
        intro="From classical Panchakarma to focused protocols for chronic conditions — every treatment plan is designed around your Prakriti."
      />

      <section className="container-page py-14">
        <Reveal>
          <div className="flex flex-wrap gap-2 justify-center">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium border transition-all ${
                  active === c
                    ? "bg-forest-gradient text-[var(--parchment)] border-transparent shadow-gold"
                    : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--gold)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 0.05}>
              <Link
                to="/treatments/$slug"
                params={{ slug: t.slug }}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs uppercase tracking-widest text-[var(--gold)]">{t.category}</span>
                    {t.sanskrit && <span className="font-sanskrit text-[var(--copper)]">{t.sanskrit}</span>}
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)] transition-colors">{t.name}</h3>
                  <p className="text-[var(--muted-foreground)] text-sm">{t.short}</p>
                </div>
                <div className="mt-8 flex items-center justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">{t.duration}</span>
                  <span className="inline-flex items-center gap-2 font-medium text-[var(--forest-deep)]">
                    Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
