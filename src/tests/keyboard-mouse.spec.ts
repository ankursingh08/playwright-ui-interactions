import { test, expect } from '../fixtures/fixture.js';

test.describe(`test keyboard-mouse actions`, () => {
  test(`verify keyboard esc action`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.page.keyboard.press('Escape');
    await expect(keyboardMousePage.hotkeyOutput).toHaveText('Pressed: Escape');
  });

  test(`verify keyboard ctrl+s action`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.page.keyboard.press('Control+s');
    await expect(keyboardMousePage.hotkeyOutput).toHaveText('Pressed: Ctrl+S');
  });

  test(`verify hover action`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.hoverOnBox();
    await expect(keyboardMousePage.hoverOutput).toHaveText('Hovering!');
  });

  test(`verify hover on tooltip`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.hoverOnTooltipBtn();
    await expect(keyboardMousePage.tooltipText).toHaveText('This is a tooltip!');
  });

  test(`verify select item from hover menu`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.hoverOnMenuTrigger();
    await keyboardMousePage.getHoverMenuItem('edit').click();
    await expect(keyboardMousePage.hoverMenuOutput).toHaveText('Action: edit');
  });

  test(`verify drag and drop`, async ({ keyboardMousePage }) => {
    await keyboardMousePage.dragDropItem('1');
    await expect(keyboardMousePage.dragOutput).toHaveText('Item 1 dropped in Zone B');
  });
});
