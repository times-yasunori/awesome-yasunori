import * as child_process from "node:child_process";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rollup: {
    output: {
      banner: "#!/usr/bin/env node\n",
    },
    inlineDependencies: ["@awesome-yasunori/api", "hono/client"],
  },
  hooks: {
    "build:done": (ctx) => {
      const { bin } = ctx.pkg;
      // make the dist/index.js executable
      child_process.execSync(`chmod +x ./${bin}`);
    },
  },
});
