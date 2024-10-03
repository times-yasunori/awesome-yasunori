import type { ApiRoute } from "@awesome-yasunori/api/src/index.js";
import { hc } from "hono/client";

export const yasunoriApiClient = hc<ApiRoute>("https://api.yasunori.dev");
