/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{ts,tsx,js}': ['prettier --write'],
  // Solo lint en archivos que no sean de UI
  // 'src/!(shared/components)/**/*.{ts,tsx}': ['eslint --fix'],
};
