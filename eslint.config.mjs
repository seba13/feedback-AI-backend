import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

import eslintConfigPrettier from "eslint-config-prettier";

import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  ...tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended),
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          endOfLine: "auto",
        },
      ],
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  eslintConfigPrettier,
];
