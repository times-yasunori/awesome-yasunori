import type { LoaderFunction } from "@remix-run/cloudflare";
import { fetchAwesomeYasunori } from "../../shared/fetch-awesome-yasunori";

export const entryLoader = (async ({ params }) => {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    throw new Response(null, { status: 404 });
  }

  // TODO: APIが単体リソースを返すようになったらそれを直接取得する
  const entries = await fetchAwesomeYasunori();
  if (!entries) {
    throw new Response(null, { status: 404 });
  }

  const entry = entries.find((d) => d.id === id);
  if (!entry) {
    throw new Response(null, { status: 404 });
  }

  return entry;
}) satisfies LoaderFunction;

export type EntryLoader = typeof entryLoader;
