import {
  object,
  string,
  pipe,
  isoDate,
  array,
  optional,
  safeParse,
} from "valibot";
import awesomeYasunoriJson from "./awesome-yasunori.json";

const awesomeYasunoriEntrySchema = object({
  title: string(),
  date: pipe(string(), isoDate()),
  at: string(),
  senpan: string(),
  content: string(),
  meta: optional(string()),
});

const awesomeYasunoriSchema = object({
  yasunori: array(awesomeYasunoriEntrySchema),
});

export function getParsedAwesomeYasunori() {
  return safeParse(awesomeYasunoriSchema, awesomeYasunoriJson);
}
