// Platzhalter-Bausteine für Ladezustände (motion-safe Puls).

export function SkeletonZeile({ className = "" }: { className?: string }) {
  return <div className={`rounded bg-slate-100 motion-safe:animate-pulse ${className}`} />;
}

// Liste aus Karten – passt zu den Inserat-/Kandidatenlisten.
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft">
          <div className="hidden h-14 w-14 shrink-0 rounded-full bg-slate-100 motion-safe:animate-pulse sm:block" />
          <div className="min-w-0 flex-grow space-y-3 py-1">
            <SkeletonZeile className="h-4 w-2/3" />
            <SkeletonZeile className="h-3 w-1/2" />
            <div className="flex gap-2 pt-1">
              <SkeletonZeile className="h-7 w-24" />
              <SkeletonZeile className="h-7 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
