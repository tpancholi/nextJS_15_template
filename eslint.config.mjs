import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import checkFile from "eslint-plugin-check-file";
import security from "eslint-plugin-security";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            "node_modules",
            "public",
            ".next",
            "out",
            "coverage",
            "dist",
            "*.config.js",
            "*.config.mjs",
            "next-env.d.ts",
            // add more folders as needed
        ],
    },
    ...compat.config({
        extends: ["next",
            "next/core-web-vitals",
            "next/typescript",
            "prettier",
            "plugin:import/recommended",
            "plugin:import/typescript",
            "plugin:jsx-a11y/recommended",
        ],
        rules: {
            "prefer-arrow-callback": ["error"],
            "prefer-template": ["error"],
            "prefer-const": "error",
            semi: ["error"],
            quotes: ["error", "double"],
            // React rules
            "react/no-unescaped-entities": "off",
            "react/prop-types": "off",
            "react/jsx-key": ["error", { "checkFragmentShorthand": true }],
            "react/no-array-index-key": "warn",
            "react/jsx-no-bind": ["warn", { "allowArrowFunctions": true }],
            // React security
            "react/no-danger": "error",
            "react/no-danger-with-children": "error",
            "react/jsx-no-script-url": "error",
            "react/jsx-no-target-blank": ["error", { "allowReferrer": false }],
            // General security
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-new-func": "error",
            "no-console": ["warn", { "allow": ["warn", "info"] }],
            "no-debugger": "error",
            // Import rules for better organization
            "import/no-unresolved": "error",
            "import/named": "error",
            "import/default": "error",
            "import/no-duplicates": "error",
            "import/order": [
                "error",
                {
                    "alphabetize": { "order": "asc", "caseInsensitive": true },
                    "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                    "newlines-between": "always",
                    "pathGroups": [
                        {
                            "pattern": "@/**",
                            "group": "internal",
                            "position": "before"
                        },
                        {
                            "pattern": "~/**",
                            "group": "internal",
                            "position": "before"
                        }
                    ]
                }
            ],
            // Code complexity rules for maintainability
            "complexity": ["warn", { "max": 15 }],
            "max-depth": ["warn", 4],
            "max-lines": ["warn", { "max": 500, "skipBlankLines": true, "skipComments": true }],
            "max-lines-per-function": ["warn", { "max": 50, "skipBlankLines": true, "skipComments": true }],
            "max-params": ["warn", 4],
            // Accessibility rules
            "jsx-a11y/anchor-is-valid": "error",
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/aria-role": "error",
            "jsx-a11y/no-autofocus": "warn",
            // Basic TypeScript rules (non-type-aware)
            "@typescript-eslint/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
            ],
            "@typescript-eslint/explicit-function-return-type": [
                "error",
                {
                    "allowExpressions": true,
                    "allowTypedFunctionExpressions": true,
                    "allowHigherOrderFunctions": true
                }
            ],
            "@typescript-eslint/explicit-module-boundary-types": "error",
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
            "@typescript-eslint/no-non-null-assertion": "error",
            // React Hooks rules for performance
            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",
        },
    }),
    // TypeScript type-aware rules configuration
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            // Type-aware TypeScript rules
            "@typescript-eslint/no-floating-promises": ["error", { "ignoreVoid": true }],
            "@typescript-eslint/prefer-readonly": "error",
            "@typescript-eslint/strict-boolean-expressions": ["error", {
                "allowString": false,
                "allowNumber": false,
                "allowNullableObject": false
            }],
            "@typescript-eslint/prefer-nullish-coalescing": "error",
            "@typescript-eslint/prefer-optional-chain": "error",
            "@typescript-eslint/no-unnecessary-condition": "warn",
            "@typescript-eslint/no-unnecessary-type-assertion": "error",
            "@typescript-eslint/prefer-includes": "error",
            "@typescript-eslint/prefer-string-starts-ends-with": "error",
        },
    },
    // Security plugin configuration (separate from compat)
    {
        plugins: {
            security,
        },
        rules: {
            // Security rules - manually configured for flat config compatibility
            "security/detect-buffer-noassert": "error",
            "security/detect-child-process": "error",
            "security/detect-disable-mustache-escape": "error",
            "security/detect-eval-with-expression": "error",
            "security/detect-new-buffer": "error",
            "security/detect-no-csrf-before-method-override": "error",
            "security/detect-non-literal-fs-filename": "error",
            "security/detect-non-literal-regexp": "error",
            "security/detect-non-literal-require": "error",
            "security/detect-object-injection": "warn",
            "security/detect-possible-timing-attacks": "warn",
            "security/detect-pseudoRandomBytes": "error",
            "security/detect-unsafe-regex": "error",
        },
    },
    {
        plugins: {
            "check-file": checkFile,
        },
        files: ["src/**/*"],
        rules: {
            "check-file/filename-naming-convention": [
                "error",
                {
                    "**/*.{ts,tsx}": "KEBAB_CASE",
                    "**/types/*.{ts}": "PASCAL_CASE",
                    "**/constants/*.{ts}": "SCREAMING_SNAKE_CASE",
                },
                {
                    ignoreMiddleExtensions: true,
                },
            ],
            "check-file/folder-naming-convention": [
                "error",
                {
                    "!(src/app)/**/*": "KEBAB_CASE",
                    "!(**/__tests__)/**/*": "KEBAB_CASE",
                    "!(src/components)/**/*": "KEBAB_CASE",
                    "!(src/hooks)/**/*": "KEBAB_CASE",
                    "!(src/utils)/**/*": "KEBAB_CASE",
                    "!(src/lib)/**/*": "KEBAB_CASE",
                    "!(src/types)/**/*": "KEBAB_CASE",
                },
            ],
        },
    },
    // Environment-specific config for test files
    {
        files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}", "**/__tests__/**/*", "**/test-utils/**/*"],
        rules: {
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "max-lines-per-function": "off",
            "max-lines": "off",
            "no-console": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "complexity": "off",
            // Relax security rules for test files
            "security/detect-non-literal-fs-filename": "off",
            "security/detect-object-injection": "off",
            // Relax type-aware rules for tests
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-unnecessary-condition": "off",
        },
    },
    // Configuration for config files
    {
        files: ["**/*.config.{js,mjs,ts}", "**/next.config.{js,mjs,ts}", "**/tailwind.config.{js,mjs,ts}"],
        rules: {
            "@typescript-eslint/no-var-requires": "off",
            "no-console": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            // Relax security rules for config files
            "security/detect-non-literal-require": "off",
            "security/detect-non-literal-fs-filename": "off",
            // Relax type-aware rules for config files
            "@typescript-eslint/no-floating-promises": "off",
        },
    },
];

export default eslintConfig;
