import { test, expect } from '../fixtures/fixture.js';

test.describe(`test form controls`, () => {
  test(`verify checkbox input`, async ({ formControlsPage }) => {
    await formControlsPage.checkItem('JavaScript');
    await expect(formControlsPage.checkBox('JavaScript')).toBeChecked();
    await expect(formControlsPage.checkboxOutput).toHaveText(`Selected: javascript`);
  });

  test(`verify unchecking checkbox`, async ({ formControlsPage }) => {
    await formControlsPage.checkItem('JavaScript');
    await expect(formControlsPage.checkBox('JavaScript')).toBeChecked();
    await formControlsPage.uncheckItem('JavaScript');
    await expect(formControlsPage.checkboxOutput).toHaveText('Selected: none');
  });

  test(`verify radio btn input`, async ({ formControlsPage }) => {
    await formControlsPage.selectRadioBtn('Playwright');
    await expect(formControlsPage.radioOutput).toHaveText('Selected: playwright');
  });

  test(`verify drop-down`, async ({ formControlsPage }) => {
    await formControlsPage.selectFromDropDown('India');
    await expect(formControlsPage.dropDownOutput).toHaveText('Selected: India');
  });

  test(`verify multi-select`, async ({ formControlsPage }) => {
    await formControlsPage.selectFromMultiSelect(['html', 'css']);
    await expect(formControlsPage.multiSelectOutput).toHaveText('Selected: HTML, CSS');
  });

  test(`verify date input`, async ({ formControlsPage }) => {
    await formControlsPage.fillDate('2026-02-20');
    await expect(formControlsPage.dateOutput).toHaveText('Selected: 2026-02-20');
  });

  test(`verify toggle On`, async ({ formControlsPage }) => {
    await formControlsPage.toggleOn();
    await expect(formControlsPage.toggleOutput).toHaveText('ON');
  });

  test(`verify toggle Off`, async ({ formControlsPage }) => {
    await formControlsPage.toggleOn();
    await formControlsPage.toggleOff();
    await expect(formControlsPage.toggleOutput).toHaveText('OFF');
  });

  test(`verify form submission`, async ({ formControlsPage }) => {
    await formControlsPage.fillNameInForm('test');
    await formControlsPage.fillEmailInForm('test@test.com');
    await formControlsPage.selectRole('Developer');
    await formControlsPage.agreeTerms();
    await formControlsPage.submitForm();
    await expect(formControlsPage.formSubmitOutput).toHaveText(
      'Submitted: test, test@test.com, developer',
    );
  });
});
