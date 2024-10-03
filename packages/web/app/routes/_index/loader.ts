import type { LoaderFunction } from "@remix-run/node";
import { useAwesomeYasunori } from "~/hooks/use-awsome-yasunori";

export const indexLoader = (async () => {
  return await useAwesomeYasunori();
}) satisfies LoaderFunction;

export type IndexLoader = typeof indexLoader;
