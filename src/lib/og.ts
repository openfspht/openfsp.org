import { localePath, type Locale } from "./i18n";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export function ogImagePath(locale: Locale, path: string): string {
  const page = localePath(locale, path);
  return page === "/" ? "/og/index.png" : `/og${page}.png`;
}
