import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TextInputPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly charInput: Locator;
  readonly charInputLog: Locator;
  readonly preFilledInput: Locator;
  readonly focusInput: Locator;
  readonly focusOutput: Locator;
  readonly textAreaInput: Locator;
  readonly textAreaCharCount: Locator;
  readonly numberInput: Locator;
  readonly contentEditableInput: Locator;
  readonly contentEditableOutput: Locator;
  readonly validatedInput: Locator;
  readonly validatedOutput: Locator;

  constructor(page: Page) {
    super(page, '/pages/text-input.html');
    this.nameInput = page.getByTestId('basic-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.charInput = page.getByTestId('char-input');
    this.charInputLog = page.getByTestId('keystroke-log');
    this.preFilledInput = page.getByTestId('prefilled-input');
    this.focusInput = page.getByTestId('focus-input');
    this.focusOutput = page.getByTestId('focus-output');
    this.textAreaInput = page.getByTestId('textarea-input');
    this.textAreaCharCount = page.getByTestId('textarea-char-count');
    this.numberInput = page.getByTestId('number-input');
    this.contentEditableInput = page.getByTestId('contenteditable');
    this.contentEditableOutput = page.getByTestId('editable-output');
    this.validatedInput = page.getByTestId('validated-input');
    this.validatedOutput = page.getByTestId('validation-message');
  }

  async fillNameInput(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async fillEmailInput(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillCharacterByCharacter(text: string): Promise<void> {
    await this.charInput.pressSequentially(text, { delay: 10 });
  }

  async clearPreFilledInput(): Promise<void> {
    await this.preFilledInput.clear();
  }

  async replacePreFilledInput(text: string): Promise<void> {
    await this.preFilledInput.fill(text);
  }

  async focusOnInput(): Promise<void> {
    await this.focusInput.focus();
  }

  async blurInput(): Promise<void> {
    await this.focusInput.blur();
  }

  async fillTextArea(text: string): Promise<void> {
    await this.textAreaInput.fill(text);
  }

  async setNumberInput(value: string | number): Promise<void> {
    await this.numberInput.fill(value.toString());
  }

  async fillContentEditable(text: string): Promise<void> {
    await this.contentEditableInput.fill(text);
  }

  async fillValidatedInput(text: string): Promise<void> {
    await this.validatedInput.fill(text);
  }
}
