const ATTESTATION_TYPE = "openfsp-conformance-attestation/1";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export type Verification =
  | { error: "format" | "type" | "keys" | "crypto" | "report" }
  | { error: "unknownKey"; kid: string }
  | {
      signatureValid: boolean;
      kid: string;
      keyStatus?: string;
      digestMatches?: boolean;
      payload: Record<string, any>;
    };

function base64url(segment: string): Uint8Array<ArrayBuffer> {
  const padded = segment
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(segment.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

function decodeJson(segment: string): unknown {
  return JSON.parse(new TextDecoder().decode(base64url(segment)));
}

function snake(value: unknown): any {
  if (Array.isArray(value)) return value.map(snake);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`), snake(item)]));
  }
  return value;
}

export function canonical(value: Json): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`)
    .join(",")}}`;
}

async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function verifyAttestation(jws: string, validator: string, report?: string): Promise<Verification> {
  const segments = jws.trim().split(".");
  if (segments.length !== 3 || segments.some((segment) => !/^[A-Za-z0-9_-]+$/.test(segment))) return { error: "format" };

  let header: { alg?: string; kid?: string };
  let payload: Record<string, any>;
  try {
    header = decodeJson(segments[0]) as typeof header;
    payload = snake(decodeJson(segments[1]));
  } catch {
    return { error: "format" };
  }
  if (header.alg !== "EdDSA" || !header.kid || payload.type !== ATTESTATION_TYPE) return { error: "type" };

  let keys: Array<{ kid: string; x: string; status?: string }>;
  try {
    const response = await fetch(new URL("/.well-known/openfsp-validator", validator), { headers: { Accept: "application/json" } });
    if (!response.ok) return { error: "keys" };
    const document = snake(await response.json());
    keys = document.attestation_keys ?? [];
  } catch {
    return { error: "keys" };
  }
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) return { error: "unknownKey", kid: header.kid };

  let signatureValid: boolean;
  try {
    const key = await crypto.subtle.importKey("jwk", { kty: "OKP", crv: "Ed25519", x: jwk.x }, { name: "Ed25519" }, false, ["verify"]);
    signatureValid = await crypto.subtle.verify({ name: "Ed25519" }, key, base64url(segments[2]), new TextEncoder().encode(`${segments[0]}.${segments[1]}`));
  } catch {
    return { error: "crypto" };
  }

  let digestMatches: boolean | undefined;
  if (report !== undefined) {
    try {
      digestMatches = (await sha256Hex(canonical(JSON.parse(report) as Json))) === payload.report?.digest;
    } catch {
      return { error: "report" };
    }
  }

  return { signatureValid, kid: header.kid, keyStatus: jwk.status, digestMatches, payload };
}
