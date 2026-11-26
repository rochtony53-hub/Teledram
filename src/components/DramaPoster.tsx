import type { Drama } from "@/data/dramas";

/**
 * Renders a drama poster: generated artwork when available, otherwise a
 * code-drawn typographic art-house poster (flat, cinematic, on-palette).
 */

const MOTIFS = [
  // concentric arcs
  (k: string) => (
    <g stroke="var(--gold)" fill="none" strokeWidth="1">
      <circle cx="100" cy="150" r="42" opacity=".9" />
      <circle cx="100" cy="150" r="66" opacity=".55" />
      <circle cx="100" cy="150" r="90" opacity=".3" />
      <circle cx="100" cy="150" r="114" opacity=".14" />
      <circle cx="100" cy="150" r="138" opacity=".07" />
      <circle key={k} cx="100" cy="150" r="8" fill="var(--gold)" stroke="none" />
    </g>
  ),
  // rising diagonal bars
  () => (
    <g fill="var(--gold)">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={-40 + i * 42} y={210 - i * 30} width="10" height="260" opacity={0.9 - i * 0.14} transform={`rotate(24 ${-40 + i * 42} 210)`} />
      ))}
    </g>
  ),
  // eclipse
  () => (
    <g>
      <circle cx="100" cy="112" r="56" fill="var(--gold)" opacity=".95" />
      <circle cx="122" cy="98" r="52" fill="#10151f" />
      <circle cx="100" cy="112" r="72" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".3" />
      <rect x="0" y="186" width="200" height="1.5" fill="var(--gold)" opacity=".5" />
    </g>
  ),
  // staircase
  () => (
    <g fill="var(--gold)">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={18 + i * 24} y={238 - i * 24} width="24" height="6" opacity={0.95 - i * 0.11} />
      ))}
    </g>
  ),
  // vertical horizon split
  () => (
    <g stroke="var(--gold)" strokeWidth="1" fill="none">
      <line x1="100" y1="18" x2="100" y2="180" opacity=".9" />
      <line x1="76" y1="40" x2="76" y2="150" opacity=".4" />
      <line x1="124" y1="40" x2="124" y2="150" opacity=".4" />
      <circle cx="100" cy="196" r="30" opacity=".85" />
      <circle cx="100" cy="196" r="44" fill="none" opacity=".25" />
    </g>
  ),
  // diamond lattice
  () => (
    <g stroke="var(--gold)" strokeWidth="1" fill="none">
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <path key={`${r}${c}`} d={`M ${52 + c * 48} ${70 + r * 52} l 20 26 l -20 26 l -20 -26 Z`} opacity={0.85 - (r + c) * 0.16} />
        ))
      )}
    </g>
  ),
  // single spotlight beam
  () => (
    <g>
      <path d="M 86 20 L 114 20 L 148 236 L 52 236 Z" fill="var(--gold)" opacity=".14" />
      <circle cx="100" cy="52" r="16" fill="var(--gold)" opacity=".95" />
      <rect x="60" y="236" width="80" height="2.5" fill="var(--gold)" opacity=".8" />
    </g>
  ),
  // orbit lines
  () => (
    <g fill="none" stroke="var(--gold)" strokeWidth="1">
      <ellipse cx="100" cy="128" rx="86" ry="26" opacity=".7" transform="rotate(-18 100 128)" />
      <ellipse cx="100" cy="128" rx="86" ry="26" opacity=".35" transform="rotate(24 100 128)" />
      <circle cx="100" cy="128" r="7" fill="var(--gold)" stroke="none" />
    </g>
  ),
];

function hashId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

export function PosterArt({
  drama,
  className,
  variant = "full",
}: {
  drama: Drama;
  className?: string;
  variant?: "full" | "bare";
}) {
  const motif = MOTIFS[hashId(drama.id) % MOTIFS.length];
  const words = drama.title.split(" ");
  const last = words[words.length - 1];

  return (
    <div
      aria-label={`Affiche de ${drama.title}`}
      role="img"
      className={`relative flex h-full w-full select-none flex-col overflow-hidden bg-[#10151f] ${className ?? ""}`}
    >
      {/* faint grain + vignette */}
      <div className="absolute inset-0 opacity-[0.35]" style={{ background: "radial-gradient(120% 90% at 50% 0%, #1a2233 0%, #10151f 55%)" }} />
      <svg viewBox="0 0 200 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {motif(drama.id)}
      </svg>

      {/* frame */}
      <div className="pointer-events-none absolute inset-2.5 border border-gold/25" />

      {variant === "full" ? (
        <>
          {/* top micro-label */}
          <div className="relative z-10 flex items-center justify-between px-5 pt-6">
            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-gold/90">Teledram</span>
            <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-gold/50">{drama.year}</span>
          </div>

          {/* title block */}
          <div className="relative z-10 mt-auto px-5 pb-6">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-mist">{drama.genre.split("·")[0].trim()}</p>
            <p className="text-display mt-1.5 text-[26px] font-semibold leading-[1.02] text-bone">
              {words.slice(0, -1).join(" ") && <>{words.slice(0, -1).join(" ")}<br /></>}
              <span className="text-gold-2">{last}</span>
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-gold" />
              <span className="font-display text-[9px] font-semibold uppercase tracking-[0.3em] text-gold">{drama.episodes.length} épisodes</span>
            </div>
          </div>
        </>
      ) : (
        <div className="relative z-10 mt-auto px-5 pb-4">
          <span className="h-px w-8 bg-gold/70" />
        </div>
      )}
    </div>
  );
}

export function DramaPoster({
  drama,
  className,
  imgClassName,
  variant = "full",
}: {
  drama: Drama;
  className?: string;
  imgClassName?: string;
  variant?: "full" | "bare";
}) {
  if (drama.art || !drama.poster) {
    return <PosterArt drama={drama} className={className} variant={variant} />;
  }
  return <img src={drama.poster} alt={`Affiche de ${drama.title}`} loading="lazy" className={imgClassName ?? className} />;
}
