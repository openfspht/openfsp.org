import type { DiagramCopy } from "@/components/integration-diagram";
import type { Locale } from "@/lib/i18n";

interface HomeCopy {
  title: string;
  lead: string;
  readDocs: string;
  runDemo: string;
  status: string;
  diagram: DiagramCopy;
  diagramCaption: string;
  api: { title: string; body: string; points: { text: string; rule: string; href: string }[] };
  parts: { title: string; items: { name: string; body: string; href: string }[] };
  demo: { title: string; body: string; cta: string };
  footer: string;
  decisions: string;
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: "One payment contract for Haiti.",
    lead: "OpenFSP is an open standard and a gateway you host. Your application speaks one protocol, and the gateway speaks to MonCash, NatCash and the providers that follow.",
    readDocs: "Read the docs",
    runDemo: "Run the demo",
    status: "Draft specification 0.1.0. Apache-2.0. A proposal: no provider or regulator has adopted it.",
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
    diagramCaption:
      "Every provider is integrated once, in the gateway. Every application integrates once, with the protocol. A provider that adopts OpenFSP natively needs no adapter at all.",
    api: {
      title: "A payment is one request.",
      body: "Plain HTTP and JSON. The same call works for every provider, and a retry with the same key never pays twice.",
      points: [
        { text: "Every write carries an idempotency key.", rule: "idempotency 1.3", href: "/docs/spec/idempotency#1.3" },
        { text: "The client picks the provider, never the gateway.", rule: "API 5.1.1", href: "/docs/spec/payments-api#5.1.1" },
        { text: "One pending status, four terminal ones.", rule: "lifecycle 1", href: "/docs/spec/lifecycle#1" },
        { text: "Reading a payment never calls the provider.", rule: "API 5.2.4", href: "/docs/spec/payments-api#5.2.4" },
      ],
    },
    parts: {
      title: "What ships",
      items: [
        { name: "Specification", body: "564 numbered rules: data model, lifecycle, idempotency, API, webhooks, authentication.", href: "/docs/spec" },
        { name: "Gateway", body: "A server the merchant hosts. OpenFSP in, provider APIs out. It never holds funds.", href: "/docs/architecture" },
        { name: "Simulator", body: "MonCash, NatCash and a native provider, failures included, without a merchant account.", href: "/docs/quickstart" },
        {
          name: "Conformance suite",
          body: "Runs the rules against an implementation and signs an attestation anyone can check.",
          href: "/docs/spec/conformance",
        },
      ],
    },
    demo: {
      title: "Run it in five minutes.",
      body: "Docker starts the gateway, the simulator, the console and a demo shop. Pay an order and watch the webhook arrive.",
      cta: "Quickstart",
    },
    footer: "OpenFSP, a research project of the MBDS master. Carried by Karako Systems.",
    decisions: "Decisions",
  },
  fr: {
    title: "Un seul contrat de paiement pour Haïti.",
    lead: "OpenFSP est une norme ouverte et une passerelle que vous hébergez. Votre application parle un seul protocole, et la passerelle parle à MonCash, NatCash et aux opérateurs qui suivront.",
    readDocs: "Lire la documentation",
    runDemo: "Lancer la démo",
    status: "Spécification en brouillon, version 0.1.0. Apache-2.0. C'est une proposition : aucun opérateur ni régulateur ne l'a adoptée.",
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
    diagramCaption:
      "Chaque opérateur est intégré une fois, dans la passerelle. Chaque application s'intègre une fois, au protocole. Un opérateur qui adopte OpenFSP nativement n'a besoin d'aucun adaptateur.",
    api: {
      title: "Un paiement, une requête.",
      body: "HTTP et JSON, rien de plus. Le même appel sert pour tous les opérateurs, et un renvoi avec la même clé ne paie jamais deux fois.",
      points: [
        { text: "Toute écriture porte une clé d'idempotence.", rule: "idempotence 1.3", href: "/docs/spec/idempotency#1.3" },
        { text: "Le client choisit l'opérateur, jamais la passerelle.", rule: "API 5.1.1", href: "/docs/spec/payments-api#5.1.1" },
        { text: "Un statut en attente, quatre statuts terminaux.", rule: "cycle de vie 1", href: "/docs/spec/lifecycle#1" },
        { text: "Lire un paiement n'appelle jamais l'opérateur.", rule: "API 5.2.4", href: "/docs/spec/payments-api#5.2.4" },
      ],
    },
    parts: {
      title: "Ce qui est livré",
      items: [
        {
          name: "Spécification",
          body: "564 règles numérotées : modèle de données, cycle de vie, idempotence, API, webhooks, authentification.",
          href: "/docs/spec",
        },
        {
          name: "Passerelle",
          body: "Un serveur que le marchand héberge. OpenFSP en entrée, API des opérateurs en sortie. Elle ne détient jamais de fonds.",
          href: "/docs/architecture",
        },
        { name: "Serveur simulé", body: "MonCash, NatCash et un opérateur natif, défaillances comprises, sans compte marchand.", href: "/docs/quickstart" },
        {
          name: "Suite de conformité",
          body: "Applique les règles à une implémentation et signe une attestation que chacun peut vérifier.",
          href: "/docs/spec/conformance",
        },
      ],
    },
    demo: {
      title: "En marche en cinq minutes.",
      body: "Docker démarre la passerelle, le serveur simulé, la console et une boutique de démonstration. Payez une commande et regardez le webhook arriver.",
      cta: "Démarrage rapide",
    },
    footer: "OpenFSP, projet de recherche du master MBDS. Porté par Karako Systems.",
    decisions: "Décisions",
  },
};
