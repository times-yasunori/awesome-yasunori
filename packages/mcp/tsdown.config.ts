import * as child_process from "node:child_process";
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
    child_process.execSync(`chmod +x ${path.join(outDir, "index.mjs")}`);
  },
});
