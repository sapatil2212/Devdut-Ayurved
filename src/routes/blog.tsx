import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/lib/blog";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";
import heroImg from "@/assets/hero-ayurveda.jpg";

const covers = [heroImg, therapyImg, templeImg, treatmentsImg, heroImg, therapyImg];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Devdut Ayurved Clinic" },
      { name: "description", content: "Essays on Ayurveda, Panchakarma, daily routine and modern healing, written by Dr. Devdut Sharma and team." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [feat, ...rest] = POSTS;
  return (
    <PageShell>
      <PageHeader eyebrow="The Journal" title="Wisdom, written down." intro="Essays from our clinic on classical Ayurveda, modern life and everything in between." />

      <section className="container-page py-16">
        <Reveal>
          <Link to="/blog/$slug" params={{ slug: feat.slug }} className="group grid gap-10 lg:grid-cols-2 items-center rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover-lift">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={covers[0]} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-8 md:p-12">
              <div className="eyebrow mb-4">Featured · {feat.category}</div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight group-hover:text-[var(--copper)] transition-colors">{feat.title}</h2>
              <p className="mt-6 text-lg text-[var(--muted-foreground)]">{feat.excerpt}</p>
              <div className="mt-6 text-sm text-[var(--muted-foreground)]">{feat.readTime}</div>
            </div>
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={covers[(i + 1) % covers.length]} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-[var(--gold)] mb-4">
                    <span>{p.category}</span><span>·</span><span>{p.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)]">{p.title}</h3>
                  <p className="text-[var(--muted-foreground)] flex-1">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
