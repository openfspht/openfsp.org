import { createHash } from "node:crypto";
import { afterEach, describe, expect, test } from "vite-plus/test";
import { canonical, MAX_KEYS_SIZE, verifyAttestation } from "../src/lib/attestation";

const encode = (value: string | Uint8Array) => Buffer.from(value).toString("base64url");

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

async function signed(payload: object, status: string | undefined = "active", serialize = (value: object) => canonical(value as never)) {
  const { privateKey, publicKey } = (await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])) as CryptoKeyPair;
  const jwk = await crypto.subtle.exportKey("jwk", publicKey);
  const input = `${encode(JSON.stringify({ alg: "EdDSA", kid: "att-1" }))}.${encode(serialize({ issuer: "https://validate.openfsp.org", issued_at: "2026-01-01T00:00:00Z", ...payload }))}`;
  const signature = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, new TextEncoder().encode(input)));
  globalThis.fetch = (async () =>
    Response.json({
      issuer: "https://validate.openfsp.org",
      attestation_keys: [{ kid: "att-1", x: jwk.x, status }],
    })) as unknown as unknown as typeof fetch;
  return `${input}.${encode(signature)}`;
}

describe("attestation verification", () => {
  test("canonical JSON sorts keys and keeps numbers", () => {
    expect(canonical({ b: 1, a: [true, null, "é"], c: { z: 1.5, y: "x" } })).toBe('{"a":[true,null,"é"],"b":1,"c":{"y":"x","z":1.5}}');
  });

  test("accepts a signed attestation and checks the report digest", async () => {
    const report = { suite: { version: "0.1.0" }, core: "PASS" };
    const digest = createHash("sha256").update(canonical(report)).digest("hex");
    const jws = await signed({
      type: "openfsp-conformance-attestation/1",
      report: { digest },
      verdicts: { core: "PASS", profiles: [] },
    });
    const outcome = await verifyAttestation(jws, "https://validate.openfsp.org", JSON.stringify(report));
    expect(outcome).toMatchObject({
      signatureValid: true,
      authenticated: true,
      digestMatches: true,
      kid: "att-1",
      keyStatus: "active",
      keyActive: true,
    });
  });

  test("rejects a tampered payload", async () => {
    const jws = await signed({
      type: "openfsp-conformance-attestation/1",
      verdicts: { core: "FAIL" },
    });
    const [header, , signature] = jws.split(".");
    const forged = `${header}.${encode(JSON.stringify({ type: "openfsp-conformance-attestation/1", verdicts: { core: "PASS" } }))}.${signature}`;
    expect(await verifyAttestation(forged, "https://validate.openfsp.org")).toMatchObject({
      signatureValid: false,
    });
  });

  test("names the error for text that is not a JWS", async () => {
    expect(await verifyAttestation("not a jws", "https://validate.openfsp.org")).toEqual({
      error: "format",
    });
  });
  test("compares issuer and recorded date", async () => {
    const jws = await signed({ type: "openfsp-conformance-attestation/1" });
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toMatchObject({
      signatureValid: true,
      issuerMatches: true,
      issuedAtValid: true,
    });
  });

  test("does not authenticate a different issuer or a future date", async () => {
    const jws = await signed({
      type: "openfsp-conformance-attestation/1",
      issuer: "https://other.example",
      issued_at: "2999-01-01T00:00:00Z",
    });
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toMatchObject({
      signatureValid: true,
      issuerMatches: false,
      issuedAtValid: false,
      authenticated: false,
    });
  });

  test("treats an issue date beyond the clock skew as invalid", async () => {
    const soon = new Date(Date.now() + 60 * 1000).toISOString();
    const later = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const accepted = await signed({ type: "openfsp-conformance-attestation/1", issued_at: soon });
    expect(await verifyAttestation(accepted, "https://validate.openfsp.org")).toMatchObject({
      issuedAtValid: true,
      authenticated: true,
    });
    const rejected = await signed({ type: "openfsp-conformance-attestation/1", issued_at: later });
    expect(await verifyAttestation(rejected, "https://validate.openfsp.org")).toMatchObject({
      signatureValid: true,
      issuedAtValid: false,
      authenticated: false,
    });
  });

  test("does not authenticate a signature by a revoked or unknown-status key", async () => {
    for (const status of ["retired", "revoked", "compromised-maybe"]) {
      const jws = await signed({ type: "openfsp-conformance-attestation/1" }, status);
      expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toMatchObject({
        signatureValid: true,
        keyStatus: status,
        keyActive: false,
        authenticated: false,
      });
    }
    const unlabelled = await signed({ type: "openfsp-conformance-attestation/1" }, undefined);
    expect(await verifyAttestation(unlabelled, "https://validate.openfsp.org")).toMatchObject({
      keyActive: true,
      authenticated: true,
    });
  });

  test("accepts only the canonical snake_case payload the validator signs", async () => {
    const camel = await signed({
      type: "openfsp-conformance-attestation/1",
      issuedAt: "2026-01-01T00:00:00Z",
    });
    expect(await verifyAttestation(camel, "https://validate.openfsp.org")).toEqual({
      error: "type",
    });
    const nested = await signed({
      type: "openfsp-conformance-attestation/1",
      target: { kind: "operator", baseUrl: "https://a.example" },
    });
    expect(await verifyAttestation(nested, "https://validate.openfsp.org")).toEqual({
      error: "type",
    });
    const duplicate = await signed({ type: "openfsp-conformance-attestation/1" }, "active", (value) =>
      canonical(value as never).replace('"issued_at":', '"issued_at":"2999-01-01T00:00:00Z","issued_at":'),
    );
    expect(await verifyAttestation(duplicate, "https://validate.openfsp.org")).toEqual({
      error: "type",
    });
    const pretty = await signed({ type: "openfsp-conformance-attestation/1" }, "active", (value) => JSON.stringify(value, null, 2));
    expect(await verifyAttestation(pretty, "https://validate.openfsp.org")).toEqual({
      error: "type",
    });
    const configuration = await signed({
      type: "openfsp-conformance-attestation/1",
      configuration: { customHeader: "x" },
    });
    expect(await verifyAttestation(configuration, "https://validate.openfsp.org")).toMatchObject({
      authenticated: true,
    });
  });

  test("stops reading a key document past the size limit", async () => {
    const jws = await signed({ type: "openfsp-conformance-attestation/1" });
    const keys = await (await fetch("https://validate.openfsp.org/.well-known/openfsp-validator")).text();
    let pulled = 0;
    const chunk = new Uint8Array(64 * 1024).fill(32);
    globalThis.fetch = (async () =>
      new Response(
        new ReadableStream({
          pull(controller) {
            pulled += chunk.byteLength;
            controller.enqueue(chunk);
          },
        }),
      )) as unknown as typeof fetch;
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({ error: "keys" });
    expect(pulled).toBeLessThanOrEqual(MAX_KEYS_SIZE + 2 * chunk.byteLength);
    globalThis.fetch = (async () =>
      new Response(keys, {
        headers: { "content-length": String(MAX_KEYS_SIZE + 1) },
      })) as unknown as typeof fetch;
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({ error: "keys" });
    globalThis.fetch = (async () => new Response(keys)) as unknown as typeof fetch;
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toMatchObject({
      authenticated: true,
    });
  });

  test("rejects malformed structures without throwing", async () => {
    for (const header of [null, [], 42]) {
      const jws = `${encode(JSON.stringify(header))}.${encode(JSON.stringify({ type: "openfsp-conformance-attestation/1" }))}.AA`;
      expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({
        error: "type",
      });
    }
    for (const payload of [null, [], { type: "openfsp-conformance-attestation/1", verdicts: { profiles: {} } }]) {
      const jws = `${encode(JSON.stringify({ alg: "EdDSA", kid: "att-1" }))}.${encode(JSON.stringify(payload))}.AA`;
      expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({
        error: "type",
      });
    }
  });

  test("handles missing keys and unavailable networks", async () => {
    const jws = await signed({ type: "openfsp-conformance-attestation/1" });
    globalThis.fetch = (async () => Response.json({ attestation_keys: [] })) as unknown as typeof fetch;
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({
      error: "unknownKey",
      kid: "att-1",
    });
    globalThis.fetch = (async () => {
      throw new TypeError("offline");
    }) as unknown as unknown as typeof fetch;
    expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({ error: "keys" });
  });

  test("rejects malformed key documents and duplicate key IDs", async () => {
    const jws = await signed({ type: "openfsp-conformance-attestation/1" });
    for (const document of [
      null,
      { attestation_keys: {} },
      { attestation_keys: [null] },
      {
        attestation_keys: [
          { kid: "att-1", x: "a" },
          { kid: "att-1", x: "b" },
        ],
      },
    ]) {
      globalThis.fetch = (async () => Response.json(document)) as unknown as typeof fetch;
      expect(await verifyAttestation(jws, "https://validate.openfsp.org")).toEqual({
        error: "keys",
      });
    }
  });

  test("rejects an insecure remote validator, oversized input and a changed report", async () => {
    const jws = await signed({
      type: "openfsp-conformance-attestation/1",
      report: { digest: "wrong" },
    });
    expect(await verifyAttestation(jws, "http://remote.example")).toEqual({ error: "validator" });
    expect(await verifyAttestation("a".repeat(1024 * 1024 + 1), "https://validate.openfsp.org")).toEqual({ error: "size" });
    expect(await verifyAttestation(jws, "https://validate.openfsp.org", "{}")).toMatchObject({
      digestMatches: false,
    });
    expect(await verifyAttestation(jws, "https://validate.openfsp.org", "invalid")).toEqual({
      error: "report",
    });
  });
});
