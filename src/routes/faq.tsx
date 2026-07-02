import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How is Ayurveda different from herbal medicine?", a: "Herbal medicine uses plants. Ayurveda uses plants, minerals, therapies, diet, routine and psychology — all sequenced according to your unique constitution. The herbs are the ingredients, not the recipe." },
  { q: "Do I need to stop my allopathic medication?", a: "No. We co-manage with your existing physician and adjust doses only in coordination with them. Ayurveda works alongside modern medicine — never in defiance of it." },
  { q: "Are Ayurvedic medicines safe?", a: "The ones we prescribe, yes — because we formulate them in-house from tested raw materials. We recommend patients only take classical formulations from licensed vaidyas, never from unverified online sellers." },
  { q: "How long before I see results?", a: "Depends on the condition. Acute issues respond in days to weeks. Chronic conditions typically show meaningful change in 6–12 weeks. Panchakarma reset takes 21–28 days, with benefits deepening for months afterward." },
  { q: "Do you offer online consultations?", a: "Yes. Our virtual Prakriti-based consultations serve patients across India, the UK, US, Europe, Singapore and UAE. Medicines can be shipped, or formulations can be sourced locally." },
  { q: "What happens in a first consultation?", a: "60 minutes with Dr. Sharma. Detailed history, Nadi Pariksha (pulse), Prakriti and current-state assessment, root-cause discussion, and a written plan you leave with." },
  { q: "Is Panchakarma safe for everyone?", a: "Not everyone needs it. We only recommend classical Panchakarma after a full assessment. Pregnancy, active malignancy, severe cardiac conditions and a few others are contraindications." },
  { q: "How much do treatments cost?", a: "A first consultation is ₹1,800 in-clinic or ₹2,500 online. Treatment costs vary widely by protocol. We provide a written estimate before you commit." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Devdut Ayurved Clinic" },
      { name: "description", content: "Answers to the most common questions about Ayurvedic consultation, Panchakarma, safety, cost and results." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="FAQ" title="Answered honestly." intro="If your question is not below, please email us — we reply within a working day." />
      <section className="container-page pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`i${i}`} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6">
                  <AccordionTrigger className="text-left font-display text-lg md:text-xl hover:no-underline py-6">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-[var(--muted-foreground)] text-base leading-relaxed pb-6">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
