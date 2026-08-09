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
import { ArrowRight, Sparkles, Leaf, Heart, ShieldCheck, Star, Quote, ArrowDown, ChevronLeft, ChevronRight, Flame, Search, FlaskConical, HandHeart } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament, Mandala } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import { SITE } from "@/lib/site";
import { TESTIMONIALS } from "@/lib/testimonials";
import heroImg from "@/assets/hero-ayurveda.jpg";
import doctorImg from "@/assets/doctor.jpg";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";
import homeAboutImg from "@/assets/home-about.png";
import parchmentImg from "@/assets/ancient-paper.png";
import frangipaniFlowerImg from "@/assets/frangipani-flower.png";
import rightPaperImg from "@/assets/right-book.webp";
import leftBowlImg from "@/assets/left-bowl.png";
import childImg from "@/assets/treatments/child.png";
import lifestyleChronicImg from "@/assets/treatments/Lifestyle-Chronic.png";
import humanHealthImg from "@/assets/treatments/human-Health.png";
import jointImg from "@/assets/treatments/joint.png";
import skinHairImg from "@/assets/treatments/skin-hair.png";
import digestiveImg from "@/assets/treatments/digestive.png";


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
      <AncientSecrets />
      <Philosophy />
      <VedicWisdom />
      <WhyAyurveda />
      <NadiparikshaHighlight />
      <TreatmentsShowcase />
      <DoctorFeature />
      <Journey />
      <Testimonials />
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

  const slides = [
    {
      img: heroImg,
      sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्",
      headline: <>Healing that <em className="text-shimmer not-italic">begins</em> in nature.</>,
      sub: "Five thousand years of Ayurvedic wisdom, delivered with the care and precision of modern medicine — for the way you actually live today.",
    },
    {
      img: therapyImg,
      sanskrit: "मनः प्रसादः परमं सुखम्",
      headline: <>Restore your body.<em className="text-shimmer not-italic block mt-1"> Renew your spirit.</em></>,
      sub: "Personalised therapies rooted in classical Panchakarma — cleansing, rebuilding and balancing from the inside out.",
    },
    {
      img: treatmentsImg,
      sanskrit: "आरोग्यं परमं भाग्यम्",
      headline: <>Ancient treatments.<em className="text-shimmer not-italic block mt-1"> Lasting results.</em></>,
      sub: "45 signature therapies crafted for your unique Prakriti — from Shirodhara to Rasayana, every protocol is yours alone.",
    },
    {
      img: templeImg,
      sanskrit: "स्वस्थस्य स्वास्थ्यरक्षणम्",
      headline: <>Where tradition<em className="text-shimmer not-italic block mt-1"> meets healing.</em></>,
      sub: "Rooted in the living wisdom of Kerala's classical lineage and BHU's medical traditions — a practice built on centuries of proof.",
    },
  ];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <section ref={ref} className="relative -mt-20 min-h-dvh overflow-hidden bg-forest-gradient text-[var(--parchment)]">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={idx}
            src={slide.img}
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

        {/* Sanskrit — soft fade + gentle drift up */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`sanskrit-${idx}`}
            className="font-sanskrit text-[var(--gold)] text-base md:text-lg mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {slide.sanskrit}
          </motion.div>
        </AnimatePresence>

        {/* Headline — pure cross-fade */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${idx}`}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] max-w-4xl text-balance text-[var(--parchment)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut", delay: 0.08 }}
          >
            {slide.headline}
          </motion.h1>
        </AnimatePresence>

        {/* Sub paragraph — fade + gentle drift up, slightly delayed */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${idx}`}
            className="mt-6 max-w-xl text-base md:text-lg font-light text-[var(--parchment)]/80 text-balance"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }}
          >
            {slide.sub}
          </motion.p>
        </AnimatePresence>


        <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
          <BookAppointmentDialog
            trigger={
              <Button className="rounded-full bg-gold-gradient text-[var(--forest-deep)] hover:opacity-90 shadow-gold h-9 px-4 text-xs md:h-12 md:px-6 md:text-sm font-medium cursor-pointer">
                Book Consultation <ArrowRight className="ml-1.5 size-3 md:ml-2 md:size-4" />
              </Button>
            }
          />
          <Button asChild variant="outline" className="rounded-full border-[var(--parchment)]/25 bg-white/5 text-[var(--parchment)] hover:bg-white/10 h-9 px-4 text-xs md:h-12 md:px-6 md:text-sm font-medium">
            <Link to="/treatments">Explore Treatments</Link>
          </Button>

          {/* Slide dots */}
          <div className="ml-auto flex items-center gap-2 pt-1">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === idx
                  ? "w-6 h-2 bg-[var(--gold)]"
                  : "w-2 h-2 bg-[var(--parchment)]/40 hover:bg-[var(--parchment)]/70"
                  }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom-right corner */}
      <div className="hidden md:flex absolute bottom-8 right-8 items-center justify-center">
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
            <text fill="currentColor" fontSize="12" fontWeight="400" letterSpacing="0.1em">
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
    </section>
  );
}


