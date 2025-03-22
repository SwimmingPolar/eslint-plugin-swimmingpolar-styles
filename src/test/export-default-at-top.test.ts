import { createRuleTester } from "../utils";
import rule from "../rules/export-default-at-top";

const ruleTester = createRuleTester();

ruleTester.run("Export default should be at the top of the file", rule, {
  valid: [
    {
      code: `
import React from "react";

type Props = { name: string }; 
export default function Component(props: Props) {}
`,
    },
    {
      code: `export default function useTestHook(){}`,
    },
  ],
  invalid: [
    {
      code: `
import React from "react";

const PIE = 3.14;
type Props = { name: string }; 

export default function Component(props: Props) {}
`,
      errors: [
        {
          messageId: "exportDefaultAfterImports",
        },
        {
          messageId: "noEmptyLineBeforeExport",
        },
      ],
    },
    {
      code: `
import fs from "fs";
import path from "path";

type Data =  { age: number; }
type Props = { name: string };
export default function Component(props: Props) {}
`,
      errors: [
        {
          messageId: "singleTypeforDefaultComponent",
        },
      ],
    },
    {
      code: `
import fs from "fs";
import path from "path";

type Props = { name: string };

export default function Component(props: Props) {}  
`,
      errors: [
        {
          messageId: "noEmptyLineBeforeExport",
        },
      ],
    },
  ],
});
