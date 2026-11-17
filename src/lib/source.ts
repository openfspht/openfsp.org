import { loader } from "fumadocs-core/source";
import { applyMdxPreset } from "fumadocs-mdx/config";
import { defineDocs } from "fumadocs-mdx/macro";
import { i18n } from "./i18n";
import { remarkMermaid } from "./remark-mermaid";
import { remarkRules } from "./remark-rules";

export const docs = defineDocs({
    dir: "content/docs",
    docs: {
        async: true,
        mdxOptions: applyMdxPreset({
            remarkPlugins: (plugins) => [remarkMermaid, remarkRules, ...plugins],
        }),
    },
});

export const source = loader({
    source: docs.toFumadocsSource(),
    baseUrl: "/docs",
    i18n,
});
