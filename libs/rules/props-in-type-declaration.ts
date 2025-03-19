import { TSESLint, TSESTree, ESLintUtils } from "@typescript-eslint/utils"
type MessageIds = "messageIdForSomeFailure" | "messageIdForSomeOtherFailure"

const useFunctionKeyword: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce proper Props type declaration for components"
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
    const sourceCode = context.getSourceCode()
    const components = new Map()
    const propTypes = new Map()

    return {
      // Track function component declarations
      FunctionDeclaration(node) {
        if (node.id && /^[A-Z]/.test(node.id.name)) {
          components.set(node.id.name, node)
        }
      },

      // Track type declarations
      TSTypeAliasDeclaration(node) {
        if (node.id && node.id.name.endsWith("Props")) {
          propTypes.set(node.id.name, {
            node,
            start: node.start,
            componentName: node.id.name.replace(/Props$/, "")
          })
        }
      },

      "Program:exit"() {
        components.forEach((componentNode, componentName) => {
          const sourceBeforeComponent = sourceCode.getText().slice(0, componentNode.range[0])
          const lastTypeOrInterfaceEnd = Math.max(
            sourceBeforeComponent.lastIndexOf("type"),
            sourceBeforeComponent.lastIndexOf("interface")
          )

          // If there's no type/interface right before the component, skip checking
          if (lastTypeOrInterfaceEnd === -1) {
            return
          }

          const expectedPropsName = `${componentName}Props`
          const propsTypeInfo = propTypes.get(expectedPropsName)

          // Check if props type exists
          if (!propsTypeInfo) {
            context.report({
              node: componentNode,
              message: `Component ${componentName} should have a type named '${expectedPropsName}'`
            })
            return
          }

          // Check if props type is positioned right before the component
          // We need to allow for export default and whitespace between type and component
          const propTypeEnd = propsTypeInfo.node.range[1]
          const componentStart = componentNode.range[0]
          const textBetween = sourceCode.text.substring(propTypeEnd, componentStart)

          // This regex will allow for whitespace and "export default" between the type and component
          const validTextBetweenPattern =
            /^(\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|export\s+default\s*)*$/

          if (!validTextBetweenPattern.test(textBetween)) {
            context.report({
              node: propsTypeInfo.node,
              message: `Type '${expectedPropsName}' should be positioned right before component '${componentName}'`
            })
          }
        })

        // Check if all types with 'Props' suffix follow naming convention
        propTypes.forEach((typeInfo, typeName) => {
          if (!typeName.match(/^[A-Z][A-Za-z0-9]*Props$/)) {
            context.report({
              node: typeInfo.node,
              message: `Props type '${typeName}' should start with a capital letter and end with 'Props'`
            })
          }
        })
      }
    }
  }
}

export default useFunctionKeyword
