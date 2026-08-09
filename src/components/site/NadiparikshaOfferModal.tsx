import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { SITE } from "@/lib/site";
import nadiCardImg from "@/assets/treatments/nadipariksha-card.png";

const STORAGE_KEY = "devdut-nadipariksha-offer-seen";

export function NadiparikshaOfferModal() {
  const [open, setOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // private mode — still show once this visit
    }

    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const markSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const dismiss = () => {
    setOpen(false);
    markSeen();
  };

  const claimSlot = () => {
    dismiss();
    window.setTimeout(() => setBookOpen(true), 280);
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) dismiss();
          else setOpen(true);
        }}
      >
        <DialogContent className="w-[92vw] max-w-md overflow-hidden border-0 p-0 rounded-3xl bg-[var(--parchment)] shadow-elegant gap-0">
          <div className="relative aspect-[16/10] overflow-hidden bg-forest-gradient">
            <img
              src={nadiCardImg}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--forest-deep)] via-[var(--forest-deep)]/70 to-[var(--forest-deep)]/40" />
            <div className="relative z-10 flex h-full flex-col justify-end p-5 text-[var(--parchment)]">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--forest-deep)]">
                <Sparkles className="size-3" />
                Special Offer
              </span>
              <DialogTitle className="mt-3 font-display text-2xl leading-tight text-[var(--parchment)]">
                Free Nadipariksha
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-[var(--parchment)]/80">
                Pulse diagnosis on the {SITE.nadiparikshaDates}
              </DialogDescription>
            </div>
          </div>

          <div className="space-y-5 p-5 md:p-6">
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
              Claim your complimentary Nadipariksha (pulse diagnosis) with Dr. Ganeshkumar Patil — available on the{" "}
              <strong className="text-[var(--forest-deep)]">1st &amp; 15th</strong> of every month. Kindly call first to
              check availability.
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row pt-1">
              <Button
                type="button"
                onClick={claimSlot}
                className="w-full rounded-full bg-forest-gradient text-[var(--parchment)] shadow-gold h-11 cursor-pointer"
              >
                Claim Free Slot
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full h-11 border-[var(--border)] cursor-pointer"
                onClick={dismiss}
              >
                <Link to="/nadipariksha">Learn more</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BookAppointmentDialog open={bookOpen} onOpenChange={setBookOpen} />
    </>
  );
}
