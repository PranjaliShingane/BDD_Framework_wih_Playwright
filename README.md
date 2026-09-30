# Playwright BDD Framework

This project is a beginner-friendly BDD automation framework built with Playwright, TypeScript, and Cucumber. It uses the SauceDemo website as the application under test and generates an HTML report after execution.

## A. Project architecture

```
playwright-bdd-framework/
├── features/
│   └── login.feature
├── step-definitions/
│   └── login.steps.ts
├── pages/
│   └── LoginPage.ts
├── hooks/
│   └── hooks.ts
├── config/
│   ├── config.ts
│   ├── .env.qa
│   └── .env.uat
├── test-runner/
│   └── runner.ts
├── utils/
│   └── helpers.ts
├── reports/
│   └── cucumber-report.html
├── screenshots/
│   └── failed-scenario.png
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── README.md
└── .gitignore
```

### Folder and file roles
- `features/`: Contains Gherkin feature files written in plain English scenarios.
- `step-definitions/`: Converts scenario steps into Playwright actions.
- `pages/`: Contains Page Object Model classes for UI actions and validations.
- `hooks/`: Contains `Before` and `After` hooks to manage browser lifecycle and screenshots.
- `config/`: Stores environment variables and environment-specific settings.
- `test-runner/`: Holds the script that executes the BDD suite and report generation.
- `utils/`: Reusable helper functions used across the framework.
- `reports/`: Generated HTML reports from Cucumber.
- `screenshots/`: Screenshots captured for failed scenarios.
- `playwright.config.ts`: Centralized browser configuration.
- `tsconfig.json`: TypeScript compiler settings.
- `package.json`: Dependencies and npm scripts.

## B. Installation commands

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install chromium
```

## C. How to install Playwright browsers

Playwright requires a browser engine before it can launch browsers. Run:

```bash
npx playwright install chromium
```

If you need other browsers later, use:

```bash
npx playwright install
```

## D. How to configure environment files

Environment files are under the `config/` folder:

- `config/.env.qa`
- `config/.env.uat`

Example content:

```env
BASE_URL=https://www.saucedemo.com/
USERNAME=standard_user
PASSWORD=secret_sauce
BROWSER=chromium
HEADLESS=true
TIMEOUT=30000
```

Select the active environment with:

```bash
TEST_ENV=qa
```

or

```bash
TEST_ENV=uat
```

## E. How to execute all BDD tests

Run the full BDD suite:

```bash
npm run test:bdd
```

## F. How to execute a specific feature

You can run a specific feature directly with Cucumber:

```bash
npx cucumber-js features/login.feature --require-module ts-node/register --require "step-definitions/**/*.ts" --require "hooks/**/*.ts" --require "pages/**/*.ts" --require "config/**/*.ts" --format html:reports/cucumber-report.html --format pretty
```

## G. How to execute a specific scenario/tag

Run by tag:

```bash
npx cucumber-js --tags "@smoke" features/**/*.feature --require-module ts-node/register --require "step-definitions/**/*.ts" --require "hooks/**/*.ts" --require "pages/**/*.ts" --require "config/**/*.ts" --format html:reports/cucumber-report.html --format pretty
```

Run by scenario name is also possible by using the scenario text in a `Given/When/Then` style, but tag execution is the simplest approach.

## H. How to run in headed mode

Use the provided script:

```bash
npm run test:bdd:headed
```

This sets `HEADLESS=false` so the browser is visible during execution.

## I. How to generate the HTML report

The HTML report is created automatically by the Cucumber formatter:

```bash
npm run test:bdd:html
```

The output is saved to:

```text
reports/cucumber-report.html
```

## J. How screenshots are captured on failure

The `After` hook checks each scenario result. If a scenario fails:

1. It captures a screen image with Playwright.
2. Saves it under `screenshots/`.
3. Attaches the image to the Cucumber report.
4. Closes the page, browser context, and browser properly.

This prevents resource leaks and makes debugging easier.

## K. How the framework works end-to-end

1. The feature file contains Gherkin scenarios.
2. Cucumber reads the `.feature` files and matches steps to definitions.
3. The step definition calls page methods from the `LoginPage` class.
4. The page object contains selectors and UI interactions.
5. Playwright opens a browser, creates a page, and performs the actions.
6. The browser interacts with SauceDemo.
7. Cucumber evaluates the paso outcome and records pass/fail status.
8. The HTML report is generated and screenshots are attached for failures.

## Execution flow

```text
Feature File
     ↓
Cucumber
     ↓
Step Definition
     ↓
Page Object
     ↓
Playwright
     ↓
Browser
     ↓
Application
     ↓
Cucumber Report
```

## Notes

- The credentials are loaded from the environment files and not hardcoded in test logic.
- The framework supports both `@smoke` and `@regression` tags.
- Browser resources are cleaned up in the `After` hook to avoid leaks.
- The project is ready for additional feature files and page objects as the application grows.
"# BDD_Framework_wih_Playwright" 
"# BDD_Playwright_Framework" 
