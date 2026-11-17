import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { i18n } from "@/lib/i18n";

export const Route = createFileRoute("/{-$lang}")({
    beforeLoad: ({ params }) => {
        if (
            params.lang !== undefined &&
            (params.lang === i18n.defaultLanguage || !i18n.languages.includes(params.lang as never))
        ) {
            throw notFound();
        }
    },
    component: Outlet,
});
