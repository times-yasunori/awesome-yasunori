import * as v from "valibot";

const reqeustParamsSchema = v.object({
  id: v.pipe(
    v.string(),
    v.transform((i) => Number(i)),
    v.safeInteger(),
  ),
});

export function getParsedRequestParams(params: unknown) {
  return v.safeParse(reqeustParamsSchema, params);
}
