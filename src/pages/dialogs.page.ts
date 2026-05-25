import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DialogsPage extends BasePage {
  readonly alertButton: Locator;
  readonly alertOutput: Locator;
  readonly confirmButton: Locator;
  readonly confirmOutput: Locator;
  readonly promptButton: Locator;
  readonly promptOutput: Locator;
  readonly chainedButton: Locator;
  readonly chainedOutput: Locator;
  readonly guardToggleButton: Locator;
  readonly guardStatus: Locator;

  constructor(page: Page) {
    super(page, '/pages/dialogs.html');
    this.alertButton = page.getByTestId('alert-btn');
    this.alertOutput = page.getByTestId('alert-output');
    this.confirmButton = page.getByTestId('confirm-btn');
    this.confirmOutput = page.getByTestId('confirm-output');
    this.promptButton = page.getByTestId('prompt-btn');
    this.promptOutput = page.getByTestId('prompt-output');
    this.chainedButton = page.getByTestId('chained-btn');
    this.chainedOutput = page.getByTestId('chained-output');
    this.guardToggleButton = page.getByTestId('guard-toggle');
    this.guardStatus = page.getByTestId('guard-status');
  }

  async triggerAlert():Promise<void> {
    await this.alertButton.click();
  }

  async triggerConfirm():Promise<void> {
    await this.confirmButton.click();
  }

  async triggerPrompt():Promise<void> {
    await this.promptButton.click();
  }

  async triggerChained():Promise<void> {
    await this.chainedButton.click();
  }

  async toggleGuard():Promise<void> {
    await this.guardToggleButton.click();
  }
}
