import { hc } from "hono/client";
import type { AppType } from "../../../api/src/index.js";

export const yasunoriAPIClient = hc<AppType>("https://api.yasunori.dev");
