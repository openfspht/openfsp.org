import type { DiagramCopy } from "@/components/integration-diagram";
import type { Locale } from "@/lib/i18n";

interface Item {
  title: string;
  body: string;
}

export interface ArchitectureCopy {
  apps: { title: string; items: [string, string, string] };
  protocol: string;
  servers: string;
  gateway: string;
  store: string;
  adapters: [string, string];
  console: string;
  providerApis: string;
  providers: { title: string; items: [string, string]; native: string; nativeNote: string };
  guarantees: [Item, Item, Item, Item];
}

export interface FlowCopy {
  lanes: [string, string, string, string];
  pending: string;
  succeeded: string;
  play: string;
  pause: string;
  steps: Item[];
}

interface HomeCopy {
  title: string;
  lead: string;
  readDocs: string;
  runDemo: string;
  diagram: DiagramCopy;
  architecture: { title: string; body: string; copy: ArchitectureCopy };
  flow: { title: string; body: string; copy: FlowCopy };
  usage: { title: string; roles: { name: string; goal: string; steps: string[] }[] };
  closing: { title: string; body: string; github: string };
  footer: { about: string; columns: { title: string; links: { label: string; href: string }[] }[] };
}

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    title: "Accept MonCash and NatCash with one integration.",
    lead: "Each Haitian provider has its own API, its own errors and its own way of confirming a payment. OpenFSP sets one contract for all of them, and a gateway you run on your own servers translates it for each provider.",
    readDocs: "Read the docs",
    runDemo: "Run the demo",
    diagram: {
      without: "Without OpenFSP",
      with: "With OpenFSP",
      apps: ["Online shop", "Mobile app", "Billing system"],
      providers: ["MonCash", "NatCash", "Next provider"],
      gateway: "OpenFSP gateway",
      hosted: "on your servers",
      countWithout: "3 apps × 3 providers = 9 integrations",
      countWith: "3 apps + 3 providers = 6 integrations",
    },
    architecture: {
      title: "What runs where",
      body: "The gateway is yours. It sits between your applications and the providers, keeps the record of every payment, and holds no money.",
      copy: {
        apps: { title: "Your applications", items: ["Online shop", "Mobile app", "Billing system"] },
        protocol: "OpenFSP",
        servers: "Your servers",
        gateway: "OpenFSP gateway",
        store: "Payment history and audit trail",
        adapters: ["MonCash adapter", "NatCash adapter"],
        console: "Console",
        providerApis: "Provider APIs",
        providers: { title: "Providers", items: ["MonCash", "NatCash"], native: "Native provider", nativeNote: "speaks OpenFSP, no adapter" },
        guarantees: [
          {
            title: "One contract",
            body: "The same request, the same statuses and the same error format, whichever provider the customer picks.",
          },
          {
            title: "No double charge",
            body: "If the network drops and your shop sends the payment again, the customer is charged once.",
          },
          {
            title: "Secrets stay home",
            body: "Provider keys live in the adapters, on your servers. There is no hosted service to trust and no shared tenant.",
          },
          {
            title: "No money in transit",
            body: "Funds go from the payer to your account at the provider, as they do today. The gateway only gives instructions.",
          },
        ],
      },
    },
    flow: {
      title: "One payment, step by step",
      body: "A customer pays an order with MonCash. Six messages, two of them signed, and a status that changes once.",
      copy: {
        lanes: ["Customer", "Your shop", "Gateway", "MonCash"],
        pending: "Pending",
        succeeded: "Paid",
        play: "Play",
        pause: "Pause",
        steps: [
          { title: "The customer pays", body: "They choose MonCash at checkout for 1,250.00 HTG." },
          {
            title: "Your shop creates the payment",
            body: "It sends one request to the gateway. The payment is pending.",
          },
          {
            title: "The gateway opens the order at MonCash",
            body: "It answers with the page where the customer confirms.",
          },
          { title: "The customer confirms on MonCash", body: "On their phone, in the provider's own flow. Your shop never sees their PIN." },
          {
            title: "MonCash confirms to the gateway",
            body: "The gateway checks the answer and marks the payment paid. A paid payment never changes again.",
          },
          {
            title: "Your shop is notified",
            body: "The gateway sends a signed notice. The shop checks that it comes from its gateway and marks the order paid.",
          },
        ],
      },
    },
    usage: {
      title: "Who uses it",
      roles: [
        {
          name: "Developers",
          goal: "Integrate once.",
          steps: [
            "Try every payment case on a simulator, without a merchant account.",
            "Write one integration, whatever the provider.",
            "Add a provider by configuring the gateway, without touching your application.",
          ],
        },
        {
          name: "Merchants",
          goal: "Keep control.",
          steps: [
            "Run the gateway and its database on your own servers.",
            "Follow every payment and every notice in the console.",
            "Keep your contracts and accounts with each provider as they are.",
          ],
        },
        {
          name: "Providers",
          goal: "Be integrated everywhere at once.",
          steps: [
            "Speak OpenFSP directly, or let the gateway use an adapter.",
            "Run the conformance tests.",
            "Publish the signed attestation, which anyone can verify.",
          ],
        },
      ],
    },
    closing: {
      title: "Try it on your machine.",
      body: "The demo starts the gateway, a simulator, the console and a demo shop on your computer. Pay an order with MonCash or NatCash and watch it get confirmed.",
      github: "GitHub",
    },
    footer: {
      about: "A research project of the MBDS master, carried by Karako Systems. Apache-2.0.",
      columns: [
        {
          title: "Docs",
          links: [
            { label: "Introduction", href: "/docs" },
            { label: "Architecture", href: "/docs/architecture" },
            { label: "Specification", href: "/docs/spec" },
          ],
        },
        {
          title: "Project",
          links: [
            { label: "Decisions", href: "/docs/decisions" },
            { label: "Provider registry", href: "/docs/registry" },
            { label: "Verify an attestation", href: "/docs/verify" },
          ],
        },
      ],
    },
  },
  fr: {
    title: "Acceptez MonCash et NatCash avec une seule intégration.",
    lead: "Chaque opérateur haïtien a son API, ses erreurs et sa façon de confirmer un paiement. OpenFSP fixe un seul contrat pour tous, et une passerelle installée sur vos serveurs le traduit pour chaque opérateur.",
    readDocs: "Lire la documentation",
    runDemo: "Lancer la démo",
    diagram: {
      without: "Sans OpenFSP",
      with: "Avec OpenFSP",
      apps: ["Boutique", "Appli mobile", "Facturation"],
      providers: ["MonCash", "NatCash", "Autre opérateur"],
      gateway: "Passerelle OpenFSP",
      hosted: "sur vos serveurs",
      countWithout: "3 applications × 3 opérateurs = 9 intégrations",
      countWith: "3 applications + 3 opérateurs = 6 intégrations",
    },
    architecture: {
      title: "Qui fait tourner quoi",
      body: "La passerelle vous appartient. Elle se place entre vos applications et les opérateurs, garde la trace de chaque paiement et ne détient aucun fonds.",
      copy: {
        apps: { title: "Vos applications", items: ["Boutique", "Appli mobile", "Facturation"] },
        protocol: "OpenFSP",
        servers: "Vos serveurs",
        gateway: "Passerelle OpenFSP",
        store: "Historique des paiements et audit",
        adapters: ["Adaptateur MonCash", "Adaptateur NatCash"],
        console: "Console",
        providerApis: "API des opérateurs",
        providers: { title: "Opérateurs", items: ["MonCash", "NatCash"], native: "Opérateur natif", nativeNote: "parle OpenFSP, sans adaptateur" },
        guarantees: [
          {
            title: "Un seul contrat",
            body: "La même requête, les mêmes statuts et le même format d'erreur, quel que soit l'opérateur choisi par le client.",
          },
          {
            title: "Jamais deux débits",
            body: "Si le réseau coupe et que votre boutique renvoie le paiement, le client n'est débité qu'une fois.",
          },
          {
            title: "Les secrets restent chez vous",
            body: "Les clés des opérateurs vivent dans les adaptateurs, sur vos serveurs. Aucun service hébergé, aucun locataire partagé.",
          },
          {
            title: "Aucun fonds en transit",
            body: "L'argent va du payeur à votre compte chez l'opérateur, comme aujourd'hui. La passerelle ne fait que donner des instructions.",
          },
        ],
      },
    },
    flow: {
      title: "Un paiement, étape par étape",
      body: "Un client paie une commande avec MonCash. Six messages, dont deux signés, et un statut qui change une seule fois.",
      copy: {
        lanes: ["Client", "Votre boutique", "Passerelle", "MonCash"],
        pending: "En attente",
        succeeded: "Payé",
        play: "Lecture",
        pause: "Pause",
        steps: [
          { title: "Le client paie", body: "Il choisit MonCash au moment de payer 1 250,00 HTG." },
          {
            title: "Votre boutique crée le paiement",
            body: "Elle envoie une seule requête à la passerelle. Le paiement est en attente.",
          },
          {
            title: "La passerelle ouvre la commande chez MonCash",
            body: "Elle répond avec la page où le client confirme.",
          },
          { title: "Le client confirme chez MonCash", body: "Sur son téléphone, dans le parcours de l'opérateur. Votre boutique ne voit jamais son code." },
          {
            title: "MonCash confirme à la passerelle",
            body: "La passerelle vérifie la réponse et marque le paiement payé. Un paiement payé ne change plus.",
          },
          {
            title: "Votre boutique est prévenue",
            body: "La passerelle envoie un avis signé. La boutique vérifie qu'il vient bien de sa passerelle et marque la commande payée.",
          },
        ],
      },
    },
    usage: {
      title: "Qui s'en sert",
      roles: [
        {
          name: "Développeurs",
          goal: "Intégrer une fois.",
          steps: [
            "Essayer tous les cas de paiement sur un simulateur, sans compte marchand.",
            "Écrire une seule intégration, quel que soit l'opérateur.",
            "Ajouter un opérateur en configurant la passerelle, sans toucher à l'application.",
          ],
        },
        {
          name: "Marchands",
          goal: "Garder la main.",
          steps: [
            "Faire tourner la passerelle et sa base sur vos propres serveurs.",
            "Suivre chaque paiement et chaque avis dans la console.",
            "Garder vos contrats et vos comptes chez chaque opérateur tels qu'ils sont.",
          ],
        },
        {
          name: "Opérateurs",
          goal: "Être intégré partout d'un coup.",
          steps: [
            "Parler OpenFSP directement, ou laisser la passerelle passer par un adaptateur.",
            "Passer les tests de conformité.",
            "Publier l'attestation signée, que chacun peut vérifier.",
          ],
        },
      ],
    },
    closing: {
      title: "Essayez-la sur votre machine.",
      body: "La démo démarre la passerelle, un simulateur, la console et une boutique sur votre ordinateur. Payez une commande avec MonCash ou NatCash et regardez-la se confirmer.",
      github: "GitHub",
    },
    footer: {
      about: "Projet de recherche du master MBDS, porté par Karako Systems. Apache-2.0.",
      columns: [
        {
          title: "Docs",
          links: [
            { label: "Introduction", href: "/docs" },
            { label: "Architecture", href: "/docs/architecture" },
            { label: "Spécification", href: "/docs/spec" },
          ],
        },
        {
          title: "Projet",
          links: [
            { label: "Décisions", href: "/docs/decisions" },
            { label: "Registre des opérateurs", href: "/docs/registry" },
            { label: "Vérifier une attestation", href: "/docs/verify" },
          ],
        },
      ],
    },
  },
};
