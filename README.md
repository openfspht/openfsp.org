<p align="center">
  <a href="https://openfsp.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cdn.openfsp.org/logo/openfsp-logo-inverse.svg">
      <img src="https://cdn.openfsp.org/logo/openfsp-logo.svg" alt="OpenFSP" width="280">
    </picture>
  </a>
</p>

<p align="center"><b>The OpenFSP site and specification, served at openfsp.org</b></p>

Every specification chapter is an MDX page in `content/docs/`, English (`page.mdx`) with its French version
(`page.fr.mdx`). Each rule number is an anchor, such as `/docs/spec/idempotency#3.2`. Built with Fumadocs on TanStack
Start, prerendered and served by nginx.

```sh
bun install
bun run dev      # http://localhost:4321
bun run check && bun test && bun run build
```

The build fails on a broken link, a missing anchor or a page missing in one language.

Edit the English and French pages together, and never renumber a rule: the conformance suite in
[openfspht/openfsp](https://github.com/openfspht/openfsp) cites rules by number.

[Apache-2.0](LICENSE)
