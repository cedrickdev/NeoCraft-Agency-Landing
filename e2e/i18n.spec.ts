import { expect, test } from '@playwright/test';

test.describe('Internationalization', () => {
  test('should switch from French to English', async ({ page }) => {
    await page.goto('/fr');
    
    // Trouve le sélecteur de langue
    const enButton = page.getByText('EN', { exact: true });
    await expect(enButton).toBeVisible();
    
    // Change la langue
    await enButton.click();
    
    // Vérifie la navigation vers /en
    await expect(page).toHaveURL(/\/en/);
  });

  test('should switch from English to French', async ({ page }) => {
    await page.goto('/en');
    
    // Trouve le sélecteur de langue
    const frButton = page.getByText('FR', { exact: true });
    await expect(frButton).toBeVisible();
    
    // Change la langue
    await frButton.click();
    
    // Vérifie la navigation vers /fr
    await expect(page).toHaveURL(/\/fr/);
  });

  test('should preserve scroll position when switching language', async ({ page }) => {
    await page.goto('/fr');
    
    // Scroll vers le bas
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    
    // Récupère la position de scroll
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore).toBeGreaterThan(500);
    
    // Change la langue
    const enButton = page.getByText('EN', { exact: true });
    await enButton.click();
    
    // Attend la navigation
    await page.waitForURL(/\/en/);
    await page.waitForTimeout(500);
    
    // Vérifie que la position est préservée (avec une marge d'erreur)
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter).toBeGreaterThan(400);
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
    
    // Vérifie les balises hreflang
    const hreflangFr = page.locator('link[hreflang="fr"]');
    const hreflangEn = page.locator('link[hreflang="en"]');
    
    await expect(hreflangFr).toHaveCount(1);
    await expect(hreflangEn).toHaveCount(1);
  });
});
