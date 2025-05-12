import '../node-global.mjs';

export const genDocs = async (): Promise<void> => {
  await $(
    `typedoc --options ${path.resolve(projectRootPath, './configs/typedoc.config.mjs')}`,
  );
  await $(`npm run fmt`);
  await $(`npm run md`);
};
