## Development

TanStack Start, React 19, Fumadocs, MDX and Tailwind 4 on Vite, with Bun.

- `bun run dev` serves the site on port 4321. Reuse a running server; stop only the ones you started.
- Before finishing, run `bun run check`, `bun test` and `bun run build`. The build prerenders every page, then `scripts/prepare-static.ts` writes the sitemap, `robots.txt`, the 404 page and gzip files, and fails on a broken link, a missing anchor or a page or rule missing in one language.
- References: [TanStack Start prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering), [Fumadocs](https://fumadocs.dev/docs), [Tailwind](https://tailwindcss.com/docs).

## Positioning

- OpenFSP is a standard. The gateway is one implementation that makes it usable today with MonCash and NatCash. SDKs are the next step: Kotlin for the JVM, then TypeScript.
- Never describe the project as a draft or a research project. Never name the commercial product built on OpenFSP. The code repository is `openfspht/openfsp`, the governance repository `openfspht/governance`.
- The home page persuades in plain words. Technical detail belongs in the docs.

## Content

- Edit English (`x.mdx`) and French (`x.fr.mdx`) pages together. French is written natively, not translated word for word.
- The docs speak in the author's first person, to payment engineers: no pedagogy, no filler. Decisions are the author's proposals, numbered in sequence, with no accepted or rejected status.
- Rule bodies in `content/docs/spec` (from the first `## 1.` heading) change only on purpose. Keep rule and decision identifiers stable.
- Distinguish simulated, sandbox and production evidence. Do not imply provider or regulator endorsement.
- Never use the em dash, the typographic minus or the section sign.

## Code and design

- Colours come from the `--color-fd-*` tokens in `src/styles/app.css`, derived from the brand in `openfspht/art` (`BRAND.md`): ink, chalk, accent. No hex values in components.
- `DESIGN.md` and `PRODUCT.md` describe the shipped design and the product; update them when either changes.
- No comments except a non-obvious why; none in workflows, Dockerfile or nginx config.
- Commits are conventional, one English line, no body.
