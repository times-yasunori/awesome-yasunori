import toml from "toml";
import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import {
  object,
  string,
  pipe,
  isoDate,
  array,
  optional,
  safeParse,
} from "valibot";

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
  const yasunoriTomlPath = resolve("../../yasunori.toml");
  const yasunoriToml = readFileSync(yasunoriTomlPath, { encoding: "utf8" });
  const parsedYasunoriToml = toml.parse(yasunoriToml);
  return safeParse(awesomeYasunoriSchema, parsedYasunoriToml);
}
