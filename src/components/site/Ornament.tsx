export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-[var(--gold)] ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current" />
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2c2 6 6 10 12 12-6 2-10 6-12 12-2-6-6-10-12-12 6-2 10-6 12-12Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current" />
    </div>
  );
}

export function LeafSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <path
        d="M50 6C24 20 14 44 22 72c4 14 16 22 28 22 12 0 24-8 28-22C86 44 76 20 50 6Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M50 8v86M28 40c8 4 16 6 22 6M72 40c-8 4-16 6-22 6M32 60c8 4 12 6 18 6M68 60c-8 4-12 6-18 6" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.9">
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="100" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="180" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 60}
              y1={200 + Math.sin(a) * 60}
              x2={200 + Math.cos(a) * 180}
              y2={200 + Math.sin(a) * 180}
            />
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const cx = 200 + Math.cos(a) * 120;
          const cy = 200 + Math.sin(a) * 120;
          return <circle key={i} cx={cx} cy={cy} r="18" />;
        })}
      </g>
    </svg>
  );
}
