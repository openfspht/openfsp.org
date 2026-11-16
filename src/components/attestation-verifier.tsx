import { useState, type FormEvent } from "react";
import { MAX_ATTESTATION_SIZE, MAX_REPORT_SIZE, verifyAttestation, type Verification } from "@/lib/attestation";

const copy = {
  en: {
    jws: "Attestation",
    validator: "Validator",
    report: "Report (optional, to check its digest)",
    choose: "Choose a file",
    noFile: "No file",
    submit: "Verify",
    checking: "Checking",
    signature: "Signature",
    issuer: "Issuer matches the chosen validator",
    issued: "Issue date present and not in the future",
    keyInactive: "The validator marks the key {kid} as {status}, not active: its signature does not authenticate this attestation.",
    scope: "Scope",
    scopeBody: "One configuration at the recorded date. Changes to the implementation or protocol require another run; no calendar expiry is specified.",
    trust:
      "Choose a validator you trust. A valid signature proves what its key signed, not that the validator is independent or that a provider endorses OpenFSP.",
    unauthenticated: "Unverified data: run verdicts are hidden because the signature, issuer, key status or issue date check failed.",
    local: "For a local demo use http://localhost:5176; development uses http://localhost:8095. The public validator is not deployed yet.",
    key: "Key",
    digest: "Report digest",
    valid: "valid",
    invalid: "invalid",
    matches: "matches the report",
    mismatch: "differs from the report",
    notChecked: "not checked",
    target: "Target",
    date: "Date",
    suite: "Suite",
    core: "Core",
    profiles: "Profiles",
    errors: {
      size: "Attestation limit: 1 MiB. Report limit: 10 MiB.",
      validator: "Enter an HTTPS validator origin, or HTTP on localhost for development, without a path or credentials.",
      unexpected: "Verification could not finish. Check the inputs and try again.",
      format: "This text is not a compact JWS (three base64url segments).",
      type: "This JWS is not an OpenFSP conformance attestation.",
      keys: "Could not read the validator's keys. Check its URL and your connection.",
      unknownKey: "The validator does not publish the key {kid}.",
      crypto: "This browser cannot verify Ed25519. Use a recent Chrome, Firefox or Safari.",
      report: "The report is not valid JSON.",
    },
  },
  fr: {
    jws: "Attestation",
    validator: "Validateur",
    report: "Rapport (facultatif, pour vérifier son empreinte)",
    choose: "Choisir un fichier",
    noFile: "Aucun fichier",
    submit: "Vérifier",
    checking: "Vérification",
    signature: "Signature",
    issuer: "Émetteur identique au validateur choisi",
    issued: "Date d’émission présente et non future",
    keyInactive: "Le validateur indique la clé {kid} comme {status}, et non active : sa signature n’authentifie pas cette attestation.",
    scope: "Portée",
    scopeBody:
      "Une configuration à la date indiquée. Un changement d’implémentation ou de protocole demande une nouvelle exécution ; aucune expiration calendaire n’est définie.",
    trust:
      "Choisissez un validateur de confiance. Une signature valide prouve ce que sa clé a signé, pas l’indépendance du validateur ni le soutien d’un opérateur à OpenFSP.",
    unauthenticated:
      "Données non authentifiées : les verdicts sont masqués car la signature, l’identité de l’émetteur, le statut de la clé ou la date d’émission n’a pas été vérifié.",
    local: "Démo locale : http://localhost:5176 ; développement : http://localhost:8095. Le validateur public n’est pas encore déployé.",
    key: "Clé",
    digest: "Empreinte du rapport",
    valid: "valide",
    invalid: "invalide",
    matches: "conforme au rapport",
    mismatch: "différente du rapport",
    notChecked: "non vérifiée",
    target: "Cible",
    date: "Date",
    suite: "Suite",
    core: "Core",
    profiles: "Profils",
    errors: {
      size: "Limite : 1 Mio pour l’attestation, 10 Mio pour le rapport.",
      validator: "Indiquez l’origine HTTPS du validateur, ou HTTP sur localhost en développement, sans chemin ni identifiants.",
      unexpected: "La vérification n’a pas abouti. Vérifiez les données et réessayez.",
      format: "Ce texte n'est pas un JWS compact (trois segments base64url).",
      type: "Ce JWS n'est pas une attestation de conformité OpenFSP.",
      keys: "Impossible de lire les clés du validateur. Vérifiez son URL et votre connexion.",
      unknownKey: "Le validateur ne publie pas la clé {kid}.",
      crypto: "Ce navigateur ne vérifie pas Ed25519. Utilisez une version récente de Chrome, Firefox ou Safari.",
      report: "Le rapport n'est pas un JSON valide.",
    },
  },
};

type Success = Extract<Verification, { signatureValid: boolean }>;

const field = "w-full rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fd-ring";

function Verdict({ ok, children }: { ok: boolean; children: string }) {
  return <span className={ok ? "font-medium text-fd-success" : "font-medium text-fd-error"}>{children}</span>;
}

