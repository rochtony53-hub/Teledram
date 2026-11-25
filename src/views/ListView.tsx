import { DRAMAS } from "@/data/dramas";
import { PosterCard } from "@/components/PosterCard";
import { DramaPoster } from "@/components/DramaPoster";
import { Rail } from "@/components/Rail";
import type { Drama } from "@/data/dramas";
import type { WatchProgress } from "@/hooks/useLocalStorage";
import { IconClock, IconHeart, IconPlay, IconTrash } from "@/components/icons";

interface Props {
  favorites: string[];
  history: WatchProgress[];
  onOpen: (drama: Drama) => void;
  onPlay: (drama: Drama, ep: number, resumeAt?: number) => void;
  onClearHistory: () => void;
}

export function ListView({ favorites, history, onOpen, onPlay, onClearHistory }: Props) {
  const favDramas = DRAMAS.filter((d) => favorites.includes(d.id));

  return (
    <div className="page-enter min-h-dvh pb-28 pt-6 md:pb-10 md:pt-24">
      {/* continue watching */}
      {history.length > 0 && (
        <div className="px-4 md:px-8">
          <div className="mb-3 flex items-end justify-between">
            <h1 className="text-display flex items-center gap-2 text-2xl text-bone md:text-3xl">
              <IconClock className="h-6 w-6 text-gold" /> Reprendre la lecture
            </h1>
            <button
              onClick={onClearHistory}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-mist transition hover:text-blood"
            >
              <IconTrash className="h-4 w-4" /> Effacer
            </button>
          </div>
          <Rail title="">
            <div className="flex gap-3">
              {history.slice(0, 12).map((h) => {
                const drama = DRAMAS.find((d) => d.id === h.dramaId);
                if (!drama) return null;
                const pct = h.duration > 0 ? Math.min(100, (h.seconds / h.duration) * 100) : 0;
                return (
                  <button
                    key={`${h.dramaId}-${h.ep}`}
                    onClick={() => onPlay(drama, h.ep, h.seconds)}
                    className="group relative w-[240px] shrink-0 overflow-hidden rounded-md border border-line text-left transition hover:border-gold/50"
                  >
                    <div className="relative aspect-video">
                      <DramaPoster drama={drama} variant="bare" className="h-full w-full opacity-70 transition duration-500 group-hover:scale-105" imgClassName="h-full w-full object-cover object-[center_20%]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                      <span className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition group-hover:opacity-100">
                        <IconPlay className="ml-0.5 h-5 w-5" />
                      </span>
                      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-bone/15">
                        <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="bg-ink-2 p-3">
                      <p className="truncate text-sm font-semibold text-bone">{h.title}</p>
                      <p className="text-xs text-mist">Épisode {h.ep} · {Math.round(pct)}% vu</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Rail>
        </div>
      )}

      {/* favorites */}
      <div className="mt-10 px-4 md:px-8">
        <h1 className="text-display flex items-center gap-2 text-2xl text-bone md:text-3xl">
          <IconHeart className="h-6 w-6 text-gold" /> Ma liste
          <span className="ml-1 rounded-sm bg-ink-2 px-2 py-0.5 font-sans text-xs font-semibold text-mist">{favDramas.length}</span>
        </h1>

        {favDramas.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {favDramas.map((d) => (
              <PosterCard key={d.id} drama={d} onOpen={onOpen} onPlay={(dd) => onPlay(dd, 1)} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center gap-3 px-4 text-center">
            <IconHeart className="h-10 w-10 text-dim" />
            <p className="text-display text-2xl text-bone">Votre liste est vide</p>
            <p className="max-w-sm text-sm text-mist">
              Ajoutez des dramas à votre liste depuis la page d'accueil ou la fiche d'un série — retrouvez-les ici, prêts à regarder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
