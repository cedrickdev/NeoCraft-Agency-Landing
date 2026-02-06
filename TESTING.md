# Guide des Tests - NeoCraft

## Stack de Tests

| Outil | Type | Description |
|-------|------|-------------|
| **Vitest** | Unit/Component | Tests rapides pour composants et utilitaires |
| **React Testing Library** | Component | Tests de composants React |
| **Playwright** | E2E | Tests end-to-end multi-navigateurs |

---

## Commandes Vitest (Tests Unitaires)

### Lancer tous les tests
```bash
pnpm test
```

### Mode watch (relance automatique)
```bash
pnpm test -- --watch
```

### Interface visuelle
```bash
pnpm test:ui
```

### Rapport de couverture
```bash
pnpm test:coverage
```

### Lancer un fichier spécifique
```bash
pnpm test Button
# ou
pnpm test __tests__/components/Button.test.tsx
```

### Lancer les tests correspondant à un pattern
```bash
pnpm test -- --grep "renders"
```

### Mode verbose
```bash
pnpm test -- --reporter=verbose
```

---

## Commandes Playwright (Tests E2E)

### Lancer tous les tests E2E
```bash
pnpm test:e2e
```

### Interface visuelle Playwright
```bash
pnpm test:e2e:ui
```

### Voir le rapport HTML
```bash
pnpm test:e2e:report
```

### Lancer en mode headed (voir le navigateur)
```bash
pnpm exec playwright test --headed
```

### Lancer un fichier spécifique
```bash
pnpm exec playwright test e2e/homepage.spec.ts
```

### Lancer un test spécifique par nom
```bash
pnpm exec playwright test -g "should load the homepage"
```

### Lancer sur un navigateur spécifique
```bash
# Chromium uniquement
pnpm exec playwright test --project=chromium

# Mobile uniquement
pnpm exec playwright test --project=mobile
```

### Mode debug
```bash
pnpm exec playwright test --debug
```

### Générer du code de test
```bash
pnpm exec playwright codegen http://localhost:3000/fr
```

### Mettre à jour les snapshots
```bash
pnpm exec playwright test --update-snapshots
```

---

## Structure des Tests

```
├── __tests__/                    # Tests unitaires (Vitest)
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── LanguageSwitcher.test.tsx
│   └── utils/
│       └── date.test.ts
├── e2e/                          # Tests E2E (Playwright)
│   ├── accessibility.spec.ts
│   ├── homepage.spec.ts
│   └── i18n.spec.ts
├── vitest.config.ts              # Configuration Vitest
├── vitest.setup.ts               # Setup et mocks globaux
└── playwright.config.ts          # Configuration Playwright
```

---

## Écrire un Nouveau Test

### Test Unitaire (Vitest)

```typescript
// __tests__/components/MonComposant.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MonComposant from '@/components/MonComposant';

describe('MonComposant', () => {
  it('renders correctly', () => {
    render(<MonComposant />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test E2E (Playwright)

```typescript
// e2e/ma-feature.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Ma Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/fr');
    await expect(page.getByText('Bienvenue')).toBeVisible();
  });
});
```

---

## CI/CD

Les tests sont configurés pour s'exécuter en CI. Variables importantes :

```bash
# En CI, Playwright utilise 1 worker et fait 2 retries
CI=true pnpm test:e2e
```

---

## Dépannage

### Playwright ne trouve pas les navigateurs
```bash
pnpm exec playwright install
```

### Les tests E2E échouent car le serveur n'est pas lancé
```bash
# Le serveur démarre automatiquement, mais vous pouvez le lancer manuellement
pnpm dev &
pnpm test:e2e
```

### Voir les traces d'erreur Playwright
```bash
pnpm exec playwright show-trace trace.zip
```

### Nettoyer le cache Vitest
```bash
rm -rf node_modules/.vitest
```
