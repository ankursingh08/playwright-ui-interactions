import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './base.page';

export class FramesWindowsPage extends BasePage {
  readonly simpleIframe: FrameLocator;
  readonly outerIframe: FrameLocator;
  readonly innerIframe: FrameLocator;
  readonly iframeInput: Locator;
  readonly iframeClickMeBtn: Locator;
  readonly iframeOutput: Locator;
  readonly innerFrameNestedBtn: Locator;
  readonly innerFrameNestedOutput: Locator;
  readonly newTabLink: Locator;
  readonly popupBtn: Locator;
  readonly popupOutput: Locator;
  readonly popupMessage: Locator;

  constructor(page: Page) {
    super(page, '/pages/frames-windows.html');
    this.simpleIframe = page.frameLocator('[data-testid="simple-iframe"]');
    this.outerIframe = page.frameLocator('[data-testid="outer-iframe"]');
    this.innerIframe = this.outerIframe.frameLocator('[data-testid="inner-iframe"]');
    this.iframeInput = this.simpleIframe.getByTestId('iframe-input');
    this.iframeClickMeBtn = this.simpleIframe.getByTestId('iframe-btn');
    this.iframeOutput = this.simpleIframe.getByTestId('iframe-output');
    this.innerFrameNestedBtn = this.innerIframe.getByTestId('nested-btn');
    this.innerFrameNestedOutput = this.innerIframe.getByTestId('nested-output');
    this.newTabLink = page.getByTestId('new-tab-link');
    this.popupBtn = page.getByTestId('popup-btn');
    this.popupOutput = page.getByTestId('popup-output');
    this.popupMessage = page.getByTestId('popup-message');
  }

  async fillIframeInput(text: string): Promise<void> {
    await this.iframeInput.fill(text);
  }

  async clickIframeBtn(): Promise<void> {
    await this.iframeClickMeBtn.click();
  }

  async clickInnerFrameNestedBtn(): Promise<void> {
    await this.innerFrameNestedBtn.click();
  }

  async clickNewTabLink(): Promise<void> {
    await this.newTabLink.click();
  }

  async clickPopupBtn(): Promise<void> {
    await this.popupBtn.click();
  }
}
