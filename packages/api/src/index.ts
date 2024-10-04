import { Hono } from "hono";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";

import { route as awesomeRoute } from "./routes/awesome.js";

const app = new Hono();
app.use("*", poweredBy());
app.use("*", prettyJSON());
app.use("*", cors());

const route = app.route("/awesome", awesomeRoute).get("/", (c) => {
  return c.json({
    message:
      "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
  });
});

export default app;
export type ApiRoute = typeof route;
