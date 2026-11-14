import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { ArrowRight } from "lucide-react";
import { Architecture } from "@/components/architecture";
import { IntegrationDiagram } from "@/components/integration-diagram";
import { PaymentFlow } from "@/components/payment-flow";
import { localePath, type Locale } from "@/lib/i18n";
import { GITHUB_URL, CODE_REPO, baseOptions } from "@/lib/layout.shared";
import { homeCopy } from "@/lib/home-copy";

const sectionTitle = "text-3xl leading-tight font-bold tracking-[-0.02em] text-balance";

function Section({ title, body, children }: { title: string; body?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-fd-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 lg:py-28">
        <div className="mb-12 grid gap-4 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <h2 className={sectionTitle}>{title}</h2>
          {body && <p className="max-w-xl text-lg leading-relaxed text-fd-muted-foreground lg:pt-0.5">{body}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Home({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const href = (path: string) => localePath(locale, path);

  return (
    <HomeLayout {...baseOptions(locale)}>
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:pt-24 lg:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.03em] text-balance">{t.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-fd-muted-foreground sm:text-xl">{t.lead}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to={href("/docs")} className="btn btn-primary">
                {t.readDocs}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href={CODE_REPO} className="btn">
                {t.runDemo}
              </a>
            </div>
          </div>
          <IntegrationDiagram copy={t.diagram} />
        </section>

        <Section title={t.architecture.title} body={t.architecture.body}>
          <Architecture copy={t.architecture.copy} />
        </Section>

        <Section title={t.flow.title} body={t.flow.body}>
          <PaymentFlow copy={t.flow.copy} />
        </Section>

        <Section title={t.usage.title}>
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {t.usage.roles.map((role) => (
              <div key={role.name}>
                <p className="text-sm font-semibold text-fd-primary">{role.name}</p>
                <p className="mt-2 text-2xl font-bold tracking-[-0.02em]">{role.goal}</p>
                <ol className="mt-6 space-y-4 border-l border-fd-border pl-5">
                  {role.steps.map((step) => (
                    <li key={step} className="relative leading-relaxed text-fd-muted-foreground">
                      <span aria-hidden className="absolute top-2.5 -left-[24.5px] size-2 rounded-full bg-fd-muted-foreground/40" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>

        <section className="border-t border-fd-border">
          <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center">
            <h2 className={sectionTitle}>{t.closing.title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-fd-muted-foreground">{t.closing.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={CODE_REPO} className="btn btn-primary">
                {t.runDemo}
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <Link to={href("/docs")} className="btn">
                {t.readDocs}
              </Link>
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
                <a href={CODE_REPO} className="text-fd-muted-foreground hover:text-fd-foreground">
                  {t.runDemo}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </HomeLayout>
  );
}
