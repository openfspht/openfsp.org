import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Header } from "fumadocs-ui/layouts/home/slots/header";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Copy,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Webhook,
} from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import { CODE_REPO, baseOptions } from "@/lib/layout.shared";
import { homeCopy } from "@/lib/home-copy";

type CopyText = (typeof homeCopy)[Locale];

const DEMO_COMMANDS = [
  "git clone https://github.com/openfspht/openfsp.git",
  "cd openfsp",
  "make demo",
];

const EVENT_BODY = `{
  "type": "payment.succeeded",
  "data": {
    "id": "mock_pay_184",
    "reference": "ORDER-184",
    "status": "succeeded",
    "amount": { "amount": 125000, "currency": "HTG" }
  }
}`;

const muted = "text-fd-muted-foreground";
const sectionTitle =
  "text-[clamp(26px,3vw,36px)] leading-tight font-semibold tracking-[-0.03em] text-balance";

function HighlightedCode({ code }: { code: string }) {
  const tokens = code.split(/("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|\b\d+\b|\bnull\b)/g);
  return (
    <code>
      {tokens.map((token, index) => (
        <span
          key={index}
          className={
            token.endsWith(":")
              ? "code-key"
              : token.startsWith('"')
                ? "code-string"
                : /^\d+$/.test(token)
                  ? "code-number"
                  : undefined
          }
        >
          {token}
        </span>
      ))}
    </code>
  );
}

function CopyButton({
  value,
  label,
  copied,
  error,
}: {
  value: string;
  label: string;
  copied: string;
  error: string;
}) {
  const [message, setMessage] = useState("");
  return (
    <span className="ml-auto inline-flex">
      <button
        type="button"
        className="copy-button"
        aria-label={label}
        title={label}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setMessage(copied);
          } catch {
            setMessage(error);
          }
        }}
      >
        {message === copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      </button>
      <span role="status" className="sr-only">
        {message}
      </span>
    </span>
  );
}

