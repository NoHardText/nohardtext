// src/index.ts
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
var traverse = traverseModule.default ?? traverseModule;
function parseSource(source) {
  return parse(source, {
    sourceType: "module",
    plugins: ["typescript", "jsx"]
  });
}
function getJsxElementName(nameNode) {
  if (!nameNode) {
    return void 0;
  }
  if (nameNode.type === "JSXIdentifier") {
    return nameNode.name;
  }
  if (nameNode.type === "JSXMemberExpression") {
    const objectName = getJsxElementName(nameNode.object);
    const propertyName = getJsxElementName(nameNode.property);
    return [objectName, propertyName].filter(Boolean).join(".") || void 0;
  }
  if (nameNode.type === "JSXNamespacedName") {
    const namespace = getJsxElementName(nameNode.namespace);
    const name = getJsxElementName(nameNode.name);
    return [namespace, name].filter(Boolean).join(":") || void 0;
  }
  return void 0;
}
function getAttributeElementName(path) {
  const parent = path.parent;
  if (parent?.type !== "JSXOpeningElement") {
    return void 0;
  }
  return getJsxElementName(parent.name);
}
function collectJsxTextNodes(source) {
  const ast = parseSource(source);
  const results = [];
  traverse(ast, {
    JSXText(path) {
      const text = path.node.value.trim();
      if (!text || !path.node.loc) return;
      results.push({
        text,
        startLine: path.node.loc.start.line,
        startColumn: path.node.loc.start.column + 1,
        endLine: path.node.loc.end.line,
        endColumn: path.node.loc.end.column + 1
      });
    }
  });
  return results;
}
function getStaticStringFromAttributeValue(valueNode) {
  if (!valueNode) {
    return void 0;
  }
  if (valueNode.type === "StringLiteral") {
    const value = valueNode.value.trim();
    if (!value || !valueNode.loc) {
      return void 0;
    }
    return {
      value,
      startLine: valueNode.loc.start.line,
      startColumn: valueNode.loc.start.column + 1,
      endLine: valueNode.loc.end.line,
      endColumn: valueNode.loc.end.column + 1
    };
  }
  if (valueNode.type !== "JSXExpressionContainer") {
    return void 0;
  }
  const expression = valueNode.expression;
  if (expression.type === "StringLiteral") {
    const value = expression.value.trim();
    if (!value || !expression.loc) {
      return void 0;
    }
    return {
      value,
      startLine: expression.loc.start.line,
      startColumn: expression.loc.start.column + 1,
      endLine: expression.loc.end.line,
      endColumn: expression.loc.end.column + 1
    };
  }
  if (expression.type === "TemplateLiteral") {
    const quasis = expression.quasis ?? [];
    const expressions = expression.expressions ?? [];
    if (expressions.length > 0 || quasis.length !== 1) {
      return void 0;
    }
    const value = (quasis[0]?.value?.cooked ?? quasis[0]?.value?.raw ?? "").trim();
    if (!value || !expression.loc) {
      return void 0;
    }
    return {
      value,
      startLine: expression.loc.start.line,
      startColumn: expression.loc.start.column + 1,
      endLine: expression.loc.end.line,
      endColumn: expression.loc.end.column + 1
    };
  }
  return void 0;
}
function collectJsxAttributeStringValues(source, attributeNames) {
  const ast = parseSource(source);
  const results = [];
  traverse(ast, {
    JSXAttribute(path) {
      const nameNode = path.node.name;
      if (nameNode.type !== "JSXIdentifier") return;
      const name = nameNode.name;
      if (!attributeNames.includes(name)) return;
      const valueResult = getStaticStringFromAttributeValue(path.node.value);
      if (!valueResult) return;
      results.push({
        name,
        value: valueResult.value,
        elementName: getAttributeElementName(path),
        startLine: valueResult.startLine,
        startColumn: valueResult.startColumn,
        endLine: valueResult.endLine,
        endColumn: valueResult.endColumn
      });
    }
  });
  return results;
}
function pushJsxExpressionString(nodes, expression, value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return;
  }
  nodes.push({
    value: trimmed,
    startLine: expression.loc?.start.line ?? 1,
    startColumn: expression.loc?.start.column ?? 0,
    endLine: expression.loc?.end.line ?? expression.loc?.start.line ?? 1,
    endColumn: expression.loc?.end.column ?? expression.loc?.start.column ?? 0
  });
}
function collectExpressionStrings(expression, nodes) {
  if (!expression) {
    return;
  }
  if (expression.type === "StringLiteral") {
    pushJsxExpressionString(nodes, expression, expression.value);
    return;
  }
  if (expression.type === "TemplateLiteral") {
    const quasis = expression.quasis ?? [];
    const expressions = expression.expressions ?? [];
    if (expressions.length === 0 && quasis.length === 1) {
      const value = quasis[0]?.value?.cooked ?? quasis[0]?.value?.raw;
      if (typeof value === "string") {
        pushJsxExpressionString(nodes, expression, value);
      }
    }
    return;
  }
  if (expression.type === "ConditionalExpression") {
    collectExpressionStrings(expression.consequent, nodes);
    collectExpressionStrings(expression.alternate, nodes);
    return;
  }
  if (expression.type === "LogicalExpression") {
    collectExpressionStrings(expression.left, nodes);
    collectExpressionStrings(expression.right, nodes);
    return;
  }
  if (expression.type === "ParenthesizedExpression" || expression.type === "TSAsExpression" || expression.type === "TSTypeAssertion" || expression.type === "TypeCastExpression") {
    collectExpressionStrings(expression.expression, nodes);
  }
}
function collectJsxExpressionStringValues(source) {
  const ast = parseSource(source);
  const nodes = [];
  traverse(ast, {
    JSXExpressionContainer(path) {
      if (path.parent?.type === "JSXAttribute") {
        return;
      }
      collectExpressionStrings(path.node.expression, nodes);
    }
  });
  return nodes;
}
export {
  collectJsxAttributeStringValues,
  collectJsxExpressionStringValues,
  collectJsxTextNodes,
  parseSource
};
