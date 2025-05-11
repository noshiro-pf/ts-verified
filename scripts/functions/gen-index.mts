import '../node-global.mjs';
import { checkExt } from './check-ext.mjs';

const TARGET_BASE_DIR = path.resolve(projectRootPath, './src');

const TARGET_EXTENSION = '.mts';
const EXPORT_EXTENSION = '.mjs'; // For ESM imports, .mts resolves to .mjs
const INDEX_FILE_NAME_MTS = `index${TARGET_EXTENSION}`;
const INDEX_FILE_NAME_MJS = `index${EXPORT_EXTENSION}`;

/**
 * Main function to start the index file generation process.
 */
export const genIndex = async (): Promise<void> => {
  await checkExt();

  console.log(`Starting index file generation in: ${TARGET_BASE_DIR}`);

  await generateIndexFileForDir(TARGET_BASE_DIR);
  console.log('Index file generation complete.');

  await $('npm run fmt');
};

/**
 * Generates an index.mts file for the given directory.
 * Recursively calls itself for subdirectories.
 * @param {string} dirPath The absolute path to the directory to process.
 */
const generateIndexFileForDir = async (dirPath: string): Promise<void> => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const subDirectories = [];
  const filesToExport = [];

  for (const entry of entries) {
    const entryName = entry.name;
    if (entry.isDirectory()) {
      subDirectories.push(entryName);
      // Recursively call for subdirectories first
      // eslint-disable-next-line no-await-in-loop
      await generateIndexFileForDir(path.join(dirPath, entryName));
    } else if (entry.isFile()) {
      if (
        entryName.endsWith(TARGET_EXTENSION) &&
        entryName !== INDEX_FILE_NAME_MTS &&
        !entryName.endsWith(`.d${TARGET_EXTENSION}`) &&
        !entryName.includes('.test.') // Exclude test files
      ) {
        filesToExport.push(entryName);
      }
    }
  }

  // Sort directories and files alphabetically for consistent output
  subDirectories.sort();
  filesToExport.sort();

  const exportStatements = [
    ...subDirectories.map(
      (subDir) => `export * from "./${subDir}/${INDEX_FILE_NAME_MJS}";`,
    ),
    ...filesToExport.map((file) => {
      const fileNameWithoutExt = file.substring(
        0,
        file.length - TARGET_EXTENSION.length,
      );

      return `export * from "./${fileNameWithoutExt}${EXPORT_EXTENSION}";`;
    }),
  ];

  const indexContent =
    exportStatements.length === 0 ? 'export {};' : exportStatements.join('\n');

  const indexPath = path.join(dirPath, INDEX_FILE_NAME_MTS);
  await fs.writeFile(indexPath, indexContent);
  console.log(`Generated: ${path.relative(process.cwd(), indexPath)}`);
};
