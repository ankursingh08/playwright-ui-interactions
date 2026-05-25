import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FormControlsPage extends BasePage {
  readonly checkboxOutput: Locator;
  readonly radioOutput: Locator;
  readonly dropDown: Locator;
  readonly dropDownOutput: Locator;
  readonly multiSelect: Locator;
  readonly multiSelectOutput: Locator;
  readonly dateInput: Locator;
  readonly dateOutput: Locator;
  readonly rangeSlider: Locator;
  readonly rangeSliderValue: Locator;
  readonly toggleSwitch: Locator;
  readonly toggleOutput: Locator;
  readonly fullNameTextBox: Locator;
  readonly emailTextBox: Locator;
  readonly roleDropDown: Locator;
  readonly termsCheckbox: Locator;
  readonly submitBtn: Locator;
  readonly formSubmitOutput: Locator;

  constructor(page: Page) {
    super(page, '/pages/form-controls.html');
    this.checkboxOutput = page.getByTestId('checkbox-output');
    this.radioOutput = page.getByTestId('radio-output');
    this.dropDown = page.getByRole('combobox', { name: 'Choose a country' });
    this.dropDownOutput = page.getByTestId('select-output');
    this.multiSelect = page.getByRole('listbox', { name: 'Select technologies (hold Ctrl/Cmd)' });
    this.multiSelectOutput = page.getByTestId('multi-select-output');
    this.dateInput = page.getByTestId('date-input');
    this.dateOutput = page.getByTestId('date-output');
    this.rangeSlider = page.getByTestId('range-input');
    this.rangeSliderValue = page.getByTestId('range-value');
    this.toggleSwitch = page.locator('label.toggle-switch');
    this.toggleOutput = page.getByTestId('toggle-output');
    this.fullNameTextBox = page.getByRole('textbox', { name: 'Full Name' });
    this.emailTextBox = page.getByRole('textbox', { name: 'Email' });
    this.roleDropDown = page.getByRole('combobox', { name: 'Role' });
    this.termsCheckbox = page.getByRole('checkbox', { name: 'I agree to the terms' });
    this.submitBtn = page.getByRole('button', { name: 'Submit' });
    this.formSubmitOutput = page.getByTestId('form-output');
  }

  checkBox(name: string): Locator {
    return this.page.getByRole('checkbox', { name: name });
  }

  radioBtn(name: string): Locator {
    return this.page.getByRole('radio', { name: name });
  }

  async checkItem(name: string): Promise<void> {
    await this.checkBox(name).check();
  }

  async uncheckItem(name: string): Promise<void> {
    await this.checkBox(name).uncheck();
  }

  async selectRadioBtn(name: string): Promise<void> {
    await this.radioBtn(name).check();
  }

  async selectFromDropDown(option: string): Promise<void> {
    await this.dropDown.selectOption(option);
  }

  async selectFromMultiSelect(options: string[]): Promise<void> {
    await this.multiSelect.selectOption(options);
  }

  async fillDate(date: string): Promise<void> {
    await this.dateInput.fill(date);
  }

  async toggleOn(): Promise<void> {
    await this.toggleSwitch.click({ force: true });
  }

  async toggleOff(): Promise<void> {
    await this.toggleSwitch.click({ force: true });
  }

  async fillNameInForm(name: string): Promise<void> {
    await this.fullNameTextBox.fill(name);
  }

  async fillEmailInForm(email: string): Promise<void> {
    await this.emailTextBox.fill(email);
  }

  async selectRole(role: string): Promise<void> {
    await this.roleDropDown.selectOption(role);
  }

  async agreeTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async submitForm(): Promise<void> {
    await this.submitBtn.click();
  }
}
