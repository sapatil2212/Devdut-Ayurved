import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 92.3 132.3"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#1A73E8"
        d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
      />
      <path
        fill="#EA4335"
        d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
      />
      <path
        fill="#4285F4"
        d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L46.2 28.5z"
      />
      <path
        fill="#FBBC04"
        d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3L4.6 68.1c4.8 10.6 12.8 19.2 21 29.8l34.6-41.2c-3.5 4.4-8.5 7.1-14 7.1z"
      />
      <path
        fill="#34A853"
        d="M59.7 77.2c12.2-14.7 26.5-27 26.5-47.4 0-7.3-1.8-14.1-4.9-20.1L25.6 97.9c2.6 3.4 5.3 7 7.9 10.9 11.2 16.7 8.2 23.5 16.5 23.5s5.5-6.8 16.7-23.5c10.8-16.1 20-30.8 20-30.8l-27-0.8z"
      />
    </svg>
  );
}

export function FloatingCTA() {
  const whatsappNum = SITE.whatsapp.replace(/\D/g, "");
  const callNum = SITE.phone.replace(/\s/g, "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.85;
    const onScroll = () => setVisible(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex flex-col items-center gap-2.5">
      {/* WhatsApp Circle */}
      <motion.a
        href={`https://wa.me/${whatsappNum}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2 }}
        className="grid size-10 md:size-11 place-items-center rounded-full bg-[#25D366] text-white shadow-md ring-1 ring-white/60 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 md:size-5.5"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </motion.a>

      {/* Call Circle */}
      <motion.a
        href={`tel:${callNum}`}
        aria-label="Call us"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2, delay: 0.04 }}
        className="grid size-10 md:size-11 place-items-center rounded-full bg-forest-gradient text-[var(--gold)] shadow-md ring-1 ring-white/60 cursor-pointer"
      >
        <Phone className="size-4 md:size-5" />
      </motion.a>

      {/* Google Maps Circle with original logo */}
      <motion.a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open in Google Maps"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2, delay: 0.08 }}
        className="grid size-10 md:size-11 place-items-center rounded-full bg-white shadow-md ring-1 ring-black/10 cursor-pointer p-2"
      >
        <GoogleMapsIcon className="size-full object-contain" />
      </motion.a>
    </div>
  );
}
