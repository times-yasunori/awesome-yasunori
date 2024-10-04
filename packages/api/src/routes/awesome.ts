import { Hono } from "hono";
import randomItem from "random-item";
import { getParsedAwesomeYasunori } from "../get-parsed-awesome-yasunori";

const app = new Hono();

const parsedAwesomeYasunori = getParsedAwesomeYasunori();

export const route = app
  .get("/", async (c) => {
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    return c.json(parsedAwesomeYasunori?.output.yasunori);
  })
  .get("/random", async (c) => {
    if (!parsedAwesomeYasunori.success) {
      return c.json(
        {
          errors: parsedAwesomeYasunori.issues,
        },
        400,
      );
    }
    return c.json(randomItem(parsedAwesomeYasunori?.output.yasunori));
  });
