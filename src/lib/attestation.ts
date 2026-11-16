const ATTESTATION_TYPE = "openfsp-conformance-attestation/1";
export const MAX_ATTESTATION_SIZE = 1024 * 1024;
export const MAX_REPORT_SIZE = 10 * 1024 * 1024;
export const MAX_KEYS_SIZE = 1024 * 1024;
export const CLOCK_SKEW_MS = 5 * 60 * 1000;
const ACTIVE_KEY = "active";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type ObjectValue = Record<string, unknown>;
export interface AttestationPayload {
  type: string;
  issuer?: string;
  issued_at?: string;
  target?: { kind?: string; base_url?: string };
  run?: { date?: string };
  suite?: { version?: string; protocol_version?: string };
  report?: { digest?: string };
  validity?: { statement?: string; reference?: string };
  verdicts?: { core?: string | { verdict?: string }; profiles?: { capability?: string; name?: string; verdict?: string }[] };
}

export type Verification =
  | { error: "format" | "type" | "keys" | "crypto" | "report" | "size" | "validator" }
  | { error: "unknownKey"; kid: string }
  | {
      signatureValid: boolean;
      issuerMatches: boolean;
      issuedAtValid: boolean;
      keyActive: boolean;
      authenticated: boolean;
      kid: string;
      keyStatus?: string;
      digestMatches?: boolean;
      payload: AttestationPayload;
    };

function object(value: unknown): value is ObjectValue {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function strings(value: unknown, fields: string[]): boolean {
  return object(value) && fields.every((field) => value[field] === undefined || typeof value[field] === "string");
}

function isPayload(value: unknown): value is AttestationPayload {
  if (!strings(value, ["type", "issuer", "issued_at"]) || !object(value)) return false;
  for (const [name, fields] of Object.entries({
    target: ["kind", "base_url"],
    run: ["date"],
    suite: ["version", "protocol_version"],
    report: ["digest"],
    validity: ["statement", "reference"],
  })) {
    if (value[name] !== undefined && !strings(value[name], fields)) return false;
  }
  if (value.verdicts !== undefined) {
    if (!object(value.verdicts)) return false;
    const { core, profiles } = value.verdicts;
    if (core !== undefined && typeof core !== "string" && !strings(core, ["verdict"])) return false;
    if (profiles !== undefined && (!Array.isArray(profiles) || !profiles.every((profile) => strings(profile, ["capability", "name", "verdict"])))) return false;
  }
  return value.type === ATTESTATION_TYPE;
}

function base64url(segment: string): Uint8Array<ArrayBuffer> {
  const padded = segment
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(segment.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

function decodeText(segment: string): string {
  return new TextDecoder("utf-8", { fatal: true }).decode(base64url(segment));
}

function snakeCaseKeys(value: unknown): boolean {
  if (Array.isArray(value)) return value.every(snakeCaseKeys);
  if (!object(value)) return true;
  return Object.entries(value).every(([key, item]) => !/[A-Z]/.test(key) && (key === "configuration" || snakeCaseKeys(item)));
}

async function readLimited(response: Response, limit: number): Promise<string | undefined> {
  const declared = Number(response.headers.get("content-length"));
  if (declared > limit || !response.body) return;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return;
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
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

function validatorUrl(value: unknown): URL | undefined {
  if (typeof value !== "string") return;
  try {
    const url = new URL(value);
    const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if ((url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) || url.username || url.password || url.search || url.hash) return;
    if (url.pathname !== "/") return;
    return url;
  } catch {
    return;
  }
}

export async function verifyAttestation(jws: string, validator: string, report?: string): Promise<Verification> {
  if (jws.length > MAX_ATTESTATION_SIZE || (report !== undefined && new TextEncoder().encode(report).length > MAX_REPORT_SIZE)) return { error: "size" };
  const segments = jws.trim().split(".");
  if (segments.length !== 3 || segments.some((segment) => !/^[A-Za-z0-9_-]+$/.test(segment))) return { error: "format" };
  let header: unknown;
  let decoded: Json;
  let payloadText: string;
  try {
    header = JSON.parse(decodeText(segments[0]));
    payloadText = decodeText(segments[1]);
    decoded = JSON.parse(payloadText);
  } catch {
    return { error: "format" };
  }
  if (
    !object(header) ||
    header.alg !== "EdDSA" ||
    typeof header.kid !== "string" ||
    !header.kid ||
    header.crit !== undefined ||
    header.b64 !== undefined ||
    canonical(decoded) !== payloadText ||
    !snakeCaseKeys(decoded) ||
    !isPayload(decoded)
  )
    return { error: "type" };
  const payload = decoded;
  const url = validatorUrl(validator);
  if (!url) return { error: "validator" };

  let document: ObjectValue;
  let keys: ObjectValue[];
  try {
    const response = await fetch(new URL("/.well-known/openfsp-validator", url), {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
      credentials: "omit",
      redirect: "error",
    });
    if (!response.ok) return { error: "keys" };
    const body = await readLimited(response, MAX_KEYS_SIZE);
    if (body === undefined) return { error: "keys" };
    const parsed: unknown = JSON.parse(body);
    if (
      !object(parsed) ||
      !Array.isArray(parsed.attestation_keys) ||
      !parsed.attestation_keys.every((key) => strings(key, ["kid", "x", "status", "kty", "crv"]))
    )
      return { error: "keys" };
    document = parsed;
    keys = parsed.attestation_keys as ObjectValue[];
  } catch {
    return { error: "keys" };
  }
  const matching = keys.filter((key) => key.kid === header.kid);
  if (!matching.length) return { error: "unknownKey", kid: header.kid };
  if (matching.length !== 1) return { error: "keys" };
  const jwk = matching[0];
  if (typeof jwk.x !== "string" || (jwk.kty !== undefined && jwk.kty !== "OKP") || (jwk.crv !== undefined && jwk.crv !== "Ed25519")) return { error: "keys" };
  let signatureValid: boolean;
  try {
    const key = await crypto.subtle.importKey("jwk", { kty: "OKP", crv: "Ed25519", x: jwk.x }, { name: "Ed25519" }, false, ["verify"]);
    signatureValid = await crypto.subtle.verify({ name: "Ed25519" }, key, base64url(segments[2]), new TextEncoder().encode(`${segments[0]}.${segments[1]}`));
  } catch {
    return { error: "crypto" };
  }

  const issuerMatches = validatorUrl(payload.issuer)?.origin === url.origin && validatorUrl(document.issuer)?.origin === url.origin;
  const issued = payload.issued_at ? Date.parse(payload.issued_at) : NaN;
  const issuedAtValid = Number.isFinite(issued) && issued <= Date.now() + CLOCK_SKEW_MS;
  const keyStatus = typeof jwk.status === "string" ? jwk.status : undefined;
  const keyActive = keyStatus === undefined || keyStatus === ACTIVE_KEY;
  let digestMatches: boolean | undefined;
  if (report !== undefined) {
    try {
      digestMatches = (await sha256Hex(canonical(JSON.parse(report) as Json))) === payload.report?.digest;
    } catch {
      return { error: "report" };
    }
  }
  return {
    signatureValid,
    issuerMatches,
    issuedAtValid,
    keyActive,
    authenticated: signatureValid && issuerMatches && keyActive && issuedAtValid,
    kid: header.kid,
    keyStatus,
    digestMatches,
    payload,
  };
}
