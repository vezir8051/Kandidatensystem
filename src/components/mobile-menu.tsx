"use client";

import Link from "next/link";
import { useState } from "react";

// Aufklappbares Navigationsmenü für kleine Bildschirme. Schliesst die Lücke,
// dass die Header-Links auf dem Handy sonst ausgeblendet wären.
export function MobileMenu({
  rolle,
  name,
}: {
  rolle?: "firma" | "agentur" | "admin";
  name?: string;
}) {
  const [offen, setOffen] = useState(false);

  const rollenLabel =
    rolle === "firma"
      ? name
        ? `Firma: ${name}`
        : "Firma"
      : rolle === "agentur"
        ? name
          ? `Agentur: ${name}`
          : "Agentur"
        : rolle === "admin"
          ? "Admin-Bereich"
          : null;

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOffen((o) => !o)}
        aria-label={offen ? "Menü schliessen" : "Menü öffnen"}
        aria-expanded={offen}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {offen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {offen && (
        <>
          {/* Klick ausserhalb schliesst das Menü */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOffen(false)}
            className="fixed inset-0 top-16 z-30 cursor-default bg-black/20"
          />
          <nav className="absolute inset-x-0 top-full z-40 border-t border-white/15 bg-brand-600 shadow-lg motion-safe:animate-fade-up">
            <div className="flex flex-col gap-1 px-4 py-3">
              {rollenLabel && (
                <span className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white">
                  {rollenLabel}
                </span>
              )}
              {rolle ? (
                <Link
                  href="/"
                  onClick={() => setOffen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                >
                  Abmelden
                </Link>
              ) : (
                <>
                  <Link
                    href="/agentur"
                    onClick={() => setOffen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                  >
                    Offene Inserate
                  </Link>
                  <Link
                    href="/firma"
                    onClick={() => setOffen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                  >
                    Für Firmen
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setOffen(false)}
                    className="mt-1 rounded-lg bg-white px-3 py-2 text-center text-sm font-semibold text-brand-700 hover:bg-white/90"
                  >
                    Anmelden
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
