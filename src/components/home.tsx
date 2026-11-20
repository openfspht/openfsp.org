import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { Header } from "fumadocs-ui/layouts/home/slots/header";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronRight,
    Copy,
    Heart,
    Landmark,
    LayoutPanelLeft,
    ShieldCheck,
    ShoppingCart,
    Waves,
    type LucideIcon,
} from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import {
    CODE_REPO,
    GITHUB_URL,
    LINKEDIN_URL,
    X_URL,
    baseOptions,
    socialLinks,
} from "@/lib/layout.shared";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { homeCopy } from "@/lib/home-copy";

type CopyText = (typeof homeCopy)[Locale];

const DEMO_COMMANDS = [
    "curl -fsSL https://cdn.openfsp.org/validate.sh \\",
    "  | sh -s -- https://simulator-api.openfsp.org/mock_openfsp",
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

const DEMO_SHOP = "https://demo.openfsp.org";
const SPONSOR_CONTACT = "mailto:hey@openfsp.org";
const GOVERNANCE_REPO = "https://github.com/openfspht/governance";
const VALIDATOR_URL = "https://validator.openfsp.org";
const MAVEN_SDK = "https://central.sonatype.com/artifact/org.openfsp/openfsp-sdk";
const NPM_SDK = "https://www.npmjs.com/package/@openfsp/sdk";
const KARAKO = {
    name: "Karako Systems",
    url: "https://karakosystems.com",
    logo: "https://cdn.karakosystems.com/karako/logos/logo-full-black.png",
    logoDark: "https://cdn.karakosystems.com/karako/logos/logo-full-white.png",
};
const SERVICE_ICONS: LucideIcon[] = [ShoppingCart, LayoutPanelLeft, Waves, ShieldCheck, Landmark];

const muted = "text-fd-muted-foreground";
const subtle = "text-text-3";

const RING_ARCS = [
    "M492.1 565.7A300 300 0 0 1 48.1 446.8",
    "M21.1 346.1A300 300 0 0 1 346.1 21.1",
    "M446.8 48.1A300 300 0 0 1 565.7 492.1",
    "M451.1 411.8A160 160 0 0 1 206.9 433.1",
    "M175.0 387.6A160 160 0 0 1 278.6 165.5",
    "M333.9 160.6A160 160 0 0 1 474.5 361.4",
];
const DASHED_ARCS = [
    "M340.0 549.1A230 230 0 0 1 90.9 300.0",
    "M111.5 222.8A230 230 0 0 1 451.9 131.6",
    "M508.4 188.1A230 230 0 0 1 417.2 528.5",
];
const RING_NODES = [
    [492.1, 565.7],
    [48.1, 446.8],
    [21.1, 346.1],
    [346.1, 21.1],
    [446.8, 48.1],
    [565.7, 492.1],
    [340.0, 549.1],
    [90.9, 300.0],
    [111.5, 222.8],
    [451.9, 131.6],
    [508.4, 188.1],
    [417.2, 528.5],
    [451.1, 411.8],
    [206.9, 433.1],
    [175.0, 387.6],
    [278.6, 165.5],
    [333.9, 160.6],
    [474.5, 361.4],
];

function HeroRings() {
    return (
        <svg
            width="640"
            height="640"
            viewBox="0 0 640 640"
            fill="none"
            aria-hidden
            className="pointer-events-none absolute top-2 -right-[220px] hidden lg:block"
        >
            {RING_ARCS.map((d) => (
                <path key={d} d={d} className="stroke-hero-line" strokeWidth={1.5} />
            ))}
            {DASHED_ARCS.map((d) => (
                <path
                    key={d}
                    d={d}
                    className="stroke-hero-line"
                    strokeWidth={1.5}
                    strokeDasharray="2 8"
                />
            ))}
            <path
                d="M512.8 90.2A300 300 0 0 1 618.9 346.1"
                className="stroke-brand-accent"
                strokeWidth={3}
                strokeLinecap="round"
            />
            <path
                d="M292.2 477.6A160 160 0 0 1 169.6 374.7"
                className="stroke-fd-primary"
                strokeWidth={3}
                strokeLinecap="round"
            />
            {RING_NODES.map(([cx, cy]) => (
                <circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r={3.5}
                    className="fill-fd-background stroke-hero-line-strong"
                    strokeWidth={1.5}
                />
            ))}
            <circle cx={320} cy={320} r={5} className="fill-brand-accent" />
        </svg>
    );
}

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
                    <Check size={14} aria-hidden />
                ) : (
                    <Copy size={14} aria-hidden />
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

function Brand({ height = 22 }: { height?: number }) {
    const width = Math.round((height * 499.9) / 90);
    return (
        <span className="inline-flex items-center">
            <img
                src="/openfsp-logo.svg"
                alt="OpenFSP"
                width={width}
                height={height}
                className="dark:hidden"
            />
            <img
                src="/openfsp-logo-inverse.svg"
                alt="OpenFSP"
                width={width}
                height={height}
                className="hidden dark:block"
            />
        </span>
    );
}

function Eyebrow({ children }: { children: string }) {
    return <p className="eyebrow">{children}</p>;
}

type FooterLink = { label: string } & ({ to: string } | { url: string });

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
    return (
        <nav aria-label={title} className={`flex flex-col items-start gap-2.5 text-sm ${muted}`}>
            <h2 className="mb-1 text-sm font-semibold text-fd-foreground">{title}</h2>
            {links.map((link) =>
                "to" in link ? (
                    <Link key={link.label} to={link.to}>
                        {link.label}
                    </Link>
                ) : (
                    <a key={link.label} href={link.url}>
                        {link.label}
                    </a>
                ),
            )}
        </nav>
    );
}

