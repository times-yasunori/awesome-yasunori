import * as fs from "node:fs";
import { defineConfig } from "tsdown";
import { bin, main } from "./package.json";

export default defineConfig({
  entry: [main],
  outDir: "dist",
  format: ["esm"],
  fixedExtension: true,
  outputOptions: {
    banner: "#!/usr/bin/env node\n",
  },
  dts: false,
  clean: true,
  onSuccess: () => {
    // Make the output file executable
    fs.chmodSync(bin, 0o755);
  },
});
