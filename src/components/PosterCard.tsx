import type { Drama } from "@/data/dramas";
import { DramaPoster } from "./DramaPoster";
import { IconFlame, IconStar } from "./icons";

interface Props {
  drama: Drama;
  rank?: number;
  onOpen: (drama: Drama) => void;
  onPlay: (drama: Drama) => void;
}

export function PosterCard({ drama, rank, onOpen, onPlay }: Props) {
  return (
    <div className="group relative w-[132px] shrink-0 cursor-pointer sm:w-[168px] md:w-[188px]">
      <button
        onClick={() => onOpen(drama)}
        className="block w-full text-left focus-visible:outline-offset-4"
        aria-label={`Ouvrir ${drama.title}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-ink-2 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5">
          <DramaPoster
            drama={drama}
            variant="bare"
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent opacity-90" />
          {rank !== undefined && (
            <span className="text-display absolute left-2 top-1 text-5xl font-bold text-transparent sm:text-6xl" style={{ WebkitTextStroke: "1.5px var(--gold)" }}>
              {rank}
            </span>
          )}
          {drama.isNew && (
            <span className="absolute right-2 top-2 rounded-sm bg-gold px-1.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-widest text-ink">
              Nouveau
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-2.5">
            <p className="text-display text-base leading-tight text-bone">{drama.title}</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-mist">
              <span className="inline-flex items-center gap-1 text-gold-2">
                <IconStar className="h-3 w-3" /> {drama.rating.toFixed(1)}
              </span>
              <span>{drama.genre.split("·")[0].trim()}</span>
            </div>
          </div>
        </div>
      </button>
      <button
        onClick={() => onPlay(drama)}
        aria-label={`Lecture rapide de ${drama.title}`}
        className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-ink/70 text-gold-2 opacity-0 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 hover:bg-gold hover:text-ink group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 focus-visible:pointer-events-auto focus-visible:scale-100 focus-visible:opacity-100"
      >
        <IconFlame className="hidden" />
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
        </svg>
      </button>
    </div>
  );
}
