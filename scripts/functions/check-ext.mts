import '../node-global.mjs';

/**
 *
 * @param {string} dir
 * @param {string} expectedExtensions
 */
const checkFn = async (
  dir: string,
  expectedExtensions: string,
): Promise<void> => {
  const files = await glob(`${dir}/**/*`, {
    ignore: [`${dir}/tsconfig.json`, `${dir}/globals.d.mts`],
  });

  for (const file of files) {
    if (!file.endsWith(expectedExtensions)) {
      console.error(
        `File "${file}" does not have the expected extension "${expectedExtensions}".`,
      );
      process.exit(1);
    }
  }
};

export const checkExt = async (): Promise<void> => {
  await checkFn(path.resolve(projectRootPath, './src'), '.mts');
  await checkFn(path.resolve(projectRootPath, './scripts'), '.mts');
};
