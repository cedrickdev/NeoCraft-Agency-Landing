# NeoCraft Agency Landing

Site vitrine professionnel pour **NeoCraft**, agence digitale basée à Lausanne (Suisse). Développé avec Next.js 16, React 19, TypeScript et Tailwind CSS.

## Stack technique

| Technologie | Usage |
|---|---|
| **Next.js 16** | Framework React (App Router, Server Components, Streaming) |
| **React 19** | Interface utilisateur |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styles utilitaires |
| **next-intl** | Internationalisation (FR/EN) |
| **Sentry** | Monitoring d'erreurs |
| **Resend** | Envoi d'emails transactionnels |
| **Wisp CMS** | Gestion du blog |
| **Framer Motion** | Animations |
| **shadcn/ui** | Composants UI |

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/cedrickdev/NeoCraft-Agency-Landing.git
cd NeoCraft-Agency-Landing

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# Lancer le serveur de développement
pnpm dev
```

## Variables d'environnement

Voir le fichier `.env.example` pour la liste complète des variables requises.

## Scripts disponibles

| Commande | Description |
|---|---|
| `pnpm dev` | Serveur de développement (port 3000) |
| `pnpm build` | Build de production |
| `pnpm start` | Démarrer le serveur de production |
| `pnpm lint` | Linter ESLint |
| `pnpm test` | Exécuter les tests unitaires (Vitest) |
| `pnpm test:e2e` | Exécuter les tests E2E (Playwright) |

## Architecture du projet

```
├── app/                    # App Router (pages, layouts, API routes)
│   ├── [locale]/           # Routes internationalisées (fr, en)
│   │   ├── about/          # Page À propos
│   │   ├── blog/           # Blog (Wisp CMS)
│   │   ├── outils/         # Page Outils
│   │   └── realisations/   # Page Réalisations
│   ├── api/                # API Routes (contact)
│   ├── robots.ts           # Robots.txt dynamique
│   └── sitemap.ts          # Sitemap dynamique
├── components/             # Composants React
│   ├── section/            # Sections de page (hero, services, etc.)
│   └── ui/                 # Composants UI (shadcn/ui)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilitaires et services
├── messages/               # Fichiers de traduction (fr.json, en.json)
├── public/                 # Assets statiques
└── __tests__/              # Tests unitaires
```

## Déploiement

Le projet est configuré pour un déploiement sur **Vercel**. Les pushes sur `main` déclenchent automatiquement un déploiement.

## Licence

Projet propriétaire - Tous droits réservés.
