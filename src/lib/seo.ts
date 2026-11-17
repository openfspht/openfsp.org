import { localePath, type Locale } from "./i18n";
import { OG_HEIGHT, OG_WIDTH, ogImagePath } from "./og";

export const SITE_URL = "https://openfsp.org";

export function pageHead(locale: Locale, path: string, title: string, description: string) {
    const url = `${SITE_URL}${localePath(locale, path)}`;
    const image = `${SITE_URL}${ogImagePath(locale, path)}`;
    return {
        meta: [
            { title },
            { name: "description", content: description },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:url", content: url },
            { property: "og:locale", content: locale === "fr" ? "fr_HT" : "en_US" },
            { property: "og:image", content: image },
            { property: "og:image:width", content: String(OG_WIDTH) },
            { property: "og:image:height", content: String(OG_HEIGHT) },
            { property: "og:image:alt", content: title },
            { name: "twitter:image", content: image },
        ],
        links: [
            { rel: "canonical", href: url },
            ...(["en", "fr"] as const).map((language) => ({
                rel: "alternate",
                hrefLang: language,
                href: `${SITE_URL}${localePath(language, path)}`,
            })),
            { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path}` },
        ],
    };
}
