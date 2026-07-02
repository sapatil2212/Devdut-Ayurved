import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

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

const reviews = [
  { name: "Anaya M.", role: "PCOD · Mumbai", body: "Six months at Devdut and my cycles are regular for the first time in a decade. Dr. Sharma is patient, thorough, and never rushed." },
  { name: "Rohan K.", role: "Migraine · Pune", body: "I lived with chronic migraine for twenty years. Panchakarma changed everything — from four attacks a week to two a month, and dropping." },
  { name: "Sophia L.", role: "Skin · London", body: "I flew in for a consultation and left with a plan I could follow at home. My eczema has never been calmer." },
  { name: "Aditya R.", role: "Joint pain · Bengaluru", body: "Told I needed knee surgery. Six weeks of Janu Basti and internal herbs — I walk stairs without pain." },
  { name: "Meera J.", role: "Infertility · Delhi", body: "After three failed IVF cycles, we tried classical Garbha Sanskar. Our daughter is one year old." },
  { name: "Karan D.", role: "Diabetes · Ahmedabad", body: "HbA1c from 9.2 to 6.4 in one year, and my metformin dose halved. My endocrinologist is impressed." },
  { name: "Isha P.", role: "Stress · Singapore", body: "I did the two-week wellness retreat. I sleep through the night for the first time since college." },
  { name: "Priya V.", role: "Skin · Chennai", body: "Ten years of adult acne, gone. And the diet plan is one I can actually stick to." },
  { name: "Neel T.", role: "Digestion · Pune", body: "IBS, bloating, brain fog — all traced back to my Agni. Six weeks in and I'm a different person." },
];

function TestimonialsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Testimonials"
        title="The best measure of our work."
        intro="620+ Google reviews, an average rating of 4.9/5, and the stories that mean the most to us."
      >
        <div className="inline-flex items-center gap-2">
          <div className="flex text-[var(--gold)]">{[...Array(5)].map((_, i) => <Star key={i} className="size-5 fill-current" />)}</div>
          <span className="font-display text-2xl">4.9</span>
          <span className="text-sm text-[var(--muted-foreground)]">/ 5 on Google</span>
        </div>
      </PageHeader>

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
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
