import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight } from "lucide-react";
import { CodeTabs } from "@/components/code-tabs";
import { IntegrationDiagram } from "@/components/integration-diagram";
import { localePath, type Locale } from "@/lib/i18n";
import { GITHUB_URL, STACK_REPO, baseOptions } from "@/lib/layout.shared";
import { homeCopy, type ChapterSlug } from "@/lib/home-copy";

const REQUEST = `curl https://pay.merchant.example/v1/payments \\
  -H "Authorization: Bearer ofsp_test_..." \\
  -H "Idempotency-Key: 6f1c2e0a-4b7d-4a8e-9d3f-2c5b7e9a1f04" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reference": "INV-2026-00184",
    "amount": { "amount": 125000, "currency": "HTG" },
    "provider": "moncash",
    "return_url": "https://merchant.example/checkout/184/return"
  }'`;

const RESPONSE = `HTTP/1.1 201 Created

{
  "id": "pay_01J9ZK3QF8XN2M7VYB4C6D8E0G",
  "reference": "INV-2026-00184",
  "status": "pending",
  "amount": { "amount": 125000, "currency": "HTG" },
  "provider": "moncash",
  "next_action": {
    "type": "redirect",
    "redirect_url": "https://provider.example/checkout/abc123",
    "expires_at": "2026-08-17T15:02:07Z"
  }
}`;

const DEMO = `git clone ${STACK_REPO}.git
cd stack
make demo`;

const CHAPTERS: [ChapterSlug, number][] = [
  ["data-model", 54],
  ["lifecycle", 71],
  ["idempotency", 33],
  ["payments-api", 108],
  ["capabilities", 49],
  ["webhooks", 75],
  ["authentication", 61],
  ["conformance", 90],
];

const RULE_COUNT = CHAPTERS.reduce((total, [, rules]) => total + rules, 0);

const sectionTitle = "text-3xl leading-tight font-bold tracking-[-0.02em] text-balance";

export function Home({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <HomeLayout {...baseOptions(locale)}>
      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-28">
          <div>
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em] text-balance">{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fd-muted-foreground">{t.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={href("/docs/spec")} className="btn btn-primary">
                {t.readSpec}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link to={href("/docs/quickstart")} className="btn">
                {t.quickstart}
              </Link>
            </div>
            <p className="mt-8 max-w-xl text-sm text-fd-muted-foreground">{t.status}</p>
          </div>
          <CodeTabs
            tabs={[
              { label: t.request, lang: "bash", code: REQUEST },
              { label: t.response, lang: "json", code: RESPONSE },
            ]}
          />
        </section>

        <section className="border-t border-fd-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 lg:py-24">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <h2 className={sectionTitle}>{t.flow.title}</h2>
              <p className="max-w-xl text-fd-muted-foreground lg:pt-1.5">{t.flow.body}</p>
            </div>
            <IntegrationDiagram copy={t.diagram} />
          </div>
        </section>

        <section className="border-t border-fd-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 lg:py-24">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
              <h2 className={sectionTitle}>{t.spec.title}</h2>
              <p className="max-w-xl text-fd-muted-foreground lg:pt-1.5">{t.spec.body(RULE_COUNT)}</p>
            </div>
            <ol className="mt-12 grid border-t border-fd-border md:grid-cols-2 md:gap-x-12">
              {CHAPTERS.map(([slug, rules]) => {
                const chapter = t.spec.chapters[slug];
                return (
                  <li key={slug} className="border-b border-fd-border">
                    <Link to={href(`/docs/spec/${slug}`)} className="group flex items-baseline gap-6 py-5 transition-colors">
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 font-semibold group-hover:text-fd-primary">
                          {chapter.name}
                          <ArrowRight
                            className="size-4 -translate-x-1 opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-1 block text-[0.9375rem] text-fd-muted-foreground">{chapter.body}</span>
                      </span>
                      <span className="shrink-0 font-mono text-sm text-fd-muted-foreground tabular-nums">
                        {rules} {t.spec.rules}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="border-t border-fd-border">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-24">
            <div>
              <h2 className={sectionTitle}>{t.demo.title}</h2>
              <p className="mt-4 max-w-md text-fd-muted-foreground">{t.demo.body}</p>
              <Link to={href("/docs/quickstart")} className="btn mt-8">
                {t.demo.cta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="min-w-0 [&_figure]:my-0">
              <DynamicCodeBlock lang="bash" code={DEMO} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-fd-border bg-fd-card">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 text-sm sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-3">
            <p className="flex items-center gap-2 text-base font-bold tracking-tight">
              <img src="/openfsp-mark.svg" alt="" width={20} height={20} className="dark:hidden" />
              <img src="/openfsp-mark-inverse.svg" alt="" width={20} height={20} className="hidden dark:block" />
              OpenFSP
            </p>
            <p className="max-w-xs text-fd-muted-foreground">{t.footer.about}</p>
          </div>
          {t.footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-semibold">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link to={href(link.href)} className="text-fd-muted-foreground hover:text-fd-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="GitHub">
            <p className="font-semibold">GitHub</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a href={GITHUB_URL} className="text-fd-muted-foreground hover:text-fd-foreground">
                  openfspht
                </a>
              </li>
              <li>
                <a href={STACK_REPO} className="text-fd-muted-foreground hover:text-fd-foreground">
                  stack
                </a>
              </li>
              <li>
                <a href={`${GITHUB_URL}/openfsp/blob/main/LICENSE`} className="text-fd-muted-foreground hover:text-fd-foreground">
                  Apache-2.0
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </HomeLayout>
  );
}
