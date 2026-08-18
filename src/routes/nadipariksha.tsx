import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Clock, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  ChevronDown, 
  HeartPulse, 
  BookOpen, 
  UserCheck, 
  Award,
  AlertCircle,
  IndianRupee,
  Sun
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import { NadiparikshaBookingDialog } from "@/components/site/NadiparikshaBookingDialog";
import { SITE } from "@/lib/site";

import { motion } from "framer-motion";
import nadi1 from "@/assets/nadipariksha/1.png";
import nadi2 from "@/assets/nadipariksha/2.png";
import nadi3 from "@/assets/nadipariksha/3.png";
import nadi4 from "@/assets/nadipariksha/4.png";
import nadi5 from "@/assets/nadipariksha/5.png";
import greenEarthImg from "@/assets/green-earth.png";

export const Route = createFileRoute("/nadipariksha")({
  head: () => ({
    meta: [
      { title: "Nadipariksha (Pulse Diagnosis) — Devdut Ayurved Clinic" },
      {
        name: "description",
        content: `Classical Nadipariksha (pulse diagnosis) at Devdut Ayurved — our clinic USP. Special promo sessions every month on the ${SITE.nadiparikshaDates}.`,
      },
      { property: "og:url", content: "/nadipariksha" },
    ],
    links: [{ rel: "canonical", href: "/nadipariksha" }],
  }),
  component: NadiparikshaPage,
});

function NadiparikshaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const points = [
    "Reads Vata, Pitta and Kapha through classical three-finger pulse palpation",
    "Maps Prakriti (innate constitution) and Vikriti (current dosha imbalance)",
    "Guides highly personalised herbal formulations, diet, and Panchakarma care",
    "Detects early sub-clinical imbalances before they manifest into chronic disease",
    "Forms the mandatory foundation of every treatment plan under Dr. Ganeshkumar Patil",
  ];

  const doshaPulses = [
    {
      name: "Vata Nadi",
      sanskrit: "सर्प गति (Sarpa Gati — Serpent Movement)",
      finger: "Index Finger (Tarjani)",
      quality: "Quick, thin, irregular, and light rhythm",
      reveals: "Nervous system state, stress, anxiety, dryness, joint stiffness, and colonic health.",
      color: "bg-amber-500/5 hover:bg-amber-500/10",
      badgeBg: "bg-amber-500/10 text-amber-800 border-amber-500/20",
      accent: "text-amber-700",
      border: "border-amber-900/15",
    },
    {
      name: "Pitta Nadi",
      sanskrit: "मण्डूक गति (Manduka Gati — Frog Movement)",
      finger: "Middle Finger (Madhyama)",
      quality: "Sharp, leaping, forceful, and active rhythm",
      reveals: "Digestive fire (Agni), metabolic speed, liver function, acidity, and inflammation.",
      color: "bg-rose-500/5 hover:bg-rose-500/10",
      badgeBg: "bg-rose-500/10 text-rose-800 border-rose-500/20",
      accent: "text-rose-700",
      border: "border-rose-900/15",
    },
    {
      name: "Kapha Nadi",
      sanskrit: "हंस गति (Hamsa Gati — Swan Movement)",
      finger: "Ring Finger (Anamika)",
      quality: "Slow, steady, soft, and floating rhythm",
      reveals: "Lymphatic flow, fluid retention, metabolic sluggishness, weight dynamics, and mucus.",
      color: "bg-emerald-500/5 hover:bg-emerald-500/10",
      badgeBg: "bg-emerald-500/10 text-emerald-800 border-emerald-500/20",
      accent: "text-emerald-700",
      border: "border-emerald-900/15",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Pre-Diagnosis Rest",
      desc: "You sit comfortably for 5–10 minutes to allow heart rate, circulation, and breathing to settle naturally before pulse reading.",
      icon: Clock,
    },
    {
      step: "02",
      title: "Three-Finger Palpation",
      desc: "Dr. Ganeshkumar Patil places three fingers over the radial artery to sense impulse waves across superficial, mid, and deep levels.",
      icon: HeartPulse,
    },
    {
      step: "03",
      title: "Prakriti & Vikriti Mapping",
      desc: "Comparing your native constitution (Prakriti) against current dosha distortions (Vikriti), tissue health (Dhatus), and metabolic toxin build-up (Ama).",
      icon: Compass,
    },
    {
      step: "04",
      title: "Custom Care Roadmap",
      desc: "Receiving a precise, written treatment plan combining tailored herbs, dietary guidelines, and targeted Panchakarma therapies.",
      icon: BookOpen,
    },
  ];

  const guidelines = [
    {
      title: "Morning / Empty Stomach",
      desc: "Best conducted in the morning or 2.5–3 hours after a light meal when digestive turbulence has settled.",
      icon: Sparkles,
    },
    {
      title: "Avoid Immediate Caffeine",
      desc: "Refrain from coffee, tea, alcohol, or heavy exercise 2 hours prior to avoid artificial pulse spike.",
      icon: AlertCircle,
    },
    {
      title: "Rest Before Examination",
      desc: "Allow 5–10 minutes of calm sitting after travel before the Vaidya takes your pulse reading.",
      icon: Clock,
    },
    {
      title: "Disclose Current Medications",
      desc: "Inform the doctor of any ongoing modern pharmaceuticals or supplements during discussion.",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      q: "Is Nadipariksha painful or invasive?",
      a: "Not at all. Nadipariksha is completely non-invasive, gentle, and relaxing. The physician simply places three fingertips lightly on your wrist over the radial artery.",
    },
    {
      q: "Why are the 1st and 15th of every month special for Nadipariksha?",
      a: "Every month on the 1st and 15th, Devdut Ayurved Clinic hosts dedicated Nadipariksha highlight sessions for first-time consultations and progress evaluations.",
    },
    {
      q: "Can pulse diagnosis detect hidden or chronic health issues?",
      a: "Yes. Classical Nadipariksha senses subtle energetic and metabolic imbalances (Ama build-up, Agni weakness, Vata/Pitta/Kapha shifts) long before symptoms manifest as full-fledged conditions.",
    },
    {
      q: "How long does a Nadipariksha session take?",
      a: "The pulse reading itself takes 5–10 minutes, followed by a comprehensive 20–30 minute consultation where Dr. Ganeshkumar Patil explains findings and prescribes a personalised plan.",
    },
  ];

  return (
    <PageShell>
      {/* Hero Header */}
      <PageHeader
        sanskrit="नाडी परीक्षा"
        title="Nadipariksha — Pulse Diagnosis That Listens to Your Body."
        intro="The ancient Ayurvedic art of reading radial pulse waves to uncover your true constitution, root cause of health issues, and dosha balance. Precise. Personal. Practiced over 26+ years."
        image={nadi2}
      />

      {/* Monthly Promo Banner */}
      <section className="container-page py-8">
        <Reveal>
          <motion.div
            animate={{
              borderColor: [
                "rgba(201, 168, 76, 0.4)",
                "rgba(201, 168, 76, 0.8)",
                "rgba(201, 168, 76, 0.4)",
              ],
              boxShadow: [
                "0 10px 30px -10px rgba(26, 58, 42, 0.5), 0 0 0 0 rgba(201, 168, 76, 0)",
                "0 10px 40px -5px rgba(26, 58, 42, 0.6), 0 0 25px 2px rgba(201, 168, 76, 0.25)",
                "0 10px 30px -10px rgba(26, 58, 42, 0.5), 0 0 0 0 rgba(201, 168, 76, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-3xl border bg-forest-gradient text-[var(--parchment)] p-8 md:p-10 shadow-elegant"
          >
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
              <div>
                {/* Badge with pulse dot */}
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--forest-deep)] mb-3">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--forest-deep)] opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-[var(--forest-deep)]" />
                  </span>
                  Special Offer
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--parchment)]">
                  Free Nadi Pariksha
                </h2>
                <p className="mt-2 text-[var(--parchment)]/85 max-w-xl text-sm md:text-base leading-relaxed">
                  Reserve your dedicated pulse-diagnosis slot with Dr. Ganeshkumar Patil — available on the{" "}
                  <strong className="text-[var(--gold)]">1st &amp; 15th</strong> of every month.
                </p>
              </div>

              {/* Right side fee card + button */}
              <div className="flex flex-col gap-3.5 w-full max-w-md lg:ml-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(201, 168, 76, 0.4)",
                      "0 0 0 10px rgba(201, 168, 76, 0)",
                      "0 0 0 0 rgba(201, 168, 76, 0)",
                    ],
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border border-[var(--gold)]/50 bg-[var(--gold)]/15 backdrop-blur-sm p-5"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="text-[var(--gold)] text-xs uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <Sparkles className="size-3 text-[var(--gold)]" /> Registration Fee
                    </div>
                    <span className="relative flex size-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                      <span className="relative inline-flex rounded-full size-2 bg-[var(--gold)]" />
                    </span>
                  </div>
                  <div className="font-display text-3xl font-bold text-[var(--gold)]">
                    ₹50
                  </div>
                  <p className="text-[var(--parchment)]/80 text-xs mt-1.5 leading-relaxed">
                    Register now and visit us for your Free Nadi Pariksha.
                  </p>
                </motion.div>

                <NadiparikshaBookingDialog
                  trigger={
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient text-[var(--forest-deep)] font-semibold py-3.5 px-7 shadow-gold cursor-pointer hover:opacity-95 transition-opacity text-sm">
                      Register for Free Nadi Pariksha <ArrowRight className="size-4" />
                    </button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* Interactive Daily Nadi Pariksha Highlight */}
      <section className="container-page pb-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--gold)]/30 bg-[var(--cream)]">
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] p-6 md:p-12 items-center">
              
              {/* Left Column: Quote, Context, Details, Booking */}
              <div className="flex flex-col justify-center">
                {/* Classical Sanskrit Quote */}
                <div className="mb-4">
                  <div className="font-sanskrit text-sm md:text-base text-[var(--copper)] font-semibold tracking-wide">
                    “रोगमादौ परीक्षेत ततोऽनन्तरमौषधम्”
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-[var(--muted-foreground)] mt-1">
                    “First understand the root imbalance, only then administer the cure.” — Charaka Samhita
                  </div>
                </div>

                <h2 className="font-display text-3xl md:text-5xl leading-tight text-[var(--forest-deep)]">
                  Nadi Pariksha – Pulse Diagnosis
                </h2>

                <p className="mt-4 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl">
                  Experience the ancient Ayurvedic science of Nadi Pariksha for a holistic understanding of your health, vital organs, and constitutional balance.
                </p>

                {/* Timing & Fee badges */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-[var(--border)] bg-[var(--parchment)] px-4 py-3">
                    <span className="grid size-9 place-items-center rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)]">
                      <Clock className="size-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">Available Daily</div>
                      <div className="text-sm font-semibold text-[var(--forest-deep)]">9:00 AM – 11:00 AM</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 px-4 py-3">
                    <span className="grid size-9 place-items-center rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)]">
                      <IndianRupee className="size-4" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--forest-deep)]/80 font-medium">Consultation Fee</div>
                      <div className="text-lg font-display font-bold text-[var(--forest-deep)]">₹300</div>
                    </div>
                  </div>
                </div>

                {/* Empty Stomach Notice */}
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-4 py-3.5">
                  <Sun className="size-5 text-[var(--gold)] mt-0.5 shrink-0" />
                  <p className="text-xs md:text-sm text-[var(--forest-deep)] leading-relaxed">
                    <strong>Empty stomach recommended:</strong> Nadi Pariksha is performed on an empty stomach for clear, accurate Ayurvedic assessment.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-7">
                  <BookAppointmentDialog
                    trigger={
                      <button className="inline-flex items-center gap-2 rounded-full bg-forest-gradient text-[var(--parchment)] font-semibold py-3.5 px-7 text-sm cursor-pointer hover:opacity-95 transition-opacity">
                        Book Nadi Pariksha · ₹300 <ArrowRight className="size-4" />
                      </button>
                    }
                  />
                </div>
              </div>

              {/* Right Column: Non-card, Rich highlighted breakdown */}
              <div className="lg:pl-8 lg:border-l border-[var(--border)] space-y-6">
                <div className="border-b border-[var(--border)] pb-4">
                  <div className="text-xs uppercase tracking-widest text-[var(--copper)] font-bold mb-1">
                    ◈ The Diagnostic Insight
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[var(--forest-deep)]">
                    What Dr. Patil Reads Through Your Pulse
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Point 1 */}
                  <div className="flex gap-4 items-start">
                    <div className="grid size-9 place-items-center rounded-xl bg-[var(--forest-deep)] text-[var(--gold)] shrink-0 font-display text-sm font-bold mt-0.5">
                      01
                    </div>
                    <div>
                      <h4 className="font-display text-base md:text-lg text-[var(--forest-deep)] font-semibold">
                        Tridosha Imbalance Mapping
                      </h4>
                      <p className="mt-1 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                        Reads exact levels of Vata (movement &amp; nerves), Pitta (metabolism &amp; heat), and Kapha (structure &amp; lubrication) across superficial and deep arterial channels.
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex gap-4 items-start">
                    <div className="grid size-9 place-items-center rounded-xl bg-[var(--forest-deep)] text-[var(--gold)] shrink-0 font-display text-sm font-bold mt-0.5">
                      02
                    </div>
                    <div>
                      <h4 className="font-display text-base md:text-lg text-[var(--forest-deep)] font-semibold">
                        Prakriti &amp; Vikriti Assessment
                      </h4>
                      <p className="mt-1 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                        Distinguishes your inborn constitutional blueprint from current lifestyle-induced distortions, pinpointing hidden Ama (metabolic toxins).
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex gap-4 items-start">
                    <div className="grid size-9 place-items-center rounded-xl bg-[var(--forest-deep)] text-[var(--gold)] shrink-0 font-display text-sm font-bold mt-0.5">
                      03
                    </div>
                    <div>
                      <h4 className="font-display text-base md:text-lg text-[var(--forest-deep)] font-semibold">
                        Organ &amp; Dhatu Health Signals
                      </h4>
                      <p className="mt-1 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                        Detects early strain in vital organ systems (liver, kidneys, digestion, circulation) before physical symptoms manifest.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Daily Morning Window Accent */}
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--forest-deep)] flex-wrap gap-2">
                  <span className="font-semibold text-[var(--copper)]">Daily Morning Window:</span>
                  <span className="text-[var(--muted-foreground)]">9:00 AM – 11:00 AM for purest pulse clarity</span>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </section>

      {/* Understanding Nadipariksha Section (Split Grid with Content Image) */}
      <section className="container-page py-16 border-b border-[var(--border)]/40">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Text Column */}
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">The Science of Nadi</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Listening to the Body's Internal Rhythm
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, <strong className="text-[var(--forest-deep)]">Nadipariksha</strong> is much more than checking pulse rate. By placing three fingers over the radial artery, Dr. Ganeshkumar Patil perceives subtle vibrational frequencies, temperature, and pulse wave speed to detect imbalances before symptoms manifest.
              </p>

              <div className="pt-2">
                <ul className="space-y-3">
                  {[
                    "Palpates Vata, Pitta & Kapha at 3 radial artery depths",
                    "Maps native Prakriti (constitution) vs current Vikriti (imbalance)",
                    "Forms the mandatory foundation of every personalised treatment plan",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3.5 text-sm md:text-base">
                      <CheckCircle2 className="size-5 text-[var(--gold)] mt-0.5 shrink-0" />
                      <span className="text-[var(--foreground)] font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image Column with increased height & vintage gold frame */}
            <div className="relative">
              <div className="absolute -inset-3 rounded-[36px] border border-[var(--gold)]/30 pointer-events-none scale-[1.01] hidden sm:block" />
              <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] shadow-elegant group h-[480px] md:h-[560px]">
                <img
                  src={nadi1}
                  alt="Authentic Ayurvedic Nadipariksha pulse diagnosis session at Devdut Ayurved Clinic"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/90 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The 3 Dosha Movements in Pulse Diagnosis */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="eyebrow mb-2">Tridosha Diagnostics</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)]">
                The Three Pulse Movements &amp; What They Reveal
              </h2>
              <p className="mt-4 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
                Ancient Ayurvedic texts describe the three fundamental pulse movements as animal motions, each felt under a specific finger along the radial artery.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {doshaPulses.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.1}>
                <div className={`h-full rounded-3xl border ${d.border} ${d.color} bg-[var(--parchment)] p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover-lift`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-sans font-semibold tracking-wider uppercase px-3 py-1 rounded-full border ${d.badgeBg}`}>
                        {d.finger}
                      </span>
                      <Activity className={`size-5 ${d.accent}`} />
                    </div>
                    <h3 className="font-display text-2xl text-[var(--forest-deep)] mb-1">
                      {d.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--copper)] mb-4 italic">
                      {d.sanskrit}
                    </p>

                    <div className="space-y-3 border-t border-[var(--border)]/60 pt-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block mb-0.5">
                          Pulse Quality
                        </span>
                        <p className="text-xs md:text-sm font-medium text-[var(--foreground)]">
                          {d.quality}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block mb-0.5">
                          Key Clinical Indications
                        </span>
                        <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                          {d.reveals}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed Split Banner (Why Choose Devdut Nadipariksha) */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[540px]">
          {/* Left: Image Block */}
          <div className="relative min-h-[360px] lg:min-h-full w-full">
            <img
              src={nadi5}
              alt="Ayurvedic doctor conducting consultation and pulse diagnosis"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--forest-deep)]/30 to-[var(--forest-deep)] lg:block hidden" />
          </div>

          {/* Right: Content Block */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-16 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0 text-[var(--parchment)]">
            <Reveal>
              <div className="text-xs uppercase tracking-widest text-[var(--gold)] font-bold mb-3">
                Why Nadipariksha First?
              </div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--parchment)] leading-tight mb-5">
                Targeting the Root Cause, Not Just the Symptom
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-6">
                Two patients with the same symptom (e.g. chronic acidity or joint pain) may have completely different dosha imbalances. Nadipariksha reveals whether your issue stems from Vata aggravation, Pitta heat, or Kapha congestion — ensuring your treatment is personalized with exact precision.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <BookAppointmentDialog
                  trigger={
                    <button className="rounded-full bg-gold-gradient text-[var(--forest-deep)] font-semibold py-3 px-6 text-sm shadow-gold cursor-pointer hover:opacity-95 transition-opacity">
                      Book Consultation Now
                    </button>
                  }
                />
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--parchment)]/30 px-6 py-3 text-sm font-medium text-[var(--parchment)] hover:bg-white/10 transition-colors"
                >
                  Meet Dr. Patil <UserCheck className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The 4-Step Consultation Journey */}
      <section className="container-page py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-2">The Process</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">
              Your Nadipariksha Session Journey
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, idx) => (
            <Reveal key={s.step} delay={idx * 0.08}>
              <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 flex flex-col justify-between hover-lift">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl text-[var(--gold)]">{s.step}</span>
                    <div className="size-10 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center">
                      <s.icon className="size-5" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-[var(--forest-deep)] mb-2">{s.title}</h3>
                  <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Guidelines & Preparation */}
      <section className="bg-[var(--cream)] border-t border-[var(--border)] py-16">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="eyebrow mb-2">Patient Guidance</div>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--forest-deep)]">
                Preparing for Your Pulse Diagnosis
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((g, idx) => (
              <Reveal key={g.title} delay={idx * 0.05}>
                <div className="rounded-2xl border border-[var(--border)]/70 bg-[var(--parchment)] p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <g.icon className="size-5 text-[var(--copper)] shrink-0" />
                    <h4 className="font-display text-sm md:text-base text-[var(--forest-deep)]">{g.title}</h4>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Clinic Consultation Gallery */}
      <section className="container-page py-20 border-t border-[var(--border)]/40">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="eyebrow mb-2">Authentic Clinical Practice</div>
            <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)]">
              Nadipariksha at Devdut Ayurved Clinic
            </h2>
            <p className="mt-4 text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed">
              Real consultation moments with Dr. Ganeshkumar Patil (BAMS, M.D.(A.M.), DNYS) conducting classical pulse diagnosis at Devdut Ayurved Clinic.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: nadi1, title: "Pulse Palpation Session", desc: "Dr. Patil reading radial artery pulse waves to assess Vata, Pitta, and Kapha." },
              { img: nadi2, title: "In-Depth Consultation", desc: "Comprehensive patient evaluation with clinic logo backdrop at Devdut Ayurved." },
              { img: nadi3, title: "Dosha & Organ Reading", desc: "Determining native constitution (Prakriti) vs current imbalance (Vikriti)." },
              { img: nadi4, title: "Personalised Guidance", desc: "Explaining Ayurvedic diagnostic insights and prescribing herbal formulations." },
              { img: nadi5, title: "Diagnostic Pulse Check", desc: "Fine-tuned radial pulse palpation for early disease prevention." },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-subtle hover-lift">
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-[var(--forest-deep)]">{item.title}</h3>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FAQs Section */}
      <section className="container-page py-20 border-t border-[var(--border)]/40">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-2">Questions &amp; Answers</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">
              Frequently Asked Questions
            </h2>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <Reveal key={faq.q} delay={idx * 0.05}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-display text-base md:text-lg text-[var(--forest-deep)] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`size-5 text-[var(--gold)] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)]/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Callout */}
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
              Ready to Experience Classical Pulse Diagnosis?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Uncover your true constitution (Prakriti) and root cause of health imbalances. Join us on the <strong>{SITE.nadiparikshaDates}</strong> for dedicated pulse diagnosis slots under Dr. Ganeshkumar Patil (BAMS, M.D.(A.M.), DNYS, M.D. (EH)).
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
    </PageShell>
  );
}
