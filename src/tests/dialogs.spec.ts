import { test, expect } from '../fixtures/fixture';

test.describe('Browser Dialogs', () => {
  test(`handle alert dialog`, async ({ dialogsPage }) => {
    dialogsPage.page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('This is an alert message!');
      await dialog.accept();
    });
    await dialogsPage.triggerAlert();
    await expect(dialogsPage.alertOutput).toHaveText('Alert was dismissed');
  });

  test(`handle confirm dialog`, async ({ dialogsPage }) => {
    dialogsPage.page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Do you want to proceed?');
      await dialog.accept();
    });
    await dialogsPage.triggerConfirm();
    await expect(dialogsPage.confirmOutput).toHaveText('Confirmed: accepted');
  });

  test(`handle prompt dialog`, async ({ dialogsPage }) => {
    dialogsPage.page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('What is your name?');
      await dialog.accept('Playwright');
    });
    await dialogsPage.triggerPrompt();
    await expect(dialogsPage.promptOutput).toHaveText('Prompt response: Playwright');
  });

  test('should handle chained dialogs', async ({ dialogsPage }) => {
    const dialogs: string[] = [];
    dialogsPage.page.on('dialog', async (dialog) => {
      dialogs.push(dialog.type());
      if (dialog.type() === 'prompt') {
        await dialog.accept('Chain Tester');
      } else {
        await dialog.accept();
      }
    });

    await dialogsPage.triggerChained();
    expect(dialogs).toEqual(['alert', 'confirm', 'prompt']);
    await expect(dialogsPage.chainedOutput).toHaveText(
      'Chain complete: confirmed, name="Chain Tester"',
    );
  });

  test('should handle beforeunload dialog', async ({ dialogsPage }) => {
    await dialogsPage.toggleGuard();
    await expect(dialogsPage.guardStatus).toHaveText('Guard: ON');

    // Attempt to navigate away - this should trigger beforeunload
    dialogsPage.page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('beforeunload');
      await dialog.accept();
    });

    await dialogsPage.page.goto('/');

    // Wait for navigation and verify the URL
    await expect(dialogsPage.page).toHaveURL('http://localhost:3000/', { timeout: 10000 });
  });
});
