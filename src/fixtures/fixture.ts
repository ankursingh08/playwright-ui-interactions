import { test as base } from '@playwright/test';
import { BasicClicksPage } from '../pages/basic-clicks.page';
import { TextInputPage } from '../pages/text-input.page';
import { FormControlsPage } from '../pages/form-controls.page';
import { KeyboardMousePage } from '../pages/keyboard-mouse.page';
import { DialogsPage } from '../pages/dialogs.page';
import { FramesWindowsPage } from '../pages/frames-windows.page';
import { DynamicContentPage } from '../pages/dynamic-content.page';
import { FileOperationsPage } from '../pages/file-operations.page';
import { ClipboardPage } from '../pages/clipboard.page';

interface MyFixture {
  basicClicksPage: BasicClicksPage;
  textInputPage: TextInputPage;
  formControlsPage: FormControlsPage;
  keyboardMousePage: KeyboardMousePage;
  dialogsPage: DialogsPage;
  frameWindowPage: FramesWindowsPage;
  dynamicContentPage: DynamicContentPage;
  fileOperationPage: FileOperationsPage;
  clipboardPage: ClipboardPage;
}

export const test = base.extend<MyFixture>({
  basicClicksPage: async ({ page }, use) => {
    const po = new BasicClicksPage(page);
    await po.goto();
    await use(po);
  },
  textInputPage: async ({ page }, use) => {
    const tx = new TextInputPage(page);
    await tx.goto();
    await use(tx);
  },
  formControlsPage: async ({ page }, use) => {
    const fo = new FormControlsPage(page);
    await fo.goto();
    await use(fo);
  },
  keyboardMousePage: async ({ page }, use) => {
    const kmp = new KeyboardMousePage(page);
    await kmp.goto();
    await use(kmp);
  },
  dialogsPage: async ({ page }, use) => {
    const dp = new DialogsPage(page);
    await dp.goto();
    await use(dp);
  },
  frameWindowPage: async ({ page }, use) => {
    const fw = new FramesWindowsPage(page);
    await fw.goto();
    await use(fw);
  },
  dynamicContentPage: async ({ page }, use) => {
    const dc = new DynamicContentPage(page);
    await dc.goto();
    await use(dc);
  },
  fileOperationPage: async ({ page }, use) => {
    const fo = new FileOperationsPage(page);
    await fo.goto();
    await use(fo);
  },
  clipboardPage: async ({ page }, use) => {
    const cp = new ClipboardPage(page);
    await cp.goto();
    await use(cp);
  },
});
export { expect } from '@playwright/test';
