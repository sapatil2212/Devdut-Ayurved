import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Devdut Ayurved Clinic" },
      { name: "description", content: `Visit us in Pune, call ${SITE.phone}, WhatsApp or email — we reply within a working day.` },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Contact" title="Come see us, or call." intro="We answer every message ourselves. No call centres, no bots." />

      <section className="container-page py-16 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-6">
            <div>
              <div className="eyebrow mb-2">Visit</div>
              <div className="flex items-start gap-3"><MapPin className="size-5 text-[var(--gold)] mt-0.5" /><span>{SITE.address}</span></div>
            </div>
            <div>
              <div className="eyebrow mb-2">Call</div>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-[var(--copper)]"><Phone className="size-5 text-[var(--gold)]" />{SITE.phone}</a>
            </div>
            <div>
              <div className="eyebrow mb-2">Email</div>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-[var(--copper)]"><Mail className="size-5 text-[var(--gold)]" />{SITE.email}</a>
            </div>
            <div>
              <div className="eyebrow mb-2">Hours</div>
              <div className="flex items-center gap-3"><Clock className="size-5 text-[var(--gold)]" />{SITE.hours}</div>
            </div>
            <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`} className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-gradient text-[var(--parchment)] px-5 py-3 font-medium">
              <MessageCircle className="size-4" /> Chat on WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 space-y-5">
            <h2 className="font-display text-3xl">Send us a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Name</span>
                <input required className="mt-2 w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 outline-none focus:border-[var(--gold)]" />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Phone</span>
                <input required className="mt-2 w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 outline-none focus:border-[var(--gold)]" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Email</span>
              <input type="email" required className="mt-2 w-full rounded-full border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 outline-none focus:border-[var(--gold)]" />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">Message</span>
              <textarea required rows={5} className="mt-2 w-full rounded-3xl border border-[var(--border)] bg-[var(--parchment)] px-5 py-3 outline-none focus:border-[var(--gold)]" />
            </label>
            <Button type="submit" className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-6">Send message</Button>
          </form>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] aspect-[16/8]">
            <iframe
              title="Devdut clinic location"
              src="https://www.google.com/maps?q=Pune+Maharashtra+India&output=embed"
              className="size-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
