import { createSearchAPI } from "fumadocs-core/search/server";
import { source } from "./source";
import type { Locale } from "./i18n";

export function languageSearch(locale: Locale) {
  return createSearchAPI("advanced", {
    indexes: async () =>
      Promise.all(
        source.getPages(locale).map(async (page) => ({
          id: page.url,
          url: page.url,
          title: page.data.title,
          description: page.data.description,
          structuredData: (await page.data.load()).structuredData,
        })),
      ),
  });
}
