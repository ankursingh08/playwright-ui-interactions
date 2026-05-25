import { test, expect } from '../fixtures/fixture';

test.describe(`learning basic click actions`, () => {
  test(`verify single click action`, async ({ basicClicksPage }) => {
    await basicClicksPage.clickSingle();
    await expect(basicClicksPage.singleClickOutput).toHaveText('Single click detected');
  });

  test(`verify double click action`, async ({ basicClicksPage }) => {
    await basicClicksPage.doubleClick();
    await expect(basicClicksPage.doubleClickOutput).toHaveText('Double click detected');
  });

  test(`verify right click action`, async ({ basicClicksPage }) => {
    await basicClicksPage.rightClick();
    await basicClicksPage.selectContextOption('copy');
    await expect(basicClicksPage.rightClickOutput).toHaveText('Context menu: copy');
  });

  test(`verify click with modifier`, async ({ basicClicksPage }) => {
    await basicClicksPage.clickModifier(['Shift']);
    await expect(basicClicksPage.modifierClickOutputArea).toHaveText('Modifiers: Shift');
  });

  test(`clicking counter button 3 times`, async ({ basicClicksPage }) => {
    await basicClicksPage.increment(3);
    await expect(basicClicksPage.countDisplayArea).toHaveText('3');
    await basicClicksPage.resetCount();
    await expect(basicClicksPage.countDisplayArea).toHaveText('0');
  });

  test(`verify btn is disabled`, async ({ basicClicksPage }) => {
    await expect(basicClicksPage.disabledBtn).toBeDisabled();
    await basicClicksPage.toggleEnable();
    await expect(basicClicksPage.disabledBtn).toBeEnabled();
  });

  test(`verify element is hidden`, async ({ basicClicksPage }) => {
    await expect(basicClicksPage.hiddenElement).toBeHidden();
    await basicClicksPage.toggleVisibility();
    await expect(basicClicksPage.hiddenElement).toBeVisible();
    await expect(basicClicksPage.hiddenElement).toHaveText('Now you see me!');
  });
});
