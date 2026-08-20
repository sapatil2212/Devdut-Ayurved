import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";

import n1 from "@/assets/new-images/1.png";
import n2 from "@/assets/new-images/2.png";
import n3 from "@/assets/new-images/3.png";
import n4 from "@/assets/new-images/4.png";
import n5 from "@/assets/new-images/5.png";
import n6 from "@/assets/new-images/6.png";
import n7 from "@/assets/new-images/7.png";
import n8 from "@/assets/new-images/8.png";
import n9 from "@/assets/new-images/9.png";
import n10 from "@/assets/new-images/10.png";
import n11 from "@/assets/new-images/11.png";
import n12 from "@/assets/new-images/12.png";
import n13 from "@/assets/new-images/13.png";
import n14 from "@/assets/new-images/14.png";
import n15 from "@/assets/new-images/15.png";
import n17 from "@/assets/new-images/17.png";
import n20 from "@/assets/new-images/20.png";
import n22 from "@/assets/new-images/22.png";
import n25 from "@/assets/new-images/25.png";
import n45 from "@/assets/new-images/45.png";
import n46 from "@/assets/new-images/46.png";

import ext1 from "@/assets/new-images/exterio-1.png";
import ext2 from "@/assets/new-images/exterio-2.png";
import ext3 from "@/assets/new-images/exterio-3.png";
import ext4 from "@/assets/new-images/exterio-4.png";
import ext5 from "@/assets/new-images/exterio-5.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Devdut Ayurved Clinic" },
      { name: "description", content: "Inside Devdut Ayurved Clinic — consultation rooms, in-house pharmacy, waiting lounge, outdoor signage and clinical practice." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const CATEGORIES = [
  "All",
  "Clinic Exterior",
  "Consultation & Care",
  "Pharmacy & Medicines",
] as const;

type Category = (typeof CATEGORIES)[number];

interface GalleryItem {
  img: string;
  cat: Category;
  title: string;
}

const items: GalleryItem[] = [
  // Clinic Exterior & Signs (including exterio series)
  { img: ext1, cat: "Clinic Exterior", title: "Devdut Healing Center Entrance" },
  { img: ext2, cat: "Clinic Exterior", title: "Clinic Building Facade" },
  { img: ext3, cat: "Clinic Exterior", title: "Nadipariksha Outdoor Signage" },
  { img: ext4, cat: "Clinic Exterior", title: "Devdut Ayurved Clinic & Pharmacy" },
  { img: ext5, cat: "Clinic Exterior", title: "Healing Center Exterior View" },
  { img: n10, cat: "Clinic Exterior", title: "Clinic Building Exterior" },
  { img: n11, cat: "Clinic Exterior", title: "Outdoor Pulse Diagnosis Sign" },
  { img: n14, cat: "Clinic Exterior", title: "Ayurvedic Center & Pharmacy Board" },
  { img: n15, cat: "Clinic Exterior", title: "Facility Facade & Entrance" },
  { img: n17, cat: "Clinic Exterior", title: "Main Gate Board & Specialty Info" },
  { img: n20, cat: "Clinic Exterior", title: "Nadi Pariksha Specialty Board" },
  { img: n22, cat: "Clinic Exterior", title: "Devdut Ayurved Aushadhalaya Counter" },
  { img: n25, cat: "Clinic Exterior", title: "Acidity & PCOD Treatment Boards" },

  // Consultation & Care
  { img: n5, cat: "Consultation & Care", title: "Pulse Palpation & Vital Assessment" },
  { img: n9, cat: "Consultation & Care", title: "Classical Nadipariksha Pulse Reading" },
  { img: n1, cat: "Consultation & Care", title: "Personalized Patient Consultation" },
  { img: n2, cat: "Consultation & Care", title: "Ayurvedic Diagnostic Evaluation" },
  { img: n3, cat: "Consultation & Care", title: "Clinical Health Review Session" },
  { img: n4, cat: "Consultation & Care", title: "Patient Assessment & Vitals Monitoring" },
  { img: n6, cat: "Consultation & Care", title: "Clinical Examination & Auscultation" },
  { img: n7, cat: "Consultation & Care", title: "Dr. Patil Consultation Desk" },
  { img: n8, cat: "Consultation & Care", title: "Holistic Care & Treatment Plan" },
  { img: n12, cat: "Consultation & Care", title: "Vitals Check & Blood Pressure Reading" },
  { img: n13, cat: "Consultation & Care", title: "Pulse & Vital Signs Monitoring" },
  { img: n46, cat: "Consultation & Care", title: "Clinical Discussion & Patient Guidance" },

  // Pharmacy & Medicines
  { img: n45, cat: "Pharmacy & Medicines", title: "In-House Ayurvedic Pharmacy Shelves" },
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
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
            {images[cur].cat} · {cur + 1} / {images.length}
          </span>
          <span className="text-white text-sm font-medium hidden sm:block">
            {images[cur].title}
          </span>
        </div>
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
            alt={images[cur].title}
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
          <button key={i} onClick={() => { setCur(i); resetView(); }} aria-label={it.title}
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
  const [activeTab, setActiveTab] = useState<Category>("All");

  const filteredItems = activeTab === "All"
    ? items
    : items.filter((item) => item.cat === activeTab);

  return (
    <PageShell>
      <PageHeader
        sanskrit="दर्शनम् · आरोग्यस्य"
        title="Inside Devdut."
        intro="Explore our authentic clinic spaces, in-house pharmacy, patient waiting lounge, and clinical care environments."
        image={n10}
        imageHeightClass="min-h-[50vh] md:min-h-[65vh]"
      />

      <section className="container-page py-12">
        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? "bg-forest-gradient text-[var(--parchment)] shadow-md scale-105"
                  : "bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--forest-deep)] border border-[var(--border)] hover:border-[var(--gold)]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((it, i) => (
            <Reveal key={it.img + i} delay={(i % 3) * 0.05}>
              <figure
                className="group relative overflow-hidden rounded-3xl cursor-pointer aspect-[4/3] border border-[var(--border)] bg-[var(--card)] shadow-subtle hover-lift"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                aria-label={`View ${it.title}`}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[var(--gold)] text-[10px] uppercase tracking-widest font-semibold mb-1">
                    {it.cat}
                  </span>
                  <span className="text-white text-sm font-display font-medium leading-snug">
                    {it.title}
                  </span>
                </figcaption>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="grid size-11 place-items-center rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg">
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
            images={filteredItems}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
