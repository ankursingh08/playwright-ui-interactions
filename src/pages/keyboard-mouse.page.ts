import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page.js';

export class KeyboardMousePage extends BasePage {
  readonly hotkeyOutput: Locator;
  readonly keyInput: Locator;
  readonly keyEventOutput: Locator;
  readonly hoverBox: Locator;
  readonly hoverOutput: Locator;
  readonly tooltipBtn: Locator;
  readonly tooltipText: Locator;
  readonly hoverMenuTrigger: Locator;
  readonly hoverMenu: Locator;
  readonly hoverMenuOutput: Locator;
  readonly dropZoneA: Locator;
  readonly dropZoneB: Locator;
  readonly dragOutput: Locator;
  readonly tabOutput: Locator;

  constructor(page: Page) {
    super(page, '/pages/keyboard-mouse.html');
    this.hotkeyOutput = page.getByTestId('hotkey-output');
    this.keyInput = page.getByTestId('key-input');
    this.keyEventOutput = page.getByTestId('key-event-output');
    this.hoverBox = page.getByTestId('hover-box');
    this.hoverOutput = page.getByTestId('hover-output');
    this.tooltipBtn = page.getByTestId('tooltip-btn');
    this.tooltipText = page.getByTestId('tooltip-text');
    this.hoverMenuTrigger = page.getByTestId('hover-menu-trigger');
    this.hoverMenu = page.getByTestId('hover-menu');
    this.hoverMenuOutput = page.getByTestId('hover-menu-output');
    this.dropZoneA = page.getByTestId('drop-zone-a');
    this.dropZoneB = page.getByTestId('drop-zone-b');
    this.dragOutput = page.getByTestId('drag-output');
    this.tabOutput = page.getByTestId('tab-output');
  }

  async hoverOnBox(): Promise<void> {
    await this.hoverBox.hover();
  }

  async hoverOnTooltipBtn(): Promise<void> {
    await this.tooltipBtn.hover();
  }

  async hoverOnMenuTrigger(): Promise<void> {
    await this.hoverMenuTrigger.hover();
  }

  getDragItem(id: number | string): Locator {
    return this.page.getByTestId(`drag-item-${id}`);
  }

  getHoverMenuItem(action: 'edit' | 'duplicate' | 'archive'): Locator {
    return this.page.getByTestId(`hover-menu-${action}`);
  }

  getTabElement(id: 'btn-1' | 'btn-2' | 'input' | 'btn-3'): Locator {
    return this.page.getByTestId(`tab-${id}`);
  }

  async dragDropItem(id: number | string): Promise<void> {
    await this.getDragItem(id).dragTo(this.dropZoneB);
  }
}
