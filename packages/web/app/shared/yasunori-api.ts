import { hc } from "hono/client";
import type { ApiType } from "@awesome-yasunori/api/src/index.js";

export const yasunoriAPIClient = hc<ApiType>("https://api.yasunori.dev");
