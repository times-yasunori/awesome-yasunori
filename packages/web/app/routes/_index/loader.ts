import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAwesomeYasunori } from "~/shared/fetch-awesome-yasunori";

export const indexLoader = (async () => {
  return await fetchAwesomeYasunori();
}) satisfies LoaderFunction;

export type IndexLoader = typeof indexLoader;
