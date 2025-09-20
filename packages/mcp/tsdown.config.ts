import * as fs from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/*.ts", "!./src/**/*.test.ts"],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: true,
  banner: "#!/usr/bin/env node\n",
  exports: {
    devExports: true,
  },
  noExternal: [/^.*/],
  nodeProtocol: true,
  dts: true,
  clean: true,
  onSuccess: (ctx) => {
    // Make the output file executable
    fs.chmodSync(join(ctx.outDir, "index.mjs"), 0o755);
  },
});
