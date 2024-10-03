import { yasunoriAPIClient } from "./yasunori-api";

export async function fetchAwesomeYasunori() {
  const res = await yasunoriAPIClient.awesome.$get();
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
