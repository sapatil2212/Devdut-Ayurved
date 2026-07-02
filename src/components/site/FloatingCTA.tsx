import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingCTA() {
  const num = SITE.whatsapp.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${num}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-forest-gradient text-[var(--gold)] shadow-gold ring-1 ring-[var(--gold)]/40 hover:scale-110 transition-transform animate-glow"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
