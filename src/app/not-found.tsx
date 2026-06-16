import Link from "next/link";
import { Sparkle } from "@/components/decor";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
        <Sparkle size={13} color="#2d6fd4" /> TempMatch
      </span>
      <div className="font-display text-8xl font-extrabold text-brand-100 select-none mt-6">404</div>
      <h1 className="font-display text-2xl font-extrabold text-ink mt-2">Seite nicht gefunden</h1>
      <p className="text-muted mt-2 max-w-sm">
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-cta px-6 py-3 text-sm">
          Zur Startseite
        </Link>
        <Link
          href="/agentur"
          className="px-6 py-3 rounded-full border border-slate-300 text-sm font-medium text-body hover:bg-slate-100 transition"
        >
          Offene Inserate
        </Link>
      </div>
    </div>
  );
}
