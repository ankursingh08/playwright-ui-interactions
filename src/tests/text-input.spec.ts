import { expect, test } from '../fixtures/fixture';

test.describe(`verify different input`, () => {
  test(`fill name input`, async ({ textInputPage }) => {
    const name = 'Ankur';
    await textInputPage.fillNameInput(name);
    await expect(textInputPage.nameInput).toHaveValue(name);
  });

  test(`clear pre-filled value`, async ({ textInputPage }) => {
    await textInputPage.clearPreFilledInput();
    await expect(textInputPage.preFilledInput).toBeEmpty();
    await textInputPage.replacePreFilledInput('hello');
    await expect(textInputPage.preFilledInput).toHaveValue('hello');
  });

  test(`check focus and blur`, async ({ textInputPage }) => {
    await textInputPage.focusOnInput();
    await expect(textInputPage.focusOutput).toHaveText('Input is focused');
    await textInputPage.blurInput();
    await expect(textInputPage.focusOutput).toHaveText('Input blurred. Value: ""');
  });

  test(`check validation input`, async ({ textInputPage }) => {
    await textInputPage.fillValidatedInput('a');
    await expect(textInputPage.validatedOutput).toHaveText('Too short — minimum 3 characters');
  });
});
