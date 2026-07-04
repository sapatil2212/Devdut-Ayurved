import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import treatmentsImg from "@/assets/treatments.jpg";
import therapyImg from "@/assets/therapy.jpg";
import templeImg from "@/assets/temple.jpg";
import heroImg from "@/assets/hero-ayurveda.jpg";
import doctorImg from "@/assets/doctor.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Devdut Ayurved Clinic" },
      { name: "description", content: "Inside the Devdut clinic — therapy rooms, in-house pharmacy, staff and moments from our practice." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const items = [
  { img: heroImg, cat: "Pharmacy" },
  { img: therapyImg, cat: "Therapy" },
  { img: treatmentsImg, cat: "Medicines" },
  { img: doctorImg, cat: "Staff" },
  { img: templeImg, cat: "Space" },
  { img: therapyImg, cat: "Treatments" },
  { img: heroImg, cat: "Herbs" },
  { img: doctorImg, cat: "Consultation" },
  { img: templeImg, cat: "Heritage" },
];

/* ─── Lightbox ─────────────────────────────────────────── */
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: typeof items;
  index: number;
  onClose: () => void;
}) {
  const [cur, setCur] = useState(index);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const prev = () => { setCur((c) => (c - 1 + images.length) % images.length); resetView(); };
  const next = () => { setCur((c) => (c + 1) % images.length); resetView(); };
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom((z) => { const nz = Math.max(z - ZOOM_STEP, MIN_ZOOM); if (nz === 1) setPan({ x: 0, y: 0 }); return nz; });

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cur]);

  // Scroll wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn(); else zoomOut();
  }, []);

  // Mouse drag pan
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPan({ x: dragStart.current.px + (e.clientX - dragStart.current.x), y: dragStart.current.py + (e.clientY - dragStart.current.y) });
  };
  const onMouseUp = () => { dragging.current = false; };

  // Touch pan
  const touchStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const onTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1) return;
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, px: pan.x, py: pan.y };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (zoom <= 1) return;
    const t = e.touches[0];
    setPan({ x: touchStart.current.px + (t.clientX - touchStart.current.x), y: touchStart.current.py + (t.clientY - touchStart.current.y) });
  };

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-xs uppercase tracking-widest text-[var(--gold)]">
          {images[cur].cat} · {cur + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={zoomOut} aria-label="Zoom out" disabled={zoom <= MIN_ZOOM}
            className="grid size-9 place-items-center rounded-full border border-white/20 text-white disabled:opacity-30 hover:bg-white/10 transition-colors">
            <ZoomOut className="size-4" />
          </button>
          <span className="w-10 text-center text-xs text-white/70">{Math.round(zoom * 100)}%</span>
          <button onClick={zoomIn} aria-label="Zoom in" disabled={zoom >= MAX_ZOOM}
            className="grid size-9 place-items-center rounded-full border border-white/20 text-white disabled:opacity-30 hover:bg-white/10 transition-colors">
            <ZoomIn className="size-4" />
          </button>
          <button onClick={resetView} aria-label="Reset view"
            className="grid size-9 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors">
            <Maximize2 className="size-4" />
          </button>
          <button onClick={onClose} aria-label="Close"
            className="grid size-9 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors ml-2">
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="relative flex-1 overflow-hidden flex items-center justify-center select-none"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ cursor: zoom > 1 ? (dragging.current ? "grabbing" : "grab") : "default" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={cur}
            src={images[cur].img}
            alt={images[cur].cat}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              transition: dragging.current ? "none" : "transform 0.2s ease",
            }}
            draggable={false}
            className="pointer-events-none"
          />
        </AnimatePresence>

        {/* Side nav arrows */}
        <button onClick={prev} aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors">
          <ChevronLeft className="size-6" />
        </button>
        <button onClick={next} aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors">
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 shrink-0 overflow-x-auto">
        {images.map((it, i) => (
          <button key={i} onClick={() => { setCur(i); resetView(); }} aria-label={it.cat}
            className={`shrink-0 size-12 md:size-16 overflow-hidden rounded-lg border-2 transition-all ${i === cur ? "border-[var(--gold)] opacity-100" : "border-transparent opacity-50 hover:opacity-80"}`}>
            <img src={it.img} alt="" className="size-full object-cover" draggable={false} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Gallery Page ──────────────────────────────────────── */
function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <PageShell>
      <PageHeader
        sanskrit="दर्शनम् · आरोग्यस्य"
        title="Inside Devdut."
        intro="A glimpse of our clinic, our in-house pharmacy and the therapies we love to practise."
        image={heroImg}
        imageHeightClass="min-h-[50vh] md:min-h-[65vh]"
      />

      <section className="container-page py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <figure
                className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-[4/3]"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                aria-label={`View ${it.cat}`}
              >
                <img src={it.img} alt={it.cat} loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <figcaption className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[var(--gold)] text-xs uppercase tracking-widest">{it.cat}</span>
                </figcaption>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="grid size-10 place-items-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                    <Maximize2 className="size-5" />
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={items}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
