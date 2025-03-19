import { TSESLint, TSESTree, ESLintUtils } from "@typescript-eslint/utils";
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure";

const variableBeforeUtilFunctions: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce variable assignments before utility functions",
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
    const variables = [];
    const utilities = [];
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
      // Track function declarations (components & utility functions)
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

      // Track variable declarations (variable and function expressions)
      VariableDeclarator(node) {
        if (
          depth === 0 &&
          node.init &&
          node.init.type !== "FunctionDeclaration"
        ) {
          const isComponent = /^[A-Z]/.test(node.id.name);
          const returnsJSX =
            node.init.body && isJSXReturningFunction(node.init.body);

          if (isComponent && returnsJSX) {
            components.push({ name: node.id.name, node, start: node.range[0] });
          } else {
            variables.push({ name: node.id.name, node, start: node.range[0] });
          }
        }
      },

      // Exiting function scope
      "FunctionDeclaration:exit"() {
        if (depth > 0) depth--; // Exit function scope only if we're inside a function
      },

      // At the end of the program, check if variable assignments come before utilities
      "Program:exit"() {
        if (
          components.length === 0 ||
          utilities.length === 0 ||
          variables.length === 0
        )
          return;

        const componentLastLoc = Math.max(
          ...components.map((component) => component.node?.range[0]),
        );
        const variableStartLoc = Math.min(
          ...variables.map((variable) => variable.node.range[0]),
        );
        const variableEndLoc = Math.max(
          ...variables.map((variable) => variable.node.range[1]),
        );
        const utilStartLoc = Math.min(
          ...utilities.map((util) => util.node.range[0]),
        );

        // Check if variables come before utilities
        if (
          !(
            componentLastLoc <= variableStartLoc &&
            variableEndLoc <= utilStartLoc
          )
        ) {
          utilities.forEach((utility) => {
            context.report({
              node: utility.node,
              message: `Utility function '${utility.name}' should be placed after variable assignments.`,
            });
          });
        }
      },
    };
  },
};

export default variableBeforeUtilFunctions;
