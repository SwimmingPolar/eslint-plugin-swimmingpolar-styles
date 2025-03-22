import { createRule } from "../utils.js";
import { TSESTree } from "@typescript-eslint/utils";

type ImportTypes = TSESTree.ImportDeclaration | TSESTree.ImportExpression;

export default createRule({
  create(context) {
    const sourceCode = context.sourceCode;
    let lastImportLine = -1; // Tracks the last import-related line
    let hasEncounteredNonImport = false; // Detects first non-import statement

    return {
      ImportDeclaration(node) {
        checkImportGrouping(node);
      },

      Program() {
        hasEncounteredNonImport = false; // Reset flag at the start of the file
      },

      // Detect when we encounter a non-import statement
      "Program > *"(node: TSESTree.Node) {
        if (!isImportNode(node)) {
          hasEncounteredNonImport = true;
        }
      },
    };

    function checkImportGrouping(node: ImportTypes) {
      if (hasEncounteredNonImport) {
        // If a non-import statement was encountered before this, the import is misplaced
        context.report({
          node,
          messageId: "nonGroupedImport",
        });
      } else if (lastImportLine !== -1) {
        const prevToken = sourceCode.getTokenBefore(node, {
          includeComments: true,
        });

        if (prevToken && prevToken.loc.end.line < node.loc.start.line - 1) {
          // Allow only one empty line between grouped imports
          const linesBetween = node.loc.start.line - prevToken.loc.end.line;
          if (linesBetween > 1) {
            context.report({
              node,
              messageId: "oneEmptyLineBetweenImports",
            });
          }
        }
      }

      lastImportLine = node.loc.start.line; // Update last seen import line
    }

    function isImportNode(node: TSESTree.Node) {
      return (
        node.type === "ImportDeclaration" || node.type === "ImportExpression"
      );
    }
  },
  meta: {
    docs: {
      description:
        "Ensure all import statements (static & dynamic) are grouped together at the top.",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      nonGroupedImport:
        "All import statements should be grouped together at the top.",
      oneEmptyLineBetweenImports: "Avoid multiple empty lines between imports.",
    },
    type: "problem",
    schema: [],
  },
  name: "group-imports-at-the-top",
  defaultOptions: [],
});
