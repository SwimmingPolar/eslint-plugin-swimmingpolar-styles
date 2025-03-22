import { createRuleTester } from "../utils";
import rule from "../rules/allow-type-props-only";

const ruleTester = createRuleTester();

ruleTester.run("Use type instead of interface and prepend with Props", rule, {
  valid: [
    {
      filename: "test-component.tsx",
      code: `
type TestComponentProps = { name: string };

export default function TestComponent(props: TestComponentProps) {} 
`,
    },
    {
      filename: "use-test-hook.tsx",
      code: `
type UseTestHookProps = { url: string };

export default function useTestHook(props: UseTestHookProps) {}  
`,
    },
    {
      filename: "test-component.tsx",
      code: `
type TestComponentProps = { name: string };

export default function TestComponent(props: TestComponentProps) {} 

interface SomeInterface { name: string; }
`,
    },
  ],
  invalid: [
    {
      filename: "test-component.tsx",
      code: `
type Props = { name: string };

export default function TestComponent(props: Props) {}
`,
      errors: [
        {
          messageId: "mustMatchComponentName",
          data: {
            FilenameProps: "TestComponentProps",
          },
        },
      ],
    },
    {
      filename: "test-component.tsx",
      code: `
interface TestComponentProps { name: string; } 

export default function TestComponent(props: TestComponentProps) {}
`,
      errors: [
        {
          messageId: "mustBeType",
        },
      ],
    },
    {
      filename: "use-test-hook.tsx",
      code: `
type UseSomeHookProps = { url: string };

export default function useTestHook(props: UseSomeHookProps) {}  
`,
      errors: [
        {
          messageId: "mustMatchComponentName",
          data: {
            FilenameProps: "UseTestHookProps",
          },
        },
      ],
    },
  ],
});
