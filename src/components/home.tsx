import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Header } from "fumadocs-ui/layouts/home/slots/header";
import { ArrowRight, ArrowUpRight, Building2, Check, Copy, Terminal, Webhook } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import { CODE_REPO, LINKEDIN_URL, X_URL, baseOptions, socialLinks } from "@/lib/layout.shared";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { homeCopy } from "@/lib/home-copy";

type CopyText = (typeof homeCopy)[Locale];

const DEMO_COMMANDS = [
    "curl -fsSLO https://cdn.openfsp.org/validate.sh",
    "sh validate.sh https://simulator-api.openfsp.org/mock_openfsp",
];

const EVENT_BODY = `{
  "type": "payment.succeeded",
  "data": {
    "id": "pay_06GY9B9M4HVRD2XV5QQ81Z4WAW",
    "reference": "5f0c1a2e-8b3d-4c9a-9e71-2d4b6a8c0f13",
    "status": "succeeded",
    "amount": { "amount": 125000, "currency": "HTG" }
  }
}`;

const SPONSOR_CONTACT = "mailto:hey@openfsp.org";
const GOVERNANCE_REPO = "https://github.com/openfspht/governance";
const VALIDATOR_URL = "https://validator.openfsp.org";
const MAVEN_SDK = "https://central.sonatype.com/artifact/org.openfsp/openfsp-sdk";
const NPM_SDK = "https://www.npmjs.com/package/@openfsp/sdk";
const SPONSORS = [
    {
        name: "Karako Systems",
        url: "https://karakosystems.com",
        logo: "https://cdn.karakosystems.com/karako/logos/logo-full-black.png",
        logoDark: "https://cdn.karakosystems.com/karako/logos/logo-full-white.png",
    },
];
const muted = "text-fd-muted-foreground";
const sectionTitle =
    "text-[clamp(26px,3vw,36px)] leading-tight font-semibold tracking-[-0.03em] text-balance text-fd-primary";

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
                {message === copied ? (
                    <Check size={15} aria-hidden />
                ) : (
                    <Copy size={15} aria-hidden />
                )}
            </button>
            <span role="status" className="sr-only">
                {message}
            </span>
        </span>
    );
}

function LandingHeader() {
    return (
        <nav className="sticky top-0 z-40" aria-label="OpenFSP">
            <Header aria-label={undefined} />
        </nav>
    );
}

type FooterLink = { label: string } & ({ to: string } | { url: string });

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
    return (
        <nav aria-label={title} className={`flex flex-col items-start gap-2.5 text-sm ${muted}`}>
            <h2 className="mb-1 text-sm font-semibold text-fd-primary">{title}</h2>
            {links.map((link) =>
                "to" in link ? (
                    <Link key={link.label} to={link.to} className="hover:text-fd-primary">
                        {link.label}
                    </Link>
                ) : (
                    <a key={link.label} href={link.url} className="hover:text-fd-primary">
                        {link.label}
                    </a>
                ),
            )}
        </nav>
    );
}

