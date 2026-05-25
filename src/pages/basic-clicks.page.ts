import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class BasicClicksPage extends BasePage {
  readonly singleClickBtn: Locator;
  readonly singleClickOutput: Locator;
  readonly doubleClickBtn: Locator;
  readonly doubleClickOutput: Locator;
  readonly rightClickArea: Locator;
  readonly rightClickOutput: Locator;
  readonly modifierClickBtn: Locator;
  readonly modifierClickOutputArea: Locator;
  readonly incrementBtn: Locator;
  readonly decrementBtn: Locator;
  readonly countDisplayArea: Locator;
  readonly resetBtn: Locator;
  readonly disabledBtn: Locator;
  readonly enableToggleBtn: Locator;
  readonly visibilityToggleBtn: Locator;
  readonly hiddenElement: Locator;

  constructor(page: Page) {
    super(page, '/pages/basic-clicks.html');
    this.singleClickBtn = page.getByRole('button', { name: 'Click Me', exact: true });
    this.singleClickOutput = page.getByTestId('single-click-output');
    this.doubleClickBtn = page.getByRole('button', { name: 'Double Click Me', exact: true });
    this.doubleClickOutput = page.getByTestId('dbl-click-output');
    this.rightClickArea = page.getByTestId('right-click-area');
    this.rightClickOutput = page.getByTestId('right-click-output');
    this.modifierClickBtn = page.getByRole('button', { name: 'Modifier Click', exact: true });
    this.modifierClickOutputArea = page.getByTestId('modifier-click-output');
    this.incrementBtn = page.getByTestId('increment-btn');
    this.decrementBtn = page.getByTestId('decrement-btn');
    this.countDisplayArea = page.getByTestId('count-display');
    this.resetBtn = page.getByTestId('reset-btn');
    this.disabledBtn = page.getByTestId('disabled-btn');
    this.enableToggleBtn = page.getByTestId('enable-toggle');
    this.visibilityToggleBtn = page.getByTestId('visibility-toggle');
    this.hiddenElement = page.getByTestId('hidden-element');
  }

  async clickSingle(): Promise<void> {
    await this.singleClickBtn.click();
  }

  async doubleClick(): Promise<void> {
    await this.doubleClickBtn.dblclick();
  }

  async rightClick(): Promise<void> {
    await this.rightClickArea.click({ button: 'right' });
  }

  async selectContextOption(option: 'copy' | 'paste' | 'delete'): Promise<void> {
    await this.page.getByTestId(`ctx-${option}`).click();
  }

  async clickModifier(modifier: Array<'Shift' | 'Control' | 'Alt' | 'Meta'>): Promise<void> {
    await this.modifierClickBtn.click({ modifiers: modifier });
  }

  async increment(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.incrementBtn.click();
    }
  }

  async decrement(times: number = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.decrementBtn.click();
    }
  }

  async resetCount(): Promise<void> {
    await this.resetBtn.click();
  }

  async toggleEnable(): Promise<void> {
    await this.enableToggleBtn.click();
  }

  async toggleVisibility(): Promise<void> {
    await this.visibilityToggleBtn.click();
  }
}
