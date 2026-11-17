import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/home";
import { asLocale } from "@/lib/i18n";
import { pageHead } from "@/lib/seo";
import { homeCopy } from "@/lib/home-copy";

export const Route = createFileRoute("/{-$lang}/")({
    head: ({ params }) => {
        const locale = asLocale(params.lang);
        return pageHead(locale, "/", `${homeCopy[locale].title} | OpenFSP`, homeCopy[locale].lead);
    },
    component: () => <Home locale={asLocale(Route.useParams().lang)} />,
});
