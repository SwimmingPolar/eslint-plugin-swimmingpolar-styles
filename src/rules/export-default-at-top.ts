import { createRule } from "../utils.js";
import { TSESTree } from "@typescript-eslint/utils";

export default createRule({
  create(context) {
    let lastImportLine = -1; // Tracks the last import-related line
    let hasSeenExportDefault = false; // Tracks if `export default` has already been seen
    let lastAllowedTypeOrInterface: TSESTree.Node | null = null; // Tracks the last `type` or `interface`

    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration) {
        lastImportLine = node.loc!.end.line;
      },

      ImportExpression(node: TSESTree.ImportExpression) {
        lastImportLine = node.loc!.end.line;
      },

      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration) {
        checkAllowedTypeOrInterface(node);
      },

      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration) {
        checkAllowedTypeOrInterface(node);
      },

      ExportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration) {
        if (hasSeenExportDefault) {
          return; // Prevent multiple errors if multiple `export default` exist
        }
        hasSeenExportDefault = true;

        if (lastImportLine === -1) {
          // No imports found before export default (optional: allow/disallow?)
          return;
        }

        const exportLine = node.loc!.start.line;

        if (lastAllowedTypeOrInterface) {
          const typeLine = lastAllowedTypeOrInterface.loc!.end.line;
          if (exportLine !== typeLine + 1) {
            context.report({
              node,
              messageId: "noEmptyLineBeforeExport",
            });
          }
        } else if (exportLine !== lastImportLine + 1) {
          context.report({
            node,
            messageId: "exportDefaultAfterImports",
          });
        }
      },

      "Program > *"(node: TSESTree.Node) {
        // Ensure nothing appears between imports and `export default` except allowed types/interfaces
        if (
          lastImportLine !== -1 &&
          node.loc!.start.line > lastImportLine + 1 &&
          node.type !== "ExportDefaultDeclaration" &&
          node.type !== "TSInterfaceDeclaration" &&
          node.type !== "TSTypeAliasDeclaration" &&
          !isImportNode(node)
        ) {
          context.report({
            node,
            messageId: "exportDefaultAfterImports",
          });
        }
      },
    };

    function checkAllowedTypeOrInterface(node: TSESTree.Node) {
      if (lastAllowedTypeOrInterface) {
        // Prevent multiple `type` or `interface` declarations before `export default`
        context.report({
          node,
          messageId: "singleTypeforDefaultComponent",
        });
      }
      lastAllowedTypeOrInterface = node;
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
        "Ensure to place export default function at the top of the file, optionally preceded by one type definition",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      exportDefaultAfterImports:
        "export default` must be the first statement after imports or an allowed type/interface.",
      noEmptyLineBeforeExport:
        "No empty line should exist between a type/interface and `export default`.",
      singleTypeforDefaultComponent:
        "Only one type declaration is allowed before `export default`.",
    },
    type: "problem",
    schema: [],
  },
  name: "export-default-at-top",
  defaultOptions: [],
});
