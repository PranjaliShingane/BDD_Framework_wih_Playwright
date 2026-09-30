// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login functionality', () => {

  test('Successful login with valid credentials', { tag: ['@smoke'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter valid username and password', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('I should be successfully logged in', null, { page }); 
  });

  test('Login with invalid credentials', { tag: ['@regression'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter invalid username and password', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('I should see an error message for invalid credentials', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I enter valid username and password","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should be successfully logged in","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":16,"tags":["@regression"],"steps":[{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I enter invalid username and password","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see an error message for invalid credentials","stepMatchArguments":[]}]},
]; // bdd-data-end