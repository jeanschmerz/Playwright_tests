import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });
  test('Проверка названия элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });
  test('Проверка атрибутов href элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHrefAttribute();
  });
  test('Проверка переключения лайт мода', async ({ mainPage }) => {
    await test.step('Нажатие на иконку переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка смены значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });
  test(`Проверка стилей co светлой темой`, async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Проверка c активной светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });
  test(`Проверка стилей c темной темой`, async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Проверка c активной темной темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
  test(`Проверка стилей c системной темой`, async ({ mainPage }) => {
    await test.step('Установка системной темы', async () => {
      await mainPage.setSystemMode();
    });
    await test.step('Проверка c активной системной темой', async () => {
      await mainPage.checkLayoutWithSystemMode();
    });
  });
});
