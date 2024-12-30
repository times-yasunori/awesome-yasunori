import { hc } from "hono/client";
import type { ApiRoute } from "./index";

export const client = hc<ApiRoute>("https://api.yasunori.dev");
