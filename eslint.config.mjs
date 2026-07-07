// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import globals from 'globals'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs.recommended,
    {
        files: ['**/*.astro'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
            },
        },
    },
    {
        files: ['**/*.astro/*.ts', '*.astro/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                sourceType: 'module',
            },
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        ignores: ['dist/', '.astro/', 'node_modules/'],
    },
)
