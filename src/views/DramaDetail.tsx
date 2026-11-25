import type { Drama } from "@/data/dramas";
import { DRAMAS } from "@/data/dramas";
import { PosterCard } from "@/components/PosterCard";
import { DramaPoster } from "@/components/DramaPoster";
import { Rail } from "@/components/Rail";
import { IconBack, IconEye, IconHeart, IconPlay, IconStar } from "@/components/icons";

interface Props {
  drama: Drama;
  onBack: () => void;
  onPlay: (drama: Drama, ep: number) => void;
  onOpen: (drama: Drama) => void;
  isFav: (id: string) => boolean;
  onToggleFav: (id: string) => void;
  progress: (dramaId: string, ep: number) => { seconds: number; duration: number } | undefined;
}

export function DramaDetail({ drama, onBack, onPlay, onOpen, isFav, onToggleFav, progress }: Props) {
  const fav = isFav(drama.id);
  const similar = DRAMAS.filter((d) => d.id !== drama.id && (d.genre === drama.genre || d.tags.some((t) => drama.tags.includes(t)))).slice(0, 8);
  const similarList = similar.length > 0 ? similar : DRAMAS.filter((d) => d.id !== drama.id).slice(0, 8);

  return (
    <div className="page-enter pb-28 md:pb-10">
      {/* backdrop */}
      <div className="relative isolate h-[46vh] min-h-[340px] overflow-hidden md:h-[52vh]">
        {drama.art || !drama.poster ? (
          <div className="absolute inset-0 bg-[#141a26]" />
        ) : (
          <img src={drama.poster} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_15%] blur-md brightness-[.45]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <button
          onClick={onBack}
          aria-label="Retour"
          className="absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink/60 text-bone backdrop-blur transition hover:text-gold-2 active:scale-90 md:left-8"
        >
          <IconBack className="h-5 w-5" />
        </button>
      </div>

      {/* main info */}
      <div className="relative z-10 -mt-40 px-4 md:-mt-52 md:px-8">
        <div className="flex gap-5 md:gap-8">
          <div className="w-36 shrink-0 overflow-hidden rounded-md shadow-[0_20px_60px_-15px_rgba(0,0,0,.8)] sm:w-44 md:w-56">
            <DramaPoster drama={drama} className="aspect-[2/3]" imgClassName="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 pt-2 md:pt-20">
            {drama.isNew && (
              <span className="rounded-sm bg-gold px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                Nouveau
              </span>
            )}
            <h1 className="text-display mt-2 text-3xl font-semibold text-bone sm:text-4xl md:text-6xl">{drama.title}</h1>
            <p className="font-accent mt-1 text-lg italic text-gold-2/90 md:text-xl">{drama.originalTitle}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-mist">
              <span className="inline-flex items-center gap-1.5 text-gold-2"><IconStar className="h-4 w-4" />{drama.rating.toFixed(1)}</span>
              <span>{drama.year}</span>
              <span>{drama.genre}</span>
              <span className="inline-flex items-center gap-1.5"><IconEye className="h-4 w-4" />{drama.views} vues</span>
              <span>{drama.episodes.length} épisodes</span>
            </div>
            <div className="mt-5 hidden gap-3 md:flex">
              <button
                onClick={() => onPlay(drama, 1)}
                className="inline-flex h-12 items-center gap-2.5 rounded-sm bg-gold px-7 text-sm font-bold uppercase tracking-widest text-ink transition-all duration-300 hover:bg-gold-2 hover:shadow-[0_8px_30px_-6px_var(--gold)] active:scale-95"
              >
                <IconPlay className="h-4 w-4" /> Regarder l'ép. 1
              </button>
              <button
                onClick={() => onToggleFav(drama.id)}
                aria-pressed={fav}
                className={`inline-flex h-12 items-center gap-2 rounded-sm border px-6 text-sm font-semibold uppercase tracking-widest transition-all duration-300 active:scale-95 ${
                  fav ? "border-gold bg-gold/15 text-gold-2" : "border-bone/25 text-bone hover:border-gold/60 hover:text-gold-2"
                }`}
              >
                <IconHeart filled={fav} className="h-4 w-4" /> {fav ? "Dans ma liste" : "Ma liste"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-mist">{drama.synopsis}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {drama.tags.map((t) => (
            <span key={t} className="rounded-sm border border-line px-2.5 py-1 text-xs text-mist">#{t}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-dim">
          <span className="font-semibold uppercase tracking-widest text-mist">Distribution · </span>
          {drama.cast.join(", ")}
        </p>

        <div className="mt-6 flex gap-3 md:hidden">
          <button
            onClick={() => onPlay(drama, 1)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2.5 rounded-sm bg-gold text-sm font-bold uppercase tracking-widest text-ink transition active:scale-95"
          >
            <IconPlay className="h-4 w-4" /> Regarder
          </button>
          <button
            onClick={() => onToggleFav(drama.id)}
            aria-pressed={fav}
            aria-label="Ajouter à ma liste"
            className={`flex h-12 w-12 items-center justify-center rounded-sm border transition active:scale-95 ${
              fav ? "border-gold bg-gold/15 text-gold-2" : "border-bone/25 text-bone"
            }`}
          >
            <IconHeart filled={fav} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* episodes */}
      <div className="mt-10 px-4 md:px-8">
        <h2 className="text-display text-2xl text-bone">Épisodes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {drama.episodes.map((ep) => {
            const p = progress(drama.id, ep.n);
            const pct = p && p.duration > 0 ? Math.min(100, (p.seconds / p.duration) * 100) : 0;
            return (
              <button
                key={ep.n}
                onClick={() => onPlay(drama, ep.n)}
                className="group relative overflow-hidden rounded-md border border-line bg-ink-2 text-left transition-all duration-300 hover:border-gold/50 hover:bg-ink-3 focus-visible:border-gold"
              >
                <div className="relative h-28 overflow-hidden">
                  <DramaPoster drama={drama} variant="bare" className="h-full w-full opacity-60 transition-transform duration-500 group-hover:scale-105" imgClassName="h-full w-full object-cover object-[center_20%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 to-transparent" />
                  <span className="text-display absolute left-3 top-2 text-3xl font-bold text-bone/90">{String(ep.n).padStart(2, "0")}</span>
                  <span className="absolute bottom-2.5 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <IconPlay className="ml-0.5 h-4 w-4" />
                  </span>
                  {pct > 0 && (
                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-bone/15">
                      <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-bone">
                    Épisode {ep.n} — {ep.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-mist">{ep.synopsis}</p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-widest text-dim">{ep.duration} min</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* similar */}
      <div className="mt-12">
        <Rail title="Vous aimerez aussi">
          {similarList.map((d) => (
            <PosterCard key={d.id} drama={d} onOpen={onOpen} onPlay={(dd) => onPlay(dd, 1)} />
          ))}
        </Rail>
      </div>
    </div>
  );
}
