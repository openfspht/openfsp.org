import { useEffect, useId, useRef, useState } from "react";
import { useParams } from "@tanstack/react-router";

const TOKENS = [
  "background",
  "foreground",
  "card",
  "muted",
  "muted-foreground",
  "border",
  "primary",
  "primary-foreground",
] as const;
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
  return Object.fromEntries(
    TOKENS.map((token) => [
      token,
      toHex(style.getPropertyValue(`--color-fd-${token}`).trim(), context),
    ]),
  ) as Palette;
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
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const { lang } = useParams({ strict: false }) as { lang?: string };
  const fr = lang === "fr";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dark === undefined || !visible) return;
    setFailed(false);
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
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [chart, id, dark, visible]);

  return (
    <div ref={container} className="my-6 min-h-40">
      {failed ? (
        <p role="status">
          {fr
            ? "Le schéma n’a pas pu être affiché. Sa source est disponible ci-dessous."
            : "The diagram could not be displayed. Its source is available below."}
        </p>
      ) : svg ? (
        <div
          className="not-prose flex justify-center overflow-x-auto [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="h-40 motion-safe:animate-pulse rounded-xl bg-fd-muted/50" aria-hidden />
      )}
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-fd-muted-foreground">
          {fr ? "Source textuelle du schéma" : "Diagram text source"}
        </summary>
        <pre className="overflow-x-auto whitespace-pre-wrap">{chart}</pre>
      </details>
    </div>
  );
}
