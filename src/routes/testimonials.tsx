import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/lib/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Devdut Ayurved Clinic" },
      { name: "description", content: "Real stories from patients treated for PCOD, migraine, skin, joint pain and more at Devdut Ayurved." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Testimonials"
        title="The best measure of our work."
        intro="Patient stories from across conditions — more testimonials will be added as they are received."
      >
        <div className="inline-flex items-center gap-2">
          <div className="flex text-[var(--gold)]">{[...Array(5)].map((_, i) => <Star key={i} className="size-5 fill-current" />)}</div>
          <span className="font-display text-2xl">4.9</span>
          <span className="text-sm text-[var(--muted-foreground)]">/ 5 on Google</span>
        </div>
      </PageHeader>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.06}>
              <article className="relative h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8">
                <Quote className="absolute top-6 right-6 size-8 text-[var(--gold)]/30" />
                <p className="font-display text-xl leading-relaxed">"{r.body}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-forest-gradient text-[var(--gold)] font-display">{r.name[0]}</div>
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{r.role}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
