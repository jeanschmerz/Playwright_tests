import { test as base } from '@playwright/test';
import { MainPage } from '../models/MainPage';

// Declare the types of your fixtures.
type MyFixtures = {
  mainPage: MainPage;
};

// Extend base test by providing "mainPage"
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      const isAnalytics = /google-analytics|gtm|googletagmanager|clarity|hotjar|segment|sentry|datadog/i.test(url);
      const is3rdPartyNoise = /doubleclick|facebook|twitter|linkedin|adsystem|adservice|adnxs|optimizely|newrelic|mixpanel/i.test(url);
      if (isAnalytics || is3rdPartyNoise) {
        return route.abort();
      }
      return route.continue();
    });
    // Set up the fixture.
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();

    // Use the fixture value in the test.
    await use(mainPage);
  },
});
export { expect } from '@playwright/test';
