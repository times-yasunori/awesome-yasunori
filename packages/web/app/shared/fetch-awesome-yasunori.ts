import { yasunoriApiClient } from "./yasunori-api";

export async function fetchAwesomeYasunori(
  query?: { yasunori: string } | undefined,
) {
  const res = await yasunoriApiClient.awesome.$get(
    query?.yasunori ? { query: { yasunori: query.yasunori } } : undefined,
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}
