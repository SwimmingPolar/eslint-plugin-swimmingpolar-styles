import { TSESLint, TSESTree, ESLintUtils } from "@typescript-eslint/utils"
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure"

const useFunctionKeyword: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce using function keyword for React components"
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
    return {
      ArrowFunctionExpression(node) {
        if (
          node.parent?.type === "VariableDeclarator" &&
          node.parent?.id?.type === "Identifier" &&
          /^[A-Z]/.test(node.parent.id.name)
        ) {
          // Additional check: Does it return JSX?
          const body = node.body
          const returnsJSX =
            body.type === "JSXElement" ||
            (body.type === "BlockStatement" &&
              body.body.some(
                stmt => stmt.type === "ReturnStatement" && stmt.argument?.type === "JSXElement"
              ))

          if (returnsJSX) {
            context.report({
              node,
              messageId: "messageIdForSomeFailure"
            })
          }
        }
      }
    }
  }
}

export default useFunctionKeyword
