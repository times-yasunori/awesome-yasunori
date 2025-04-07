import * as fs from "node:fs";
import * as path from "node:path";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: true,
  outputOptions: {
    banner: "#!/usr/bin/env node\n",
  },
  dts: false,
  clean: true,
  onSuccess: ({ outDir }) => {
    // Make the output file executable
    fs.chmodSync(path.join(outDir, "index.mjs"), 0o755);
  },
});
