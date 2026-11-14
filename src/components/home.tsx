import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { ArrowRight } from "lucide-react";
import { IntegrationDiagram } from "@/components/integration-diagram";
import { localePath, type Locale } from "@/lib/i18n";
import { baseOptions, STACK_REPO } from "@/lib/layout.shared";
import { homeCopy } from "@/lib/home-copy";

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
  "provider_order_id": "q3v7m2kxbh4tapewdc5nzr2b3z",
  "next_action": {
    "type": "redirect",
    "redirect_url": "https://provider.example/checkout/abc123",
    "expires_at": "2026-08-17T15:02:07Z"
  }
}`;

const DEMO = `git clone ${STACK_REPO}.git
cd stack
make demo`;

export function Home({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <HomeLayout {...baseOptions(locale)}>
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 pt-20 pb-16 sm:pt-28">
          <h1 className="max-w-3xl text-[clamp(2.5rem,1.6rem+3.6vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.03em] text-balance">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fd-muted-foreground sm:text-xl">{t.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={href("/docs")} className="btn btn-primary">
              {t.readDocs}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to={href("/docs/quickstart")} className="btn">
              {t.runDemo}
            </Link>
          </div>
          <p className="mt-8 text-sm text-fd-muted-foreground">{t.status}</p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-24">
          <IntegrationDiagram copy={t.diagram} />
          <p className="mt-4 max-w-2xl text-fd-muted-foreground">{t.diagramCaption}</p>
        </section>

        <section className="border-y border-fd-border bg-fd-card/50">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-balance">{t.api.title}</h2>
              <p className="mt-4 text-fd-muted-foreground">{t.api.body}</p>
              <ul className="mt-8 space-y-4">
                {t.api.points.map((point) => (
                  <li key={point.rule} className="text-[0.9375rem]">
                    <span className="font-medium">{point.text}</span>{" "}
                    <Link
                      to={href(point.href)}
                      className="font-mono text-[0.8125rem] whitespace-nowrap text-fd-muted-foreground underline decoration-fd-border underline-offset-4 hover:text-fd-foreground"
                    >
                      {point.rule}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 space-y-3 [&_figure]:my-0">
              <DynamicCodeBlock lang="bash" code={REQUEST} />
              <DynamicCodeBlock lang="json" code={RESPONSE} />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-24">
          <h2 className="text-3xl font-bold tracking-[-0.02em]">{t.parts.title}</h2>
          <ul className="mt-10 grid border-t border-fd-border sm:grid-cols-2">
            {t.parts.items.map((item) => (
              <li key={item.name} className="border-b border-fd-border sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
                <Link to={href(item.href)} className="group block py-7">
                  <h3 className="flex items-center gap-2 text-lg font-bold">
                    {item.name}
                    <ArrowRight
                      className="size-4 -translate-x-1 opacity-0 transition duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-2 max-w-md text-fd-muted-foreground">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-24">
          <div className="grid items-center gap-10 rounded-2xl border border-fd-border bg-fd-card px-6 py-12 sm:px-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.02em]">{t.demo.title}</h2>
              <p className="mt-4 max-w-md text-fd-muted-foreground">{t.demo.body}</p>
              <Link to={href("/docs/quickstart")} className="btn btn-primary mt-8">
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

      <footer className="border-t border-fd-border">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-fd-muted-foreground">
          <p>{t.footer}</p>
          <nav className="flex gap-5">
            <a href="https://github.com/openfspht" className="hover:text-fd-foreground">
              GitHub
            </a>
            <Link to={href("/docs/decisions")} className="hover:text-fd-foreground">
              {t.decisions}
            </Link>
            <a href="https://github.com/openfspht/openfsp/blob/main/LICENSE" className="hover:text-fd-foreground">
              Apache-2.0
            </a>
          </nav>
        </div>
      </footer>
    </HomeLayout>
  );
}
