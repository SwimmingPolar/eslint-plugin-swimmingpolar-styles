import { createRuleTester } from "../utils";
import rule from "../rules/components-come-after-export-default";

const ruleTester = createRuleTester();

ruleTester.run(
  "Components should come right after export default component",
  rule,
  {
    valid: [
      {
        code: `
export default function Component() {
  return <h1>test</h1>;
}
function Header() {
  return <h1>test</h1>;
}
function Footer() {
  return <h1>test</h1>;
}

// Other non-JSX statements can follow
const someVar = "Not a component";
console.log("Some logic");
`,
      },
      {
        code: `
type ComponentProps = {
  name: string
}
export default function Component(props:ComponentProps) {
  return <h1>test</h1>;
}
function Header() {
  return <h1>test</h1>;
}
`,
      },
    ],
    invalid: [
      {
        code: `
function Header() {
  return <h1>test</h1>;
}

export default function WelcomeSlide1() {
  return <h1>test</h1>;
}
`,
        errors: [
          {
            messageId: "misplacedComponent",
          },
        ],
      },
      {
        code: `
export default function WelcomeSlide1() {
  return <h1>test</h1>;
}

const someVar = "Not a component";

function Header() {
  return <h1>test</h1>;
}

function Footer() {
  return <h1>test</h1>;
}
`,
        errors: [
          {
            messageId: "misplacedComponent",
          },
          {
            messageId: "misplacedComponent",
          },
        ],
      },
    ],
  },
);
