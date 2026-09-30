// The Page Object Model (POM) keeps selectors and page interactions in one place.
// This makes tests easier to read and maintain as the application grows.
import { expect, Locator, Page } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly inventoryTitle: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.inventoryTitle = page.locator('.title');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(config.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
    await this.usernameInput.waitFor({ state: 'visible', timeout: config.timeout });
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.page.waitForURL(/.*inventory\.html/, { timeout: config.timeout });
    await this.inventoryTitle.waitFor({ state: 'visible', timeout: config.timeout });
    await expect(this.inventoryTitle).toBeVisible({ timeout: config.timeout });
    await expect(this.inventoryTitle).toHaveText('Products');
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  async verifyInvalidLogin(): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: config.timeout });
    await expect(this.errorMessage).toContainText('Username and password do not match any user in this service');
  }
}
