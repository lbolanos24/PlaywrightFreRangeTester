import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.freerangetesters.com/');
  await page.getByRole('link', { name: 'Cursos', exact: true }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: '¿Qué curso me conviene?' }).click();
  const page1 = await page1Promise;
});