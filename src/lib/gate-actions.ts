"use server";

// Server Actions für den Passwort-Zugang.

import { cookies } from "next/headers";
import { COOKIE_NAME, sitePasswort, accessToken } from "@/lib/gate";

export type GateResult = { ok: true } | { ok: false; fehler: string };

export async function zugangPruefen(passwort: string): Promise<GateResult> {
  const eingabe = (passwort ?? "").trim();
  if (!eingabe) return { ok: false, fehler: "Bitte das Passwort eingeben." };

  if (eingabe !== sitePasswort()) {
    return { ok: false, fehler: "Falsches Passwort." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, accessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 Tage
  });

  return { ok: true };
}

export async function abmelden(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
