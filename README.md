# openfsp.org

The public site of [OpenFSP](https://github.com/openfspht/openfsp), served at `openfsp.org`: the
specification and the ADRs rendered from [`openfspht/adrs`](https://github.com/openfspht/adrs),
the problem catalogue behind every `https://openfsp.org/problems/<code>` type URI, the provider
registry from [`openfspht/openfsp`](https://github.com/openfspht/openfsp), and the conformance
entry points. French at `/`, English at `/en/`; the specification itself stays in French.

## Sources

Both repositories are pinned as submodules under `sources/`. Next to them in a workspace
(`../adrs`, `../openfsp`), the build reads the sibling checkouts instead.
`OPENFSP_ADRS_DIR` and `OPENFSP_ORG_DIR` override both.

```bash
git submodule update --remote
git commit -am "chore: update the specification sources"
```

## Run

```bash
bun install
bun run dev      # http://localhost:4321
bun run check    # astro check and prettier
bun test
bun run build    # static site in dist/
```

```bash
git clone --recurse-submodules https://github.com/openfspht/openfsp.org.git
docker build -t openfsp-site . && docker run -p 8080:8080 openfsp-site
```

## Attestations

The conformance page verifies a validator attestation (compact JWS, EdDSA) in the browser
against the keys at `<validator>/.well-known/openfsp-validator`, and checks a report's RFC 8785
SHA-256 digest when one is given. The validator must allow cross-origin reads of that document
from `https://openfsp.org`.

## Licence

Apache-2.0, like the rest of OpenFSP.