function PaymentExample({ locale, t }: { locale: Locale; t: CopyText }) {
  const [provider, setProvider] = useState<"moncash" | "natcash">("moncash");
  const [paid, setPaid] = useState(false);
  const request = `{
  "reference": "ORDER-184",
  "amount": { "amount": 125000, "currency": "HTG" },
  "provider": "mock_${provider}",
  "return_url": "https://shop.example/return"
}`;
  return (
    <figure className="min-w-0" aria-label={t.demo.simulation}>
      <figcaption className={`mb-3 flex items-center gap-2 text-[13px] ${muted}`}>
        <span className="size-1.5 rounded-full bg-brand-accent" aria-hidden />
        {t.demo.simulation}
      </figcaption>
      <div className="code-window">
        <div className="flex items-center gap-3 border-b border-(--code-line) px-4 py-3 font-mono text-[13px]">
          <span className="font-bold text-(--code-muted)">POST</span>
          <span>/v1/payments</span>
          <CopyButton
            value={request}
            label={t.demo.copy}
            copied={t.demo.copied}
            error={t.demo.copyError}
          />
        </div>
        <div className="flex gap-1.5 px-4 pt-3.5 pb-1" role="group" aria-label={t.demo.provider}>
          {(["moncash", "natcash"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className="provider-option"
              aria-pressed={provider === item}
              onClick={() => {
                setProvider(item);
                setPaid(false);
              }}
            >
              {item === "moncash" ? "MonCash" : "NatCash"}
              <span className="text-[13px] text-(--code-muted)">mock</span>
            </button>
          ))}
        </div>
        <pre className="code-block" role="region" tabIndex={0} aria-label={t.demo.request}>
          <HighlightedCode code={request} />
        </pre>
        <div className="flex items-center gap-1.5 border-t border-(--code-line) px-4 py-2.5 font-mono text-[13px] text-(--code-muted)">
          <ShieldCheck size={14} aria-hidden />
          <span className="truncate">Idempotency-Key: order-184</span>
        </div>
      </div>
      <div className={`flex h-7 justify-center ${muted}`} aria-hidden>
        <ArrowRight size={15} className="rotate-90 self-center" />
      </div>
      <div className="rounded-xl border border-fd-border bg-fd-background">
        <div className="flex items-center justify-between gap-3 border-b border-fd-border px-4 py-3 text-sm">
          <span className="flex items-center gap-2 font-semibold">
            <img src="/openfsp-mark.svg" alt="" width={17} height={17} className="dark:hidden" />
            <img
              src="/openfsp-mark-inverse.svg"
              alt=""
              width={17}
              height={17}
              className="hidden dark:block"
            />
            {t.demo.response}
          </span>
          <span className={`text-[13px] tabular-nums ${muted}`}>payments / 184</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-5 sm:px-5">
          <div>
            <span className={`mb-1 block text-sm ${muted}`}>{t.demo.order}</span>
            <strong className="text-2xl font-semibold tracking-[-0.03em] tabular-nums">
              {t.demo.amount}
            </strong>
          </div>
          <span className={`payment-status ${paid ? "is-paid" : ""}`} role="status">
            {paid ? (
              <Check size={14} aria-hidden />
            ) : (
              <span className="size-1.5 rounded-full bg-brand-accent" aria-hidden />
            )}
            {paid ? t.demo.paid : t.demo.pending}
          </span>
        </div>
        <div className="flex items-center gap-3 px-4 pb-4 sm:px-5">
          <span
            className="grid size-6 shrink-0 place-items-center rounded-full border border-fd-border bg-fd-card text-fd-primary"
            aria-hidden
          >
            {paid ? <Check size={13} /> : <span className="size-1 rounded-full bg-fd-primary" />}
          </span>
          <div className="flex min-w-0 flex-col gap-0.5 text-sm">
            <span>{paid ? t.demo.webhook : t.demo.sent}</span>
            <code className={`text-[13px] ${muted}`}>
              {paid ? "payment.succeeded" : "payment.created"}
            </code>
          </div>
          <span className={`ml-auto text-[13px] tabular-nums ${muted}`}>
            {paid ? "14:32:09" : "14:32:07"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-b-xl border-t border-fd-border bg-fd-card px-4 py-3">
          <span className={`text-sm ${muted}`}>{paid ? t.demo.done : t.demo.waiting}</span>
          <button
            type="button"
            className="text-link shrink-0 cursor-pointer text-sm"
            onClick={() => setPaid(!paid)}
          >
            {paid ? <RotateCcw size={14} aria-hidden /> : <ArrowRight size={14} aria-hidden />}
            {paid ? t.demo.reset : t.demo.confirm}
          </button>
        </div>
      </div>
      <div className={`mt-2.5 flex items-center justify-between gap-3 text-[13px] ${muted}`}>
        <span>{t.demo.notice}</span>
        <a
          href={`${localePath(locale, "/docs/spec/payments-api")}#5.1`}
          aria-label={t.demo.responseLink}
          className="inline-flex p-1.5"
        >
          <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
    </figure>
  );
}

function LandingHeader() {
  return (
    <nav className="sticky top-0 z-40" aria-label="OpenFSP">
      <Header aria-label={undefined} />
    </nav>
  );
}

function Brand() {
  return (
    <span className="inline-flex items-center gap-2 text-[21px] font-bold tracking-[-0.03em] text-fd-foreground md:text-[23px]">
      <img src="/openfsp-mark.svg" alt="" width={27} height={27} className="dark:hidden" />
      <img
        src="/openfsp-mark-inverse.svg"
        alt=""
        width={27}
        height={27}
        className="hidden dark:block"
      />
      <span>OpenFSP</span>
    </span>
  );
}

function NativeRoute({ t }: { t: CopyText["native"] }) {
  const node =
    "flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border p-4 text-center";
  const arrow = `mx-auto shrink-0 rotate-90 md:rotate-0 ${muted}`;
  return (
    <figure className="mt-8 rounded-lg border border-fd-border bg-fd-card p-4 sm:p-6">
      <figcaption className={`text-[13px] ${muted}`}>{t.caption}</figcaption>
      <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.2fr] md:gap-5">
        <div className={`${node} border-fd-border bg-fd-background`}>
          <Terminal size={19} aria-hidden />
          <strong className="text-sm font-semibold">{t.app}</strong>
        </div>
        <ArrowRight size={19} className={arrow} aria-hidden />
        <div className={`${node} border-(--code-line) bg-(--code-bg) text-(--code-fg)`}>
          <img src="/openfsp-mark-inverse.svg" width={25} height={25} alt="" />
          <strong className="text-sm font-semibold">{t.contract}</strong>
          <span className="text-[13px] text-(--code-muted)">{t.contractDetail}</span>
        </div>
        <ArrowRight size={19} className={arrow} aria-hidden />
        <div className={`${node} border-fd-border bg-fd-background`}>
          <Building2 size={19} aria-hidden />
          <strong className="text-sm font-semibold">{t.providers}</strong>
          <span className={`text-[13px] ${muted}`}>{t.api}</span>
        </div>
      </div>
      <p className={`mt-5 text-center text-sm ${muted}`}>{t.note}</p>
    </figure>
  );
}

