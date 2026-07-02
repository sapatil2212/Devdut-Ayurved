import type { ReactNode } from "react";
import { Ornament } from "./Ornament";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  sanskrit,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  sanskrit?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, oklch(0.75 0.13 85 / 0.18), transparent 70%)",
        }}
      />
      <div className="container-page relative py-24 md:py-32 text-center">
        <Reveal>
          {sanskrit && <div className="font-sanskrit text-[var(--gold)] text-lg mb-3">{sanskrit}</div>}
          {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">{title}</h1>
          {intro && (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted-foreground)] text-balance">
              {intro}
            </p>
          )}
          <Ornament className="mt-10" />
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
