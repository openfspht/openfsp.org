<p align="center">
  <a href="https://openfsp.org">
    <picture>
      <img src="https://cdn.openfsp.org/logo/openfsp-logo.svg" alt="OpenFSP" width="280">
    </picture>
  </a>
</p>

<p align="center"><b>The OpenFSP specification and documentation, served at openfsp.org</b></p>

<p align="center">
  <a href="https://github.com/openfspht/openfsp.org/actions/workflows/ci.yml"><img src="https://github.com/openfspht/openfsp.org/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-0B3B36" alt="Apache-2.0"></a>
</p>

## Develop

Bun 1.4 and Node 24.

```sh
bun install
bun run dev                                     # http://localhost:4321
bun run check && bun run test && bun run build  # format, lint, types, tests, static build
```

The build prerenders every page into `dist/client` and fails on a broken link, a missing anchor or a page missing in
one language.

## Edit the specification

Each chapter is an MDX page in `content/docs/`: `page.mdx` in French, `page.en.mdx` in English. Edit both together.
Every rule number is an anchor, such as `/docs/spec/idempotency#3.2`, and the conformance suite in
[openfspht/openfsp](https://github.com/openfspht/openfsp) cites rules by number: never renumber one.

## Deploy

```sh
docker run -d -p 8080:8080 ghcr.io/openfspht/openfsp.org:latest
```

A static site served by unprivileged nginx on port 8080, for `linux/amd64` and `linux/arm64`. `/health` answers `ok`.
Terminate TLS in front of it.

Merging the release pull request tags a version, publishes `ghcr.io/openfspht/openfsp.org:<version>` and `latest`, then
calls the Coolify deploy webhook (`COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` secrets). To rebuild and redeploy a tag, run the
**Release** workflow by hand with that tag.

## License

[Apache-2.0](LICENSE)
