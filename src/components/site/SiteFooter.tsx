import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Ornament } from "./Ornament";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 bg-forest-gradient text-[var(--parchment)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, var(--gold) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--gold) 0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative container-page pt-24 pb-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-[var(--gold)] font-sanskrit text-xl mb-3">सर्वे भवन्तु सुखिनः</div>
            <h3 className="font-display text-3xl md:text-4xl text-[var(--parchment)] max-w-md leading-tight">
              Let ancient wisdom care for your modern life.
            </h3>
            <p className="mt-6 text-[var(--parchment)]/70 max-w-md">
              {SITE.description}
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">Explore</div>
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-[var(--parchment)]/80 hover:text-[var(--gold)] transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/faq" className="text-[var(--parchment)]/80 hover:text-[var(--gold)]">FAQ</Link></li>
              <li><Link to="/testimonials" className="text-[var(--parchment)]/80 hover:text-[var(--gold)]">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Visit</div>
            <ul className="space-y-4 text-sm text-[var(--parchment)]/80">
              <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-[var(--gold)]" /><span>{SITE.address}</span></li>
              <li className="flex gap-3"><Clock className="size-4 mt-0.5 text-[var(--gold)]" /><span>{SITE.hours}</span></li>
              <li className="flex gap-3"><Phone className="size-4 mt-0.5 text-[var(--gold)]" /><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
              <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-[var(--gold)]" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <Ornament className="mt-20 opacity-60" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--parchment)]/60">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[var(--gold)]">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--gold)]">Terms</Link>
            <Link to="/contact" className="hover:text-[var(--gold)]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
