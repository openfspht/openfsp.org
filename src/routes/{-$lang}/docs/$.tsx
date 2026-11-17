import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
import {
    TOC,
    TOCPopover,
    TOCProvider,
    type TOCPopoverProps,
} from "fumadocs-ui/layouts/docs/page/slots/toc";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
    EditOnGitHub,
} from "fumadocs-ui/layouts/docs/page";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { Suspense, use } from "react";
import { asLocale } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { docs, source } from "@/lib/source";
import { mdxComponents } from "@/components/mdx";
import { pageHead } from "@/lib/seo";

const EDIT_BASE = "https://github.com/openfspht/openfsp.org/blob/main/content/docs";

const loadPage = createServerFn({ method: "GET" })
    .middleware([staticFunctionMiddleware])
    .validator((params: { slugs: string[]; lang: string }) => params)
    .handler(async ({ data: { slugs, lang } }) => {
        const page = source.getPage(slugs, lang);
        if (!page) {
            throw notFound();
        }
        return {
            path: page.path,
            url: page.url,
            title: page.data.title,
            description: page.data.description,
            pageTree: await source.serializePageTree(source.getPageTree(lang)),
        };
    });

export const Route = createFileRoute("/{-$lang}/docs/$")({
    loader: async ({ params }) => {
        const data = await loadPage({
            data: {
                slugs: params._splat?.split("/").filter(Boolean) ?? [],
                lang: asLocale(params.lang),
            },
        });
        await docs.getPage(data.path)?.preload();
        return data;
    },
    head: ({ loaderData, params }) =>
        loaderData
            ? pageHead(
                  asLocale(params.lang),
                  `/docs${params._splat ? `/${params._splat}` : ""}`,
                  `${loaderData.title} | OpenFSP`,
                  loaderData.description ?? "",
              )
            : {},
    component: Page,
});

function AccessibleTOCPopover(props: TOCPopoverProps) {
    const { lang } = Route.useParams();
    return (
        <nav className="contents" aria-label={lang === "fr" ? "Sommaire" : "Table of contents"}>
            <TOCPopover {...props} />
        </nav>
    );
}

function Content({ path }: { path: string }) {
    const page = docs.getPage(path);
    if (!page) {
        throw new Error(`unknown page: ${path}`);
    }
    const { toc } = use(page.load());
    const MDX = page.body;
    return (
        <DocsPage
            toc={toc}
            slots={{ toc: { provider: TOCProvider, main: TOC, popover: AccessibleTOCPopover } }}
            tableOfContent={{
                style: "clerk",
                container: { role: "navigation", "aria-labelledby": "toc-title" },
            }}
        >
            <DocsTitle>{page.title}</DocsTitle>
            <DocsDescription>{page.description}</DocsDescription>
            <DocsBody>
                <MDX components={mdxComponents} />
            </DocsBody>
            <EditOnGitHub href={`${EDIT_BASE}/${path}`} />
        </DocsPage>
    );
}

function Page() {
    const { lang } = Route.useParams();
    const data = useFumadocsLoader(Route.useLoaderData());
    return (
        <DocsLayout {...baseOptions(asLocale(lang))} links={[]} tree={data.pageTree}>
            <Suspense>
                <Content path={data.path} />
            </Suspense>
        </DocsLayout>
    );
}
