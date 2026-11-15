import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, relative, join } from "node:path";
import { gzipSync } from "node:zlib";
import { architectureLegacyAnchors } from "../src/lib/architecture-legacy-anchors";
import { SITE_URL } from "../src/lib/seo";

const root = resolve(import.meta.dir, "../dist/client");
const files = (await readdir(root, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name));
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const urlPath = (file: string) =>
  `/${relative(root, file)
    .replaceAll("\\", "/")
    .replace(/(?:^|\/)index\.html$/, "")
    .replace(/\.html$/, "")
    .replace(/\/$/, "")}`;
const pages = new Map(htmlFiles.filter((file) => !file.endsWith("/404.html")).map((file) => [urlPath(file), file]));
const xml = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const sitemap = [...pages.keys()]
  .sort()
  .map((path) => {
    const base = path === "/fr" ? "/" : path.startsWith("/fr/") ? path.slice(3) : path;
    const fr = base === "/" ? "/fr" : `/fr${base}`;
    if (!pages.has(base) || !pages.has(fr)) throw new Error(`Missing translation: ${path}`);
    const alternates = [
      ["en", base],
      ["fr", fr],
      ["x-default", base],
    ]
      .map(([language, href]) => `<xhtml:link rel="alternate" hreflang="${language}" href="${xml(SITE_URL + href)}"/>`)
      .join("");
    return `<url><loc>${xml(SITE_URL + path)}</loc>${alternates}</url>`;
  })
  .join("\n");
await writeFile(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap}</urlset>\n`,
);
await writeFile(join(root, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
const css = files.find((file) => /\/assets\/app-[^/]+\.css$/.test(file));
if (!css) throw new Error("App stylesheet missing");
await writeFile(
  join(root, "404.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>404 | OpenFSP</title><link rel="stylesheet" href="/${relative(root, css)}"><link rel="icon" href="/favicon.svg"></head><body><main class="mx-auto max-w-xl px-6 py-24"><a href="/" class="text-xl font-bold">OpenFSP</a><p class="mt-12 font-mono">404</p><h1 class="mt-4 text-3xl font-bold">Page not found</h1><p class="mt-4">This page does not exist or has moved.</p><nav aria-label="English" class="mt-6 flex flex-wrap gap-3"><a class="btn btn-primary" href="/">Home</a><a class="btn" href="/docs">Documentation</a></nav><section lang="fr" class="mt-12"><h2 class="text-2xl font-bold">Page introuvable</h2><p class="mt-4">Cette page n’existe pas ou a changé d’adresse.</p><nav aria-label="Français" class="mt-6 flex flex-wrap gap-3"><a class="btn btn-primary" href="/fr">Accueil</a><a class="btn" href="/fr/docs">Documentation</a></nav></section></main></body></html>`,
);

const clean = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const documents = new Map(await Promise.all([...pages].map(async ([path, file]) => [path, clean(await readFile(file, "utf8"))] as const)));
const errors: string[] = [];
for (const [path, html] of documents) {
  for (const required of ['rel="canonical"', 'hreflang="en"', 'hreflang="fr"', 'property="og:title"']) {
    if (!html.toLowerCase().includes(required.toLowerCase())) errors.push(`${path}: missing ${required}`);
  }
  for (const match of html.matchAll(/<(?:a|link)\b[^>]*?\bhref="([^"<>]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    const url = new URL(href, SITE_URL + path);
    if (url.origin !== SITE_URL) continue;
    const target = url.pathname.replace(/\/$/, "") || "/";
    if (!href.startsWith("/") && !href.startsWith("#") && !href.startsWith(SITE_URL)) continue;
    const destination = documents.get(target);
    if (!destination) {
      const problem = target.match(/^(\/fr)?\/problems\/([a-z0-9-]+)$/);
      if (problem) {
        if (!documents.get(`${problem[1] ?? ""}/docs/spec/payments-api`)?.includes(`id="${problem[2]}"`)) errors.push(`${path}: missing problem ${href}`);
        continue;
      }
      if (!files.includes(join(root, decodeURIComponent(target)))) errors.push(`${path}: missing link ${href}`);
    } else if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!destination.includes(`id="${id}"`)) errors.push(`${path}: missing anchor ${href}`);
    }
  }
}
for (const [path, html] of documents) {
  if (path.startsWith("/fr")) continue;
  const french = documents.get(path === "/" ? "/fr" : `/fr${path}`);
  const ruleIds = (content: string) =>
    [...content.matchAll(/<p\b[^>]*id="([0-9.]+)"[^>]*class="[^"]*rule[^"]*"/g)]
      .map((match) => match[1])
      .sort()
      .join(",");
  if (french && ruleIds(html) !== ruleIds(french)) errors.push(`${path}: English/French rule IDs differ`);
}
for (const locale of ["en", "fr"] as const) {
  const prefix = locale === "fr" ? "/fr" : "";
  for (const id of architectureLegacyAnchors[locale]) {
    for (const path of [`${prefix}/docs/architecture`, `${prefix}/docs/gateway`]) {
      if (!documents.get(path)?.includes(`id="${id}"`)) errors.push(`${path}: missing historical anchor ${id}`);
    }
  }
}
for (const asset of ["og.png", "404.html", "robots.txt", "sitemap.xml", "api/search-index/en", "api/search-index/fr"]) {
  if (!(await Bun.file(join(root, asset)).exists())) errors.push(`Missing artifact: ${asset}`);
}
if (errors.length) throw new Error([...new Set(errors)].join("\n"));
for (const file of [...files, join(root, "sitemap.xml"), join(root, "404.html")]) {
  if (/\.(?:js|css|html|svg|xml)$/.test(file) || /\/api\/search-index\/(?:en|fr)$/.test(file)) {
    await writeFile(`${file}.gz`, gzipSync(await readFile(file), { level: 9 }));
  }
}
console.log(`Static publishing validated: ${pages.size} pages, bilingual sitemap, 404, assets, internal links and anchors; gzip files generated.`);