function NativeRoute({ t }: { t: CopyText["native"] }) {
    const cell = "flex flex-[1_1_240px] flex-col gap-1.5 p-7";
    return (
        <figure className="mt-12">
            <figcaption className="sr-only">{t.caption}</figcaption>
            <div className="flex flex-wrap items-stretch overflow-hidden rounded-2xl border border-fd-border bg-surface">
                <div className={cell}>
                    <span className={`font-mono text-xs ${subtle}`}>01</span>
                    <span className="font-semibold">{t.app}</span>
                    <span className={`text-sm ${subtle}`}>{t.appDetail}</span>
                </div>
                <div
                    className={`${cell} bg-brand-ink text-white shadow-[inset_0_3px_0_var(--color-brand-accent)]`}
                >
                    <span className="flex items-center gap-2.5">
                        <img src="/openfsp-mark-inverse.svg" width={22} height={22} alt="" />
                        <span className="font-semibold">{t.contract}</span>
                    </span>
                    <span className="text-sm text-brand-chalk/80">{t.contractDetail}</span>
                </div>
                <div className={cell}>
                    <span className={`font-mono text-xs ${subtle}`}>03</span>
                    <span className="font-semibold">{t.providers}</span>
                    <span className={`text-sm ${subtle}`}>{t.api}</span>
                </div>
            </div>
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
                { text: t.nav.docs, url: href("/docs"), active: "none" },
                { text: t.nav.api, url: href("/docs/spec/payments-api"), active: "none" },
                { text: t.nav.status, url: "#status", active: "none" },
                { text: t.nav.demo, url: "#demo", active: "none" },
                { text: t.nav.sponsors, url: "#sponsors", active: "none" },
                ...socialLinks,
            ]}
            githubUrl={CODE_REPO}
        >
            <div>
                <div className="relative overflow-hidden">
                    <div className="landing-container relative">
                        <HeroRings />
                    </div>
                    <section className="landing-container relative pt-12 pb-16 md:pt-28 md:pb-24">
                        <a
                            href="#status"
                            className={`inline-flex items-center gap-2 rounded-full border border-fd-border py-1 pr-3 pl-1.5 text-[13px] ${muted}`}
                        >
                            <span className="rounded-full bg-fd-primary px-2 py-px text-xs font-semibold text-fd-primary-foreground">
                                {t.version}
                            </span>
                            <span className="size-1.5 rounded-full bg-brand-accent" aria-hidden />
                            <span>{t.phase}</span>
                            <ChevronRight size={12} aria-hidden />
                        </a>
                        <h1 className="hero-title mt-7 max-w-[720px]">
                            {t.headline.before}
                            <span className="accent-underline">{t.headline.highlight}</span>
                            {t.headline.after}
                        </h1>
                        <p
                            className={`mt-7 max-w-[620px] text-[17px]/[1.6] text-pretty md:text-[19px] ${muted}`}
                        >
                            {t.lead}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <Link
                                to={href("/docs/spec")}
                                className="landing-button is-primary is-large"
                            >
                                {t.primary}
                                <ArrowRight size={16} aria-hidden />
                            </Link>
                            <a href="#demo" className="landing-button is-secondary is-large">
                                {t.secondary}
                            </a>
                        </div>
                        <ul className={`mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm ${subtle}`}>
                            {t.facts.map((fact) => (
                                <li key={fact.strong}>
                                    {fact.before}
                                    <span className="font-semibold text-fd-foreground">
                                        {fact.strong}
                                    </span>
                                    {fact.after}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <section className="landing-section is-alt" aria-labelledby="native-title">
                    <div className="landing-container">
                        <Eyebrow>{t.native.eyebrow}</Eyebrow>
                        <h2 id="native-title" className="section-title mt-3 max-w-[640px]">
                            {t.native.title}
                        </h2>
                        <NativeRoute t={t.native} />
                        <ol className="mt-12 grid gap-10 md:grid-cols-3">
                            {t.native.steps.map((step, index) => (
                                <li key={step.title}>
                                    <span className="step-number">{index + 1}</span>
                                    <h3 className="mt-3.5 text-[17px] font-semibold">
                                        {step.title}
                                    </h3>
                                    <p className={`mt-2 text-[15px]/[1.6] ${muted}`}>{step.body}</p>
                                </li>
                            ))}
                        </ol>
                        <Link
                            to={href("/docs/native-operator")}
                            className="arrow-link mt-10 text-[15px]"
                        >
                            {t.native.action}
                            <ArrowRight size={14} aria-hidden />
                        </Link>
                    </div>
                </section>

                <section className="landing-section" aria-labelledby="contract-title">
                    <div className="landing-container grid items-start gap-16 lg:grid-cols-[1fr_1.15fr]">
                        <div className="min-w-0">
                            <Eyebrow>{t.contract.eyebrow}</Eyebrow>
                            <h2 id="contract-title" className="section-title mt-3">
                                {t.contract.title}
                            </h2>
                            <p className={`mt-4 ${muted}`}>{t.contract.body}</p>
                            <div className="mt-8 border-t border-fd-border">
                                {t.contract.links.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={href(item.href)}
                                        className="row-link flex items-center gap-4 border-b border-fd-border py-5"
                                    >
                                        <span className="flex-1">
                                            <span className="row-title block font-semibold">
                                                {item.title}
                                            </span>
                                            <span className={`block text-sm ${subtle}`}>
                                                {item.body}
                                            </span>
                                        </span>
                                        <ChevronRight
                                            size={16}
                                            className="shrink-0 text-icon-muted"
                                            aria-hidden
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <figure className="code-window">
                            <figcaption className="flex items-center gap-2 border-b border-code-line px-5 py-3.5 text-[13px] text-code-muted">
                                <span className="size-2 rounded-full bg-brand-accent" aria-hidden />
                                <span className="text-code-fg">payment.succeeded</span>
                                <span className="ml-auto font-mono text-xs">POST /webhooks</span>
                            </figcaption>
                            <pre
                                className="code-block"
                                role="region"
                                tabIndex={0}
                                aria-label={t.contract.payload}
                            >
                                <HighlightedCode code={EVENT_BODY} />
                            </pre>
                            <Link
                                to={href("/docs/spec/webhooks")}
                                className="flex items-center gap-1.5 border-t border-code-line px-5 py-3.5 text-[13px] text-code-fg hover:underline"
                            >
                                {t.contract.docs}
                                <ArrowRight size={12} aria-hidden />
                            </Link>
                        </figure>
                    </div>
                </section>

                <aside className="border-t border-border-soft" aria-labelledby="gateway-title">
                    <div className="landing-container flex flex-wrap items-baseline gap-x-16 gap-y-6 py-14">
                        <h2
                            id="gateway-title"
                            className="flex-[1_1_300px] text-[22px] font-semibold tracking-[-0.015em] text-balance"
                        >
                            {t.gateway.title}
                        </h2>
                        <div className="flex-[2_1_420px]">
                            <p className={muted}>{t.gateway.body}</p>
                            <Link
                                to={href("/docs/gateway")}
                                className="arrow-link mt-3 text-[15px]"
                            >
                                {t.gateway.link}
                                <ArrowRight size={14} aria-hidden />
                            </Link>
                        </div>
                    </div>
                </aside>

                <section id="demo" className="landing-section is-alt" aria-labelledby="demo-title">
                    <div className="landing-container">
                        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
                            <div className="min-w-0">
                                <Eyebrow>{t.demo.eyebrow}</Eyebrow>
                                <h2 id="demo-title" className="section-title mt-3">
                                    {t.demo.title}
                                </h2>
                                <p className={`mt-4 ${muted}`}>{t.demo.body}</p>
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <a href={DEMO_SHOP} className="landing-button is-primary">
                                        {t.demo.shop}
                                        <ArrowUpRight size={14} aria-hidden />
                                    </a>
                                    <a
                                        href={`${href("/docs/quickstart")}#1`}
                                        className="landing-button is-secondary"
                                    >
                                        {t.demo.all}
                                    </a>
                                </div>
                            </div>
                            <div className="min-w-0 overflow-hidden rounded-[14px] border border-fd-border bg-surface">
                                <div
                                    className={`flex items-center gap-2 border-b border-border-soft py-2.5 pr-3 pl-5 text-[13px] ${subtle}`}
                                >
                                    <span>{t.demo.requirements}</span>
                                    <CopyButton
                                        value={DEMO_COMMANDS.join("\n")}
                                        label={t.demo.copy}
                                        copied={t.demo.copied}
                                        error={t.demo.copyError}
                                    />
                                </div>
                                <pre
                                    className="overflow-x-auto px-5 py-6 font-mono text-sm/[2]"
                                    role="region"
                                    tabIndex={0}
                                    aria-label={t.demo.copy}
                                >
                                    <code>
                                        {DEMO_COMMANDS.map((command, index) => (
                                            <span key={command} className="block">
                                                <span
                                                    className="text-accent-text select-none"
                                                    aria-hidden
                                                >
                                                    {index === 0 ? "$ " : "  "}
                                                </span>
                                                {command}
                                            </span>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                            {t.demo.services.map((service, index) => {
                                const Icon = SERVICE_ICONS[index] ?? Landmark;
                                return (
                                    <li key={service.host}>
                                        <a
                                            href={`https://${service.host}`}
                                            className="card-link flex h-full flex-col gap-2.5 rounded-[14px] border border-fd-border bg-surface p-5"
                                        >
                                            <span className="flex items-center gap-2.5">
                                                <span className="flex size-8 items-center justify-center rounded-lg border border-border-soft bg-bg-alt text-fd-primary">
                                                    <Icon size={16} aria-hidden />
                                                </span>
                                                <span className="font-semibold">
                                                    {service.name}
                                                </span>
                                                <ArrowUpRight
                                                    size={13}
                                                    className="ml-auto text-icon-muted"
                                                    aria-hidden
                                                />
                                            </span>
                                            <span className={`text-sm/[1.5] ${muted}`}>
                                                {service.body}
                                            </span>
                                            <span className="mt-auto font-mono text-xs text-link">
                                                {service.host}
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                <section id="status" className="landing-section" aria-labelledby="status-title">
                    <div className="landing-container">
                        <div className="flex flex-wrap items-baseline gap-x-16 gap-y-4">
                            <h2 id="status-title" className="section-title flex-[1_1_300px]">
                                {t.status.title}
                            </h2>
                            <p className={`flex-[2_1_420px] ${muted}`}>
                                {t.status.body.before}
                                <a href={VALIDATOR_URL} className="font-medium text-link">
                                    {t.status.body.validator}
                                </a>
                                {t.status.body.middle}
                                <a href="#demo" className="font-medium text-link">
                                    {t.status.body.demo}
                                </a>
                                {t.status.body.after}
                            </p>
                        </div>
                        <ul className="mt-12 grid gap-4 md:grid-cols-3">
                            {t.status.phases.map((phase, index) => (
                                <li
                                    key={phase.title}
                                    className={
                                        index === 0
                                            ? "rounded-[14px] border border-accent-border bg-surface p-6"
                                            : index === 1
                                              ? "rounded-[14px] border border-fd-border bg-surface p-6"
                                              : "rounded-[14px] border border-dashed border-border-strong bg-bg-alt p-6"
                                    }
                                >
                                    <span
                                        className={`flex items-center gap-2 text-[13px] font-semibold ${
                                            index === 0
                                                ? "text-accent-text"
                                                : index === 1
                                                  ? "text-fd-primary"
                                                  : subtle
                                        }`}
                                    >
                                        <span
                                            aria-hidden
                                            className={`size-2 rounded-full ${
                                                index === 0
                                                    ? "bg-brand-accent"
                                                    : index === 1
                                                      ? "bg-fd-primary"
                                                      : "border-[1.5px] border-icon-muted"
                                            }`}
                                        />
                                        {phase.state}
                                    </span>
                                    <h3 className="mt-3.5 text-[17px] font-semibold">
                                        {phase.title}
                                    </h3>
                                    <p className={`mt-2 text-[15px]/[1.6] ${muted}`}>
                                        {phase.body}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <a href={`${href("/docs")}#phases`} className="arrow-link mt-8 text-[15px]">
                            {t.status.link}
                            <ArrowRight size={14} aria-hidden />
                        </a>
                    </div>
                </section>

                <section
                    id="sponsors"
                    className="landing-section is-alt"
                    aria-labelledby="sponsors-title"
                >
                    <div className="landing-container">
                        <div className="flex flex-wrap items-end gap-x-16 gap-y-6">
                            <div className="flex-[1_1_420px]">
                                <Eyebrow>{t.sponsors.eyebrow}</Eyebrow>
                                <h2
                                    id="sponsors-title"
                                    className="section-title mt-3 max-w-[640px]"
                                >
                                    {t.sponsors.title}
                                </h2>
                                <p className={`mt-4 max-w-[560px] ${muted}`}>{t.sponsors.body}</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <a href={SPONSOR_CONTACT} className="landing-button is-primary">
                                    <Heart size={16} className="text-brand-accent" aria-hidden />
                                    {t.sponsors.cta}
                                </a>
                                <a href={GITHUB_URL} className="landing-button is-secondary">
                                    {t.sponsors.contribute}
                                </a>
                            </div>
                        </div>
                        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <li>
                                <a
                                    href={KARAKO.url}
                                    aria-label={KARAKO.name}
                                    className="card-link flex h-28 items-center justify-center rounded-[14px] border border-fd-border bg-surface"
                                >
                                    <img
                                        src={KARAKO.logo}
                                        alt=""
                                        width={143}
                                        height={48}
                                        className="h-12 w-auto dark:hidden"
                                    />
                                    <img
                                        src={KARAKO.logoDark}
                                        alt=""
                                        width={143}
                                        height={48}
                                        className="hidden h-12 w-auto dark:block"
                                    />
                                </a>
                            </li>
                            {[1, 2, 3].map((slot) => (
                                <li key={slot}>
                                    <a
                                        href={SPONSOR_CONTACT}
                                        className={`card-link flex h-28 items-center justify-center rounded-[14px] border border-dashed border-border-strong bg-surface text-sm ${subtle}`}
                                    >
                                        {t.sponsors.placeholder}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
            <footer className="landing-footer border-t border-border-soft">
                <div className="landing-container pt-16 pb-8">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-12">
                        <div className="col-span-2 md:col-span-3 lg:col-span-1">
                            <Link to={href("/")} aria-label="OpenFSP" className="inline-flex">
                                <Brand />
                            </Link>
                            <p className={`mt-4 max-w-[300px] text-sm ${subtle}`}>
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
                                { label: t.footer.sponsor, url: "#sponsors" },
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
                        className={`mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-fd-border pt-6 text-[13px] ${subtle}`}
                    >
                        <a
                            href={KARAKO.url}
                            aria-label={`${t.footer.maintained} ${KARAKO.name}`}
                            className="flex items-center gap-3"
                        >
                            <span>{t.footer.maintained}</span>
                            <img
                                src={KARAKO.logo}
                                alt=""
                                width={101}
                                height={34}
                                className="h-[34px] w-auto dark:hidden"
                            />
                            <img
                                src={KARAKO.logoDark}
                                alt=""
                                width={101}
                                height={34}
                                className="hidden h-[34px] w-auto dark:block"
                            />
                        </a>
                        <div className="flex items-center gap-4">
                            <span>Apache-2.0</span>
                            <div className={`flex items-center gap-1 ${muted}`}>
                                <a
                                    href={GITHUB_URL}
                                    aria-label="GitHub"
                                    className="flex size-9 items-center justify-center rounded-lg"
                                >
                                    <GitHubIcon />
                                </a>
                                <a
                                    href={X_URL}
                                    aria-label="X"
                                    className="flex size-9 items-center justify-center rounded-lg"
                                >
                                    <XIcon />
                                </a>
                                <a
                                    href={LINKEDIN_URL}
                                    aria-label="LinkedIn"
                                    className="flex size-9 items-center justify-center rounded-lg"
                                >
                                    <LinkedInIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </HomeLayout>
    );
}
