import type { ApiRoute } from "@awesome-yasunori/api/src/index.js";
import type { PagesFunction } from "@cloudflare/workers-types";
import { hc } from "hono/client";
import { API_BASE_URL } from "../env";
import { OgpResponse } from "./OgpResponse";
import { ogpCache } from "./ogpCache";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const yasunoriApiClient = hc<ApiRoute>(API_BASE_URL);
  const idParams = url.searchParams.get("id");
  const res = idParams
    ? await yasunoriApiClient.awesome[":id"].$get({ param: { id: idParams } })
    : await yasunoriApiClient.awesome.random.$get();
  if (!res.ok) {
    return new Response("not found", { status: 404 });
  }
  const yasunoriJson = await res.json();

  const { cacheRes, cachePut } = await ogpCache({
    id: yasunoriJson.id,
    context,
  });

  // キャッシュがあればキャッシュを返す
  if (cacheRes) {
    return cacheRes;
  }

  const response = OgpResponse(yasunoriJson);

  // キャッシュに保存する
  context.waitUntil(cachePut(response));

  return response;
};
