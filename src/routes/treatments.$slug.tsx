import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, ArrowRight, Calendar, Compass, BookOpen, Flame, ShieldAlert, Sparkles, Heart, Activity, Leaf, Moon, Flower2, Baby, Shield, Zap, Stethoscope, Salad, PersonStanding, ClipboardList, User, Users, Droplets, Scale, TrendingUp, Wind, HeartPulse, Pill, Waves, Brain } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import { TREATMENTS } from "@/lib/treatments";
import therapyImg from "@/assets/therapy.jpg";
import panchkarmaHeroImg from "@/assets/panchkarma-hero.png";
import treatmentsImg from "@/assets/treatments.jpg";
import templeImg from "@/assets/temple.jpg";
import doctorImg from "@/assets/doctor.jpg";
import whyChooseUsImg from "@/assets/panchkarma/why-choose-us.png";
import nasyaImg from "@/assets/panchkarma/nasya.png";
import raktmokshanImg from "@/assets/panchkarma/raktmokshan.png";
import virechanaImg from "@/assets/panchkarma/virechana.png";
import bastiImg from "@/assets/panchkarma/basti.png";
import vamanaImg from "@/assets/panchkarma/vamana.png";
import greenEarthImg from "@/assets/green-earth.png";
import skinHairImg from "@/assets/treatments/skin-hair.png";
import childImg from "@/assets/treatments/child.png";
import digestiveImg from "@/assets/treatments/digestive.png";
import aboutHeroImg from "@/assets/about-hero.png";
import homeAboutImg from "@/assets/home-about.png";


export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = TREATMENTS.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Treatment"} — Devdut Ayurved` },
      { name: "description", content: loaderData?.short ?? "" },
      { property: "og:title", content: `${loaderData?.name} — Devdut Ayurved` },
      { property: "og:url", content: `/treatments/${loaderData?.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/treatments/${loaderData?.slug}` }],
  }),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-page py-40 text-center">
        <h1 className="font-display text-5xl mb-4">Treatment not found</h1>
        <Link to="/treatments" className="text-[var(--copper)] underline">Back to all treatments</Link>
      </div>
    </PageShell>
  ),
  component: TreatmentDetail,
});

