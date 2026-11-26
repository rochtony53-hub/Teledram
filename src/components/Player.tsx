import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE } from "@/data/dramas";
import type { Drama, Episode } from "@/data/dramas";
import { IconBack, IconFullscreen, IconMute, IconNext, IconPause, IconPlay, IconVolume } from "./icons";
import type { WatchProgress } from "@/hooks/useLocalStorage";

interface Props {
  drama: Drama;
  startEp: number;
  resumeAt?: number;
  onClose: () => void;
  onSaveProgress: (p: WatchProgress) => void;
  onOpenDrama: () => void;
}

function fmt(s: number) {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function Player({ drama, startEp, resumeAt, onClose, onSaveProgress, onOpenDrama }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | null>(null);

  const [ep, setEp] = useState<Episode>(() => drama.episodes.find((e) => e.n === startEp) ?? drama.episodes[0]);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(ep.seconds);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [controlsOn, setControlsOn] = useState(true);
  const [error, setError] = useState(false);

  const epIndex = drama.episodes.findIndex((e) => e.n === ep.n);
  const nextEp = drama.episodes[epIndex + 1];

  /* compte une vue par episode ouvert (episodes venant de l'admin) */
  useEffect(() => {
    if (ep.id) fetch(API_BASE + "/api/view/" + ep.id, { method: "POST", keepalive: true }).catch(() => {});
  }, [ep.id]);

  const pokeControls = useCallback(() => {
    setControlsOn(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setControlsOn(false), 3000);
  }, []);

  const save = useCallback(
    (t: number, d: number) => {
      onSaveProgress({
        dramaId: drama.id,
        ep: ep.n,
        title: drama.title,
        poster: drama.poster,
        seconds: Math.floor(t),
        duration: Math.floor(d) || ep.seconds,
        updatedAt: Date.now(),
      });
    },
    [drama, ep, onSaveProgress]
  );

  /* load & resume */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setTime(0);
    setBuffering(true);
    setError(false);
    v.load();
    v.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ep.n]);

  useEffect(() => {
    if (resumeAt && resumeAt > 5) {
      const v = videoRef.current;
      if (v) v.currentTime = resumeAt;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ep.n]);

  /* periodic progress save */
  useEffect(() => {
    const t = window.setInterval(() => {
      const v = videoRef.current;
      if (v && !v.paused) save(v.currentTime, v.duration);
    }, 5000);
    return () => window.clearInterval(t);
  }, [save]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      if (e.key === "Escape") onClose();
      else if (e.key === " ") { e.preventDefault(); v.paused ? v.play() : v.pause(); }
      else if (e.key === "ArrowRight") v.currentTime = Math.min(v.duration || 0, v.currentTime + 10);
      else if (e.key === "ArrowLeft") v.currentTime = Math.max(0, v.currentTime - 10);
      else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "m") setMuted((m) => !m);
      pokeControls();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, pokeControls]);

  /* save & pause on unmount */
  useEffect(() => {
    return () => {
      const v = videoRef.current;
      if (v) save(v.currentTime, v.duration);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else shellRef.current?.requestFullscreen().catch(() => {});
  };

  const goTo = (episode: Episode) => {
    const v = videoRef.current;
    if (v) save(v.currentTime, v.duration);
    setEp(episode);
  };

  const fill = dur > 0 ? (time / dur) * 100 : 0;

  return (
    <div
      ref={shellRef}
      className="fixed inset-0 z-50 flex flex-col bg-ink"
      onMouseMove={pokeControls}
      onTouchStart={pokeControls}
    >
      {/* top bar */}
      <div
        className={`absolute inset-x-0 top-0 z-20 flex items-center gap-3 bg-gradient-to-b from-ink/90 to-transparent px-4 pb-8 pt-4 transition-opacity duration-300 md:px-6 ${
          controlsOn ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Retour"
          className="flex h-11 w-11 items-center justify-center rounded-full text-bone transition hover:bg-bone/10 hover:text-gold-2 active:scale-90"
        >
          <IconBack className="h-5 w-5" />
        </button>
        <button onClick={onOpenDrama} className="min-w-0 text-left">
          <p className="text-display truncate text-lg text-bone">{drama.title}</p>
          <p className="truncate text-xs uppercase tracking-widest text-mist">
            Épisode {ep.n} — {ep.title}
          </p>
        </button>
      </div>

      {/* video area */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center"
        onClick={() => {
          const v = videoRef.current;
          if (!v) return;
          v.paused ? v.play() : v.pause();
          pokeControls();
        }}
      >
        <video
          ref={videoRef}
          className="max-h-full w-full object-contain md:max-w-5xl"
          src={ep.video}
          poster={drama.art ? undefined : drama.poster}
          playsInline
          preload="auto"
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration || ep.seconds)}
          onWaiting={() => setBuffering(true)}
          onPlaying={() => setBuffering(false)}
          onCanPlay={() => setBuffering(false)}
          onEnded={() => {
            const v = videoRef.current;
            if (v) save(v.duration, v.duration);
            if (nextEp) goTo(nextEp);
            else setPlaying(false);
          }}
          onError={() => setError(true)}
        />

        {/* center state */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {buffering && !error && (
            <div className="h-14 w-14 animate-spin rounded-full border-2 border-bone/20 border-t-gold" role="status" aria-label="Chargement" />
          )}
          {!buffering && !playing && !error && (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink/60 text-gold-2 backdrop-blur">
              <IconPlay className="ml-1 h-9 w-9" />
            </div>
          )}
        </div>

        {error && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-display text-2xl text-bone">Épisode indisponible</p>
            <p className="max-w-sm text-sm text-mist">La vidéo n'a pas pu être chargée. Vérifiez votre connexion puis réessayez.</p>
            <button
              onClick={() => { setError(false); videoRef.current?.load(); }}
              className="pointer-events-auto mt-2 rounded-sm bg-gold px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-gold-2 active:scale-95"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>

      {/* bottom controls */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent px-4 pb-5 pt-10 transition-opacity duration-300 md:px-6 ${
          controlsOn && !error ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <input
          type="range"
          min={0}
          max={dur || ep.seconds}
          step={0.1}
          value={time}
          aria-label="Progression de la lecture"
          className="seek w-full"
          style={{ ["--fill" as string]: `${fill}%` }}
          onChange={(e) => {
            const v = videoRef.current;
            if (v) v.currentTime = Number(e.target.value);
            setTime(Number(e.target.value));
          }}
        />
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); const v = videoRef.current; if (v) (v.paused ? v.play() : v.pause()); }}
            aria-label={playing ? "Mettre en pause" : "Lire"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-bone transition hover:bg-bone/10 hover:text-gold-2 active:scale-90"
          >
            {playing ? <IconPause className="h-5 w-5" /> : <IconPlay className="ml-0.5 h-5 w-5" />}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); const v = videoRef.current; if (v) v.currentTime = Math.max(0, v.currentTime - 10); }}
            aria-label="Reculer de 10 secondes"
            className="hidden h-10 items-center rounded-full px-2 text-[11px] font-bold tracking-wider text-bone transition hover:bg-bone/10 hover:text-gold-2 sm:flex"
          >
            -10s
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); const v = videoRef.current; if (v) v.currentTime = Math.min(v.duration || 0, v.currentTime + 10); }}
            aria-label="Avancer de 10 secondes"
            className="hidden h-10 items-center rounded-full px-2 text-[11px] font-bold tracking-wider text-bone transition hover:bg-bone/10 hover:text-gold-2 sm:flex"
          >
            +10s
          </button>

          <span className="ml-1 text-xs tabular-nums text-mist">
            {fmt(time)} <span className="text-dim">/</span> {fmt(dur)}
          </span>

          <div className="flex-1" />

          {nextEp && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(nextEp); }}
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-xs font-bold uppercase tracking-wider text-bone transition hover:bg-bone/10 hover:text-gold-2"
              aria-label="Épisode suivant"
            >
              <IconNext className="h-4.5 w-4.5" /> Ép. {nextEp.n}
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
            aria-label={muted ? "Rétablir le son" : "Couper le son"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-bone transition hover:bg-bone/10 hover:text-gold-2 active:scale-90"
          >
            {muted ? <IconMute className="h-5 w-5" /> : <IconVolume className="h-5 w-5" />}
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
            aria-label="Plein écran"
            className="flex h-10 w-10 items-center justify-center rounded-full text-bone transition hover:bg-bone/10 hover:text-gold-2 active:scale-90"
          >
            <IconFullscreen className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* episode synopsis strip */}
      <div
        className={`pointer-events-none absolute bottom-0 z-10 hidden px-6 pb-24 md:block ${
          controlsOn ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <p className="max-w-md text-xs leading-relaxed text-mist">{ep.synopsis}</p>
      </div>
    </div>
  );
}
