import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { LinkedInIcon, XIcon } from "@/components/social-icons";
import { localePath, type Locale } from "@/lib/i18n";

export const GITHUB_URL = "https://github.com/openfspht";
export const CODE_REPO = "https://github.com/openfspht/openfsp";
export const X_URL = "https://x.com/openfsp";
export const LINKEDIN_URL = "https://www.linkedin.com/company/openfsp";

export const socialLinks: LinkItemType[] = [
    { type: "icon", label: "X", text: "X", icon: <XIcon />, url: X_URL, external: true },
    {
        type: "icon",
        label: "LinkedIn",
        text: "LinkedIn",
        icon: <LinkedInIcon />,
        url: LINKEDIN_URL,
        external: true,
    },
];

const labels = {
    en: { docs: "Docs", spec: "Specification", conformance: "Conformance" },
    fr: { docs: "Docs", spec: "Spécification", conformance: "Conformité" },
} as const;

export function baseOptions(locale: Locale): BaseLayoutProps {
    const t = labels[locale];
    return {
        i18n: true,
        githubUrl: GITHUB_URL,
        nav: {
            title: (
                <>
                    <img
                        src="/openfsp-mark.svg"
                        alt=""
                        width={22}
                        height={22}
                        className="dark:hidden"
                    />
                    <img
                        src="/openfsp-mark-inverse.svg"
                        alt=""
                        width={22}
                        height={22}
                        className="hidden dark:block"
                    />
                    <span className="text-[1.05rem] font-bold tracking-tight text-fd-primary dark:text-fd-foreground">
                        OpenFSP
                    </span>
                </>
            ),
            url: localePath(locale, "/"),
        },
        links: [
            { text: t.docs, url: localePath(locale, "/docs"), active: "nested-url" },
            { text: t.spec, url: localePath(locale, "/docs/spec"), active: "nested-url" },
            {
                text: t.conformance,
                url: localePath(locale, "/docs/spec/conformance"),
                active: "none",
            },
            ...socialLinks,
        ],
    };
}
