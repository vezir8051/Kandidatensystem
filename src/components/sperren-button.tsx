"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { abmelden } from "@/lib/gate-actions";

// Meldet den Passwort-Zugang ab (löscht das Cookie) und schickt zur Login-Seite.
export function SperrenButton() {
  const router = useRouter();
  const [istAmAbmelden, startUebergang] = useTransition();

  return (
    <button
      onClick={() =>
        startUebergang(async () => {
          await abmelden();
          router.replace("/login");
          router.refresh();
        })
      }
      disabled={istAmAbmelden}
      className="hover:text-brand-600 transition disabled:opacity-60"
    >
      {istAmAbmelden ? "Wird gesperrt…" : "Sperren"}
    </button>
  );
}
