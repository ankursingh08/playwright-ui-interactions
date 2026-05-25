import { test, expect } from '../fixtures/fixture';

test.describe.configure({ mode: 'serial' });
test.describe(`verify clipboard actions`, () => {
  test.use({
    permissions: ['clipboard-read', 'clipboard-write'],
  });

  test(`verify copy via button`, async ({ clipboardPage }) => {
    await clipboardPage.copyText();
    await expect(clipboardPage.copyOutput).toHaveText('Copied: "Hello Playwright!"');
    const copiedText = await clipboardPage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(copiedText).toBe('Hello Playwright!');
  });

  test(`verify paste via button`, async ({ clipboardPage }) => {
    const textToPaste = 'Hello World';

    await clipboardPage.page.evaluate(async (text) => {
      await navigator.clipboard.writeText(text);
    }, textToPaste);

    await clipboardPage.pasteText();

    await expect(clipboardPage.pasteOutput).toHaveText(`Pasted: "${textToPaste}"`);

    const copiedText = await clipboardPage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });

    expect(copiedText).toBe(textToPaste);
  });

  test(`verify copy-paste via keyboard`, async ({ clipboardPage }) => {
    await clipboardPage.kbCopySource.focus();
    await clipboardPage.page.keyboard.press('ControlOrMeta+A');
    await clipboardPage.page.keyboard.press('ControlOrMeta+C');
    await clipboardPage.kbPasteTarget.focus();
    await clipboardPage.page.keyboard.press('ControlOrMeta+V');
    await expect(clipboardPage.kbPasteTarget).toHaveValue('Copy me with keyboard');
  });

  test(`verify copying the selected text`, async ({ clipboardPage }) => {
    await clipboardPage.selectableText.focus()
    await clipboardPage.selectableText.selectText();
    await expect(clipboardPage.selectionOutput).toContainText('This is selectable text');
    await clipboardPage.page.keyboard.press('ControlOrMeta+C');
    const readText = await clipboardPage.page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(readText).toContain('This is selectable text');
  });

  test(`verify selecting only part of text`, async ({ clipboardPage }) => {
    await clipboardPage.selectableText.focus();
    // Select "selectable" (indices 8 to 18)
    await clipboardPage.selectableText.evaluate((el) => {
      const range = document.createRange();
      const textNode = el.firstChild!;
      range.setStart(textNode, 8);
      range.setEnd(textNode, 18);

      const selection = window.getSelection()!;
      selection.removeAllRanges();
      selection.addRange(range);
    });

    // Verify the UI update
    await expect(clipboardPage.selectionOutput).toHaveText('Selected: "selectable"');
  });
});
