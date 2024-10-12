import { yasunoriApiClient } from "./yasunori-api";

export async function fetchAwesomeYasunoriEntry(id: string) {
  const res = await yasunoriApiClient.awesome[":id"].$get({ param: { id } });
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
