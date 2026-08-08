import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { BookAppointmentDialog } from "@/components/site/BookAppointmentDialog";
import greenEarthImg from "@/assets/green-earth.png";

import heroImg from "@/assets/hero-ayurveda.jpg";
import doctorImg from "@/assets/doctor.jpg";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";
import homeAboutImg from "@/assets/home-about.png";
import aboutHeroImg from "@/assets/about-hero.png";
import childImg from "@/assets/treatments/child.png";
import digestiveImg from "@/assets/treatments/digestive.png";
import jointImg from "@/assets/treatments/joint.png";
import skinHairImg from "@/assets/treatments/skin-hair.png";
import lifestyleChronicImg from "@/assets/treatments/Lifestyle-Chronic.png";
import humanHealthImg from "@/assets/treatments/human-Health.png";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments — Devdut Ayurved Clinic" },
      { name: "description", content: "Classical Panchakarma, Nadipariksha, Agnikshar, kidney, digestive, mental health, respiratory care and more at Devdut Ayurved." },
      { property: "og:url", content: "/treatments" },
    ],
    links: [{ rel: "canonical", href: "/treatments" }],
  }),
  component: TreatmentsPage,
});

function getLinkForItem(item: string) {
  const lower = item.toLowerCase();
  if (lower.includes("nadi") || lower.includes("pulse") || lower.includes("prakriti") || lower.includes("1st")) {
    return { to: "/treatments/$slug" as const, params: { slug: "nadipariksha" } };
  }
  if (lower.includes("agni") || lower.includes("kshara") || lower.includes("wart") || lower.includes("corn") && lower.includes("chronic")) {
    return { to: "/treatments/$slug" as const, params: { slug: "agnikshar" } };
  }
  if (["vamana", "virechana", "basti", "nasya", "raktamokshana"].some(x => lower.includes(x))) {
    return { to: "/treatments/$slug" as const, params: { slug: "panchakarma" } };
  }
  if (lower.includes("child") || lower.includes("suvarnaprashan") || lower.includes("intellectual") || lower.includes("growth")) {
    return { to: "/treatments/$slug" as const, params: { slug: "child" } };
  }
  if (lower.includes("cracked") || lower.includes("skin") || lower.includes("acne") || lower.includes("pimples") || lower.includes("herpes") || lower.includes("hair")) {
    return { to: "/treatments/$slug" as const, params: { slug: "skin" } };
  }
  if (lower.includes("nightmare") || lower.includes("pcod") || lower.includes("pcos") || lower.includes("menstrual") || lower.includes("leucorrhoea") || lower.includes("hormonal") || lower.includes("infertility") || lower.includes("pregnancy") || lower.includes("sexual")) {
    return { to: "/treatments/$slug" as const, params: { slug: "womens-health" } };
  }
  if (lower.includes("paralysis") || lower.includes("hemiplegia") || lower.includes("paraplegia") || lower.includes("stroke")) {
    return { to: "/treatments/$slug" as const, params: { slug: "paralysis" } };
  }
  if (lower.includes("joint") || lower.includes("arthritis") || lower.includes("sciatica") || lower.includes("headache") || lower.includes("epilepsy") || lower.includes("migraine")) {
    return { to: "/treatments/$slug" as const, params: { slug: "joint-pain" } };
  }
  if (lower.includes("jaundice") || lower.includes("hepatitis") || lower.includes("diabetes") || lower.includes("thyroid") || lower.includes("obesity") || lower.includes("allergy") || lower.includes("allergies") || lower.includes("insomnia") || lower.includes("weight")) {
    return { to: "/treatments/$slug" as const, params: { slug: "lifestyle-chronic" } };
  }
  if (lower.includes("kidney") || lower.includes("renal") || lower.includes("urinary") || lower.includes("calculi") || lower.includes("stone")) {
    return { to: "/treatments/$slug" as const, params: { slug: "kidney" } };
  }
  if (lower.includes("mental") || lower.includes("anxiety") || lower.includes("burnout") || lower.includes("nightmare")) {
    return { to: "/treatments/$slug" as const, params: { slug: "mental-health" } };
  }
  if (lower.includes("fissure") || lower.includes("fistula") || lower.includes("piles") || lower.includes("digestive") || lower.includes("stomach") || lower.includes("acidity") || lower.includes("constipation")) {
    return { to: "/treatments/$slug" as const, params: { slug: "digestion" } };
  }
  if (lower.includes("respiratory") || lower.includes("asthma") || lower.includes("sinus") || lower.includes("cough") || lower.includes("cold") || lower.includes("tonsil")) {
    return { to: "/treatments/$slug" as const, params: { slug: "respiratory" } };
  }
  if (lower.includes("heart") || lower.includes("abscess") || lower.includes("preventive") || lower.includes("diet") || lower.includes("wellness")) {
    return { to: "/treatments/$slug" as const, params: { slug: "preventive-care" } };
  }
  return { to: "/treatments" as const, params: undefined };
}

