import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Ornament } from "@/components/site/Ornament";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Devdut Ayurved Clinic" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <PageShell>
      <section className="container-page py-32 text-center">
        <Reveal>
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-gold-gradient text-[var(--forest-deep)] shadow-gold">
            <CheckCircle2 className="size-10" />
          </div>
          <div className="font-sanskrit text-[var(--gold)] text-xl mt-8">धन्यवादः</div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">Thank you.</h1>
          <p className="mt-6 mx-auto max-w-xl text-lg text-[var(--muted-foreground)]">
            We have received your request. A member of our team will confirm your appointment personally within one working day.
          </p>
          <Ornament className="my-10" />
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full bg-forest-gradient text-[var(--parchment)] h-12 px-6"><Link to="/">Return home</Link></Button>
            <Button asChild variant="outline" className="rounded-full h-12 px-6"><Link to="/blog">Read the Journal</Link></Button>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
