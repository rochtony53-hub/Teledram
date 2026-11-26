import { useMemo, useRef, useState } from "react";
import { DRAMAS } from "@/data/dramas";
import { PosterCard } from "@/components/PosterCard";
import type { Drama } from "@/data/dramas";
import { IconClose, IconSearch } from "@/components/icons";

interface Props {
  onOpen: (drama: Drama) => void;
  onPlay: (drama: Drama) => void;
}

const FILTERS = ["Tout", "Romance", "Drame", "Thriller", "Crime", "Fantastique", "Médical", "Science-fiction", "Comédie"] as const;

export function SearchView({ onOpen, onPlay }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tout");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DRAMAS.filter((d) => {
      const matchFilter =
        filter === "Tout" ||
        d.genre.toLowerCase().includes(filter.toLowerCase()) ||
        (filter === "Comédie" && d.genre.includes("Corporate"));
      if (!q) return matchFilter;
      const hay = [d.title, d.originalTitle, d.tagline, d.genre, ...d.tags, ...d.cast].join(" ").toLowerCase();
      return matchFilter && hay.includes(q);
    });
  }, [query, filter]);

  return (
    <div className="page-enter mx-auto min-h-dvh max-w-6xl px-4 pb-28 pt-6 md:pb-10 md:pt-24">
      <h1 className="text-display text-4xl font-semibold text-bone md:text-5xl">Recherche</h1>

      <div className="relative mt-6">
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-dim" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Titre, acteur, genre, mot-clé…"
          aria-label="Rechercher un drama"
          className="h-14 w-full rounded-sm border border-line bg-ink-2 pl-12 pr-12 text-[15px] text-bone placeholder:text-dim transition focus:border-gold/60 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            aria-label="Effacer la recherche"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-mist transition hover:bg-bone/10 hover:text-bone"
          >
            <IconClose className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 ${
              filter === f
                ? "border-gold bg-gold text-ink"
                : "border-line text-mist hover:border-gold/50 hover:text-gold-2"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-dim">
        {results.length} résultat{results.length > 1 ? "s" : ""}
        {query && <> pour « <span className="text-bone">{query}</span> »</>}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {results.map((d) => (
            <PosterCard key={d.id} drama={d} onOpen={onOpen} onPlay={onPlay} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <IconSearch className="h-10 w-10 text-dim" />
          <p className="text-display text-2xl text-bone">Aucun résultat</p>
          <p className="max-w-sm text-sm text-mist">
            Essayez un autre titre, un autre genre ou un mot-clé différent. Le catalogue Teledrama grandit chaque semaine.
          </p>
          <button
            onClick={() => { setQuery(""); setFilter("Tout"); }}
            className="mt-2 rounded-sm border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-mist transition hover:border-gold/50 hover:text-gold-2"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}
