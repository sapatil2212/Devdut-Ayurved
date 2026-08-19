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

import g6 from "@/assets/gallery/6.png";
import g10 from "@/assets/gallery/10.png";
import g11 from "@/assets/gallery/11.png";
import g12 from "@/assets/gallery/12.png";
import g13 from "@/assets/gallery/13.png";
import g14 from "@/assets/gallery/14.png";
import g15 from "@/assets/gallery/15.png";
import g16 from "@/assets/gallery/16.png";
import g17 from "@/assets/gallery/17.png";
import g18 from "@/assets/gallery/18.png";
import g19 from "@/assets/gallery/19.png";
import g20 from "@/assets/gallery/20.png";
import g21 from "@/assets/gallery/21.png";
import g22 from "@/assets/gallery/22.png";
import g23 from "@/assets/gallery/23.png";
import g24 from "@/assets/gallery/24.png";
import g25 from "@/assets/gallery/25.png";
import g26 from "@/assets/gallery/26.png";
import g27 from "@/assets/gallery/27.png";
import g28 from "@/assets/gallery/28.png";
import g29 from "@/assets/gallery/29.png";
import g30 from "@/assets/gallery/30.png";
import g31 from "@/assets/gallery/31.png";
import g32 from "@/assets/gallery/32.png";
import g33 from "@/assets/gallery/33.png";
import g34 from "@/assets/gallery/34.png";
import g36 from "@/assets/gallery/36.png";
import g37 from "@/assets/gallery/37.png";
import g38 from "@/assets/gallery/38.png";
import g39 from "@/assets/gallery/39.png";
import g40 from "@/assets/gallery/40.png";
import g41 from "@/assets/gallery/41.png";
import g42 from "@/assets/gallery/42.png";
import g43 from "@/assets/gallery/43.png";
import g44 from "@/assets/gallery/44.png";
import g45 from "@/assets/gallery/45.png";
import g46 from "@/assets/gallery/46.png";
import g47 from "@/assets/gallery/47.png";
import gHomeAbout from "@/assets/gallery/home-about.png";

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
  "Pharmacy & Medicines",
  "Consultation & Care",
  "Reception & Lounge",
  "Therapy & Space",
] as const;

type Category = (typeof CATEGORIES)[number];

interface GalleryItem {
  img: string;
  cat: Category;
  title: string;
}

const items: GalleryItem[] = [
  // Clinic Exterior & Signs
  { img: g6, cat: "Clinic Exterior", title: "Devdut Healing Center Entrance" },
  { img: g10, cat: "Clinic Exterior", title: "Clinic Building Facade" },
  { img: g11, cat: "Clinic Exterior", title: "Nadipariksha Outdoor Signage" },
  { img: g14, cat: "Clinic Exterior", title: "Devdut Ayurved Clinic & Pharmacy" },
  { img: g15, cat: "Clinic Exterior", title: "Healing Center Exterior View" },
  { img: g17, cat: "Clinic Exterior", title: "Main Gate Board & Specialty Info" },
  { img: g20, cat: "Clinic Exterior", title: "Nadi Pariksha Specialty Board" },
  { img: g22, cat: "Clinic Exterior", title: "Devdut Ayurved Aushadhalaya Counter" },
  { img: g25, cat: "Clinic Exterior", title: "Acidity & PCOD Treatment Boards" },

  // Pharmacy & Medicines
  { img: g45, cat: "Pharmacy & Medicines", title: "In-House Ayurvedic Pharmacy Shelves" },
  { img: g40, cat: "Pharmacy & Medicines", title: "Ayurvedic Medicine Dispensing Counter" },
  { img: g38, cat: "Pharmacy & Medicines", title: "Consultation & Prescription Desk" },
  { img: treatmentsImg, cat: "Pharmacy & Medicines", title: "Classical Herbal Formulations" },
  { img: heroImg, cat: "Pharmacy & Medicines", title: "Authentic Ayurvedic Herbs" },

  // Consultation & Care
  { img: g47, cat: "Consultation & Care", title: "Clinical Examination & Auscultation" },
  { img: g46, cat: "Consultation & Care", title: "Dr. Patil Consultation Desk" },
  { img: g44, cat: "Consultation & Care", title: "Dr. Patil Conducting Pulse Reading" },
  { img: g21, cat: "Consultation & Care", title: "Radial Pulse Diagnosis Consultation" },
  { img: g43, cat: "Consultation & Care", title: "Clinical Examination Room" },
  { img: g16, cat: "Consultation & Care", title: "Pediatric Health Checkup" },
  { img: g12, cat: "Consultation & Care", title: "Blood Pressure & Vitals Assessment" },
  { img: g13, cat: "Consultation & Care", title: "Patient Vital Signs Monitoring" },
  { img: g18, cat: "Consultation & Care", title: "Consultation Vitals Check" },
  { img: g19, cat: "Consultation & Care", title: "Clinical Assessment Room" },
  { img: g23, cat: "Consultation & Care", title: "Patient Evaluation Session" },
  { img: g24, cat: "Consultation & Care", title: "Patient Care Room" },

  // Reception & Lounge
  { img: g29, cat: "Reception & Lounge", title: "Patient Waiting Lounge" },
  { img: g36, cat: "Reception & Lounge", title: "Reception Desk & Waiting Area" },
  { img: g33, cat: "Reception & Lounge", title: "Comfortable Patient Lounge" },
  { img: g37, cat: "Reception & Lounge", title: "Front Desk & Billing Area" },
  { img: g26, cat: "Reception & Lounge", title: "Clinic Reception Space" },
  { img: g27, cat: "Reception & Lounge", title: "Waiting Room Seating" },
  { img: g28, cat: "Reception & Lounge", title: "Lounge Area View" },
  { img: g30, cat: "Reception & Lounge", title: "Patient Care Reception" },
  { img: g31, cat: "Reception & Lounge", title: "Clinic Welcome Lounge" },
  { img: g32, cat: "Reception & Lounge", title: "Comfortable Seating Area" },
  { img: g34, cat: "Reception & Lounge", title: "Waiting Room Environment" },
  { img: g39, cat: "Reception & Lounge", title: "Reception Desk View" },
  { img: g41, cat: "Reception & Lounge", title: "Front Desk Assistance" },
  { img: g42, cat: "Reception & Lounge", title: "Clinic Waiting Area" },

  // Therapy & Space
  { img: therapyImg, cat: "Therapy & Space", title: "Panchakarma Therapy Room" },
  { img: templeImg, cat: "Therapy & Space", title: "Serene Healing Ambiance" },
  { img: gHomeAbout, cat: "Therapy & Space", title: "Holistic Health Environment" },
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
        image={g10}
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
