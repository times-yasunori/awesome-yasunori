import { yasunoriApiClient } from "./yasunori-api";

export async function fetchAwesomeYasunori() {
  const res = await yasunoriApiClient.awesome.$get();
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
