# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Fumadocs on TanStack Start (React, Tailwind 4, MDX), prerendered to static files and served by nginx in a Docker image deployed on the author's infrastructure (Coolify). Separate repository `openfspht/openfsp.org`. English at `/`, French at `/fr`.

## Users

- Payment engineers: merchant developers integrating MonCash or NatCash, and engineering teams at Haitian payment operators evaluating native adoption. They come to read the contract, check a rule, look up a problem type returned by a gateway, or run the conformance suite.
- Decision makers: the MBDS master's jury, the BRH (regulator) and operator management. They need the idea, the governance and the project status in a few minutes, without reading the spec.

## Product Purpose

openfsp.org is the public home of OpenFSP, a proposed open standard for integrating digital payments in Haiti: one contract between merchant applications and payment operators, served by a gateway the merchant hosts. The site publishes the specification, the problem type catalogue that `type` URIs point to (`https://openfsp.org/problems/<code>`, required by API 10.3.3), the provider registry, and the conformance entry points. Success: an engineer finds a rule or a problem type in one step, and a decision maker understands the O + L idea and the governance in one page.

## Positioning

Not a payment service. OpenFSP never holds funds or credentials: the gateway is self-hosted by the merchant, and the standard is proposed to the operators themselves for native adoption. Every claim is backed by a public spec rule, a conformance test and a reproducible attestation.

## Operating Context

- Spec source: this repository, `content/docs/` (English `page.mdx`, French `page.fr.mdx`). The former `adrs` repository is archived. Numbered rules with MUST / MUST NOT / SHOULD / MAY (DOIT / NE DOIT PAS / DEVRAIT / PEUT in French), each number an anchor (`/docs/spec/payments-api#5.1.8`), never the section sign.
- Provider registry: `content/docs/registry.mdx`.
- Code: `openfspht/openfsp` (gateway, simulator, validator, console, demo shop). Public validator planned at `validate.openfsp.org`, issuing signed attestations (JWS EdDSA, keys at `/.well-known/openfsp-validator`); until it is deployed, `make validate` runs locally.
- Assets: `cdn.openfsp.org` (logo, favicon).

## Capabilities and Constraints

- The spec is the MDX pages themselves: one source, deep links to each rule. `/problems/<code>` redirects to the catalogue row in the payments API page.
- English is primary; every page has a French version. Rule numbers never change between languages.
- Status: draft specification, protocol version 0.1.0, academic project first, opened to contribution later.
- HTG only.
- Undecided: the public validator's deployment date.

## Brand Commitments

- `~/workspace/oss/openfsp/art/BRAND.md`: ring mark with three gaps, Ink `#0B3B36`, Accent `#E8A33D` (one arc only, never carries meaning alone), Accent deep `#C07E1B`, Chalk `#F5F2EA`; Space Grotesk for headings; no Haitian flag colours (not a government project).
- Voice: first person of the author, proposals rather than verdicts ("je propose", never "accepté" or "validé"); short, dry, technical; no pedagogy; French written as French, not translated English.
- Licence Apache-2.0, carried by Karako Systems; the commercial product built on top is never named.
- No em dash and no typographic minus anywhere.
- Standing visual preference (2026-11-14): simple, clean and interesting like coolify.io and its docs. Colours and type come from the console design system (`stack/frontend/packages/ui/src/styles/globals.css`): neutral grounds, teal primary, amber accent, Inter; no earth or green grounds in dark mode.

## Evidence on Hand

- Spec: 564 numbered rules, 581 obligations; conformance matrix with 145 tested obligations.
- Conformance suite: 95 requirements, 102 scenarios; the reference gateway and the native operator `mock_openfsp` both reach Core PASS.
- Organisation README (`openfsp/README.md`): the O x L versus O + L argument and the component table.
- No adopters, operators, testimonials or endorsements exist: none may be implied.

## Product Principles

1. Every page points to the rule, test or file that backs it.
2. One step from the home page to any rule or problem type.
3. Proposal, not endorsement: never suggest operator, BRH or government backing.
4. Short over complete; the spec is the complete reference.
5. Works offline-first as a static site; no tracking.

## Accessibility & Inclusion

WCAG 2.2 AA. The brand accent fails contrast on light grounds and may never carry meaning alone.
