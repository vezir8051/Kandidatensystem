import { DemoBanner, Header, Footer } from "@/components/ui";
import { SkeletonList, SkeletonZeile } from "@/components/skeleton";

export default function Loading() {
  return (
    <>
      <DemoBanner />
      <Header rolle="agentur" />
      <main className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            <SkeletonZeile className="h-7 w-56" />
            <SkeletonZeile className="h-4 w-72" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-4">
          <aside className="hidden lg:block lg:col-span-1 space-y-4">
            <SkeletonZeile className="h-20 w-full rounded-2xl" />
            <SkeletonZeile className="h-56 w-full rounded-2xl" />
          </aside>
          <section className="lg:col-span-3">
            <SkeletonZeile className="h-6 w-40 mb-6" />
            <SkeletonList />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
