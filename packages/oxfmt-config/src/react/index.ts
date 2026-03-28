import type { UserConfig } from "vite-plus";
import { base } from "../base/index.ts";

type FmtConfig = NonNullable<UserConfig["fmt"]>;

export const react: FmtConfig = {
  ...base,
  sortTailwindcss: {
    attributes: ["/.*ClassName/"],
    functions: ["tv"],
  },
};
