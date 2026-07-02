import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as CountUpModule from "react-countup";
function unwrapCountUp(mod: any): any {
  if (typeof mod === "function") return mod;
  if (mod?.default && typeof mod.default === "function") return mod.default;
  if (mod?.default?.default && typeof mod.default.default === "function") return mod.default.default;
  return mod;
}
const CountUp = unwrapCountUp(CountUpModule);
import { ArrowRight, Sparkles, Leaf, Heart, ShieldCheck, Star, Quote, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament, LeafSVG, Mandala } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import { TREATMENTS } from "@/lib/treatments";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/hero-ayurveda.jpg";
import doctorImg from "@/assets/doctor.jpg";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devdut Ayurved Clinic — Healing that begins in nature" },
      { name: "description", content: SITE.description },
      { property: "og:title", content: "Devdut Ayurved Clinic — Healing that begins in nature" },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Marquee />
      <Philosophy />
      <WhyAyurveda />
      <TreatmentsShowcase />
      <DoctorFeature />
      <Journey />
      <Stats />
      <Testimonials />
      <BlogPreview />
      <FinalCTA />
    </PageShell>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const slides = [heroImg, therapyImg, treatmentsImg, templeImg];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section ref={ref} className="relative -mt-20 min-h-dvh overflow-hidden bg-forest-gradient text-[var(--parchment)]">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={idx}
            src={slides[idx]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full object-cover object-right md:object-[80%_center]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--forest-deep)] via-[var(--forest-deep)]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-transparent to-[var(--forest-deep)]/50 opacity-90" />
      </motion.div>


      <Mandala className="absolute -right-40 -bottom-40 size-[700px] text-[var(--gold)]/10 animate-glow" />

      <motion.div style={{ opacity }} className="relative container-page min-h-dvh flex flex-col justify-center pt-32 pb-20">
        <Reveal>
          <div className="font-sanskrit text-[var(--gold)] text-base md:text-lg mb-4">
            शरीरमाद्यं खलु धर्मसाधनम्
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] max-w-4xl text-balance text-[var(--parchment)]">
            Healing that <em className="text-shimmer not-italic">begins</em> in nature.
          </h1>
        </Reveal>
        <Reveal delay={0.35}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--parchment)]/80 text-balance">
            Five thousand years of Ayurvedic wisdom, delivered with the care and precision of modern medicine — for the way you actually live today.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full bg-gold-gradient text-[var(--forest-deep)] hover:opacity-90 shadow-gold h-14 px-8 text-base font-medium">
              <Link to="/book">Book Consultation <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-[var(--parchment)]/25 bg-white/5 text-[var(--parchment)] hover:bg-white/10 h-14 px-8 text-base font-medium">
              <Link to="/treatments">Explore Treatments</Link>
            </Button>
            
            <div className="ml-auto flex items-center justify-center pt-8 md:pt-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative flex items-center justify-center text-[var(--parchment)]"
              >
                <svg width="90" height="90" viewBox="0 0 100 100" className="overflow-visible opacity-80">
                  <path
                    id="scrollPath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text fill="currentColor" fontSize="12" fontWeight="600" letterSpacing="0.1em">
                    <textPath href="#scrollPath" startOffset="0%" textLength="238.7" lengthAdjust="spacing">
                      SCROLL DOWN * SCROLL DOWN * SCROLL DOWN * 
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute text-[var(--parchment)]">
                <ArrowDown className="size-5" />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = ["Panchakarma", "Nadi Pariksha", "Shirodhara", "Rasayana", "Abhyanga", "Basti", "Nasya", "Herbal Formulations"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-[var(--border)] bg-[var(--cream)] overflow-hidden py-8">
      <div className="flex animate-marquee whitespace-nowrap gap-16 text-2xl md:text-4xl font-display text-[var(--forest-deep)]/70">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t}
            <span className="text-[var(--gold)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- PHILOSOPHY -------------------- */