export function Home({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  const href = (path: string) => localePath(locale, path);
  const options = baseOptions(locale);
  return (
    <HomeLayout
      {...options}
      className="landing"
      slots={{ header: LandingHeader }}
      nav={{ ...options.nav, title: <Brand /> }}
      links={[
        { text: t.footer.docs, url: href("/docs"), active: "none" },
        { text: t.secondary, url: href("/docs/spec/payments-api"), active: "none" },
        { text: "GitHub", url: CODE_REPO, active: "none" },
      ]}
      githubUrl={undefined}
    >
      <div>
        <section className="landing-container grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-20">
          <div className="min-w-0">
            <h1 className="hero-title">
              {t.headline.map((line, index) => (
                <span
                  key={line}
                  className={
                    index === t.headline.length - 1
                      ? "text-brand-accent-deep dark:text-brand-accent"
                      : undefined
                  }
                >
                  {line}
                </span>
              ))}
            </h1>
            <p
              className={`mt-6 max-w-[30rem] text-base/7 text-pretty md:text-[17px]/[1.75] ${muted}`}
            >
              {t.lead}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <Link to={href("/docs/spec")} className="landing-button is-primary">
                {t.primary}
                <ArrowUpRight size={17} aria-hidden />
              </Link>
              <Link to={href("/docs/spec/payments-api")} className="landing-button is-secondary">
                {t.secondary}
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <ul className={`mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[13px] ${muted}`}>
              {t.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <PaymentExample locale={locale} t={t} />
        </section>

        <section
          className="landing-container border-t border-fd-border pt-10 pb-14 md:pb-16"
          aria-labelledby="native-title"
        >
          <h2 id="native-title" className={`${sectionTitle} max-w-[40rem]`}>
            {t.native.title}
          </h2>
          <NativeRoute t={t.native} />
          <ol className="mt-9 grid gap-6 md:grid-cols-3 md:gap-12">
            {t.native.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[28px_1fr] gap-x-3 md:block">
                <span
                  className={`row-span-2 text-sm font-semibold tabular-nums md:mb-4 md:block ${muted}`}
                >
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold tracking-[-0.01em]">{step.title}</h3>
                <p className={`mt-2 max-w-[20rem] text-[15px]/[1.7] md:max-w-none ${muted}`}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <a href={href("/docs/native-operator")} className="text-link mt-7 text-[15px]">
            {t.native.action}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </section>

        <section className="landing-container grid items-center gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-20 lg:gap-24">
          <div className="min-w-0">
            <h2 className={sectionTitle}>{t.contract.title}</h2>
            <p className={`mt-5 max-w-[30rem] text-[15px]/[1.75] ${muted}`}>{t.contract.body}</p>
            <div className="mt-6">
              {t.contract.links.map((item) => (
                <Link
                  key={item.href}
                  to={href(item.href)}
                  className="contract-link flex items-center justify-between gap-5 border-b border-fd-border py-4"
                >
                  <div>
                    <h3 className="text-[15px] font-semibold">{item.title}</h3>
                    <p className={`mt-1 text-sm ${muted}`}>{item.body}</p>
                  </div>
                  <ArrowUpRight size={18} className={`shrink-0 ${muted}`} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
          <figure className="code-window">
            <figcaption className="flex items-center justify-between gap-3 border-b border-(--code-line) px-4 py-3.5 text-sm sm:px-5">
              <span className="flex items-center gap-2">
                <Webhook size={16} aria-hidden />
                {t.contract.event}
              </span>
              <span className="text-[13px] text-(--code-muted)">JSON</span>
            </figcaption>
            <pre className="code-block" role="region" tabIndex={0} aria-label={t.contract.payload}>
              <HighlightedCode code={EVENT_BODY} />
            </pre>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-(--code-line) px-4 py-3.5 text-[13px] text-(--code-muted) sm:px-5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} aria-hidden />
                {t.demo.simulation}
              </span>
              <Link
                to={href("/docs/spec/webhooks")}
                className="flex items-center gap-1.5 hover:underline"
              >
                {t.contract.docs}
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </div>
          </figure>
        </section>

        <aside
          className="landing-container mb-10 grid gap-3 border-y border-fd-border py-7 md:grid-cols-[1fr_1.25fr] md:gap-12"
          aria-labelledby="gateway-title"
        >
          <h2
            id="gateway-title"
            className="text-[22px] leading-snug font-semibold tracking-[-0.02em] text-balance"
          >
            {t.gateway.title}
          </h2>
          <div>
            <p className={`text-[15px]/[1.75] ${muted}`}>{t.gateway.body}</p>
            <Link to={href("/docs/gateway")} className="text-link mt-3 text-[15px]">
              {t.gateway.link}
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </div>
        </aside>

        <section className="landing-container grid items-center gap-7 rounded-xl border border-fd-border bg-fd-card px-4 py-6 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-10">
          <div className="min-w-0">
            <h2 className={sectionTitle}>{t.start.title}</h2>
            <p className={`mt-3.5 max-w-[26rem] text-[15px]/[1.75] ${muted}`}>{t.start.body}</p>
            <a href={`${href("/docs/quickstart")}#1`} className="landing-button is-primary mt-6">
              {t.start.action}
              <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
          <div className="min-w-0 rounded-lg border border-fd-border bg-fd-background">
            <div
              className={`flex items-center gap-2.5 border-b border-fd-border px-4 py-2.5 text-[13px] ${muted}`}
            >
              <Terminal size={15} aria-hidden />
              {t.start.requirements}
              <CopyButton
                value={DEMO_COMMANDS.join("\n")}
                label={t.start.copy}
                copied={t.demo.copied}
                error={t.demo.copyError}
              />
            </div>
            <pre
              className="overflow-x-auto px-4 py-4 font-mono text-[13px]/[2.1]"
              role="region"
              tabIndex={0}
              aria-label={t.start.copy}
            >
              <code>
                {DEMO_COMMANDS.map((command, index) => (
                  <span key={command} className="block">
                    <span className={`select-none ${muted}`}>$ </span>
                    <span
                      className={
                        index === DEMO_COMMANDS.length - 1
                          ? "font-semibold text-fd-primary"
                          : undefined
                      }
                    >
                      {command}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </section>

        <aside
          className="landing-container my-10 grid gap-4 md:my-14 md:grid-cols-2 md:gap-14 lg:gap-24"
          aria-labelledby="status-title"
        >
          <h2 id="status-title" className="text-[22px] font-semibold tracking-[-0.02em]">
            {t.status.title}
          </h2>
          <div>
            <p className={`text-[15px]/[1.75] ${muted}`}>{t.status.body}</p>
            <div className="mt-6 grid gap-5">
              {t.status.phases.map((phase, index) => (
                <div
                  key={phase.title}
                  className={`border-l-2 pl-3.5 ${index === 0 ? "border-brand-accent" : "border-fd-border"}`}
                >
                  <h3 className="mb-1.5 text-[15px] font-semibold">{phase.title}</h3>
                  <p className={`text-[15px]/[1.7] ${muted}`}>{phase.body}</p>
                </div>
              ))}
            </div>
            <a href={`${href("/docs")}#phases`} className="text-link mt-5 text-[15px]">
              {t.status.link}
              <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </aside>
      </div>
      <footer className="landing-footer border-t border-fd-border">
        <div className="landing-container">
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 py-8 md:grid-cols-[2fr_1fr_1fr] md:gap-16 md:py-10">
            <div className="col-span-2 md:col-span-1">
              <Link to={href("/")} aria-label="OpenFSP">
                <Brand />
              </Link>
              <p className={`mt-3 max-w-[18rem] text-sm/relaxed ${muted}`}>
                {t.footer.description}
              </p>
            </div>
            <nav
              aria-label={t.footer.docs}
              className={`flex flex-col items-start gap-2.5 text-sm ${muted}`}
            >
              <h2 className="mb-1 text-sm font-semibold text-fd-foreground">{t.footer.docs}</h2>
              <Link to={href("/docs/quickstart")}>{t.footer.quickstart}</Link>
              <Link to={href("/docs/spec")}>{t.footer.spec}</Link>
              <Link to={href("/docs/architecture")}>{t.footer.architecture}</Link>
            </nav>
            <nav
              aria-label={t.footer.project}
              className={`flex flex-col items-start gap-2.5 text-sm ${muted}`}
            >
              <h2 className="mb-1 text-sm font-semibold text-fd-foreground">{t.footer.project}</h2>
              <Link to={href("/docs/registry")}>{t.footer.registry}</Link>
              <Link to={href("/docs/decisions")}>{t.footer.decisions}</Link>
              <Link to={href("/docs/verify")}>{t.footer.verify}</Link>
            </nav>
          </div>
          <div
            className={`flex flex-wrap items-center justify-between gap-4 border-t border-fd-border py-5 text-[13px] ${muted}`}
          >
            <span>{t.footer.note}</span>
            <a href={CODE_REPO} className="flex items-center gap-1.5">
              {t.footer.source}
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        </div>
      </footer>
    </HomeLayout>
  );
}
