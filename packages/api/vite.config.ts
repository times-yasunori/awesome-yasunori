/// <reference types="vitest" />
import build from "@hono/vite-build/cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: "src/index.ts",
    }),
  ],
  test: {
    globals: true,
    environment: "node",
    include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
