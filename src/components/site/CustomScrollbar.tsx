import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom right-edge scrollbar with drag + click-to-jump and smooth scroll.
 * Replaces the native scrollbar on desktop (lg+).
 */
export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const [metrics, setMetrics] = useState({
    visible: false,
    thumbH: 48,
    thumbTop: 0,
    progress: 0,
  });
  const [active, setActive] = useState(false);

  const update = useCallback(() => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 8) {
      setMetrics((m) => (m.visible ? { ...m, visible: false, progress: 0 } : m));
      return;
    }

    const trackH = trackRef.current?.clientHeight ?? window.innerHeight * 0.7;
    const ratio = window.innerHeight / doc.scrollHeight;
    const thumbH = Math.max(40, Math.min(trackH * ratio, trackH * 0.45));
    const maxThumbTop = Math.max(1, trackH - thumbH);
    const progress = window.scrollY / scrollable;
    const thumbTop = progress * maxThumbTop;

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

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
      update();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-scrollbar-thumb]")) return;
    dragOffset.current = metrics.thumbH / 2;
    scrollToThumbY(e.clientY, true);
  };

  return (
    <div
      className={`pointer-events-none fixed right-0 top-0 z-[60] hidden h-dvh w-4 items-center justify-center py-20 lg:flex ${
        metrics.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        className={`pointer-events-auto relative h-full w-1.5 cursor-pointer rounded-full transition-colors duration-300 ${
          active
            ? "bg-[var(--forest-deep)]/20"
            : "bg-[var(--forest-deep)]/10 hover:bg-[var(--forest-deep)]/15"
        }`}
        role="scrollbar"
        aria-controls="main"
        aria-orientation="vertical"
        aria-valuenow={Math.round(metrics.progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <button
          type="button"
          data-scrollbar-thumb
          aria-label="Drag to scroll"
          onPointerDown={onThumbPointerDown}
          className={`absolute left-1/2 w-3 -translate-x-1/2 cursor-grab rounded-full border border-[var(--gold)]/40 bg-[var(--forest-deep)] shadow-[0_2px_10px_rgba(26,58,42,0.25)] transition-[width,background-color,box-shadow] duration-200 active:cursor-grabbing ${
            active
              ? "w-3.5 bg-[var(--gold)] border-[var(--gold)] shadow-gold"
              : "hover:w-3.5 hover:bg-[var(--forest)]"
          }`}
          style={{
            height: metrics.thumbH,
            transform: `translate(-50%, 0)`,
            top: metrics.thumbTop,
          }}
        />
      </div>
    </div>
  );
}
