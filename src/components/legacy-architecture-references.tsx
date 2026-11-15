import { useEffect } from "react";
import { architectureLegacyAnchors } from "@/lib/architecture-legacy-anchors";
import { localePath, type Locale } from "@/lib/i18n";

// Preserve external links to implementation rules formerly hosted on /docs/architecture.
export function LegacyArchitectureReferences({ locale }: { locale: Locale }) {
  const anchors: readonly string[] = architectureLegacyAnchors[locale];
  const path = localePath(locale, "/docs/gateway");
  useEffect(() => {
    const redirect = () => {
      let hash: string;
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (anchors.includes(hash)) window.location.replace(`${path}#${encodeURIComponent(hash)}`);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [anchors, path]);
  return (
    <div className="text-sm text-fd-muted-foreground">
      <div aria-hidden="true">
        {anchors.map((anchor) => (
          <span key={anchor} id={anchor} />
        ))}
      </div>
      <a href={path}>
        {locale === "fr"
          ? "Les anciens repères d’implémentation renvoient à la page de la passerelle."
          : "Historical implementation references now point to the gateway page."}
      </a>
    </div>
  );
}