export function AttestationVerifier({ locale = "en" }: { locale?: "en" | "fr" }) {
  const t = copy[locale];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Success>();
  const [fileName, setFileName] = useState<string>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(undefined);
    setResult(undefined);
    const data = new FormData(event.currentTarget);
    const file = data.get("report");
    const field = (name: string) => {
      const value = data.get(name);
      return typeof value === "string" ? value : "";
    };
    try {
      if (field("jws").length > MAX_ATTESTATION_SIZE || (file instanceof File && file.size > MAX_REPORT_SIZE)) {
        setError(t.errors.size);
        return;
      }
      const report = file instanceof File && file.size > 0 ? await file.text() : undefined;
      const outcome = await verifyAttestation(field("jws").trim(), field("validator"), report);
      if ("error" in outcome) setError(t.errors[outcome.error].replace("{kid}", "kid" in outcome ? outcome.kid : ""));
      else setResult(outcome);
    } catch {
      setError(t.errors.unexpected);
    } finally {
      setBusy(false);
    }
  }

  const authenticated = result?.authenticated;
  const payload = authenticated ? result.payload : undefined;
  const core = payload?.verdicts?.core;
  const rows: [string, React.ReactNode][] = result
    ? [
        [t.signature, <Verdict ok={result.signatureValid}>{result.signatureValid ? t.valid : t.invalid}</Verdict>],
        [t.issuer, <Verdict ok={result.issuerMatches}>{result.issuerMatches ? t.valid : t.invalid}</Verdict>],
        [t.issued, result.signatureValid ? <Verdict ok={result.issuedAtValid}>{result.issuedAtValid ? t.valid : t.invalid}</Verdict> : t.notChecked],
        [t.scope, t.scopeBody],
        [
          t.key,
          result.keyStatus ? (
            <>
              {result.kid} (<Verdict ok={result.keyActive}>{result.keyStatus}</Verdict>)
            </>
          ) : (
            result.kid
          ),
        ],
        [
          t.digest,
          !authenticated || result.digestMatches === undefined ? (
            t.notChecked
          ) : (
            <Verdict ok={result.digestMatches}>{result.digestMatches ? t.matches : t.mismatch}</Verdict>
          ),
        ],
        [t.target, `${payload?.target?.kind ?? ""} ${payload?.target?.base_url ?? ""}`.trim()],
        [t.date, payload?.run?.date ?? payload?.issued_at ?? ""],
        [t.suite, [payload?.suite?.version, payload?.suite?.protocol_version].filter(Boolean).join(" / ")],
        [t.core, typeof core === "string" ? core : (core?.verdict ?? "")],
        [
          t.profiles,
          (payload?.verdicts?.profiles ?? [])
            .map((profile: { capability?: string; name?: string; verdict?: string }) => `${profile.capability ?? profile.name}: ${profile.verdict}`)
            .join(", "),
        ],
      ]
    : [];

  return (
    <div className="not-prose my-6 space-y-6">
      <p className="text-sm leading-relaxed">{t.trust}</p>
      <form onSubmit={submit} aria-busy={busy} className="space-y-4 rounded-xl border border-fd-border bg-fd-card p-5">
        <label className="block space-y-1.5 text-sm font-medium">
          <span>{t.jws}</span>
          <textarea
            name="jws"
            required
            maxLength={MAX_ATTESTATION_SIZE}
            rows={4}
            spellCheck={false}
            className={`${field} font-mono text-xs`}
            placeholder="eyJhbGciOiJFZERTQSIs..."
          />
        </label>
        <label className="block space-y-1.5 text-sm font-medium">
          <span>{t.validator}</span>
          <input name="validator" type="url" required placeholder="https://validator.example" className={`${field} font-mono`} />
        </label>
        <p className="text-sm leading-relaxed text-fd-muted-foreground">{t.local}</p>
        <div className="space-y-1.5 text-sm">
          <span className="block font-medium">{t.report}</span>
          <label className="flex items-center gap-3">
            <input
              name="report"
              type="file"
              accept="application/json,.json"
              className="peer sr-only"
              onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name)}
            />
            <span className="btn min-h-9 cursor-pointer px-3 text-sm peer-focus-visible:ring-2 peer-focus-visible:ring-fd-ring">{t.choose}</span>
            <span className="truncate text-fd-muted-foreground">{fileName ?? t.noFile}</span>
          </label>
        </div>
        <button type="submit" disabled={busy} className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {busy ? t.checking : t.submit}
        </button>
      </form>
      {error && (
        <p role="alert" className="rounded-lg border border-fd-error/40 bg-fd-error/10 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <div role="status" aria-live="polite" aria-atomic="true">
        {busy ? t.checking : ""}
      </div>
      {result && !authenticated && (
        <p role="alert" className="rounded-lg border border-fd-error p-4">
          {result.keyActive ? t.unauthenticated : t.keyInactive.replace("{kid}", result.kid).replace("{status}", result.keyStatus ?? "")}
        </p>
      )}
      {result && (
        <dl aria-label={t.jws} className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-6 gap-y-2 rounded-xl border border-fd-border p-5 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-fd-muted-foreground">{label}</dt>
              <dd className="min-w-0 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
