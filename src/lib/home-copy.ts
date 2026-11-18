import type { Locale } from "@/lib/i18n";

export const homeCopy = {
    fr: {
        title: "Une spécification ouverte pour l’interopérabilité des paiements en Haïti",
        headline: [
            "Une interface commune.",
            "Des échanges normalisés.",
            "Des intégrations réutilisables.",
        ],
        lead: "OpenFSP définit une interface commune entre les applications marchandes et les fournisseurs de services de paiement en Haïti. La spécification normalise les échanges et les comportements attendus afin de faciliter l’intégration des services compatibles.",
        primary: "Consulter la spécification",
        secondary: "Consulter l’API",
        facts: ["Apache-2.0", "Implémentable librement", "Devise : HTG"],
        native: {
            title: "Une interface commune implémentée par chaque fournisseur.",
            caption: "Architecture d’intégration native",
            app: "Application marchande",
            contract: "Bibliothèque cliente OpenFSP",
            contractDetail: "Interface HTTP et notifications signées",
            providers: "Fournisseurs implémentant OpenFSP",
            api: "Interfaces OpenFSP natives",
            note: "Communication directe avec l’interface OpenFSP de chaque fournisseur compatible.",
            action: "Consulter le guide d’implémentation fournisseur",
            steps: [
                {
                    title: "Implémentation par le fournisseur",
                    body: "Le fournisseur expose l’interface OpenFSP dans son système et déclare les capacités effectivement prises en charge.",
                },
                {
                    title: "Intégration dans l’application marchande",
                    body: "L’application réutilise le contrat d’interface commun. Sa configuration et ses parcours de paiement tiennent compte des capacités déclarées par chaque fournisseur.",
                },
                {
                    title: "Communication avec le fournisseur",
                    body: "L’application échange directement avec l’API OpenFSP du fournisseur, au moyen des identifiants du marchand.",
                },
            ],
        },
        contract: {
            title: "Un contrat d’interface pour les opérations de paiement et les notifications.",
            body: "La spécification définit la création et la lecture des paiements, ainsi que la vérification des notifications d’événements.",
            links: [
                {
                    title: "API des paiements",
                    body: "Création et lecture des paiements.",
                    href: "/docs/spec/payments-api",
                },
                {
                    title: "Notifications signées",
                    body: "Authentification et traitement des événements reçus.",
                    href: "/docs/spec/webhooks",
                },
                {
                    title: "Suite de conformité",
                    body: "Évaluation des exigences applicables et indication des limites de vérification.",
                    href: "/docs/spec/conformance",
                },
            ],
            event: "Événement reçu par l’application marchande",
            payload: "Extrait d’un événement produit en simulation",
            docs: "Consulter le format de l’événement",
        },
        gateway: {
            title: "Une passerelle pour l’intégration des API existantes.",
            body: "La passerelle de référence traduit les requêtes OpenFSP vers les API existantes de MonCash et NatCash. Elle fournit un mode d’intégration transitoire ; l’état des vérifications et leurs limites sont documentés.",
            link: "Consulter le rôle de la passerelle",
        },
        start: {
            title: "Exécuter un paiement simulé en environnement local.",
            body: "L’environnement de démonstration comprend une application marchande et des services de paiement simulés. La suite de conformité peut également évaluer une implémentation native simulée.",
            action: "Consulter le guide de démarrage",
            requirements: "Prérequis : Git, Make et Docker Compose",
            copy: "Copier les commandes",
            copied: "Commandes copiées",
            copyError:
                "La copie automatique est indisponible. Sélectionnez les commandes pour les copier.",
        },
        status: {
            title: "État de développement et périmètre de validation",
            body: "La version 0.1.0 comprend la spécification, les bibliothèques clientes et la suite de conformité. Un validateur est accessible sur validate.openfsp.org. L’environnement de démonstration s’exécute localement avec des services simulés.",
            phases: [
                {
                    title: "Phase 1 : développement en cours",
                    body: "Définition de l’interface d’intégration marchande, implémentations de référence et vérifications de conformité reproductibles.",
                },
                {
                    title: "Bibliothèques clientes",
                    body: "Les bibliothèques et leurs outils de test accompagnent la version 0.1.0. Leurs modalités d’installation sont décrites dans la documentation technique.",
                },
                {
                    title: "Phase 2 : extension envisagée",
                    body: "Paiement de proximité fondé sur un jeton éphémère présenté par le client. Ce parcours se situe hors du périmètre de la version actuelle.",
                },
            ],
            link: "Consulter le périmètre et les phases",
        },
        footer: {
            description:
                "Spécification ouverte d’interopérabilité entre applications marchandes et fournisseurs de services de paiement.",
            docs: "Documentation",
            project: "Projet",
            source: "Code source",
            quickstart: "Démarrage rapide",
            spec: "Spécification",
            architecture: "Architecture",
            registry: "Registre des opérateurs",
            decisions: "Décisions de conception",
            verify: "Vérification d’une attestation",
            note: "Karako Systems · Apache-2.0",
        },
    },
    en: {
        title: "An open specification for payment interoperability in Haiti",
        headline: ["A common interface.", "Standardised exchanges.", "Reusable integrations."],
        lead: "OpenFSP defines a common interface between merchant applications and payment service providers in Haiti. The specification standardises exchanges and expected behaviour to support the integration of compatible payment services.",
        primary: "Read the specification",
        secondary: "Explore the API",
        facts: ["Apache-2.0", "Open to all implementers", "Currency: HTG"],
        native: {
            title: "A common interface implemented by each provider.",
            caption: "Native integration architecture",
            app: "Merchant application",
            contract: "OpenFSP client library",
            contractDetail: "HTTP interface and signed notifications",
            providers: "Providers implementing OpenFSP",
            api: "Native OpenFSP interfaces",
            note: "Direct communication with each compatible provider’s OpenFSP interface.",
            action: "Read the provider implementation guide",
            steps: [
                {
                    title: "Provider implementation",
                    body: "The provider exposes the OpenFSP interface in its system and declares the capabilities it actually supports.",
                },
                {
                    title: "Merchant application integration",
                    body: "The application reuses the common interface contract. Its configuration and payment flows account for each provider’s declared capabilities.",
                },
                {
                    title: "Provider communication",
                    body: "The application communicates directly with the provider’s OpenFSP API using the merchant’s credentials.",
                },
            ],
        },
        contract: {
            title: "An interface contract for payment operations and notifications.",
            body: "The specification defines payment creation and retrieval, together with the verification of event notifications.",
            links: [
                {
                    title: "Payments API",
                    body: "Payment creation and retrieval.",
                    href: "/docs/spec/payments-api",
                },
                {
                    title: "Signed notifications",
                    body: "Authentication and processing of incoming events.",
                    href: "/docs/spec/webhooks",
                },
                {
                    title: "Conformance suite",
                    body: "Assessment of applicable requirements and disclosure of verification limits.",
                    href: "/docs/spec/conformance",
                },
            ],
            event: "Event received by the merchant application",
            payload: "Excerpt from an event produced in simulation",
            docs: "View the event format",
        },
        gateway: {
            title: "A gateway for integrating existing APIs.",
            body: "The reference gateway translates OpenFSP requests into the existing MonCash and NatCash APIs. It provides a transitional integration option; verification status and limitations are documented.",
            link: "Read about the gateway’s role",
        },
        start: {
            title: "Run a simulated payment locally.",
            body: "The demonstration environment includes a merchant application and simulated payment services. The conformance suite can also assess a simulated native implementation.",
            action: "Read the quickstart guide",
            requirements: "Requirements: Git, Make and Docker Compose",
            copy: "Copy commands",
            copied: "Commands copied",
            copyError: "Automatic copying is unavailable. Select the commands to copy them.",
        },
        status: {
            title: "Development status and validation scope",
            body: "Version 0.1.0 includes the specification, client libraries and conformance suite. A validator is available at validate.openfsp.org. The demonstration environment runs locally with simulated services.",
            phases: [
                {
                    title: "Phase 1: development in progress",
                    body: "Definition of the merchant integration interface, reference implementations and reproducible conformance checks.",
                },
                {
                    title: "Client libraries",
                    body: "Client libraries and testing tools accompany version 0.1.0. Installation instructions are provided in the technical documentation.",
                },
                {
                    title: "Phase 2: proposed extension",
                    body: "Proximity payments based on a short-lived token presented by the customer. This flow is outside the scope of the current version.",
                },
            ],
            link: "View scope and development phases",
        },
        footer: {
            description:
                "An open interoperability specification for merchant applications and payment service providers.",
            docs: "Documentation",
            project: "Project",
            source: "Source code",
            quickstart: "Quickstart",
            spec: "Specification",
            architecture: "Architecture",
            registry: "Provider registry",
            decisions: "Design decisions",
            verify: "Attestation verification",
            note: "Karako Systems · Apache-2.0",
        },
    },
} satisfies Record<Locale, unknown>;
