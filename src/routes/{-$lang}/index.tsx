import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/home";
import { asLocale } from "@/lib/i18n";

export const Route = createFileRoute("/{-$lang}/")({
  component: () => <Home locale={asLocale(Route.useParams().lang)} />,
});
