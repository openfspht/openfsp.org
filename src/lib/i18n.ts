import { defineI18n } from "fumadocs-core/i18n";

export const i18n = defineI18n({
    defaultLanguage: "fr",
    languages: ["en", "fr"],
    hideLocale: "default-locale",
    parser: "dot",
});

export type Locale = (typeof i18n.languages)[number];

export function asLocale(lang: string | undefined): Locale {
    return lang === "en" ? "en" : i18n.defaultLanguage;
}

export function localePath(locale: Locale, path: string): string {
    return locale === i18n.defaultLanguage ? path : `/${locale}${path === "/" ? "" : path}`;
}