function TreatmentsPage() {
  const categories = [
    {
      title: "Nadipariksha",
      image: therapyImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "nadipariksha" } },
      items: ["Pulse Diagnosis", "Prakriti Mapping", "Dosha Assessment", "1st & 15th Promo"],
    },
    {
      title: "Panchakarma Therapies",
      image: therapyImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "panchakarma" } },
      items: ["Vamana", "Virechana", "Basti", "Nasya", "Raktamokshana"],
    },
    {
      title: "Agnikshar Chikitsa",
      image: templeImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "agnikshar" } },
      items: ["Agnikarma", "Kshara Karma", "Warts & Corns", "Chronic Lesions"],
    },
    {
      title: "Lifestyle & Chronic Diseases",
      image: lifestyleChronicImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "lifestyle-chronic" } },
      items: ["Diabetes", "Thyroid Disorders", "Obesity", "Jaundice", "Infective Hepatitis", "Allergies"],
    },
    {
      title: "Bone, Joint & Neurological Care",
      image: jointImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "joint-pain" } },
      items: ["Arthritis", "Joint Pain", "Sciatica", "Migraine", "Headache", "Epilepsy"],
    },
    {
      title: "Paralysis Treatment",
      image: treatmentsImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "paralysis" } },
      items: ["Hemiplegia", "Paraplegia", "Post-stroke Care", "Nerve Nourishment"],
    },
    {
      title: "Skin, Hair & Cosmetic Care",
      image: skinHairImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "skin" } },
      items: ["Hair Fall", "Acne & Pimples", "Skin Diseases", "Cracked Heels", "Warts & Corns"],
    },
    {
      title: "Women's & Men's Health",
      image: humanHealthImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "womens-health" } },
      items: ["Menstrual Disorders", "Infertility", "Sexual Weakness", "Nightmares", "Hormonal Health"],
    },
    {
      title: "Digestive Care",
      image: digestiveImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "digestion" } },
      items: ["Stomach Disorders", "Piles", "Fissure", "Fistula", "Acidity", "Constipation"],
    },
    {
      title: "Kidney Diseases",
      image: digestiveImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "kidney" } },
      items: ["Renal Calculi", "Renal Failure", "Urinary Disorders", "Stone Support"],
    },
    {
      title: "Mental Health Care",
      image: homeAboutImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "mental-health" } },
      items: ["Anxiety", "Insomnia", "Nightmares", "Burnout", "Stress"],
    },
    {
      title: "Respiratory Care",
      image: templeImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "respiratory" } },
      items: ["Asthma", "Chronic Cold", "Sinusitis", "Tonsillitis", "Cough"],
    },
    {
      title: "Child Health & Immunity",
      image: childImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "child" } },
      items: ["Children's Diseases", "Suvarnaprashan", "Intellectual Development", "Immunity Enhancement"],
    },
    {
      title: "General Wellness & Preventive Care",
      image: aboutHeroImg,
      learnMore: { to: "/treatments/$slug" as const, params: { slug: "preventive-care" } },
      items: ["Heart Diseases", "Abscess Management", "Diet Consultation", "Preventive Check-ups"],
    },
  ];

  return (
    <PageShell>
      <PageHeader
        sanskrit="स्वस्थस्य स्वास्थ्य रक्षणम्"
        title="Care for every body, every stage."
        intro="From Nadipariksha and classical Panchakarma to focused protocols for chronic conditions — every treatment plan is designed around your Prakriti."
        image={therapyImg}
        imageHeightClass="min-h-[50vh] md:min-h-[65vh]"
      />

      <section className="container-page py-14">
        <div className="grid gap-y-6 gap-x-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] hover-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)]/70 via-[var(--forest-deep)]/10 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl mb-1 text-[var(--forest-deep)] transition-colors group-hover:text-[var(--copper)]">
                    {cat.title}
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-2.5 gap-y-1.5 mt-3 mb-4">
                    {cat.items.slice(0, 4).map((item) => {
                      const link = getLinkForItem(item);
                      return (
                        <li key={item} className="min-w-0">
                          <Link
                            to={link.to as any}
                            params={link.params as any}
                            className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--copper)] transition-colors group-hover:text-[var(--forest-deep)] min-w-0"
                          >
                            <span className="text-[var(--gold)] text-[10px] shrink-0">✦</span>
                            <span className="truncate" title={item}>{item}</span>
                          </Link>
                        </li>
                      );
                    })}
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
                      to={cat.learnMore.to as any}
                      params={cat.learnMore.params as any}
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
              Not sure which treatment fits your condition?
            </h2>
            <p className="text-[var(--parchment)]/75 text-xs md:text-sm max-w-lg mb-2 leading-relaxed">
              Ayurvedic healing is highly personalized. If you're unsure which therapies or consultations are related to your health goals, our doctors are here to guide you with pulse reading (Nadi Pariksha) and custom herbal regimes.
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
