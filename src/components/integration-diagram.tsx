import { useState } from "react";

type Mode = "without" | "with";
type Point = { x: number; y: number };

export interface DiagramCopy {
  without: string;
  with: string;
  apps: [string, string, string];
  providers: [string, string, string];
  gateway: string;
  hosted: string;
  countWithout: string;
  countWith: string;
}

interface Geometry {
  viewBox: string;
  node: { width: number; height: number; font: number };
  apps: Point[];
  providers: Point[];
  gateway: Point;
  gatewaySize: { width: number; height: number };
  vertical: boolean;
}

const WIDE: Geometry = {
  viewBox: "0 0 720 300",
  node: { width: 132, height: 40, font: 13 },
  apps: [60, 150, 240].map((y) => ({ x: 84, y })),
  providers: [60, 150, 240].map((y) => ({ x: 636, y })),
  gateway: { x: 360, y: 150 },
  gatewaySize: { width: 148, height: 68 },
  vertical: false,
};

const TALL: Geometry = {
  viewBox: "0 0 340 420",
  node: { width: 104, height: 40, font: 11.5 },
  apps: [57, 170, 283].map((x) => ({ x, y: 40 })),
  providers: [57, 170, 283].map((x) => ({ x, y: 380 })),
  gateway: { x: 170, y: 210 },
  gatewaySize: { width: 176, height: 64 },
  vertical: true,
};

function curve(from: Point, to: Point, vertical: boolean) {
  if (vertical) {
    const mid = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${mid}, ${to.x} ${mid}, ${to.x} ${to.y}`;
  }
  const mid = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${mid} ${from.y}, ${mid} ${to.y}, ${to.x} ${to.y}`;
}

function edge(point: Point, g: Geometry, side: "out" | "in"): Point {
  const sign = side === "out" ? 1 : -1;
  return g.vertical ? { x: point.x, y: point.y + (sign * g.node.height) / 2 } : { x: point.x + (sign * g.node.width) / 2, y: point.y };
}

function gatewayEdge(g: Geometry, side: "in" | "out"): Point {
  const sign = side === "out" ? 1 : -1;
  return g.vertical
    ? { x: g.gateway.x, y: g.gateway.y + (sign * g.gatewaySize.height) / 2 }
    : { x: g.gateway.x + (sign * g.gatewaySize.width) / 2, y: g.gateway.y };
}

const fade = (visible: boolean) => ({ opacity: visible ? 1 : 0, transition: "opacity 420ms cubic-bezier(0.16, 1, 0.3, 1)" });

function Diagram({ g, mode, copy, className }: { g: Geometry; mode: Mode; copy: DiagramCopy; className: string }) {
  const { width, height, font } = g.node;
  const box = (p: Point, label: string) => (
    <g key={label}>
      <rect x={p.x - width / 2} y={p.y - height / 2} width={width} height={height} rx={8} className="fill-fd-card stroke-fd-border" strokeWidth={1} />
      <text x={p.x} y={p.y + font * 0.38} textAnchor="middle" fontSize={font} className="fill-fd-foreground font-medium">
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox={g.viewBox} className={className} aria-hidden>
      <g className="stroke-fd-muted-foreground/45" strokeWidth={1.25} fill="none" style={fade(mode === "without")}>
        {g.apps.flatMap((a) => g.providers.map((p) => <path key={`${a.x}-${a.y}-${p.x}-${p.y}`} d={curve(edge(a, g, "out"), edge(p, g, "in"), g.vertical)} />))}
      </g>
      <g fill="none" strokeWidth={1.75} style={fade(mode === "with")}>
        {g.apps.map((a) => (
          <path key={`${a.x}-${a.y}`} className="stroke-fd-primary" d={curve(edge(a, g, "out"), gatewayEdge(g, "in"), g.vertical)} />
        ))}
        {g.providers.map((p) => (
          <path key={`${p.x}-${p.y}`} className="stroke-amber-deep dark:stroke-amber" d={curve(gatewayEdge(g, "out"), edge(p, g, "in"), g.vertical)} />
        ))}
      </g>
      <g style={fade(mode === "with")}>
        <rect
          x={g.gateway.x - g.gatewaySize.width / 2}
          y={g.gateway.y - g.gatewaySize.height / 2}
          width={g.gatewaySize.width}
          height={g.gatewaySize.height}
          rx={12}
          className="fill-fd-primary"
        />
        <text x={g.gateway.x} y={g.gateway.y - 3} textAnchor="middle" fontSize={15} className="fill-fd-primary-foreground font-display font-bold">
          {copy.gateway}
        </text>
        <text x={g.gateway.x} y={g.gateway.y + 16} textAnchor="middle" fontSize={11.5} className="fill-fd-primary-foreground/80">
          {copy.hosted}
        </text>
      </g>
      {g.apps.map((p, i) => box(p, copy.apps[i]))}
      {g.providers.map((p, i) => box(p, copy.providers[i]))}
    </svg>
  );
}

export function IntegrationDiagram({ copy }: { copy: DiagramCopy }) {
  const [mode, setMode] = useState<Mode>("with");
  const count = mode === "with" ? copy.countWith : copy.countWithout;

  return (
    <figure className="rounded-2xl border border-fd-border bg-fd-card/60 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" className="inline-flex rounded-lg border border-fd-border bg-fd-background p-1 text-sm">
          {(["without", "with"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mode === value}
              onClick={() => setMode(value)}
              className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                mode === value ? "bg-fd-primary text-fd-primary-foreground" : "text-fd-muted-foreground hover:text-fd-foreground"
              }`}
            >
              {copy[value]}
            </button>
          ))}
        </div>
        <p className="font-mono text-sm text-fd-muted-foreground tabular-nums" aria-live="polite">
          {count}
        </p>
      </div>
      <Diagram g={WIDE} mode={mode} copy={copy} className="mt-4 hidden h-auto w-full sm:block" />
      <Diagram g={TALL} mode={mode} copy={copy} className="mt-4 block h-auto w-full sm:hidden" />
    </figure>
  );
}
