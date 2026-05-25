import * as fs from 'fs';
import * as path from 'path';

const TEST_DATA_DIR = path.join(process.cwd(), 'src', 'utils', 'test-data');

export function createTestFile(filename: string, content: string): string {
  if (!fs.existsSync(TEST_DATA_DIR)) {
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }
  const filePath = path.join(TEST_DATA_DIR, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
}

export function createTestFiles(
  files: Array<{ name: string; content: string }>,
): string[] {
  return files.map((f) => createTestFile(f.name, f.content));
}

export function cleanupTestData(): void {
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
}