// Cucumber hooks manage browser lifecycle events before and after every scenario.
// The Before hook creates the browser, context, and page. The After hook cleans up resources.
import { After, Before, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../config/config';

setDefaultTimeout(config.timeout);

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function (this: any) {
  const headless = config.headless;

  browser = await chromium.launch({
    headless,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true
  });

  page = await context.newPage();

  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function (this: any, scenario) {
  const currentPage = this.page as Page | undefined;
  const currentContext = this.context as BrowserContext | undefined;
  const currentBrowser = this.browser as Browser | undefined;

  try {
    if (scenario.result?.status === Status.FAILED) {
      const safeName = (scenario.pickle?.name || 'failed_scenario')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
      const screenshotPath = path.resolve(__dirname, '../screenshots', `${Date.now()}_${safeName}.png`);

      await currentPage?.screenshot({ path: screenshotPath, fullPage: true });
      const image = fs.readFileSync(screenshotPath);
      await this.attach(image, 'image/png');
    }
  } catch (error) {
    console.error('Failed to capture screenshot for a failed scenario:', error);
  } finally {
    await currentPage?.close().catch(() => undefined);
    await currentContext?.close().catch(() => undefined);
    await currentBrowser?.close().catch(() => undefined);
  }
});
