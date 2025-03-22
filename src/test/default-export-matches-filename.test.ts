import { createRuleTester } from "../utils.js";

import rule from "../rules/default-export-matches-filename.js";

const ruleTester = createRuleTester();

ruleTester.run("Export default should match file-name", rule, {
  valid: [
    {
      filename: "test-component.tsx",
      code: `export default function TestComponent(){}`,
    },
    {
      filename: "use-test-hook.tsx",
      code: `export default function useTestHook(){}`,
    },
    {
      filename: "use-test-hook.tsx",
      code: ``,
    },
  ],
  invalid: [
    {
      filename: "test-component.tsx",
      code: `export default function WrongComponentName(){}`,
      errors: [
        {
          messageId: "componentNameMismatch",
          data: { current: "WrongComponentName", expected: "TestComponent" },
        },
      ],
    },
    {
      filename: "use-test-hook.tsx",
      code: `export default function useWrongHookName(){}`,
      errors: [
        {
          messageId: "hookNameMismatch",
          data: { current: "useWrongHookName", expected: "useTestHook" },
        },
      ],
    },
  ],
});
