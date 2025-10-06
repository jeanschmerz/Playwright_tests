import { test, expect } from '../fixtures/mainPage';
test.describe('тесты главной страницы', () => {
  test('комплексная проверка главной страницы', async ({ mainPage }) => {
    await test.step('Проверка отображения элементов навигации хедера', async () => {
      await mainPage.checkElementsVisibility();
    });

    await test.step('Проверка названия элементов навигации хедера', async () => {
      await mainPage.checkElementsText();
    });

    await test.step('Проверка атрибутов href элементов навигации хедера', async () => {
      await mainPage.checkElementsHrefAttribute();
    });

    await test.step('Проверка переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
      await mainPage.checkDataThemeAttributeValue();
    });

    await test.step('Проверка стилей co светлой темой', async () => {
      await mainPage.setLightMode();
      await mainPage.checkLayoutWithLightMode();
    });

    await test.step('Проверка стилей c темной темой', async () => {
      await mainPage.setDarkMode();
      await mainPage.checkLayoutWithDarkMode();
    });

    await test.step('Проверка стилей c системной темой', async () => {
      await mainPage.setSystemMode();
      await mainPage.checkLayoutWithSystemMode();
    });
  });
});
