"use client";

/** Bola de tênis com volume (3D via gradientes) + costura. */
export function TennisBall({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ballBody" cx="36%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f3ff9e" />
          <stop offset="45%" stopColor="#d8f84a" />
          <stop offset="80%" stopColor="#a7d108" />
          <stop offset="100%" stopColor="#7fa005" />
        </radialGradient>
        <radialGradient id="ballHi" cx="34%" cy="26%" r="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#ballBody)" />
      <path
        d="M14 42 C40 56, 80 56, 106 42"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d="M14 78 C40 64, 80 64, 106 78"
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.92"
      />
      <circle cx="60" cy="60" r="56" fill="url(#ballHi)" />
      <circle cx="60" cy="60" r="55" fill="none" stroke="#5f7a03" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  );
}

/** Raquete de padel estilizada. */
export function PadelRacket({
  size = 160,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 140 220"
      width={size}
      height={(size * 220) / 140}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="racketFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c9a53" />
          <stop offset="100%" stopColor="#0a4f31" />
        </linearGradient>
      </defs>
      <rect x="62" y="150" width="16" height="60" rx="8" fill="#0b2a1c" />
      <rect x="58" y="188" width="24" height="26" rx="8" fill="#063019" />
      <path
        d="M70 8 C112 8 132 48 132 92 C132 132 104 158 70 158 C36 158 8 132 8 92 C8 48 28 8 70 8 Z"
        fill="url(#racketFace)"
        stroke="#d8f84a"
        strokeWidth="4"
      />
      {/* furos */}
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 5 }).map((_, c) => {
          const cx = 40 + c * 15;
          const cy = 48 + r * 18;
          const d = Math.hypot(cx - 70, cy - 90);
          if (d > 56) return null;
          return <circle key={`${r}-${c}`} cx={cx} cy={cy} r="4.5" fill="#ffffff" opacity="0.35" />;
        })
      )}
    </svg>
  );
}

/** Ícone de raquete de tênis (linha). */
export function TennisRacketIcon({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" aria-hidden="true">
      <ellipse cx="9.5" cy="8.5" rx="6.5" ry="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 4.5 15 13M4 9h11M9.5 1.5v14" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
      <path d="M13.8 13.8 20.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
