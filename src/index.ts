import fs from "fs";
import rules from "./rules/index.js";

const { name, version } = JSON.parse(
  fs.readFileSync(new URL("../package.json", import.meta.url), "utf8"),
) as { name: string; version: string };

const plugin = {
  configs: {
    get recommended() {
      return recommended;
    },
  },
  meta: { name, version },
  rules,
};

const recommended = {
  plugins: {
    "swimmingpolar-react-eslint-rules": plugin,
  },
  rules,
};

export default plugin;
