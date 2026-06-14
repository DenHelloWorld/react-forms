import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      '**/*.min.js',
      'node_modules',
      'src/test-utils/**',
    ],
  },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintPluginPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...react.configs.recommended.rules,
      // New JSX transform (React 17+): no need to import React in every file
      ...react.configs['jsx-runtime'].rules,
      // prop-types are redundant when using TypeScript
      'react/prop-types': 'off',
      // Catch bugs: hooks must be called unconditionally and at the top level
      ...reactHooks.configs.recommended.rules,
      // Enforce that only components are exported from files used with Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Experimental React Compiler – flags code that breaks the compiler
      'react-compiler/react-compiler': 'error',
      // Prevent object/array literals in JSX props (causes re-renders on every render)
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': 'warn',
      'react/no-array-index-key': 'warn', // index as key causes subtle bugs
      'react/no-danger': 'error', // dangerouslySetInnerHTML = XSS risk
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],

      // ── Accessibility ─────────────────────────────────────────────────────────
      // Every interactive element must be reachable via keyboard and labelled
      ...jsxA11y.configs.recommended.rules,

      // ── TypeScript strict rules ───────────────────────────────────────────────
      // Already covered by strictTypeChecked, but listed here for visibility:
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      // Avoid accidental floating promises (a very common async bug)
      '@typescript-eslint/no-floating-promises': 'error',
      // Warn on awaiting non-thenables (usually a logic error)
      '@typescript-eslint/await-thenable': 'error',
      // Enforce `import type` for type-only imports (better tree-shaking)
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // Require explicit return types on exported functions (improves readability)
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      // Ban non-null assertions (!) – use proper null checks instead
      '@typescript-eslint/no-non-null-assertion': 'error',
      // Empty functions are usually forgotten stubs
      '@typescript-eslint/no-empty-function': 'error',
      // Unused variables are dead code – error, not warning
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ── General best practices ────────────────────────────────────────────────
      // console.log is fine in dev but must never reach production builds
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // debugger statements must never be committed
      'no-debugger': 'error',
      // Prevents accidental reassignment of function parameters
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state'],
        },
      ],
      // Disallows alert/confirm/prompt – use a proper UI component
      'no-alert': 'error',
      // Prefer const wherever possible;
      'prefer-const': 'error',
      // Disallow var – always use const or let
      'no-var': 'error',
      // Enforce === over == to avoid type coercion surprises
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      // Flag unreachable code after return/throw/break/continue
      'no-unreachable': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // ─── A separate exception for React components ────────────────────────────────────────────
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // ─── Relaxed rules for test files ────────────────────────────────────────────
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'no-console': 'off',
    },
  }
);
