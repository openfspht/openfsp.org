import { en } from "./en";
import { fr } from "./fr";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export type MessageKey = keyof typeof fr;

const catalogs: Record<Locale, Record<MessageKey, string>> = { fr, en };

export function translator(locale: Locale) {
  return (key: MessageKey, values: Record<string, string> = {}) =>
    catalogs[locale][key].replace(/\{(\w+)\}/g, (_, name: string) => values[name] ?? `{${name}}`);
}

export function localeOf(url: URL): Locale {
  return url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "fr";
}

export function localized(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "fr" ? clean : `/en${clean === "/" ? "/" : clean}`;
}

export function counterpart(url: URL): string {
  const locale = localeOf(url);
  if (/\/404(\.html|\/)?$/.test(url.pathname)) return localized(locale === "fr" ? "en" : "fr", "/");
  const path = locale === "en" ? url.pathname.replace(/^\/en(?=\/|$)/, "") || "/" : url.pathname;
  return localized(locale === "fr" ? "en" : "fr", path) + url.hash;
}
