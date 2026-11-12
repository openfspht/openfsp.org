---
name: openfsp.org
description: The public site of the OpenFSP open payment standard, read like a protocol reference.
colors:
  ink: "#0b3b36"
  accent: "#e8a33d"
  accent-deep: "#c07e1b"
  chalk: "#f5f2ea"
  surface: "#fffdf8"
  surface-sunken: "#ece7db"
  text-muted: "#46605b"
  rule: "#d6cfbf"
  rule-strong: "#b9b09c"
  link-underline: "#8fa5a0"
  selection: "#f1d6a8"
  pass: "#1d6b3a"
  fail: "#a32f1f"
  ink-night: "#08211e"
  surface-night: "#0d2c28"
  surface-sunken-night: "#061a18"
  text-muted-night: "#b3c3bf"
  rule-night: "#1f423d"
  rule-strong-night: "#2f5a54"
  link-underline-night: "#5f8580"
  selection-night: "#5a4320"
  pass-night: "#6fc48b"
  fail-night: "#ff8a75"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.35
  mono:
    fontFamily: "ui-monospace, SF Mono, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  inline: "2px"
  code: "4px"
  control: "6px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  header: "64px"
  measure: "72ch"
  page: "1320px"
  section: "64px"
  column-gap: "56px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  nav-link:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.control}"
    padding: "8px 10px"
  nav-link-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  tool-button:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.control}"
    height: "40px"
    width: "40px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  notice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  code-block:
    backgroundColor: "{colors.surface}"
    typography: "{typography.mono}"
    rounded: "{rounded.control}"
    padding: "16px 18px"
---

# Design System: openfsp.org

## Overview

**Creative North Star: "The Protocol Reference"**

The site reads like the category standard for an open protocol: a reference you consult, not a brochure you scroll. Chalk ground and ink text by day, deep ink ground and chalk text by night. Every surface is built from the same few materials: a thin rule, a flat panel one step lighter than the ground, and type. The proof is the content itself: real HTTP exchanges, real rule numbers, real conformance results, set in mono and keyed to the spec.

Density is that of good documentation. Pages carry a 1320px frame, prose holds a 72ch measure, and the spec reader uses a three-column grid (sidebar, prose, on-page table of contents) that follows the reading position. Hierarchy comes from Space Grotesk headings at weight 700 against neutral system body text, not from color or ornament. The brand accent appears only as a marker: the current item, the focused element, a targeted rule.

The build refuses the decorative hero, the stat strip and rows of icon cards. Status appears as one plain line of facts separated by thin vertical rules.

**Key Characteristics:**
- Two grounds only: chalk (light) and deep ink (dark), both following the system preference with a manual override.
- Ink carries primary actions; amber marks only state.
- Thin 1px rules for all structure; no shadows on content.
- One corner radius for controls and panels (6px).
- Space Grotesk headings, system sans body, system mono for code, rule numbers and counts.

## Colors

A two-ground, nearly monochrome teal-ink palette with a single amber marker, taken from the OpenFSP mark.

### Primary
- **Harbor Ink** (`ink`): text in light mode, the primary button fill, the hub of the integration diagram, and the logo. In dark mode the same role flips: chalk becomes text and primary fill.

### Secondary
- **Signal Amber Deep** (`accent-deep`): the light-mode marker. Current nav item underline, active table of contents bar, focus ring, targeted rule tint, link hover underline, the copied state of a rule link. Passes 3:1 on chalk.
- **Signal Amber** (`accent`): the dark-mode marker in the same roles. It fails contrast on light grounds, so it never appears there as a marker.

### Neutral
- **Chalk** (`chalk`): the light ground, and text and primary-button label in dark mode.
- **Paper White** (`surface`): panels, code blocks, inputs and notices that sit one step above the ground.
- **Sunken Chalk** (`surface-sunken`): hover fill for nav and sidebar links, inline code background, current sidebar page.
- **Muted Ink** (`text-muted`): secondary text, labels, metadata, unselected nav.
- **Hairline** (`rule`) and **Strong Hairline** (`rule-strong`): every divider, panel border, table row; the strong step for control borders, table headers and diagram strokes.
- **Faded Ink** (`link-underline`): the resting underline of every link.
- **Night ground set** (`ink-night`, `surface-night`, `surface-sunken-night`, `text-muted-night`, `rule-night`, `rule-strong-night`, `link-underline-night`, `selection-night`): the dark-mode equivalents, applied by role, never mixed with the light set.

