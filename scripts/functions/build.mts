import '../node-global.mjs';
import { checkExt } from './check-ext.mjs';
import { genIndex } from './gen-index.mjs';

export const build = async (): Promise<void> => {
  await checkExt();

  await fs.rm(path.resolve(projectRootPath, './dist'), {
    recursive: true,
    force: true,
  });

  await genIndex();

  await $('tsc --noEmit');
  echo('Type checking done.\n');

  await $(
    `rollup --config ${path.resolve(projectRootPath, './configs/rollup.config.ts')} --configPlugin typescript --configImportAttributesKey with`,
  );
  echo('Building done.\n');

  await $(
    `cp ${path.resolve(projectRootPath, './src/globals.d.mts')} ${path.resolve(projectRootPath, './dist')}`,
  );
  echo('Copied src/globals.d.mts to dist/globals.d.mts.\n');

  await $(
    `echo '{ "include": ["."] }' > ${path.resolve(projectRootPath, './dist/tsconfig.json')}`,
  );
  echo('Generated dist/tsconfig.json.\n');
};
