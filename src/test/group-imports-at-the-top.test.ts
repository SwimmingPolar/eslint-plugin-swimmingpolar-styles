import { createRuleTester } from "../utils";
import rule from "../rules/group-imports-at-the-top";

const ruleTester = createRuleTester();

ruleTester.run("Imports should be grouped together", rule, {
  valid: [
    {
      code: `
import fs from "fs";
import path from "path";  
import { readFile } from "fs";

const module = await import("os");  
`,
    },
  ],
  invalid: [
    {
      code: `
import fs from "fs";  
import path from "path";  

const module = await import("os");  

import { readFile } from "fs";  
`,
      errors: [
        {
          messageId: "nonGroupedImport",
        },
      ],
    },
    {
      code: `
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./routes/Home'))
const About = lazy(() => import('./routes/About'))

// error here
import { useMemo } from 'react'

function conditionalImport() {
  if (true) {
    return import('./route/Home')
  }
}
`,
      errors: [
        {
          messageId: "nonGroupedImport",
        },
      ],
    },
  ],
});
