import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingCTA } from "./FloatingCTA";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-dvh pt-20">
        {children}
      </main>
      <SiteFooter />
      <FloatingCTA />
    </>
  );
}
