import { Reveal } from "./Reveal";
import therapyImg from "@/assets/therapy.jpg";
import treatmentsImg from "@/assets/treatments.jpg";
import templeImg from "@/assets/temple.jpg";
import heroImg from "@/assets/hero-ayurveda.jpg";
import panchkarmaHeroImg from "@/assets/panchkarma-hero.png";
import aboutHeroImg from "@/assets/about-hero.png";

const gallery = [
  { src: therapyImg, alt: "Ayurvedic therapy in session" },
  { src: panchkarmaHeroImg, alt: "Authentic Panchakarma therapy" },
  { src: templeImg, alt: "Traditional healing sanctuary" },
  { src: treatmentsImg, alt: "Herbal treatments and oils" },
  { src: heroImg, alt: "Classical Panchakarma ritual" },
  { src: aboutHeroImg, alt: "Devdut Ayurvedic healing space" },
];

export function TrustedIcons() {
  // duplicate the row so translateX(-50%) creates a seamless loop
  const row = [...gallery, ...gallery];

  return (
    <section className="relative overflow-hidden bg-forest-gradient text-[var(--parchment)]">
      <div className="container-page pt-20 pb-16 md:pt-24 md:pb-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl leading-[1.1] text-balance">
            <span className="text-shimmer">Trusted by the World's Icons</span>
            <br />
            <span className="text-shimmer">for Extraordinary Healing</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-sm md:text-base font-light text-[var(--parchment)]/70 leading-relaxed">
            Over the decades, Devdut has been the trusted healing guide for renowned figures — from
            leaders and thinkers to artists and everyday seekers, all drawn to our classical
            Ayurvedic wisdom for life-changing transformations.
          </p>
        </Reveal>
      </div>

      {/* Marquee */}
      <div className="group relative">
        {/* Edge fade masks */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24 bg-gradient-to-r from-[var(--forest-deep)] to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24 bg-gradient-to-l from-[var(--forest-deep)] to-transparent" />

        <div className="flex animate-marquee gap-4 md:gap-6 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <figure
              key={i}
              className="relative shrink-0 w-44 h-32 sm:w-56 sm:h-40 md:w-72 md:h-52 overflow-hidden rounded-2xl border border-[var(--gold)]/20"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
            </figure>
          ))}
        </div>
      </div>

      <div className="pb-16 md:pb-20" />
    </section>
  );
}
