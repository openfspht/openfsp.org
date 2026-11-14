# openfsp.org

The public site of [OpenFSP](https://github.com/openfspht/openfsp), served at `openfsp.org`. It holds the specification itself: every chapter is an MDX page under
`content/docs/`, English first (`page.mdx`) with its French version next to it (`page.fr.mdx`). Rules keep their numbers, and each number is an anchor
(`/docs/spec/idempotency#3.2`). `https://openfsp.org/problems/<code>` redirects to the matching row of the payments API catalogue.

Built with Fumadocs on TanStack Start, prerendered to static files and served by nginx.

## Run

```bash
bun install
bun run dev      # http://localhost:4321
bun run check    # types and prettier
bun test
bun run build    # static site in dist/client
```

```bash
docker build -t openfsp-site . && docker run -p 8080:8080 openfsp-site
```

## Changing the specification

Edit the English page and its French version in the same pull request. Never renumber a rule: the conformance suite in
[`openfspht/stack`](https://github.com/openfspht/stack) refers to rules by number.

## Attestations

`/docs/verify` checks a validator attestation (compact JWS, EdDSA) in the browser against the keys at `<validator>/.well-known/openfsp-validator`, and a report's
RFC 8785 SHA-256 digest when one is given. The validator must allow cross-origin reads of that document from `https://openfsp.org`.

## Licence

Apache-2.0, like the rest of OpenFSP.
