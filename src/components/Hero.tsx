import { useEffect, useState } from "react";
import type { Drama } from "@/data/dramas";
import { DramaPoster } from "./DramaPoster";
import { IconPlay, IconStar, IconEye, IconHeart } from "./icons";

interface Props {
  dramas: Drama[];
  onPlay: (drama: Drama) => void;
  onOpen: (drama: Drama) => void;
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
}

const SLIDE_MS = 6000;

export function Hero({ dramas, onPlay, onOpen, isFav, onToggleFav }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || dramas.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % dramas.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, dramas.length]);

  if (dramas.length === 0) return null;
  const drama = dramas[index];

  return (
    <div
      className="relative isolate h-[92dvh] min-h-[540px] max-h-[860px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {dramas.map((d, i) => (
        <div
          key={d.id}
          className={`hero-slide absolute inset-0 ${i === index ? "active" : ""}`}
          aria-hidden={i !== index}
        >
          <DramaPoster
            drama={d}
            variant="bare"
            className="absolute inset-0 h-full w-full"
            imgClassName="absolute inset-0 h-full w-full scale-105 object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
        </div>
      ))}

      {/* content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-28 md:px-8 md:pb-28">
        <div key={drama.id} className="max-w-2xl">
          <p className="hero-kicker mb-3 inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-ink/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-2 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Série originale Dramini
          </p>
          <h1 className="text-display hero-title text-5xl font-semibold text-bone sm:text-6xl md:text-7xl">
            {drama.title}
          </h1>
          <p className="font-accent mt-3 max-w-xl text-xl italic text-gold-2/90 md:text-2xl">{drama.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-mist">
            <span className="inline-flex items-center gap-1.5 text-gold-2">
              <IconStar className="h-4 w-4" /> {drama.rating.toFixed(1)}
            </span>
            <span>{drama.year}</span>
            <span>{drama.genre}</span>
            <span className="inline-flex items-center gap-1.5">
              <IconEye className="h-4 w-4" /> {drama.views} vues
            </span>
            <span>{drama.episodes.length} épisodes</span>
          </div>

          <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-mist md:text-[15px]">
            {drama.synopsis}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => onPlay(drama)}
              className="group inline-flex h-12 items-center gap-2.5 rounded-sm bg-gold px-7 text-sm font-bold uppercase tracking-widest text-ink transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-gold-2 hover:shadow-[0_8px_30px_-6px_var(--gold)] active:scale-95"
            >
              <IconPlay className="h-4 w-4" />
              Regarder
            </button>
            <button
              onClick={() => onOpen(drama)}
              className="inline-flex h-12 items-center rounded-sm border border-bone/25 bg-ink/40 px-6 text-sm font-semibold uppercase tracking-widest text-bone backdrop-blur transition-all duration-300 hover:border-gold/60 hover:text-gold-2 active:scale-95"
            >
              Détails
            </button>
            <button
              onClick={() => onToggleFav(drama.id)}
              aria-label={isFav(drama.id) ? "Retirer de ma liste" : "Ajouter à ma liste"}
              aria-pressed={isFav(drama.id)}
              className={`flex h-12 w-12 items-center justify-center rounded-sm border backdrop-blur transition-all duration-300 active:scale-95 ${
                isFav(drama.id)
                  ? "border-gold bg-gold text-ink"
                  : "border-bone/25 bg-ink/40 text-bone hover:border-gold/60 hover:text-gold-2"
              }`}
            >
              <IconHeart filled={isFav(drama.id)} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* progress bars */}
      <div className="absolute inset-x-4 bottom-24 z-10 flex gap-1.5 md:inset-x-8 md:bottom-16">
        {dramas.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setIndex(i)}
            aria-label={`Aller à la une ${i + 1} : ${d.title}`}
            className="hero-progress flex-1 rounded-full"
          >
            <span
              key={`${i}-${i === index && !paused ? "run" : "hold"}`}
              style={
                i === index
                  ? { animation: paused ? "none" : `hero-fill ${SLIDE_MS}ms linear forwards` }
                  : i < index
                    ? { width: "100%" }
                    : undefined
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
}
