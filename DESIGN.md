---
name: openfsp.org
description: The public home of the OpenFSP payment standard, a quiet documentation site in neutral grounds with a teal voice.
colors:
  primary: "oklch(0.32 0.05 184.8)"
  primary-foreground: "oklch(0.979 0.021 166.113)"
  brand-accent: "oklch(0.765 0.14 72.9)"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.147 0.004 49.25)"
  card: "oklch(0.985 0.001 106.423)"
  muted: "oklch(0.97 0.001 106.424)"
  muted-foreground: "oklch(0.553 0.013 58.071)"
  border: "oklch(0.923 0.003 48.717)"
  ring: "oklch(0.709 0.01 56.259)"
  success: "oklch(72.3% 0.219 149.579)"
  error: "oklch(63.7% 0.237 25.331)"
  primary-dark: "oklch(0.72 0.09 184)"
  primary-foreground-dark: "oklch(0.147 0.004 49.25)"
  background-dark: "oklch(0.147 0.004 49.25)"
  foreground-dark: "oklch(0.9 0.006 95)"
  card-dark: "oklch(0.216 0.006 56.043)"
  muted-dark: "oklch(0.268 0.007 34.298)"
  muted-foreground-dark: "oklch(0.709 0.01 56.259)"
  border-dark: "oklch(1 0 0 / 10%)"
  ring-dark: "oklch(0.553 0.013 58.071)"
typography:
  display:
    fontFamily: "Inter Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.04
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
  diagram-node:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "40px"
  diagram-gateway:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    height: "68px"
---

# Design System: openfsp.org

## Overview

**Creative North Star: "The Open Ledger"**

openfsp.org reads like a well-kept reference: white or near-black grounds, one deep teal voice, Inter throughout, and hairline borders doing the structural work. It sits on Fumadocs UI and keeps its chrome (navigation, sidebar, search, code blocks, table of contents) close to defaults; the identity lives in the palette, a single interactive diagram, and the way rule anchors light up. The reference point is a calm developer documentation site in the spirit of coolify.io: simple, clean, legible at a glance, with one interesting moving part rather than many decorative ones.

The palette and type are copied from the console design system in the stack (`stack/frontend/packages/ui/src/styles/globals.css`), so the site and the console read as one family. This diverges from the older brand sheet, which named Space Grotesk and a chalk and ink palette; the build and the standing preference of 2026-11-14 win. The brand survives in the ring mark itself (ink and amber in light mode, chalk and amber in dark mode) and in the amber accent, which appears as a stroke, never as text.

Density is moderate: generous section spacing on the home page, Fumadocs reading density in the docs. Surfaces are flat; depth comes from a slightly tinted card ground and a 1px border, never from shadows.

**Key Characteristics:**

- Neutral grounds in both modes, a teal primary for action and emphasis, amber reserved for one diagram role.
- Inter Variable for every role, bold and tightly tracked for headings, mono only for identifiers, rule numbers and counts.
- Hairline borders and tonal cards instead of shadows.
- Fumadocs UI chrome left largely at its defaults.
- Rule anchors highlight with a soft primary tint when targeted.

## Colors

A restrained neutral system with one committed teal and one amber stroke color.

### Primary

- **Deep Harbour Teal** (primary, light mode): primary buttons, the selected option of the diagram toggle, the gateway node, the app-to-gateway edges of the diagram, rule number hover, and the tint behind a targeted rule. Paired with a pale mint foreground for text on it.
- **Lit Teal** (primary-dark): the same roles in dark mode, lifted in lightness so it reads on the dark ground; text on it switches to the dark ground color.

### Secondary

- **Ring Amber** (brand-accent): the gateway-to-provider edges of the integration diagram, and the arc in the logo mark. It is a stroke color only.

### Neutral

- **Paper White** (background): the page ground in light mode, also the inset ground of fields and the toggle track.
- **Stone Ink** (foreground): body text and headings in light mode; doubles as the dark mode ground.
- **Card Mist** (card): one step off white for panels, the diagram figure, the API band (at 50%) and diagram nodes.
- **Muted Wash** (muted): Fumadocs hover and inline code grounds.
- **Slate Note** (muted-foreground): secondary text, captions, lead paragraphs, footer links at rest, the 404 code.
- **Hairline** (border): every divider and container edge.
- **Focus Stone** (ring): the 2px focus ring on fields and the file picker.
- **Night Stone** (background-dark), **Night Card** (card-dark), **Night Wash** (muted-dark), **Night Hairline** (border-dark, white at 10%), **Moon Text** (foreground-dark), **Night Note** (muted-foreground-dark): the dark mode set. The sidebar repeats the muted, secondary and muted-foreground overrides so Fumadocs' own sidebar never falls back to its gray defaults.

