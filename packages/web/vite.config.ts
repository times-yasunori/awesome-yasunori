import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    Icons({
      compiler: "jsx",
      jsx: "react",
      autoInstall: true,
    }),
    remix({
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
