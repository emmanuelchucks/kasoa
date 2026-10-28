import type { ESTree } from "vite-plus/lint/plugins";
import { defineRule } from "vite-plus/lint/plugins";

// oxlint has no `require-description` of its own, and the community plugin reads only `eslint-`
// comments, so this reads both.
const directive =
  /^\s*(?:oxlint|eslint)-(?<kind>disable-next-line|disable-line|disable|enable)(?<rest>(?:\s.*)?)$/su;

/** A directive's kind, the rules it names (none means every rule), and the reason after ` -- `. */
export const parseDirective = (comment: string) => {
  const { kind, rest = "" } = directive.exec(comment)?.groups ?? {};
  const [names = "", ...after] = rest.split(" -- ");
  const rules = names
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
  return kind === undefined ? undefined : { kind, rules, reason: after.join(" -- ").trim() };
};

type Open = { comment: ESTree.Comment; rules: Set<string> }[];

/** Closes what an `oxlint-enable` names in every open block; naming nothing closes them all. */
const enable = (open: Open, rules: string[]) => {
  for (const block of open) {
    if (rules.length === 0) block.rules.clear();
    for (const rule of rules) block.rules.delete(rule);
  }
};

export const disableReason = defineRule({
  meta: {
    messages: {
      reason: "Say why after ` -- `, in at least 10 characters.",
      unclosed:
        "Close this with `oxlint-enable {{rules}}`, so it covers only the lines that need it.",
    },
  },
  create(context) {
    return {
      Program() {
        const open: Open = [];
        for (const comment of context.sourceCode.getAllComments()) {
          const parsed = parseDirective(comment.value);
          if (parsed === undefined) continue;
          if (parsed.kind === "enable") {
            enable(open, parsed.rules);
            continue;
          }
          if (parsed.reason.length < 10) context.report({ node: comment, messageId: "reason" });
          if (parsed.kind === "disable") {
            open.push({ comment, rules: new Set(parsed.rules.length > 0 ? parsed.rules : ["*"]) });
          }
        }
        for (const { comment, rules } of open) {
          if (rules.size > 0) {
            const names = [...rules].filter((rule) => rule !== "*").join(", ");
            context.report({ node: comment, messageId: "unclosed", data: { rules: names } });
          }
        }
      },
    };
  },
});
