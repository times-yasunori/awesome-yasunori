import { vValidator } from "@hono/valibot-validator";
import * as v from "valibot";

const paramSchema = v.object({
  id: v.pipe(
    v.string(),
    v.transform((i) => Number(i)),
    v.safeInteger(),
  ),
});

export const paramValidator = vValidator("param", paramSchema, (result, c) => {
  if (!result.success) {
    return c.json(
      {
        errors: result.issues,
      },
      404,
    );
  }
});
