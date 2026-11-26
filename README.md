# Teledram — Plateforme de dramas courts (premium)

Application web de streaming de séries courtes verticales, inspirée de DramaBox / NetShort / ReelShort.
Interface **ultra-premium**, sombre et cinématique, **100 % sans compte** : tout fonctionne localement.

## Fonctionnalités

- **Accueil** — carrousel héros automatique (barres de progression, lecture au clic), rails horizontaux : Tendances (top 6 numéroté), Nouveautés, Reprendre la lecture, par genre.
- **Lecteur vidéo custom** — lecture/pause, seek, ±10 s, son, plein écran, épisode suivant automatique, sauvegarde de progression.
- **Fiche série** — affiche, synopsis, distribution, tags, liste d'épisodes avec barre de progression par épisode, suggestions.
- **Recherche** — instantanée (titre, acteur, genre, tag) + filtres par genre.
- **Ma liste** — favoris + « Reprendre la lecture » (progression par épisode), effaçable.
- **PWA** — installable sur mobile et desktop (manifest + service worker, cache réseau-d'abord pour les pages).
- **Sans login** — favoris et historique stockés dans le navigateur (localStorage).

## Stack

React 18 + TypeScript + Vite + Tailwind CSS. Icônes SVG inline, posters générés par IA (2 affiches) + affiches typographiques vectorielles (8), extraits vidéo CC0 regradés en local (`public/videos`).

## Lancer le projet

```bash
npm install
npm run dev        # développement (http://localhost:3000)
npm run build      # production -> dist/
```

## Déploiement GitHub Pages

Le dépôt contient `.github/workflows/deploy.yml` : chaque push sur `main` build le site
et le publie sur GitHub Pages (paramètre Pages : source « GitHub Actions »).

## Licence des médias

- Affiches `public/assets/poster-heritier.jpg`, `poster-loup.jpg` : générées par IA pour ce projet.
- Extraits vidéo : dérivés (recadrés, regradés) d'un clip CC0 (MDN interactive-examples, flower.mp4).
- Icône et affiches typographiques : créées pour ce projet.
