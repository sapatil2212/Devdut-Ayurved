import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "What is Siddha Veda, and how is it different from Ayurveda?",
    a: "Siddha Veda is an ancient, exclusive lineage within Ayurveda that dates back 2,500 years, passed down through sacred scrolls and teachings. While Ayurveda is well-known, Siddha Veda offers a deeper, more specialized form of healing.",
  },
  {
    q: "How does Devdut ensure the safety and quality of its Ayurvedic treatments?",
    a: "Every formulation is prepared in-house from single herbs to complex Rasayana, batch-tested for purity, and matched to your Prakriti. Panchakarma therapies are performed by trained vaidyas under strict clinical protocols.",
  },
  {
    q: "What is Nadi Pariksha, and how does it enhance Ayurvedic care?",
    a: "Nadi Pariksha is the classical pulse diagnosis used to read the state of your doshas, tissues and vital channels. It lets us design a treatment that is truly personal rather than symptom-driven.",
  },
  {
    q: "Can I receive Ayurvedic consultations online with Devdut?",
    a: "Yes. We offer secure video consultations for patients across India and abroad, followed by a personalised herbal plan couriered to your address with clear guidance.",
  },
  {
    q: "What conditions can be treated with Devdut's Ayurvedic treatments?",
    a: "From chronic skin and gut disorders to metabolic imbalances, PCOD, hair loss, joint pain, stress and sleep issues — Ayurveda addresses the root cause across a wide range of conditions.",
  },
  {
    q: "How does Devdut give back to the community?",
    a: "We run a weekly free clinic, sponsor students at BAMS colleges, and share classical texts and lifestyle guidance through open workshops and content.",
  },
];

type Props = {
  items?: FaqItem[];
  showCta?: boolean;
  className?: string;
};

export function FaqSection({ items = defaultFaqs, showCta = true, className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={className}>
      <div className="container-page py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-[var(--forest-deep)]">
              FAQ Section:<br />
              Your Questions, <span className="italic text-[var(--copper)]">Answered</span>
            </h2>
          </Reveal>
          {showCta && (
            <Reveal delay={0.1}>
              <Button
                asChild
                className="rounded-full bg-gold-gradient text-[var(--forest-deep)] hover:opacity-90 shadow-gold h-11 px-6 text-sm font-medium"
              >
                <Link to="/faq">Explore all FAQ's</Link>
              </Button>
            </Reveal>
          )}
        </div>

        {/* List */}
        <Reveal delay={0.15}>
          <ul className="mt-10 md:mt-14 border-t border-[var(--border)]">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="border-b border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 py-4 md:py-5 text-left transition-colors hover:text-[var(--forest-deep)]"
                  >
                    <span
                      className={`text-sm md:text-base font-medium transition-colors ${
                        isOpen ? "text-[var(--forest-deep)]" : "text-[var(--foreground)]"
                      }`}
                    >
                      <span className="mr-2 text-[var(--muted-foreground)]">{i + 1}.</span>
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className={`shrink-0 grid place-items-center transition-colors ${
                        isOpen ? "text-[var(--gold)]" : "text-[var(--muted-foreground)] group-hover:text-[var(--forest-deep)]"
                      }`}
                    >
                      <ChevronDown className="size-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-sm md:text-[15px] leading-relaxed text-[var(--muted-foreground)]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
