import type { ReactNode } from "react";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  sanskrit,
  children,
  image,
  imageHeightClass = "min-h-dvh",
  imageFitClass = "object-cover object-center",
  imageAlignClass = "justify-start",
  introMaxWidthClass = "max-w-4xl",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  sanskrit?: string;
  children?: ReactNode;
  image?: string;
  imageHeightClass?: string;
  imageFitClass?: string;
  imageAlignClass?: string;
  introMaxWidthClass?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-b border-[var(--border)] ${image ? "-mt-20" : ""}`}>
      {/* Background image with overlay */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className={`absolute inset-0 size-full ${imageFitClass}`}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--forest-deep)]/90 via-[var(--forest-deep)]/85 to-[var(--forest-deep)]/95" />
        </>
      )}

      {/* Radial glow (only when no image) */}
      {!image && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, oklch(0.75 0.13 85 / 0.18), transparent 70%)",
          }}
        />
      )}

      <div className={`container-page relative text-center ${image ? `pt-36 pb-16 md:py-32 text-[var(--parchment)] ${imageHeightClass} flex flex-col items-center ${imageAlignClass}` : "py-24 md:py-32"}`}>
        <Reveal>
          {sanskrit && <div className={`font-sanskrit text-lg ${image ? "mb-1 text-[var(--gold)]" : "mb-3 text-[var(--gold)]"}`}>{sanskrit}</div>}
          {eyebrow && <div className={`eyebrow mb-4 ${image ? "text-[var(--parchment)]/70" : ""}`}>{eyebrow}</div>}
          <h1 className={`font-display text-4xl md:text-6xl leading-[1.05] text-balance ${image ? "text-[var(--parchment)]" : ""}`}>{title}</h1>
          {intro && (
            <p className={`mx-auto ${introMaxWidthClass} text-balance ${image ? "mt-3 text-sm md:text-lg text-[var(--parchment)]/80" : "mt-6 text-lg text-[var(--muted-foreground)]"}`}>
              {intro}
            </p>
          )}
          {!image && <Ornament className="mt-10" />}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
