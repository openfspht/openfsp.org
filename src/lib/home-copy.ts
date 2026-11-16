import type { Locale } from "@/lib/i18n";

export const homeCopy = {
  fr: {
    title: "Une norme ouverte pour les paiements en Haïti",
    headline: ["Une norme.", "Une API.", "Un seul SDK."],
    lead: "Intégrez une fois, connectez plusieurs services de paiement en Haïti. OpenFSP propose une API commune pour accepter les paiements des opérateurs compatibles sans multiplier les intégrations.",
    primary: "Lire la norme",
    secondary: "Explorer l’API",
    facts: ["Apache-2.0", "Implémentable par tous", "Paiements en HTG"],
    native: {
      title: "Une API que chaque opérateur peut implémenter.",
      caption: "Architecture visée",
      app: "Application marchande",
      contract: "SDK OpenFSP",
      contractDetail: "HTTP et webhooks signés",
      providers: "Opérateurs qui adoptent la norme",
      api: "API OpenFSP natives",
      note: "Connexion directe à chaque opérateur compatible.",
      action: "Implémenter la norme côté opérateur",
      steps: [
        {
          title: "L’opérateur implémente OpenFSP",
          body: "Il expose le contrat commun dans son propre système et déclare les capacités qu’il prend en charge.",
        },
        {
          title: "Le marchand intègre un seul SDK",
          body: "L’application utilise la même bibliothèque chez chaque opérateur compatible. Seuls les identifiants et la configuration changent.",
        },
        {
          title: "La connexion devient directe",
          body: "L’application parle directement à l’API de chaque opérateur.",
        },
      ],
    },
    contract: {
      title: "Le contrat tient en quelques requêtes HTTP et des webhooks signés.",
      body: "Créez un paiement, retrouvez-le après une coupure et vérifiez les notifications reçues.",
      links: [
        {
          title: "API des paiements",
          body: "Création, consultation et synchronisation.",
          href: "/docs/spec/payments-api",
        },
        {
          title: "Webhooks signés",
          body: "Authentifier les notifications reçues.",
          href: "/docs/spec/webhooks",
        },
        {
          title: "Suite de conformité",
          body: "Tester une implémentation et ses limites.",
          href: "/docs/spec/conformance",
        },
      ],
      event: "Événement reçu par la boutique",
      payload: "Extrait du corps d’un événement simulé",
      docs: "Voir le format complet",
    },
    gateway: {
      title: "En attendant l’adoption, une passerelle traduit le contrat.",
      body: "La passerelle de référence reçoit les demandes OpenFSP et les traduit vers les API de MonCash et NatCash. Le marchand peut ainsi utiliser la norme avec ces services dès maintenant.",
      link: "Pourquoi la passerelle existe",
    },
    start: {
      title: "Lancer un premier paiement en local.",
      body: "La démo lance une boutique et des opérateurs simulés. La suite de conformité teste aussi un opérateur natif simulé.",
      action: "Ouvrir le guide de démarrage",
      requirements: "Git, Make et Docker Compose",
      copy: "Copier les commandes",
      copied: "Copié",
      copyError: "Copie indisponible, sélectionnez le code.",
    },
    status: {
      title: "Où en est le projet",
      body: "La spécification, les SDK et la suite de conformité sont prêts. Le validateur est accessible sur validate.openfsp.org. La démo tourne en local avec des opérateurs simulés.",
      phases: [
        {
          title: "Phase 1, en cours",
          body: "Contrat d’intégration marchande, implémentations de référence et conformité reproductible.",
        },
        {
          title: "SDK disponibles",
          body: "Kotlin, Java et TypeScript, avec leurs outils de test. Maven Central et npm à partir de la version 0.1.0.",
        },
        {
          title: "Phase 2, envisagée",
          body: "Paiement de proximité par jeton éphémère présenté par le client. Ce parcours ne fait pas partie de la version actuelle.",
        },
      ],
      link: "Périmètre et phases",
    },
    footer: {
      description:
        "Une norme ouverte entre applications marchandes et fournisseurs de services de paiement.",
      docs: "Documentation",
      project: "Projet",
      source: "Code source",
      quickstart: "Démarrage rapide",
      spec: "Spécification",
      architecture: "Architecture",
      registry: "Registre des opérateurs",
      decisions: "Décisions",
      verify: "Vérifier une attestation",
      note: "Karako Systems · Apache-2.0",
    },
  },
  en: {
    title: "An open standard for payments in Haiti",
    headline: ["One standard.", "One API.", "One SDK."],
    lead: "Integrate once, connect several payment services in Haiti. OpenFSP offers a common API to accept payments from compatible providers without multiplying integrations.",
    primary: "Read the standard",
    secondary: "Explore the API",
    facts: ["Apache-2.0", "Open to any implementer", "Payments in HTG"],
    native: {
      title: "One API that each provider can implement.",
      caption: "Target architecture",
      app: "Merchant application",
      contract: "OpenFSP SDK",
      contractDetail: "HTTP and signed webhooks",
      providers: "Providers adopting the standard",
      api: "Native OpenFSP APIs",
      note: "A direct connection to each compatible provider.",
      action: "Implement the standard as a provider",
      steps: [
        {
          title: "The provider implements OpenFSP",
          body: "It exposes the shared contract in its own system and declares the capabilities it supports.",
        },
        {
          title: "The merchant integrates one SDK",
          body: "The application uses the same library with every compatible provider. Only credentials and configuration change.",
        },
        {
          title: "The connection becomes direct",
          body: "The application talks to each provider’s API directly.",
        },
      ],
    },
    contract: {
      title: "The contract is a few HTTP requests and signed webhooks.",
      body: "Create a payment, recover it after a lost connection and verify incoming notifications.",
      links: [
        {
          title: "Payments API",
          body: "Create, retrieve and synchronize.",
          href: "/docs/spec/payments-api",
        },
        {
          title: "Signed webhooks",
          body: "Authenticate incoming notifications.",
          href: "/docs/spec/webhooks",
        },
        {
          title: "Conformance suite",
          body: "Test an implementation and its limits.",
          href: "/docs/spec/conformance",
        },
      ],
      event: "Event received by the shop",
      payload: "Excerpt from a simulated event body",
      docs: "See the full format",
    },
    gateway: {
      title: "Until providers adopt it, a gateway translates the contract.",
      body: "The reference gateway accepts OpenFSP requests and translates them into the MonCash and NatCash APIs. Merchants can use the standard with these services today.",
      link: "Why the gateway exists",
    },
    start: {
      title: "Run a first payment locally.",
      body: "The demo starts a shop and simulated providers. The conformance suite also tests a simulated native provider.",
      action: "Open the quickstart guide",
      requirements: "Git, Make and Docker Compose",
      copy: "Copy commands",
      copied: "Copied",
      copyError: "Copy unavailable, select the code.",
    },
    status: {
      title: "Where the project stands",
      body: "The specification, SDKs and conformance suite are ready. The validator runs at validate.openfsp.org. The demo runs locally with simulated providers.",
      phases: [
        {
          title: "Phase 1, in progress",
          body: "Merchant integration contract, reference implementations and reproducible conformance.",
        },
        {
          title: "SDKs available",
          body: "Kotlin, Java and TypeScript, with testing tools. Maven Central and npm from release 0.1.0.",
        },
        {
          title: "Phase 2, envisaged",
          body: "Proximity payments with a short-lived token presented by the customer. This flow is not part of the current version.",
        },
      ],
      link: "Scope and phases",
    },
    footer: {
      description: "An open standard between merchant applications and payment service providers.",
      docs: "Documentation",
      project: "Project",
      source: "Source code",
      quickstart: "Quickstart",
      spec: "Specification",
      architecture: "Architecture",
      registry: "Provider registry",
      decisions: "Decisions",
      verify: "Verify an attestation",
      note: "Karako Systems · Apache-2.0",
    },
  },
} satisfies Record<Locale, unknown>;
