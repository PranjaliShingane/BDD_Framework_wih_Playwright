import { createBdd, test } from 'playwright-bdd';
import { config } from '../../config/config';
import { LoginPage } from '../../pages/LoginPage';

const { Given, When, Then } = createBdd(test);

Given('I navigate to the login view', async ({ page }) => {
  await new LoginPage(page).navigateToLoginPage();
});

Given('I navigate to the login page', async ({ page }) => {
  await new LoginPage(page).navigateToLoginPage();
});

When('I execute login with {string} and {string}', async ({ page }, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickLogin();
});

When('I enter valid username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
});

When('I enter invalid username and password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.enterUsername('locked_out_user');
  await loginPage.enterPassword('wrong_password');
});

When('I click the login button', async ({ page }) => {
  await new LoginPage(page).clickLogin();
});

Then('I should be successfully logged in', async ({ page }) => {
  await new LoginPage(page).verifySuccessfulLogin();
});

Then('I should see an error message for invalid credentials', async ({ page }) => {
  await new LoginPage(page).verifyInvalidLogin();
});