import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Ornament } from "./Ornament";
import logoLight from "@/assets/logo/devdut-ayurved-logo-light.png";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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
            <Link to="/" className="inline-block mb-3">
              <img
                src={logoLight}
                alt="Devdut Ayurved Clinic"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <div className="text-[var(--gold)] font-sanskrit text-base md:text-lg mb-1">सर्वे भवन्तु सुखिनः</div>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--parchment)] max-w-md leading-snug">
              Let ancient wisdom care for your modern life.
            </h3>
            <p className="mt-2.5 text-xs md:text-sm text-[var(--parchment)]/75 max-w-md leading-relaxed">
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
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Visit</div>
            <ul className="space-y-4 text-sm text-[var(--parchment)]/80">
              <li className="flex gap-3"><MapPin className="size-4 mt-0.5 text-[var(--gold)] shrink-0" /><span>{SITE.address}</span></li>
              <li className="flex gap-3"><Clock className="size-4 mt-0.5 text-[var(--gold)] shrink-0" /><span>{SITE.hours}</span></li>
              <li className="flex gap-3">
                <Phone className="size-4 mt-0.5 text-[var(--gold)] shrink-0" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-[var(--gold)] transition-colors">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <WhatsAppIcon className="size-4 mt-0.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5"
                >
                  <span>{SITE.whatsapp}</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#25D366] bg-[#25D366]/10 px-1.5 py-0.5 rounded-full border border-[#25D366]/30">WhatsApp</span>
                </a>
              </li>
              <li className="flex gap-3"><Mail className="size-4 mt-0.5 text-[var(--gold)] shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-[var(--gold)] transition-colors">{SITE.email}</a></li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] px-4 py-2 text-xs font-semibold hover:bg-[var(--gold)]/20 transition-colors"
                >
                  <MapPin className="size-3.5" />
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Ornament className="mt-20 opacity-60" />

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--parchment)]/60">
          <div>
            © 2026 Devdut Ayurved Clinic. All Rights Reserved. · Developed by{" "}
            <a href="https://theblueintellect.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">
              The Blue Intellect
            </a>
          </div>
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
