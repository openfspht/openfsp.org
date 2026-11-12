# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static build served by a Docker image deployed on the author's infrastructure (Coolify), like cdn.openfsp.org. Separate repository `openfspht/openfsp.org`. Site chrome and editorial pages in French and English through translation files; source strings and keys in English.

## Users

- Payment engineers: merchant developers integrating MonCash or NatCash, and engineering teams at Haitian payment operators evaluating native adoption. They come to read the contract, check a rule, look up a problem type returned by a gateway, or run the conformance suite.
- Decision makers: the MBDS master's jury, the BRH (regulator) and operator management. They need the idea, the governance and the project status in a few minutes, without reading the spec.

## Product Purpose

openfsp.org is the public home of OpenFSP, a proposed open standard for integrating digital payments in Haiti: one contract between merchant applications and payment operators, served by a gateway the merchant hosts. The site publishes the specification, the problem type catalogue that `type` URIs point to (`https://openfsp.org/problems/<code>`, required by API 10.3.3), the provider registry, and the conformance entry points. Success: an engineer finds a rule or a problem type in one step, and a decision maker understands the O + L idea and the governance in one page.

## Positioning

Not a payment service. OpenFSP never holds funds or credentials: the gateway is self-hosted by the merchant, and the standard is proposed to the operators themselves for native adoption. Every claim is backed by a public spec rule, a conformance test and a reproducible attestation.

## Operating Context

- Spec source: `~/workspace/oss/openfsp/adrs` (`spec/` normative rules, `text/` ADRs), French only, numbered rules with DOIT / NE DOIT PAS / DEVRAIT / PEUT. Rules are referenced by document and number (`api-paiements.md` 5.1.8), never with the section sign.
- Provider registry: `~/workspace/oss/openfsp/openfsp/registries/providers.md`.
- Code: `openfspht/stack` (gateway, simulator, validator, console, demo shop). Public validator planned at `validate.openfsp.org`, issuing signed attestations (JWS EdDSA, keys at `/.well-known/openfsp-validator`); until it is deployed, `make validate` runs locally.
- Assets: `cdn.openfsp.org` (logo, favicon).

## Capabilities and Constraints

- Spec and problem pages are generated at build time from the adrs markdown: one source, deep links to each rule.
- Content derived from the spec stays in French on both locales; the English locale says so.
- Status: draft specification, protocol version 0.1.0, academic project first, opened to contribution later.
- HTG only.
- Undecided: the public validator's deployment date.

## Brand Commitments

- `~/workspace/oss/openfsp/art/BRAND.md`: ring mark with three gaps, Ink `#0B3B36`, Accent `#E8A33D` (one arc only, never carries meaning alone), Accent deep `#C07E1B`, Chalk `#F5F2EA`; Space Grotesk for headings; no Haitian flag colours (not a government project).
- Voice: first person of the author, proposals rather than verdicts ("je propose", never "accepté" or "validé"); short, dry, technical; no pedagogy; French written as French, not translated English.
- Licence Apache-2.0, carried by Karako Systems; the commercial product built on top is never named.
- No em dash and no typographic minus anywhere.
- Standing visual preference (2026-11-12): the category standard for open protocol sites, executed straight. Quality bar: Stripe Docs, the OpenAPI Initiative site and spec.openapis.org, and the IETF Datatracker RFC rendering.

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
