import { Link, useParams } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { asLocale, localePath } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";

const copy = {
    en: {
        title: "Page not found",
        body: "This page does not exist or has moved.",
        home: "Back to home",
        docs: "Read the docs",
    },
    fr: {
        title: "Page introuvable",
        body: "Cette page n'existe pas ou a changé d'adresse.",
        home: "Retour à l'accueil",
        docs: "Lire la documentation",
    },
};

export function NotFound() {
    const { lang } = useParams({ strict: false }) as { lang?: string };
    const locale = asLocale(lang);
    const t = copy[locale];
    return (
        <HomeLayout {...baseOptions(locale)}>
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col items-start justify-center gap-4 px-4 py-24">
                <p className="font-mono text-sm text-fd-muted-foreground">404</p>
                <h1 className="text-3xl font-bold">{t.title}</h1>
                <p className="text-fd-muted-foreground">{t.body}</p>
                <div className="mt-2 flex gap-3">
                    <Link to={localePath(locale, "/")} className="btn btn-primary">
                        {t.home}
                    </Link>
                    <Link to={localePath(locale, "/docs")} className="btn">
                        {t.docs}
                    </Link>
                </div>
            </div>
        </HomeLayout>
    );
}
