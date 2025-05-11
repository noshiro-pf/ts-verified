import { build } from '../functions/build.mjs';
import { checkExt } from '../functions/check-ext.mjs';
import { checkIfRepoIsDirty } from '../functions/check-if-repo-is-dirty.mjs';
import { genDocs } from '../functions/gen-docs.mjs';
import '../node-global.mjs';

export const checkAll = async (): Promise<void> => {
  await $(`cd ${projectRootPath}`);

  await $('npm i');

  await $(
    'cspell "**" --gitignore --gitignore-root ./ --no-progress --fail-fast',
  ).catch(() => {
    console.error('Spell check failed, try `npm run cspell` for more details.');
    process.exit(1);
  });

  await checkExt();

  await $('npm run test');

  await $('npm run lint:fix');
  await checkIfRepoIsDirty();

  await build();
  await checkIfRepoIsDirty();

  await genDocs();
  await checkIfRepoIsDirty();

  await $('npm run fmt');
  await checkIfRepoIsDirty();
};
