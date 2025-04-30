const formattingConfig = {
  semi: false,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80
}
const pluginsConfig = {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
}

const config = {
  ...formattingConfig,
  ...pluginsConfig
}

export default config
