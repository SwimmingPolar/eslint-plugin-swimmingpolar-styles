import { TSESLint, TSESTree, ESLintUtils } from "@typescript-eslint/utils"
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure"

const defaultExportMatchesFilename: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Ensure component/hook name matches filename with appropriate kebab to camelcase convertion"
    },
    messages: {
      messageIdForSomeFailure:
        "Use function declaration instead of arrow function for React components",
      messageIdForSomeOtherFailure: ""
    },
    fixable: "code",
    schema: [] // no options
  },
  create: context => {
    // Convert kebab-case to PascalCase
    function kebabToPascalCase(kebabStr) {
      return kebabStr
        .split("-")
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
    }

    // Convert kebab-case to camelCase for hooks
    function kebabToCamelForHook(kebabStr) {
      if (kebabStr.startsWith("use-")) {
        // handle use-query-hook → useQueryHook
        const parts = kebabStr.substring(4).split("-")
        return "use" + parts.map((part, i) => part.charAt(0).toUpperCase() + part.slice(1)).join("")
      } else {
        // For non use- prefixed filenames, component rule should apply
        return kebabToPascalCase(kebabStr)
      }
    }

    // Get filename without extension
    const filename = context.filename
    const basename = filename.split(/[\/\\]/).pop() // Handle both Unix and Windows paths
    const filenameWithoutExt = basename.split(".")[0]

    // Check if filename is in kebab-case
    const isKebabCase = /^[a-z]+(-[a-z0-9]+)*$/.test(filenameWithoutExt)

    return {
      ExportDefaultDeclaration(node) {
        // Only check function declarations with a name
        if (node.declaration.type === "FunctionDeclaration" && node.declaration.id) {
          const functionName = node.declaration.id.name

          // If filename is not in kebab-case, report error
          if (!isKebabCase) {
            context.report({
              node,
              message: `Filename '${filenameWithoutExt}' should be in kebab-case`
            })
            return
          }

          // Determine if it's a hook (starts with 'use')
          const isHook = functionName.startsWith("use")

          if (isHook) {
            // For hooks, function should be camelCase (useHookName)
            const expectedName = kebabToCamelForHook(filenameWithoutExt)

            if (functionName !== expectedName) {
              context.report({
                node,
                message: `Hook name '${functionName}' should be '${expectedName}' based on filename`
              })
            }
          } else {
            // For components, function should be PascalCase (ComponentName)
            const expectedName = kebabToPascalCase(filenameWithoutExt)

            if (functionName !== expectedName) {
              context.report({
                node,
                message: `Component name '${functionName}' should be '${expectedName}' based on filename`
              })
            }
          }
        }
      }
    }
  }
}

export default defaultExportMatchesFilename
