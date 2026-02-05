import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage in French by default', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie que la page se charge
    await expect(page).toHaveURL('/fr');
    
    // Vérifie le titre
    await expect(page).toHaveTitle(/NeoCraft/);
  });

  test('should display the hero section', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie que le hero est visible
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    
    // Vérifie les boutons CTA
    await expect(page.getByRole('button', { name: /devis/i })).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/fr');
    
    // Vérifie la navigation
    const nav = page.locator('header nav');
    await expect(nav).toBeVisible();
    
    // Vérifie les liens de navigation
    await expect(page.getByRole('link', { name: /À propos/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Services/i })).toBeVisible();
  });

  test('should scroll to sections when clicking nav links', async ({ page }) => {
    await page.goto('/fr');
    
    // Clique sur le lien Services
    await page.getByRole('link', { name: /Services/i }).click();
    
    // Attend un peu pour le scroll smooth
    await page.waitForTimeout(500);
    
    // Vérifie que la section Services est visible
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();
  });
});

test.describe('Dark Mode', () => {
  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/fr');
    
    // Trouve et clique sur le toggle dark mode
    const darkModeToggle = page.locator('[data-testid="dark-mode-toggle"]').or(
      page.getByRole('button', { name: /dark|light|theme/i })
    );
    
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      
      // Vérifie que la classe dark est ajoutée au HTML
      await expect(page.locator('html')).toHaveClass(/dark/);
    }
  });
});

test.describe('Footer', () => {
  test('should display footer with social links', async ({ page }) => {
    await page.goto('/fr');
    
    // Scroll jusqu'au footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Vérifie que le footer est visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Vérifie les liens sociaux
    await expect(page.locator('footer a[href*="linkedin"]')).toBeVisible();
  });
});
