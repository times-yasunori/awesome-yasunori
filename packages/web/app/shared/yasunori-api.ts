import { hc } from "hono/client";
import type { ApiRoute } from "@awesome-yasunori/api/src/index.js";

export const yasunoriApiClient = hc<ApiRoute>("https://api.yasunori.dev");
