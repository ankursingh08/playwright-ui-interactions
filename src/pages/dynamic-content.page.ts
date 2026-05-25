import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class DynamicContentPage extends BasePage {
  readonly autoCompleteInput: Locator;
  readonly autoCompleteList: Locator;
  readonly autoCompleteOutput: Locator;
  readonly debounceInput: Locator;
  readonly debounceOutput: Locator;
  readonly loadContentBtn: Locator;
  readonly loadingIndicator: Locator;
  readonly delayedContent: Locator;
  readonly showSuccessBtn: Locator;
  readonly showErrorBtn: Locator;
  readonly showWarningBtn: Locator;
  readonly notification: Locator;
  readonly toastBtn: Locator;
  readonly toast: Locator;
  readonly scrollContainer: Locator;
  readonly scrollStatus: Locator;
  readonly lazyTarget: Locator;
  readonly lazyPlaceholder: Locator;
  readonly lazyLoading: Locator;
  readonly lazyLoaded: Locator;

  constructor(page: Page) {
    super(page, '/pages/dynamic-content.html');
    this.autoCompleteInput = page.getByTestId('autocomplete-input');
    this.autoCompleteList = page.getByTestId('autocomplete-list');
    this.autoCompleteOutput = page.getByTestId('autocomplete-output');
    this.debounceInput = page.getByTestId('debounce-input');
    this.debounceOutput = page.getByTestId('debounce-output');
    this.loadContentBtn = page.getByTestId('load-content-btn');
    this.loadingIndicator = page.getByTestId('loading-indicator');
    this.delayedContent = page.getByTestId('delayed-content');
    this.showSuccessBtn = page.getByTestId('show-success');
    this.showErrorBtn = page.getByTestId('show-error');
    this.showWarningBtn = page.getByTestId('show-warning');
    this.notification = page.getByTestId('notification');
    this.toastBtn = page.getByTestId('toast-btn');
    this.toast = page.getByTestId('toast');
    this.scrollContainer = page.getByTestId('scroll-container');
    this.scrollStatus = page.getByTestId('scroll-status');
    this.lazyTarget = page.getByTestId('lazy-target');
    this.lazyPlaceholder = page.getByTestId('lazy-placeholder');
    this.lazyLoading = page.getByTestId('lazy-loading');
    this.lazyLoaded = page.getByTestId('lazy-loaded');
  }

  getAutoCompleteOption(option: string): Locator {
    return this.page.getByTestId(`ac-option-${option.toLowerCase()}`);
  }

  scrollItem(id: number): Locator {
    return this.page.getByTestId(`scroll-item-${id}`);
  }

  async fillInAutoCompleteInput(text: string): Promise<void> {
    await this.autoCompleteInput.fill(text);
  }

  async selectItemFromAutoCompleteList(option: string): Promise<void> {
    await this.getAutoCompleteOption(option).click();
  }

  async fillInDebouncedInputWithDelay(text: string): Promise<void> {
    await this.debounceInput.pressSequentially(text, { delay: 100 });
  }

  async clickLoadContent(): Promise<void> {
    await this.loadContentBtn.click();
  }

  async clickShowToast(): Promise<void> {
    await this.toastBtn.click();
  }

  async clickShowSuccessBtn(): Promise<void> {
    await this.showSuccessBtn.click();
  }

  async clickShowErrorBtn(): Promise<void> {
    await this.showErrorBtn.click();
  }

  async clickShowWarningBtn(): Promise<void> {
    await this.showWarningBtn.click();
  }
}
