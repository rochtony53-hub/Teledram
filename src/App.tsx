import { useEffect, useState } from "react";
import { DRAMAS, byId, loadRemote } from "@/data/dramas";
import type { Drama } from "@/data/dramas";
import { useWatchHistory } from "@/hooks/useLocalStorage";
import { NavBar } from "@/components/NavBar";
import type { Tab } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { Rail } from "@/components/Rail";
import { PosterCard } from "@/components/PosterCard";
import { Player } from "@/components/Player";
import { DramaDetail } from "@/views/DramaDetail";
import { SearchView } from "@/views/SearchView";
import { ListView } from "@/views/ListView";
import { IconFlame, IconSparkle, IconHeart, IconClock } from "@/components/icons";

type View = { name: "home" } | { name: "detail"; id: string } | { name: "search" } | { name: "list" };
type Session = { dramaId: string; ep: number; resumeAt?: number } | null;

export default function App() {
  const [view, setView] = useState<View>({ name: "home" });
  const [session, setSession] = useState<Session>(null);
  const { history, favorites, upsertProgress, toggleFavorite, clearHistory } = useWatchHistory();
  const [, setCatalogVersion] = useState(0);
  useEffect(() => {
    loadRemote().then((ok) => ok && setCatalogVersion((n) => n + 1));
  }, []);

  /* scroll restoration per view */
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, session]);

  /* lock body scroll when player is open */
  useEffect(() => {
    document.body.style.overflow = session ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [session]);

  const openDrama = (d: Drama) => setView({ name: "detail", id: d.id });
  const play = (d: Drama, ep = 1, resumeAt?: number) => setSession({ dramaId: d.id, ep, resumeAt });
  const navigate = (tab: Tab) => setView({ name: tab } as View);

  const isFav = (id: string) => favorites.includes(id);
  const progressOf = (dramaId: string, ep: number) => history.find((h) => h.dramaId === dramaId && h.ep === ep);

  const featuredRaw = DRAMAS.filter((d) => d.featured);
  const featured = featuredRaw.length ? featuredRaw : DRAMAS.slice(0, 3);
  const trending = [...DRAMAS].sort((a, b) => (a.trending ?? 99) - (b.trending ?? 99)).slice(0, 6);
  const news = DRAMAS.filter((d) => d.isNew);
  const romance = DRAMAS.filter((d) => d.genre.includes("Romance") || d.tags.includes("amour"));
  const intense = DRAMAS.filter((d) => d.genre.match(/Thriller|Crime|Drame/));
  const fantastic = DRAMAS.filter((d) => d.genre.includes("Fantastique") || d.genre.includes("Science-fiction"));

  const currentDrama = session ? byId(session.dramaId) : undefined;
  const detailDrama = view.name === "detail" ? byId(view.id) : undefined;

  return (
    <div className="grain min-h-dvh bg-ink text-bone">
      {view.name !== "detail" && (
        <NavBar tab={view.name === "home" ? "home" : view.name} onNavigate={navigate} count={favorites.length} />
      )}

      {view.name === "home" && (
        <main className="page-enter pb-10">
          <Hero dramas={featured} onPlay={(d) => play(d, 1)} onOpen={openDrama} isFav={isFav} onToggleFav={toggleFavorite} />

          <div className="mt-[-2.5rem] space-y-9 md:mt-[-3.5rem]">
            <Rail title="Tendances" icon={<IconFlame className="h-5 w-5" />}>
              {trending.map((d, i) => (
                <PosterCard key={d.id} drama={d} rank={i + 1} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>

            {news.length > 0 && (
<Rail title="Nouveautés" icon={<IconSparkle className="h-5 w-5" />}>
              {news.map((d) => (
                <PosterCard key={d.id} drama={d} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>
)}

            {history.length > 0 && (
              <Rail title="Reprendre" icon={<IconClock className="h-5 w-5" />}>
                {history.slice(0, 10).map((h) => {
                  const d = byId(h.dramaId);
                  if (!d) return null;
                  return <PosterCard key={`${h.dramaId}-${h.ep}`} drama={d} onOpen={openDrama} onPlay={() => play(d, h.ep, h.seconds)} />;
                })}
              </Rail>
            )}

            {romance.length > 0 && (
<Rail title="Romance">
              {romance.map((d) => (
                <PosterCard key={d.id} drama={d} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>
)}

            {intense.length > 0 && (
<Rail title="Intense et captivant">
              {intense.map((d) => (
                <PosterCard key={d.id} drama={d} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>
)}

            {fantastic.length > 0 && (
<Rail title="Fantastique et ailleurs">
              {fantastic.map((d) => (
                <PosterCard key={d.id} drama={d} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>
)}

            <Rail title="Tout le catalogue" icon={<IconHeart className="h-5 w-5" />}>
              {DRAMAS.map((d) => (
                <PosterCard key={d.id} drama={d} onOpen={openDrama} onPlay={(dd) => play(dd, 1)} />
              ))}
            </Rail>
          </div>

          <footer className="mt-14 border-t border-line px-4 py-8 md:px-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <p className="text-display text-xl text-bone">Teledrama</p>
              <p className="text-xs text-dim">
                Dramas courts premium · Sans publicité · Sans compte · Démo technique — les vidéos d'exemple proviennent d'archives libres de droits.
              </p>
            </div>
          </footer>
        </main>
      )}

      {view.name === "search" && <SearchView onOpen={openDrama} onPlay={(d) => play(d, 1)} />}

      {view.name === "list" && (
        <ListView
          favorites={favorites}
          history={history}
          onOpen={openDrama}
          onPlay={(d, ep, resume) => play(d, ep, resume)}
          onClearHistory={clearHistory}
        />
      )}

      {view.name === "detail" && detailDrama && (
        <DramaDetail
          drama={detailDrama}
          onBack={() => setView({ name: "home" })}
          onPlay={(d, ep) => {
            const p = progressOf(d.id, ep);
            play(d, ep, p?.seconds);
          }}
          onOpen={openDrama}
          isFav={isFav}
          onToggleFav={toggleFavorite}
          progress={(id, ep) => progressOf(id, ep)}
        />
      )}

      {session && currentDrama && (
        <Player
          drama={currentDrama}
          startEp={session.ep}
          resumeAt={session.resumeAt}
          onClose={() => setSession(null)}
          onSaveProgress={upsertProgress}
          onOpenDrama={() => {
            setSession(null);
            setView({ name: "detail", id: currentDrama.id });
          }}
        />
      )}
    </div>
  );
}
