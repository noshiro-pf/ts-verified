import '../node-global.mjs';

/**
 * @returns {Promise<void>}
 */
export const checkIfRepoIsDirty = async (): Promise<void> => {
  const res = await $('git status --porcelain');

  if (res.type === 'ok' && res.stdout === '') {
    console.log('Repo is clean');
    return;
  }

  console.log('Repo is dirty');

  // Show files not tracked by git and unstaged changes
  await $('git add -N .');
  await $('git diff');

  process.exit(1);
};

/**
 * @returns {Promise<boolean>} - Returns true if the repo is dirty, false otherwise.
 */
export const repoIsDirty = async (): Promise<boolean> => {
  const res = await $('git status --porcelain');

  return res.type === 'ok' && res.stdout !== '';
};
