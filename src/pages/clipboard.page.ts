import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ClipboardPage extends BasePage {
  readonly copySource: Locator;
  readonly copyBtn: Locator;
  readonly copyOutput: Locator;
  readonly pasteTarget: Locator;
  readonly pasteBtn: Locator;
  readonly pasteOutput: Locator;
  readonly kbCopySource: Locator;
  readonly kbPasteTarget: Locator;
  readonly selectableText: Locator;
  readonly selectionOutput: Locator;

  constructor(page: Page) {
    super(page, '/pages/clipboard.html');
    this.copySource = page.getByTestId('copy-source');
    this.copyBtn = page.getByTestId('copy-btn');
    this.copyOutput = page.getByTestId('copy-output');
    this.pasteTarget = page.getByTestId('paste-target');
    this.pasteBtn = page.getByTestId('paste-btn');
    this.pasteOutput = page.getByTestId('paste-output');
    this.kbCopySource = page.getByTestId('kb-copy-source');
    this.kbPasteTarget = page.getByTestId('kb-paste-target');
    this.selectableText = page.getByTestId('selectable-text');
    this.selectionOutput = page.getByTestId('selection-output');
  }

  async copyText(): Promise<void> {
    await this.copyBtn.click();
  }

  async pasteText(): Promise<void> {
    await this.pasteBtn.click();
  }
}
