---
name: openfsp.org
description: The public home of the OpenFSP interoperability standard, with a neutral interface and a standard-first documentation hierarchy.
colors:
  primary: "oklch(0.32 0.05 184.8)"
  primary-foreground: "oklch(0.958 0.011 88)"
  brand-accent: "oklch(0.765 0.14 72.9)"
  brand-accent-deep: "oklch(0.64 0.13 69)"
  background: "oklch(0.99 0.004 88)"
  foreground: "oklch(0.24 0.035 185)"
  card: "oklch(0.958 0.011 88)"
  muted: "oklch(0.958 0.011 88)"
  muted-foreground: "oklch(0.47 0.025 185)"
  border: "oklch(0.9 0.012 88)"
  ring: "oklch(0.64 0.13 69)"
  success: "oklch(0.5 0.13 150)"
  error: "oklch(0.52 0.2 27)"
  primary-dark: "oklch(0.72 0.09 184)"
  primary-foreground-dark: "oklch(0.17 0.02 190)"
  background-dark: "oklch(0.17 0.02 190)"
  foreground-dark: "oklch(0.94 0.011 88)"
  card-dark: "oklch(0.21 0.025 190)"
  muted-dark: "oklch(0.25 0.025 190)"
  muted-foreground-dark: "oklch(0.74 0.02 185)"
  border-dark: "oklch(0.958 0.011 88 / 12%)"
  ring-dark: "oklch(0.765 0.14 72.9)"
typography:
  display:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(42px, 5vw, 68px)"
    fontWeight: 640
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.55
  lead:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: '"tnum" 1'
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "4px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-tight: "80px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "color-mix(in oklab, {colors.primary} 86%, {colors.background})"
    textColor: "{colors.primary-foreground}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "42px"
  segmented-option:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  segmented-option-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "48px"
  form-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "20px"
  code-window:
    backgroundColor: "var(--code-bg)"
    textColor: "var(--code-fg)"
    rounded: "11px"
  landing-button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "7px"
    height: "46px"
---

# Design system: openfsp.org

## Direction

The site presents OpenFSP as an open interoperability standard between merchant applications and payment service providers. The standard and its native implementation by each provider lead the narrative. The gateway is the transitional implementation, with its own page.

Colors come from the brand (`art/BRAND.md`): Ink for text, links and the primary fill, Chalk for light grounds, deep ink for dark grounds, Accent amber used sparingly. Keep the original logo and its amber arc. Avoid decorative gradients, tinted grounds, eyebrow labels and repetitive feature cards.

## Palette

- The home and the documentation share the `--color-fd-*` tokens in `src/styles/app.css`, in light and dark: `background` for the page and the nav, `card` for panels, `border` for rules, `muted-foreground` for secondary text, `primary` for links and the accent line of the headline.
- Light neutrals are the Chalk family (hue 88), dark neutrals are deep ink (hue 190). No cool grays.
- Code panels are deep ink in both modes, from `--code-*` tokens on `.landing`, with a darker `--code-bg` and `--code-line` under `.dark`.
- Amber marks decoration only: the simulated and pending dots, the current phase rule, the last headline line (`brand-accent-deep` on light, at display size only; `brand-accent` on dark). Never amber body text on a light ground.
- The home primary button is a neutral `foreground` fill. The documentation `.btn-primary` uses `primary`.
- State: a written label always accompanies color. Pending mixes `brand-accent` into the background; paid uses `success`.

## Typography and layout

Inter Variable throughout. Monospace only for code, JSON, HTTP lines and commands. Body text is 15 to 17px, captions 13px, never smaller. Headline tracking stays at -0.03em or looser.

The home content width is 1184px with 40px side margins, 16px below 768px. Sections in order: a two-column hero (three-line headline, lead, simulated request and payment), the target architecture (application, OpenFSP contract, providers) with three steps, the HTTP contract with a webhook payload, a short gateway note linking to its page, the local quickstart, and the project status with phases 1 and 2. Layout lives in Tailwind utilities in `src/components/home.tsx`; `app.css` keeps only tokens, the code panel, buttons and states.

Grids collapse to one column on small screens. Code scrolls inside its own region; the page never overflows at 320px. The documentation keeps Fumadocs navigation, search, locale switching, table of contents and reading layout.

## Documentation hierarchy

1. Introduction to the standard.
2. Standard architecture: application-to-provider layer, native adoption, contract invariants, capabilities and conformance.
3. Normative specification and design decisions.
4. Reference information.
5. Implementations and tools: transition gateway, quickstart and attestation verifier.

The gateway page contains deployment, adapters and implementation details formerly on the architecture page. Preserve historical architecture URLs through explicit anchor compatibility, with a readable fallback link. Keep all numbered specification and adapter requirements stable. Where normative text names a gateway target, explain its scope rather than mechanically substituting a provider and changing obligations.

## Interaction

The home contract example is explicitly simulated. Choosing a provider updates the request body and resets the example; confirmation updates the displayed payment and event. It sends no payment request. The preview is an explanatory UI, not a screenshot of a deployed console.

There are no autoplay diagrams or carousels on the home page. Buttons provide brief press feedback only when reduced motion is not requested. Keyboard focus remains visible, copy failures have a readable fallback, and live status changes are announced. No interaction should depend on color alone.

## Evidence and language

Maintain French and English together. Native adoption is a goal; it must not be portrayed as achieved. Phase 1 is the current work. Proximity payments by short-lived token belong to an envisaged later phase, not the currently available contract.

Keep simulated, sandbox and production evidence distinct. Do not imply operator or regulator support, invent endorsements or show fabricated production screenshots. The demo illustrates the contract; it does not prove production readiness.
