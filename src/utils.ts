/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable n/no-unpublished-import */

import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleTester, RuleTesterConfig } from "@typescript-eslint/rule-tester";
import * as vitest from "vitest";

import tseslint from "typescript-eslint";

RuleTester.afterAll = vitest.afterAll;
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export interface ExampleTypedLintingRuleDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<ExampleTypedLintingRuleDocs>(
  () => "https://github.com/SwimmingPolar/eslint-swimmingpolar-rules",
);

export const createRuleTester = (testerConfig?: RuleTesterConfig) =>
  new RuleTester(
    testerConfig ?? {
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
        },
      },
    },
  );
