import { expect, test } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie qu'il y a un h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Vérifie qu'il y a des h2
    const h2s = page.locator('h2');
    expect(await h2s.count()).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie que toutes les images ont un alt
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/fr');
    
    // Tab à travers les éléments interactifs
    await page.keyboard.press('Tab');
    
    // Vérifie qu'un élément est focusé
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie les liens sociaux dans le footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    const socialLinks = page.locator('footer a[target="_blank"]');
    const count = await socialLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = socialLinks.nth(i);
      const ariaLabel = await link.getAttribute('aria-label');
      const text = await link.textContent();
      
      // Doit avoir soit un aria-label soit du texte
      expect(ariaLabel || text).toBeTruthy();
    }
  });

  test('should be navigable with keyboard only', async ({ page }) => {
    await page.goto('/fr');
    
    // Navigate to CTA button using Tab
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      
      const focusedElement = page.locator(':focus');
      if (await focusedElement.isVisible()) {
        const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
        // Vérifie que les éléments focusables sont des éléments interactifs
        expect(['a', 'button', 'input', 'select', 'textarea', 'span']).toContain(tagName);
      }
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile menu', async ({ page }) => {
    await page.goto('/fr');
    
    // Sur mobile, le menu devrait être caché ou dans un hamburger
    const mobileMenuButton = page.locator('[data-testid="mobile-menu"]').or(
      page.getByRole('button', { name: /menu/i })
    );
    
    // Si le bouton existe, le cliquer devrait ouvrir le menu
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      // Vérifie que le menu s'ouvre
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('should have readable text on mobile', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie que le h1 est visible et lisible
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Vérifie que le texte n'est pas trop petit
    const fontSize = await h1.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(24);
  });
});
