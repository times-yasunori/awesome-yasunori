import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAwesomeYasunori } from "~/shared/fetch-awesome-yasunori";

export const indexLoader = (async () => {
  const data = await fetchAwesomeYasunori();
  if (!data) {
    throw new Response(null, { status: 404 });
  }
  return data;
}) satisfies LoaderFunction;

export type IndexLoader = typeof indexLoader;
