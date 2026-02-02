/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',

  printWidth: 90,
  tabWidth: 2,
  useTabs: false,

  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,

  endOfLine: 'lf',

  // React
  jsxSingleQuote: false,

  // Plugins
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],

  // Imports (muy importante en front)
  importOrder: ['^react', '^react-dom', '^@tanstack/react-query', '^@/', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  // Evita ruido
  quoteProps: 'as-needed',
};
