import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";
import heroImg from "@/assets/hero-ayurveda.jpg";
import doctorImg from "@/assets/doctor.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Devdut Ayurved Clinic" },
      { name: "description", content: "Inside the Devdut clinic — therapy rooms, in-house pharmacy, staff and moments from our practice." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const items = [
  { img: heroImg, cat: "Pharmacy", span: "md:col-span-2 md:row-span-2" },
  { img: therapyImg, cat: "Therapy" },
  { img: treatmentsImg, cat: "Medicines" },
  { img: doctorImg, cat: "Staff" },
  { img: templeImg, cat: "Space" },
  { img: therapyImg, cat: "Treatments" },
  { img: heroImg, cat: "Herbs" },
];

function GalleryPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Gallery"
        title="Inside Devdut."
        intro="A glimpse of our clinic, our in-house pharmacy and the therapies we love to practise."
      />
      <section className="container-page py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <figure className={`group relative overflow-hidden rounded-3xl ${it.span ?? ""}`}>
                <img src={it.img} alt={it.cat} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <figcaption className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[var(--gold)] text-xs uppercase tracking-widest">{it.cat}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
