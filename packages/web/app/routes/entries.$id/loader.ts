import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAwesomeYasunoriEntry } from "../../shared/fetch-awesome-yasunori-entry";

export const entryLoader = (async ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    throw new Response(null, { status: 404 });
  }

  const entry = await fetchAwesomeYasunoriEntry(params.id as string);
  if (!entry) {
    throw new Response(null, { status: 404 });
  }

  return entry;
}) satisfies LoaderFunction;

export type EntryLoader = typeof entryLoader;
