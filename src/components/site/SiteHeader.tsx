import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import logoLight from "@/assets/logo/devdut-ayurved-logo-light.png";
import logoDark from "@/assets/logo/devdut-ayurved-logo-dark.png";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[var(--parchment)]/85 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center">
          <img 
            src={scrolled ? logoDark : logoLight} 
            alt="Devdut Ayurved Clinic" 
            className="h-10 md:h-12 w-auto object-contain transition-all duration-300" 
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: scrolled ? "text-[var(--forest-deep)]" : "text-[var(--gold)]" }}
              inactiveProps={{ className: scrolled ? "text-[var(--muted-foreground)]" : "text-[var(--parchment)]/85" }}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${scrolled ? "hover:text-[var(--forest-deep)]" : "hover:text-[var(--gold)]"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-sm ${scrolled ? "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]" : "text-[var(--parchment)]/85 hover:text-[var(--gold)]"}`}
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>

          <Button asChild className="bg-forest-gradient text-[var(--parchment)] hover:opacity-95 shadow-gold rounded-full px-6">
            <Link to="/book">Book Appointment</Link>
          </Button>
        </div>

        <button
          className={`lg:hidden grid place-items-center size-11 rounded-full border ${scrolled ? "border-[var(--border)] bg-[var(--card)] text-[var(--forest-deep)]" : "border-[var(--parchment)]/30 bg-white/10 text-[var(--parchment)]"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

      </div>

      {open && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--parchment)]/95 backdrop-blur-xl">
          <div className="container-page py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-[var(--foreground)]"
              >
                {n.label}
              </Link>
            ))}
            <Button asChild className="mt-4 bg-forest-gradient text-[var(--parchment)] rounded-full">
              <Link to="/book" onClick={() => setOpen(false)}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
