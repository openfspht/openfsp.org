import { useState } from "react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface CodeTab {
  label: string;
  lang: string;
  code: string;
}

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <div role="tablist" className="flex gap-1 border-b border-fd-border px-3">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={`-mb-px border-b-2 px-2 py-2.5 text-sm font-medium transition-colors ${
              active === index ? "border-fd-primary text-fd-foreground" : "border-transparent text-fd-muted-foreground hover:text-fd-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="[&_figure]:my-0 [&_figure]:rounded-none [&_figure]:border-0 [&_figure]:bg-transparent [&_figure]:shadow-none">
        <DynamicCodeBlock lang={tabs[active].lang} code={tabs[active].code} />
      </div>
    </div>
  );
}
