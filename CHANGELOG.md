# Changelog

## [0.7.4](https://github.com/openfspht/openfsp.org/compare/v0.7.3...v0.7.4) (2026-11-21)


### Bug Fixes

* align the demo service links to the right on small screens ([1b1ec11](https://github.com/openfspht/openfsp.org/commit/1b1ec1160a58b177e9141af561c625422200f302))
* say what the validator reports in one plain sentence ([ca05041](https://github.com/openfspht/openfsp.org/commit/ca050416f183409419532943a6e89838df7c2e8a))

## [0.7.3](https://github.com/openfspht/openfsp.org/compare/v0.7.2...v0.7.3) (2026-11-21)


### Bug Fixes

* say the specification is open to all ([f87e667](https://github.com/openfspht/openfsp.org/commit/f87e667b01cebe3ee13578e15a7e73d1d6053660))

## [0.7.2](https://github.com/openfspht/openfsp.org/compare/v0.7.1...v0.7.2) (2026-11-21)


### Bug Fixes

* shorten the hero version line on small screens ([f1cff8f](https://github.com/openfspht/openfsp.org/commit/f1cff8f7b5b0625b09472a412b76e601af08c4c9))

## [0.7.1](https://github.com/openfspht/openfsp.org/compare/v0.7.0...v0.7.1) (2026-11-21)


### Bug Fixes

* quote the share image cache rule so nginx accepts the config ([7a7e68b](https://github.com/openfspht/openfsp.org/commit/7a7e68ba3ecfd48b10e8f217d25868369c7dc662))

## [0.7.0](https://github.com/openfspht/openfsp.org/compare/v0.6.0...v0.7.0) (2026-11-21)


### Features

* fingerprint share image URLs so link previews refresh when an image changes ([bf612b3](https://github.com/openfspht/openfsp.org/commit/bf612b39b89321fff491f8330352674584f7db59))

## [0.6.0](https://github.com/openfspht/openfsp.org/compare/v0.5.0...v0.6.0) (2026-11-21)


### Features

* invite providers to run the validator from the home page ([0bd2137](https://github.com/openfspht/openfsp.org/commit/0bd21377c9563d7305aecc262d8fa41d510fc521))
* use the brand card as the home page share image ([dda62ed](https://github.com/openfspht/openfsp.org/commit/dda62ed14b1888ed5efb1610e9e4f50f654decda))


### Bug Fixes

* drop payment synchronisation from the home page and state what was tested instead of limits ([d855c7a](https://github.com/openfspht/openfsp.org/commit/d855c7a6d36664440fcb1c8dd29308dbe04c4b36))

## [0.5.0](https://github.com/openfspht/openfsp.org/compare/v0.4.0...v0.5.0) (2026-11-21)


### ⚠ BREAKING CHANGES

* drop synchronize, retrieval returns the most recent state
* require the control interface in the test environment
* let the suite choose payment outcomes on any implementation
* carry the fee object in a statement entry
* reduce the statement to a list of successful transactions

### Features

* add a sponsors section with Karako Systems ([0f24b44](https://github.com/openfspht/openfsp.org/commit/0f24b443b48f897b0e0be0ec8faa4c953d6e7970))
* adopt the design system colours, spacing and JetBrains Mono ([df73523](https://github.com/openfspht/openfsp.org/commit/df7352338912e2257e4cace6f3ec40f2611ff59b))
* carry the fee object in a statement entry ([fede178](https://github.com/openfspht/openfsp.org/commit/fede17823dd8d8953353dacce7a41c943fba2c8c))
* drop synchronize, retrieval returns the most recent state ([19d9e70](https://github.com/openfspht/openfsp.org/commit/19d9e7014f5912794d3fd0b807b9919b162326b4))
* expand the footer links and show the GitHub logo beside X and LinkedIn ([1d6b2d2](https://github.com/openfspht/openfsp.org/commit/1d6b2d2de2575ac8f3141383802d2d3fd107e37b))
* let the suite choose payment outcomes on any implementation ([5971704](https://github.com/openfspht/openfsp.org/commit/59717040961f84b1154cb8cb0fda2f06d87b2ec4))
* link the OpenFSP X and LinkedIn accounts ([9c104e0](https://github.com/openfspht/openfsp.org/commit/9c104e0dd05b4f9e95b013f51706987aa228699e))
* load analytics from runtime environment variables ([93b7cfc](https://github.com/openfspht/openfsp.org/commit/93b7cfc9c545e72cec8f0dc04292892a04a18e5f))
* make each conformance preparation a distinct test merchant account ([dc7131c](https://github.com/openfspht/openfsp.org/commit/dc7131cb4cd8312c3b7af59881ee2a54b7129aaa))
* redesign the home page after the design system ([b8007d4](https://github.com/openfspht/openfsp.org/commit/b8007d46cfa574cbdbe1c262a89e9a87e9518e38))
* reduce the statement to a list of successful transactions ([4ce9440](https://github.com/openfspht/openfsp.org/commit/4ce9440720091503f578f53f684c3925edeaea46))
* require the control interface in the test environment ([629b072](https://github.com/openfspht/openfsp.org/commit/629b072b4d2e6d1b154be6cfe5bf97e15b6def36))
* show the GitHub logo instead of a text link on the home page ([9b20ce7](https://github.com/openfspht/openfsp.org/commit/9b20ce76cb10acc1e6ffabe1cbfa13644bb2c667))
* use the design copy on the home page ([52601b5](https://github.com/openfspht/openfsp.org/commit/52601b57a052c3b5f399acb360ac5d266e41b8e5))


### Bug Fixes

* keep the security headers on the monitoring endpoint ([0a06540](https://github.com/openfspht/openfsp.org/commit/0a06540ed8550fae945170fd87c1b82887db5362))
* let the demo section call the demo gateway instead of running the conformance suite ([597a9d9](https://github.com/openfspht/openfsp.org/commit/597a9d97c7d616fab34afd4dfcd757eadc2b870f))
* name what phase 1 covers in the home page badge ([ce91d92](https://github.com/openfspht/openfsp.org/commit/ce91d92ee322ffe087020ca470f91eeb00fa68d1))
* point the site at the validator.openfsp.org host ([32fc715](https://github.com/openfspht/openfsp.org/commit/32fc7151c4eed89e46934f2b4c7586d6d061fb58))
* restrict the French redirect to safe paths and keep the query string ([16f2f02](https://github.com/openfspht/openfsp.org/commit/16f2f02c12884adf0a620348cab98ef5dcaa5b7f))
* tie the home page versions, libraries and sponsor copy to the facts ([68ceabd](https://github.com/openfspht/openfsp.org/commit/68ceabd3564bdd94abf323390d17f245a7faacd0))

## [0.4.0](https://github.com/openfspht/openfsp.org/compare/v0.3.0...v0.4.0) (2026-11-18)


### Features

* specify the preparation of conformance runs by the server ([54c9446](https://github.com/openfspht/openfsp.org/commit/54c9446981400e29a6ccbfe69beeb66517c507f8))

## [0.3.0](https://github.com/openfspht/openfsp.org/compare/v0.2.0...v0.3.0) (2026-11-17)


### Features

* serve French as the default language ([5fa4180](https://github.com/openfspht/openfsp.org/commit/5fa418031e62d7442acc3a928881df60b7006556))

## [0.2.0](https://github.com/openfspht/openfsp.org/compare/v0.1.0...v0.2.0) (2026-11-17)


### Features

* drop the simulated payment from the home page and sharpen its lead ([12b77ea](https://github.com/openfspht/openfsp.org/commit/12b77ea50c234fcc8cdff0342cad4830956e87ef))
* redesign the diagrams and show state labels ([76cf64a](https://github.com/openfspht/openfsp.org/commit/76cf64a587f7cfcf22ede6b48992a0f0dfb34653))
* report errors to Sentry when a DSN is configured ([f0c4614](https://github.com/openfspht/openfsp.org/commit/f0c46143852aee2289491b5b1d9600b74acca23c))
* use neutral greys for the site grounds and text ([3e1f064](https://github.com/openfspht/openfsp.org/commit/3e1f064821d65de0ff027cb66ab49066db6a225c))


### Bug Fixes

* serve the docs page loader from prerendered data ([09623c5](https://github.com/openfspht/openfsp.org/commit/09623c52900b569b680075de87700dffed292666))

## 0.1.0 (2026-11-16)


### Features

* add the site ([7883453](https://github.com/openfspht/openfsp.org/commit/78834533c9a8eea9fd7eeaf4bb461aa978e1bfa3))
* tint the site neutrals with the ink hue ([fed46c7](https://github.com/openfspht/openfsp.org/commit/fed46c7059d14bff011f1e9e42e4c9f9b04581c1))
* verify attestations against validate.openfsp.org ([368b923](https://github.com/openfspht/openfsp.org/commit/368b92309e11c3fa03d3873af45a8310d4bc1bda))


### Bug Fixes

* drop the period after the header brand name ([8442bc6](https://github.com/openfspht/openfsp.org/commit/8442bc6baecf1f4bdfa91503f5954ca7c159dfb9))
* pin fflate to a patched release ([bc24838](https://github.com/openfspht/openfsp.org/commit/bc24838dc9af135149c5890ccd78c2630a554e0e))
* read Open Graph meta tags with a literal pattern ([6aec37f](https://github.com/openfspht/openfsp.org/commit/6aec37f23f736c5488d831298becd3bb8a808feb))
* read the attestation form fields as text only ([53f460c](https://github.com/openfspht/openfsp.org/commit/53f460c55eaefd04cc2eb712a105f20bdafe25c2))
* type the attestation form submit event ([7b186b3](https://github.com/openfspht/openfsp.org/commit/7b186b32158f4e9c155ae20b9751b391744c5cd8))
