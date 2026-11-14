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
  gatewayNote: string;
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
    title: "One payment standard for Haiti.",
    lead: "Today each provider has its own API, its own error codes and its own way of confirming a payment, so a merchant who wants both MonCash and NatCash builds everything twice. OpenFSP proposes a common rule: one way to ask for a payment and learn its result, whatever the provider.",
    readDocs: "Read the docs",
    runDemo: "Run the demo",
    diagram: {
      without: "Without OpenFSP",
      with: "With OpenFSP",
      apps: ["Online shop", "Mobile app", "Billing system"],
      providers: ["MonCash", "NatCash", "Next provider"],
      gateway: "OpenFSP",
      hosted: "common standard",
      countWithout: "3 apps × 3 providers = 9 integrations",
      countWith: "3 apps + 3 providers = 6 integrations",
    },
    architecture: {
      title: "Usable right now",
      body: "MonCash and NatCash do not apply the standard yet. Until they do, a gateway bridges the gap: installed on your servers, it takes your requests in the OpenFSP format and passes them to each provider in its own format. When a provider adopts the standard, your applications can talk to it directly, with the same integration.",
      copy: {
        apps: { title: "Your applications", items: ["Online shop", "Mobile app", "Billing system"] },
        protocol: "OpenFSP format",
        servers: "Your servers",
        gateway: "OpenFSP gateway",
        gatewayNote: "bridges the gap for now",
        store: "Payment tracking",
        adapters: ["MonCash adapter", "NatCash adapter"],
        console: "Console",
        providerApis: "Each provider's format",
        providers: { title: "Providers", items: ["MonCash", "NatCash"], native: "Provider applying the standard", nativeNote: "no gateway needed" },
        guarantees: [
          {
            title: "One format",
            body: "Same request, same statuses, same error messages, whichever provider the customer picks.",
          },
          {
            title: "Never charged twice",
            body: "If the connection drops and your shop sends the request again, the customer is charged once.",
          },
          {
            title: "Your access stays with you",
            body: "The credentials MonCash and NatCash give you stay on your servers. Nobody else holds them.",
          },
          {
            title: "Money does not pass through it",
            body: "The customer pays straight into your account at the provider, as today. The gateway never touches the funds.",
          },
        ],
      },
    },
    flow: {
      title: "A payment, from click to confirmation",
      body: "A customer pays an order with MonCash. If MonCash applied the standard, the gateway would disappear from this picture: your shop would talk to MonCash directly, with the same messages.",
      copy: {
        lanes: ["Customer", "Shop", "Gateway", "MonCash"],
        pending: "Pending",
        succeeded: "Paid",
        play: "Play",
        pause: "Pause",
        steps: [
          { title: "The customer picks MonCash", body: "They confirm an order of 1,250 gourdes." },
          { title: "The shop asks for the payment", body: "One request, in the OpenFSP format. The payment is pending." },
          { title: "The gateway passes it to MonCash", body: "It gives the shop the link where the customer will confirm." },
          { title: "The customer confirms on their phone", body: "In the MonCash app, with their PIN. The shop never sees it." },
          { title: "MonCash confirms the payment", body: "The gateway checks the answer and marks the payment as paid. That status is final." },
          { title: "The shop is notified", body: "It receives a signed notice, checks that it comes from its own gateway and completes the order." },
        ],
      },
    },
    usage: {
      title: "Who it is for",
      roles: [
        {
          name: "Developers",
          goal: "Write it once.",
          steps: [
            "Test every case, failures included, on a simulator and without a merchant account.",
            "Write one integration for every provider.",
            "Add a provider without touching the application again.",
          ],
        },
        {
          name: "Merchants",
          goal: "Use it right now.",
          steps: [
            "Install the gateway on your servers to accept MonCash and NatCash.",
            "Follow every payment in the console.",
            "Keep your contracts and your accounts with each provider.",
          ],
        },
        {
          name: "Providers",
          goal: "Apply the standard.",
          steps: [
            "Offer the standard in your own API: every compatible application can accept you, with no gateway.",
            "Check your implementation with the conformance tests.",
            "Publish a signed attestation that anyone can check.",
          ],
        },
      ],
    },
    closing: {
      title: "Try it on your computer.",
      body: "The demo sets everything up locally: the gateway, a provider simulator, the console and a test shop. Place an order and follow the payment to its confirmation.",
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
    title: "Une norme de paiement commune pour Haïti.",
    lead: "Aujourd'hui, chaque opérateur impose son API, ses codes d'erreur et sa façon de confirmer un paiement. Un marchand qui veut accepter MonCash et NatCash doit donc tout développer deux fois. OpenFSP propose une règle commune : une seule façon de demander un paiement et d'en connaître le résultat, quel que soit l'opérateur.",
    readDocs: "Lire la documentation",
    runDemo: "Lancer la démo",
    diagram: {
      without: "Sans OpenFSP",
      with: "Avec OpenFSP",
      apps: ["Boutique", "Appli mobile", "Facturation"],
      providers: ["MonCash", "NatCash", "Autre opérateur"],
      gateway: "OpenFSP",
      hosted: "norme commune",
      countWithout: "3 applications × 3 opérateurs = 9 intégrations",
      countWith: "3 applications + 3 opérateurs = 6 intégrations",
    },
    architecture: {
      title: "Utilisable dès maintenant",
      body: "MonCash et NatCash n'appliquent pas encore la norme. En attendant, une passerelle fait le lien : installée sur vos serveurs, elle reçoit vos demandes au format OpenFSP et les transmet à chaque opérateur dans son propre format. Le jour où un opérateur adopte la norme, vos applications s'adressent à lui directement, avec la même intégration.",
      copy: {
        apps: { title: "Vos applications", items: ["Boutique", "Appli mobile", "Facturation"] },
        protocol: "Format OpenFSP",
        servers: "Vos serveurs",
        gateway: "Passerelle OpenFSP",
        gatewayNote: "fait le lien en attendant",
        store: "Suivi des paiements",
        adapters: ["Adaptateur MonCash", "Adaptateur NatCash"],
        console: "Console",
        providerApis: "Format de chaque opérateur",
        providers: {
          title: "Opérateurs",
          items: ["MonCash", "NatCash"],
          native: "Opérateur qui applique la norme",
          nativeNote: "aucune passerelle nécessaire",
        },
        guarantees: [
          {
            title: "Un seul format",
            body: "Même demande, mêmes statuts, mêmes messages d'erreur, quel que soit l'opérateur choisi par le client.",
          },
          {
            title: "Jamais débité deux fois",
            body: "Si la connexion coupe et que votre boutique renvoie la demande, le client n'est débité qu'une fois.",
          },
          {
            title: "Vos accès restent chez vous",
            body: "Les identifiants que vous donnent MonCash et NatCash restent sur vos serveurs. Personne d'autre ne les détient.",
          },
          {
            title: "L'argent ne passe pas par elle",
            body: "Le client paie directement sur votre compte chez l'opérateur, comme aujourd'hui. La passerelle ne touche jamais aux fonds.",
          },
        ],
      },
    },
    flow: {
      title: "Un paiement, du clic à la confirmation",
      body: "Un client paie une commande avec MonCash. Si MonCash appliquait la norme, la passerelle disparaîtrait de ce schéma : votre boutique s'adresserait directement à MonCash, avec les mêmes messages.",
      copy: {
        lanes: ["Client", "Boutique", "Passerelle", "MonCash"],
        pending: "En attente",
        succeeded: "Payé",
        play: "Lecture",
        pause: "Pause",
        steps: [
          { title: "Le client choisit MonCash", body: "Il valide une commande de 1 250 gourdes." },
          { title: "La boutique demande le paiement", body: "Une seule demande, au format OpenFSP. Le paiement est en attente." },
          { title: "La passerelle transmet à MonCash", body: "Elle renvoie à la boutique le lien où le client va confirmer." },
          { title: "Le client confirme sur son téléphone", body: "Dans l'application MonCash, avec son code. La boutique ne le voit jamais." },
          { title: "MonCash confirme le paiement", body: "La passerelle vérifie la réponse et marque le paiement comme payé. Ce statut est définitif." },
          { title: "La boutique est prévenue", body: "Elle reçoit un avis signé, vérifie qu'il vient bien de sa passerelle et valide la commande." },
        ],
      },
    },
    usage: {
      title: "À qui elle sert",
      roles: [
        {
          name: "Développeurs",
          goal: "Coder une seule fois.",
          steps: [
            "Tester tous les cas, échecs compris, sur un simulateur et sans compte marchand.",
            "Écrire une seule intégration pour tous les opérateurs.",
            "Ajouter un opérateur sans retoucher l'application.",
          ],
        },
        {
          name: "Marchands",
          goal: "S'en servir dès maintenant.",
          steps: [
            "Installer la passerelle sur vos serveurs pour encaisser avec MonCash et NatCash.",
            "Suivre chaque paiement dans la console.",
            "Garder vos contrats et vos comptes chez chaque opérateur.",
          ],
        },
        {
          name: "Opérateurs",
          goal: "Appliquer la norme.",
          steps: [
            "Proposer la norme dans votre propre API : toutes les applications compatibles vous acceptent, sans passerelle.",
            "Vérifier votre implémentation avec les tests de conformité.",
            "Publier une attestation signée que chacun peut contrôler.",
          ],
        },
      ],
    },
    closing: {
      title: "Essayez-la sur votre ordinateur.",
      body: "La démo installe tout en local : la passerelle, un simulateur des opérateurs, la console et une boutique de test. Passez une commande et suivez le paiement jusqu'à la confirmation.",
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
