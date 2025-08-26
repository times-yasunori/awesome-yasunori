import * as fs from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: true,
  outputOptions: {
    banner: "#!/usr/bin/env node\n",
  },
  noExternal: [/^.*/],
  nodeProtocol: true,
  dts: false,
  clean: true,
  onSuccess: (ctx) => {
    // Make the output file executable
    fs.chmodSync(join(ctx.outDir, "index.mjs"), 0o755);
  },
});
