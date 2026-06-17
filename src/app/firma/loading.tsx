import { DemoBanner, Header, Footer } from "@/components/ui";
import { SkeletonList, SkeletonZeile } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <DemoBanner />
      <Header rolle="firma" />
      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <SkeletonZeile className="h-7 w-56" />
              <SkeletonZeile className="h-4 w-72" />
            </div>
            <SkeletonZeile className="h-10 w-48 rounded-full" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-4">
          <aside className="hidden lg:block lg:col-span-1">
            <SkeletonZeile className="h-40 w-full rounded-2xl" />
          </aside>
          <section className="lg:col-span-3">
            <SkeletonList />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
