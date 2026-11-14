import type { DiagramCopy } from "@/components/integration-diagram";
import type { Locale } from "@/lib/i18n";

export type ChapterSlug = "data-model" | "lifecycle" | "idempotency" | "payments-api" | "capabilities" | "webhooks" | "authentication" | "conformance";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface HomeCopy {
  title: string;
  lead: string;
  readSpec: string;
  quickstart: string;
  status: string;
  request: string;
  response: string;
  flow: { title: string; body: string };
  diagram: DiagramCopy;
  spec: { title: string; body: (rules: number) => string; rules: string; chapters: Record<ChapterSlug, { name: string; body: string }> };
  demo: { title: string; body: string; cta: string };
  footer: { about: string; columns: FooterColumn[] };
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: "An open payment protocol for Haiti.",
    lead: "One HTTP contract between merchant applications and payment providers. The merchant hosts the gateway, and the gateway speaks it to MonCash and NatCash.",
    readSpec: "Read the specification",
    quickstart: "Quickstart",
    status: "Draft 0.1.0, Apache-2.0. A proposal: no provider or regulator has adopted it.",
    request: "Request",
    response: "Response",
    flow: {
      title: "Integrate once on each side.",
      body: "Every provider is integrated once, in the gateway. Every application integrates once, with the protocol. A provider that adopts OpenFSP natively needs no adapter at all.",
    },
    diagram: {
      without: "Without OpenFSP",
      with: "With OpenFSP",
      apps: ["Online shop", "Mobile app", "Billing system"],
      providers: ["MonCash", "NatCash", "Next provider"],
      gateway: "OpenFSP gateway",
      hosted: "hosted by the merchant",
      countWithout: "3 apps × 3 providers = 9 integrations",
      countWith: "3 apps + 3 providers = 6 integrations",
    },
    spec: {
      title: "The specification",
      body: (rules) => `${rules} numbered rules in eight chapters. Each rule has its own link, and its number is the same in English and French.`,
      rules: "rules",
      chapters: {
        "data-model": { name: "Data model", body: "Money, phone numbers, identifiers, timestamps, fees, metadata." },
        lifecycle: { name: "Payment lifecycle", body: "States, transitions, expiration and reconciliation." },
        idempotency: { name: "Idempotency", body: "How a client retries a write without paying twice." },
        "payments-api": { name: "Payments API", body: "Endpoints, the Payment resource and the error catalogue." },
        capabilities: { name: "Capabilities and limits", body: "What each provider supports, and its amount limits." },
        webhooks: { name: "Webhooks", body: "Delivery, signatures, ordering and retries." },
        authentication: { name: "Authentication", body: "API keys, scopes, rotation and provider secrets." },
        conformance: { name: "Conformance", body: "Levels, the test suite, the mock server and the attestation." },
      },
    },
    demo: {
      title: "Run it locally.",
      body: "Docker starts the gateway, the simulator, the console and a demo shop. Pay an order and watch the webhook arrive.",
      cta: "Quickstart",
    },
    footer: {
      about: "A research project of the MBDS master, carried by Karako Systems.",
      columns: [
        {
          title: "Docs",
          links: [
            { label: "Introduction", href: "/docs" },
            { label: "Quickstart", href: "/docs/quickstart" },
            { label: "Architecture", href: "/docs/architecture" },
          ],
        },
        {
          title: "Reference",
          links: [
            { label: "Provider registry", href: "/docs/registry" },
            { label: "Verify an attestation", href: "/docs/verify" },
            { label: "Decisions", href: "/docs/decisions" },
          ],
        },
      ],
    },
  },
  fr: {
    title: "Un protocole de paiement ouvert pour Haïti.",
    lead: "Un seul contrat HTTP entre les applications marchandes et les opérateurs de paiement. Le marchand héberge la passerelle, qui le parle à MonCash et NatCash.",
    readSpec: "Lire la spécification",
    quickstart: "Démarrage rapide",
    status: "Brouillon 0.1.0, Apache-2.0. C'est une proposition : aucun opérateur ni régulateur ne l'a adoptée.",
    request: "Requête",
    response: "Réponse",
    flow: {
      title: "Une intégration de chaque côté.",
      body: "Chaque opérateur est intégré une fois, dans la passerelle. Chaque application s'intègre une fois, au protocole. Un opérateur qui adopte OpenFSP nativement n'a besoin d'aucun adaptateur.",
    },
    diagram: {
      without: "Sans OpenFSP",
      with: "Avec OpenFSP",
      apps: ["Boutique", "Appli mobile", "Facturation"],
      providers: ["MonCash", "NatCash", "Autre opérateur"],
      gateway: "Passerelle OpenFSP",
      hosted: "hébergée par le marchand",
      countWithout: "3 applications × 3 opérateurs = 9 intégrations",
      countWith: "3 applications + 3 opérateurs = 6 intégrations",
    },
    spec: {
      title: "La spécification",
      body: (rules) => `${rules} règles numérotées en huit chapitres. Chaque règle a son lien, et son numéro est le même en anglais et en français.`,
      rules: "règles",
      chapters: {
        "data-model": { name: "Modèle de données", body: "Montants, numéros de téléphone, identifiants, dates, frais, métadonnées." },
        lifecycle: { name: "Cycle de vie du paiement", body: "États, transitions, expiration et rapprochement." },
        idempotency: { name: "Idempotence", body: "Comment un client renvoie une écriture sans payer deux fois." },
        "payments-api": { name: "API des paiements", body: "Points d'accès, ressource Payment et catalogue des erreurs." },
        capabilities: { name: "Capacités et plafonds", body: "Ce que chaque opérateur prend en charge, et ses plafonds." },
        webhooks: { name: "Webhooks", body: "Livraison, signature, ordre et renvois." },
        authentication: { name: "Authentification", body: "Clés d'API, portées, rotation et secrets des opérateurs." },
        conformance: { name: "Conformité", body: "Niveaux, suite de tests, serveur simulé et attestation." },
      },
    },
    demo: {
      title: "Lancez-la chez vous.",
      body: "Docker démarre la passerelle, le serveur simulé, la console et une boutique de démonstration. Payez une commande et regardez le webhook arriver.",
      cta: "Démarrage rapide",
    },
    footer: {
      about: "Projet de recherche du master MBDS, porté par Karako Systems.",
      columns: [
        {
          title: "Docs",
          links: [
            { label: "Introduction", href: "/docs" },
            { label: "Démarrage rapide", href: "/docs/quickstart" },
            { label: "Architecture", href: "/docs/architecture" },
          ],
        },
        {
          title: "Référence",
          links: [
            { label: "Registre des opérateurs", href: "/docs/registry" },
            { label: "Vérifier une attestation", href: "/docs/verify" },
            { label: "Décisions", href: "/docs/decisions" },
          ],
        },
      ],
    },
  },
};
