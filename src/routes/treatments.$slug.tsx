import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/treatments";
import therapyImg from "@/assets/therapy.jpg";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = TREATMENTS.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Treatment"} — Devdut Ayurved` },
      { name: "description", content: loaderData?.short ?? "" },
      { property: "og:title", content: `${loaderData?.name} — Devdut Ayurved` },
      { property: "og:url", content: `/treatments/${loaderData?.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/treatments/${loaderData?.slug}` }],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-5xl mb-4">Treatment not found</h1>
        <Link to="/treatments" className="text-[var(--copper)] underline">Back to all treatments</Link>
      </div>
    </PageShell>
  ),
  component: TreatmentDetail,
});

function TreatmentDetail() {
  const t = Route.useLoaderData();
  const related = TREATMENTS.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);

  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="container-page py-24">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8">
            <ArrowLeft className="size-4" /> All treatments
          </Link>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
              <div>
                <div className="eyebrow mb-3">{t.category}</div>
                {t.sanskrit && <div className="font-sanskrit text-[var(--gold)] text-2xl mb-4">{t.sanskrit}</div>}
                <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">{t.name}</h1>
                <p className="mt-6 text-xl text-[var(--muted-foreground)] max-w-2xl">{t.short}</p>
                <div className="mt-8 flex items-center gap-6 text-sm">
                  <span className="inline-flex items-center gap-2 text-[var(--muted-foreground)]"><Clock className="size-4 text-[var(--gold)]" /> {t.duration}</span>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-6"><Link to="/book">Book this treatment</Link></Button>
                  <Button asChild variant="outline" className="rounded-full h-12 px-6"><Link to="/contact">Ask a question</Link></Button>
                </div>
              </div>
              <img src={therapyImg} alt="" width={1200} height={1500} loading="lazy" className="rounded-3xl shadow-elegant" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24 grid gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="eyebrow mb-3">Benefits</div>
          <h2 className="font-display text-4xl mb-8">What patients notice.</h2>
          <ul className="space-y-4">
            {t.benefits.map((b: string) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-[var(--gold)] mt-0.5 shrink-0" />
                <span className="text-lg">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-3">The approach</div>
          <h2 className="font-display text-4xl mb-8">How we treat.</h2>
          <ol className="space-y-6">
            {t.approach.map((step: string, i: number) => (
              <li key={i} className="flex gap-5">
                <span className="shrink-0 grid size-10 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1.5 text-[var(--muted-foreground)]">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-8 hover-lift">
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Learn more <ArrowRight className="size-4" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
