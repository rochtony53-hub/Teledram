import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — non-blocking */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export interface WatchProgress {
  dramaId: string;
  ep: number;
  title: string;
  poster: string;
  seconds: number;
  duration: number;
  updatedAt: number;
}

export function useWatchHistory() {
  const [history, setHistory] = useLocalStorage<WatchProgress[]>("teledrama:history", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("teledrama:favorites", []);

  const upsertProgress = useCallback((p: WatchProgress) => {
    setHistory((h) => {
      const rest = h.filter((x) => !(x.dramaId === p.dramaId && x.ep === p.ep));
      return [p, ...rest].slice(0, 40);
    });
  }, [setHistory]);

  const toggleFavorite = useCallback((dramaId: string) => {
    setFavorites((f) => (f.includes(dramaId) ? f.filter((x) => x !== dramaId) : [...f, dramaId]));
  }, [setFavorites]);

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return { history, favorites, upsertProgress, toggleFavorite, clearHistory };
}
