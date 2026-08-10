import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sleek, interactive, compact side scroller with percentage tooltip,
 * smooth click-to-jump, and refined grab-and-drag.
 */
export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const idleTimer = useRef<number | null>(null);

  const [metrics, setMetrics] = useState({
    visible: false,
    thumbH: 36,
    thumbTop: 0,
    progress: 0,
  });
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const wakeUp = useCallback(() => {
    setIsIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (!dragging.current) {
        setIsIdle(true);
      }
    }, 2200);
  }, []);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 20) {
      setMetrics((m) => (m.visible ? { ...m, visible: false, progress: 0 } : m));
      return;
    }

    const track = trackRef.current;
    const trackH = track?.clientHeight ?? window.innerHeight * 0.6;
    const ratio = window.innerHeight / doc.scrollHeight;
    const thumbH = Math.max(28, Math.min(trackH * ratio, trackH * 0.35));
    const maxThumbTop = Math.max(1, trackH - thumbH);
    const progress = window.scrollY / scrollable;
    const thumbTop = Math.max(0, Math.min(maxThumbTop, progress * maxThumbTop));

    setMetrics({
      visible: true,
      thumbH,
      thumbTop: Number.isFinite(thumbTop) ? thumbTop : 0,
      progress: Number.isFinite(progress) ? progress : 0,
    });
  }, []);

  useEffect(() => {
    update();
    let ticking = false;
    const onScroll = () => {
      wakeUp();
      if (dragging.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    wakeUp();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [update, wakeUp]);

  const scrollToThumbY = useCallback(
    (clientY: number, smooth: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const trackH = rect.height;
      const thumbH = metrics.thumbH;
      const maxThumbTop = trackH - thumbH;
      if (maxThumbTop <= 0) return;

      let nextTop = clientY - rect.top - dragOffset.current;
      nextTop = Math.max(0, Math.min(maxThumbTop, nextTop));
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = (nextTop / maxThumbTop) * scrollable;

      window.scrollTo({
        top: targetY,
        behavior: smooth ? "smooth" : "auto",
      });

      if (!smooth) {
        setMetrics((m) => ({
          ...m,
          thumbTop: nextTop,
          progress: nextTop / maxThumbTop,
        }));
      }
    },
    [metrics.thumbH],
  );

  const onThumbPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = true;
    setActive(true);
    wakeUp();
    const thumb = e.currentTarget.getBoundingClientRect();
    dragOffset.current = e.clientY - thumb.top;

    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const onMove = (ev: PointerEvent) => {
      if (!dragging.current) return;
      scrollToThumbY(ev.clientY, false);
    };
    const onUp = () => {
      dragging.current = false;
      setActive(false);
      html.style.scrollBehavior = prev;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      wakeUp();
      update();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-scrollbar-thumb]")) return;
    wakeUp();
    dragOffset.current = metrics.thumbH / 2;
    scrollToThumbY(e.clientY, true);
  };

  if (!metrics.visible) return null;

  const percent = Math.round(metrics.progress * 100);

  return (
    <aside
      aria-label="Page scroll indicator"
      className="pointer-events-none fixed right-2 top-0 z-[60] hidden h-dvh items-center justify-center py-24 lg:flex"
    >
      <div
        onMouseEnter={() => {
          setHovered(true);
          wakeUp();
        }}
        onMouseLeave={() => setHovered(false)}
        className={`pointer-events-auto relative flex items-center justify-center transition-all duration-300 ${
          isIdle && !hovered && !active ? "opacity-35 hover:opacity-100" : "opacity-100"
        }`}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onPointerDown={onTrackPointerDown}
          className={`relative h-[55vh] min-h-[220px] max-h-[480px] cursor-pointer rounded-full transition-all duration-200 ${
            hovered || active
              ? "w-2.5 bg-[var(--forest-deep)]/20 shadow-sm"
              : "w-1 bg-[var(--forest-deep)]/15"
          }`}
          role="scrollbar"
          aria-controls="main"
          aria-orientation="vertical"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Thumb */}
          <button
            type="button"
            data-scrollbar-thumb
            aria-label={`Scroll to ${percent} percent`}
            onPointerDown={onThumbPointerDown}
            className={`group absolute left-1/2 -translate-x-1/2 rounded-full cursor-grab active:cursor-grabbing transition-[width,background-color,box-shadow,border-color] duration-150 ${
              active
                ? "w-3.5 bg-[var(--gold)] shadow-gold border border-[var(--gold)]"
                : hovered
                  ? "w-3 bg-gradient-to-b from-[var(--gold)] to-[var(--copper)] shadow-sm border border-[var(--gold)]/60"
                  : "w-1.5 bg-[var(--forest-deep)] hover:bg-[var(--gold)]"
            }`}
            style={{
              height: metrics.thumbH,
              top: metrics.thumbTop,
            }}
          >
            {/* Interactive percentage tooltip on hover/drag */}
            <AnimatePresence>
              {(hovered || active) && (
                <motion.span
                  initial={{ opacity: 0, x: 8, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 6, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--forest-deep)] px-2 py-0.5 text-[10px] font-bold text-[var(--gold)] shadow-md border border-[var(--gold)]/30 font-mono tracking-tight"
                >
                  {percent}%
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </aside>
  );
}
