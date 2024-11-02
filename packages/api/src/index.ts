import { Hono } from "hono";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import randomItem from "random-item";
import { getParsedAwesomeYasunori } from "./get-parsed-awesome-yasunori";
import { getParsedRequestParams } from "./get-parsed-request-params";

const parsedAwesomeYasunori = getParsedAwesomeYasunori();

const app = new Hono();
app.use("*", poweredBy());
app.use("*", prettyJSON());
app.use("*", cors());

const route = app
  .get("/", (c) => {
    return c.json({
      message:
        "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
    });
  })
  .get("/awesome", async (c) => {
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    const yasunori = c.req.query("yasunori");
    if (!yasunori) {
      return c.json(parsedAwesomeYasunori.output.yasunori);
    }
    // 他のyasunoriが指定されたら、yasunoriを置換する
    // 置換するのは title, content, meta の中身だけ
    const replacedYasunori = parsedAwesomeYasunori.output.yasunori.map((ay) => {
      return {
        ...ay,
        title: ay.title.replaceAll("yasunori", yasunori),
        content: ay.content.replaceAll("yasunori", yasunori),
        meta: ay.meta?.replaceAll("yasunori", yasunori),
      };
    });
    return c.json(replacedYasunori);
  })
  .get("/awesome/random", async (c) => {
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    return c.json(randomItem(parsedAwesomeYasunori.output.yasunori));
  })
  .get("/awesome/:id", async (c) => {
    const parsedParams = getParsedRequestParams(c.req.param());
    if (!parsedParams.success) {
      return c.json(
        {
          errors: parsedParams.issues,
        },
        404,
      );
    }
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    const entry = parsedAwesomeYasunori.output.yasunori.find(
      (y) => y.id === parsedParams.output.id,
    );
    if (!entry) {
      return c.json({ errors: ["not found"] }, 404);
    }
    return c.json(entry);
  });

export default app;
export type ApiRoute = typeof route;
