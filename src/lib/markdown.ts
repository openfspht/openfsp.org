import GithubSlugger from "github-slugger";
import type { Element, ElementContent, Root as HastRoot } from "hast";
import { toString } from "hast-util-to-string";
import type { Root as MdastRoot, Paragraph, Strong } from "mdast";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { createHighlighter, type Highlighter } from "shiki";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export interface Heading {
  depth: number;
  id: string;
  text: string;
}

export interface Rendered {
  title: string;
  html: string;
  headings: Heading[];
  rules: string[];
}

export type LinkResolver = (href: string) => string;

const RULE_NUMBER = /^(\d+(?:\.\d+)*)\.(?:\s|$)/;
const HEADING_NUMBER = /^(\d+(?:\.\d+)*)\.\s/;
const LANGUAGES = ["json", "http", "bash", "shell", "yaml", "kotlin", "typescript"] as const;

let highlighter: Promise<Highlighter> | undefined;

function shiki() {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark"], langs: [...LANGUAGES] });
  return highlighter;
}

function remarkRuleAnchors() {
  return (tree: MdastRoot) => {
    visit(tree, "paragraph", (node: Paragraph) => {
      const first = node.children[0];
      if (first?.type !== "strong") return;
      const text = (first as Strong).children.map((child) => ("value" in child ? child.value : "")).join("");
      const match = RULE_NUMBER.exec(text);
      if (!match) return;
      node.data = { ...node.data, hProperties: { id: match[1], className: ["rule"], "data-rule": match[1] } };
    });
  };
}

function rehypeDocument(options: { resolve: LinkResolver; headings: Heading[]; rules: string[]; title: { value: string } }) {
  return async (tree: HastRoot) => {
    const slugger = new GithubSlugger();
    const highlight = await shiki();
    const removals: Array<{ parent: HastRoot | Element; node: Element }> = [];

    visit(tree, "element", (node: Element, index, parent) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        const text = toString(node).trim();
        const depth = Number(node.tagName.slice(1));
        if (depth === 1 && !options.title.value) {
          options.title.value = text;
          if (parent) removals.push({ parent: parent as Element, node });
          return;
        }
        const id = slugger.slug(text);
        node.properties = { ...node.properties, id };
        const number = HEADING_NUMBER.exec(text)?.[1];
        if (number) node.children.unshift({ type: "element", tagName: "span", properties: { id: number, className: ["anchor-target"] }, children: [] });
        if (depth === 2 || depth === 3) options.headings.push({ depth, id, text });
        return;
      }
      if (node.tagName === "p" && typeof node.properties?.dataRule === "string") {
        options.rules.push(node.properties.dataRule);
        return;
      }
      if (node.tagName === "a" && typeof node.properties?.href === "string") {
        const href = options.resolve(node.properties.href);
        node.properties.href = href;
        if (/^https?:\/\//.test(href) && !href.startsWith("https://openfsp.org")) node.properties.rel = ["noopener"];
        return;
      }
      if (node.tagName === "table" && parent && typeof index === "number") {
        (parent as Element).children[index] = { type: "element", tagName: "div", properties: { className: ["table-wrap"] }, children: [node] };
        return;
      }
      if (node.tagName === "pre" && parent && typeof index === "number") {
        const code = node.children.find((child): child is Element => child.type === "element" && child.tagName === "code");
        if (!code) return;
        const classes = (code.properties?.className as string[] | undefined) ?? [];
        const language = classes.find((name) => name.startsWith("language-"))?.slice("language-".length);
        const source = toString(code).replace(/\n$/, "");
        if (language === "mermaid") {
          (parent as Element).children[index] = {
            type: "element",
            tagName: "pre",
            properties: { className: ["mermaid"] },
            children: [{ type: "text", value: source }],
          };
          return;
        }
        const lang = LANGUAGES.includes(language as (typeof LANGUAGES)[number]) ? language! : "text";
        const highlighted = highlight.codeToHast(source, { lang, themes: { light: "github-light", dark: "github-dark" }, defaultColor: false });
        const pre = highlighted.children[0] as Element;
        pre.properties = { ...pre.properties, tabindex: 0 };
        (parent as Element).children[index] = pre as ElementContent;
      }
    });

    for (const { parent, node } of removals) parent.children = parent.children.filter((child) => child !== node);
  };
}

export async function render(markdown: string, resolve: LinkResolver): Promise<Rendered> {
  const headings: Heading[] = [];
  const rules: string[] = [];
  const title = { value: "" };
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRuleAnchors)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeDocument, { resolve, headings, rules, title })
    .use(rehypeStringify)
    .process(markdown);
  return { title: title.value, html: String(file), headings, rules };
}

export async function renderInline(markdown: string, resolve: LinkResolver): Promise<string> {
  const { html } = await render(markdown, resolve);
  return html.replace(/^<p>/, "").replace(/<\/p>\s*$/, "");
}

export async function highlight(code: string, lang: (typeof LANGUAGES)[number]) {
  return (await shiki()).codeToHtml(code, { lang, themes: { light: "github-light", dark: "github-dark" }, defaultColor: false });
}
