import { useState } from "react";
import type { ArchitectureCopy } from "@/lib/home-copy";

function Marker({ n, active }: { n: number; active: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-200 ${
        active
          ? "bg-fd-foreground text-fd-background shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-fd-foreground)_15%,transparent)]"
          : "bg-fd-background text-fd-foreground ring-1 ring-fd-border"
      }`}
    >
      {n}
    </span>
  );
}

function Node({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-fd-border bg-fd-background px-3 py-2.5 text-center text-sm font-medium ${className}`}>{children}</div>;
}

function Wire({ label, marker, active, accent }: { label: string; marker?: number; active: number | null; accent?: boolean }) {
  const line = accent ? "bg-brand-accent" : "bg-fd-primary";
  return (
    <div className="relative flex items-center justify-center py-2 lg:px-2 lg:py-0">
      <div className={`h-12 w-px lg:h-px lg:w-full ${line}`} />
      <div className="absolute flex items-center gap-2 lg:-top-1 lg:-translate-y-full">
        {marker !== undefined && <Marker n={marker} active={active === marker} />}
        <span className="bg-fd-background px-1 text-xs whitespace-nowrap text-fd-muted-foreground lg:bg-transparent">{label}</span>
      </div>
    </div>
  );
}

export function Architecture({ copy }: { copy: ArchitectureCopy }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="grid items-center lg:grid-cols-[minmax(0,0.9fr)_minmax(7rem,0.5fr)_minmax(0,1.6fr)_minmax(7rem,0.5fr)_minmax(0,0.9fr)]">
        <div className="space-y-2">
          <p className="mb-3 text-center text-sm text-fd-muted-foreground lg:text-left">{copy.apps.title}</p>
          {copy.apps.items.map((item) => (
            <Node key={item}>{item}</Node>
          ))}
        </div>

        <Wire label={copy.protocol} marker={1} active={active} />

        <div className="rounded-2xl border border-dashed border-fd-foreground/30 p-3 sm:p-4">
          <p className="mb-3 px-1 text-sm font-semibold">{copy.servers}</p>
          <div className="rounded-xl bg-fd-primary p-4 text-fd-primary-foreground">
            <p className="text-lg font-bold tracking-tight">{copy.gateway}</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-fd-primary-foreground/10 px-3 py-2 text-sm">
              <Marker n={2} active={active === 2} />
              {copy.store}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {copy.adapters.map((adapter, index) => (
                <div key={adapter} className="flex items-center gap-2 rounded-lg border border-fd-primary-foreground/25 px-3 py-2 text-sm">
                  {index === 0 && <Marker n={3} active={active === 3} />}
                  {adapter}
                </div>
              ))}
            </div>
          </div>
          <Node className="mt-3">{copy.console}</Node>
        </div>

        <Wire label={copy.providerApis} marker={4} active={active} accent />

        <div className="space-y-2">
          <p className="mb-3 text-center text-sm text-fd-muted-foreground lg:text-left">{copy.providers.title}</p>
          {copy.providers.items.map((item) => (
            <Node key={item}>{item}</Node>
          ))}
          <Node className="border-dashed">
            {copy.providers.native}
            <span className="block text-xs font-normal text-fd-muted-foreground">{copy.providers.nativeNote}</span>
          </Node>
        </div>
      </div>

      <ol className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {copy.guarantees.map((item, index) => (
          <li key={item.title} onMouseEnter={() => setActive(index + 1)} onMouseLeave={() => setActive(null)} className="flex gap-3">
            <Marker n={index + 1} active={active === index + 1} />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fd-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