### Status

- **Signal Green** (success) and **Signal Red** (error): Fumadocs defaults, used for the verifier's valid and invalid verdicts and the error alert (red at 40% for the border, 10% for the ground). The verdict word always carries the meaning; color only reinforces it.

### Named Rules

**The Neutral Ground Rule.** Grounds are neutral in both modes: white and stone in light, near-black stone in dark. No earth, brown, olive or green grounds in dark mode; hue belongs to the primary and the accent, never to a surface.

**The Amber Stroke Rule.** Ring Amber is a line or an arc, never text, never a fill behind text, never the only carrier of meaning. It fails contrast on light grounds.

**The One Voice Rule.** Teal is the only color that signals action or emphasis. Secondary actions are outlined neutrals, not a second hue.

## Typography

**Display Font:** Inter Variable (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Inter Variable
**Label/Mono Font:** the Tailwind default monospace stack (ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas)

**Character:** One family, differentiated by weight and tracking. Headings are bold and pulled tight; body text is plain and roomy; mono marks anything a reader might copy or cite.

### Hierarchy

- **Display** (700, fluid 2.5rem to 4.25rem, line-height 1.04, -0.03em): the home page title only, balanced, held to about 48rem wide.
- **Headline** (700, 1.875rem, -0.02em): home section titles and the 404 title. Docs headings and page titles take -0.02em tracking over Fumadocs' prose sizes.
- **Title** (700, 1.125rem): item names in the parts grid.
- **Lead** (400, 1.125rem rising to 1.25rem from 640px, line-height 1.625): the paragraph under the display title, in muted color, about 42rem wide.
- **Body** (400, 1rem, 1.5): paragraphs and captions; Fumadocs prose in the docs. Captions and section bodies keep to 28rem to 42rem.
- **Label** (600, 0.9375rem): button text. Form labels use 500 at 0.875rem.
- **Mono** (400, 0.8125rem to 0.875rem, tabular figures): rule references beside API points, the diagram count, the 404 code, verifier values and inputs. Code blocks follow Fumadocs.

### Named Rules

**The One Family Rule.** Inter carries every role. Hierarchy comes from weight (400, 500, 600, 700), size and negative tracking on headings, not from a second display face.

**The Mono Means Citable Rule.** Monospace is for things a reader copies or cites: rule numbers, URLs, keys, counts, codes. Never for decoration or section labels.

## Layout

A single centered column capped at 72rem with 16px side padding. Home sections stack vertically with 80px to 96px of vertical space; the first section opens at 80px (112px from 640px). The API section is a full-bleed band (card ground at 50%, hairline top and bottom) holding a 5:7 two-column grid from 1024px, text left and two code blocks right. The parts list is a two-column grid from 640px with hairline row dividers and a vertical divider between columns, not cards. The demo section is one rounded panel with a two-column grid from 1024px.

The integration diagram swaps geometry at 640px: a wide left-to-right graph (720 by 300) above, a tall top-to-bottom graph (340 by 420) below, with smaller node labels.

Docs pages use the Fumadocs docs layout unchanged: top nav, left sidebar, content, table of contents. The 404 page is a narrow 36rem column, left aligned and vertically centered.

Breakpoints are Tailwind's: 640px and 1024px are the ones in use.

## Elevation & Depth

Flat. Custom surfaces carry no shadow; depth is a tonal step (card over background) plus a 1px hairline. The one box-shadow in the system is the targeted-rule halo: a 6px spread of the same primary tint as the row ground, no blur, which reads as padding around the highlight rather than lift. Fumadocs' own overlays (search dialog, popovers) keep their default shadows.

### Named Rules

**The Hairline Rule.** Separate with a 1px border or a tonal card, never with a shadow.

## Shapes

Gently rounded throughout, scaled to the container: 6px for small inner pieces (toggle options, the rule anchor highlight), 8px for buttons, fields, the toggle track and diagram nodes, 12px for form and result cards and the gateway node, 16px for the large diagram figure and the demo panel. Diagram edges are smooth cubic curves, 1.25px for the tangle and 1.75px for the routed lines. The logo is a ring with three gaps; nothing else on the site imitates it.

## Components

Quiet, precise, and few. Every custom component is built from the same border, card and primary tokens as the Fumadocs chrome around it.

### Buttons

- **Shape:** gently rounded (8px), 42px tall, 18px side padding, 8px gap to an optional 16px trailing arrow.
- **Primary:** teal ground, teal border, pale foreground, 600 weight at 0.9375rem.
- **Hover:** primary mixes 14% toward the background and drops its border; the outline button's border darkens to the foreground color. Transitions are 140ms ease-out on background and border.
- **Outline:** transparent ground, hairline border, foreground text. Also used, compact (36px, 12px padding), as the verifier's file picker, which takes the focus ring from its hidden input.
- **Disabled:** 60% opacity, not-allowed cursor.

### Segmented Toggle

- **Style:** a radio group in an 8px rounded track with background ground, hairline border and 4px inner padding; options are 6px rounded, 0.875rem at 500.
- **State:** the selected option fills with teal and pale text; others are muted text that darkens to foreground on hover, with a color transition.

### Cards / Containers

- **Corner Style:** 16px for the diagram figure and demo panel, 12px for verifier form and result cards.
- **Background:** card ground (60% for the diagram figure, 50% for the API band); result cards stay on the page ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline.
- **Internal Padding:** 16px rising to 24px on the diagram figure, 20px on verifier cards, 48px by 24px rising to 48px on all sides on the demo panel.

### Inputs / Fields

- **Style:** full width, 8px rounded, hairline border, page ground, 8px by 12px padding, 0.875rem text; mono for the JWS textarea (0.75rem) and the URL field.
- **Focus:** no outline, a 2px ring in the focus stone color.
- **Error:** an alert block below the form, 8px rounded, red at 40% border and 10% ground, plain foreground text.

### Navigation

- **Style:** Fumadocs top nav with the 22px ring mark (light and inverse versions swapped by mode), the wordmark "OpenFSP" at 700 and 1.05rem with tight tracking, three text links (Docs, Specification, Conformance), the locale switcher and the GitHub link. Fumadocs handles states and the mobile menu.
- **Footer (home):** hairline top border, 0.875rem muted text, links that darken to foreground on hover.

### Integration Diagram (signature)

The one interactive figure. A two-option toggle switches between "without" (nine thin muted curves from every app to every provider) and "with" (a solid teal gateway node in the middle, teal curves from apps in, amber curves out to providers). Nodes are card-ground rectangles with a hairline stroke and 500 weight labels; the gateway carries a 700 name and an 80% opacity caption. Layers cross-fade on opacity over 420ms with an expo-out curve (cubic-bezier(0.16, 1, 0.3, 1)), and a mono count beside the toggle updates politely for screen readers. The SVG itself is hidden from assistive technology; the caption below carries the idea in text.

### Rule Anchors

Every numbered rule paragraph and every problem catalogue row is an anchor. Rule numbers are undecorated links with tabular figures that turn teal on hover. When targeted, the paragraph or row takes a soft primary tint (14% primary mixed into transparent) with a matching 6px halo and 6px corners, and scrolls to sit 24px below the nav.

### Parts List

A two-column list of linked items separated by hairlines. Each title gains a 16px arrow on hover that slides in 4px and fades from 0 to full opacity over 200ms ease-out.

## Do's and Don'ts

### Do:

- **Do** take every color from the tokens above; extend the system by copying from the console design system, not by inventing hues.
- **Do** keep teal as the single action color: one primary button per group, outlined neutrals for the rest.
- **Do** separate surfaces with a 1px hairline and a card ground step.
- **Do** highlight a targeted rule or problem row with the 14% primary tint and its 6px halo, nothing stronger.
- **Do** set anything citable (rule numbers, URLs, keys, codes, counts) in mono with tabular figures.
- **Do** leave Fumadocs chrome at its defaults unless a token override is needed to keep it on the neutral palette.

### Don't:

- **Don't** use earth, brown, olive or green grounds in dark mode, or tint any surface with the primary or the accent.
- **Don't** use Ring Amber for text, for a fill behind text, or as the only signal of a state.
- **Don't** add shadows to custom surfaces.
- **Don't** introduce a second typeface for headings; Space Grotesk belongs to the retired system.
- **Don't** use the Haitian flag colors anywhere.
- **Don't** write an em dash or a typographic minus in any copy, label or generated text; use a comma, colon, parentheses or a plain hyphen.
