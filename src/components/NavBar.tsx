import type { ComponentType, SVGProps } from "react";
import { IconHeart, IconHome, IconLogo, IconSearch } from "./icons";

type NavIcon = ComponentType<SVGProps<SVGSVGElement> & { filled?: boolean }>;

export type Tab = "home" | "search" | "list";

interface Props {
  tab: Tab;
  onNavigate: (tab: Tab) => void;
  count: number;
}

export function NavBar({ tab, onNavigate, count }: Props) {
  return (
    <>
      {/* desktop top bar */}
      <header className="fixed inset-x-0 top-0 z-40 hidden items-center justify-between bg-gradient-to-b from-ink/90 to-transparent px-8 py-4 backdrop-blur-sm md:flex">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2.5" aria-label="Teledrama — Accueil">
          <IconLogo className="h-8 w-8 text-gold" />
          <span className="text-display text-2xl font-semibold tracking-wide text-bone">Teledrama</span>
        </button>
        <nav className="flex items-center gap-8">
          {(
            [
              ["home", "Accueil"],
              ["search", "Recherche"],
              ["list", "Ma liste"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-pressed={tab === id}
              className={`group relative py-1 text-sm font-semibold uppercase tracking-[0.15em] transition-colors ${
                tab === id ? "text-gold-2" : "text-mist hover:text-bone"
              }`}
            >
              {label}
              {id === "list" && count > 0 && (
                <span className="ml-1.5 rounded-full bg-gold px-1.5 text-[10px] font-bold text-ink">{count}</span>
              )}
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all duration-300 ${
                  tab === id ? "w-full" : "w-0 group-hover:w-1/2"
                }`}
              />
            </button>
          ))}
        </nav>
        <button
          onClick={() => onNavigate("search")}
          aria-label="Rechercher"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition hover:border-gold/50 hover:text-gold-2"
        >
          <IconSearch className="h-4.5 w-4.5" />
        </button>
      </header>

      {/* mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-line bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        {(
          [
            ["home", "Accueil", IconHome],
            ["search", "Recherche", IconSearch],
            ["list", "Ma liste", IconHeart],
          ] as [Tab, string, NavIcon][]
        ).map(([id, label, Icon]) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-pressed={active}
              className="relative flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors"
            >
              <span className={`absolute top-0 h-[2px] w-10 rounded-full bg-gold transition-all duration-300 ${active ? "opacity-100" : "opacity-0"}`} />
              <span className="relative">
                <Icon className={`h-5.5 w-5.5 transition-colors ${active ? "text-gold-2" : "text-dim"}`} filled={id === "list" && active} />
                {id === "list" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-ink">
                    {count}
                  </span>
                )}
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? "text-bone" : "text-dim"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
