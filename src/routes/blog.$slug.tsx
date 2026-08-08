import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { POSTS } from "@/lib/blog";
import templeImg from "@/assets/temple.jpg";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const p = POSTS.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Article"} — Devdut Journal` },
      { name: "description", content: loaderData?.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: loaderData?.title },
      { property: "og:url", content: `/blog/${loaderData?.slug}` },
    ],
    links: [{ rel: "canonical", href: `/blog/${loaderData?.slug}` }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: loaderData?.title,
        datePublished: loaderData?.date,
        author: { "@type": "Person", name: "Dr. Ganesh Kumar Patil" },
      }),
    }],
  }),
  notFoundComponent: () => (
    <PageShell><div className="container-page py-40 text-center"><h1 className="font-display text-5xl">Article not found</h1></div></PageShell>
  ),
  component: BlogDetail,
});

function BlogDetail() {
  const p = Route.useLoaderData();
  const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <div className="container-page pt-16 pb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8"><ArrowLeft className="size-4" /> All articles</Link>
          <Reveal>
            <div className="eyebrow mb-4">{p.category}</div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.05] max-w-4xl text-balance">{p.title}</h1>
            <div className="mt-8 flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2"><Calendar className="size-4 text-[var(--gold)]" /> {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-2"><Clock className="size-4 text-[var(--gold)]" /> {p.readTime}</span>
            </div>
          </Reveal>
        </div>

        <div className="container-page">
          <Reveal>
            <img src={templeImg} alt="" loading="lazy" className="rounded-3xl w-full aspect-[16/8] object-cover shadow-elegant" />
          </Reveal>
        </div>

        <div className="container-page py-16 max-w-3xl">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--forest-deep)] mb-10">{p.excerpt}</p>
            <div className="prose-lg space-y-6 text-lg text-[var(--foreground)] leading-relaxed">
              {p.body.map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <Ornament className="my-16" />
            <div className="text-center text-[var(--muted-foreground)]">
              Written by <span className="font-medium text-[var(--foreground)]">Dr. Ganesh Kumar Patil</span>
            </div>
          </Reveal>
        </div>

        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <h2 className="font-display text-3xl mb-8">Continue reading</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <div className="text-xs uppercase tracking-widest text-[var(--gold)] mb-3">{r.category}</div>
                  <h3 className="font-display text-xl group-hover:text-[var(--copper)]">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
