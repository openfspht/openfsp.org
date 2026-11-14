import { useEffect, useId, useState } from "react";

const TOKENS = ["background", "foreground", "card", "muted", "muted-foreground", "border", "primary", "primary-foreground"] as const;
type Palette = Record<(typeof TOKENS)[number], string>;

function toHex(color: string, context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function readPalette(): Palette {
  const context = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;
  const style = getComputedStyle(document.documentElement);
  return Object.fromEntries(TOKENS.map((token) => [token, toHex(style.getPropertyValue(`--color-fd-${token}`).trim(), context)])) as Palette;
}

function useThemeKey() {
  const [dark, setDark] = useState<boolean>();
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

let renderQueue: Promise<unknown> = Promise.resolve();

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const dark = useThemeKey();
  const [svg, setSvg] = useState<string>();

  useEffect(() => {
    if (dark === undefined) return;
    let cancelled = false;
    const p = readPalette();
    renderQueue = renderQueue
      .then(() => import("mermaid"))
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          fontFamily: "Inter Variable, ui-sans-serif, sans-serif",
          flowchart: { curve: "basis", padding: 12 },
          themeVariables: {
            darkMode: dark,
            background: p.background,
            fontSize: "14px",
            primaryColor: p.card,
            primaryTextColor: p.foreground,
            primaryBorderColor: p.border,
            secondaryColor: p.muted,
            tertiaryColor: p.background,
            lineColor: p["muted-foreground"],
            textColor: p.foreground,
            edgeLabelBackground: p.background,
            clusterBkg: p.background,
            clusterBorder: p["muted-foreground"],
            nodeBorder: p.border,
            mainBkg: p.card,
            actorBkg: p.card,
            actorBorder: p.border,
            actorTextColor: p.foreground,
            actorLineColor: p.border,
            signalColor: p.foreground,
            signalTextColor: p.foreground,
            labelBoxBkgColor: p.card,
            labelBoxBorderColor: p.border,
            labelTextColor: p.foreground,
            noteBkgColor: p.muted,
            noteBorderColor: p.border,
            noteTextColor: p.foreground,
            activationBkgColor: p.muted,
            activationBorderColor: p.border,
            sequenceNumberColor: p["primary-foreground"],
            stateBkg: p.card,
            stateBorder: p.border,
            transitionColor: p["muted-foreground"],
            transitionLabelColor: p.foreground,
            specialStateColor: p.primary,
            innerEndBackground: p.primary,
          },
        });
        const result = await mermaid.render(`mermaid-${id}-${dark ? "d" : "l"}`, chart);
        if (!cancelled) setSvg(result.svg);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [chart, id, dark]);

  return svg ? (
    <div className="not-prose my-6 flex justify-center overflow-x-auto [&_svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
  ) : (
    <div className="my-6 h-40 animate-pulse rounded-xl bg-fd-muted/50" aria-hidden />
  );
}
