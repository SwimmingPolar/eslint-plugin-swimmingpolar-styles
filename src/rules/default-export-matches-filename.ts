import { createRule } from "../utils.js";

export default createRule({
  create: (context) => {
    // Convert kebab-case to PascalCase
    function kebabToPascalCase(kebabStr: string) {
      return kebabStr
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
    }

    // Convert kebab-case to camelCase for hooks
    function kebabToCamelForHook(kebabStr: string) {
      if (kebabStr.startsWith("use-")) {
        // handle use-query-hook → useQueryHook
        const parts = kebabStr.substring(4).split("-");
        return (
          "use" +
          parts
            .map((part, i) => part.charAt(0).toUpperCase() + part.slice(1))
            .join("")
        );
      } else {
        // For non use- prefixed filenames, component rule should apply
        return kebabToPascalCase(kebabStr);
      }
    }

    // Get filename without extension
    const filename = context.filename;
    const basename = filename.split(/[/\\]/).pop() ?? "";
    const filenameWithoutExt = basename.split(".")[0];

    return {
      ExportDefaultDeclaration(node) {
        // Only check function declarations with a name
        if (
          node.declaration.type === "FunctionDeclaration" &&
          node.declaration.id
        ) {
          const functionName = node.declaration.id.name;

          // Determine if it's a hook (starts with 'use')
          const isHook = functionName.startsWith("use");

          if (isHook) {
            // For hooks, function should be camelCase (useHookName)
            const expectedName = kebabToCamelForHook(filenameWithoutExt);

            if (functionName !== expectedName) {
              context.report({
                node,
                messageId: "hookNameMismatch",
                data: { current: functionName, expected: expectedName },
              });
            }
          } else {
            // For components, function should be PascalCase (ComponentName)
            const expectedName = kebabToPascalCase(filenameWithoutExt);

            if (functionName !== expectedName) {
              context.report({
                node,
                messageId: "componentNameMismatch",
                data: { current: functionName, expected: expectedName },
              });
            }
          }
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Enforce to match default export name to filename",
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      hookNameMismatch:
        "Use filename as default hook name: '{{ current }}' should be '{{ expected }}'",
      componentNameMismatch:
        "Use filename as default component name: '{{ current }}' should be '{{ expected }}'",
    },
    type: "problem",
    schema: [],
  },
  name: "default-export-matches-filename",
  defaultOptions: [],
});
