import { DemoBanner, Header, Footer } from "@/components/ui";
import { SkeletonZeile } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <DemoBanner />
      <Header rolle="admin" />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <SkeletonZeile className="h-7 w-48" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonZeile key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
          <SkeletonZeile className="h-72 w-full rounded-2xl" />
        </div>
      </main>
      <Footer />
    </>
  );
}
