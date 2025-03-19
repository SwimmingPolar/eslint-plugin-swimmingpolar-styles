import { TSESLint, TSESTree } from "@typescript-eslint/utils"
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure"

const exportDefaultAtTop: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Make sure export default function is at the top of the file, optionally preceded by one type definition"
    },
    messages: {
      messageIdForSomeFailure: "File must have an 'export default function Name(){}' declaration",
      messageIdForSomeOtherFailure:
        "Only one type definition is allowed before the default export function",
      ["msg3" as MessageIds]:
        "Default exported function should be at the top of the file (after imports and optional type definition)"
    },
    fixable: "code",
    schema: [] // no options
  },
  create: context => {
    let hasExports = false
    let defaultExportFunctionNode: TSESTree.ExportDefaultDeclaration | null = null
    let firstNonTypeNonImportNode: TSESTree.Node | null = null
    let typeDefinitionCount = 0
    const typeDefinitionNodes: TSESTree.TSTypeAliasDeclaration[] = []

    return {
      // Track any export statement
      ExportNamedDeclaration() {
        hasExports = true
      },

      // Capture the default export function declaration
      ExportDefaultDeclaration(node) {
        hasExports = true

        if (node.declaration.type === "FunctionDeclaration" && node.declaration.id) {
          defaultExportFunctionNode = node
        }
      },

      // Track type definitions using 'type' keyword
      TSTypeAliasDeclaration(node) {
        typeDefinitionCount++
        typeDefinitionNodes.push(node)
      },

      // Track the first non-import, non-type node
      ":not(ImportDeclaration, ExportAllDeclaration, TSTypeAliasDeclaration)"(node: TSESTree.Node) {
        // Only consider program-level statements (not nested in other nodes)
        if (node.parent && node.parent.type === "Program" && !firstNonTypeNonImportNode) {
          firstNonTypeNonImportNode = node
        }
      },

      "Program:exit"() {
        // Only check if we found exports
        if (hasExports) {
          // If no default export function was found
          if (!defaultExportFunctionNode) {
            context.report({
              node: context.sourceCode.ast,
              messageId: "messageIdForSomeFailure"
            })
            return
          }

          // Check if too many type definitions
          if (typeDefinitionCount > 1) {
            context.report({
              node: typeDefinitionNodes[1],
              messageId: "messageIdForSomeOtherFailure"
            })
          }

          // Check if the default export is at the top (allowing imports and one type definition before it)
          if (
            firstNonTypeNonImportNode &&
            firstNonTypeNonImportNode !== defaultExportFunctionNode &&
            firstNonTypeNonImportNode.range[0] < defaultExportFunctionNode.range[0]
          ) {
            context.report({
              node: defaultExportFunctionNode,
              messageId: "msg3" as MessageIds
            })
          }
        }
      }
    }
  }
}

export default exportDefaultAtTop
