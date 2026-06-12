// Zentrale Konstanten für den seitenweiten Passwort-Schutz.
// Das Passwort und der Cookie-Token kommen aus Umgebungsvariablen
// (in Vercel zu setzen). Fallbacks erlauben lokales Testen.
//
// SITE_PASSWORD     – das Passwort, das beim Zugang eingegeben werden muss.
// SITE_ACCESS_TOKEN – geheimer Wert, der nach erfolgreicher Eingabe als
//                     HttpOnly-Cookie gesetzt wird. Middleware (Edge) und
//                     Server-Action (Node) lesen denselben Wert, damit der
//                     Vergleich auf beiden Seiten übereinstimmt.

export const COOKIE_NAME = "tm_access";

// Achtung: Diese Defaults sind nur fürs lokale Testen. In Produktion
// unbedingt SITE_PASSWORD und SITE_ACCESS_TOKEN in Vercel setzen.
const DEFAULT_PASSWORD = "tempmatch";
const DEFAULT_TOKEN = "tm-dev-access-token";

export function sitePasswort(): string {
  return process.env.SITE_PASSWORD || DEFAULT_PASSWORD;
}

export function accessToken(): string {
  return process.env.SITE_ACCESS_TOKEN || DEFAULT_TOKEN;
}
