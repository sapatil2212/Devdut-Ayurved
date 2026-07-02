import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function FloatingCTA() {
  const num = SITE.whatsapp.replace(/\D/g, "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.85;

    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    // evaluate immediately in case page is already scrolled
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.a
      href={`https://wa.me/${num}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40 grid size-14 place-items-center rounded-full bg-forest-gradient text-[var(--gold)] shadow-gold ring-1 ring-[var(--gold)]/40 animate-glow"
    >
      <MessageCircle className="size-6" />
    </motion.a>
  );
}
