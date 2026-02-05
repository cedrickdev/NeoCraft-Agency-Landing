import { expect, test } from '@playwright/test';

test.describe('Internationalization', () => {
  test('should switch from French to English', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForLoadState('networkidle');
    
    // Trouve le sélecteur de langue dans le header
    const enButton = page.locator('header').getByText('EN', { exact: true });
    await expect(enButton).toBeVisible();
    
    // Change la langue
    await enButton.click();
    
    // Vérifie la navigation vers /en
    await expect(page).toHaveURL(/\/en/, { timeout: 10000 });
  });

  test('should switch from English to French', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    
    // Trouve le sélecteur de langue dans le header
    const frButton = page.locator('header').getByText('FR', { exact: true });
    await expect(frButton).toBeVisible();
    
    // Change la langue
    await frButton.click();
    
    // Vérifie la navigation vers /fr
    await expect(page).toHaveURL(/\/fr/, { timeout: 10000 });
  });

  test('should preserve scroll position when switching language', async ({ page }) => {
    await page.goto('/fr');
    
    // Attend que la page soit complètement chargée
    await page.waitForLoadState('networkidle');
    
    // Scroll vers une section visible (le footer par exemple)
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'instant' });
      } else {
        window.scrollTo(0, document.body.scrollHeight / 2);
      }
    });
    await page.waitForTimeout(500);
    
    // Récupère la position de scroll
    const scrollBefore = await page.evaluate(() => window.scrollY);
    
    // Skip le test si on n'a pas pu scroller (page trop petite)
    if (scrollBefore < 100) {
      test.skip();
      return;
    }
    
    // Change la langue
    const enButton = page.getByText('EN', { exact: true });
    await enButton.click();
    
    // Attend la navigation
    await page.waitForURL(/\/en/);
    await page.waitForTimeout(800);
    
    // Vérifie que la position est préservée (avec une marge d'erreur de 50%)
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBeGreaterThan(scrollBefore * 0.3);
  });

  test('should display correct meta tags for each locale', async ({ page }) => {
    // Test French
    await page.goto('/fr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    
    // Test English
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('should have hreflang tags', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie qu'il y a au moins une balise hreflang pour chaque langue
    const hreflangFrCount = await page.locator('link[hreflang="fr"]').count();
    const hreflangEnCount = await page.locator('link[hreflang="en"]').count();
    
    expect(hreflangFrCount).toBeGreaterThanOrEqual(1);
    expect(hreflangEnCount).toBeGreaterThanOrEqual(1);
  });
});
