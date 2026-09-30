// Playwright configuration object used by the browser automation layer.
// This file keeps browser settings centralized so they are easy to adjust.
export const playwrightConfig = {
  browserName: (process.env.BROWSER || 'chromium').toLowerCase(),
  headless: (process.env.HEADLESS || 'true').toLowerCase() !== 'false',
  timeout: Number(process.env.TIMEOUT || 30000),
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
  viewport: {
    width: 1440,
    height: 900
  },
  ignoreHTTPSErrors: true,
  launchOptions: {
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  }
};

export default playwrightConfig;