### Semantic
- **Pass Green** (`pass`, `pass-night`) and **Fail Red** (`fail`, `fail-night`): conformance verdicts and form errors only, always paired with the word, never color alone.

### Named Rules
**The One Marker Rule.** Amber marks state (current, focused, targeted, copied) and nothing else. It never fills a button, a panel or a heading.

**The Never Alone Rule.** Accent amber fails contrast on light grounds, so no meaning rests on it alone; on chalk the marker is always accent deep.

**The Two Grounds Rule.** Color tokens are defined by role and swap whole between light and dark; a component references the role, never a mode-specific value.

## Typography

**Display Font:** Space Grotesk (with ui-sans-serif, system-ui)
**Body Font:** system sans (ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica Neue, Arial)
**Label/Mono Font:** system mono (ui-monospace, SF Mono, Menlo, Consolas)

**Character:** A geometric grotesque from the brand mark gives headings their voice; the body stays in the reader's own system face so long spec pages read as documentation. Mono carries anything an engineer might copy: code, rule numbers, problem types, counts.

### Hierarchy
- **Display** (700, clamp(2rem, 1.3rem + 2vw, 3rem), 1.1, -0.025em, max 22ch): the home headline only.
- **Headline** (700, clamp(2rem, 1.4rem + 2vw, 2.75rem) on page heads, clamp(1.875rem, 1.4rem + 1.6vw, 2.5rem) on spec documents, 1.2, -0.015em): one per page.
- **Title** (700, 1.125rem to 1.625rem, 1.2): section headings; 1.5rem for spec h2, 1.1875rem for h3, 1.625rem on home sections.
- **Body** (400, 1rem, 1.6, 72ch measure): all running text; 1.0625rem for home section prose.
- **Lead** (400, 1.125rem, muted, 62ch): the one or two sentences under a page headline.
- **Label** (600, 0.75rem to 0.8125rem, sentence case): table headers, sidebar group names, pane labels, figure captions.
- **Mono** (0.8125rem in blocks, 0.875em inline, tabular numbers): code, rule numbers, counts, form inputs for keys and URLs.

### Named Rules
**The Copyable Is Mono Rule.** Anything a developer would paste (a header, a path, a rule number, a problem type) is set in mono.

**The Sentence Case Rule.** Labels are sentence case at normal tracking; no uppercase, no letter-spaced small text.

## Layout

A 1320px page frame with a fluid gutter (clamp(16px, 4vw, 40px)) and a sticky 64px top bar. Home sections use a two-column split on a 12-part logic (7fr text with 5fr exchange in the hero, 5fr text with 7fr diagram below) at a 56px gap, collapsing to one column at 960px. Home sections are separated by a 1px rule inset to the gutter and padded 64px top and bottom.

The spec reader is a three-column grid (240px sidebar, fluid prose, 220px table of contents, 48px gap). At 1180px the table of contents drops; at 860px the sidebar becomes a bordered collapsible block above the prose. Both rails are sticky below the header. Inner pages open with a page head (56px top, 32px bottom, rule under it, 40px after). The primary nav collapses to a menu toggle at 1060px.

Tables carry structure: rows divided by hairlines, no zebra fill, tabular numbers. On narrow screens, wide tables either scroll inside a wrapper or restack into labeled rows.

## Elevation & Depth

Flat. Depth comes only from tonal steps (ground, then surface one step lighter, then sunken one step darker for hover) and 1px rules. Nothing casts a shadow. The only box-shadow values in the build are drawing devices, not elevation: an inset 2px underline marking the current nav item, and a horizontal tint extension on a targeted rule.

