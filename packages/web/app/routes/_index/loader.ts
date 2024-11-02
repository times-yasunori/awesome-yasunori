import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAwesomeYasunori } from "~/shared/fetch-awesome-yasunori";

export const indexLoader = (async ({ request }) => {
  const url = new URL(request.url);
  const yasunori = url.searchParams.get("yasunori") ?? undefined;
  const data = await fetchAwesomeYasunori(yasunori ? { yasunori } : undefined);
  if (!data) {
    throw new Response(null, { status: 404 });
  }
  return data;
}) satisfies LoaderFunction;

export type IndexLoader = typeof indexLoader;
