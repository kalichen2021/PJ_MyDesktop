// eslint.config.ts
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  {
    files: ["**/*.{ts,mts,cts,tsx}"], // 或者直接复用 tseslint.configs.recommended 再覆盖
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/naming-convention": [
        "warn", // 或者 "error"
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"], // 变量允许小驼峰或全大写常量
        },
        {
          selector: "function",
          format: ["camelCase"],
        },
        {
          selector: "typeLike", // 类、接口、类型别名、枚举
          format: ["PascalCase"],
        },
        // 更多选择器可按需添加
      ],
    },
  },
  // ... 其他配置
]);
