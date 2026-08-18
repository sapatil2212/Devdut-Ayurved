import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight, Calendar, Compass, BookOpen, Flame, ShieldAlert, Sparkles, Heart, Activity, Leaf, Moon, Flower2, Baby, Shield, Zap, Stethoscope, Salad, PersonStanding, ClipboardList, User, Users, Droplets, Scale, TrendingUp, Wind, HeartPulse, Pill, Waves, Brain } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import { TREATMENTS } from "@/lib/treatments";
import { getTreatmentSeo } from "@/lib/treatment-seo";
import therapyImg from "@/assets/therapy.jpg";
import panchkarmaHeroImg from "@/assets/panchkarma-hero.png";
import treatmentsImg from "@/assets/treatments.jpg";
import templeImg from "@/assets/temple.jpg";
import doctorImg from "@/assets/doctor-2.png";
import whyChooseUsImg from "@/assets/panchkarma/why-choose-us.png";
import nasyaImg from "@/assets/panchkarma/nasya.png";
import raktmokshanImg from "@/assets/panchkarma/raktmokshan.png";
import virechanaImg from "@/assets/panchkarma/virechana.png";
import bastiImg from "@/assets/panchkarma/basti.png";
import vamanaImg from "@/assets/panchkarma/vamana.png";
import greenEarthImg from "@/assets/green-earth.png";
import wellnessGlowImg from "@/assets/wellness-glow.png";
import skinHairImg from "@/assets/treatments/skin-hair.png";
import skinHeroShirodharaImg from "@/assets/treatments/skin-hero-shirodhara.png";
import humanHealthImg from "@/assets/treatments/human-Health.png";
import jointImg from "@/assets/treatments/joint.png";
import jointArthritisImg from "@/assets/treatments/joint-arthritis.png";
import jointPainCareImg from "@/assets/treatments/joint-pain-care.png";
import migraineImg from "@/assets/treatments/migraine.png";
import childImg from "@/assets/treatments/child.png";
import digestiveImg from "@/assets/treatments/digestive.png";
import lifestyleChronicImg from "@/assets/treatments/Lifestyle-Chronic.png";
import aboutHeroImg from "@/assets/about-hero.png";
import homeAboutImg from "@/assets/home-about.png";
import paralysisAboutImg from "@/assets/treatments/paralysis-about.png";
import paralysisBenefitsImg from "@/assets/treatments/paralysis-benefits.png";
import paralysisImg from "@/assets/treatments/paralysis.png";
import paralysisHemiplegiaImg from "@/assets/treatments/paralysis-hemiplegia.png";
import paralysisParaplegiaImg from "@/assets/treatments/paralysis-paraplegia.png";
import paralysisStrokeImg from "@/assets/treatments/paralysis-stroke.png";
import paralysisFacialImg from "@/assets/treatments/paralysis-facial.png";
import mentalHealthAboutImg from "@/assets/treatments/mental-health-about.png";
import mentalHealthBenefitsImg from "@/assets/treatments/mental-health-benefits.png";
import mentalAnxietyImg from "@/assets/treatments/mental-anxiety.png";
import mentalInsomniaImg from "@/assets/treatments/mental-insomnia.png";
import mentalBurnoutImg from "@/assets/treatments/mental-burnout.png";
import mentalNightmaresImg from "@/assets/treatments/mental-nightmares.png";
import kidneyCareImg from "@/assets/treatments/kidney-care.png";
import kidneyRenalCalculiImg from "@/assets/treatments/kidney-renal-calculi.png";
import kidneyRenalFailureImg from "@/assets/treatments/kidney-renal-failure.png";
import kidneyUrinaryTractImg from "@/assets/treatments/kidney-urinary-tract.png";
import kidneyRecurrentStonesImg from "@/assets/treatments/kidney-recurrent-stones.png";
import kidneyEdemaFluidImg from "@/assets/treatments/kidney-edema-fluid.png";
import kidneyPostProcedureImg from "@/assets/treatments/kidney-post-procedure.png";
import kidneyMethodologyImg from "@/assets/treatments/kidney-methodology.png";
import kidneyBenefitsImg from "@/assets/treatments/kidney-benefits.png";
import kidneySacredHealingImg from "@/assets/treatments/kidney-sacred-healing.png";


