import { TSESLint, TSESTree, ESLintUtils } from "@typescript-eslint/utils";
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure";

const componentsRightAfterExportDefault: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce components immediately after export default function",
    },
    messages: {
      messageIdForSomeFailure:
        "Use function declaration instead of arrow function for React components",
      messageIdForSomeOtherFailure: "",
    },
    fixable: "code",
    schema: [], // no options
  },
  create: (context) => {
    const components = [];
    const utilities = [];
    let exportDefaultFound = false;
    let depth = 0; // Track function depth

    function isJSXReturningFunction(body) {
      return (
        body.type === "JSXElement" ||
        (body.type === "BlockStatement" &&
          body.body.some(
            (stmt) =>
              stmt.type === "ReturnStatement" &&
              stmt.argument?.type === "JSXElement",
          ))
      );
    }

    return {
      // Function declarations (component or utility)
      FunctionDeclaration(node) {
        if (depth > 0) return; // Skip nested functions
        depth++; // Enter function scope

        if (depth === 1) {
          if (node.id && /^[A-Z]/.test(node.id.name)) {
            // Component function
            if (isJSXReturningFunction(node.body)) {
              components.push({
                name: node.id.name,
                node,
                start: node.range[0],
              });
            }
          } else if (node.id) {
            // Utility function
            utilities.push({ name: node.id.name, node, start: node.range[0] });
          }
        }
      },

      VariableDeclarator(node) {
        if (depth === 0 && node.init?.type === "ArrowFunctionExpression") {
          const isComponent = /^[A-Z]/.test(node.id.name);
          const returnsJSX = isJSXReturningFunction(node.init.body);

          if (isComponent && returnsJSX) {
            components.push({ name: node.id.name, node, start: node.range[0] });
          } else if (!isComponent) {
            utilities.push({ name: node.id.name, node, start: node.range[0] });
          }
        }
      },

      // On exiting function, reduce depth
      "FunctionDeclaration:exit"() {
        // Detect export default function
        if (!exportDefaultFound && node.id?.name === "default") {
          exportDefaultFound = true;
        }
        if (depth > 0) depth--; // Exit function scope only if we're inside a function
      },

      // On program exit, check if the order is correct
      "Program:exit"() {
        if (!exportDefaultFound) return; // Skip if no export default is found

        if (components.length === 0 || utilities.length === 0) return;

        // Find the first component function after export default
        const firstComponent = components.reduce(
          (first, current) => (current.start < first.start ? current : first),
          components[0],
        );

        // Check if any utility function appears before the first component
        utilities.forEach((utility) => {
          if (utility.start < firstComponent.start) {
            context.report({
              node: utility.node,
              message: `Utility function '${utility.name}' should be placed after all component functions.`,
            });
          }
        });
      },
    };
  },
};

export default componentsRightAfterExportDefault;
