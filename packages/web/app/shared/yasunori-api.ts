import { hc } from "hono/client";
import type { AppType } from "@awesome-yasunori/api/src/index.js";

export const yasunoriApiClient = hc<AppType>("https://api.yasunori.dev");
