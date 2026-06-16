"use client";

import { useEffect, useRef, useState } from "react";

// Sanftes Einblenden beim Scrollen (einmalig). Reserviert den Platz vorab,
// damit nichts springt. Respektiert "reduzierte Bewegung".
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Wenn IntersectionObserver fehlt: sofort anzeigen.
    if (typeof IntersectionObserver === "undefined") {
      setSichtbar(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSichtbar(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error – ref-Typ variiert je nach Tag, hier unkritisch.
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${
        sichtbar
          ? "opacity-100 translate-y-0"
          : "motion-safe:opacity-0 motion-safe:translate-y-5"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