/* -------------------- MARQUEE -------------------- */
function Marquee() {
  const items = ["Panchakarma", "Nadi Pariksha", "Shirodhara", "Rasayana", "Abhyanga", "Basti", "Nasya", "Herbal Formulations"];
  const row = [...items, ...items];
  return (
    <div className="bg-forest-gradient border-b border-white/10 overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap gap-4 text-lg md:text-2xl font-display font-light text-[var(--parchment)]/70">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-4">
            {t}
            <span className="text-[var(--gold)]/80 text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------- PHILOSOPHY -------------------- */
function Philosophy() {
  return (
    <section className="container-page pt-0 md:pt-2 pb-24 md:pb-32">
      <div className="grid gap-16 lg:grid-cols-2 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-6 -left-6 size-24 rounded-full bg-gold-gradient blur-3xl opacity-40" />
            <img src={homeAboutImg} alt="Our Philosophy - Ancient wisdom. Modern precision." width={1600} height={1000} loading="lazy" className="relative rounded-3xl w-full max-h-[480px] object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="eyebrow mb-1">Our Philosophy</div>
          <h2 className="font-display text-2xl md:text-4xl leading-tight sm:whitespace-nowrap">
            Ancient Wisdom. <span className="italic text-[var(--copper)]">Modern Precision.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            At Devdut Ayurved Clinic, we believe that true healing begins by understanding the root cause of illness, not just its symptoms. Guided by the timeless principles of Ayurveda, we combine traditional therapies, personalized care, and evidence-based practices to restore balance to the body, mind, and spirit.
          </p>
          <p className="mt-4 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
            Every treatment is thoughtfully tailored to your unique Prakriti (body constitution), lifestyle, and health goals. By integrating authentic Ayurvedic wisdom with a modern, patient-centered approach, we help you achieve lasting wellness, naturally and safely.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
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

/* -------------------- VEDIC WISDOM -------------------- */
function VedicWisdom() {
  return (
    <section className="relative pt-16 pb-36 md:pt-24 md:pb-24 bg-[#1c120c] text-[var(--parchment)] overflow-visible">
      {/* Top right manuscript roll image — half above, half inside */}
      <motion.img
        src={rightPaperImg}
        alt=""
        initial={{ opacity: 0, x: 90, rotate: 16 }}
        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -right-8 md:-right-20 -top-16 md:-top-24 w-64 md:w-[420px] pointer-events-none z-10"
        aria-hidden
      />

      <div className="container-page relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl mb-6 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-6xl leading-[1.1] text-[#f4ebd0]">
            Unlock 2,500 Years of<br />
            Vedic Wisdom for Lasting<br />
            Health and Vitality
          </h2>
        </motion.div>

        {/* Four Columns */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4 max-w-5xl ml-auto">
          {[
            {
              title: "Natural Healing with Side-Benefit",
              desc: "Powerful treatments without the side effects of conventional medicine.",
            },
            {
              title: "Holistic Care for Serious Conditions",
              desc: "Proven healing from chronic pain to metabolic imbalances for transformative results.",
            },
            {
              title: "Personalized Healing Plans",
              desc: "Personalized treatments crafted by master Vaidyas to suit your unique health needs.",
            },
            {
              title: "Uncompromised Purity",
              desc: "Rigorously tested products to ensure the highest standards of safety and purity.",
            },
          ].map((col, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 md:gap-2">
              <h3 className="font-display text-sm md:text-lg text-[var(--gold)] font-semibold">
                {col.title}
              </h3>
              <p className="text-xs md:text-sm text-[var(--parchment)]/70 leading-relaxed font-light">
                {col.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom left bowl image — half inside, half outside */}
      <motion.img
        src={leftBowlImg}
        alt=""
        initial={{ opacity: 0, x: -90, rotate: -16 }}
        whileInView={{ opacity: 1, x: 0, rotate: -6 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute -left-8 md:-left-20 -bottom-44 md:-bottom-52 w-56 md:w-[360px] pointer-events-none z-10 sepia-[.35] contrast-105 brightness-95 saturate-[1.1] drop-shadow-[0_22px_45px_rgba(0,0,0,0.75)]"
        aria-hidden
      />
    </section>
  );
}

/* -------------------- ANCIENT SECRETS -------------------- */
function AncientSecrets() {
  return (
    <section className="relative pt-10 md:pt-14 pb-8 md:pb-10 overflow-hidden">
      <div className="container-page relative">
        {/* Parchment scroll card */}
        <div className="relative mx-auto max-w-5xl">
          {/* Parchment background image */}
          <img
            src={parchmentImg}
            alt=""
            className="absolute inset-0 w-full h-full object-fill"
            aria-hidden
          />

          {/* Content on parchment */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 md:px-20 pt-16 pb-20 md:pt-24 md:pb-30">
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-[#4a3520] text-balance">
              Discover Ancient Secrets<br />
              for Vibrant Health
            </h2>
            <p className="mt-4 max-w-lg text-xs md:text-base text-[#6b5744] font-medium leading-relaxed">
              Transform chronic pain into lasting relief, restore natural harmony, and experience
              vibrant health with Devdut Ayurved — trusted as the pinnacle of
              ancient Ayurvedic healing.
            </p>
            <BookAppointmentDialog
              trigger={
                <Button className="mt-5 rounded-full bg-[#4a3520] text-[var(--parchment)] hover:bg-[#3a2810] px-6 py-2.5 md:px-10 md:py-3 h-auto text-xs md:text-sm font-medium tracking-wide cursor-pointer">
                  Book my Consultation
                </Button>
              }
            />
          </div>

          {/* Frangipani flower overlapping the bottom right corner with scroll animation */}
          <motion.img
            src={frangipaniFlowerImg}
            alt=""
            initial={{ x: 60, opacity: 0, rotate: 15 }}
            whileInView={{ x: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute right-2 md:right-8 -bottom-4 md:-bottom-6 w-44 md:w-60 z-20 pointer-events-none"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------- WHY AYURVEDA -------------------- */
function WhyAyurveda() {
  const cards = [
    { num: "I", title: "Traditional healing", body: "Formulas refined over centuries — proven by generations, not marketing campaigns.", Icon: Flame, sanskrit: "परम्परा" },
    { num: "II", title: "No side effects", body: "Plant-based, purified and personalised. We work with the body, never against it.", Icon: Leaf, sanskrit: "निर्दोष" },
    { num: "III", title: "Root cause treatment", body: "We look for what is causing the imbalance — not just what is loudest.", Icon: Search, sanskrit: "मूल" },
    { num: "IV", title: "Personalised care", body: "Your protocol is not our protocol. Every plan is designed from your assessment upward.", Icon: Sparkles, sanskrit: "प्रकृति" },
    { num: "V", title: "Natural medicines", body: "Formulated in-house from single herbs to complex Rasayana. Traceable, testable, pure.", Icon: FlaskConical, sanskrit: "औषधि" },
    { num: "VI", title: "Continuity of care", body: "Weekly check-ins, adjustments and support — until your body is stable, not for a fixed number of sessions.", Icon: HandHeart, sanskrit: "सेवा" },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-[var(--cream)] border-y border-[var(--border)]">
      {/* Ancient texture + mandala watermarks */}
      <img src={parchmentImg} alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply" />
      <Mandala className="pointer-events-none absolute -left-40 -top-40 size-[520px] text-[var(--gold)]/10" />
      <Mandala className="pointer-events-none absolute -right-48 -bottom-48 size-[560px] text-[var(--copper)]/10" />

      <div className="container-page relative py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <div className="eyebrow mb-2">Why Ayurveda</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight sm:whitespace-nowrap">
              Six reasons people choose <span className="italic text-[var(--copper)]">Devdut.</span>
            </h2>
            <Ornament className="mt-4" />
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 md:mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.article
              key={c.title}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative h-full overflow-hidden rounded-2xl md:rounded-3xl border border-[var(--border)] bg-[var(--parchment)]/40 p-4 md:p-8 transition-all duration-300 hover:border-[var(--gold)]/50 hover:bg-[var(--parchment)]/60"
            >
              {/* Corner flourishes — only visible on hover */}
              <span aria-hidden className="pointer-events-none absolute left-2.5 top-2.5 md:left-3 md:top-3 size-4 md:size-5 border-l border-t border-[var(--gold)]/60 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span aria-hidden className="pointer-events-none absolute right-2.5 bottom-2.5 md:right-3 md:bottom-3 size-4 md:size-5 border-r border-b border-[var(--gold)]/60 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon seal — positioned top-right */}
              <div className="absolute top-3 right-4 md:top-5 md:right-8 inline-grid">
                <motion.span
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="grid size-10 md:size-14 place-items-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 text-[var(--gold)]"
                >
                  <c.Icon className="size-5 md:size-6" strokeWidth={1.5} />
                </motion.span>
              </div>

              <div className="pr-12 md:pr-16">
                <div className="mb-0.5 md:mb-1 font-sanskrit text-xs md:text-sm text-[var(--copper)]/80">{c.sanskrit}</div>
                <h3 className="font-display text-base md:text-2xl mb-1.5 md:mb-3 leading-snug text-[var(--forest-deep)]">{c.title}</h3>
              </div>
              <p className="text-xs md:text-base text-[var(--muted-foreground)] leading-relaxed">{c.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- NADIPARIKSHA USP -------------------- */
function NadiparikshaHighlight() {
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--gold)]/35 bg-forest-gradient text-[var(--parchment)] p-8 md:p-12">
          <Mandala className="absolute -right-24 -bottom-24 size-[360px] text-[var(--gold)]/10 pointer-events-none" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <div className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold mb-3">Clinic USP</div>
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-[var(--parchment)]">
                Nadipariksha — pulse diagnosis that designs your care
              </h2>
              <p className="mt-4 text-[var(--parchment)]/80 max-w-2xl leading-relaxed">
                Classical three-finger pulse reading to map Prakriti, doshas and early imbalance — the starting point of every protocol with Dr. Ganesh Kumar Patil.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-2 text-sm text-[var(--gold)] font-medium">
                Promo: Every month on the {SITE.nadiparikshaDates}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild className="rounded-full bg-gold-gradient text-[var(--forest-deep)] h-12 px-6">
                <Link to="/nadipariksha">Explore Nadipariksha <ArrowRight className="ml-2 size-4" /></Link>
              </Button>
              <BookAppointmentDialog
                trigger={
                  <Button variant="outline" className="rounded-full border-white/25 bg-white/5 text-[var(--parchment)] hover:bg-white/10 h-12 px-6 cursor-pointer">
                    Book session
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------- TREATMENTS -------------------- */
function TreatmentsShowcase() {
  const categories = [
    {
      title: "Nadipariksha",
      slug: "nadipariksha",
      image: therapyImg,
      items: ["Pulse Diagnosis", "Prakriti Mapping", "Dosha Assessment", "1st & 15th Promo"],
    },
    {
      title: "Panchakarma Therapies",
      slug: "panchakarma",
      image: therapyImg,
      items: ["Vamana", "Virechana", "Basti", "Nasya", "Raktamokshana"],
    },
    {
      title: "Agnikshar Chikitsa",
      slug: "agnikshar",
      image: templeImg,
      items: ["Agnikarma", "Kshara Karma", "Warts & Corns", "Chronic Lesions"],
    },
    {
      title: "Lifestyle & Chronic Diseases",
      slug: "lifestyle-chronic",
      image: lifestyleChronicImg,
      items: ["Diabetes", "Thyroid", "Jaundice", "Infective Hepatitis", "Obesity", "Allergies"],
    },
    {
      title: "Bone, Joint & Neurological Care",
      slug: "joint-pain",
      image: jointImg,
      items: ["Arthritis", "Joint Pain", "Sciatica", "Migraine", "Headache", "Epilepsy"],
    },
    {
      title: "Paralysis Treatment",
      slug: "paralysis",
      image: jointImg,
      items: ["Hemiplegia", "Paraplegia", "Post-stroke Care", "Nerve Nourishment"],
    },
    {
      title: "Skin, Hair & Cosmetic Care",
      slug: "skin",
      image: skinHairImg,
      items: ["Hair Fall", "Acne", "Skin Diseases", "Cracked Heels", "Warts & Corns"],
    },
    {
      title: "Women's & Men's Health",
      slug: "womens-health",
      image: humanHealthImg,
      items: ["Menstrual Disorders", "Infertility", "Sexual Weakness", "Nightmares", "Hormonal Health"],
    },
    {
      title: "Digestive Care",
      slug: "digestion",
      image: digestiveImg,
      items: ["Stomach Disorders", "Piles", "Fissure", "Fistula", "Acidity", "Constipation"],
    },
    {
      title: "Kidney Diseases",
      slug: "kidney",
      image: digestiveImg,
      items: ["Renal Calculi", "Renal Failure", "Urinary Disorders", "Stone Support"],
    },
    {
      title: "Mental Health Care",
      slug: "mental-health",
      image: homeAboutImg,
      items: ["Anxiety", "Insomnia", "Nightmares", "Burnout", "Stress"],
    },
    {
      title: "Respiratory Care",
      slug: "respiratory",
      image: templeImg,
      items: ["Asthma", "Chronic Cold", "Sinusitis", "Tonsillitis", "Cough"],
    },
    {
      title: "Child Health & Immunity",
      slug: "child",
      image: childImg,
      items: ["Children's Diseases", "Suvarnaprashan", "Intellectual Development", "Immunity"],
    },
    {
      title: "General Wellness & Preventive Care",
      slug: "preventive-care",
      image: homeAboutImg,
      items: ["Heart Diseases", "Abscess Management", "Diet Consultation", "Preventive Check-ups"],
    },
  ];

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

      <div className="grid gap-y-6 gap-x-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.05}>
            <div
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] hover-lift"
            >
              {/* Top half — image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/70 via-[var(--forest-deep)]/10 to-transparent" />
              </div>

              {/* Bottom half — text */}
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="font-display text-lg md:text-xl mb-1 text-[var(--forest-deep)] transition-colors group-hover:text-[var(--copper)]">
                  {cat.title}
                </h3>
                <ul className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 mt-3 mb-4">
                  {cat.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] transition-colors group-hover:text-[var(--forest-deep)] min-w-0">
                      <span className="text-[var(--gold)] text-[10px] shrink-0">✦</span>
                      <span className="truncate" title={item}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[var(--border)]/60 mt-auto pt-3 flex items-center justify-between gap-2">
                  <BookAppointmentDialog
                    trigger={
                      <button className="text-[11px] font-semibold text-[var(--parchment)] bg-[var(--forest-deep)] hover:opacity-95 transition-opacity py-1 px-3.5 rounded-lg border border-transparent">
                        Book appointment
                      </button>
                    }
                  />
                  <Link
                    to="/treatments/$slug"
                    params={{ slug: cat.slug }}
                    className="text-[11px] font-semibold text-[var(--forest-deep)] hover:text-[var(--copper)] transition-colors inline-flex items-center gap-1 py-1 px-1.5 hover:bg-[var(--cream)] rounded-lg border border-transparent"
                  >
                    Learn more
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
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
            <img src={doctorImg} alt="Dr. Ganesh Kumar Patil, Ayurvedic physician" width={1024} height={1280} loading="lazy" className="rounded-3xl shadow-elegant" />
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
            Dr. Ganesh Kumar Patil, <span className="italic text-[var(--gold)]">B.A.M.S.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--parchment)]/80">
            30+ years of clinical practice. Expert in Nadipariksha, classical Panchakarma and personalised herbal care — restoring health by treating the root cause, not just the symptoms.
          </p>
          <p className="mt-4 text-sm text-[var(--parchment)]/70">
            Every consultation begins with Nadipariksha. Promo sessions every month on the {SITE.nadiparikshaDates}.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[{ n: 30, s: "+", l: "Years practising" }, { n: 12000, s: "+", l: "Patients treated" }, { n: 15, s: "", l: "Awards & fellowships" }].map((s) => (
              <div key={s.l}>
                <div className="font-display text-4xl md:text-5xl text-[var(--gold)]">
                  <CountUp end={s.n} duration={2.5} enableScrollSpy scrollSpyOnce separator="," />{s.s}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-[var(--parchment)]/60">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <BookAppointmentDialog
              trigger={
                <Button className="rounded-full bg-gold-gradient text-[var(--forest-deep)] h-12 px-6 cursor-pointer">
                  Book consultation
                </Button>
              }
            />
            <Button asChild variant="outline" className="rounded-full border-white/25 bg-white/5 text-[var(--parchment)] hover:bg-white/10 h-12 px-6">
              <Link to="/about">About the clinic</Link>
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


/* -------------------- TESTIMONIALS -------------------- */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const images = [doctorImg, therapyImg, treatmentsImg, homeAboutImg, templeImg];
  const items = TESTIMONIALS.map((t, i) => ({
    ...t,
    image: images[i % images.length],
  }));

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

            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.2] max-w-2xl mx-auto drop-shadow-lg text-[var(--parchment)]">
              <span className="block">Your body already knows how to heal.</span>
              <em className="text-shimmer not-italic">Let it.</em>
            </h2>

            <Ornament className="my-6 opacity-70" />

            <p className="mx-auto max-w-xl text-base md:text-lg text-[var(--parchment)]/90 leading-relaxed font-light">
              Book a first consultation with Dr. Ganesh Kumar Patil. <br className="hidden md:block" />
              In-clinic in Pune — kindly call first to check availability.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <BookAppointmentDialog
                trigger={
                  <Button className="rounded-full bg-gold-gradient text-[var(--forest-deep)] h-12 px-8 shadow-gold font-semibold transition-transform hover:scale-105 cursor-pointer">
                    Book Your Consultation <ArrowRight className="ml-2 size-4" />
                  </Button>
                }
              />
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
