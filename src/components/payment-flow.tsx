import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { FlowCopy } from "@/lib/home-copy";

const LANE_X = [45, 135, 225, 315];
const TOP = 34;
const ROW = 50;
const MESSAGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 3],
  [3, 2],
  [2, 1],
];
const SUCCEEDED_FROM = 4;
const STEP_MS = 2800;
const HEIGHT = TOP + ROW * MESSAGES.length + 46;

function Arrow({ index, active, done }: { index: number; active: boolean; done: boolean }) {
  const [from, to] = MESSAGES[index];
  const y = TOP + ROW * index + ROW / 2;
  const x1 = LANE_X[from];
  const x2 = LANE_X[to];
  const dir = Math.sign(x2 - x1);
  const tip = x2 - dir * 4;
  const tone = active ? "text-fd-primary" : done ? "text-fd-foreground/45" : "text-fd-foreground/15";
  const mid = (x1 + x2) / 2;

  return (
    <g className={`${tone} transition-colors duration-300`}>
      <line x1={x1} y1={y} x2={tip} y2={y} stroke="currentColor" strokeWidth={active ? 2 : 1.25} strokeDasharray={from === 0 && to === 3 ? "4 3" : undefined} />
      <path d={`M ${tip} ${y - 4} L ${tip + dir * 5} ${y} L ${tip} ${y + 4} Z`} fill="currentColor" />
      <circle cx={mid} cy={y} r={9} className={active ? "fill-fd-primary" : "fill-fd-background"} stroke="currentColor" strokeWidth={1.25} />
      <text x={mid} y={y + 3.5} textAnchor="middle" fontSize={10} fontWeight={600} className={active ? "fill-fd-primary-foreground" : "fill-current"}>
        {index + 1}
      </text>
    </g>
  );
}

export function PaymentFlow({ copy }: { copy: FlowCopy }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % MESSAGES.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  const select = (index: number) => {
    setPlaying(false);
    setStep(index);
  };
  const succeeded = step >= SUCCEEDED_FROM;
  const statusY = HEIGHT - 20;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div>
        <ol className="space-y-1">
          {copy.steps.map((item, index) => {
            const current = index === step;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => select(index)}
                  aria-current={current ? "step" : undefined}
                  className={`flex w-full gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${current ? "bg-fd-muted" : "hover:bg-fd-muted/60"}`}
                >
                  <span
                    className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold tabular-nums ${
                      current ? "bg-fd-primary text-fd-primary-foreground" : "text-fd-muted-foreground ring-1 ring-fd-border"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-medium ${current ? "text-fd-foreground" : "text-fd-muted-foreground"}`}>{item.title}</span>
                    {current && <span className="mt-1 block text-[0.9375rem] leading-relaxed text-fd-muted-foreground">{item.body}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="mt-4 ml-3 inline-flex items-center gap-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground"
        >
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          {playing ? copy.pause : copy.play}
        </button>
      </div>

      <figure className="mx-auto w-full max-w-[520px]">
        <div className="grid grid-cols-4 text-center text-xs font-semibold sm:text-sm">
          {copy.lanes.map((lane) => (
            <span key={lane} className="px-1">
              {lane}
            </span>
          ))}
        </div>
        <svg viewBox={`0 0 360 ${HEIGHT}`} className="mt-2 h-auto w-full" aria-hidden>
          {LANE_X.map((x) => (
            <line key={x} x1={x} y1={8} x2={x} y2={HEIGHT - 40} className="stroke-fd-border" strokeWidth={1} />
          ))}
          {MESSAGES.map((_, index) => (
            <Arrow key={index} index={index} active={index === step} done={index < step} />
          ))}
          <g className="transition-opacity duration-300" opacity={step === 0 ? 0 : 1}>
            <rect
              x={LANE_X[2] - 40}
              y={statusY - 12}
              width={80}
              height={22}
              rx={11}
              className={succeeded ? "fill-fd-primary" : "fill-fd-muted"}
              style={{ transition: "fill 300ms ease-out" }}
            />
            <text
              x={LANE_X[2]}
              y={statusY + 3}
              textAnchor="middle"
              fontSize={10.5}
              fontWeight={600}
              className={`${succeeded ? "fill-fd-primary-foreground" : "fill-fd-muted-foreground"}`}
            >
              {succeeded ? copy.succeeded : copy.pending}
            </text>
          </g>
        </svg>
      </figure>
    </div>
  );
}
