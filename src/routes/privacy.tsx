import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Devdut Ayurved Clinic" },
      { name: "description", content: "How Devdut Ayurved Clinic collects, uses and protects your personal and health information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy policy." intro="This page is maintained by Devdut Ayurved Clinic to explain how we handle your information." />
      <section className="container-page pb-24 max-w-3xl">
        <Reveal>
          <div className="space-y-8 text-lg leading-relaxed text-[var(--foreground)]">
            <div>
              <h2 className="font-display text-2xl mb-3">Information we collect</h2>
              <p className="text-[var(--muted-foreground)]">When you book an appointment or contact us, we collect your name, contact details and any health information you choose to share. All medical information is treated as confidential and stored securely.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-3">How we use it</h2>
              <p className="text-[var(--muted-foreground)]">Only to schedule and provide care, to follow up on treatment, and — with your consent — to send occasional wellness updates. We never sell your data.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-3">Your rights</h2>
              <p className="text-[var(--muted-foreground)]">You may request a copy of your data, ask us to correct it, or ask us to delete it. Write to care@devdutayurved.com and we will respond within seven working days.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl mb-3">Cookies & analytics</h2>
              <p className="text-[var(--muted-foreground)]">We use minimal, privacy-respecting analytics to understand how the site is used. No third-party ad trackers.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
