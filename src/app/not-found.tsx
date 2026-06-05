import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="text-8xl font-bold text-slate-200 select-none">404</div>
      <h1 className="text-2xl font-bold text-slate-800 mt-4">Seite nicht gefunden</h1>
      <p className="text-slate-500 mt-2 max-w-sm">
        Diese Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
      >
        Zur Startseite
      </Link>
    </div>
  );
}
