import { describe, expect, test } from "bun:test";
import { canonical, verifyAttestation } from "../src/lib/attestation";

const encode = (value: string | Uint8Array) => Buffer.from(value).toString("base64url");

async function signed(payload: object) {
  const { privateKey, publicKey } = (await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])) as CryptoKeyPair;
  const jwk = await crypto.subtle.exportKey("jwk", publicKey);
  const input = `${encode(JSON.stringify({ alg: "EdDSA", kid: "att-1" }))}.${encode(JSON.stringify(payload))}`;
  const signature = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, new TextEncoder().encode(input)));
  globalThis.fetch = (async () =>
    Response.json({ issuer: "https://validate.openfsp.org", attestation_keys: [{ kid: "att-1", x: jwk.x, status: "active" }] })) as unknown as typeof fetch;
  return `${input}.${encode(signature)}`;
}

describe("attestation verification", () => {
  test("canonical JSON sorts keys and keeps numbers", () => {
    expect(canonical({ b: 1, a: [true, null, "é"], c: { z: 1.5, y: "x" } })).toBe('{"a":[true,null,"é"],"b":1,"c":{"y":"x","z":1.5}}');
  });

  test("accepts a signed attestation and checks the report digest", async () => {
    const report = { suite: { version: "0.1.0" }, core: "PASS" };
    const digest = new Bun.CryptoHasher("sha256").update(canonical(report)).digest("hex");
    const jws = await signed({ type: "openfsp-conformance-attestation/1", report: { digest }, verdicts: { core: "PASS", profiles: [] } });
    const outcome = await verifyAttestation(jws, "https://validate.openfsp.org", JSON.stringify(report));
    expect(outcome).toMatchObject({ signatureValid: true, digestMatches: true, kid: "att-1", keyStatus: "active" });
  });

  test("rejects a tampered payload", async () => {
    const jws = await signed({ type: "openfsp-conformance-attestation/1", verdicts: { core: "FAIL" } });
    const [header, , signature] = jws.split(".");
    const forged = `${header}.${encode(JSON.stringify({ type: "openfsp-conformance-attestation/1", verdicts: { core: "PASS" } }))}.${signature}`;
    expect(await verifyAttestation(forged, "https://validate.openfsp.org")).toMatchObject({ signatureValid: false });
  });

  test("names the error for text that is not a JWS", async () => {
    expect(await verifyAttestation("not a jws", "https://validate.openfsp.org")).toEqual({ error: "format" });
  });
});
