---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# openfsp.org

Scope: the whole public site. Home is Persuade (engineers and decision makers decide whether OpenFSP is worth their time); spec, ADR, problem and registry pages are Read; conformance verification is Operate.

Audience and job: payment engineers look up a rule, a problem type or the registry; the MBDS jury, the BRH and operator management read the idea, the governance and the status. Action: open the spec at the right rule, or start the stack locally.

Proof: real HTTP exchanges from the spec, real rule numbers, the conformance figures in PRODUCT.md. No invented adopters.

Constraints: static Astro, French default at `/`, English at `/en/`; spec-derived content French on both locales.

## Direction contract

THESIS: The category standard for an open protocol site, at the finish of Stripe Docs, the OpenAPI Initiative and the IETF Datatracker. It refuses the decorative hero, the stat strip, and rows of icon cards.

OWN-WORLD: Chalk ground and ink text in light mode, deep ink ground and chalk text in dark mode. Ink carries primary actions. Accent deep marks only the current item and focus. Space Grotesk for headings, system sans for body, system mono for code and rule numbers. Thin rules, no shadows on content, 6px radius on controls.

STORY: The visitor reads the offer in one line, sees a real exchange annotated with its rules, then jumps to the spec, the problem catalogue or the stack.

FIRST VIEWPORT: Top bar with the logo, five sections, a locale switch and GitHub. Left seven columns: headline, two-sentence lead, primary "Lire la spécification" and secondary "Démarrer". Right five columns: the payment-creation request and response, each line keyed to its rule. Under it, one status line: draft 0.1.0, rule count, Core PASS.

FORM: canon (standing exit), seed:766499fc0ac6a3e3. Signature interaction: every numbered rule carries a copyable deep link, and the spec sidebar follows the reading position.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
