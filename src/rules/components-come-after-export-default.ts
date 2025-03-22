import { createRule } from "../utils.js";
import { TSESTree } from "@typescript-eslint/utils";

export default createRule({
  create(context) {
    let exportDefaultNode: TSESTree.ExportDefaultDeclaration | null = null;
    let jsxComponents: TSESTree.ProgramStatement[] = [];
    let misplacedComponents: TSESTree.ProgramStatement[] = [];

    return {
      Program(node) {
        const body = node.body;

        // Find export default
        exportDefaultNode = body.find(
          (n) => n.type === "ExportDefaultDeclaration",
        ) as TSESTree.ExportDefaultDeclaration | null;
        if (!exportDefaultNode) return;

        // Collect all JSX components
        for (const statement of body) {
          if (isJSXComponent(statement)) {
            jsxComponents.push(statement);
          }
        }

        // Validate order: JSX components must appear immediately after `export default`
        const exportIndex = body.indexOf(exportDefaultNode);
        let expectedIndex = exportIndex + 1;

        for (const component of jsxComponents) {
          const actualIndex = body.indexOf(component);
          if (actualIndex !== expectedIndex) {
            misplacedComponents.push(component);
          }
          expectedIndex++; // The next component should be in the next index
        }

        // Report all misplaced components
        for (const node of misplacedComponents) {
          context.report({
            node,
            messageId: "misplacedComponent",
          });
        }
      },
    };

    function isJSXComponent(node: TSESTree.ProgramStatement): boolean {
      if (node.type === "FunctionDeclaration" && isUppercase(node.id?.name)) {
        return returnsJSX(node.body);
      }

      if (node.type === "VariableDeclaration") {
        const declaration = node.declarations[0];
        if (
          declaration &&
          declaration.id.type === "Identifier" &&
          isUppercase(declaration.id.name)
        ) {
          return returnsJSX(declaration.init);
        }
      }

      return false;
    }

    function isUppercase(name?: string): boolean {
      return !!name && /^[A-Z]/.test(name);
    }

    function returnsJSX(
      node: TSESTree.Expression | TSESTree.BlockStatement | null,
    ): boolean {
      if (!node) return false;
      const sourceCode = context.sourceCode;
      return sourceCode.getText(node).includes("<");
    }
  },
  meta: {
    docs: {
      description:
        "Ensure all top-level JSX components are grouped immediately after `export default`.",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      misplacedComponent:
        "All top-level JSX components must be grouped immediately after `export default`.",
    },
    type: "problem",
    schema: [],
  },
  name: "components-come-after-export-default",
  defaultOptions: [],
});
