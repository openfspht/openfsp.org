import { existsSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { localized, type Locale } from "../i18n";
import { render, renderInline, type LinkResolver, type Rendered } from "./markdown";

function source(variable: string | undefined, name: string) {
  if (variable) return resolve(variable);
  const sibling = resolve("..", name);
  return existsSync(resolve(sibling, "README.md")) ? sibling : resolve("sources", name);
}

const ADRS_DIR = source(process.env.OPENFSP_ADRS_DIR, "adrs");
const ORG_DIR = source(process.env.OPENFSP_ORG_DIR, "openfsp");
const ADRS_REPO = "https://github.com/openfspht/adrs";
const ORG_REPO = "https://github.com/openfspht/openfsp";
export const STACK_REPO = "https://github.com/openfspht/stack";
export const GOVERNANCE_URL = `${ORG_REPO}/blob/main/GOVERNANCE.md`;
export const REGISTRY_EDIT_URL = `${ORG_REPO}/edit/main/registries/providers.md`;

for (const dir of [ADRS_DIR, ORG_DIR]) {
  if (!existsSync(dir)) throw new Error(`${dir} is missing: set OPENFSP_ADRS_DIR and OPENFSP_ORG_DIR`);
}

export interface DocumentEntry {
  slug: string;
  file: string;
  label: string;
  group: string;
}

export interface DocumentGroup {
  label: string;
  documents: DocumentEntry[];
}

const SPEC_SLUGS: Record<string, string> = { README: "conventions" };

function specSlug(name: string) {
  return SPEC_SLUGS[name] ?? name;
}

function adrSlug(name: string) {
  return name.replace(/\.md$/, "");
}

function summary() {
  const lines = readFileSync(resolve(ADRS_DIR, "src/SUMMARY.md"), "utf8").split("\n");
  const spec: DocumentGroup[] = [];
  const adrs: DocumentEntry[] = [];
  let section = "";
  for (const line of lines) {
    if (line.startsWith("# ")) section = line.slice(2).trim();
    const item = /^(\s*)- \[([^\]]+)\]\(([^)]*)\)/.exec(line);
    if (!item) continue;
    const [, indent, label, target] = item;
    if (!target) {
      spec.push({ label, documents: [] });
      continue;
    }
    if (target.startsWith("spec/")) {
      const name = basename(target, ".md");
      const entry = { slug: specSlug(name), file: resolve(ADRS_DIR, target), label, group: indent ? (spec.at(-1)?.label ?? "") : "" };
      if (indent && spec.length) spec.at(-1)!.documents.push(entry);
      else spec.push({ label: "", documents: [entry] });
    } else if (target.startsWith("text/") && section !== "" && /^\d{4}-/.test(basename(target))) {
      adrs.push({ slug: adrSlug(basename(target)), file: resolve(ADRS_DIR, target), label, group: section });
    }
  }
  return { spec, adrs };
}

const index = summary();
export const specGroups = index.spec;
export const specDocuments = index.spec.flatMap((group) => group.documents);
export const adrDocuments = index.adrs;

const specNames = new Map(specDocuments.map((entry) => [basename(entry.file, ".md"), entry.slug]));
const adrNames = new Set(adrDocuments.map((entry) => entry.slug));

export function resolver(locale: Locale, from: "spec" | "text"): LinkResolver {
  return (href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return href;
    const [path, hash = ""] = href.split("#");
    const fragment = hash ? `#${hash}` : "";
    const name = basename(path, ".md");
    const inSpec = path.startsWith("../spec/") || path.startsWith("spec/") || (from === "spec" && !path.includes("/"));
    const inText = path.startsWith("../text/") || path.startsWith("text/") || (from === "text" && !path.includes("/"));
    if (path.endsWith(".md") && inSpec && specNames.has(name)) return localized(locale, `/spec/${specNames.get(name)}/`) + fragment;
    if (path.endsWith(".md") && inText && adrNames.has(name)) return localized(locale, `/adr/${name}/`) + fragment;
    if (path.endsWith(".md") && inText && name === "references") return `${ADRS_REPO}/blob/main/text/references.md${fragment}`;
    const base = from === "spec" ? "spec/" : "text/";
    return `${ADRS_REPO}/blob/main/${new URL(path, `https://x/${base}`).pathname.slice(1)}${fragment}`;
  };
}

const cache = new Map<string, Promise<Rendered>>();

export function renderDocument(entry: DocumentEntry, locale: Locale, from: "spec" | "text") {
  const key = `${locale}:${entry.file}`;
  if (!cache.has(key)) cache.set(key, render(readFileSync(entry.file, "utf8"), resolver(locale, from)));
  return cache.get(key)!;
}

