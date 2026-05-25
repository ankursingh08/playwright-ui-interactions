import { test, expect } from '../fixtures/fixture';

test.describe(`verify dynamic content`, () => {
  test(`verify auto-complete`, async ({ dynamicContentPage }) => {
    await dynamicContentPage.fillInAutoCompleteInput('java');
    await expect(dynamicContentPage.autoCompleteList).toBeVisible();
    await dynamicContentPage.selectItemFromAutoCompleteList('java');
    await expect(dynamicContentPage.autoCompleteOutput).toHaveText('Selected: Java');
  });
  test(`verify debounced input`, async ({ dynamicContentPage }) => {
    await dynamicContentPage.fillInDebouncedInputWithDelay('java');
    await expect(dynamicContentPage.debounceOutput).toHaveText('Typing...');
    await expect(dynamicContentPage.debounceOutput).toHaveText('Search triggered for: "java"', {
      timeout: 2000,
    });
  });
  test(`verify loading spinner`, async ({ dynamicContentPage }) => {
    await dynamicContentPage.clickLoadContent();
    await expect(dynamicContentPage.loadingIndicator).toBeVisible();
    await expect(dynamicContentPage.loadingIndicator).toBeHidden({ timeout: 2000 });
    await expect(dynamicContentPage.delayedContent).toHaveText('Content loaded successfully!');
  });
  test(`verify auto-dismissing toast`, async ({ dynamicContentPage }) => {
    await dynamicContentPage.clickShowToast();
    await expect(dynamicContentPage.toast).toBeVisible();
    await expect(dynamicContentPage.toast).toBeHidden({ timeout: 4000 });
  });

  test(`verify conditional display`, async ({ dynamicContentPage }) => {
    await dynamicContentPage.clickShowSuccessBtn();
    await expect(dynamicContentPage.notification).toHaveText('Operation completed successfully!');
    await dynamicContentPage.clickShowErrorBtn();
    await expect(dynamicContentPage.notification).toHaveText(
      'An error occurred. Please try again.',
    );
    await dynamicContentPage.clickShowWarningBtn();
    await expect(dynamicContentPage.notification).toHaveText(
      'Warning: This action cannot be undone.',
    );
  });

  test(`handle infinite scroll`, async ({ dynamicContentPage }) => {
    await expect(dynamicContentPage.scrollStatus).toHaveText('Loaded: 10 items');
    await expect(dynamicContentPage.scrollItem(1)).toBeVisible();
    await dynamicContentPage.scrollContainer.evaluate((el) => (el.scrollTop = el.scrollHeight));
    await expect(dynamicContentPage.scrollStatus).toHaveText('Loaded: 20 items');
    await expect(dynamicContentPage.scrollItem(11)).toBeVisible();
  });

  test('handle lazy loading', async ({ dynamicContentPage }) => {
    await expect(dynamicContentPage.lazyPlaceholder).toBeVisible();
    await expect(dynamicContentPage.lazyLoaded).toBeHidden();
    // Scroll element into viewport — triggers IntersectionObserver
    await dynamicContentPage.lazyTarget.scrollIntoViewIfNeeded();

    // Loading state appears first
    await expect(dynamicContentPage.lazyLoading).toBeVisible({ timeout: 3000 });

    // Then content renders after 1000ms delay
    await expect(dynamicContentPage.lazyLoaded).toBeVisible({ timeout: 5000 });
    await expect(dynamicContentPage.lazyLoaded).toContainText('Lazy content loaded!');
  });
});