function Philosophy() {
  return (
    <section className="container-page py-32">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-6 -left-6 size-24 rounded-full bg-gold-gradient blur-3xl opacity-40" />
            <img src={templeImg} alt="Ancient temple silhouette at dawn" width={1600} height={900} loading="lazy" className="relative rounded-3xl shadow-elegant" />
            <div className="absolute -bottom-8 -right-8 w-56 rounded-2xl bg-[var(--cream)] p-6 shadow-elegant border border-[var(--border)]">
              <div className="font-sanskrit text-[var(--gold)] text-sm mb-1">आयुर्वेद</div>
              <div className="font-display text-lg text-[var(--forest-deep)]">The science of life</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="eyebrow mb-4">Our Philosophy</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
            Ancient wisdom. <span className="italic text-[var(--copper)]">Modern precision.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--muted-foreground)]">
            Ayurveda does not treat diseases — it treats people. At Devdut, every plan begins with your unique constitution, your history and your daily life. What we prescribe you cannot find in a pharmacy, because it does not yet exist. We make it, for you.
          </p>
          <Ornament className="my-8 !justify-start" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Leaf, label: "Root cause, not symptoms" },
              { icon: Heart, label: "Personalised to your Prakriti" },
              { icon: ShieldCheck, label: "Zero side effects, ever" },
              { icon: Sparkles, label: "5,000 years of proof" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 text-sm font-medium">
                <span className="grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]"><f.icon className="size-4" /></span>
                {f.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- WHY AYURVEDA -------------------- */
function WhyAyurveda() {
  const cards = [
    { title: "Traditional healing", body: "Formulas refined over centuries — proven by generations, not marketing campaigns.", icon: "🪔" },
    { title: "No side effects", body: "Plant-based, purified and personalised. We work with the body, never against it.", icon: "🌿" },
    { title: "Root cause treatment", body: "We look for what is causing the imbalance — not just what is loudest.", icon: "🔍" },
    { title: "Personalised care", body: "Your protocol is not our protocol. Every plan is designed from your assessment upward.", icon: "✨" },
    { title: "Natural medicines", body: "Formulated in-house from single herbs to complex Rasayana. Traceable, testable, pure.", icon: "🏺" },
    { title: "Continuity of care", body: "Weekly check-ins, adjustments and support — until your body is stable, not for a fixed number of sessions.", icon: "🤝" },
  ];
  return (
    <section className="bg-[var(--cream)] border-y border-[var(--border)]">
      <div className="container-page py-32">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="eyebrow mb-4">Why Ayurveda</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
              Six reasons people choose Devdut.
            </h2>
            <Ornament className="mt-8" />
          </Reveal>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <article className="group h-full rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-8 hover-lift">
                <div className="text-4xl mb-6" aria-hidden>{c.icon}</div>
                <h3 className="font-display text-2xl mb-3">{c.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{c.body}</p>
                <div className="gold-divider mt-8 opacity-40 group-hover:opacity-100 transition-opacity" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- TREATMENTS -------------------- */
function TreatmentsShowcase() {
  const featured = TREATMENTS.slice(0, 6);
  return (
    <section className="container-page py-32">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <Reveal>
          <div className="eyebrow mb-4">Our Treatments</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl text-balance">
            Care for every stage, <span className="italic text-[var(--copper)]">every season.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Button asChild variant="outline" className="rounded-full border-[var(--forest-deep)] text-[var(--forest-deep)] hover:bg-[var(--forest-deep)] hover:text-[var(--parchment)]">
            <Link to="/treatments">View all treatments <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((t, i) => (
          <Reveal key={t.slug} delay={i * 0.05}>
            <Link
              to="/treatments/$slug"
              params={{ slug: t.slug }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 hover-lift"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase tracking-widest text-[var(--gold)]">{t.category}</span>
                  <span className="font-sanskrit text-[var(--copper)]">{t.sanskrit ?? "◈"}</span>
                </div>
                <h3 className="font-display text-3xl mb-3 group-hover:text-[var(--copper)] transition-colors">{t.name}</h3>
                <p className="text-[var(--muted-foreground)]">{t.short}</p>
              </div>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">{t.duration}</span>
                <span className="inline-flex items-center gap-2 font-medium text-[var(--forest-deep)]">
                  Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <div aria-hidden className="absolute -bottom-16 -right-16 size-40 rounded-full bg-gold-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------- DOCTOR -------------------- */
function DoctorFeature() {
  return (
    <section className="relative bg-forest-gradient text-[var(--parchment)] overflow-hidden">
      <Mandala className="absolute -left-40 top-0 size-[500px] text-[var(--gold)]/10" />
      <div className="container-page py-32 grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center relative">
        <Reveal>
          <div className="relative">
            <img src={doctorImg} alt="Dr. Devdut Sharma, senior Ayurvedic physician" width={1024} height={1280} loading="lazy" className="rounded-3xl shadow-elegant" />
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[var(--parchment)] text-[var(--forest-deep)] p-5 shadow-elegant">
              <div className="text-xs uppercase tracking-widest text-[var(--gold)] mb-1">Google reviews</div>
              <div className="flex items-center gap-2">
                <div className="flex text-[var(--gold)]">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
                <span className="font-display text-xl">4.9</span>
              </div>
              <div className="text-xs text-[var(--muted-foreground)]">from 620+ patients</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="eyebrow mb-4 text-[var(--gold)]">Meet the Vaidya</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight text-[var(--parchment)] text-balance">
            Dr. Devdut Sharma, <span className="italic text-[var(--gold)]">BAMS, MD (Ayu.)</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--parchment)]/80">
            Twenty-six years of clinical practice. Trained at the Institute of Medical Sciences, Banaras Hindu University, and mentored by traditional Vaidyas in Kerala's classical Panchakarma lineage.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[{ n: 26, s: "+", l: "Years practising" }, { n: 12000, s: "+", l: "Patients treated" }, { n: 15, s: "", l: "Awards & fellowships" }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl md:text-5xl text-[var(--gold)]">
                  <CountUp end={s.n} duration={2.5} enableScrollSpy scrollSpyOnce separator="," />{s.s}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-[var(--parchment)]/60">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild className="rounded-full bg-gold-gradient text-[var(--forest-deep)] h-12 px-6">
              <Link to="/doctor">Read full profile</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-white/25 bg-white/5 text-[var(--parchment)] hover:bg-white/10 h-12 px-6">
              <Link to="/book">Book consultation</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- JOURNEY -------------------- */
function Journey() {
  const steps = [
    { n: "01", t: "Book", d: "Choose an in-clinic or virtual consultation slot in seconds." },
    { n: "02", t: "Consultation", d: "A 60-minute conversation, pulse and Prakriti assessment." },
    { n: "03", t: "Diagnosis", d: "Root-cause mapping and, when needed, modern investigations." },
    { n: "04", t: "Treatment", d: "Custom herbs, therapies and a lifestyle plan you can actually follow." },
    { n: "05", t: "Follow-up", d: "Weekly check-ins and adjustments until your body is stable." },
    { n: "06", t: "Recovery", d: "You leave with a life plan — not a lifelong prescription." },
  ];
  return (
    <section className="container-page py-32">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <Reveal>
          <div className="eyebrow mb-4">Your Journey</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">Six unhurried steps to lasting health.</h2>
        </Reveal>
      </div>
      <div className="relative">
        <div aria-hidden className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} as="li">
              <div className="relative">
                <div className="mb-4 grid size-16 place-items-center rounded-full border border-[var(--gold)] bg-[var(--parchment)] font-display text-2xl text-[var(--gold)]">
                  {s.n}
                </div>
                <h3 className="font-display text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------- STATS STRIP -------------------- */
function Stats() {
  const stats = [
    { n: 26, s: "+", l: "Years of practice" },
    { n: 12000, s: "+", l: "Patients healed" },
    { n: 45, s: "", l: "Signature therapies" },
    { n: 4.9, s: "/5", l: "Google rating", decimals: 1 },
  ];
  return (
    <section className="bg-[var(--cream)] border-y border-[var(--border)]">
      <div className="container-page py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <Reveal key={s.l}>
            <div className="font-display text-4xl md:text-5xl text-[var(--forest-deep)]">
              <CountUp end={s.n} duration={2.5} decimals={s.decimals ?? 0} separator="," enableScrollSpy scrollSpyOnce />{s.s}
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-[var(--muted-foreground)]">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------- TESTIMONIALS -------------------- */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const items = [
    { name: "ANIKET PATIL", role: "Patient from Karvand · via Google Reviews", body: "Dr. Salunke is extremely skilled. I got my single-sitting RCT and ceramic cap done here, and there was zero pain during the procedure. Best dentist in Shirpur area.", image: doctorImg },
    { name: "ANAYA M.", role: "Patient from Mumbai", body: "Six months at Devdut and my cycles are regular for the first time in a decade. No more hormones. I feel like myself again.", image: therapyImg },
    { name: "ROHAN K.", role: "Patient from Pune", body: "Twenty years of chronic migraine. Panchakarma changed the trajectory — I have gone from four attacks a week to two a month.", image: treatmentsImg }
  ];

  const next = () => setIdx((i) => (i + 1) % items.length);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[idx];

  return (
    <section className="container-page py-24 md:py-32">
      <div className="grid gap-12 lg:gap-24 lg:grid-cols-2 lg:items-start">
        {/* Left Column */}
        <div className="flex flex-col">
          <Reveal>
            <div className="mb-8 md:mb-12 mt-4">
              <h2 className="font-display text-5xl md:text-6xl text-[var(--forest-deep)] mb-6">
                Patient Stories
              </h2>
              <div className="h-0.5 w-24 bg-[var(--gold)]/60"></div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Quote className="size-8 md:size-10 text-[var(--gold)]/40 mb-4" strokeWidth={1} />
          </Reveal>
          
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-xl md:text-2xl leading-relaxed text-[var(--forest-deep)] italic mb-6 text-balance">
                  "{current.body}"
                </p>
                
                <div className="uppercase tracking-widest text-xs font-bold text-[var(--gold)] mb-1">
                  {current.name}
                </div>
                <div className="text-[11px] text-[var(--muted-foreground)] mb-8">
                  {current.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 mt-auto">
              <button 
                onClick={prev}
                className="size-12 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--cream)] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button 
                onClick={next}
                className="size-12 rounded-full bg-[var(--forest-deep)] flex items-center justify-center text-white hover:bg-[var(--forest)] transition-colors shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right Column */}
        <Reveal delay={0.3}>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/3.5] overflow-hidden rounded-[2.5rem] bg-[var(--cream)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 size-full object-cover grayscale opacity-90"
              />
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- BLOG PREVIEW -------------------- */
import { POSTS } from "@/lib/blog";
function BlogPreview() {
  const posts = POSTS.slice(0, 3);
  return (
    <section className="bg-[var(--cream)] border-y border-[var(--border)]">
      <div className="container-page py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <div className="eyebrow mb-4">The Journal</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl">
              Wisdom, written down.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blog">Read all articles <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
          </Reveal>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--parchment)] overflow-hidden hover-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-gradient">
                  <img src={i === 0 ? treatmentsImg : i === 1 ? therapyImg : templeImg} alt="" loading="lazy" className="size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-[var(--gold)] mb-4">
                    <span>{p.category}</span><span>·</span><span>{p.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                  <p className="text-[var(--muted-foreground)] flex-1">{p.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FINAL CTA -------------------- */
function FinalCTA() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--forest-deep)] text-[var(--parchment)] p-8 md:p-10 text-center">
          {/* Premium Background Image */}
          <div className="absolute inset-0">
            <img src={therapyImg} alt="" className="size-full object-cover opacity-30 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-[var(--forest-deep)]/80 to-[var(--forest-deep)]/40" />
            <div className="absolute inset-0 bg-[var(--forest-deep)]/40 mix-blend-multiply" />
          </div>

          <Mandala className="absolute -top-40 -right-40 size-[600px] text-[var(--gold)]/15 animate-glow pointer-events-none" />
          <Mandala className="absolute -bottom-40 -left-40 size-[600px] text-[var(--gold)]/15 animate-glow pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="font-sanskrit text-[var(--gold)] text-lg md:text-xl mb-3 tracking-wide drop-shadow-md">
              स्वास्थ्यमेव परमं धनम्
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] max-w-3xl mx-auto text-balance drop-shadow-lg text-[var(--parchment)]">
              Your body already knows how to heal. <em className="text-shimmer not-italic block mt-1">Let it.</em>
            </h2>
            
            <Ornament className="my-6 opacity-70" />
            
            <p className="mx-auto max-w-xl text-base md:text-lg text-[var(--parchment)]/90 leading-relaxed font-light">
              Book a first consultation with Dr. Devdut. <br className="hidden md:block" />
              In-clinic in Pune or virtual, from anywhere in the world.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Button asChild className="rounded-full bg-gold-gradient text-[var(--forest-deep)] h-12 px-8 shadow-gold font-semibold transition-transform hover:scale-105">
                <Link to="/book">Book Your Consultation <ArrowRight className="ml-2 size-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[var(--parchment)]/30 bg-white/5 text-[var(--parchment)] hover:bg-white/15 h-12 px-8 backdrop-blur-sm transition-colors">
                <Link to="/contact">Talk To Us First</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
