import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingCTA } from "./FloatingCTA";
import { CustomScrollbar } from "./CustomScrollbar";
import { NadiparikshaOfferModal } from "./NadiparikshaOfferModal";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-dvh pt-20">
        {children}
      </main>
      <SiteFooter />
      <FloatingCTA />
      <CustomScrollbar />
      <NadiparikshaOfferModal />
    </>
  );
}
