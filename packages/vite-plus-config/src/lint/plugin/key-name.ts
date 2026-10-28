import type { ESTree } from "vite-plus/lint/plugins";

/** A property's name as written, or undefined where it's computed from a variable. */
export const keyName = (key: ESTree.Node, computed: boolean) => {
  if (key.type === "Literal") return String(key.value);
  if (key.type === "TemplateLiteral" && key.expressions.length === 0) {
    return key.quasis[0]?.value.cooked ?? undefined;
  }
  return !computed && key.type === "Identifier" ? key.name : undefined;
};
