import test, { expect, Locator, Page } from '@playwright/test';
import { text } from 'stream/consumers';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
        name: 'API link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('GitHub repository'),
        name: 'GitHub icon',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Discord server'),
        name: 'Discord icon',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
        name: 'Light mode icon',
      },
      {
        locator: (page: Page): Locator => page.getByLabel('Search (Ctrl+K)'),
        name: 'Search input',
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
        name: 'Get started button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }
  async checkElementsVisibility() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Проверка названия элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toContainText(text);
        });
      }
    }
  }
  async checkElementsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Проверка атрибута href элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    }
  }
  async clickSwitchLightModeIcon() {
    await this.page.getByLabel('Switch between dark and light').click();
  }
  async checkDataThemeAttributeValue() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
  }
  async setLightMode() {
    await this.page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('data-theme-choice', 'light');
    });
  }
  async setDarkMode() {
    await this.page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('data-theme-choice', 'dark');
    });
  }
  async setSystemMode() {
    await this.page.evaluate((value) => {
      document.querySelector('html')?.setAttribute('data-theme-choice', 'system');
    });
  }
  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`PageWithLightMode.png`, {
      maxDiffPixelRatio: 0.3,
    });
  }
  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`PageWithDarkMode.png`, {
      maxDiffPixelRatio: 0.3,
    });
  }
  async checkLayoutWithSystemMode() {
    await expect(this.page).toHaveScreenshot(`PageWithSystemMode.png`, {
      maxDiffPixelRatio: 0.3,
    });
  }
}