export function sourcePath(entry: DocumentEntry) {
  return entry.file.slice(ADRS_DIR.length + 1);
}

export function sourceUrl(entry: DocumentEntry) {
  return `${ADRS_REPO}/blob/main/${sourcePath(entry)}`;
}

export function editUrl(entry: DocumentEntry) {
  return `${ADRS_REPO}/edit/main/${entry.file.slice(ADRS_DIR.length + 1)}`;
}

const NORMATIVE = ["modele-de-donnees", "cycle-de-vie", "idempotence", "api-paiements", "capacites", "webhooks", "authentification", "conformite"];

function ruleUnits(name: string) {
  const found: string[] = [];
  let heading: string | undefined;
  let inCode = false;
  for (const line of readFileSync(resolve(ADRS_DIR, `spec/${name}.md`), "utf8").split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const rule = /^\*\*(\d+(?:\.\d+)*)\./.exec(line);
    const numbered = /^#{2,4} (\d+(?:\.\d+)*)\./.exec(line);
    if (rule) {
      found.push(rule[1]);
      heading = undefined;
    } else if (numbered) heading = numbered[1];
    else if (line.startsWith("#")) heading = undefined;
    else if (heading && line.trim()) {
      found.push(heading);
      heading = undefined;
    }
  }
  return found;
}

export function rulesIn(entry: DocumentEntry) {
  const name = basename(entry.file, ".md");
  return NORMATIVE.includes(name) ? ruleUnits(name).length : 0;
}

export function ruleCount() {
  return NORMATIVE.reduce((total, name) => total + ruleUnits(name).length, 0);
}

export interface Problem {
  code: string;
  status: number;
  retryable: boolean;
  effect: string;
  condition: string;
  group: string;
  section: string;
}

function tableRows(lines: string[], start: number) {
  const rows: string[][] = [];
  for (let i = start; i < lines.length && lines[i].startsWith("|"); i++) {
    const cells = lines[i]
      .slice(1, -1)
      .split(/(?<!\\)\|/)
      .map((cell) => cell.trim());
    if (cells.every((cell) => /^-+$/.test(cell))) continue;
    rows.push(cells);
  }
  return rows.slice(1);
}

function unquote(cell: string) {
  return cell.replace(/^`|`$/g, "");
}

export function problems(): Problem[] {
  const lines = readFileSync(resolve(ADRS_DIR, "spec/api-paiements.md"), "utf8").split("\n");
  const start = lines.findIndex((line) => line.startsWith("### 10.9."));
  const found: Problem[] = [];
  let group = "";
  let section = "";
  for (let i = start + 1; i < lines.length && !lines[i].startsWith("### "); i++) {
    const heading = /^#### (\d+(?:\.\d+)*)\. (.+)$/.exec(lines[i]);
    if (heading) {
      [, section, group] = heading;
      continue;
    }
    if (lines[i].startsWith("| Code")) {
      for (const [code, status, retryable, effect, condition] of tableRows(lines, i)) {
        found.push({ code: unquote(code), status: Number(status), retryable: retryable === "true", effect: unquote(effect), condition, group, section });
      }
      while (lines[i + 1]?.startsWith("|")) i++;
    }
  }
  return found;
}

export function problemCondition(problem: Problem, locale: Locale) {
  return renderInline(problem.condition, resolver(locale, "spec"));
}

export interface RegistryTable {
  title: string;
  header: string[];
  rows: string[];
}

export async function registry(locale: Locale) {
  const text = readFileSync(resolve(ORG_DIR, "registries/providers.md"), "utf8");
  const lines = text.split("\n");
  const tables: RegistryTable[] = [];
  const resolve_ = (href: string) => {
    const link = href.replace(/^https:\/\/github\.com\/openfspht\/adrs\/blob\/main\/spec\/([a-z-]+)\.md/, (_, name: string) =>
      localized(locale, `/spec/${specSlug(name)}/`),
    );
    return link;
  };
  for (let i = 0; i < lines.length; i++) {
    const heading = /^## (.+)$/.exec(lines[i]);
    if (!heading) continue;
    const tableStart = lines.findIndex((line, at) => at > i && line.startsWith("|"));
    const nextHeading = lines.findIndex((line, at) => at > i && line.startsWith("## "));
    if (tableStart < 0 || (nextHeading > 0 && tableStart > nextHeading)) continue;
    const header = lines[tableStart]
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
    const rows = await Promise.all(
      tableRows(lines, tableStart).map(async (cells) => {
        const rendered = await Promise.all(cells.map((cell) => renderInline(cell, resolve_)));
        return rendered.map((cell) => `<td>${cell}</td>`).join("");
      }),
    );
    tables.push({ title: heading[1], header, rows });
  }
  return tables;
}
