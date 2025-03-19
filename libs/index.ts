import rules from "./rules";

const { name, version } =
  // `import`ing here would bypass the TSConfig's `"rootDir": "src"`
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("../package.json") as typeof import("../package.json");

export default {
  meta: { name, version },
  rules,
  configs: {
    recommended: {
      rules: {
        "eslint-swimmingpolar-rules/use-function-keyword": "error",
        "myconventions/export-default-at-top": "error",
        "myconventions/props-in-type-declaration": "error",
        "myconventions/default-export-matches-filename": "error",
        "myconventions/components-right-after-export-default": "error",
        "myconventions/variable-before-util-functions": "error",
      },
    },
  },
};
