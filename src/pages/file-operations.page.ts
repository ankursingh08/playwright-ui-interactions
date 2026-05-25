import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class FileOperationsPage extends BasePage {
  readonly singleFileInput: Locator;
  readonly singleUploadOutput: Locator;
  readonly multiFileInput: Locator;
  readonly multiUploadOutput: Locator;
  readonly serverFileInput: Locator;
  readonly serverUploadOutput: Locator;
  readonly uploadButton: Locator;
  readonly downloadLink: Locator;
  readonly downloadButton: Locator;
  readonly downloadOutput: Locator;

  constructor(page: Page) {
    super(page, '/pages/file-operations.html');
    this.singleFileInput = page.getByTestId('single-file-input');
    this.singleUploadOutput = page.getByTestId('single-upload-output');
    this.multiFileInput = page.getByTestId('multi-file-input');
    this.multiUploadOutput = page.getByTestId('multi-upload-output');
    this.serverFileInput = page.getByTestId('server-file-input');
    this.uploadButton = page.getByTestId('upload-btn');
    this.serverUploadOutput = page.getByTestId('server-upload-output');
    this.downloadLink = page.getByTestId('download-link');
    this.downloadButton = page.getByTestId('download-btn');
    this.downloadOutput = page.getByTestId('download-output');
  }

  async uploadSingleFile(filePath: string): Promise<void> {
    await this.singleFileInput.setInputFiles(filePath);
  }

  async uploadMultipleFile(filePaths: string[]): Promise<void> {
    await this.multiFileInput.setInputFiles(filePaths);
  }

  async uploadToServer(filePath: string): Promise<void> {
    await this.serverFileInput.setInputFiles(filePath);
  }
}
