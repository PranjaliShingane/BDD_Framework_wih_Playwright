// Step definitions connect the Gherkin language in the feature file to Playwright actions.
// These steps call methods from the LoginPage object to keep the code organized and reusable.
import { Given, When, Then } from '@cucumber/cucumber';
import { config } from '../config/config';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I navigate to the login page', async function (this: any) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToLoginPage();
});

When('I enter valid username and password', async function () {
  await loginPage.enterUsername(config.username);
  await loginPage.enterPassword(config.password);
});

When('I enter invalid username and password', async function () {
  await loginPage.enterUsername('locked_out_user');
  await loginPage.enterPassword('wrong_password');
});

When('I click the login button', async function () {
  await loginPage.clickLogin();
});

Then('I should be successfully logged in', async function () {
  await loginPage.verifySuccessfulLogin();
});

Then('I should see an error message for invalid credentials', async function () {
  await loginPage.verifyInvalidLogin();
});
