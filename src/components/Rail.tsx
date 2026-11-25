import type { ReactNode } from "react";
import { useRef } from "react";
import { IconChevronRight } from "./icons";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: () => void;
}

export function Rail({ title, icon, children, action }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * scroller.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative">
      <div className="mb-3 flex items-end justify-between px-4 md:px-8">
        <h2 className="text-display flex items-center gap-2 text-xl text-bone sm:text-2xl">
          {icon && <span className="text-gold">{icon}</span>}
          {title}
        </h2>
        <button
          onClick={action ?? (() => nudge(1))}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-mist transition-colors hover:text-gold-2"
        >
          {action ? "Tout voir" : ""}
          <IconChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={scroller}
        className="rail no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2 md:px-8"
        role="list"
      >
        {children}
      </div>
      <button
        onClick={() => nudge(-1)}
        aria-label="Faire défiler vers la gauche"
        className="absolute left-1 top-[52%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-bone opacity-0 backdrop-blur transition hover:text-gold-2 focus-visible:opacity-100 md:flex md:opacity-0 md:[section:hover>&]:opacity-100"
      >
        <IconChevronRight className="h-4 w-4 rotate-180" />
      </button>
    </section>
  );
}
