import { test, expect } from '../fixtures/fixture';
import { createTestFile, createTestFiles, cleanupTestData } from '../utils/test-data.helper';
import * as path from 'path';

test.describe(`verify file upload`, () => {
  let filePath: string;
  let filePaths: string[];

  test.beforeAll(() => {
    filePath = createTestFile('dummyFile', 'Hello World');
    filePaths = createTestFiles([
      { name: 'file1', content: 'hello' },
      { name: 'file2', content: 'world' },
    ]);
  });
  test.afterAll(() => {
    cleanupTestData();
  });

  test(`verify single file upload`, async ({ fileOperationPage }) => {
    await fileOperationPage.uploadSingleFile(filePath);
    await expect(fileOperationPage.singleUploadOutput).toContainText(path.basename(filePath));
  });

  test(`verify multiple file upload`, async ({ fileOperationPage }) => {
    await fileOperationPage.uploadMultipleFile(filePaths);
    await expect(fileOperationPage.multiUploadOutput).toContainText(`${filePaths.length} file(s)`);
    for (const file of filePaths) {
      await expect(fileOperationPage.multiUploadOutput).toContainText(path.basename(file));
    }
  });

  test(`verify server file upload`, async ({ fileOperationPage }) => {
    await fileOperationPage.uploadToServer(filePath);
    await fileOperationPage.uploadButton.click();
    await expect(fileOperationPage.serverUploadOutput).toContainText(path.basename(filePath));
  });

  test(`verify file download via link`, async ({fileOperationPage }) => {
    const downloadPromise = fileOperationPage.page.waitForEvent('download');
    await fileOperationPage.downloadLink.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('report.pdf');
  });

  test(`verify file download via button`, async ({fileOperationPage }) => {
    const downloadPromise = fileOperationPage.page.waitForEvent('download');
    await fileOperationPage.downloadButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('data.csv');
    await expect(fileOperationPage.downloadOutput).toContainText('Download triggered');
  });

  

});
