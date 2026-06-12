import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export const metadata = {
  title: "Zugang – TempMatch",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-2xl font-bold text-ink">
            Temp<span className="text-brand-600">Match</span>
          </span>
          <p className="text-sm text-slate-500 mt-2">
            Diese Seite ist passwortgeschützt. Bitte das Zugangspasswort eingeben.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
