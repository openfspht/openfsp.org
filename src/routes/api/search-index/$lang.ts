import { createFileRoute } from "@tanstack/react-router";
import { languageSearch } from "@/lib/search";

const servers = { en: languageSearch("en"), fr: languageSearch("fr") };

export const Route = createFileRoute("/api/search-index/$lang")({
  server: {
    handlers: {
      GET: ({ params }) => {
        if (params.lang !== "en" && params.lang !== "fr") return new Response("Not found", { status: 404 });
        return servers[params.lang].staticGET();
      },
    },
  },
});
