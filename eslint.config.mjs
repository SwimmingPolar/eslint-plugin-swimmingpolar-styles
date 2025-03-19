import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import eslintPluginN from "eslint-plugin-n";

export default tseslint.config([
  {
    extends: [
      eslintPlugin.configs["flat/recommended"],
      eslintPluginN.configs["flat/recommended-script"],
    ],
    rules: {
      "eslint-plugin/require-meta-docs-description": "error",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.resolve("."),
      },
    },
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
    ],
  },
  tseslint.configs.strict,
  tseslint.configs.stylistic,
]);
