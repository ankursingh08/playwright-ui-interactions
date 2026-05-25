import { test, expect } from '../fixtures/fixture';

test.describe(`iframe and window handling`, () => {
  test(`verify iframe input`, async ({ frameWindowPage }) => {
    await frameWindowPage.fillIframeInput('yoyo');
    await frameWindowPage.clickIframeBtn();
    await expect(frameWindowPage.iframeOutput).toHaveText('Clicked! Input value: "yoyo"');
  });

  test(`verify nested iframe`, async ({ frameWindowPage }) => {
    await frameWindowPage.clickInnerFrameNestedBtn();
    await expect(frameWindowPage.innerFrameNestedOutput).toHaveText('Nested button clicked!');
  });

  test(`verify new tab`, async ({ frameWindowPage }) => {
    const [newPage] = await Promise.all([
      frameWindowPage.page.context().waitForEvent('page'),
      frameWindowPage.clickNewTabLink(),
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('http://localhost:3000/pages/popup.html');
    await expect(newPage.getByTestId('popup-message')).toHaveText('Hello from the popup!');
    await newPage.getByTestId('popup-close-btn').click();
    await expect.poll(() => newPage.isClosed()).toBe(true);
    await expect(frameWindowPage.page).toHaveURL('/pages/frames-windows.html');
    await expect(frameWindowPage.newTabLink).toBeVisible();
  });
});
