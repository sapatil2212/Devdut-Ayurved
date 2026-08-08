import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ChevronDown, ChevronRight, ArrowRight, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { TREATMENTS } from "@/lib/treatments";
import { Button } from "@/components/ui/button";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import logoLight from "@/assets/logo/devdut-ayurved-logo-light.png";
import logoDark from "@/assets/logo/devdut-ayurved-logo-dark.png";
import therapyImg from "@/assets/therapy.jpg";

/* Morphing hamburger → close icon */
function BurgerIcon({ open, dark }: { open: boolean; dark: boolean }) {
  const color = dark ? "var(--forest-deep)" : "var(--parchment)";
  const common = {
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    style: { transformBox: "fill-box" as const, transformOrigin: "center" },
  };
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.line
        x1="3" x2="21" y1="7" y2="7"
        {...common}
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.line
        x1="3" x2="21" y1="12" y2="12"
        {...common}
        animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" x2="21" y1="17" y2="17"
        {...common}
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[var(--parchment)]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
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
          {NAV.map((n) => {
            if ("dropdown" in n && n.dropdown) {
              return (
                <div key={n.to} className="group relative">
                  <Link
                    to={n.to}
                    activeOptions={{ exact: false }}
                    activeProps={{ className: scrolled ? "text-[var(--forest-deep)]" : "text-[var(--gold)]" }}
                    inactiveProps={{ className: scrolled ? "text-[var(--muted-foreground)]" : "text-[var(--parchment)]/85" }}
                    className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${scrolled ? "hover:text-[var(--forest-deep)]" : "hover:text-[var(--gold)]"}`}
                  >
                    {n.label}
                    <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-[45%] top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="w-[850px] rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 shadow-elegant flex gap-8">
                      {/* Left Column: Image */}
                      <div className="w-[260px] shrink-0 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[var(--border)]">
                        <img
                          src={therapyImg}
                          alt="Ayurvedic Treatment Room"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/20 to-transparent" />
                      </div>

                      {/* Right Columns: Grid of 3 columns */}
                      <div className="flex-1 grid grid-cols-3 gap-6">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-2">
                          {[
                            { name: "Nadipariksha", to: "/nadipariksha" },
                            { name: "Panchakarma Therapies", to: "/treatments/$slug", params: { slug: "panchakarma" } },
                            { name: "Agnikshar Chikitsa", to: "/treatments/$slug", params: { slug: "agnikshar" } },
                            { name: "Lifestyle & Chronic Diseases", to: "/treatments/$slug", params: { slug: "lifestyle-chronic" } },
                            { name: "Bone, Joint & Neurological Care", to: "/treatments/$slug", params: { slug: "joint-pain" } },
                          ].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.to as any}
                              params={(item as any).params as any}
                              className="group/item flex items-center gap-3 py-1.5 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--forest-deep)] transition-all duration-200"
                            >
                              <span className="size-5 rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:bg-[var(--forest-deep)] group-hover/item:text-[var(--parchment)] group-hover/item:translate-x-1">
                                <ChevronRight className="size-3" />
                              </span>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-2">
                          {[
                            { name: "Paralysis Treatment", to: "/treatments/$slug", params: { slug: "paralysis" } },
                            { name: "Skin, Hair & Cosmetic Care", to: "/treatments/$slug", params: { slug: "skin" } },
                            { name: "Women's & Men's Health", to: "/treatments/$slug", params: { slug: "womens-health" } },
                            { name: "Digestive Care", to: "/treatments/$slug", params: { slug: "digestion" } },
                            { name: "Kidney Diseases", to: "/treatments/$slug", params: { slug: "kidney" } },
                          ].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.to as any}
                              params={item.params as any}
                              className="group/item flex items-center gap-3 py-1.5 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--forest-deep)] transition-all duration-200"
                            >
                              <span className="size-5 rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:bg-[var(--forest-deep)] group-hover/item:text-[var(--parchment)] group-hover/item:translate-x-1">
                                <ChevronRight className="size-3" />
                              </span>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col gap-2">
                          {[
                            { name: "Mental Health Care", to: "/treatments/$slug", params: { slug: "mental-health" } },
                            { name: "Respiratory Care", to: "/treatments/$slug", params: { slug: "respiratory" } },
                            { name: "Child Health & Immunity", to: "/treatments/$slug", params: { slug: "child" } },
                            { name: "General Wellness & Preventive Care", to: "/treatments/$slug", params: { slug: "preventive-care" } },
                          ].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.to as any}
                              params={item.params as any}
                              className="group/item flex items-center gap-3 py-1.5 text-[13px] font-medium text-[var(--muted-foreground)] hover:text-[var(--forest-deep)] transition-all duration-200"
                            >
                              <span className="size-5 rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0 transition-all duration-300 group-hover/item:bg-[var(--forest-deep)] group-hover/item:text-[var(--parchment)] group-hover/item:translate-x-1">
                                <ChevronRight className="size-3" />
                              </span>
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={n.to}
                to={n.to as any}
                params={("params" in n ? n.params : undefined) as any}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: scrolled ? "text-[var(--forest-deep)]" : "text-[var(--gold)]" }}
                inactiveProps={{ className: scrolled ? "text-[var(--muted-foreground)]" : "text-[var(--parchment)]/85" }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${scrolled ? "hover:text-[var(--forest-deep)]" : "hover:text-[var(--gold)]"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className={`flex items-center gap-2 text-sm ${scrolled ? "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]" : "text-[var(--parchment)]/85 hover:text-[var(--gold)]"}`}
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>
          <BookAppointmentDialog
            trigger={
              <Button className={`bg-forest-gradient text-[var(--parchment)] hover:opacity-95 shadow-gold rounded-full px-6 transition-colors ${!scrolled ? 'border border-[var(--gold)]/30' : 'border border-transparent'}`}>
                Book Appointment
              </Button>
            }
          />
        </div>

        <button
          className={`lg:hidden relative grid place-items-center size-11 rounded-full border transition-colors duration-300 ${scrolled ? "border-[var(--border)] bg-[var(--card)]" : "border-[var(--parchment)]/30 bg-white/10"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <BurgerIcon open={open} dark={scrolled} />
        </button>

      </div>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[var(--forest-deep)]/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-[var(--parchment)] shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-6 h-20 shrink-0">
                <img src={logoDark} alt="Devdut Ayurved Clinic" className="h-10 w-auto object-contain" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid place-items-center size-10 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--forest-deep)] transition-colors hover:bg-[var(--cream)]"
                >
                  <BurgerIcon open dark />
                </button>
              </div>

              {/* Scrollable nav */}
              <motion.nav
                className="flex-1 overflow-y-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                initial="hidden"
                animate="show"
              >
                <ul className="flex flex-col">
                  {NAV.map((n, ni) => {
                    const active =
                      n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                    const num = String(ni + 1).padStart(2, "0");

                    if ("dropdown" in n && n.dropdown) {
                      return (
                        <motion.li key={n.to} variants={itemVariants} className="border-b border-[var(--border)]/50">
                          <div className="flex items-center">
                            <Link
                              to={n.to}
                              className={`group flex flex-1 items-center gap-3 py-3 font-display text-lg transition-all duration-300 group-hover:pl-1 ${active ? "text-[var(--gold)]" : "text-[var(--forest-deep)]"}`}
                            >
                              <span className="text-[11px] font-sans font-semibold tracking-widest text-[var(--gold)]/70">{num}</span>
                              {n.label}
                            </Link>
                            <button
                              onClick={() => setTreatmentsOpen((v) => !v)}
                              aria-label="Toggle treatments"
                              aria-expanded={treatmentsOpen}
                              className={`grid size-8 place-items-center rounded-full transition-colors ${treatmentsOpen ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "text-[var(--muted-foreground)] hover:bg-[var(--cream)]"}`}
                            >
                              <motion.span animate={{ rotate: treatmentsOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                <ChevronDown className="size-4" />
                              </motion.span>
                            </button>
                          </div>
                          <AnimatePresence initial={false}>
                            {treatmentsOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <li className="ml-3 my-1 flex flex-col border-l-2 border-[var(--gold)]/30 pb-2 pl-4">
                                  {TREATMENTS.map((t) => (
                                    <Link
                                      key={t.slug}
                                      to="/treatments/$slug"
                                      params={{ slug: t.slug }}
                                      className="rounded-md py-1.5 pl-2 text-[13px] font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:bg-[var(--cream)] hover:pl-3 hover:text-[var(--forest-deep)]"
                                    >
                                      {t.name}
                                    </Link>
                                  ))}
                                </li>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    }

                    return (
                      <motion.li key={n.to} variants={itemVariants} className="border-b border-[var(--border)]/50">
                        <Link
                          to={n.to as any}
                          params={("params" in n ? n.params : undefined) as any}
                          className={`group flex items-center gap-3 py-3 font-display text-lg transition-all duration-300 hover:pl-1 ${active ? "text-[var(--gold)]" : "text-[var(--forest-deep)]"}`}
                        >
                          <span className="text-[11px] font-sans font-semibold tracking-widest text-[var(--gold)]/70">{num}</span>
                          {n.label}
                          <ArrowRight className="ml-auto size-4 -translate-x-2 text-[var(--gold)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.nav>

              {/* Panel footer */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="shrink-0 border-t border-[var(--border)] px-6 py-5"
              >
                <BookAppointmentDialog
                  trigger={
                    <Button
                      className="w-full bg-forest-gradient text-[var(--parchment)] rounded-full h-12 shadow-gold"
                    >
                      Book Appointment <ArrowRight className="ml-2 size-4" />
                    </Button>
                  }
                  onOpen={() => setOpen(false)}
                />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--forest-deep)]"
                >
                  <Phone className="size-4 text-[var(--gold)]" />
                  {SITE.phone}
                </a>
                <div className="mt-5 flex items-center justify-center gap-3">
                  {[
                    { href: SITE.social.instagram, Icon: Instagram, label: "Instagram" },
                    { href: SITE.social.facebook, Icon: Facebook, label: "Facebook" },
                    { href: SITE.social.youtube, Icon: Youtube, label: "YouTube" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full border border-[var(--border)] text-[var(--forest-deep)] transition-colors hover:bg-[var(--forest-deep)] hover:text-[var(--parchment)]"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};
