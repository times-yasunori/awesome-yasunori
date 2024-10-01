import * as v from "valibot";
import awesomeYasunoriJson from "./awesome-yasunori.json";

const awesomeYasunoriEntrySchema = v.object({
  id: v.number(),
  title: v.string(),
  date: v.pipe(v.string(), v.isoDate()),
  at: v.string(),
  senpan: v.string(),
  content: v.string(),
  meta: v.optional(v.string()),
});

const awesomeYasunoriSchema = v.object({
  yasunori: v.array(awesomeYasunoriEntrySchema),
});

export function getParsedAwesomeYasunori() {
  return v.safeParse(awesomeYasunoriSchema, awesomeYasunoriJson);
}