function Brand() {
    return (
        <span className="inline-flex items-center gap-2 text-[21px] font-bold tracking-[-0.03em] text-fd-primary md:text-[23px] dark:text-fd-foreground">
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
    const arrow = "mx-auto shrink-0 rotate-90 text-fd-primary md:rotate-0";
    return (
        <figure className="mt-8 rounded-lg border border-fd-border bg-fd-card p-4 sm:p-6">
            <figcaption className={`text-[13px] ${muted}`}>{t.caption}</figcaption>
            <div className="mt-5 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.2fr] md:gap-5">
                <div className={`${node} border-fd-border bg-fd-background`}>
                    <Terminal size={19} aria-hidden />
                    <strong className="text-sm font-semibold">{t.app}</strong>
                </div>
                <ArrowRight size={19} className={arrow} aria-hidden />
                <div className={`${node} border-brand-ink bg-brand-ink text-white`}>
                    <img src="/openfsp-mark-inverse.svg" width={25} height={25} alt="" />
                    <strong className="text-sm font-semibold">{t.contract}</strong>
                    <span className="text-[13px] text-white/75">{t.contractDetail}</span>
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
                ...socialLinks,
            ]}
            githubUrl={CODE_REPO}
        >
            <div>
                <section className="landing-container py-14 sm:py-16 lg:py-24">
                    <div className="min-w-0">
                        <h1 className="hero-title text-fd-primary">
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
                            className={`mt-6 max-w-[38rem] text-base/7 text-pretty md:text-[18px]/[1.75] ${muted}`}
                        >
                            {t.lead}
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            <Link to={href("/docs/spec")} className="landing-button is-primary">
                                {t.primary}
                                <ArrowUpRight size={17} aria-hidden />
                            </Link>
                            <Link
                                to={href("/docs/spec/payments-api")}
                                className="landing-button is-secondary"
                            >
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
                            <li
                                key={step.title}
                                className="grid grid-cols-[28px_1fr] gap-x-3 md:block"
                            >
                                <span className="row-span-2 text-sm font-semibold text-fd-primary tabular-nums md:mb-4 md:block">
                                    {index + 1}
                                </span>
                                <h3 className="text-base font-semibold tracking-[-0.01em]">
                                    {step.title}
                                </h3>
                                <p
                                    className={`mt-2 max-w-[20rem] text-[15px]/[1.7] md:max-w-none ${muted}`}
                                >
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
                        <p className={`mt-5 max-w-[30rem] text-[15px]/[1.75] ${muted}`}>
                            {t.contract.body}
                        </p>
                        <div className="mt-6">
                            {t.contract.links.map((item) => (
                                <Link
                                    key={item.href}
                                    to={href(item.href)}
                                    className="contract-link flex items-center justify-between gap-5 border-b border-fd-border py-4"
                                >
                                    <div>
                                        <h3 className="text-[15px] font-semibold text-fd-primary">
                                            {item.title}
                                        </h3>
                                        <p className={`mt-1 text-sm ${muted}`}>{item.body}</p>
                                    </div>
                                    <ArrowUpRight
                                        size={18}
                                        className="shrink-0 text-fd-primary"
                                        aria-hidden
                                    />
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
                        <pre
                            className="code-block"
                            role="region"
                            tabIndex={0}
                            aria-label={t.contract.payload}
                        >
                            <HighlightedCode code={EVENT_BODY} />
                        </pre>
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-(--code-line) px-4 py-3.5 text-[13px] text-(--code-muted) sm:px-5">
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
                        className="text-[22px] leading-snug font-semibold tracking-[-0.02em] text-balance text-fd-primary"
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
                        <p className={`mt-3.5 max-w-[26rem] text-[15px]/[1.75] ${muted}`}>
                            {t.start.body}
                        </p>
                        <a
                            href={`${href("/docs/quickstart")}#1`}
                            className="landing-button is-primary mt-6"
                        >
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
                                copied={t.start.copied}
                                error={t.start.copyError}
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
                    <h2
                        id="status-title"
                        className="text-[22px] font-semibold tracking-[-0.02em] text-fd-primary"
                    >
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
                                    <h3 className="mb-1.5 text-[15px] font-semibold">
                                        {phase.title}
                                    </h3>
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

                <section
                    className="landing-container border-t border-fd-border py-14 text-center md:py-20"
                    aria-labelledby="sponsors-title"
                >
                    <h2 id="sponsors-title" className={sectionTitle}>
                        {t.sponsors.title}
                    </h2>
                    <p className={`mx-auto mt-4 max-w-[34rem] text-[15px]/[1.75] ${muted}`}>
                        {t.sponsors.body}
                    </p>
                    <ul className="mt-9 flex flex-wrap items-center justify-center gap-4">
                        {SPONSORS.map((sponsor) => (
                            <li key={sponsor.name}>
                                <a
                                    href={sponsor.url}
                                    aria-label={sponsor.name}
                                    className="flex h-24 w-64 items-center justify-center rounded-lg border border-fd-border transition-colors hover:border-fd-primary"
                                >
                                    <img
                                        src={sponsor.logo}
                                        alt=""
                                        width={150}
                                        height={50}
                                        className="h-12 w-auto dark:hidden"
                                    />
                                    <img
                                        src={sponsor.logoDark}
                                        alt=""
                                        width={150}
                                        height={50}
                                        className="hidden h-12 w-auto dark:block"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href={SPONSOR_CONTACT} className="landing-button is-secondary mt-8">
                        {t.sponsors.cta}
                        <ArrowUpRight size={18} aria-hidden />
                    </a>
                </section>
            </div>
            <footer className="landing-footer border-t border-fd-border">
                <div className="landing-container">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-3 md:gap-12 md:py-20 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
                        <div className="col-span-2 md:col-span-3 lg:col-span-1">
                            <Link to={href("/")} aria-label="OpenFSP">
                                <Brand />
                            </Link>
                            <p className={`mt-3 max-w-[18rem] text-sm/relaxed ${muted}`}>
                                {t.footer.description}
                            </p>
                        </div>
                        <FooterColumn
                            title={t.footer.spec}
                            links={[
                                { label: t.footer.specOverview, to: href("/docs/spec") },
                                {
                                    label: t.footer.paymentsApi,
                                    to: href("/docs/spec/payments-api"),
                                },
                                { label: t.footer.webhooks, to: href("/docs/spec/webhooks") },
                                {
                                    label: t.footer.authentication,
                                    to: href("/docs/spec/authentication"),
                                },
                                { label: t.footer.conformance, to: href("/docs/spec/conformance") },
                            ]}
                        />
                        <FooterColumn
                            title={t.footer.docs}
                            links={[
                                { label: t.footer.quickstart, to: href("/docs/quickstart") },
                                { label: t.footer.architecture, to: href("/docs/architecture") },
                                { label: t.footer.gateway, to: href("/docs/gateway") },
                                {
                                    label: t.footer.nativeOperator,
                                    to: href("/docs/native-operator"),
                                },
                                { label: t.footer.status, to: href("/docs/status") },
                            ]}
                        />
                        <FooterColumn
                            title={t.footer.project}
                            links={[
                                { label: t.footer.registry, to: href("/docs/registry") },
                                { label: t.footer.decisions, to: href("/docs/decisions") },
                                { label: t.footer.verify, to: href("/docs/verify") },
                                { label: t.footer.governance, url: GOVERNANCE_REPO },
                                { label: t.footer.sponsor, url: SPONSOR_CONTACT },
                            ]}
                        />
                        <FooterColumn
                            title={t.footer.tools}
                            links={[
                                { label: t.footer.validator, url: VALIDATOR_URL },
                                { label: t.footer.sdkKotlin, url: MAVEN_SDK },
                                { label: t.footer.sdkTypescript, url: NPM_SDK },
                                { label: t.footer.source, url: CODE_REPO },
                            ]}
                        />
                    </div>
                    <div
                        className={`flex flex-wrap items-center justify-between gap-4 border-t border-fd-border py-7 text-[13px] md:py-9 ${muted}`}
                    >
                        <span>{t.footer.note}</span>
                        <div className="flex items-center gap-5">
                            <a href={X_URL} aria-label="X" className="hover:text-fd-primary">
                                <XIcon />
                            </a>
                            <a
                                href={LINKEDIN_URL}
                                aria-label="LinkedIn"
                                className="hover:text-fd-primary"
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href={CODE_REPO}
                                aria-label={t.footer.source}
                                className="hover:text-fd-primary"
                            >
                                <GitHubIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </HomeLayout>
    );
}
