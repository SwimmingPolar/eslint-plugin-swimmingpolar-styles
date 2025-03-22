import { createRule } from "../utils.js";
import { TSESTree } from "@typescript-eslint/utils";

export default createRule({
  create(context) {
    let lastTypeNode: TSESTree.TSTypeAliasDeclaration | null = null;

    return {
      TSTypeAliasDeclaration(node: TSESTree.TSTypeAliasDeclaration) {
        lastTypeNode = node; // Track the last seen `type`
      },

      TSInterfaceDeclaration(node: TSESTree.TSInterfaceDeclaration) {
        const sourceCode = context.sourceCode;
        const nextToken = sourceCode.getTokenAfter(node, {
          includeComments: false,
        });

        if (
          nextToken &&
          nextToken.type === "Keyword" &&
          nextToken.value === "export"
        ) {
          context.report({
            node,
            messageId: "mustBeType",
          });
        }
      },

      ExportDefaultDeclaration() {
        if (!lastTypeNode) {
          return; // No type found before export default, ignore
        }

        const expectedTypeName = getExpectedTypeName(context);

        console.log(expectedTypeName);
        console.log(lastTypeNode.id.name);
        if (lastTypeNode.id.name !== expectedTypeName) {
          context.report({
            node: lastTypeNode,
            messageId: "mustMatchComponentName",
            data: {
              FilenameProps: expectedTypeName,
            },
          });
        }
      },
    };

    type ContextType = typeof context;
    function getExpectedTypeName(context: ContextType) {
      const filename = context.filename;
      const basename = filename.split(/[/\\]/).pop() ?? "";
      const filenameWithoutExt = basename.split(".")[0];

      if (filenameWithoutExt.startsWith("use-")) {
        return kebabToCamelForHook(filenameWithoutExt) + "Props";
      } else {
        return kebabToPascalCase(filenameWithoutExt) + "Props";
      }
    }

    function kebabToPascalCase(kebabStr: string) {
      return kebabStr
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
    }

    function kebabToCamelForHook(kebabStr: string) {
      const parts = kebabStr.substring(4).split("-");
      return (
        "Use" +
        parts
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("")
      );
    }
  },
  meta: {
    docs: {
      description:
        "Ensure the type before `export default` is `{FilenameProps}` or `{UseFilenameProps}` for hooks.",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      mustBeType:
        "Only `type` is allowed before `export default`, not `interface`.",
      mustMatchComponentName:
        "The type name must be `{{ FilenameProps }}` or `{{ FilenameProps }}` for hooks.",
    },
    type: "problem",
    schema: [],
  },
  name: "allow-type-props-only",
  defaultOptions: [],
});
