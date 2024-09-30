import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { getParsedAwesomeYasunori } from "./get-parsed-awesome-yasunori";

const app = new Hono();
app.use("*", poweredBy());
app.use("*", prettyJSON());
app.use("*", cors());


app.get("/", (c) => {
  return c.json({
    message:
      "Here is yasunori APIs. <https://github.com/takeokunn/awesome-yasunori/packages/api>",
  });
});

export default app;
