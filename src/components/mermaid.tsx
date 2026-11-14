import { useEffect, useId, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    const dark = document.documentElement.classList.contains("dark");
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: dark ? "dark" : "neutral", fontFamily: "Inter Variable, ui-sans-serif, sans-serif" });
      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return svg ? (
    <div className="not-prose my-6 flex justify-center overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <pre className="my-6 text-xs text-fd-muted-foreground">{chart}</pre>
  );
}
