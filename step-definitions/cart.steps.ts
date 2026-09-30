import { createBdd, test } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { When, Then } = createBdd(test);

When('I add {string} to the cart', async ({ page }, productName: string) => {
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  await product.getByRole('button', { name: 'Add to cart' }).click();
});

Then('I see cart badge count as {string}', async ({ page }, count: string) => {
  await expect(page.locator('.shopping_cart_badge')).toHaveText(count);
});

Then('I see {string} in the cart', async ({ page }, productName: string) => {
  await page.locator('.shopping_cart_link').click();
  const cartItem = page.locator('.cart_item').filter({ hasText: productName });
  await expect(cartItem).toBeVisible();
});
