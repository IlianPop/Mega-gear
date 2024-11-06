import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginCypress from 'eslint-plugin-cypress';
import babelParser from '@babel/eslint-parser';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: globals.browser,
            parser: babelParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        files: ['**/*.cy.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: globals.cypress,
        },
        rules: {
            'no-undef': 'off',
        },
    },
    {
        plugins: {
            cypress: pluginCypress,
            react: pluginReact,
            js: pluginJs,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            ...pluginCypress.configs.recommended.rules,
        },
    },
];