function TreatmentDetail() {
  const t = Route.useLoaderData();
  const related = TREATMENTS.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);

  if (t.slug === "panchakarma") {
    return (
      <PageShell>
        <PanchakarmaSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "skin") {
    return (
      <PageShell>
        <SkinSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "child") {
    return (
      <PageShell>
        <ChildSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "womens-health") {
    return (
      <PageShell>
        <WomensMensHealthSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "lifestyle-chronic") {
    return (
      <PageShell>
        <LifestyleChronicSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "joint-pain") {
    return (
      <PageShell>
        <BoneJointNeurologicalSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "preventive-care") {
    return (
      <PageShell>
        <PreventiveCareSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "digestion") {
    return (
      <PageShell>
        <DigestiveSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Full-bleed image hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img
          src={therapyImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/80 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" /> All treatments
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[65vh] flex-col items-center justify-center pt-32 pb-16 text-center text-[var(--parchment)]">
          <Reveal>
            {t.sanskrit && (
              <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
                {t.sanskrit}
              </div>
            )}
            <div className="eyebrow mb-4 text-[var(--parchment)]/70">{t.category}</div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto">
              {t.name}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed">
              {t.short}
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[var(--parchment)]/70 font-medium">
              <Clock className="size-4 text-[var(--gold)]" /> {t.duration}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <Button className="rounded-full bg-gold-gradient text-[var(--forest-deep)] hover:opacity-90 shadow-gold h-12 px-8 cursor-pointer">
                    Book this treatment
                  </Button>
                }
              />
              <Button asChild variant="outline" className="rounded-full h-12 px-8 border-[var(--parchment)]/30 bg-white/5 text-[var(--parchment)] hover:bg-white/10">
                <Link to="/contact">Ask a question</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24 grid gap-16 lg:grid-cols-2">
        <Reveal>
          <div className="eyebrow mb-3">Benefits</div>
          <h2 className="font-display text-4xl mb-8">What patients notice.</h2>
          <ul className="space-y-4">
            {t.benefits.map((b: string) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-[var(--gold)] mt-0.5 shrink-0" />
                <span className="text-lg">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="eyebrow mb-3">The approach</div>
          <h2 className="font-display text-4xl mb-8">How we treat.</h2>
          <ol className="space-y-6">
            {t.approach.map((step: string, i: number) => (
              <li key={i} className="flex gap-5">
                <span className="shrink-0 grid size-10 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1.5 text-[var(--muted-foreground)]">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-8 hover-lift">
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Learn more <ArrowRight className="size-4" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}

function PanchakarmaSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeStage, setActiveStage] = useState(0);
  const [activeKarma, setActiveKarma] = useState(0);

  const karmaImages = [
    vamanaImg,         // Vamana
    virechanaImg,      // Virechana
    bastiImg,          // Basti
    nasyaImg,          // Nasya
    raktmokshanImg     // Raktamokshana
  ];

  const stages = [
    {
      title: "Poorva Karma",
      subtitle: "The Preparation",
      sanskrit: "पूर्व कर्म",
      desc: "Before cleansing can begin, stagnant toxins (Ama) must be loosened from deep tissues and guided to the main digestive channels.",
      steps: [
        { name: "Snehana (Oleation)", detail: "Drinking customized medicated ghee daily in increasing doses to bind and liquefy fat-soluble cellular waste." },
        { name: "External Snehana (Massage)", detail: "Abhyanga with medicated herbal oils matching your Prakriti to move toxins towards the skin and gut." },
        { name: "Swedana (Sudation/Steam)", detail: "Herbal steam chamber therapy to dilate body channels (Srotas), letting liquefied toxins flow to the gastrointestinal tract." }
      ]
    },
    {
      title: "Pradhana Karma",
      subtitle: "The Cleansing",
      sanskrit: "प्रधान कर्म",
      desc: "The core purification process where the accumulated doshas are carefully eliminated from the body using the 5 classical methods.",
      steps: [
        { name: "Vamana & Virechana", detail: "Congested Kapha is eliminated from the upper digestive tract; Pitta and liver toxins are purged through the lower tract." },
        { name: "Basti & Nasya", detail: "Vata is balanced using medicated oil/decoction enemas; sinuses and head toxins are cleared through nasal drops." },
        { name: "Raktamokshana", detail: "Deep blood-borne toxins are eliminated using specialized classical bloodletting techniques (Leech/Siravyadha)." }
      ]
    },
    {
      title: "Paschat Karma",
      subtitle: "The Restoration",
      sanskrit: "पश्चात् कर्म",
      desc: "The recovery phase to rekindle digestive fire (Agni), restore strength, and sustain the results of the deep purification.",
      steps: [
        { name: "Samsarjana Krama (Diet Scale)", detail: "Gradually re-introducing foods starting from thin rice water (Manda), progressing to light lentils, and then solid food." },
        { name: "Rasayana (Rejuvenation)", detail: "Administering potent herbal elixirs like Chyawanprash, Ashwagandha, and Shatavari to regenerate newly cleansed tissues." },
        { name: "Vihara (Lifestyle Adaptations)", detail: "Prescribing daily routines (Dinacharya) and specialized yoga practices to preserve dosha harmony long-term." }
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 7000);
    return () => clearTimeout(timer);
  }, [activeStage]);

  const karmas = [
    {
      name: "Vamana",
      sanskrit: "वमन",
      translation: "Therapeutic Emesis",
      dosha: "Kapha Dosha (Congestion, Mucus)",
      description: "Eliminates excess Kapha and Ama from the stomach and upper respiratory tract. Highly effective for chronic chest congestion and metabolic blockages.",
      indications: ["Chronic Asthma", "Psoriasis", "Chronic Acidity", "Hypothyroidism"],
      herbs: "Madanaphala (Emetic nut), Licorice decoction, Rock salt, Honey"
    },
    {
      name: "Virechana",
      sanskrit: "विरेचन",
      translation: "Therapeutic Purgation",
      dosha: "Pitta Dosha (Heat, Inflammation)",
      description: "Cleanses excess Pitta, heat, and bile from the small intestine, liver, and blood channels. Resets systemic digestion.",
      indications: ["Eczema & Dermatitis", "Acid Reflux / Gout", "Liver Disorders", "Chronic Allergies"],
      herbs: "Trivrit (Operculina), Medicated castor oil, Senna, Haritaki"
    },
    {
      name: "Basti",
      sanskrit: "बस्ति",
      translation: "Medicated Enemas",
      dosha: "Vata Dosha (Pain, Degeneration)",
      description: "Considered the 'Half of all Treatments' in Ayurveda. Cleanses the colon (the primary seat of Vata), lubricating nerves, joints, and balancing the nervous system.",
      indications: ["Arthritis & Spine Pain", "Sciatica & Paralysis", "Chronic Constipation", "Neurological Pain"],
      herbs: "Dashamoola (Ten roots), Eranda oil, Guggulu, Medicated milk"
    },
    {
      name: "Nasya",
      sanskrit: "नस्य",
      translation: "Nasal Administration",
      dosha: "Head & Neck Prana (Sinuses, Mind)",
      description: "Administers medicated drops through the nostrils to clear accumulated toxins above the collarbone. Stimulates neurological and mental clarity.",
      indications: ["Chronic Migraine", "Sinusitis", "Premature Hair Loss", "Cervical Spondylosis"],
      herbs: "Anu tailam, Shadbindu tailam, Brahmi ghee"
    },
    {
      name: "Raktamokshana",
      sanskrit: "रक्तमोक्षण",
      translation: "Bloodletting / Leech Therapy",
      dosha: "Rakta Dhatu (Blood purification)",
      description: "Eliminates highly concentrated, deep blood-borne toxins. Leeches (Jalauka) gently draw out localized stagnant blood while releasing healing enzymes.",
      indications: ["Severe Psoriasis / Eczema", "Varicose Veins / Ulcers", "Alopecia Areata", "Local Swelling & Gout"],
      herbs: "Non-venomous medicinal leeches (Jalauka), Neem water"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveKarma((prev) => (prev + 1) % karmas.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeKarma]);

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--ink)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={panchkarmaHeroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/80 hover:text-[var(--gold)] transition-colors" aria-label="Back to all treatments">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[70vh] flex-col justify-center pt-32 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <div className="eyebrow mb-4 text-[var(--parchment)]/70">Signature Detoxification</div>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-5xl md:text-6xl text-[var(--gold)] mb-2">Panchakarma</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)]">The Sacred Path of Purification</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Beyond relaxation — Panchakarma is a complete Ayurvedic detox.<br />
              It eliminates toxins, revitalizes metabolism, and restores natural balance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Therapy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Therapy</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                What Is Panchakarma?
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Panchakarma is Ayurveda's classical detoxification and rejuvenation therapy. Derived from the Sanskrit words <strong className="text-[var(--forest-deep)]">"Pancha" (five)</strong> and <strong className="text-[var(--forest-deep)]">"Karma" (therapeutic actions)</strong>, it consists of five specialized cleansing procedures that eliminate toxins, restore dosha balance, and promote overall wellness.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Unlike a regular spa treatment, Panchakarma is a personalized medical therapy performed in three stages—preparation, detoxification, and rejuvenation—under expert Ayurvedic supervision to support long-term health and vitality.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative">
              {/* Subtle vintage border frame */}
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={therapyImg}
                alt="Ayurvedic therapy massage representing Panchakarma"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why Choose Panchakarma Section (Full-bleed Split Banner) */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Column: Full-bleed Image with subtle logo overlay */}
          <div className="relative min-h-[400px] lg:min-h-full w-full">
            <img
              src={whyChooseUsImg}
              alt="Ayurvedic Wellness Rejuvenation"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark/green tint overlay to blend beautifully */}
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>

          {/* Right Column: Dark Green Text Block */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 lg:py-24 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">
                The Sacred Healing
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Panchakarma?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Panchakarma is Ayurveda's most comprehensive purification therapy designed to remove toxins, restore digestive strength, and balance the body's natural energies. By addressing the root cause of imbalances rather than just relieving symptoms, it supports long-term health, increased vitality, and disease prevention.
              </p>
              <div>
                <BookAppointmentDialog
                  trigger={
                    <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-[var(--gold)]/20 cursor-pointer">
                      Book My Consultation
                    </button>
                  }
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <Reveal>
          <div className="container-page text-center max-w-4xl mx-auto">
            <div className="eyebrow mb-2">The Methodology</div>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] mb-6">Our Treatment Approach</h2>
            <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-3xl mx-auto mb-12">
              Every Panchakarma program begins with a detailed Ayurvedic consultation. Based on your Prakriti (body constitution), health history, and current imbalance, our experts create a personalized treatment plan combining detox therapies, herbal medicines, therapeutic massages, dietary guidance, and lifestyle recommendations.
            </p>

            {/* Visual pillars layout */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
              {[
                { title: "Personalized Consult", desc: "Pulse reading (Nadi Pariksha) to map Prakriti & imbalances.", icon: Compass },
                { title: "Detox Therapies", desc: "Five purification actions (Panchakarma) matching your doshas.", icon: Sparkles },
                { title: "Herbal Medicines", desc: "Customized remedies to rekindle Agni and digest Ama.", icon: BookOpen },
                { title: "Vedic Diet & Yoga", desc: "Diet scaling and daily routines to sustain cleansing outcomes.", icon: Heart }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-[var(--parchment)] p-6 rounded-2xl border border-[var(--border)]/70 text-center flex flex-col items-center">
                  <div className="size-12 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mb-4">
                    <pillar.icon className="size-6" />
                  </div>
                  <h4 className="font-display text-base text-[var(--forest-deep)] mb-2">{pillar.title}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive Stages Section */}
      <section className="container-page pt-20 pb-12">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="eyebrow mb-2">The Journey</div>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] mb-4">The Three Stages of Detox</h2>
            <p className="text-sm md:text-base text-[var(--muted-foreground)]">
              True detoxification requires a meticulous sequence of events. We prepare the cells, execute the purification, and carefully restore the body's systems.
            </p>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        {/* Tab Buttons */}
        <div className="flex justify-center border-b border-[var(--border)] max-w-3xl mx-auto mb-12">
          {stages.map((stage, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`flex-1 py-4 text-center font-display text-lg md:text-xl transition-all relative ${
                activeStage === idx ? "text-[var(--forest-deep)] font-semibold" : "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]"
              }`}
            >
              <div className="text-[11px] font-sans font-semibold text-[var(--gold)] uppercase tracking-wider mb-0.5">{stage.sanskrit}</div>
              {stage.title}
              {activeStage === idx && (
                <motion.div layoutId="activeStageLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--gold)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className="max-w-4xl mx-auto bg-[#fbf7eb] rounded-3xl p-6 md:p-10 border border-[var(--border)] min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex-1"
            >
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-bold">{stages[activeStage].subtitle}</span>
                <p className="text-sm md:text-base text-[var(--muted-foreground)] mt-2 leading-relaxed max-w-3xl">
                  {stages[activeStage].desc}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {stages[activeStage].steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-[var(--parchment)]/75 rounded-2xl p-5 border border-[var(--border)]/70 hover:border-[var(--gold)]/50 transition-colors">
                    <span className="text-[10px] font-semibold text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full inline-block mb-3">
                      STEP 0{sIdx + 1}
                    </span>
                    <h4 className="font-display text-base md:text-lg text-[var(--forest-deep)] mb-2">{step.name}</h4>
                    <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{step.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* The 5 Cleansing Actions */}
      <section className="pt-12 pb-24">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="eyebrow mb-2">Pradhana Karma</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] mb-4">The Five Purification Actions</h2>
              <p className="text-sm md:text-base text-[var(--muted-foreground)]">
                Based on your dominant dosha imbalances, our senior Vaidyas prescribe one or more of these classical purification techniques.
              </p>
              <Ornament className="mt-3" />
            </div>
          </Reveal>

          {/* Grid Layout of 5 actions */}
          <div className="grid gap-6 lg:grid-cols-[1fr_2.4fr] max-w-5xl mx-auto items-stretch">
            {/* Left selector */}
            <div className="flex flex-col gap-3">
              {karmas.map((karma, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveKarma(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    activeKarma === idx
                      ? "bg-forest-gradient text-[var(--parchment)] border-transparent"
                      : "bg-[var(--parchment)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--gold)]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                      activeKarma === idx ? "text-[var(--gold)]" : "text-[var(--muted-foreground)]"
                    }`}>
                      {karma.translation}
                    </span>
                    <h4 className={`font-display text-lg md:text-xl mt-0.5 ${
                      activeKarma === idx ? "text-[var(--parchment)]" : "text-[var(--forest-deep)]"
                    }`}>
                      {karma.name} <span className="font-sanskrit text-base">({karma.sanskrit})</span>
                    </h4>
                  </div>
                  <ArrowRight className={`size-4 transition-transform ${activeKarma === idx ? "translate-x-1 text-[var(--gold)]" : "text-[var(--muted-foreground)] group-hover:translate-x-1"}`} />
                </button>
              ))}
            </div>

            {/* Right details board */}
            <div className="bg-[var(--forest-deep)] rounded-3xl h-full min-h-[420px] flex flex-col justify-end relative overflow-hidden border border-[var(--border)]/20 text-[var(--parchment)]">
              {/* Background image related to the treatment */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeKarma}
                  src={karmaImages[activeKarma]}
                  alt=""
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-x-0 top-0 h-[75%] w-full object-cover"
                />
              </AnimatePresence>

              {/* Dark/Warm overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--forest-deep)]/40 to-[var(--forest-deep)] pointer-events-none" />

              {/* Text content overlay */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end gap-4 mt-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeKarma}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-end flex-1"
                  >
                    <div className="mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 inline-block mb-2">
                        Targeting: {karmas[activeKarma].dosha}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl text-[var(--gold)] mb-1.5">
                        {karmas[activeKarma].name} — <span className="italic text-[var(--parchment)]/90 text-sm md:text-base font-normal">{karmas[activeKarma].translation}</span>
                      </h3>
                      <p className="text-xs text-[var(--parchment)]/85 leading-relaxed max-w-2xl">
                        {karmas[activeKarma].description}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-[var(--parchment)]/10">
                      <div>
                        <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-1.5">Key Indications</h4>
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                          {karmas[activeKarma].indications.map((ind, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--parchment)]/75">
                              <span className="text-[var(--gold)] text-[8px]">✦</span> {ind}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-1.5">Principal Herbs Used</h4>
                        <p className="text-[11px] leading-relaxed text-[var(--parchment)]/80">
                          {karmas[activeKarma].herbs}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          {/* Subtle background glow */}
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to experience classical Ayurvedic detoxification?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every body constitution is unique, and so should be your cleansing program. Our expert Vaidyas will guide you with pulse reading (Nadi Pariksha) to customize a deep purification regime tailored exactly to your imbalances.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Restore balance. Renew vitality. Reclaim health.
            </p>

            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer Related Section */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-8 hover-lift">
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Learn more <ArrowRight className="size-4" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SkinSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState<"skin" | "hair" | "cosmetic">("skin");

  const hairConditions = [
    { name: "Hair Fall", desc: "Reduce excessive hair loss by strengthening hair follicles and improving scalp health through Ayurvedic therapies." },
    { name: "Premature Greying", desc: "Support healthy hair pigmentation with nourishing herbal formulations and lifestyle guidance." },
    { name: "Dandruff & Itchy Scalp", desc: "Treat scalp dryness, itching, and fungal conditions naturally while maintaining a healthy scalp environment." },
    { name: "Weak & Damaged Hair", desc: "Revitalize dull, brittle, and damaged hair with Ayurvedic rejuvenation therapies." }
  ];

  const skinConditions = [
    { name: "Acne & Pimples", desc: "Treat active acne, recurring breakouts, and acne scars by addressing internal toxins and hormonal imbalance." },
    { name: "Skin Diseases", desc: "Natural Ayurvedic management for various skin conditions affecting overall skin health." },
    { name: "Eczema", desc: "Reduce itching, inflammation, dryness, and recurring flare-ups with holistic Ayurvedic care." },
    { name: "Psoriasis", desc: "Support healthy skin by managing chronic psoriasis through personalized Ayurvedic treatment plans." },
    { name: "Fungal Skin Infections", desc: "Treat common fungal infections naturally while improving the body's immunity." },
    { name: "Allergic Skin Conditions", desc: "Manage skin allergies, itching, redness, and irritation with safe herbal therapies." },
    { name: "Pigmentation & Uneven Skin Tone", desc: "Improve skin texture and complexion using traditional Ayurvedic detoxification and herbal care." },
    { name: "Cracked Heels", desc: "Heal painful cracked heels and dry, fissured foot skin with local therapies and internal nourishment." },
    { name: "Warts & Corns", desc: "Natural Ayurvedic management of warts and corns with appropriate therapeutic procedures." },
    { name: "Herpes Zoster", desc: "Support recovery and reduce discomfort through Ayurvedic medicines and immune-supportive care." }
  ];

  const cosmeticConditions = [
    { name: "Skin Rejuvenation", desc: "Enhance natural skin glow, hydration, and elasticity with Ayurvedic rejuvenation therapies." },
    { name: "Anti-Ageing Care", desc: "Improve skin vitality and reduce visible signs of ageing through Rasayana (rejuvenation) therapies." },
    { name: "Ayurvedic Beauty Consultation", desc: "Receive personalized recommendations for skincare, nutrition, herbal remedies, and daily routines suited to your skin type." }
  ];

  const approachItems = [
    { title: "Personalized Ayurvedic Consultation", desc: "In-depth constitution (Prakriti) assessment, dosha diagnostic, and health history analysis.", icon: Compass },
    { title: "Herbal Medicines", desc: "Tailored internal formulations to cleanse toxins, balance blood, and boost immunity.", icon: BookOpen },
    { title: "Panchakarma Detox Therapies", desc: "Deep cleansing actions like Virechana and Raktamokshana when required.", icon: Leaf },
    { title: "Diet & Nutrition Planning", desc: "Custom nutritional plans aligned with your body constitution and digestive strength.", icon: Heart },
    { title: "Lifestyle & Daily Routine Guidance", desc: "Daily habits (Dinacharya) and sleep adjustments to support systemic healing.", icon: Activity },
    { title: "Ayurvedic External Therapies", desc: "Targeted external remedies including Lepas (herbal pastes), oiling, and herbal washes.", icon: Sparkles },
    { title: "Stress Management & Wellness Support", desc: "Yoga, breathing practices, and stress reduction to prevent hormonal triggers.", icon: ShieldAlert },
    { title: "Regular Follow-up Care", desc: "Continuous progress monitoring and adjustments to ensure stable long-term results.", icon: CheckCircle2 }
  ];

  return (
    <div className="bg-[var(--parchment)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={skinHairImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/80 hover:text-[var(--gold)] transition-colors" aria-label="Back to all treatments">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-32 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <div className="eyebrow mb-4 text-[var(--parchment)]/70">Skin, Hair & Cosmetic Care</div>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2">Restore Your Natural Beauty</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">with Authentic Ayurveda</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Treating chronic skin disorders and hair concerns from the root. Personalized therapies designed to resolve internal imbalances for radiant, lasting health.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Ayurvedic Beauty Philosophy</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Beauty Starts from Within
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Healthy skin and strong, beautiful hair are reflections of a balanced body and healthy lifestyle. At Devdut Ayurved Clinic, we believe that most skin and hair concerns originate from internal imbalances rather than external factors alone. Our Ayurvedic treatments focus on identifying the root cause and restoring harmony through personalized herbal medicines, Panchakarma therapies, diet, and lifestyle modifications.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Every treatment plan is customized according to your Prakriti (body constitution), health condition, and lifestyle, ensuring safe, natural, and long-lasting results without harmful side effects.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border)]/30">
              <img
                src={skinHairImg}
                alt="Ayurvedic Skin and Hair wellness therapies"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/25 to-transparent pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Treat Section */}
      <section className="container-page pt-16 pb-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Therapeutic Scope</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Conditions We Treat</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        {/* Custom Tab Selectors */}
        <div className="flex justify-center gap-2 mb-10 max-w-lg mx-auto border border-[var(--border)] rounded-full p-1 bg-[var(--parchment)]/30">
          {(["skin", "hair", "cosmetic"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] shadow-md"
                  : "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]"
              }`}
            >
              {tab === "skin" ? "Skin Care" : tab === "hair" ? "Hair Care" : "Cosmetic & Wellness"}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "skin" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {skinConditions.map((cond, i) => (
                    <div key={i} className="bg-[var(--parchment)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-sm">
                      <h3 className="font-display text-xl text-[var(--forest-deep)] mb-2.5">{cond.name}</h3>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{cond.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "hair" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                  {hairConditions.map((cond, i) => (
                    <div key={i} className="bg-[var(--parchment)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-sm">
                      <h3 className="font-display text-xl text-[var(--forest-deep)] mb-2.5">{cond.name}</h3>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{cond.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "cosmetic" && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {cosmeticConditions.map((cond, i) => (
                    <div key={i} className="bg-[var(--parchment)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 hover:border-[var(--gold)]/50 hover:shadow-sm">
                      <h3 className="font-display text-xl text-[var(--forest-deep)] mb-2.5">{cond.name}</h3>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{cond.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)]/30 py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="eyebrow text-[var(--gold)] mb-2">Our Methodology</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                At Devdut Ayurved Clinic, every patient undergoes a comprehensive Ayurvedic consultation to understand their body constitution (Prakriti), Dosha imbalance, lifestyle, diet, and medical history. Based on this assessment, a customized treatment plan may include:
              </p>
              <Ornament className="mt-3" />
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {approachItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-[var(--parchment)] p-6 rounded-2xl border border-[var(--border)] h-full flex flex-col items-start hover-lift">
                  <span className="grid size-10 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)] mb-4">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container-page py-20">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Heading */}
            <div className="text-left space-y-4">
              <div className="eyebrow text-[var(--gold)]">Why Devdut</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Why Choose <br />Devdut Ayurved Clinic?
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md">
                We combine the clinical precision of classical Ayurvedic lineages with natural, root-cause healing to deliver long-term beauty and health.
              </p>
            </div>

            {/* Right Column: Check list */}
            <div className="bg-[#fbf7eb]/50 rounded-3xl border border-[var(--border)]/40 p-8 md:p-10">
              <ul className="space-y-4">
                {[
                  "Personalized Ayurvedic treatment plans",
                  "Root-cause based healing approach",
                  "Safe and natural herbal medicines",
                  "Authentic Panchakarma therapies",
                  "Holistic skin and hair wellness",
                  "Experienced Ayurvedic care",
                  "Long-term health and beauty solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5 text-sm md:text-base text-[var(--forest-deep)] font-medium">
                    <CheckCircle2 className="size-5 text-[var(--gold)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive CTA */}
      <section className="container-page pb-20">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          {/* Subtle background glow */}
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Book Your Consultation
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-4 leading-relaxed">
              Whether you're experiencing persistent hair fall, acne, chronic skin disorders, pigmentation, dandruff, or other cosmetic concerns, Devdut Clinic offers comprehensive Ayurvedic care designed to restore your natural beauty and confidence through safe, holistic, and personalized treatment.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Restore balance. Renew vitality. Reclaim health.
            </p>

            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer Related Section */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ChildSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState<"diseases" | "suvarnaprashan" | "intellectual" | "immunity">("diseases");

  const commonDiseases = [
    "Frequent Cough & Cold", "Fever", "Digestive Disorders", "Loss of Appetite",
    "Constipation", "Recurrent Infections", "Allergies", "Respiratory Problems",
    "General Weakness", "Poor Weight Gain"
  ];

  const suvarnaprashanBenefits = [
    "Boosts Natural Immunity", "Improves Memory & Concentration", "Supports Brain Development",
    "Enhances Digestion", "Promotes Healthy Growth", "Increases Resistance to Seasonal Illnesses",
    "Improves Overall Well-being"
  ];

  const intellectualSkills = [
    "Memory", "Concentration", "Learning Ability", "Focus",
    "Mental Alertness", "Emotional Well-being", "Overall Brain Development"
  ];

  const immunityMethods = [
    "Ayurvedic Herbal Medicines", "Personalized Diet Guidance", "Lifestyle Recommendations",
    "Seasonal Immunity Care", "Natural Nutritional Support", "Preventive Wellness Programs"
  ];

  const approachItems = [
    { title: "Personalized Ayurvedic Consultation", desc: "In-depth constitution (Prakriti) assessment, growth analysis, and detailed history.", icon: Compass },
    { title: "Herbal Medicines", desc: "Gentle child-friendly formulas designed to nourish tissues and restore balance.", icon: BookOpen },
    { title: "Suvarnaprashan Therapy", desc: "Traditional gold-infused drops to boost long-term cognitive and immune strength.", icon: Sparkles },
    { title: "Diet & Nutrition Counseling", desc: "Healthy eating guidelines tailored to childhood growth needs and digestion.", icon: Heart },
    { title: "Lifestyle & Daily Routine Guidance", desc: "Dinacharya habits, sleep, and physical activity guidelines for active growth.", icon: Activity },
    { title: "Immunity Enhancement Programs", desc: "Focused seasonal and preventive regimes to naturally resist illness.", icon: ShieldAlert },
    { title: "Regular Growth & Health Monitoring", desc: "Continuous tracking of developmental milestones and physical health changes.", icon: CheckCircle2 }
  ];

  return (
    <div className="bg-[var(--parchment)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={childImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/80 hover:text-[var(--gold)] transition-colors" aria-label="Back to all treatments">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-32 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <div className="eyebrow mb-4 text-[var(--parchment)]/70">Child Health & Immunity</div>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2">Nurturing Healthy Growth</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">with the Wisdom of Ayurveda</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Safe, gentle, and chemical-free care to strengthen your child's natural defense systems while supporting complete physical and mental development.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Text Content */}
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Pediatric Care (Kaumarbhritya)</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                A Strong Foundation
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                A child's health lays the foundation for a healthy future. At Devdut Ayurved Clinic, we provide safe, gentle, and personalized Ayurvedic care to support your child's physical growth, mental development, immunity, and overall well-being. Our treatments are designed to strengthen the body's natural defense system while promoting healthy development without relying on harsh medications.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Every child receives an individualized treatment plan based on their age, body constitution (Prakriti), health condition, and nutritional needs, ensuring holistic and long-lasting wellness.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border)]/30">
              <img
                src={childImg}
                alt="Happy healthy child representing Ayurvedic pediatric wellness"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/25 to-transparent pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Services Tabs Section */}
      <section className="container-page pt-16 pb-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Pediatric Services</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Our Child Health Services</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto border border-[var(--border)] rounded-2xl md:rounded-full p-1 bg-[var(--parchment)]/30">
          {(["diseases", "suvarnaprashan", "intellectual", "immunity"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-2 px-4 rounded-xl md:rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] shadow-md"
                  : "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]"
              }`}
            >
              {tab === "diseases" ? "Children's Diseases" : tab === "suvarnaprashan" ? "Suvarnaprashan" : tab === "intellectual" ? "Intellectual Care" : "Immunity Enhancement"}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#fbf7eb]/40 border border-[var(--border)]/40 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto"
            >
              {activeTab === "diseases" && (
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="font-display text-2xl text-[var(--forest-deep)]">Children's Diseases</h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Comprehensive Ayurvedic management for common childhood health concerns. Our approach focuses on improving immunity and addressing the root cause of recurring illnesses to prevent chronic relapses.
                    </p>
                  </div>
                  <div className="md:col-span-7 border-l border-[var(--border)]/40 pl-0 md:pl-8">
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {commonDiseases.map((d, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-[var(--forest-deep)]">
                          <span className="text-[var(--gold)] font-bold">✦</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "suvarnaprashan" && (
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="font-display text-2xl text-[var(--forest-deep)]">Suvarnaprashan</h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Suvarnaprashan is a traditional Ayurvedic immunization practice that helps strengthen a child's natural immunity and supports healthy physical and mental development. Specially prepared drops containing gold, honey, ghee, and intellect-promoting herbs are administered.
                    </p>
                  </div>
                  <div className="md:col-span-7 border-l border-[var(--border)]/40 pl-0 md:pl-8">
                    <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[var(--gold)] mb-3">Key Benefits</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {suvarnaprashanBenefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-[var(--forest-deep)]">
                          <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "intellectual" && (
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="font-display text-2xl text-[var(--forest-deep)]">Intellectual Development</h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Ayurvedic Medhya therapies and traditional herbal formulations help support a child's cognitive growth. Ideal for boosting brain longevity, retention capacity, and emotional balance naturally.
                    </p>
                  </div>
                  <div className="md:col-span-7 border-l border-[var(--border)]/40 pl-0 md:pl-8">
                    <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[var(--gold)] mb-3">Supporting Growth In</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {intellectualSkills.map((sk, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-[var(--forest-deep)]">
                          <span className="text-[var(--gold)] font-bold">✦</span> {sk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "immunity" && (
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-5 space-y-4">
                    <h3 className="font-display text-2xl text-[var(--forest-deep)]">Immunity Enhancement</h3>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                      Our immunity-boosting programs are designed to strengthen the body's natural defense system through personalized Ayurvedic care. Highly recommended for children vulnerable to seasonal changes and frequent school-borne flus.
                    </p>
                  </div>
                  <div className="md:col-span-7 border-l border-[var(--border)]/40 pl-0 md:pl-8">
                    <h4 className="text-[10px] font-sans font-bold uppercase tracking-wider text-[var(--gold)] mb-3">Our Program Includes</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {immunityMethods.map((m, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs text-[var(--forest-deep)]">
                          <CheckCircle2 className="size-4 text-[var(--gold)] shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)]/30 py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="eyebrow text-[var(--gold)] mb-2">Our Methodology</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                Every child receives a detailed Ayurvedic consultation to understand their health, growth patterns, lifestyle, diet, and body constitution. Based on this assessment, our treatment plan may include:
              </p>
              <Ornament className="mt-3" />
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {approachItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-[var(--parchment)] p-6 rounded-2xl border border-[var(--border)] h-full flex flex-col items-start hover-lift">
                  <span className="grid size-10 place-items-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)] mb-4">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container-page py-20">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Left Column: Heading */}
            <div className="text-left space-y-4">
              <div className="eyebrow text-[var(--gold)]">Why Devdut</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Why Choose <br />Devdut Ayurved Clinic?
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-md">
                We provide holistic physical & mental development support designed for your child's delicate system, focusing on root-cause healing.
              </p>
            </div>

            {/* Right Column: Check list */}
            <div className="bg-[#fbf7eb]/50 rounded-3xl border border-[var(--border)]/40 p-8 md:p-10">
              <ul className="space-y-4">
                {[
                  "Gentle & Safe Ayurvedic Care for Children",
                  "Personalized Treatment Plans",
                  "Focus on Root Cause Healing",
                  "Natural Immunity Enhancement",
                  "Holistic Physical & Mental Development",
                  "Authentic Ayurvedic Therapies",
                  "Compassionate and Child-Friendly Care"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5 text-sm md:text-base text-[var(--forest-deep)] font-medium">
                    <CheckCircle2 className="size-5 text-[var(--gold)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interactive CTA */}
      <section className="container-page pb-20">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          {/* Subtle background glow */}
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Give Your Child the Gift of Natural Health
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-4 leading-relaxed">
              At Devdut Clinic, we are committed to helping children grow healthier, stronger, and happier through authentic Ayurvedic care. Whether your child needs support for immunity, growth, learning, or recurring health concerns, our personalized treatments are designed to nurture lifelong wellness naturally.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>

            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer Related Section */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function WomensMensHealthSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeGender, setActiveGender] = useState<"women" | "men">("women");
  const [activeWomenTab, setActiveWomenTab] = useState(0);
  const [activeMenTab, setActiveMenTab] = useState(0);

  type Section = {
    tab: string;
    Icon: React.ComponentType<{ className?: string }>;
    heading: string;
    intro: string;
    conditions: { name: string; desc: string }[];
  };

  const womenSections: Section[] = [
    {
      tab: "Menstrual Disorders",
      Icon: Moon,
      heading: "Menstrual Disorders",
      intro: "Irregular or painful menstrual cycles often indicate underlying hormonal or dosha imbalances. Our Ayurvedic treatments focus on restoring healthy menstrual function and improving overall reproductive health.",
      conditions: [
        { name: "Irregular Menstrual Cycles", desc: "Restore natural menstrual rhythm through dosha balancing herbs and lifestyle adjustments." },
        { name: "Painful Periods (Dysmenorrhea)", desc: "Relieve cramping and discomfort with anti-spasmodic herbal formulations and Panchakarma." },
        { name: "Heavy or Scanty Flow", desc: "Normalize menstrual flow using classical Ayurvedic blood-regulating formulations." },
        { name: "PMS & Hormonal Imbalance", desc: "Calm mood fluctuations, bloating, and breast tenderness with adaptogenic herbs and diet." },
      ],
    },
    {
      tab: "Infertility Care",
      Icon: Flower2,
      heading: "Infertility Care",
      intro: "Ayurveda offers a holistic approach to improving fertility by enhancing reproductive health, balancing hormones, strengthening the reproductive system, and preparing the body for healthy conception.",
      conditions: [
        { name: "Female Fertility Support", desc: "Comprehensive Ayurvedic assessment and treatment to improve egg quality and reproductive health." },
        { name: "Hormonal Balance", desc: "Target PCOS, thyroid, and estrogen/progesterone imbalances with herbal protocols." },
        { name: "Uterine Health Support", desc: "Strengthen uterine lining and address structural concerns with targeted Panchakarma." },
        { name: "Pre-Conception Wellness", desc: "Detox and nourish the body before conception to maximize chances of a healthy pregnancy." },
      ],
    },
    {
      tab: "Pregnancy Care",
      Icon: Baby,
      heading: "Pregnancy Care",
      intro: "A healthy pregnancy begins with proper nutrition, emotional well-being, and balanced body functions. We provide Ayurvedic guidance throughout pregnancy to support both mother and baby.",
      conditions: [
        { name: "Monthly Pregnancy Care", desc: "Month-wise Ayurvedic guidance aligned with fetal development and maternal dosha changes." },
        { name: "Maternal Nutrition", desc: "Personalized diet consultations ensuring optimal nourishment for both mother and child." },
        { name: "Safe Herbal Support", desc: "Carefully chosen pregnancy-safe herbal formulations to relieve common pregnancy complaints." },
        { name: "Postnatal Recovery", desc: "Rejuvenating Sutika Paricharya (postpartum care) to restore strength and vitality." },
      ],
    },
    {
      tab: "Women's Wellness",
      Icon: Heart,
      heading: "Women's Wellness",
      intro: "Holistic Ayurvedic care for maintaining long-term women's health through personalized preventive programs, including management of white discharge (Leucorrhoea).",
      conditions: [
        { name: "White Discharge (Leucorrhoea)", desc: "Manage abnormal vaginal discharge naturally by improving reproductive health and immunity." },
        { name: "Nightmares & Sleep Disturbance", desc: "Address nightmares and restless sleep linked to hormonal and emotional imbalance." },
        { name: "Stress Management", desc: "Address stress-linked hormonal disruption with Shirodhara, Medhya Rasayana, and lifestyle design." },
        { name: "Preventive Health Care", desc: "Seasonal Panchakarma and Rasayana protocols to maintain lifelong reproductive wellness." },
        { name: "Hormonal Detox", desc: "Clear accumulated toxins affecting hormonal axes through targeted Shodhana therapies." },
      ],
    },
  ];

  const menSections: Section[] = [
    {
      tab: "Sexual Wellness",
      Icon: Zap,
      heading: "Sexual Weakness & Vitality",
      intro: "Our Ayurvedic therapies help improve vitality, stamina, confidence, and overall reproductive health using natural herbal medicines and lifestyle modifications.",
      conditions: [
        { name: "Low Vitality & Energy", desc: "Restore physical strength and stamina with classical Vajikarana (aphrodisiac) Rasayana formulations." },
        { name: "Stress-Related Weakness", desc: "Address performance anxiety and mental fatigue with adaptogenic herbs and Shirodhara." },
        { name: "Nightmares & Disturbed Sleep", desc: "Calm the mind and reduce nightmares linked to stress, sexual weakness and vitality imbalance." },
        { name: "Reproductive Health", desc: "Improve reproductive health and sperm quality with targeted Ayurvedic protocols." },
        { name: "Hormonal Balance", desc: "Regulate testosterone and related hormones naturally through diet, herbs, and lifestyle." },
      ],
    },
    {
      tab: "Men's Wellness",
      Icon: Shield,
      heading: "Men's Reproductive Wellness",
      intro: "Our holistic approach supports natural vitality, hormonal balance, improved general health, better physical performance, and long-term wellness — confidentially and naturally.",
      conditions: [
        { name: "Natural Vitality", desc: "Build sustained energy and physical strength with personalized Rasayana programs." },
        { name: "Better Physical Performance", desc: "Optimize metabolic health and physical performance through Ayurvedic diet and exercise guidance." },
        { name: "Improved General Health", desc: "Address lifestyle-related conditions like obesity, diabetes, and hypertension holistically." },
        { name: "Long-Term Wellness", desc: "Preventive Panchakarma and seasonal Shodhana to maintain optimal health as you age." },
      ],
    },
  ];

  type Pillar = {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  };

  const pillars: Pillar[] = [
    { Icon: Stethoscope, title: "Comprehensive Consultation", desc: "In-depth Nadi Pariksha (pulse reading), Prakriti assessment, medical history, and lifestyle evaluation before any treatment." },
    { Icon: Leaf, title: "Classical Herbal Medicines", desc: "Authentic Ayurvedic formulations — Ashokarishta, Shatavari, Ashwagandha, and more — compounded for your unique constitution." },
    { Icon: Flame, title: "Panchakarma Therapies", desc: "Targeted detox procedures like Uttarbasti, Virechana, and Basti where clinically indicated to address root imbalances." },
    { Icon: Salad, title: "Diet & Nutrition Guidance", desc: "Cycle-phase aware nutrition for women and performance-focused meal plans for men, aligned with Ayurvedic principles." },
    { Icon: PersonStanding, title: "Lifestyle & Stress Management", desc: "Pranayama, Yoga, Dinacharya (daily routine), and Ritucharya (seasonal routine) to sustain hormonal and reproductive health." },
    { Icon: ClipboardList, title: "Regular Follow-up & Monitoring", desc: "Scheduled progress reviews, herb adjustments, and health tracking to ensure safe and effective long-term outcomes." },
  ];

  const whyChoose = [
    "Authentic Ayurvedic Treatments",
    "Personalized Healthcare Plans",
    "Root Cause-Based Healing",
    "Safe & Natural Herbal Medicines",
    "Fertility & Pregnancy Support",
    "Experienced Ayurvedic Consultation",
    "Compassionate & Confidential Care",
    "Holistic Lifestyle & Diet Guidance",
  ];

  const currentSections = activeGender === "women" ? womenSections : menSections;
  const activeTabIndex = activeGender === "women" ? activeWomenTab : activeMenTab;
  const setActiveTab = activeGender === "women" ? setActiveWomenTab : setActiveMenTab;
  const activeSection = currentSections[activeTabIndex];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={aboutHeroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/70 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
              स्त्री-पुरुष स्वास्थ्य
            </div>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              Women's & Men's Health
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Comprehensive Ayurvedic Care for{" "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Lifelong Wellness</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              Good reproductive and hormonal health is essential for overall physical, emotional, and mental well-being.
              Our personalized Ayurvedic care supports women and men through every stage of life — identifying the root
              cause and restoring the body's natural balance.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
              <a href="#conditions" className="border border-[var(--parchment)]/30 hover:border-[var(--gold)] text-[var(--parchment)]/80 hover:text-[var(--gold)] font-medium py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all text-sm">
                View Conditions <ArrowRight className="size-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gender Toggle + Conditions */}
      <section id="conditions" className="container-page py-20">
        <Reveal>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Specialized Care</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Conditions We Treat</h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
              Every treatment is carefully customized according to Prakriti, Dosha imbalance, age, lifestyle, and medical history.
            </p>
          </div>
        </Reveal>

        {/* Gender Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-[var(--cream)] border border-[var(--border)] p-1.5 gap-1">
            {(["women", "men"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGender(g)}
                className={`inline-flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeGender === g
                    ? "bg-[var(--forest-deep)] text-[var(--parchment)] shadow-md"
                    : "text-[var(--muted-foreground)] hover:text-[var(--forest-deep)]"
                }`}
              >
                {g === "women" ? <User className="size-4" /> : <Users className="size-4" />}
                {g === "women" ? "Women's Health" : "Men's Health"}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGender}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sub-tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {currentSections.map((sec, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                    activeTabIndex === i
                      ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                      : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)] hover:text-[var(--forest-deep)]"
                  }`}
                >
                  <sec.Icon className="size-3.5" />
                  {sec.tab}
                </button>
              ))}
            </div>

            {/* Active Section */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeGender}-${activeTabIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Left: Intro & Conditions */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="size-10 rounded-xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                      <activeSection.Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-2xl text-[var(--forest-deep)]">{activeSection.heading}</h3>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{activeSection.intro}</p>
                  <div className="grid gap-3">
                    {activeSection.conditions.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--parchment)] hover:border-[var(--forest-deep)]/30 hover:shadow-md transition-all duration-300 hover-lift"
                      >
                        <span className="size-8 rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0 text-xs font-bold group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-sm text-[var(--forest-deep)] mb-0.5">{c.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{c.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Visual panel */}
                <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative min-h-[380px] flex flex-col justify-between p-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[var(--gold)]/8 blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#c084fc]/8 blur-2xl" />
                  <div className="relative z-10">
                    <div className="size-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 text-[var(--gold)] flex items-center justify-center mb-4">
                      <activeSection.Icon className="size-7" />
                    </div>
                    <h4 className="font-display text-2xl text-[var(--gold)] mb-3">{activeSection.heading}</h4>
                    <p className="text-sm text-[var(--parchment)]/80 leading-relaxed mb-6">{activeSection.intro}</p>
                    <div className="border-t border-[var(--parchment)]/10 pt-4">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--gold)]/70 mb-3">Conditions covered</p>
                      <div className="grid grid-cols-2 gap-2">
                        {activeSection.conditions.map((c, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--parchment)]/75">
                            <span className="text-[var(--gold)] text-[8px]">✦</span>
                            {c.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-6">
                    <BookAppointmentDialog
                      trigger={
                        <button className="w-full bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 text-[var(--gold)] font-semibold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-xs cursor-pointer">
                          Book Consultation <Calendar className="size-3.5" />
                        </button>
                      }
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Pillars */}
      <section className="bg-[var(--cream)] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Our Approach</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Ayurvedic Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Every patient receives a comprehensive Ayurvedic consultation before beginning treatment. Our doctor carefully
                evaluates body constitution, dosha imbalance, medical history, lifestyle, and reproductive health.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[var(--parchment)] rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--forest-deep)]/30 hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="size-11 rounded-xl bg-[var(--forest-deep)]/8 text-[var(--forest-deep)] flex items-center justify-center mb-4 group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">Why Choose Us</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Why Choose Devdut Ayurved Clinic?</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                Whether you seek relief from menstrual disorders, plan for parenthood, need pregnancy care, want to manage
                hormonal imbalances, or improve men's vitality — we offer comprehensive Ayurvedic solutions tailored to your unique needs.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {whyChoose.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--forest-deep)]"
                  >
                    <span className="size-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center text-[10px] shrink-0">✓</span>
                    {w}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative p-8 min-h-[400px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[var(--gold)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#c084fc]/8 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="font-sanskrit text-[var(--gold)] text-3xl mb-4 font-semibold">स्त्री-पुरुष स्वास्थ्य</div>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">Begin Your Journey Towards Better Reproductive Health</h3>
              <p className="text-sm text-[var(--parchment)]/70 leading-relaxed mb-6">
                Through personalized care, authentic herbal medicines, Panchakarma therapies, and holistic lifestyle guidance,
                we help you achieve lasting wellness — naturally and safely.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book My Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20 mt-4">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to restore your hormonal & reproductive health?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic healing is highly personalized. Our doctors will guide you with pulse reading (Nadi Pariksha) and a custom
              herbal and therapy regime designed for your unique constitution and health history.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion. Healing with purpose.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function LifestyleChronicSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  type Condition = {
    tab: string;
    Icon: React.ComponentType<{ className?: string }>;
    heading: string;
    intro: string;
    points: string[];
  };

  const conditions: Condition[] = [
    {
      tab: "Diabetes",
      Icon: Droplets,
      heading: "Diabetes Management",
      intro: "Ayurveda helps manage diabetes by improving metabolism, supporting healthy blood sugar regulation, strengthening digestion, and reducing the risk of long-term complications.",
      points: [
        "Blood Sugar Management",
        "Improved Metabolism",
        "Weight Control",
        "Lifestyle Modification",
        "Dietary Guidance",
        "Long-term Wellness",
      ],
    },
    {
      tab: "Thyroid",
      Icon: Activity,
      heading: "Thyroid Disorders",
      intro: "Hormonal imbalance can affect metabolism, energy levels, weight, and overall health. Our Ayurvedic treatments aim to support healthy thyroid function naturally by restoring internal balance.",
      points: [
        "Personalized Herbal Medicines",
        "Diet & Nutrition Guidance",
        "Lifestyle Counseling",
        "Stress Management",
        "Hormonal Rebalancing",
        "Energy & Vitality Support",
      ],
    },
    {
      tab: "Obesity",
      Icon: Scale,
      heading: "Obesity & Weight Management",
      intro: "Excess weight often results from metabolic imbalance and unhealthy lifestyle habits. Our holistic weight management programs focus on improving digestion, boosting metabolism, and supporting healthy weight loss naturally.",
      points: [
        "Weight Reduction",
        "Metabolic Improvement",
        "Personalized Diet Plan",
        "Lifestyle Counseling",
        "Panchakarma Detox (when recommended)",
        "Sustained Energy Levels",
      ],
    },
    {
      tab: "Weight Gain",
      Icon: TrendingUp,
      heading: "Weight Gain Management",
      intro: "For individuals struggling with low body weight, Ayurveda helps improve digestion, nutrient absorption, and overall strength through personalized nutrition and herbal therapies.",
      points: [
        "Improved Nutrient Absorption",
        "Digestive Strengthening",
        "Rasayana (Rejuvenation) Therapies",
        "Personalized Nutrition Plan",
        "Muscle & Tissue Building",
        "Overall Vitality Support",
      ],
    },
    {
      tab: "Allergies",
      Icon: Wind,
      heading: "Allergies",
      intro: "Recurring allergies often indicate weakened immunity and Dosha imbalance. Our Ayurvedic treatments help reduce the frequency and severity of allergic reactions while naturally strengthening the immune system.",
      points: [
        "Seasonal Allergies",
        "Dust Allergies",
        "Skin Allergies",
        "Food Sensitivities",
        "Recurrent Allergic Conditions",
        "Immunity Strengthening",
      ],
    },
    {
      tab: "Insomnia",
      Icon: Moon,
      heading: "Insomnia & Stress-Related Disorders",
      intro: "Quality sleep is essential for physical and mental well-being. Ayurveda addresses insomnia by calming the nervous system, balancing the mind, and promoting restful sleep through natural therapies.",
      points: [
        "Herbal Sleep Support",
        "Relaxation Therapies",
        "Lifestyle Modifications",
        "Stress Management",
        "Sleep Hygiene Guidance",
        "Nervous System Calming",
      ],
    },
    {
      tab: "Acidity",
      Icon: Flame,
      heading: "Acidity & Hyperacidity",
      intro: "Persistent acidity, heartburn, and acid reflux are commonly associated with digestive imbalance. Our Ayurvedic treatments help improve digestive health, reduce excess acidity, and prevent recurrence naturally.",
      points: [
        "Heartburn Relief",
        "Acid Reflux Management",
        "Digestive Fire Restoration",
        "Herbal Cooling Formulations",
        "Diet Correction",
        "Long-term Prevention",
      ],
    },
    {
      tab: "Liver",
      Icon: HeartPulse,
      heading: "Jaundice & Infective Hepatitis",
      intro: "The liver plays a vital role in digestion and detoxification. Ayurveda supports jaundice management and infective hepatitis recovery through herbal medicines, dietary recommendations, and therapies that promote natural healing.",
      points: [
        "Jaundice Management",
        "Infective Hepatitis Support",
        "Liver Detoxification",
        "Digestive Health Improvement",
        "Herbal Hepato-protective Formulas",
        "Dietary Recommendations",
      ],
    },
  ];

  type Pillar = {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  };

  const pillars: Pillar[] = [
    { Icon: Stethoscope, title: "Personalized Consultation", desc: "In-depth Prakriti assessment, Dosha analysis, medical history review, dietary habits, stress levels, and lifestyle evaluation before treatment." },
    { Icon: Pill, title: "Classical Herbal Medicines", desc: "Authentic Ayurvedic formulations — Guduchi, Haritaki, Triphala, Nishakathakadi, and more — tailored to your specific condition." },
    { Icon: Flame, title: "Panchakarma Detox", desc: "Targeted cleansing procedures like Virechana, Basti, and Udwartana where clinically indicated to reverse deep-seated metabolic imbalances." },
    { Icon: Salad, title: "Diet & Nutrition Guidance", desc: "Condition-specific Ayurvedic diet plans that support metabolism, blood sugar, weight management, and digestive health." },
    { Icon: PersonStanding, title: "Lifestyle & Routine Guidance", desc: "Dinacharya (daily routine), Ritucharya (seasonal routine), Yoga, and Pranayama to sustain long-term chronic disease management." },
    { Icon: ClipboardList, title: "Follow-up & Monitoring", desc: "Regular progress reviews, herbal adjustments, and health tracking to ensure safe, sustained, and effective long-term outcomes." },
  ];

  const whyChoose = [
    "Personalized Treatment for Lifestyle Disorders",
    "Root Cause-Based Ayurvedic Healing",
    "Safe & Natural Herbal Medicines",
    "Authentic Panchakarma Therapies",
    "Comprehensive Diet & Lifestyle Guidance",
    "Holistic Management of Chronic Diseases",
    "Focus on Long-Term Wellness & Prevention",
    "Compassionate and Experienced Ayurvedic Care",
  ];

  const active = conditions[activeTab];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={doctorImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/70 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
              जीवनशैली चिकित्सा
            </div>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              <Waves className="size-3.5" />
              Lifestyle & Chronic Disease Care
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Restore Balance.{" "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Manage Chronic Conditions Naturally.</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              Modern lifestyles, unhealthy habits, stress, and irregular routines have fuelled a rise in chronic conditions.
              We treat the root cause — not just the symptoms — through personalized Ayurvedic care combining herbal medicines,
              Panchakarma, and holistic lifestyle guidance.
            </p>
            {/* Quick condition chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {conditions.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); document.getElementById("conditions")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--parchment)]/20 bg-[var(--parchment)]/8 text-[var(--parchment)]/75 hover:border-[var(--gold)]/50 hover:text-[var(--gold)] text-xs font-medium transition-all cursor-pointer"
                >
                  <c.Icon className="size-3" />
                  {c.tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions Tabs */}
      <section id="conditions" className="container-page py-20">
        <Reveal>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Specialized Chronic Care</h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
              Every treatment is carefully tailored to your Prakriti, Dosha imbalance, medical history, and lifestyle —
              ensuring safe, effective, and sustainable healing.
            </p>
          </div>
        </Reveal>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)] hover:text-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        {/* Active Condition Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left: Details */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)] hover:border-[var(--forest-deep)]/25 hover:shadow-sm transition-all"
                    >
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] italic mt-4">
                Treatment may include personalized herbal medicines, Panchakarma (where appropriate), dietary modifications, and lifestyle counseling.
              </p>
            </div>

            {/* Right: Dark visual panel */}
            <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative min-h-[380px] flex flex-col justify-between p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[var(--gold)]/8 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#6ee7b7]/6 blur-2xl" />

              <div className="relative z-10">
                <div className="size-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 text-[var(--gold)] flex items-center justify-center mb-5">
                  <active.Icon className="size-7" />
                </div>
                <h4 className="font-display text-2xl text-[var(--gold)] mb-3">{active.heading}</h4>
                <p className="text-sm text-[var(--parchment)]/80 leading-relaxed mb-6">{active.intro}</p>
                <div className="border-t border-[var(--parchment)]/10 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--gold)]/70 mb-3">Focus Areas</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                    {active.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--parchment)]/75">
                        <span className="text-[var(--gold)] text-[8px]">✦</span>
                        {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <BookAppointmentDialog
                  trigger={
                    <button className="w-full bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 text-[var(--gold)] font-semibold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-xs cursor-pointer">
                      Book Consultation <Calendar className="size-3.5" />
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Pillars */}
      <section className="bg-[var(--cream)] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Our Approach</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Ayurvedic Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Every patient receives a comprehensive Ayurvedic consultation to understand their Prakriti, Dosha imbalance,
                medical history, dietary habits, stress levels, and lifestyle before a personalized plan is developed.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[var(--parchment)] rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--forest-deep)]/30 hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="size-11 rounded-xl bg-[var(--forest-deep)]/8 text-[var(--forest-deep)] flex items-center justify-center mb-4 group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">Why Choose Us</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Why Choose Devdut Ayurved Clinic?</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                Whether you're managing diabetes, thyroid disorders, obesity, weight concerns, allergies, insomnia, acidity,
                or liver health issues — we offer personalized Ayurvedic solutions that address the root cause and promote sustainable healing.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {whyChoose.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--forest-deep)]"
                  >
                    <span className="size-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3" />
                    </span>
                    {w}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative p-8 min-h-[420px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[var(--gold)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#6ee7b7]/6 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="font-sanskrit text-[var(--gold)] text-3xl mb-4 font-semibold">जीवनशैली चिकित्सा</div>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">Reclaim Your Health Naturally</h3>
              <p className="text-sm text-[var(--parchment)]/70 leading-relaxed mb-6">
                Through authentic herbal medicines, Panchakarma therapies, and holistic lifestyle guidance, we help you achieve
                better health, improved vitality, and a balanced life — naturally.
              </p>
              {/* Condition grid */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {conditions.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[var(--parchment)]/5 border border-[var(--parchment)]/10">
                    <c.Icon className="size-4 text-[var(--gold)]" />
                    <span className="text-[9px] text-[var(--parchment)]/60 font-medium text-center leading-tight">{c.tab}</span>
                  </div>
                ))}
              </div>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book My Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20 mt-4">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to manage your chronic condition naturally?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic healing is deeply personalized. Our doctors will guide you with Nadi Pariksha (pulse diagnosis) and craft
              a custom herbal, Panchakarma, and lifestyle plan tailored to your unique health history and constitution.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Restore balance. Renew vitality. Reclaim health.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function BoneJointNeurologicalSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  type Condition = {
    tab: string;
    Icon: React.ComponentType<{ className?: string }>;
    heading: string;
    intro: string;
    points: string[];
  };

  const conditions: Condition[] = [
    {
      tab: "Arthritis",
      Icon: Activity,
      heading: "Arthritis",
      intro: "Arthritis can cause chronic joint pain, stiffness, swelling, and reduced mobility. Our Ayurvedic treatments focus on reducing inflammation, improving joint lubrication, and enhancing flexibility naturally.",
      points: [
        "Osteoarthritis",
        "Rheumatoid Arthritis",
        "Joint Stiffness Relief",
        "Swelling & Inflammation Reduction",
        "Chronic Joint Pain Management",
        "Cartilage Protection & Support",
      ],
    },
    {
      tab: "Joint Pain",
      Icon: Heart,
      heading: "Joint Pain Care",
      intro: "Persistent joint pain can affect your daily activities and quality of life. Our treatments help relieve pain, improve joint function, and support long-term musculoskeletal health.",
      points: [
        "Knee Pain Relief",
        "Shoulder Pain Management",
        "Wrist & Elbow Care",
        "Ankle & Foot Pain",
        "General Joint Discomfort Relief",
        "Synovial Fluid Restoration",
      ],
    },
    {
      tab: "Sciatica",
      Icon: Compass,
      heading: "Sciatica & Nerve Care",
      intro: "Sciatica occurs due to irritation or compression of the sciatic nerve, causing pain that radiates from the lower back to the legs. Ayurveda helps reduce inflammation, relieve nerve compression, and improve mobility naturally.",
      points: [
        "Lower Back Pain Relief",
        "Radiating Leg Pain Relief",
        "Tingling & Numbness Management",
        "Nerve Nourishment & Strength",
        "Difficulty Walking Correction",
        "Spinal Decompression Support",
      ],
    },
    {
      tab: "Migraine",
      Icon: Sparkles,
      heading: "Migraine & Chronic Headache",
      intro: "Recurring headaches and migraines often result from stress, lifestyle imbalance, digestive issues, or Dosha disturbances. Our Ayurvedic approach aims to reduce the frequency and intensity of attacks while promoting long-term relief.",
      points: [
        "Migraine Attack Reduction",
        "Chronic Headache Management",
        "Stress-Related Headaches Relief",
        "Tension Headaches Relief",
        "Pitta-Pacifying Treatments",
        "Nervous System Calming",
      ],
    },
    {
      tab: "Epilepsy",
      Icon: Brain,
      heading: "Epilepsy & Neurological Health",
      intro: "Ayurveda provides supportive care for neurological health through personalized herbal medicines, lifestyle management, and therapies that help strengthen the nervous system and improve overall well-being.",
      points: [
        "Nervous System Strengthening",
        "Cognitive Function Support",
        "Stress & Fatigue Reduction",
        "Medhya (Brain Tonic) Rasayana",
        "Lifestyle & Sleep Optimization",
        "Mental Calming & Resilience",
      ],
    },
    {
      tab: "Paralysis",
      Icon: PersonStanding,
      heading: "Paralysis Supportive Care",
      intro: "Supportive Ayurvedic care for hemiplegia, paraplegia and post-stroke weakness — focusing on nerve nourishment, muscle tone, mobility and recovery alongside modern rehabilitation.",
      points: [
        "Hemiplegia Support",
        "Paraplegia Support",
        "Post-stroke Recovery",
        "Nerve Nourishment",
        "Muscle Tone Improvement",
        "Mobility & Coordination",
      ],
    },
  ];

  type Pillar = {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  };

  const pillars: Pillar[] = [
    { Icon: Stethoscope, title: "Personalized Consultation", desc: "In-depth Prakriti mapping, Dosha analysis, postural assessment, and neurological history check before prescribing treatments." },
    { Icon: Leaf, title: "Classical Herbal Medicines", desc: "Premium Ayurvedic formulations — Shalaki, Guggulu, Ashwagandha, and Rasnasaptakadi — to reduce pain, support joints, and soothe nerves." },
    { Icon: Flame, title: "Panchakarma Therapies", desc: "Specialized detox procedures like Virechana and Basti to flush out toxins causing inflammation and restore Vata balance." },
    { Icon: Sparkles, title: "Abhyanga & Swedana", desc: "Therapeutic massage with medicated oils and herbal steam to relieve joint stiffness, improve circulation, and ease muscle spasms." },
    { Icon: Droplets, title: "Kati / Janu / Greeva Basti", desc: "Localized retention of warm medicated oil on the back, knee, or neck to lubricate joints and nourish compressed nerves." },
    { Icon: PersonStanding, title: "Pain Management & Rehab", desc: "Guided rehabilitation exercises, specific Yoga asanas, and daily routine design to recover mobility and prevent pain recurrence." },
  ];

  const benefits = [
    "Natural Pain Relief without Harmful Side Effects",
    "Improved Joint Flexibility & Lubrication",
    "Reduced Inflammation & Swelling",
    "Better Mobility, Physical Strength & Balance",
    "Enhanced Nervous System & Cognitive Function",
    "Improved Quality of Daily Life & Independence",
    "Reduced Risk of Pain & Stiffness Recurrence",
    "Holistic Long-Term Wellness & Prevention",
  ];

  const active = conditions[activeTab];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={treatmentsImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/70 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
              अस्थि-सन्धि-स्नायु चिकित्सा
            </div>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              <Activity className="size-3.5" />
              Bone, Joint & Neurological Care
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Restore Mobility.{" "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Relieve Pain & Live Comfortably.</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              Healthy bones, joints, muscles, and the nervous system are essential for an active life.
              We address the root cause of Vata imbalances and neurological concerns using authentic Ayurvedic therapies,
              Panchakarma, customized herbs, and rehabilitation.
            </p>
            {/* Quick condition chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {conditions.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); document.getElementById("conditions")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--parchment)]/20 bg-[var(--parchment)]/8 text-[var(--parchment)]/75 hover:border-[var(--gold)]/50 hover:text-[var(--gold)] text-xs font-medium transition-all cursor-pointer"
                >
                  <c.Icon className="size-3" />
                  {c.tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions Tabs */}
      <section id="conditions" className="container-page py-20">
        <Reveal>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Specialized Bone & Neuro Care</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Conditions We Treat</h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
              Holistic care designed to reduce Vata disorders, relieve nerve compression, decrease joint stiffness, and support long-term recovery.
            </p>
          </div>
        </Reveal>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)] hover:text-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        {/* Active Condition Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left: Details */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment covers:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)] hover:border-[var(--forest-deep)]/25 hover:shadow-sm transition-all"
                    >
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] italic mt-4">
                Therapies are tailored exactly according to your Prakriti, degree of Dosha imbalance, and clinical history.
              </p>
            </div>

            {/* Right: Dark visual panel */}
            <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative min-h-[380px] flex flex-col justify-between p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[var(--gold)]/8 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#6ee7b7]/6 blur-2xl" />

              <div className="relative z-10">
                <div className="size-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 text-[var(--gold)] flex items-center justify-center mb-5">
                  <active.Icon className="size-7" />
                </div>
                <h4 className="font-display text-2xl text-[var(--gold)] mb-3">{active.heading}</h4>
                <p className="text-sm text-[var(--parchment)]/80 leading-relaxed mb-6">{active.intro}</p>
                <div className="border-t border-[var(--parchment)]/10 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--gold)]/70 mb-3">Therapy Indications</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                    {active.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--parchment)]/75">
                        <span className="text-[var(--gold)] text-[8px]">✦</span>
                        {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <BookAppointmentDialog
                  trigger={
                    <button className="w-full bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 text-[var(--gold)] font-semibold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-xs cursor-pointer">
                      Book Consultation <Calendar className="size-3.5" />
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Pillars */}
      <section className="bg-[var(--cream)] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Our Approach</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Ayurvedic Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Musculoskeletal and neurological health requires comprehensive diagnosis of Vata disturbances and personalized therapies to restore function.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[var(--parchment)] rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--forest-deep)]/30 hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="size-11 rounded-xl bg-[var(--forest-deep)]/8 text-[var(--forest-deep)] flex items-center justify-center mb-4 group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">Benefits of Treatment</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Why Choose Devdut Ayurved Clinic?</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                Whether you suffer from arthritis, joint pain, sciatica, migraine, headaches, or epilepsy, we offer personalized Ayurvedic solutions designed to relieve pain and help you return to a healthy, active life naturally.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--forest-deep)]"
                  >
                    <span className="size-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3" />
                    </span>
                    {b}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative p-8 min-h-[420px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[var(--gold)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#6ee7b7]/6 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="font-sanskrit text-[var(--gold)] text-3xl mb-4 font-semibold">अस्थि-सन्धि-स्नायु चिकित्सा</div>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">Move Freely. Live Comfortably.</h3>
              <p className="text-sm text-[var(--parchment)]/70 leading-relaxed mb-6">
                Through authentic herbal medicines, localized Basti therapies, and holistic lifestyle counseling, we help you restore vitality and pain-free living safely.
              </p>
              {/* Condition grid */}
              <div className="grid grid-cols-5 gap-1.5 mb-6">
                {conditions.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--parchment)]/5 border border-[var(--parchment)]/10">
                    <c.Icon className="size-3.5 text-[var(--gold)]" />
                    <span className="text-[8px] text-[var(--parchment)]/60 font-medium text-center leading-tight">{c.tab}</span>
                  </div>
                ))}
              </div>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20 mt-4">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to reclaim pain-free movement?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic bone and joint care provides deep structural relief. Our expert doctors will evaluate your alignment and symptoms,
              creating a targeted localized therapy plan using medicated oils and custom herbal supports.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion. Healing with purpose.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function PreventiveCareSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  type Condition = {
    tab: string;
    Icon: React.ComponentType<{ className?: string }>;
    heading: string;
    intro: string;
    points: string[];
  };

  const conditions: Condition[] = [
    {
      tab: "Heart Health",
      Icon: Heart,
      heading: "Heart Health Support",
      intro: "A healthy heart is essential for a healthy life. Our Ayurvedic approach focuses on improving overall cardiovascular wellness through balanced nutrition, herbal medicines, stress management, and healthy lifestyle practices.",
      points: [
        "Cardiovascular Wellness Support",
        "Healthy Lifestyle Guidance",
        "Personalized Diet Consultation",
        "Stress Management Support",
        "Preventive Heart Care Programs",
        "Cholesterol & Circulation Wellness",
      ],
    },
    {
      tab: "Abscess",
      Icon: ShieldAlert,
      heading: "Abscess Management",
      intro: "Ayurveda offers natural treatment approaches for abscesses by helping reduce inflammation, supporting wound healing, and promoting faster recovery through herbal medicines and appropriate therapeutic procedures.",
      points: [
        "Natural Pain Relief",
        "Swelling & Redness Reduction",
        "Herbal Wound Purification",
        "Tissue Healing Support",
        "Immune Strengthening against infection",
        "Preventing Abscess Recurrence",
      ],
    },
    {
      tab: "Tumour Supportive",
      Icon: Activity,
      heading: "Tumour Supportive Care",
      intro: "Our Ayurvedic supportive care programs are designed to improve overall health, immunity, digestion, and quality of life for individuals undergoing treatment for tumours or recovering from illness.",
      points: [
        "Herbal Supportive Medicines",
        "Immunity Enhancement",
        "Nutritional & Rebuilding Support",
        "Digestive Health Management",
        "Burnout & Fatigue Relief",
        "Lifestyle & Recovery Counseling",
      ],
    },
    {
      tab: "Diet",
      Icon: Salad,
      heading: "Personalized Diet Consultation",
      intro: "Diet plays a vital role in maintaining health and preventing disease. Our Ayurvedic diet consultations are based on your body constitution (Prakriti), digestive strength (Agni), lifestyle, and existing health conditions.",
      points: [
        "Customized Ayurvedic Diet Plan",
        "Seasonal Food Recommendations (Ritucharya)",
        "Digestive Fire (Agni) Guidance",
        "Weight Management Nutrition",
        "Daily Routine (Dinacharya) Alignment",
        "Healthy Mindful Eating Habits",
      ],
    },
    {
      tab: "Lifestyle",
      Icon: PersonStanding,
      heading: "Lifestyle Counseling",
      intro: "A balanced lifestyle is one of Ayurveda's most powerful tools for preventing disease. We guide patients in adopting healthy daily routines that improve physical, mental, and emotional well-being.",
      points: [
        "Stress & Anxiety Management",
        "Sleep Improvement & Insomnia Support",
        "Daily Routine Planning",
        "Exercise & Yoga Guidance",
        "Mental & Emotional Wellness Support",
        "Healthy Habit Development",
      ],
    },
    {
      tab: "Check-ups",
      Icon: ClipboardList,
      heading: "Preventive Health Check-ups",
      intro: "Regular Ayurvedic health assessments help identify early signs of imbalance before they develop into chronic diseases.",
      points: [
        "Ayurvedic Health Assessment",
        "Dosha Analysis (Vata-Pitta-Kapha)",
        "Prakriti Evaluation (Body Constitution)",
        "Lifestyle & Posture Review",
        "Dietary Habit Assessment",
        "Personalized Wellness Recommendations",
      ],
    },
  ];

  type Pillar = {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  };

  const pillars: Pillar[] = [
    { Icon: Stethoscope, title: "Wellness Consultation", desc: "Detailed evaluation of Prakriti (body type), Agni (digestive fire), lifestyle, and daily routines to map out prevention plans." },
    { Icon: Leaf, title: "Classical Herbal Medicines", desc: "Nourishing elixirs, immunomodulatory Rasayana herbs, and organ-protective formulations custom blended for you." },
    { Icon: Flame, title: "Panchakarma Detox", desc: "Seasonal purification therapies to flush out accumulated toxins (Ama) and prevent seasonal allergies and flare-ups." },
    { Icon: Salad, title: "Dietary Correction", desc: "Highly personalized dietary prescriptions based on your constitutional type and seasonal requirements." },
    { Icon: PersonStanding, title: "Daily & Seasonal Routines", desc: "Guided adoption of Dinacharya (daily rituals) and Ritucharya (seasonal rituals) to align your body with natural rhythms." },
    { Icon: ClipboardList, title: "Preventive Monitoring", desc: "Periodic health reviews, Dosha imbalance tracking, and seasonal adjustments to ensure lifelong health." },
  ];

  const benefits = [
    "Strengthens Natural Immunity & Defense",
    "Promotes Healthy, Active & Graceful Ageing",
    "Improves Digestion, Absorption & Metabolism",
    "Significantly Reduces Risk of Lifestyle Diseases",
    "Enhances Physical, Mental & Emotional Well-being",
    "Supports Heart, Liver, Kidney & Organ Health",
    "Improves Everyday Energy, Focus & Vitality",
    "Encourages Long-Term Sustainable Healthy Living",
  ];

  const active = conditions[activeTab];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={homeAboutImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/70 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
              स्वस्थवृत्त एवं रोगप्रतिरोध चिकित्सा
            </div>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              <Compass className="size-3.5" />
              General Wellness & Preventive Care
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Prevent Today.{" "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Stay Healthy for Tomorrow.</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              At Devdut Ayurved Clinic, we believe the best healthcare begins with prevention.
              Strengthen your body's natural defenses, improve immunity, support organ health,
              and prevent lifestyle-related illness through the timeless wisdom of Ayurveda.
            </p>
            {/* Quick service chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {conditions.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); document.getElementById("conditions")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--parchment)]/20 bg-[var(--parchment)]/8 text-[var(--parchment)]/75 hover:border-[var(--gold)]/50 hover:text-[var(--gold)] text-xs font-medium transition-all cursor-pointer"
                >
                  <c.Icon className="size-3" />
                  {c.tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions/Services Tabs */}
      <section id="conditions" className="container-page py-20">
        <Reveal>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Our Wellness Services</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Wellness & Preventive Care</h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
              Every wellness program is carefully designed according to your Prakriti, age, lifestyle, health goals, and seasonal requirements.
            </p>
          </div>
        </Reveal>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)] hover:text-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        {/* Active Condition Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left: Details */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our program focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)] hover:border-[var(--forest-deep)]/25 hover:shadow-sm transition-all"
                    >
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {active.tab === "Tumour Supportive" && (
                <p className="text-xs text-[var(--muted-foreground)] bg-[var(--cream)] border border-[var(--border)] p-3 rounded-xl italic mt-4">
                  Note: Ayurvedic supportive care complements conventional medical treatment and should not replace specialist medical advice.
                </p>
              )}
            </div>

            {/* Right: Dark visual panel */}
            <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative min-h-[380px] flex flex-col justify-between p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[var(--gold)]/8 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[#6ee7b7]/6 blur-2xl" />

              <div className="relative z-10">
                <div className="size-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 text-[var(--gold)] flex items-center justify-center mb-5">
                  <active.Icon className="size-7" />
                </div>
                <h4 className="font-display text-2xl text-[var(--gold)] mb-3">{active.heading}</h4>
                <p className="text-sm text-[var(--parchment)]/80 leading-relaxed mb-6">{active.intro}</p>
                <div className="border-t border-[var(--parchment)]/10 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--gold)]/70 mb-3">Key Focus Areas</p>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                    {active.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[var(--parchment)]/75">
                        <span className="text-[var(--gold)] text-[8px]">✦</span>
                        {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <BookAppointmentDialog
                  trigger={
                    <button className="w-full bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 border border-[var(--gold)]/30 hover:border-[var(--gold)]/60 text-[var(--gold)] font-semibold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-xs cursor-pointer">
                      Book Consultation <Calendar className="size-3.5" />
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Pillars */}
      <section className="bg-[var(--cream)] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Our Method</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Holistic Wellness Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Prevention is active, daily alignment. We design customized prevention and immunity programs that fit your body constitution (Prakriti).
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[var(--parchment)] rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--forest-deep)]/30 hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="size-11 rounded-xl bg-[var(--forest-deep)]/8 text-[var(--forest-deep)] flex items-center justify-center mb-4 group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">Health Benefits</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Benefits of Preventive Care</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                Good health is built through consistent care, balanced living, and preventive practices.
                Invest in your health naturally to stay active, energetic, and free of chronic conditions as you age.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--forest-deep)]"
                  >
                    <span className="size-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3" />
                    </span>
                    {b}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative p-8 min-h-[420px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[var(--gold)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#6ee7b7]/6 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="font-sanskrit text-[var(--gold)] text-3xl mb-4 font-semibold">स्वस्थवृत्त एवं रोगप्रतिरोध चिकित्सा</div>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">Invest in Your Health, Naturally</h3>
              <p className="text-sm text-[var(--parchment)]/70 leading-relaxed mb-6">
                Whether you want to strengthen immunity, improve daily habits, or receive customized dietary guidance,
                we offer authentic, personalized Ayurvedic wellness plans.
              </p>
              {/* Condition grid */}
              <div className="grid grid-cols-6 gap-1 mb-6">
                {conditions.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--parchment)]/5 border border-[var(--parchment)]/10">
                    <c.Icon className="size-3.5 text-[var(--gold)]" />
                    <span className="text-[7px] text-[var(--parchment)]/60 font-medium text-center leading-tight">{c.tab}</span>
                  </div>
                ))}
              </div>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20 mt-4">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to invest in your long-term health?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurveda emphasizes prevention first. Our expert Vaidyas will analyze your constitution and current imbalances,
              designing a sustainable daily routine and dietary plan to prevent disease and support healthy ageing.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion. Healing with purpose.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function DigestiveSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  type Condition = {
    tab: string;
    Icon: React.ComponentType<{ className?: string }>;
    heading: string;
    intro: string;
    points: string[];
    image: string;
    imageCaption: string;
  };

  const conditions: Condition[] = [
    {
      tab: "Acidity",
      Icon: Flame,
      heading: "Acidity & Hyperacidity",
      intro: "Persistent acidity, heartburn, and acid reflux can significantly affect daily life. According to Ayurveda, excess Pitta accumulation in the stomach causes heat, sour belching, and mucosal inflammation. Our treatments cool, soothe, and cleanse the GI tract to prevent recurrence.",
      points: [
        "Acid Reflux (GERD) Relief",
        "Heartburn Reduction",
        "Hyperacidity Management",
        "Sour Belching Relief",
        "Burning Sensation Relief",
        "Healing of Stomach Lining",
      ],
      image: vamanaImg,
      imageCaption: "Vamana (therapeutic emesis) is a classical Panchakarma detox procedure used to eliminate excess Pitta and acidic impurities from the upper stomach, providing rapid relief for chronic acidity.",
    },
    {
      tab: "Indigestion",
      Icon: Activity,
      heading: "Indigestion (Ajirna)",
      intro: "Poor digestion leads to bloating, heaviness, discomfort, and reduced nutrient absorption. In Ayurveda, this stems from weak digestive fire (Agni). Our treatments stimulate Agni and eliminate toxic waste (Ama) to restore healthy digestion.",
      points: [
        "Indigestion Relief",
        "Bloating & Heaviness Correction",
        "Improving Poor Appetite",
        "Correcting Slow Digestion",
        "Relieving General Abdominal Discomfort",
        "Boosting Nutrient Absorption",
      ],
      image: digestiveImg,
      imageCaption: "Custom Ayurvedic herbal remedies and Abhyanga massage stimulate digestive fire (Agni) in the core, resolving stomach congestion and supporting nutrient assimilation.",
    },
    {
      tab: "Gastric Problems",
      Icon: Wind,
      heading: "Gastric Problems",
      intro: "Excess gas and abdominal discomfort are common signs of Vata disturbance in the intestines. Our Ayurvedic approach focuses on calming gut sensitivity, regulating digestive movement, and reducing bloating.",
      points: [
        "Reducing Gas Formation",
        "Bloating & Flatulence Management",
        "Abdominal Pain Relief",
        "Stomach Cramps Relief",
        "Regulating Intestinal Gas Passage",
        "Strengthening Gut Microbiome",
      ],
      image: bastiImg,
      imageCaption: "Basti therapy (medicated herbal enemas) works directly on the colon, which is the primary site of Vata dosha, to quickly release trapped gas and alleviate pain.",
    },
    {
      tab: "Constipation",
      Icon: Droplets,
      heading: "Constipation",
      intro: "Chronic constipation may result from poor digestion, unhealthy eating habits, dehydration, or lifestyle factors. Ayurvedic therapies lubricate the colon, pacify dry Vata dosha, and support normal bowel habits.",
      points: [
        "Regulating Bowel Movements",
        "Softening Stool Naturally",
        "Improving Intestinal Colon Lubrication",
        "Pacifying Intestinal Dryness",
        "Detoxifying colon residue",
        "Strengthening pelvic muscle tone",
      ],
      image: bastiImg,
      imageCaption: "Snigdha Basti (oil enema) uses medicated oils to lubricate the mucosal lining of the colon, easing bowel evacuation and pacifying chronic dryness.",
    },
    {
      tab: "Piles",
      Icon: ShieldAlert,
      heading: "Piles (Hemorrhoids)",
      intro: "Ayurveda manages piles effectively by improving venous circulation, reducing inflammation in the rectal area, relieving pain, softening stool, and preventing bleeding. We treat both internal and external piles without surgery where possible.",
      points: [
        "Internal Piles Management",
        "External Piles Management",
        "Pain & Swelling Reduction",
        "Stopping Bleeding during Bowels",
        "Preventing Hemorrhoidal Recurrence",
        "Correcting Rectal Congestion",
      ],
      image: virechanaImg,
      imageCaption: "Virechana therapy (therapeutic purgation) cleanses the liver and portal system, reducing pressure in the hemorrhoidal veins to relieve piles swelling and bleeding.",
    },
    {
      tab: "Fissure",
      Icon: ShieldAlert,
      heading: "Anal Fissure",
      intro: "Painful anal fissures are managed with stool softening, local healing therapies, Pitta-Vata pacification and lifestyle correction to promote tissue repair and prevent recurrence.",
      points: [
        "Pain Relief During Bowels",
        "Tissue Healing Support",
        "Stool Softening Protocols",
        "Local Herbal Care",
        "Bleeding Control",
        "Preventing Recurrence",
      ],
      image: digestiveImg,
      imageCaption: "",
    },
    {
      tab: "Fistula",
      Icon: ShieldAlert,
      heading: "Fistula-in-Ano",
      intro: "Ayurvedic care for fistula focuses on infection control, channel cleansing and classical approaches including Kshara/Agnikshar where indicated, alongside diet and bowel regulation.",
      points: [
        "Infection Control Support",
        "Channel Cleansing Care",
        "Kshara / Agnikshar Guidance",
        "Pain & Discharge Management",
        "Bowel Regulation",
        "Long-term Prevention",
      ],
      image: templeImg,
      imageCaption: "",
    },
    {
      tab: "Mouth Ulcers",
      Icon: Sparkles,
      heading: "Stomatitis (Mouth Ulcers)",
      intro: "Recurrent mouth ulcers are often linked to stomach heat and digestive toxin accumulation. Our treatments help soothe burning pain, promote ulcer healing, and address the underlying digestive root causes.",
      points: [
        "Relieving Mouth Ulcer Pain",
        "Reducing Oral Inflammation",
        "Faster Ulcer Healing",
        "Clearing Stomach Toxin Build-up",
        "Cooling Pitta remedies",
        "Preventing Recurrent Stomatitis",
      ],
      image: digestiveImg,
      imageCaption: "Soothing cooling herbal pastes (Lepa) and gut-purifying decoctions neutralize stomach fire, resolving oral heat and healing mucosal ulcers.",
    },
    {
      tab: "Liver Health",
      Icon: HeartPulse,
      heading: "Jaundice & Infective Hepatitis",
      intro: "The liver (Yakrit) is the site of Ranjaka Pitta, vital for blood formation, digestion, and detoxification. Ayurveda supports jaundice and infective hepatitis recovery using hepato-protective herbs and therapies that cleanse bile channels.",
      points: [
        "Jaundice Management",
        "Infective Hepatitis Support",
        "Purifying Liver Bile Channels",
        "Hepato-protective Herbal Formulas",
        "Improving Fat & Nutrient Metabolism",
        "Nourishing Liver Tissue",
      ],
      image: virechanaImg,
      imageCaption: "Virechana (therapeutic purgation) is the premier Panchakarma for clearing bile ducts, purging excess toxins from the liver, and facilitating blood purification.",
    },
  ];

  type Pillar = {
    Icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
  };

  const pillars: Pillar[] = [
    { Icon: Stethoscope, title: "Digestive Consultation", desc: "Detailed evaluation of Prakriti, digestive fire strength (Agni), Dosha imbalances, eating habits, and stool characteristics." },
    { Icon: Leaf, title: "Classical Herbal Medicines", desc: "Authentic gut-rejuvenating herbs like Haritaki, Pippali, Sunthi, and Avipattikar churna to balance Pitta, Vata, and Kapha." },
    { Icon: Flame, title: "Panchakarma Detox", desc: "Specialized detox procedures including Vamana, Virechana, or Basti, selected clinically to reverse deep-seated digestive toxins (Ama)." },
    { Icon: Waves, title: "Digestive Detox & Cleansing", desc: "Ama-pachana (toxin digestion) protocols using light fasting, warm water, and digestive herbal decoctions." },
    { Icon: Salad, title: "Diet & Nutrition Consultation", desc: "Customized Ayurvedic nutrition plan focusing on correct food combining (Samyoga), timing, and gut-soothing ingredients." },
    { Icon: PersonStanding, title: "Lifestyle & Daily Routine", desc: "Dinacharya advice (meal timings, sleep hygiene, post-meal walking) combined with stress management to soothe the gut-mind axis." },
  ];

  const benefits = [
    "Improves Digestion & Metabolic Fire (Agni)",
    "Reduces Acidity, Heartburn & Reflux",
    "Relieves Trapped Gas, Bloating & Cramps",
    "Promotes Regular, Smooth & Healthy Bowel Movements",
    "Supports Liver Function & Blood Purification",
    "Detoxifies the Gut & Body Naturally",
    "Improves Digestive Nutrient Absorption",
    "Enhances Overall Energy, Mood & Well-being",
  ];

  const whyChoose = [
    "Personalized Digestive & Gut Care",
    "Root Cause-Based Ayurvedic Healing",
    "Safe & Natural Herbal Medicines",
    "Authentic Panchakarma Detox Therapies",
    "Customized Diet & Lifestyle Plans",
    "Holistic Gut Health Management",
    "Expert Ayurvedic Consultation & Monitoring",
    "Confidential, Compassionate Treatment",
  ];

  const active = conditions[activeTab];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={digestiveImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        {/* Back link */}
        <div className="container-page absolute inset-x-0 top-24 z-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-sm text-[var(--parchment)]/70 hover:text-[var(--gold)] transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
        </div>

        <div className="container-page relative z-10 flex min-h-[72vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="font-sanskrit text-[var(--gold)] text-2xl md:text-3xl mb-3 font-semibold tracking-wide">
              अग्नि चिकित्सा
            </div>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">
              <Waves className="size-3.5" />
              Digestive Disorders
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Restore Healthy Digestion.{"  "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Heal Your Gut Naturally.</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              According to Ayurveda, a healthy digestive system is the foundation of overall health.
              When digestion (Agni) becomes weak, toxins (Ama) accumulate. We treat the root cause
              using authentic therapies, gut cleansing, custom diets, and classical herbal medicines.
            </p>
            {/* Quick condition chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {conditions.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveTab(i); document.getElementById("conditions")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--parchment)]/20 bg-[var(--parchment)]/8 text-[var(--parchment)]/75 hover:border-[var(--gold)]/50 hover:text-[var(--gold)] text-xs font-medium transition-all cursor-pointer"
                >
                  <c.Icon className="size-3" />
                  {c.tab}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-7 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions Tabs */}
      <section id="conditions" className="container-page py-20">
        <Reveal>
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Digestive Care</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Conditions We Treat</h2>
            <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
              Every treatment is customized based on your body constitution (Prakriti), digestive fire (Agni), and lifestyle imbalances.
            </p>
          </div>
        </Reveal>

        {/* Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)] hover:text-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        {/* Active Condition Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            {/* Left: Details */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
                </div>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)] hover:border-[var(--forest-deep)]/25 hover:shadow-sm transition-all"
                    >
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] italic mt-4">
                Classical herbal formulations and dietary schedules are key components of our digestive recovery programs.
              </p>
            </div>

            {/* Right: Visual panel */}
            <div className="rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--parchment)] p-6 shadow-md flex flex-col gap-5">
              <div className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--cream)]">
                <img
                  src={active.image}
                  alt={active.heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/10 to-transparent pointer-events-none" />
              </div>
              <div className="mt-2">
                <BookAppointmentDialog
                  trigger={
                    <button className="w-full bg-[var(--forest-deep)] hover:bg-[var(--forest-deep)]/95 text-[var(--parchment)] font-semibold py-2.5 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-all text-xs cursor-pointer shadow-md">
                      Book Consultation <Calendar className="size-3.5" />
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Pillars */}
      <section className="bg-[var(--cream)] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Our Method</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Ayurvedic Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Restoring gut health requires resetting the digestive fire (Agni) and safely removing deep-seated metabolic toxins (Ama) from the body.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[var(--parchment)] rounded-2xl border border-[var(--border)] p-6 hover:border-[var(--forest-deep)]/30 hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="size-11 rounded-xl bg-[var(--forest-deep)]/8 text-[var(--forest-deep)] flex items-center justify-center mb-4 group-hover:bg-[var(--forest-deep)] group-hover:text-[var(--parchment)] transition-all duration-300">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="font-display text-lg text-[var(--forest-deep)] mb-2 group-hover:text-[var(--copper)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="eyebrow mb-3">Benefits of Gut Care</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Benefits of Ayurvedic Digestive Care</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-8">
                Ayurveda heals digestion from the root, providing long-lasting metabolic stability and natural tissue regeneration without the need for chemical symptom-suppressing antacids.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 text-sm font-medium text-[var(--forest-deep)]"
                  >
                    <span className="size-5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="size-3" />
                    </span>
                    {b}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="rounded-3xl overflow-hidden bg-[var(--forest-deep)] relative p-8 min-h-[420px] flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--forest-deep)] via-[#1a2e20] to-[#0d1f15]" />
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[var(--gold)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#6ee7b7]/6 blur-3xl" />
            <div className="relative z-10 text-center">
              <div className="font-sanskrit text-[var(--gold)] text-3xl mb-4 font-semibold">अग्नि चिकित्सा</div>
              <h3 className="font-display text-2xl text-[var(--parchment)] mb-3">Heal Your Digestive System Naturally</h3>
              <p className="text-sm text-[var(--parchment)]/70 leading-relaxed mb-6">
                Whether you deal with acidity, piles, chronic gas, or liver issues, we provide safe, natural, and customized plans to restore lasting gut wellness.
              </p>
              {/* Condition grid */}
              <div className="grid grid-cols-4 gap-1.5 mb-6">
                {conditions.map((c, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--parchment)]/5 border border-[var(--parchment)]/10">
                    <c.Icon className="size-3.5 text-[var(--gold)]" />
                    <span className="text-[7.5px] text-[var(--parchment)]/60 font-medium text-center leading-tight">{c.tab}</span>
                  </div>
                ))}
              </div>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-all shadow-gold hover:-translate-y-0.5 text-sm cursor-pointer">
                    Book Consultation <Calendar className="size-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[var(--cream)] border-t border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-12">
              <div className="eyebrow mb-3">Why Choose Us</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Why Choose Devdut Ayurved Clinic?</h2>
              <p className="text-sm text-[var(--muted-foreground)] max-w-xl mx-auto">
                Experienced Ayurvedic doctors, pure herbal formulations, and classical Panchakarma detoxes compiled for your metabolic type.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-5 rounded-2xl border border-[var(--border)] bg-[var(--parchment)] hover:shadow-md hover:border-[var(--forest-deep)]/20 transition-all duration-300 hover-lift"
              >
                <span className="size-5 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5">✓</span>
                <span className="text-xs font-semibold text-[var(--forest-deep)]">{w}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left relative z-10"
          >
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to restore your digestive balance?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic gut recovery provides deep metabolic balance. Our expert Vaidyas will evaluate your Agni (digestive fire) and symptoms,
              creating a customized cleansing and nutrition plan tailored to your health goals.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion. Healing with purpose.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all shadow-gold hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer">
                  Book my Consultation
                  <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 100, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56"
          >
            <img
              src={greenEarthImg}
              alt="Lush Green Earth Globe"
              className="w-full h-full object-contain scale-[2.2] md:scale-[3.0] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)] border-t border-[var(--border)]">
          <div className="container-page py-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">More in {t.category}</h2>
              <Ornament className="hidden md:flex" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="group rounded-3xl border border-[var(--border)] bg-[var(--parchment)] p-6 hover-lift">
                  <h3 className="font-display text-xl mb-2 group-hover:text-[var(--copper)]">{r.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{r.short}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium">Learn more <ArrowRight className="size-3.5" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