export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = TREATMENTS.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => {
    const seo = loaderData
      ? getTreatmentSeo(loaderData.slug, loaderData.name, loaderData.short)
      : null;
    return {
      meta: [
        { title: `${loaderData?.name ?? "Treatment"} | Ayurvedic Treatment in Pune — Devdut Ayurved` },
        { name: "description", content: seo?.metaDescription ?? loaderData?.short ?? "" },
        { property: "og:title", content: `${loaderData?.name} — Devdut Ayurved Clinic` },
        { property: "og:description", content: seo?.metaDescription ?? loaderData?.short ?? "" },
        { property: "og:url", content: `/treatments/${loaderData?.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/treatments/${loaderData?.slug}` }],
      scripts: seo
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalWebPage",
                name: loaderData?.name,
                description: seo.metaDescription,
                about: loaderData?.name,
                url: `/treatments/${loaderData?.slug}`,
                mainEntity: {
                  "@type": "FAQPage",
                  mainEntity: seo.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              }),
            },
          ]
        : undefined,
    };
  },
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

  if (t.slug === "paralysis") {
    return (
      <PageShell>
        <ParalysisSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "mental-health") {
    return (
      <PageShell>
        <MentalHealthSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "respiratory") {
    return (
      <PageShell>
        <RespiratorySpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "agnikshar") {
    return (
      <PageShell>
        <AgniksharSpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  if (t.slug === "kidney") {
    return (
      <PageShell>
        <KidneySpecialDetail t={t} related={related} />
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Full-bleed image hero — title + description only */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img
          src={therapyImg}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">{t.name}</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">{t.sanskrit || "Classical Ayurvedic Care"}</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              {t.short}
            </p>
          </Reveal>
        </div>
      </section>

      <GenericTreatmentSeoBody t={t} related={related} />
    </PageShell>
  );
}

function GenericTreatmentSeoBody({ t, related }: { t: any; related: any[] }) {
  const seo = getTreatmentSeo(t.slug, t.name, t.short);
  const [activeTab, setActiveTab] = useState(0);

  const icons = [Activity, Shield, HeartPulse, Sparkles, Brain, Leaf, Zap, Heart];

  const conditionsData = seo.conditions.map((c, i) => ({
    tab: c.name.split(" ")[0] || c.name,
    Icon: icons[i % icons.length],
    heading: c.name,
    intro: c.desc,
    image: i % 2 === 0 ? therapyImg : humanHealthImg,
    points: [
      "Root Cause Clinical Diagnostics",
      "Prakriti-Specific Formulations",
      "Dosha Imbalance Pacification",
      "Tissue Vitality & Channel Clearance",
      "Natural Immunity Strengthening",
      "Long-Term Relapse Prevention",
    ],
  }));

  const approachSteps = (t.approach || []).map((step: string, i: number) => ({
    step: String(i + 1).padStart(2, "0"),
    title: step.split(" — ")[0] || step.split(" for ")[0] || step,
    desc: step,
  }));

  const benefitsList = (t.benefits || []).map((b: string, i: number) => ({
    num: String(i + 1).padStart(2, "0"),
    title: b,
    desc: `Classical Ayurvedic ${t.name} protocols focus on ${b.toLowerCase()} by addressing deep-seated Dosha imbalances and supporting natural digestive fire (Agni).`,
  }));

  const active = conditionsData[activeTab] || conditionsData[0];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Understanding Therapy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding {t.name}</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                {seo.overviewTitle}
              </h2>
              {seo.overview.map((p, i) => (
                <p key={i} className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  {p}
                </p>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={humanHealthImg}
                alt={seo.overviewTitle}
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      {conditionsData.length > 0 && (
        <section className="container-page py-16">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">{seo.conditionsTitle}</h2>
              <Ornament className="mt-3" />
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
            {conditionsData.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  activeTab === i
                    ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                    : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
                }`}
              >
                <c.Icon className="size-3.5" />
                {c.tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                    <active.Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {active.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                        <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                        <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
                <img
                  src={active.image}
                  alt={active.heading}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={treatmentsImg} alt={`Ayurvedic ${t.name}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic {t.name}?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                {seo.why[0] || `Ayurveda treats ${t.name.toLowerCase()} at the root cause — balancing Doshas, clearing channels, and promoting sustainable, natural recovery without harmful side effects.`}
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section (One side image, one side content) */}
      {approachSteps.length > 0 && (
        <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
          <div className="container-page">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                  <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                  <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                    Our Treatment Approach
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                    Every patient receives a step-by-step Ayurvedic care protocol based on pulse diagnosis (Nadipariksha), health history, and Prakriti evaluation:
                  </p>

                  <div className="divide-y divide-[var(--border)]/50 pt-2">
                    {approachSteps.map((s: any, i: number) => (
                      <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                          {s.step}
                        </span>
                        <div>
                          <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                  <img
                    src={therapyImg}
                    alt={`Ayurvedic ${t.name} Methodology`}
                    loading="lazy"
                    className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Benefits Section (One side content, one side image) */}
      {benefitsList.length > 0 && (
        <section className="container-page py-20 border-b border-[var(--border)]/30">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={humanHealthImg}
                  alt={`Benefits of Ayurvedic ${t.name}`}
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>

              <div className="space-y-6 order-1 lg:order-2">
                <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Benefits of Ayurvedic Care
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Our holistic treatment protocols help restore vital balance, build long-term immunity, and improve everyday quality of life naturally.
                </p>
                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {benefitsList.map((b: any) => (
                    <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {b.num}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to begin your wellness journey?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every treatment program is tailored to your body constitution (Prakriti) and current health state under senior Ayurvedic guidance.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
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


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-5xl md:text-6xl text-[var(--gold)] mb-2 italic">Panchakarma</span>
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
                Unlike a regular spa treatment, Panchakarma is a personalized medical therapy performed in three stages — preparation, detoxification, and rejuvenation — under expert Ayurvedic supervision to support long-term health and vitality.
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
    </div>
  );
}

function SkinSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const skinConditionsData = [
    {
      tab: "Skin Care",
      Icon: Droplets,
      heading: "Dermatological & Skin Disorders (Tvak Roga)",
      intro: "Chronic skin conditions like Acne, Psoriasis, Eczema, Fungal Infections, and Cracked Heels (Padadari) are driven by internal blood toxins (Rakta Dushya), Vata dryness, and Pitta-Kaphic imbalance. We treat root causes through Raktamokshana, medicated lepas, and herbal detox.",
      image: skinHairImg,
      points: [
        "Cracked Heels Treatment (Padadari)",
        "Painful Fissured Heel Healing",
        "Acne & Pimple Recovery",
        "Eczema & Inflammatory Soothing",
        "Psoriasis Flare Management",
        "Fungal Infection Prevention",
        "Blood Purification (Raktamokshana)",
        "Skin Allergy & Rash Relief",
      ],
      highlight: {
        title: "Cracked Heels Treatment (Padadari)",
        desc: "Ayurvedic care for dry, painful, fissured heels using local oleation, herbal pastes (lepas), Vata-pacifying oils, and internal nourishment to restore soft, healthy skin and prevent recurrence.",
      },
    },
    {
      tab: "Hair Care",
      Icon: Sparkles,
      heading: "Hair & Scalp Health (Kesha Roga)",
      intro: "Hair fall, premature greying, and scalp disorders stem from Vata-Pitta aggravation and poor nutrient assimilation at the hair follicle roots (Keshabhumi). Shiroabhyanga and Nasya restore hair strength.",
      image: skinHeroShirodharaImg,
      points: [
        "Hair Loss & Follicle Strengthening",
        "Premature Greying Control",
        "Dandruff & Scalp Detox",
        "Weak & Brittle Hair Repair",
        "Nourishing Shiroabhyanga",
        "Nasal Drops (Nasya Therapy)",
      ],
    },
    {
      tab: "Cosmetic & Wellness",
      Icon: Flower2,
      heading: "Natural Glow & Skin Rejuvenation (Kanti Vardhana)",
      intro: "Enhance natural radiance, anti-ageing skin elasticity, and even complexion naturally through classic Ayurvedic herbal facials (Mukhalepa) and body rejuvenation (Rasayana).",
      image: therapyImg,
      points: [
        "Natural Radiance & Glow",
        "Anti-Ageing Vitality Support",
        "Pigmentation & Tone Correction",
        "Ayurvedic Mukhalepa Facials",
        "Cellular Collagen Restoration",
        "Personalized Skincare Routine",
      ],
    },
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

  const active = skinConditionsData[activeTab];

  return (
    <div className="bg-[var(--parchment)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={skinHeroShirodharaImg}
          alt="Ayurvedic Shirodhara Therapy"
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Restore Your Natural Beauty</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">with Authentic Ayurveda</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Treating chronic skin disorders, hair concerns, and cracked heels (Padadari) from the root. Personalized therapies designed to resolve internal imbalances for radiant, lasting health.
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

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {skinConditionsData.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              {"highlight" in active && active.highlight && (
                <div className="mb-6 rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-1.5">Featured Treatment</div>
                  <h4 className="font-display text-xl text-[var(--forest-deep)] mb-1.5">{active.highlight.title}</h4>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{active.highlight.desc}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
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
    </div>
  );
}

function RespiratorySpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const respiratoryConditionsData = [
    {
      tab: "Asthma & Bronchitis",
      Icon: Wind,
      heading: "Asthma & Chronic Bronchitis (Tamaka Shwasa)",
      intro: "Chronic breathlessness, wheezing, and chest tightness driven by Kapha accumulation and Vata obstruction in Pranavaha Srotas (respiratory channels). Addressed through gentle lung cleansing, herbs, and steam therapy.",
      image: vamanaImg,
      points: [
        "Bronchial Channel Airway Expansion",
        "Mucus & Phlegm Clearing (Kaphaghna)",
        "Inhaler Dependency Reduction",
        "Chest Tightness Relief",
        "Herbal Lung Tonics (Agastya Haritaki)",
        "Daily Breathwork & Pranayama",
      ],
    },
    {
      tab: "Sinusitis & Rhinitis",
      Icon: Droplets,
      heading: "Sinusitis & Allergic Rhinitis (Pinasa)",
      intro: "Persistent nasal congestion, sneezing, watery eyes, and facial pressure caused by allergic triggers and Kapha blockage in nasal passages. Cured at the root with nasal oil drops (Nasya).",
      image: nasyaImg,
      points: [
        "Nasya Herbal Oil Droplet Therapy",
        "Sinus Cavity Clearing & Drainage",
        "Allergic Sensitivity Neutralization",
        "Facial Pressure & Headache Relief",
        "Herbal Steam Inhalation (Swedana)",
        "Immunity Boosting Rasayana",
      ],
    },
    {
      tab: "Cough & Immunity",
      Icon: ShieldAlert,
      heading: "Chronic Cough & Respiratory Immunity (Kasa Roga)",
      intro: "Recurrent dry or wet cough, post-viral airway weakness, and seasonal respiratory vulnerability. Restored through digestive fire (Agni) correction and lung-strengthening Rasayana.",
      image: lifestyleChronicImg,
      points: [
        "Recurrent Cough & Irritation Soothing",
        "Post-Viral Respiratory Recovery",
        "Lung & Diaphragm Muscle Strengthening",
        "Seasonal Immunity Defense",
        "Pippali & Sitopaladi Protocols",
        "Personalized Dietary Routine",
      ],
    },
  ];

  const approachItems = [
    { title: "Nadi & Respiratory Evaluation", desc: "In-depth constitution (Prakriti) assessment, respiratory dosha diagnostic, and lung capacity mapping.", icon: Compass },
    { title: "Herbal Lung Elixirs", desc: "Customized Kaphaghna formulations (Sitopaladi, Talisadi, Vasavaleha) to soothe airways.", icon: BookOpen },
    { title: "Nasya & Inhalation Therapies", desc: "Nasal administration of medicated oils and steam inhalation to clear blocked sinuses.", icon: Leaf },
    { title: "Diet & Anti-Allergic Nutrition", desc: "Mucus-reducing meal plans free from cold, damp, heavy, and allergic trigger foods.", icon: Heart },
    { title: "Pranayama & Breathing Pacing", desc: "Guided Ayurvedic breathwork (Anulom-Vilom, Kapalbhati) for daily lung expansion.", icon: Activity },
    { title: "Panchakarma Detox (Vamana/Virechana)", desc: "Therapeutic cleansing to eliminate deep-seated Kapha toxins when indicated.", icon: Sparkles },
    { title: "Environmental & Allergen Guidance", desc: "Practical advice on dust, pollen, and seasonal transition care.", icon: ShieldAlert },
    { title: "Long-term Immunity Follow-up", desc: "Continuous monitoring to prevent seasonal relapses and build lasting vitality.", icon: CheckCircle2 }
  ];

  const active = respiratoryConditionsData[activeTab];

  return (
    <div className="bg-[var(--parchment)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={wellnessGlowImg}
          alt="Ayurvedic Respiratory Care Therapy"
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Cleanse &amp; Breathe Freely</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">Classical Ayurvedic Respiratory Care</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Treating Asthma, Sinusitis, Allergic Rhinitis, and Chronic Cough from the root. Nasya therapy, steam inhalation, and Kaphaghna Rasayana for clear, effortless breathing.
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
              <div className="eyebrow text-[var(--gold)]">Understanding Pranavaha Srotas</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Lung &amp; Respiratory Wellness
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, healthy breathing depends on the clarity of the respiratory channels (Pranavaha Srotas). Environmental pollution, seasonal shifts, allergens, and weak digestive fire (Agni) lead to toxin buildup (Ama) and excessive Kapha accumulation — causing airway blockage, wheezing, sinusitis, and persistent cough.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Devdut Ayurved Clinic provides gentle, authentic respiratory treatments using Nasya (nasal oil drops), medicated herbal steam, and lung-strengthening Rasayanas — helping you regain vital lung capacity and long-term allergic resistance naturally.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border)]/30">
              <img
                src={aboutHeroImg}
                alt="Ayurvedic Respiratory Wellness"
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

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {respiratoryConditionsData.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow text-[var(--gold)] mb-2">The Methodology</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                At Devdut Ayurved Clinic, every patient receives an in-depth respiratory evaluation (Nadipariksha) to map allergic triggers, Kapha-Vata imbalances, and lung capacity before customizing an authentic care protocol.
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
                We combine classical Ayurvedic lineage diagnostics with non-drowsy, root-cause herbal treatments to deliver sustainable respiratory freedom.
              </p>
            </div>

            {/* Right Column: Check list */}
            <div className="bg-[#fbf7eb]/50 rounded-3xl border border-[var(--border)]/40 p-8 md:p-10">
              <ul className="space-y-4">
                {[
                  "Personalized respiratory treatment plans",
                  "Root-cause clearing of airways & sinus channels",
                  "Safe, chemical-free & non-sedating herbal medicines",
                  "Authentic Nasya & Swedana therapies",
                  "Allergy resistance & seasonal immunity building",
                  "26+ years of classical Ayurvedic expertise",
                  "Long-term lung health & vital endurance"
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
              Whether you're experiencing chronic asthma, sinusitis congestion, seasonal allergies, or post-viral cough, Devdut Ayurved offers personalized care designed to restore easy, natural breathing.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Breathe deeply. Live fully. Reclaim vitality.
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
    { title: "Regular Growth & Health Monitoring", desc: "Continuous tracking of developmental milestones and physical health changes.", icon: CheckCircle2 },
    { title: "Parental Guidance & Home Care", desc: "Empowering parents with practical home remedies, nursing tips, and seasonal care routines.", icon: Users },
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


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
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
      intro: "Holistic Ayurvedic care for maintaining long-term women's health through personalized preventive programs, including management of white discharge (Leucorrhoea) and nightmares.",
      conditions: [
        { name: "White Discharge (Leucorrhoea)", desc: "Manage abnormal vaginal discharge naturally by improving reproductive health and immunity." },
        { name: "Nightmares", desc: "Ayurvedic care for disturbing dreams and restless sleep linked to hormonal imbalance, stress, and emotional strain." },
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
      intro: "Our Ayurvedic therapies help improve vitality, stamina, confidence, and overall reproductive health using natural herbal medicines and lifestyle modifications — including care for nightmares linked to vitality imbalance.",
      conditions: [
        { name: "Low Vitality & Energy", desc: "Restore physical strength and stamina with classical Vajikarana (aphrodisiac) Rasayana formulations." },
        { name: "Stress-Related Weakness", desc: "Address performance anxiety and mental fatigue with adaptogenic herbs and Shirodhara." },
        { name: "Nightmares", desc: "Calm the mind and reduce nightmares linked to stress, sexual weakness, and vitality imbalance." },
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
        { name: "Nightmares", desc: "Support peaceful sleep and reduce nightmares connected to stress, overwork, and vitality depletion." },
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


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col items-center justify-center pt-36 pb-16 text-center text-[var(--parchment)]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[var(--parchment)] max-w-4xl mx-auto mb-6">
              Comprehensive Ayurvedic Care for{" "}
              <span className="text-[var(--gold)]" style={{ fontStyle: "italic" }}>Lifelong Wellness</span>
            </h1>
            <p className="mt-2 max-w-2xl mx-auto text-sm md:text-base text-[var(--parchment)]/75 leading-relaxed">
              Good reproductive and hormonal health is essential for overall physical, emotional, and mental well-being.
              Our personalized Ayurvedic care supports women and men through every stage of life — including menstrual care,
              fertility, pregnancy, women's wellness, sexual weakness & vitality, and nightmares — identifying the root
              cause and restoring the body's natural balance.
            </p>
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
                hormonal imbalances, address nightmares, or improve men's vitality — we offer comprehensive Ayurvedic solutions tailored to your unique needs.
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

    </div>
  );
}

function LifestyleChronicSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const conditions = [
    {
      tab: "Diabetes",
      Icon: Droplets,
      heading: "Diabetes Management",
      intro: "Ayurveda helps manage diabetes by improving metabolism, supporting healthy blood sugar regulation, strengthening digestion, and reducing the risk of long-term complications.",
      image: lifestyleChronicImg,
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
      image: humanHealthImg,
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
      image: digestiveImg,
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
      image: homeAboutImg,
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
      image: nasyaImg,
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
      image: mentalInsomniaImg,
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
      image: vamanaImg,
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
      tab: "Jaundice & Hepatitis",
      Icon: HeartPulse,
      heading: "Jaundice & Infective Hepatitis",
      intro: "The liver plays a vital role in digestion and detoxification. Ayurveda supports jaundice management and infective hepatitis recovery through herbal medicines, dietary recommendations, and therapies that promote natural healing.",
      image: virechanaImg,
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

  const approachSteps = [
    { step: "01", title: "Prakriti & Dosha Assessment", desc: "In-depth Prakriti evaluation, Dosha analysis, medical history review, dietary habits, stress levels, and lifestyle evaluation." },
    { step: "02", title: "Classical Herbal Medicines", desc: "Authentic formulations — Guduchi, Haritaki, Triphala, Nishakathakadi — tailored to your specific chronic condition." },
    { step: "03", title: "Panchakarma Detox", desc: "Targeted cleansing procedures like Virechana, Basti, and Udwartana to reverse deep-seated metabolic imbalances." },
    { step: "04", title: "Diet, Lifestyle & Monitoring", desc: "Condition-specific Ayurvedic diet plans, Dinacharya routines, Yoga, and regular progress reviews for sustained outcomes." },
  ];

  const benefits = [
    { num: "01", title: "Root Cause-Based Healing", desc: "Addresses the underlying Dosha imbalance rather than merely suppressing symptoms with chemical drugs." },
    { num: "02", title: "Personalized Chronic Disease Management", desc: "Every treatment plan is customized to your Prakriti, medical history, lifestyle, and health goals." },
    { num: "03", title: "Improves Metabolism & Digestion", desc: "Restores healthy Agni (digestive fire) for better nutrient absorption and metabolic efficiency." },
    { num: "04", title: "Safe & Natural Herbal Medicines", desc: "Classical Ayurvedic formulations without chemical side effects, supporting long-term organ health." },
    { num: "05", title: "Authentic Panchakarma Therapies", desc: "Targeted detox procedures to flush accumulated toxins and reverse deep metabolic imbalances." },
    { num: "06", title: "Long-Term Wellness & Prevention", desc: "Focus on sustainable healthy living through diet, daily routines, and preventive monitoring." },
  ];

  const active = conditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={doctorImg} alt="" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Restore Balance, Heal Naturally</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">जीवनशैली एवं दीर्घकालीन रोग चिकित्सा</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Modern lifestyles, unhealthy habits, stress, and irregular routines have fuelled a rise in chronic conditions. We treat the root cause — not just the symptoms — through personalized Ayurvedic care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Lifestyle Disorders</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Care for Chronic Conditions
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, lifestyle disorders arise from sustained <strong className="text-[var(--forest-deep)]">Dosha imbalances</strong> caused by poor diet, sedentary habits, chronic stress, and disrupted daily rhythms. These imbalances weaken Agni (digestive fire), leading to Ama (toxin) accumulation and chronic metabolic dysfunction.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                At Devdut Ayurved Clinic, we address diabetes, thyroid disorders, obesity, weight concerns, allergies, insomnia, acidity, and liver health through personalized herbal medicines, Panchakarma detox, and holistic lifestyle guidance.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={aboutHeroImg}
                alt="Ayurvedic Lifestyle & Chronic Care Consultation"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Specialized Chronic Care</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={panchkarmaHeroImg} alt="Ayurvedic Chronic Disease Therapy" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Chronic Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats the root cause of chronic disease — correcting Dosha imbalances, restoring metabolic fire, and eliminating deep-seated toxins for sustainable, drug-free healing.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Every patient receives a comprehensive Ayurvedic consultation to understand their Prakriti, Dosha imbalance, medical history, and lifestyle before a personalized plan is developed:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={bastiImg}
                  alt="Ayurvedic Lifestyle Chronic Care Methodology"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={therapyImg}
                alt="Benefits of Ayurvedic Chronic Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Whether managing diabetes, thyroid disorders, obesity, or chronic acidity — our holistic protocols restore metabolic balance and promote long-term disease-free living.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to manage your chronic condition naturally?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic healing is deeply personalized. Our doctors will guide you with Nadi Pariksha (pulse diagnosis) and craft a custom herbal, Panchakarma, and lifestyle plan tailored to your unique health history.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Restore balance. Renew vitality. Reclaim health.
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}



function BoneJointNeurologicalSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const conditions = [
    {
      tab: "Arthritis",
      Icon: Activity,
      heading: "Arthritis (Sandhigata Vata)",
      intro: "Arthritis causes chronic joint pain, stiffness, swelling, and cartilage wear due to Vata imbalance. Our Ayurvedic treatments focus on deep Snehana, reducing inflammation, improving joint lubrication, and enhancing flexibility naturally.",
      image: jointArthritisImg,
      points: [
        "Osteoarthritis Cartilage Support",
        "Rheumatoid Inflammation Calming",
        "Janu Basti Oil Retention Therapy",
        "Swelling & Stiffness Reduction",
        "Chronic Joint Pain Management",
        "Natural Synovial Fluid Restoration",
      ],
    },
    {
      tab: "Joint Pain",
      Icon: Heart,
      heading: "Joint Pain & Musculoskeletal Care",
      intro: "Persistent knee, shoulder, wrist, or ankle pain can severely affect daily mobility. We apply classical Abhyanga, Pinda Swedana, and Vata-pacifying herbal pastes to relieve discomfort at the root.",
      image: jointPainCareImg,
      points: [
        "Knee Pain & Degeneration Relief",
        "Shoulder & Cervical Discomfort",
        "Wrist, Elbow & Ankle Therapy",
        "Patellar Cartilage Preservation",
        "Micro-Circulation Improvement",
        "Natural Mobility Restoration",
      ],
    },
    {
      tab: "Sciatica",
      Icon: Compass,
      heading: "Sciatica & Spinal Cord Nerve Care (Gridhrasi)",
      intro: "Sciatica occurs due to nerve root compression or spinal Vata blockage, causing radiating pain, numbness, and difficulty walking. Kati Basti and spinal decompressing herbs provide fast, lasting relief.",
      image: bastiImg,
      points: [
        "Kati Basti Spinal Oil Retention",
        "Radiating Leg Pain Pacification",
        "Tingling & Numbness Reduction",
        "Spinal Nerve Root Decompression",
        "Lumbar Vertebral Column Care",
        "Postural Alignment Coaching",
      ],
    },
    {
      tab: "Migraine",
      Icon: Sparkles,
      heading: "Migraine & Headaches (Suryavarta & Shiro Roga)",
      intro: "Recurring vascular and tension headaches stem from Vata-Pitta turbulence in cerebral channels. Shirodhara, Nasya nasal drops, and Medhya Rasayana calm vascular spasms and prevent recurrent attacks.",
      image: migraineImg,
      points: [
        "Shirodhara Medicated Oil Pouring",
        "Nasya Nasal Cleansing Drops",
        "Pitta-Vata Vascular Calming",
        "Stress & Tension Relief",
        "Migraine Frequency Reduction",
        "Sleep & Rhythm Optimization",
      ],
    },
    {
      tab: "Epilepsy",
      Icon: Brain,
      heading: "Epilepsy & Neurological Support (Apasmara)",
      intro: "Supportive Ayurvedic care for brain channel stability through personalized Medhya Rasayana herbs, nervous system calming, and Dinacharya daily rhythm redesign to complement neurological recovery.",
      image: paralysisImg,
      points: [
        "Manovaha Channel Calming",
        "Cognitive Balance & Focus",
        "Stress & Overstimulation Care",
        "Medhya Rasayana Brain Tonics",
        "Sleep & Circadian Optimization",
        "Neurological Stability Support",
      ],
    },
  ];

  const approachSteps = [
    { step: "01", title: "Nadipariksha & Postural Evaluation", desc: "Detailed pulse diagnosis to map Vata aggravation, joint degeneration, and spine alignment baseline." },
    { step: "02", title: "Abhyanga & Swedana Snehana", desc: "Warm medicated oil application followed by herbal steam to soften stiff muscle and joint tissues." },
    { step: "03", title: "Kati / Janu / Greeva Basti", desc: "Localized retention of warm herbal oil over knee, back, or neck to deeply lubricate joint cartilage." },
    { step: "04", title: "Rasayana & Rehab Coaching", desc: "Potent herbal elixirs (Shalaki, Guggulu) paired with gentle movement routines to preserve lifelong mobility." },
  ];

  const benefits = [
    { num: "01", title: "Natural Pain Relief Without Steroids", desc: "Provides deep structural comfort without reliance on chemical painkillers or harsh anti-inflammatory drugs." },
    { num: "02", title: "Restores Joint Lubrication & Cartilage", desc: "Promotes natural synovial fluid retention and nourishes bone tissue (Asthi Dhatu) at the cellular level." },
    { num: "03", title: "Reduces Inflammation & Swelling", desc: "Eases morning joint stiffness, localized swelling, and chronic inflammatory flare-ups." },
    { num: "04", title: "Decompresses Sciatic & Nerve Roots", desc: "Relieves radiating leg pain, lower back discomfort, and spinal numbness gently." },
    { num: "05", title: "Improves Mobility & Daily Strength", desc: "Enables comfortable walking, stair climbing, and active independent movement." },
    { num: "06", title: "Prevents Relapse & Degeneration", desc: "Sustained Rasayana therapy preserves joint health and prevents age-related wear and tear." },
  ];

  const active = conditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={jointImg} alt="Ayurvedic Joint & Neurological Care" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Bone, Joint &amp; Neurological Care</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">अस्थि-सन्धि-स्नायु चिकित्सा</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Addressing the root cause of Vata imbalances, joint degeneration, sciatica, migraine, and nerve pain through Kati Basti, Abhyanga, and Rasayana support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Therapy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Sandhigata Vata</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Care for Joint Pain &amp; Nerve Concerns
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, bone, joint, and nerve disorders — known as <strong className="text-[var(--forest-deep)]">Sandhigata Vata</strong> and Vata Vyadhi — stem from aggravated Vata dosha causing dry, stiff, inflamed joints and nerve compression.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                At Devdut Ayurved Clinic, our specialized protocols combine warm medicated oil pooling (Kati, Janu &amp; Greeva Basti), Abhyanga, Pinda Swedana poultice therapy, and classical Vata-pacifying herbs to lubricate joints, relieve nerve pain, and rebuild strength naturally.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={jointImg}
                alt="Ayurvedic Joint Care & Basti Therapy"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Bone, Joint &amp; Neurological Concerns</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={paralysisAboutImg} alt="Ayurvedic Joint Care Therapy" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Joint Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats bone, joint, and nerve disorders at the root cause — nourishing dried cartilage, easing nerve compression, and promoting pain-free mobility without dependency on painkillers.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section (One side image, one side content) */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Every patient receives a step-by-step Ayurvedic musculoskeletal &amp; neuro care protocol based on pulse diagnosis (Nadipariksha), postural analysis, and Prakriti evaluation:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={bastiImg}
                  alt="Ayurvedic Joint Care Methodology & Kati Basti"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section (One side content, one side image) */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={whyChooseUsImg}
                alt="Benefits of Ayurvedic Joint Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Our holistic joint and nerve protocols help restore vital mobility, lubricate cartilage, and improve everyday quality of life naturally.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to reclaim pain-free movement?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every joint and nerve treatment program is tailored to your body constitution (Prakriti) and mobility state under senior Ayurvedic guidance.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function PreventiveCareSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const conditions = [
    {
      tab: "Heart Health",
      Icon: Heart,
      heading: "Heart Health Support",
      intro: "A healthy heart is essential for a healthy life. Our Ayurvedic approach focuses on improving overall cardiovascular wellness through balanced nutrition, herbal medicines, stress management, and healthy lifestyle practices.",
      image: humanHealthImg,
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
      image: skinHeroShirodharaImg,
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
      image: mentalHealthAboutImg,
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
      image: digestiveImg,
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
      image: mentalHealthBenefitsImg,
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
      image: skinHairImg,
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

  const approachSteps = [
    { step: "01", title: "Prakriti & Dosha Assessment", desc: "Detailed pulse diagnosis (Nadipariksha) to map your body constitution, Agni strength, and current imbalances." },
    { step: "02", title: "Seasonal Panchakarma Detox", desc: "Purification therapies to flush accumulated toxins (Ama) and prevent seasonal allergies and chronic flare-ups." },
    { step: "03", title: "Diet & Lifestyle Redesign", desc: "Personalized Dinacharya (daily routine) and Ritucharya (seasonal regimen) with customized Ayurvedic diet plan." },
    { step: "04", title: "Rasayana & Immunity Fortification", desc: "Long-term immunomodulatory herbs and organ-protective formulations to sustain lifelong wellness." },
  ];

  const benefits = [
    { num: "01", title: "Strengthens Natural Immunity & Defense", desc: "Builds robust resistance to seasonal illness and chronic disease through Rasayana herbal protocols." },
    { num: "02", title: "Promotes Healthy & Graceful Ageing", desc: "Supports cellular vitality, tissue nourishment, and organ health for active independent living." },
    { num: "03", title: "Improves Digestion & Metabolism", desc: "Optimizes Agni (digestive fire) for better absorption, elimination, and nutritional efficiency." },
    { num: "04", title: "Reduces Risk of Lifestyle Diseases", desc: "Prevents diabetes, hypertension, cholesterol imbalance, and obesity through root-cause management." },
    { num: "05", title: "Enhances Mental & Emotional Well-being", desc: "Reduces stress, anxiety, and fatigue while improving sleep quality and emotional resilience." },
    { num: "06", title: "Sustains Long-Term Organ Health", desc: "Protects heart, liver, kidney, and respiratory function through periodic detox and herbal support." },
  ];

  const active = conditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={homeAboutImg} alt="" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Prevent Today, Thrive Tomorrow</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">स्वस्थवृत्त एवं रोगप्रतिरोध चिकित्सा</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Strengthen your body's natural defenses, improve immunity, support organ health, and prevent lifestyle-related illness through the timeless wisdom of Ayurveda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Swasthavritta</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Preventive Care & Wellness
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, prevention is known as <strong className="text-[var(--forest-deep)]">Swasthavritta</strong> — the science of maintaining health and preventing disease before it manifests. This holistic approach integrates personalized diet, daily routines, seasonal detox, and Rasayana herbs to keep the body in perfect balance.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                At Devdut Ayurved Clinic, our wellness programs include Prakriti evaluation, customized dietary prescriptions, Panchakarma detox, immunity enhancement, heart health support, and lifestyle counseling — all designed to prevent chronic illness and promote lifelong vitality.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={virechanaImg}
                alt="Ayurvedic Preventive Wellness Consultation"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Our Wellness Services</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Wellness & Preventive Care</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our program focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {active.tab === "Tumour Supportive" && (
                <p className="text-xs text-[var(--muted-foreground)] bg-[var(--cream)] border border-[var(--border)] p-3 rounded-xl italic mt-4">
                  Note: Ayurvedic supportive care complements conventional medical treatment and should not replace specialist medical advice.
                </p>
              )}
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={vamanaImg} alt="Ayurvedic Preventive Wellness Therapy" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Preventive Ayurveda?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats the root cause of illness before symptoms even appear — strengthening immunity, balancing doshas, and aligning your body with natural rhythms for lasting vitality.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Wellness Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Every patient receives a step-by-step Ayurvedic prevention protocol based on pulse diagnosis (Nadipariksha), Prakriti evaluation, and seasonal requirements:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={nasyaImg}
                  alt="Ayurvedic Preventive Wellness Methodology"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={whyChooseUsImg}
                alt="Benefits of Ayurvedic Preventive Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Preventive Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Good health is built through consistent care, balanced living, and preventive practices. Invest in your health naturally to stay active, energetic, and disease-free.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to invest in your long-term health?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every preventive wellness program is tailored to your body constitution (Prakriti) and seasonal needs under senior Ayurvedic guidance.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function DigestiveSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const conditions = [
    {
      tab: "Acidity",
      Icon: Flame,
      heading: "Acidity & Hyperacidity",
      intro: "Persistent acidity, heartburn, and acid reflux can significantly affect daily life. According to Ayurveda, excess Pitta accumulation in the stomach causes heat, sour belching, and mucosal inflammation. Our treatments cool, soothe, and cleanse the GI tract to prevent recurrence.",
      image: vamanaImg,
      points: [
        "Acid Reflux (GERD) Relief",
        "Heartburn Reduction",
        "Hyperacidity Management",
        "Sour Belching Relief",
        "Burning Sensation Relief",
        "Healing of Stomach Lining",
      ],
    },
    {
      tab: "Indigestion",
      Icon: Activity,
      heading: "Indigestion (Ajirna)",
      intro: "Poor digestion leads to bloating, heaviness, discomfort, and reduced nutrient absorption. In Ayurveda, this stems from weak digestive fire (Agni). Our treatments stimulate Agni and eliminate toxic waste (Ama) to restore healthy digestion.",
      image: digestiveImg,
      points: [
        "Indigestion Relief",
        "Bloating & Heaviness Correction",
        "Improving Poor Appetite",
        "Correcting Slow Digestion",
        "Relieving General Abdominal Discomfort",
        "Boosting Nutrient Absorption",
      ],
    },
    {
      tab: "Gastric Problems",
      Icon: Wind,
      heading: "Gastric Problems",
      intro: "Excess gas and abdominal discomfort are common signs of Vata disturbance in the intestines. Our Ayurvedic approach focuses on calming gut sensitivity, regulating digestive movement, and reducing bloating.",
      image: bastiImg,
      points: [
        "Reducing Gas Formation",
        "Bloating & Flatulence Management",
        "Abdominal Pain Relief",
        "Stomach Cramps Relief",
        "Regulating Intestinal Gas Passage",
        "Strengthening Gut Microbiome",
      ],
    },
    {
      tab: "Constipation",
      Icon: Droplets,
      heading: "Constipation",
      intro: "Chronic constipation may result from poor digestion, unhealthy eating habits, dehydration, or lifestyle factors. Ayurvedic therapies lubricate the colon, pacify dry Vata dosha, and support normal bowel habits.",
      image: virechanaImg,
      points: [
        "Regulating Bowel Movements",
        "Softening Stool Naturally",
        "Improving Intestinal Colon Lubrication",
        "Pacifying Intestinal Dryness",
        "Detoxifying colon residue",
        "Strengthening pelvic muscle tone",
      ],
    },
    {
      tab: "Piles",
      Icon: ShieldAlert,
      heading: "Piles (Hemorrhoids)",
      intro: "Ayurveda manages piles effectively by improving venous circulation, reducing inflammation in the rectal area, relieving pain, softening stool, and preventing bleeding. We treat both internal and external piles without surgery where possible.",
      image: whyChooseUsImg,
      points: [
        "Internal Piles Management",
        "External Piles Management",
        "Pain & Swelling Reduction",
        "Stopping Bleeding during Bowels",
        "Preventing Hemorrhoidal Recurrence",
        "Correcting Rectal Congestion",
      ],
    },
    {
      tab: "Fissure",
      Icon: ShieldAlert,
      heading: "Anal Fissure",
      intro: "Painful anal fissures are managed with stool softening, local healing therapies, Pitta-Vata pacification and lifestyle correction to promote tissue repair and prevent recurrence.",
      image: skinHeroShirodharaImg,
      points: [
        "Pain Relief During Bowels",
        "Tissue Healing Support",
        "Stool Softening Protocols",
        "Local Herbal Care",
        "Bleeding Control",
        "Preventing Recurrence",
      ],
    },
    {
      tab: "Fistula",
      Icon: ShieldAlert,
      heading: "Fistula-in-Ano",
      intro: "Ayurvedic care for fistula focuses on infection control, channel cleansing and classical approaches including Kshara/Agnikshar where indicated, alongside diet and bowel regulation.",
      image: templeImg,
      points: [
        "Infection Control Support",
        "Channel Cleansing Care",
        "Kshara / Agnikshar Guidance",
        "Pain & Discharge Management",
        "Bowel Regulation",
        "Long-term Prevention",
      ],
    },
    {
      tab: "Mouth Ulcers",
      Icon: Sparkles,
      heading: "Stomatitis (Mouth Ulcers)",
      intro: "Recurrent mouth ulcers are often linked to stomach heat and digestive toxin accumulation. Our treatments help soothe burning pain, promote ulcer healing, and address the underlying digestive root causes.",
      image: humanHealthImg,
      points: [
        "Relieving Mouth Ulcer Pain",
        "Reducing Oral Inflammation",
        "Faster Ulcer Healing",
        "Clearing Stomach Toxin Build-up",
        "Cooling Pitta remedies",
        "Preventing Recurrent Stomatitis",
      ],
    },
    {
      tab: "Liver Health",
      Icon: HeartPulse,
      heading: "Jaundice & Infective Hepatitis",
      intro: "The liver (Yakrit) is the site of Ranjaka Pitta, vital for blood formation, digestion, and detoxification. Ayurveda supports jaundice and infective hepatitis recovery using hepato-protective herbs and therapies that cleanse bile channels.",
      image: nasyaImg,
      points: [
        "Jaundice Management",
        "Infective Hepatitis Support",
        "Purifying Liver Bile Channels",
        "Hepato-protective Herbal Formulas",
        "Improving Fat & Nutrient Metabolism",
        "Nourishing Liver Tissue",
      ],
    },
  ];

  const approachSteps = [
    { step: "01", title: "Agni & Prakriti Assessment", desc: "Detailed evaluation of digestive fire strength (Agni), Dosha imbalances, eating habits, and stool characteristics through pulse diagnosis (Nadipariksha)." },
    { step: "02", title: "Ama-Pachana (Toxin Cleansing)", desc: "Digesting and clearing metabolic waste (Ama) using customized warm herbal decoctions and light fasting." },
    { step: "03", title: "Targeted Panchakarma Therapies", desc: "Specialized procedures like Vamana, Virechana, or Basti selected clinically to purge deep-seated gut toxins." },
    { step: "04", title: "Pathya-Apathya Diet & Routine", desc: "Personalized Ayurvedic nutrition plan focusing on correct food combinations, eating timings, and gut-mind balance." },
  ];

  const benefits = [
    { num: "01", title: "Restores Digestive Fire (Agni)", desc: "Enhances nutrient breakdown, digestion speed, and metabolic vitality naturally without dependencies." },
    { num: "02", title: "Eliminates Acidity & Reflux", desc: "Cools excess Pitta in the stomach and heals the gastric mucosal lining to prevent recurring heartburn." },
    { num: "03", title: "Relieves Gas, Bloating & Cramps", desc: "Pacifies hyperactive Vata in the colon, regulating healthy gut peristalsis and clearing trapped air." },
    { num: "04", title: "Promotes Regular, Smooth Bowels", desc: "Restores natural colon lubrication and tone, relieving chronic constipation and straining." },
    { num: "05", title: "Supports Liver Detox & Vitality", desc: "Cleanses liver bile ducts and boosts metabolic waste filtration for pure, vibrant blood circulation." },
    { num: "06", title: "Non-Surgical Piles & Fissure Care", desc: "Reduces anorectal vascular pressure, soothes inflammation, and accelerates tissue healing safely." },
  ];

  const active = conditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={digestiveImg} alt="" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Restore Healthy Digestion, Heal Naturally</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">अग्नि एवं पाचन संस्थान चिकित्सा</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              According to Ayurveda, a healthy digestive system (Agni) is the foundation of overall wellness. When digestion falters, toxins (Ama) accumulate. We treat the root cause through authentic therapies, cleansing, and classical herbs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Agni & Gut Health</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Digestive & Gastrointestinal Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, <strong className="text-[var(--forest-deep)]">Agni (digestive fire)</strong> is considered the primary gatekeeper of health. When Agni is disturbed by stress, improper diet, or irregular routines, undigested food ferments into toxic metabolic residue called Ama, leading to acidity, gas, constipation, piles, and inflammatory conditions.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                At Devdut Ayurved Clinic, we don't just suppress digestive symptoms with antacids. We reset your digestive fire, cleanse accumulated toxins through classical Panchakarma, and guide you with individualized dietary wisdom (Pathya-Apathya) for permanent gastrointestinal balance.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={vamanaImg}
                alt="Ayurvedic Digestive Care Consultation"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Digestive Care</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Conditions We Treat</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {conditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={panchkarmaHeroImg} alt="Ayurvedic Digestive Therapy" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Gut Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda heals digestion from the root cause — restoring Agni (digestive fire), cleansing toxic Ama from the gut, and providing lasting metabolic stability without chemical dependence.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Digestive Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Restoring gut health requires resetting the digestive fire (Agni) and safely purging deep-seated metabolic toxins (Ama) from the GI tract:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={bastiImg}
                  alt="Ayurvedic Digestive Care Methodology"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={whyChooseUsImg}
                alt="Benefits of Ayurvedic Digestive Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Gut Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Whether managing chronic acidity, irritable bowels, constipation, or liver congestion — our natural therapies provide long-lasting metabolic stability and healthy tissue regeneration.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to restore your digestive balance?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic gut recovery provides deep metabolic balance. Our expert Vaidyas will evaluate your Agni (digestive fire) and craft a customized cleansing and nutrition plan tailored to your health goals.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ParalysisSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const paralysisConditions = [
    {
      tab: "Hemiplegia",
      Icon: HeartPulse,
      heading: "Hemiplegia (Pakshaghata)",
      intro: "One-sided motor weakness or paralysis typically following stroke or localized brain lesion. Ayurveda focuses on nerve revivification, targeted Snehana, and muscle re-education.",
      image: paralysisHemiplegiaImg,
      points: [
        "Unilateral Muscle Nourishment",
        "Nerve Channel Clearance (Srotoshodhana)",
        "Spasticity Reduction",
        "Joint Range of Motion",
        "Targeted Basti Therapy",
        "Mobility Rehabilitation",
      ],
    },
    {
      tab: "Paraplegia",
      Icon: Shield,
      heading: "Paraplegia (Lower Body Weakness)",
      intro: "Impairment of motor or sensory function in lower extremities often stemming from spinal Vata blockage. Protocols focus on spinal Basti, Pinda Sweda, and tissue vitality.",
      image: paralysisParaplegiaImg,
      points: [
        "Spinal Vata Pacification",
        "Kati Basti Protocols",
        "Lower Limb Circulation Support",
        "Bladder & Bowel Muscle Tone",
        "Nerve Rejuvenation (Medhya Rasayana)",
        "Daily Independence Coaching",
      ],
    },
    {
      tab: "Post-Stroke Recovery",
      Icon: Activity,
      heading: "Post-Stroke Neurological Care",
      intro: "Comprehensive, step-by-step Ayurvedic neuro-rehabilitation following ischemic or hemorrhagic stroke once medical stability is achieved.",
      image: paralysisStrokeImg,
      points: [
        "Neuro-Cellular Nourishment",
        "Facial & Speech Coordination",
        "Sub-Clinical Toxin Elimination",
        "Balanced Blood & Energy Circulation",
        "Medhya Rasayana Herbs",
        "Long-term Relapse Prevention",
      ],
    },
    {
      tab: "Facial Palsy",
      Icon: Zap,
      heading: "Facial Palsy (Ardita Vata)",
      intro: "Localized facial paralysis affecting expression, chewing, and eye closure. Addressed through Nasya, Shiro-abhyanga, and gentle facial oleation.",
      image: paralysisFacialImg,
      points: [
        "Facial Nerve Stimulation",
        "Nasya Nasal Therapy",
        "Kaval & Gandusha (Medicated Gargling)",
        "Facial Muscle Tone Recovery",
        "Eye Protection Guidance",
        "Symmetrical Mobility Support",
      ],
    },
  ];

  const paralysisPillars = [
    { Icon: Stethoscope, title: "Neurological & Nadi Evaluation", desc: "Detailed pulse reading, Prakriti assessment, motor reflex mapping, and medical report review." },
    { Icon: Droplets, title: "Abhyanga & Pinda Sweda", desc: "Therapeutic warm oil massaged with medicated herbal poultices to melt stiffness and nourish nerve endings." },
    { Icon: Flame, title: "Specialized Basti Karma", desc: "Enemas with Vata-pacifying oils and decoctions to treat the primary seat of Vata in the colon." },
    { Icon: Pill, title: "Medhya & Neuro Rasayana", desc: "Potent Ayurvedic elixirs (Sameerapannaga, Ekangaveera, Brahmi) to support nerve signal transmission." },
    { Icon: PersonStanding, title: "Mobility & Rehab Coaching", desc: "Safe, passive and active movement routines aligned with modern physiotherapy goals." },
    { Icon: ClipboardList, title: "Progress & Strength Tracking", desc: "Structured periodic evaluations to adjust herbal dosages and track functional milestones." },
  ];

  const benefits = [
    { num: "01", title: "Nourishes Damaged Nerve Pathways", desc: "Deeply clears and revitalizes impaired Vatavaha Srotas to restore sensory signal flow." },
    { num: "02", title: "Reduces Muscle Spasticity & Tremors", desc: "Eases rigidity, involuntary tremors, and chronic joint stiffness through warm Snehana." },
    { num: "03", title: "Improves Voluntary Movement & Strength", desc: "Helps regain muscle tone, limb control, and active joint flexibility step by step." },
    { num: "04", title: "Supports Speech & Facial Motor Control", desc: "Enhances facial muscle symmetry, chewing coordination, and swallowing ease." },
    { num: "05", title: "Boosts Blood & Cellular Circulation", desc: "Stimulates deep tissue micro-circulation and prevents long-term muscle wasting." },
    { num: "06", title: "Promotes Rehabilitation Resilience", desc: "Empowers patients with renewed confidence, emotional stability, and body awareness." },
  ];

  const approachSteps = [
    { step: "01", title: "Nadi & Motor Assessment", desc: "Mapping current Vata imbalance, affected Dhatus, and reflex baseline." },
    { step: "02", title: "Oleation & Swedana", desc: "Snehana massages and herbal steam to soften rigid muscle channels." },
    { step: "03", title: "Basti & Nasya Therapies", desc: "Deep rectal enemas and nasal drops targeted at central nerve channels." },
    { step: "04", title: "Rasayana & Rehab Pacing", desc: "Long-term nerve-strengthening herbs alongside guided movement exercises." },
  ];

  const faqs = [
    { q: "When should Ayurvedic paralysis treatment begin after stroke?", a: "Once the patient is medically stable and cleared by their attending neurologist. Early Ayurvedic supportive care helps prevent muscle wasting and contractures." },
    { q: "Can Ayurveda help in old or long-standing paralysis cases?", a: "Yes. While early intervention yields faster results, long-standing cases benefit significantly through reduced pain, decreased stiffness, and improved daily functional independence." },
    { q: "Are therapies safe alongside modern physiotherapy?", a: "Absolutely. Our Ayurvedic therapies complement physical therapy by relaxing tight muscles, improving local blood flow, and nourishing nervous tissues." },
  ];

  const active = paralysisConditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={treatmentsImg} alt="" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Paralysis &amp; Stroke Recovery</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">Classical Ayurvedic Neuro-Rehabilitation</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Nourishing nerves, reducing spasticity, and restoring voluntary movement through Vata-pacifying therapies, Abhyanga, Basti, and Medhya Rasayana.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Therapy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Pakshaghata</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Care for Paralysis &amp; Stroke
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, paralysis is known as <strong className="text-[var(--forest-deep)]">Pakshaghata</strong> — a condition caused by severe Vata imbalance that impairs sensory and motor channels (Vatavaha Srotas). Whether resulting from ischemic stroke, spinal injury, hemiplegia, or nerve compression, Ayurveda focuses on reviving weakened nerve pathways, preventing muscle atrophy, and rekindling cellular strength.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Our specialized protocols at Devdut Ayurved Clinic integrate external oleation (Snehana), warm poultice sudation (Pinda Swedana), targeted medicated enemas (Basti), and neuro-rejuvenating herbs to support mobility and long-term recovery.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={paralysisAboutImg}
                alt="Ayurvedic Paralysis Neuro-Rehabilitation Therapy"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Neurological Concerns</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {paralysisConditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={paralysisImg} alt="Ayurvedic Neurological Rehabilitation" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Healing</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Neuro Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats nerve paralysis at the cellular level — nourishing dried channels, balancing Vata, and promoting sustainable motor recovery without invasive side effects.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section (One side image, one side content) */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Every patient receives a step-by-step Ayurvedic neuro-rehabilitation protocol based on pulse diagnosis (Nadipariksha), motor assessment, and Prakriti evaluation:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={paralysisBenefitsImg}
                  alt="Ayurvedic Pinda Sweda Poultice Therapy"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section (One side content, one side image) */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={paralysisAboutImg}
                alt="Benefits of Ayurvedic Paralysis Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Our holistic paralysis protocols help reactivate sluggish nerves, rebuild muscle strength, and improve everyday quality of life naturally.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>


      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to begin your neuro-rehabilitation journey?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every paralysis recovery program is tailored to your body constitution (Prakriti) and current mobility state under senior Ayurvedic guidance.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function MentalHealthSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const mentalConditions = [
    {
      tab: "Anxiety & Restlessness",
      Icon: Brain,
      heading: "Anxiety & Restlessness (Chitta Udvega)",
      intro: "Overactive mind, racing thoughts, and chronic worry resulting from Vata-Pitta aggravation. Addressed through nervous system calming, Shirodhara, and adaptogenic herbs.",
      image: mentalAnxietyImg,
      points: [
        "Vata Pacification in Brain Channels",
        "Nervous System Calming",
        "Panic & Worry Reduction",
        "Mental Stability Support",
        "Medhya Rasayana Herbs",
        "Pranayama & Rhythm Design",
      ],
    },
    {
      tab: "Insomnia",
      Icon: Moon,
      heading: "Insomnia & Sleep Disorders (Anidra)",
      intro: "Inability to fall or stay asleep without reliance on heavy sedatives. Shirodhara and sleep-inducing Ayurvedic herbs restore natural circadian rhythms.",
      image: mentalInsomniaImg,
      points: [
        "Natural Sleep Induction",
        "Shirodhara Oil Flow Therapy",
        "Deep Circadian Rhythm Reset",
        "Non-Habit-Forming Formulations",
        "Melatonin & Agni Harmony",
        "Restorative Sleep Quality",
      ],
    },
    {
      tab: "Burnout & Fatigue",
      Icon: Sparkles,
      heading: "Mental Burnout & Brain Fatigue",
      intro: "Exhaustion, low motivation, and cognitive depletion from prolonged stress. Rebuilt through deep Rasayana nourishment and daily pacing.",
      image: mentalBurnoutImg,
      points: [
        "Cognitive Rejuvenation",
        "Ashwagandha & Brahmi Support",
        "Focus & Retention Capacity",
        "Energy Vitality Rebuilding",
        "Stress Hormone Regulation",
        "Mental Resilience Training",
      ],
    },
    {
      tab: "Nightmares",
      Icon: ShieldAlert,
      heading: "Nightmares & Disturbed Sleep",
      intro: "Disturbing dreams and midnight awakenings linked to Pitta-Vata disturbance or emotional stress. Soothed with cooling brain formulations and bedtime rituals.",
      image: mentalNightmaresImg,
      points: [
        "Pitta Heat Neutralization",
        "Mind-Gut Axis Soothing",
        "Disturbed Sleep Prevention",
        "Peaceful Dream Cycles",
        "Bedtime Herbal Teas & Lepa",
        "Nervous System Protection",
      ],
    },
  ];

  const mentalPillars = [
    { Icon: Stethoscope, title: "Nadi & Manasika Evaluation", desc: "Pulse reading (Nadipariksha) to map Prakriti, Vata-Pitta shifts, sleep cycles, and stress triggers." },
    { Icon: Waves, title: "Shirodhara Oil Therapy", desc: "Gentle stream of warm herbal oil poured onto the third eye to trigger deep parasympathetic nervous relaxation." },
    { Icon: Pill, title: "Medhya Rasayana Elixirs", desc: "Authentic brain-nutritive herbs (Brahmi, Shankhpushpi, Jatamansi, Ashwagandha) to nourish brain channels." },
    { Icon: Salad, title: "Mind-Gut Axis Nutrition", desc: "Pitta-Vata pacifying diet that nourishes Agni and prevents gut-triggered mood spikes." },
    { Icon: PersonStanding, title: "Dinacharya & Breathwork", desc: "Practical daily routine, morning sun exposure, Pranayama, and night sleep hygiene coaching." },
    { Icon: ClipboardList, title: "Confidential Progress Reviews", desc: "Regular, compassionate follow-ups to track sleep quality, anxiety reduction, and mood stability." },
  ];

  const benefits = [
    { num: "01", title: "Induces Deep Restorative Sleep", desc: "Restores natural circadian rhythm without morning grogginess or reliance on sedatives." },
    { num: "02", title: "Calms Racing Thoughts & Anxiety", desc: "Pacifies aggravated Vata in Pranavaha Srotas to settle chronic panic and mental turbulence." },
    { num: "03", title: "Restores Cognitive Focus & Retention", desc: "Nourishes brain tissue with Medhya Rasayana herbs to clear brain fog and burnout." },
    { num: "04", title: "Soothes Nightmares & Sleep Awakenings", desc: "Cools disturbed Pitta heat in Manovaha Srotas for calm, peaceful dream cycles." },
    { num: "05", title: "Strengthens the Mind-Gut Axis", desc: "Harmonizes Agni and gut chemistry to prevent digestive-triggered emotional spikes." },
    { num: "06", title: "Promotes Long-Term Peace of Mind", desc: "Empowers sustainable daily emotional resilience, focus, and inner stability." },
  ];

  const approachSteps = [
    { step: "01", title: "Nadipariksha & Mind Reading", desc: "Determining your mental constitution (Sattva/Rajas/Tamas) and Dosha shifts." },
    { step: "02", title: "Shirodhara & Oil Therapies", desc: "Soothing forehead oil flow and scalp massage for immediate nervous system calm." },
    { step: "03", title: "Medhya Herbal Regimen", desc: "Customized brain-nourishing elixirs to repair stress-induced cellular fatigue." },
    { step: "04", title: "Sleep & Routine Redesign", desc: "Practical bedtime rituals, breathwork, and lifestyle pacing for sustained wellbeing." },
  ];

  const faqs = [
    { q: "Is Ayurvedic mental health treatment habit-forming?", a: "No. All classical Ayurvedic formulations and Medhya Rasayana herbs are completely non-addictive and work by naturally balancing nervous system chemistry." },
    { q: "How quickly can I expect better sleep with Shirodhara?", a: "Many patients experience profound relaxation during their very first Shirodhara session, with steady sleep improvement across a short 5 to 7 session series." },
    { q: "Can I take Ayurvedic mental care alongside psychiatric guidance?", a: "Yes. Our Vaidyas work safely with co-management approaches. Always consult before adjusting any prescribed modern medication." },
  ];

  const active = mentalConditions[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img src={treatmentsImg} alt="" aria-hidden className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Mental Health &amp; Emotional Care</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">Classical Shirodhara &amp; Medhya Rasayana</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Soothe the nervous system, resolve anxiety, insomnia, and burnout, and restore inner tranquility naturally.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Therapy Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Manasa Roga</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Care for Mind &amp; Brain
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, mental health is inseparable from physical Dosha balance. Modern stress, overstimulation, and broken sleep cycles disturb Vata and Pitta in the brain channels (Manovaha Srotas), triggering anxiety, insomnia, nightmares, and emotional exhaustion.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Devdut Ayurved Clinic offers gentle, authentic mental healthcare using Shirodhara, Medhya Rasayana herbs, and mind-gut axis correction — helping you regain deep rest and mental clarity without reliance on habit-forming sedatives.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={mentalHealthAboutImg}
                alt="Ayurvedic Shirodhara Mental Health Therapy"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Support (Tabs) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Emotional &amp; Cognitive Wellness</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {mentalConditions.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Full-bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img src={whyChooseUsImg} alt="Ayurvedic Mental Wellness" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">Sacred Calm</span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Mind Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats mental distress at its root — settling nervous turbulence, restoring sleep, and empowering emotional resilience naturally.
              </p>
              <BookAppointmentDialog
                trigger={
                  <button className="bg-[var(--gold)] text-[var(--forest-deep)] hover:bg-[var(--gold)]/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg cursor-pointer">
                    Book My Consultation
                  </button>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment Approach Section (One side image, one side content) */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Every patient receives a personalized mental health plan based on pulse reading (Nadipariksha), stress mapping, and sleep analysis:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {approachSteps.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={mentalHealthBenefitsImg}
                  alt="Ayurvedic Mental Wellness & Herbal Therapy"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits Section (One side content, one side image) */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={mentalHealthAboutImg}
                alt="Benefits of Ayurvedic Mental Wellness"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Mind Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Our mind care therapies promote deep relaxation, cognitive recovery, and lasting peace of mind without dependency.
              </p>
              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefits.map((b) => (
                  <div key={b.num} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA Section */}
      <section className="container-page pb-20 mt-10">
        <div className="w-full bg-[var(--forest-deep)] rounded-[30px] md:rounded-[36px] md:rounded-r-[150px] p-6 pl-10 md:p-9 md:pl-16 md:pr-10 flex flex-col md:flex-row items-center justify-between gap-8 relative border border-[var(--border)]/10">
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex-1 text-left relative z-10">
            <h2 className="font-display text-xl md:text-2xl text-[var(--parchment)] mb-2.5 leading-tight">
              Ready to experience tranquil mental wellness?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Every mental health program is customized to your body-mind constitution (Prakriti) and daily stress levels under expert Ayurvedic care.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with compassion, healing with purpose
            </p>
            <BookAppointmentDialog
              trigger={
                <button className="bg-[var(--gold)] text-[var(--forest-deep)] font-semibold py-2.5 px-6 rounded-full inline-flex items-center gap-1.5 transition-all text-xs cursor-pointer">
                  Book my Consultation <Calendar className="size-3.5" />
                </button>
              }
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.6, x: 100 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="w-36 h-36 md:w-48 md:h-48 relative shrink-0 z-20 flex items-center justify-center mr-20 md:mr-56">
            <img src={greenEarthImg} alt="Lush Green Earth Globe" className="w-full h-full object-contain scale-[2.2] md:scale-[3.0]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function AgniksharSpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const agniksharConditionsData = [
    {
      tab: "Agnikarma Pain & Spurs",
      Icon: Flame,
      heading: "Agnikarma Thermal Therapy (Vata-Kapha Shool)",
      intro: "Precision Ayurvedic thermal application (Agnikarma) using specialized metallic probes (Shalaka) to permanently relieve calcaneal heel spurs, tennis elbow, sciatica, joint stiffness, and chronic tendon pain without surgery.",
      image: therapyImg,
      points: [
        "Calcaneal Heel Spur Pain Relief",
        "Tennis Elbow & Tendinitis Care",
        "Sciatica & Nerve Root Decompression",
        "Osteoarthritis Joint Stiffness",
        "Non-Invasive Micro-Thermal Transfer",
        "Immediate Local Pain Pacification",
      ],
    },
    {
      tab: "Kshara Sutra & Anorectal",
      Icon: Zap,
      heading: "Kshara Sutra & Alkali Therapy (Arsha & Bhagandara)",
      intro: "Classical Ayurvedic parasurgical thread therapy (Kshara Sutra) and alkaline application (Kshara Karma) for fistula-in-ano, piles (haemorrhoids), anal fissures, and pilonidal sinus with minimal recurrence.",
      image: raktmokshanImg,
      points: [
        "Fistula-in-Ano (Bhagandara) Excision",
        "Non-Surgical Piles (Arsha) Shrinkage",
        "Anal Fissure (Parikartika) Healing",
        "Pilonidal Sinus Tract Clearance",
        "Gradual Cut & Cure Action",
        "Low Recurrence & Fast Recovery",
      ],
    },
    {
      tab: "Skin Lesions & Warts",
      Icon: Sparkles,
      heading: "Warts, Corns & Skin Excisional Care (Kadara & Masaka)",
      intro: "Targeted Agnikarma and Kshara application to excise painful plantar corns, stubborn viral warts, skin tags, and hypertrophic skin lesions safely without scar tissue formation.",
      image: doctorImg,
      points: [
        "Plantar Corn (Kadara) Root Removal",
        "Viral Warts & Skin Tag Cautery",
        "Non-Healing Ulcer Bed Stimulation",
        "Scarless Skin Lesion Removal",
        "Post-Procedure Herbal Dressing",
        "Blood Purifying Internal Medicine",
      ],
    },
  ];

  const approachItems = [
    { title: "Nadi & Lesion Evaluation", desc: "Detailed diagnostic assessment of the lesion, tissue depth, and patient Prakriti suitability.", icon: Compass },
    { title: "Sterile Local Preparation", desc: "Aseptic cleansing and herbal local prep to ensure complete safety and comfort.", icon: BookOpen },
    { title: "Precision Parasurgical Action", desc: "Controlled Agnikarma thermal probe or Kshara Sutra thread application.", icon: Leaf },
    { title: "Post-Procedure Herbal Dressing", desc: "Medicated ghee, honey, and Jatyadi oil dressings to accelerate tissue healing.", icon: Heart },
    { title: "Anti-Inflammatory Internal Herbs", desc: "Customized Guggulu and Raktashodhak herbs to prevent infection and swelling.", icon: Activity },
    { title: "Micro-Circulation & Tissue Repair", desc: "Stimulates natural collagen and local immunity at the cellular level.", icon: Sparkles },
    { title: "Recurrence Prevention Protocol", desc: "Specific diet, hygiene, and daily posture guidance to prevent lesion reoccurrence.", icon: ShieldAlert },
    { title: "Regular Clinical Follow-ups", desc: "Careful monitoring of wound contraction and complete healing progress.", icon: CheckCircle2 }
  ];

  const active = agniksharConditionsData[activeTab];

  return (
    <div className="bg-[var(--parchment)] text-[var(--foreground)] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        {/* Background image with overlay */}
        <img
          src={treatmentsImg}
          alt="Ayurvedic Agnikarma & Kshara Chikitsa"
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />


        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Agnikarma &amp; Kshara Sutra</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">Classical Ayurvedic Para-Surgical Care</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Precision thermal and herbal alkali therapies for chronic pain, corns, warts, heel spurs, piles, fistula, and non-healing lesions.
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
              <div className="eyebrow text-[var(--gold)]">Understanding Para-Surgical Care</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Classical Agnikarma &amp; Kshara Therapy
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, Agnikarma (thermal cauterization) and Kshara Karma (herbal alkaline application) are time-tested parasurgical procedures described in Sushruta Samhita. They provide instant pain relief and root-cause excision for deep-seated tendon, joint, and anorectal conditions where conventional oral medicines have limited reach.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Devdut Ayurved Clinic offers expert parasurgical care using sterilized gold/copper Shalakas and authentic Kshara Sutra threads — delivering safe, minimally invasive healing with fast recovery and extremely low recurrence rates.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border)]/30">
              <img
                src={raktmokshanImg}
                alt="Ayurvedic Parasurgical Therapy"
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

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {agniksharConditionsData.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Treatment Approach Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="eyebrow text-[var(--gold)] mb-2">The Methodology</div>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)] mb-4">Our Treatment Approach</h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
                At Devdut Ayurved Clinic, every parasurgical procedure is preceded by an in-depth clinical &amp; Nadi evaluation to ensure maximum precision, patient safety, and optimal recovery.
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
                We combine classical Ayurvedic parasurgical mastery with sterile modern safety standards for fast, lasting pain and lesion recovery.
              </p>
            </div>

            {/* Right Column: Check list */}
            <div className="bg-[#fbf7eb]/50 rounded-3xl border border-[var(--border)]/40 p-8 md:p-10">
              <ul className="space-y-4">
                {[
                  "Expert Ayurvedic Agnikarma & Kshara Sutra practitioners",
                  "Minimally invasive alternative to surgery",
                  "Instant pain relief for heel spurs & joint stiffness",
                  "High success rate for fistula, piles & pilonidal sinus",
                  "Scarless removal of warts, corns & skin tags",
                  "Strict sterile clinical protocol & herbal dressings",
                  "Root-cause recurrence prevention diet & guidance"
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
              Whether you're struggling with chronic heel spur pain, fistula, piles, corn, warts, or joint stiffness, Devdut Ayurved offers safe, authentic parasurgical solutions for lasting relief.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Precision healing. Permanent relief. Reclaim comfort.
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
    </div>
  );
}

function KidneySpecialDetail({ t, related }: { t: any; related: any[] }) {
  const [activeTab, setActiveTab] = useState(0);

  const kidneyConditionsData = [
    {
      tab: "Renal Calculi",
      Icon: Shield,
      heading: "Kidney Stones (Ashmari)",
      intro: "Renal calculi occur when aggravated Vata dries up Kapha in the urinary channels, forming hardened crystal stones. Our protocols use Varunadi and Pashanbhed to dissolve and expel stones safely.",
      image: kidneyRenalCalculiImg,
      points: [
        "Natural Stone Dissolution & Flushes",
        "Pashanbhed & Varunadi Formulations",
        "Ureteric Spasm & Acute Pain Relief",
        "Crystal Aggregation Prevention",
        "Urinary pH Normalization",
        "Non-Surgical Stone Management",
      ],
    },
    {
      tab: "Renal Support",
      Icon: HeartPulse,
      heading: "Chronic Kidney Support (Vrikka Roga)",
      intro: "Nourishing weakened nephrons and restoring micro-vascular filtration in the kidneys. Potent Rasayanas help maintain healthy urea and serum creatinine levels naturally.",
      image: kidneyRenalFailureImg,
      points: [
        "Nephro-Protective Cellular Support",
        "Urea & Serum Creatinine Stabilization",
        "Microalbuminuria & Protein Loss Reduction",
        "Punarnava & Rasayana Rejuvenation",
        "Glomerular Filtration (eGFR) Support",
        "Safe Integrative Co-Management",
      ],
    },
    {
      tab: "Urinary Health",
      Icon: Droplets,
      heading: "Urinary Tract Health (Mutrakrichra / UTI)",
      intro: "Burning micturition, frequent urination, and recurring UTIs arise from excess Pitta and bacteria in the urinary tract. Cooling herbal tonics soothe irritated membranes and flush infection.",
      image: kidneyUrinaryTractImg,
      points: [
        "Burning Micturition (Dysuria) Relief",
        "Chandanasava & Pitta-Cooling Tonics",
        "Recurrent Bacterial Cleansing",
        "Bladder Mucosal Soothing",
        "Natural Urinary Antiseptic Herbs",
        "Pelvic & Bladder Channel Detox",
      ],
    },
    {
      tab: "Recurrent Stones",
      Icon: Sparkles,
      heading: "Recurrent Stone Prevention",
      intro: "Breaking the chronic cycle of stone formation by correcting digestive fire (Agni), clearing metabolic Ama, and prescribing personalized low-oxalate hydration and dietary protocols.",
      image: kidneyRecurrentStonesImg,
      points: [
        "Metabolic Ama & Uric Acid Clearance",
        "Oxalate & Calcium Balance",
        "Personalized Hydration & Mineral Regimen",
        "Kulattha (Horse Gram) Dietary Protocols",
        "Long-Term Relapse Prevention",
        "Seasonal Detoxification Guidance",
      ],
    },
    {
      tab: "Edema & Fluid",
      Icon: Waves,
      heading: "Edema & Fluid Retention (Shotha)",
      intro: "Fluid accumulation causing pedal swelling and puffiness occurs when water metabolism is obstructed. Natural Ayurvedic diuretics (Mutrala) restore fluid drainage without side effects.",
      image: kidneyEdemaFluidImg,
      points: [
        "Natural Diuretic Herbal Support (Mutrala)",
        "Punarnavadi Kwath & Guggulu Therapies",
        "Pedal & Facial Swelling Relief",
        "Electrolyte Balance Maintenance",
        "Lymphatic & Venous Drainage Support",
        "Low-Sodium Ayurvedic Diet Guidance",
      ],
    },
    {
      tab: "Post-Procedure",
      Icon: Leaf,
      heading: "Post-Procedure Nephrocare",
      intro: "Accelerating internal tissue healing, overcoming fatigue, and rebuilding renal strength following lithotripsy (ESWL), PCNL surgery, or DJ stent placement.",
      image: kidneyPostProcedureImg,
      points: [
        "Post-Lithotripsy & DJ Stent Tissue Recovery",
        "Urothelial Mucosa Regeneration",
        "Anti-Inflammatory Herbal Decoctions",
        "Vital Tissue (Dhatu) Nourishment",
        "Fatigue & Weakness Overcoming",
        "Sustained Renal Vitality Plans",
      ],
    },
  ];

  const methodologyItems = [
    {
      step: "01",
      title: "Prakriti & Urinary Channel Diagnostics",
      desc: "Detailed pulse assessment (Nadipariksha) and evaluation of Mutravaha Srotas (urinary channels), stone matrix, and digestive fire."
    },
    {
      step: "02",
      title: "Targeted Lithotriptic & Nephrocare Formulations",
      desc: "Customized classical herbs like Varun, Pashanbhed, Gokshura, and Punarnava to break stone bonds and protect kidney cells."
    },
    {
      step: "03",
      title: "Gentle Cleansing & Channel Detoxification",
      desc: "Mild therapeutic purification (Virechana or Basti) to purge systemic Ama, reduce systemic acidity, and cleanse renal pathways."
    },
    {
      step: "04",
      title: "Pathya-Apathya Diet & Hydration Regimen",
      desc: "Personalized low-oxalate nutritional guidelines, electrolyte balancing, and daily fluid routines to prevent stone recurrence."
    }
  ];

  const benefitsItems = [
    {
      num: "01",
      title: "Non-Surgical Stone Expulsion & Relief",
      desc: "Facilitates natural breakdown and smooth passage of renal calculi while easing sharp spasm pain."
    },
    {
      num: "02",
      title: "Strengthens & Protects Nephrons",
      desc: "Potent nephro-protective antioxidants preserve renal micro-tubules and support healthy filtration."
    },
    {
      num: "03",
      title: "Soothes Burning & Urinary Discomfort",
      desc: "Rapidly relieves dysuria, urethral irritation, and recurrent bacterial infections with cooling tonics."
    },
    {
      num: "04",
      title: "Alleviates Fluid Retention & Swelling",
      desc: "Promotes natural, balanced fluid elimination and reduces pedal edema without synthetic diuretic fatigue."
    },
    {
      num: "05",
      title: "Prevents Chronic Stone Recurrence",
      desc: "Addresses the underlying metabolic errors and mineral accumulation for lasting kidney wellness."
    },
    {
      num: "06",
      title: "Safe Integrative Co-Management",
      desc: "Works seamlessly alongside modern diagnostic reports, ultrasound reviews, and nephrology guidance."
    }
  ];

  const active = kidneyConditionsData[activeTab];

  return (
    <div className="bg-[var(--parchment)] min-h-screen text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden -mt-20 border-b border-[var(--border)]">
        <img
          src={kidneyCareImg}
          alt="Ayurvedic Kidney and Renal Care"
          aria-hidden
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />

        <div className="container-page relative z-10 flex min-h-[60vh] flex-col justify-center pt-36 pb-20 text-center text-[var(--parchment)]">
          <Reveal>
            <h1 className="font-display leading-[1.1] max-w-4xl mx-auto">
              <span className="block text-4xl md:text-6xl text-[var(--gold)] mb-2 italic">Renal &amp; Kidney Health Care</span>
              <span className="block text-2xl md:text-3xl text-[var(--parchment)] font-sans font-light tracking-wide">वृक्क एवं मूत्र संस्थान चिकित्सा</span>
            </h1>
            <p className="mt-5 text-sm md:text-lg text-[var(--parchment)]/80 leading-relaxed max-w-3xl mx-auto">
              Ayurvedic care for renal calculi (kidney stones), renal insufficiency supportive treatment, urinary tract health, and fluid retention — personalized herbal protocols with diet and lifestyle guidance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Understanding Kidney Diseases Section */}
      <section className="container-page pt-20 pb-10 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Understanding Kidney Health</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Ayurvedic Kidney Disease Treatment in Pune
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                In classical Ayurveda, the kidneys (<strong className="text-[var(--forest-deep)]">Vrikka</strong>) are formed from the essence of blood (<strong className="text-[var(--forest-deep)]">Rakta</strong>) and fat tissue (<strong className="text-[var(--forest-deep)]">Medas</strong>), governing the vital water-carrying channels (<strong className="text-[var(--forest-deep)]">Mutravaha Srotas</strong>). Aggravated Vata, Pitta, and accumulation of metabolic toxins (<strong className="text-[var(--forest-deep)]">Ama</strong>) impair filtration, leading to stone crystallization (<strong className="text-[var(--forest-deep)]">Ashmari</strong>), burning micturition, and cellular stress on the nephrons.
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                At Devdut Ayurved Clinic, we treat kidney and urinary disorders from the root. By combining potent nephro-protective herbs (<em>Punarnava, Gokshura, Varun, Pashanbhed</em>), targeted cleansing therapies, and customized fluid and dietary regimens (<strong className="text-[var(--forest-deep)]">Pathya-Apathya</strong>), we support natural stone dissolution, restore urinary comfort, and preserve renal vitality safely.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={kidneyCareImg}
                alt="Ayurvedic Kidney Disease Treatment in Pune"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Conditions We Treat (Pill Tab Bar) */}
      <section className="container-page py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="eyebrow text-[var(--gold)] mb-2">Conditions We Treat</div>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--forest-deep)]">Kidney &amp; Urinary Conditions</h2>
            <Ornament className="mt-3" />
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {kidneyConditionsData.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[var(--forest-deep)] text-[var(--parchment)] border-[var(--forest-deep)] shadow-md"
                  : "bg-[var(--parchment)] text-[var(--muted-foreground)] border-[var(--border)] hover:border-[var(--forest-deep)]"
              }`}
            >
              <c.Icon className="size-3.5" />
              {c.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="size-12 rounded-2xl bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] flex items-center justify-center shrink-0">
                  <active.Icon className="size-6" />
                </span>
                <h3 className="font-display text-2xl text-[var(--forest-deep)]">{active.heading}</h3>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-6">{active.intro}</p>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--forest-deep)]/60 mb-3">Our treatment focuses on:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {active.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--parchment)]">
                      <span className="size-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                      <span className="text-xs font-medium text-[var(--forest-deep)]">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] group min-h-[300px] h-full shadow-sm">
              <img
                src={active.image}
                alt={active.heading}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Sacred Healing Full-Bleed Split Banner */}
      <section className="w-full bg-[var(--forest-deep)] overflow-hidden border-y border-[var(--border)]/20">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="relative min-h-[350px] lg:min-h-full w-full">
            <img
              src={kidneySacredHealingImg}
              alt="Ayurvedic Kidney Care Purification"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[var(--forest-deep)]/40 via-transparent to-transparent pointer-events-none lg:block hidden" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-20 text-left max-w-2xl lg:max-w-none mx-auto lg:mx-0">
            <Reveal>
              <span className="text-[11px] font-sans font-bold text-[var(--gold)] uppercase tracking-widest mb-3 block">
                The Sacred Healing
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[var(--parchment)] leading-[1.1] mb-6">
                Why Choose <br className="hidden sm:inline" /> Ayurvedic Kidney Care?
              </h2>
              <p className="text-sm md:text-base text-[var(--parchment)]/80 leading-relaxed mb-8 max-w-lg">
                Ayurveda treats renal and urinary conditions at their metabolic root — dissolving stone matrices naturally, reducing inflammation in micro-vascular channels, and strengthening nephron vitality without aggressive invasive dependency.
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

      {/* Methodology Section */}
      <section className="bg-[#fbf7eb] border-y border-[var(--border)] py-20">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="eyebrow text-[var(--gold)]">The Methodology</div>
                <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                  Our Treatment Approach
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                  Restoring renal health and clearing urinary channels requires a structured, personalized Ayurvedic protocol:
                </p>

                <div className="divide-y divide-[var(--border)]/50 pt-2">
                  {methodologyItems.map((s, i) => (
                    <div key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <span className="shrink-0 grid size-9 place-items-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] font-display text-sm font-bold">
                        {s.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base text-[var(--forest-deep)]">{s.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
                <img
                  src={kidneyMethodologyImg}
                  alt="Our Treatment Approach for Kidney Care"
                  loading="lazy"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="container-page py-20 border-b border-[var(--border)]/30">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[32px] border border-[var(--gold)]/20 pointer-events-none scale-[1.01] hidden sm:block" />
              <img
                src={kidneyBenefitsImg}
                alt="Benefits of Ayurvedic Kidney Care"
                loading="lazy"
                className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover rounded-3xl border border-[var(--border)]"
              />
            </div>

            <div className="space-y-6">
              <div className="eyebrow text-[var(--gold)]">Key Benefits</div>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--forest-deep)] leading-tight">
                Benefits of Ayurvedic Kidney Care
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[var(--muted-foreground)]">
                Our classical Ayurvedic approach delivers sustainable relief and long-term renal vitality:
              </p>

              <div className="divide-y divide-[var(--border)]/50 pt-2">
                {benefitsItems.map((b, i) => (
                  <div key={i} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="shrink-0 grid size-8 place-items-center rounded-full bg-[var(--forest-deep)]/10 text-[var(--forest-deep)] font-display text-xs font-bold">
                      {b.num}
                    </span>
                    <div>
                      <h4 className="font-display text-base text-[var(--forest-deep)]">{b.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Green Earth CTA */}
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
              Ready to restore natural kidney &amp; urinary health?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Whether you are managing renal calculi (kidney stones), seeking CKD supportive care, or addressing recurrent urinary discomfort, our senior Vaidyas will guide you with pulse diagnosis and customized herbal healing.
            </p>
            <p className="text-[var(--gold)]/80 italic text-[11px] md:text-xs mb-5 font-semibold">
              Healing with nature. Restoring vital balance. Reclaiming wellness.
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
    </div>
  );
}


