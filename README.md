# ESLint TypeScript Selectors

Make sure one rule dictates only one thing.

## TODO

- [ ] Should rework on rules. Keeping in mind that one rule should only dictate one thing.

## Table of Contents

- [Core JavaScript Selectors](#core-javascript-selectors)
- [TypeScript Specific Selectors](#typescript-specific-selectors)
- [JSX Selectors](#jsx-selectors)

## Core JavaScript Selectors

### Expressions

| Selector                   | Type                                              |
| -------------------------- | ------------------------------------------------- |
| `AccessorProperty`         | `RuleFunction<TSESTree.AccessorProperty>`         |
| `ArrayExpression`          | `RuleFunction<TSESTree.ArrayExpression>`          |
| `ArrowFunctionExpression`  | `RuleFunction<TSESTree.ArrowFunctionExpression>`  |
| `AssignmentExpression`     | `RuleFunction<TSESTree.AssignmentExpression>`     |
| `AwaitExpression`          | `RuleFunction<TSESTree.AwaitExpression>`          |
| `BinaryExpression`         | `RuleFunction<TSESTree.BinaryExpression>`         |
| `CallExpression`           | `RuleFunction<TSESTree.CallExpression>`           |
| `ChainExpression`          | `RuleFunction<TSESTree.ChainExpression>`          |
| `ConditionalExpression`    | `RuleFunction<TSESTree.ConditionalExpression>`    |
| `FunctionExpression`       | `RuleFunction<TSESTree.FunctionExpression>`       |
| `ImportExpression`         | `RuleFunction<TSESTree.ImportExpression>`         |
| `LogicalExpression`        | `RuleFunction<TSESTree.LogicalExpression>`        |
| `MemberExpression`         | `RuleFunction<TSESTree.MemberExpression>`         |
| `MetaProperty`             | `RuleFunction<TSESTree.MetaProperty>`             |
| `NewExpression`            | `RuleFunction<TSESTree.NewExpression>`            |
| `ObjectExpression`         | `RuleFunction<TSESTree.ObjectExpression>`         |
| `SequenceExpression`       | `RuleFunction<TSESTree.SequenceExpression>`       |
| `TaggedTemplateExpression` | `RuleFunction<TSESTree.TaggedTemplateExpression>` |
| `ThisExpression`           | `RuleFunction<TSESTree.ThisExpression>`           |
| `UnaryExpression`          | `RuleFunction<TSESTree.UnaryExpression>`          |
| `UpdateExpression`         | `RuleFunction<TSESTree.UpdateExpression>`         |
| `YieldExpression`          | `RuleFunction<TSESTree.YieldExpression>`          |

### Statements

| Selector              | Type                                         |
| --------------------- | -------------------------------------------- |
| `BlockStatement`      | `RuleFunction<TSESTree.BlockStatement>`      |
| `BreakStatement`      | `RuleFunction<TSESTree.BreakStatement>`      |
| `ContinueStatement`   | `RuleFunction<TSESTree.ContinueStatement>`   |
| `DebuggerStatement`   | `RuleFunction<TSESTree.DebuggerStatement>`   |
| `DoWhileStatement`    | `RuleFunction<TSESTree.DoWhileStatement>`    |
| `EmptyStatement`      | `RuleFunction<TSESTree.EmptyStatement>`      |
| `ExpressionStatement` | `RuleFunction<TSESTree.ExpressionStatement>` |
| `ForInStatement`      | `RuleFunction<TSESTree.ForInStatement>`      |
| `ForOfStatement`      | `RuleFunction<TSESTree.ForOfStatement>`      |
| `ForStatement`        | `RuleFunction<TSESTree.ForStatement>`        |
| `IfStatement`         | `RuleFunction<TSESTree.IfStatement>`         |
| `LabeledStatement`    | `RuleFunction<TSESTree.LabeledStatement>`    |
| `ReturnStatement`     | `RuleFunction<TSESTree.ReturnStatement>`     |
| `SwitchStatement`     | `RuleFunction<TSESTree.SwitchStatement>`     |
| `ThrowStatement`      | `RuleFunction<TSESTree.ThrowStatement>`      |
| `TryStatement`        | `RuleFunction<TSESTree.TryStatement>`        |
| `WhileStatement`      | `RuleFunction<TSESTree.WhileStatement>`      |
| `WithStatement`       | `RuleFunction<TSESTree.WithStatement>`       |

### Declarations

| Selector              | Type                                         |
| --------------------- | -------------------------------------------- |
| `ClassDeclaration`    | `RuleFunction<TSESTree.ClassDeclaration>`    |
| `ClassExpression`     | `RuleFunction<TSESTree.ClassExpression>`     |
| `FunctionDeclaration` | `RuleFunction<TSESTree.FunctionDeclaration>` |
| `VariableDeclaration` | `RuleFunction<TSESTree.VariableDeclaration>` |
| `VariableDeclarator`  | `RuleFunction<TSESTree.VariableDeclarator>`  |

### Modules

| Selector                   | Type                                              |
| -------------------------- | ------------------------------------------------- |
| `ExportAllDeclaration`     | `RuleFunction<TSESTree.ExportAllDeclaration>`     |
| `ExportDefaultDeclaration` | `RuleFunction<TSESTree.ExportDefaultDeclaration>` |
| `ExportNamedDeclaration`   | `RuleFunction<TSESTree.ExportNamedDeclaration>`   |
| `ExportSpecifier`          | `RuleFunction<TSESTree.ExportSpecifier>`          |
| `ImportAttribute`          | `RuleFunction<TSESTree.ImportAttribute>`          |
| `ImportDeclaration`        | `RuleFunction<TSESTree.ImportDeclaration>`        |
| `ImportDefaultSpecifier`   | `RuleFunction<TSESTree.ImportDefaultSpecifier>`   |
| `ImportNamespaceSpecifier` | `RuleFunction<TSESTree.ImportNamespaceSpecifier>` |
| `ImportSpecifier`          | `RuleFunction<TSESTree.ImportSpecifier>`          |

### Miscellaneous

| Selector             | Type                                        |
| -------------------- | ------------------------------------------- |
| `ArrayPattern`       | `RuleFunction<TSESTree.ArrayPattern>`       |
| `AssignmentPattern`  | `RuleFunction<TSESTree.AssignmentPattern>`  |
| `CatchClause`        | `RuleFunction<TSESTree.CatchClause>`        |
| `ClassBody`          | `RuleFunction<TSESTree.ClassBody>`          |
| `Decorator`          | `RuleFunction<TSESTree.Decorator>`          |
| `Identifier`         | `RuleFunction<TSESTree.Identifier>`         |
| `Literal`            | `RuleFunction<TSESTree.Literal>`            |
| `MethodDefinition`   | `RuleFunction<TSESTree.MethodDefinition>`   |
| `ObjectPattern`      | `RuleFunction<TSESTree.ObjectPattern>`      |
| `PrivateIdentifier`  | `RuleFunction<TSESTree.PrivateIdentifier>`  |
| `Program`            | `RuleFunction<TSESTree.Program>`            |
| `Property`           | `RuleFunction<TSESTree.Property>`           |
| `PropertyDefinition` | `RuleFunction<TSESTree.PropertyDefinition>` |
| `RestElement`        | `RuleFunction<TSESTree.RestElement>`        |
| `SpreadElement`      | `RuleFunction<TSESTree.SpreadElement>`      |
| `StaticBlock`        | `RuleFunction<TSESTree.StaticBlock>`        |
| `Super`              | `RuleFunction<TSESTree.Super>`              |
| `SwitchCase`         | `RuleFunction<TSESTree.SwitchCase>`         |
| `TemplateElement`    | `RuleFunction<TSESTree.TemplateElement>`    |
| `TemplateLiteral`    | `RuleFunction<TSESTree.TemplateLiteral>`    |

## TypeScript Specific Selectors

### Keywords and Types

| Selector             | Type                                        |
| -------------------- | ------------------------------------------- |
| `TSAbstractKeyword`  | `RuleFunction<TSESTree.TSAbstractKeyword>`  |
| `TSAnyKeyword`       | `RuleFunction<TSESTree.TSAnyKeyword>`       |
| `TSAsyncKeyword`     | `RuleFunction<TSESTree.TSAsyncKeyword>`     |
| `TSBigIntKeyword`    | `RuleFunction<TSESTree.TSBigIntKeyword>`    |
| `TSBooleanKeyword`   | `RuleFunction<TSESTree.TSBooleanKeyword>`   |
| `TSDeclareKeyword`   | `RuleFunction<TSESTree.TSDeclareKeyword>`   |
| `TSExportKeyword`    | `RuleFunction<TSESTree.TSExportKeyword>`    |
| `TSIntrinsicKeyword` | `RuleFunction<TSESTree.TSIntrinsicKeyword>` |
| `TSNeverKeyword`     | `RuleFunction<TSESTree.TSNeverKeyword>`     |
| `TSNullKeyword`      | `RuleFunction<TSESTree.TSNullKeyword>`      |
| `TSNumberKeyword`    | `RuleFunction<TSESTree.TSNumberKeyword>`    |
| `TSObjectKeyword`    | `RuleFunction<TSESTree.TSObjectKeyword>`    |
| `TSPrivateKeyword`   | `RuleFunction<TSESTree.TSPrivateKeyword>`   |
| `TSProtectedKeyword` | `RuleFunction<TSESTree.TSProtectedKeyword>` |
| `TSPublicKeyword`    | `RuleFunction<TSESTree.TSPublicKeyword>`    |
| `TSReadonlyKeyword`  | `RuleFunction<TSESTree.TSReadonlyKeyword>`  |
| `TSStaticKeyword`    | `RuleFunction<TSESTree.TSStaticKeyword>`    |
| `TSStringKeyword`    | `RuleFunction<TSESTree.TSStringKeyword>`    |
| `TSSymbolKeyword`    | `RuleFunction<TSESTree.TSSymbolKeyword>`    |
| `TSUndefinedKeyword` | `RuleFunction<TSESTree.TSUndefinedKeyword>` |
| `TSUnknownKeyword`   | `RuleFunction<TSESTree.TSUnknownKeyword>`   |
| `TSVoidKeyword`      | `RuleFunction<TSESTree.TSVoidKeyword>`      |

### Type Definitions

| Selector                          | Type                                                     |
| --------------------------------- | -------------------------------------------------------- |
| `TSArrayType`                     | `RuleFunction<TSESTree.TSArrayType>`                     |
| `TSAsExpression`                  | `RuleFunction<TSESTree.TSAsExpression>`                  |
| `TSCallSignatureDeclaration`      | `RuleFunction<TSESTree.TSCallSignatureDeclaration>`      |
| `TSConditionalType`               | `RuleFunction<TSESTree.TSConditionalType>`               |
| `TSConstructorType`               | `RuleFunction<TSESTree.TSConstructorType>`               |
| `TSConstructSignatureDeclaration` | `RuleFunction<TSESTree.TSConstructSignatureDeclaration>` |
| `TSFunctionType`                  | `RuleFunction<TSESTree.TSFunctionType>`                  |
| `TSImportType`                    | `RuleFunction<TSESTree.TSImportType>`                    |
| `TSIndexedAccessType`             | `RuleFunction<TSESTree.TSIndexedAccessType>`             |
| `TSInferType`                     | `RuleFunction<TSESTree.TSInferType>`                     |
| `TSIntersectionType`              | `RuleFunction<TSESTree.TSIntersectionType>`              |
| `TSLiteralType`                   | `RuleFunction<TSESTree.TSLiteralType>`                   |
| `TSMappedType`                    | `RuleFunction<TSESTree.TSMappedType>`                    |
| `TSNamedTupleMember`              | `RuleFunction<TSESTree.TSNamedTupleMember>`              |
| `TSNonNullExpression`             | `RuleFunction<TSESTree.TSNonNullExpression>`             |
| `TSOptionalType`                  | `RuleFunction<TSESTree.TSOptionalType>`                  |
| `TSRestType`                      | `RuleFunction<TSESTree.TSRestType>`                      |
| `TSSatisfiesExpression`           | `RuleFunction<TSESTree.TSSatisfiesExpression>`           |
| `TSTemplateLiteralType`           | `RuleFunction<TSESTree.TSTemplateLiteralType>`           |
| `TSThisType`                      | `RuleFunction<TSESTree.TSThisType>`                      |
| `TSTupleType`                     | `RuleFunction<TSESTree.TSTupleType>`                     |
| `TSTypeAnnotation`                | `RuleFunction<TSESTree.TSTypeAnnotation>`                |
| `TSTypeAssertion`                 | `RuleFunction<TSESTree.TSTypeAssertion>`                 |
| `TSTypeLiteral`                   | `RuleFunction<TSESTree.TSTypeLiteral>`                   |
| `TSTypeOperator`                  | `RuleFunction<TSESTree.TSTypeOperator>`                  |
| `TSTypePredicate`                 | `RuleFunction<TSESTree.TSTypePredicate>`                 |
| `TSTypeQuery`                     | `RuleFunction<TSESTree.TSTypeQuery>`                     |
| `TSTypeReference`                 | `RuleFunction<TSESTree.TSTypeReference>`                 |
| `TSUnionType`                     | `RuleFunction<TSESTree.TSUnionType>`                     |

### Declaration and Structure

| Selector                        | Type                                                   |
| ------------------------------- | ------------------------------------------------------ |
| `TSAbstractAccessorProperty`    | `RuleFunction<TSESTree.TSAbstractAccessorProperty>`    |
| `TSAbstractMethodDefinition`    | `RuleFunction<TSESTree.TSAbstractMethodDefinition>`    |
| `TSAbstractPropertyDefinition`  | `RuleFunction<TSESTree.TSAbstractPropertyDefinition>`  |
| `TSClassImplements`             | `RuleFunction<TSESTree.TSClassImplements>`             |
| `TSDeclareFunction`             | `RuleFunction<TSESTree.TSDeclareFunction>`             |
| `TSEmptyBodyFunctionExpression` | `RuleFunction<TSESTree.TSEmptyBodyFunctionExpression>` |
| `TSEnumBody`                    | `RuleFunction<TSESTree.TSEnumBody>`                    |
| `TSEnumDeclaration`             | `RuleFunction<TSESTree.TSEnumDeclaration>`             |
| `TSEnumMember`                  | `RuleFunction<TSESTree.TSEnumMember>`                  |
| `TSExportAssignment`            | `RuleFunction<TSESTree.TSExportAssignment>`            |
| `TSExternalModuleReference`     | `RuleFunction<TSESTree.TSExternalModuleReference>`     |
| `TSImportEqualsDeclaration`     | `RuleFunction<TSESTree.TSImportEqualsDeclaration>`     |
| `TSIndexSignature`              | `RuleFunction<TSESTree.TSIndexSignature>`              |
| `TSInstantiationExpression`     | `RuleFunction<TSESTree.TSInstantiationExpression>`     |
| `TSInterfaceBody`               | `RuleFunction<TSESTree.TSInterfaceBody>`               |
| `TSInterfaceDeclaration`        | `RuleFunction<TSESTree.TSInterfaceDeclaration>`        |
| `TSInterfaceHeritage`           | `RuleFunction<TSESTree.TSInterfaceHeritage>`           |
| `TSMethodSignature`             | `RuleFunction<TSESTree.TSMethodSignature>`             |
| `TSModuleBlock`                 | `RuleFunction<TSESTree.TSModuleBlock>`                 |
| `TSModuleDeclaration`           | `RuleFunction<TSESTree.TSModuleDeclaration>`           |
| `TSNamespaceExportDeclaration`  | `RuleFunction<TSESTree.TSNamespaceExportDeclaration>`  |
| `TSParameterProperty`           | `RuleFunction<TSESTree.TSParameterProperty>`           |
| `TSPropertySignature`           | `RuleFunction<TSESTree.TSPropertySignature>`           |
| `TSQualifiedName`               | `RuleFunction<TSESTree.TSQualifiedName>`               |
| `TSTypeAliasDeclaration`        | `RuleFunction<TSESTree.TSTypeAliasDeclaration>`        |
| `TSTypeParameter`               | `RuleFunction<TSESTree.TSTypeParameter>`               |
| `TSTypeParameterDeclaration`    | `RuleFunction<TSESTree.TSTypeParameterDeclaration>`    |
| `TSTypeParameterInstantiation`  | `RuleFunction<TSESTree.TSTypeParameterInstantiation>`  |

## JSX Selectors

| Selector                 | Type                                            |
| ------------------------ | ----------------------------------------------- |
| `JSXAttribute`           | `RuleFunction<TSESTree.JSXAttribute>`           |
| `JSXClosingElement`      | `RuleFunction<TSESTree.JSXClosingElement>`      |
| `JSXClosingFragment`     | `RuleFunction<TSESTree.JSXClosingFragment>`     |
| `JSXElement`             | `RuleFunction<TSESTree.JSXElement>`             |
| `JSXEmptyExpression`     | `RuleFunction<TSESTree.JSXEmptyExpression>`     |
| `JSXExpressionContainer` | `RuleFunction<TSESTree.JSXExpressionContainer>` |
| `JSXFragment`            | `RuleFunction<TSESTree.JSXFragment>`            |
| `JSXIdentifier`          | `RuleFunction<TSESTree.JSXIdentifier>`          |
| `JSXMemberExpression`    | `RuleFunction<TSESTree.JSXMemberExpression>`    |
| `JSXNamespacedName`      | `RuleFunction<TSESTree.JSXNamespacedName>`      |
| `JSXOpeningElement`      | `RuleFunction<TSESTree.JSXOpeningElement>`      |
| `JSXOpeningFragment`     | `RuleFunction<TSESTree.JSXOpeningFragment>`     |
| `JSXSpreadAttribute`     | `RuleFunction<TSESTree.JSXSpreadAttribute>`     |
| `JSXSpreadChild`         | `RuleFunction<TSESTree.JSXSpreadChild>`         |
| `JSXText`                | `RuleFunction<TSESTree.JSXText>`                |
