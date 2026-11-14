import { createRootRoute, HeadContent, Outlet, Scripts, useParams } from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import { i18nProvider } from "fumadocs-ui/i18n";
import type { ReactNode } from "react";
import appCss from "@/styles/app.css?url";
import { asLocale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OpenFSP" },
      { name: "description", content: "An open standard and a self-hosted gateway for mobile money payments in Haiti." },
      { property: "og:site_name", content: "OpenFSP" },
      { property: "og:image", content: "https://openfsp.org/og.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }: { children: ReactNode }) {
  const { lang } = useParams({ strict: false }) as { lang?: string };
  const locale = asLocale(lang);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider i18n={i18nProvider(translations, locale)} search={{ options: { type: "static", api: "/api/search" } }}>
          {children}
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
