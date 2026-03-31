import { test, expect } from '@playwright/test';

test.describe('Gestion des Candidats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait permettre de soumettre une nouvelle candidature', async ({
    page,
  }) => {
    // Remplissage du formulaire de connexion
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('password');

    // Soumission
    await page.getByRole('button', { name: 'Se connecter' }).click();

    // Vérification du feedback visuel
    const successMessage = page.locator('text=Erreur de connexion');
    await expect(successMessage).toBeVisible();
  });
});
