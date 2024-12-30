import { hc } from "hono/client";
import type { ApiRoute } from "./index";

export const yasunoriApiClient = hc<ApiRoute>("https://api.yasunori.dev");
