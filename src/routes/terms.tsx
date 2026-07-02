import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Devdut Ayurved Clinic" },
      { name: "description", content: "Terms of use for the Devdut Ayurved Clinic website and its services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Terms of use." intro="Please read these terms carefully before using our website or services." />
      <section className="container-page pb-24 max-w-3xl">
        <Reveal>
          <div className="space-y-8 text-lg leading-relaxed">
            <div>
              <h2 className="font-display text-2xl mb-3">Medical disclaimer</h2>
              <p className="text-[var(--muted-foreground)]">Information on this website is educational and is not a substitute for personalised medical advice. Consult a qualified physician before starting any treatment.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-3">Appointments & payments</h2>
              <p className="text-[var(--muted-foreground)]">Consultation fees are payable at the time of the appointment. Cancellations made at least 24 hours in advance are fully refundable.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-3">Intellectual property</h2>
              <p className="text-[var(--muted-foreground)]">All content on this site — text, images, formulations and protocols — is owned by Devdut Ayurved Clinic and may not be reproduced without permission.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
