"use client";

import { useEffect, useState } from "react";

// "Nach oben"-Button, der erst nach etwas Scrollen erscheint.
export function ScrollTop() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const onScroll = () => setSichtbar(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!sichtbar) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Nach oben scrollen"
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-card hover:bg-brand-700 transition motion-safe:animate-fade-up"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