### Named Rules
**The Hairline Rule.** Separation is a 1px rule in `rule` or `rule-strong`. If a surface seems to need a shadow, it needs a border.

## Shapes

One radius for everything interactive or contained: 6px on buttons, nav links, tool buttons, inputs, code blocks, notices and the exchange panel. Inline code takes 4px; the focus ring and a targeted rule take 2px. Panels inside panels drop their own border and radius (the code panes in the home exchange). The current nav item squares its bottom corners to sit on its underline. Rectangles throughout; no pills, no circles except the logo.

## Components

### Buttons
Quiet and solid; ink does the work.
- **Shape:** gently rounded (6px), 44px minimum height, 18px side padding, 600 weight at 0.9375rem.
- **Primary:** ink fill, chalk label (inverted in dark mode). Hover mixes the fill 14% toward the ground.
- **Secondary:** transparent with a strong-hairline border and ink label; hover darkens the border to the text color.
- **Compact:** 36px height and 0.875rem text where a button sits inline with a field (file chooser).
- **Disabled:** 50% opacity.

### Navigation
- **Top bar:** sticky, ground-colored, hairline below. Logo, five to six section links (0.9375rem, 500, muted), then the locale switch, theme toggle and GitHub as 40px tool buttons.
- **States:** hover fills sunken and turns text to ink; current page turns text to ink with a 2px amber underline.
- **Mobile:** below 1060px the links move into a disclosure list under the bar, 12px row padding.

### Spec sidebar and table of contents
- **Sidebar:** muted links at 0.875rem, grouped under 600-weight labels; current page is ink, 600 weight, on sunken fill.
- **Table of contents:** a 2px left bar per link, transparent at rest, amber on the section in view; level-three entries indent to 24px at 0.8125rem.

### Inputs / Fields
- **Style:** paper-white fill, strong-hairline border, 6px radius, 10px by 12px padding, mono 0.8125rem.
- **Focus:** the global 2px amber outline at 2px offset.
- **Error:** fail-red text under the field, 0.9375rem.

### Notices
A paper-white box with a hairline border, 6px radius, 10px by 14px padding, 0.875rem muted text. Used for draft status and informative caveats.

### Code blocks
Paper-white, hairline border, 6px radius, 16px by 18px padding, mono 0.8125rem at 1.55. Syntax colors come from the GitHub light and dark highlighting themes, switched with the ground.

### Annotated exchange (signature)
A bordered panel captioned in label type, holding a request pane and a response pane split by hairlines, then a key list pairing each field (inline code) with the rule that governs it (mono deep link, right-aligned). It is the home page's proof and the pattern for showing any real exchange.

### Numbered rule with deep link (signature)
Each numbered rule leads with its number in mono 600. On hover or focus a 26px copy-link button appears in the left margin; copying turns it amber. Arriving at a rule tints it 12% amber, extended 12px on each side. The button hides below 860px.

### Status line
One line of plain facts in 0.875rem muted text with tabular numbers, separated by 1px strong-hairline dividers; it stacks without dividers below 640px.

## Do's and Don'ts

### Do:
- **Do** reserve amber for state: current nav (2px underline), active table of contents bar, focus outline (2px, 2px offset), targeted rule, copied link.
- **Do** use accent deep as the marker on chalk and accent on deep ink.
- **Do** separate everything with 1px hairlines and step surfaces tonally (ground, surface, sunken).
- **Do** keep every control and panel at the 6px radius.
- **Do** set code, rule numbers, paths and counts in system mono with tabular numbers.
- **Do** show real exchanges and real rule references as the proof on a page.
- **Do** keep running text within 72ch and leads within 62ch.

### Don't:
- **Don't** add shadows to content, panels or buttons.
- **Don't** use amber as a fill, a heading color or the only carrier of meaning.
- **Don't** build a decorative hero, a stat strip, or rows of icon cards.
- **Don't** put uppercase tracked labels or eyebrows above headings.
- **Don't** set body text in Space Grotesk; it is for headings and the wordmark.
- **Don't** recolor the logo or color more than one of its arcs.
