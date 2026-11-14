import { uiTranslations } from "fumadocs-ui/i18n";
import { i18n } from "@/lib/i18n";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: "English" },
    fr: {
      displayName: "Français",
      "Back to Home(404 page)": "Retour à l'accueil",
      "Choose a language(language switcher)": "Choisir la langue",
      "Choose a language(language switcher)(aria-label)": "Choisir la langue",
      "Close Search(search dialog)(aria-label)": "Fermer la recherche",
      "Close Sidebar(aria-label)": "Fermer le menu",
      "Close Sidebar(sidebar)(aria-label)": "Fermer le menu",
      "Collapse Sidebar(sidebar)(aria-label)": "Replier le menu",
      "Copied Anchor Link(heading anchor)(aria-label)": "Lien copié",
      "Copied Markdown(page actions)": "Markdown copié",
      "Copied Text(code block)(aria-label)": "Copié",
      "Copy Anchor Link(heading anchor)(aria-label)": "Copier le lien",
      "Copy Markdown(page actions)": "Copier le Markdown",
      "Copy Text(code block)(aria-label)": "Copier",
      "Dark(theme switcher)(aria-label)": "Sombre",
      "Edit on GitHub(edit page)": "Modifier sur GitHub",
      "Hide Sidebar(sidebar)": "Masquer le menu",
      "Last updated on(page footer)": "Mis à jour le",
      "Light(theme switcher)(aria-label)": "Clair",
      "Next Page(pagination)": "Suivant",
      "No Headings(table of contents)": "Aucun titre",
      "No results found(search dialog)": "Aucun résultat",
      "On this page(table of contents)": "Sur cette page",
      "Open Search(search trigger)(aria-label)": "Rechercher",
      "Open Sidebar(sidebar)(aria-label)": "Ouvrir le menu",
      "Page Not Found(404 page)": "Page introuvable",
      "Previous Page(pagination)": "Précédent",
      "Search failed(search dialog)": "La recherche a échoué",
      "Search(search dialog)": "Rechercher",
      "Search(search trigger)": "Rechercher",
      "Show Sidebar(sidebar)": "Afficher le menu",
      "System(theme switcher)(aria-label)": "Système",
      "Table of Contents(inline table of contents)": "Sommaire",
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 page)":
        "Cette page n'existe pas ou a changé d'adresse.",
      "Toggle Menu(mobile menu)(aria-label)": "Menu",
      "Toggle Theme(theme switcher)(aria-label)": "Changer de thème",
    },
  });
