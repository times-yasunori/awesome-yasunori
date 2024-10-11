import type { ApiRoute } from "@awesome-yasunori/api/src/index.js";
import type {
  CacheStorage as CFCacheStorage,
  Request as CFRequest,
  PagesFunction,
} from "@cloudflare/workers-types";
import { hc } from "hono/client";
import { OgpResponse } from "./OgpResponse";

const API_BASE_URL = "https://api.yasunori.dev";

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

  // キャッシュはこのアプリケーションへのリクエストURLで判定するのではなく、
  // APIからのレスポンスのデータを元に判定を行う必要がある。
  // 理由は、/awesome/random からのレスポンスがランダムであるため、
  // リクエストURLをそのままキャッシュキーにしてしまうと、キャッシュが残っているかぎり、
  // レスポンスが固定されてしまい、ランダム表示されないためです。

  /** get cache storage */
  const cache = (caches as unknown as CFCacheStorage).default;

  /** cache key
   * APIのリソースURLをキーとして利用することでランダムであっても正しいエントリーの画像が取得される */
  const cacheKey = new Request(
    `${API_BASE_URL}/awesome/${yasunoriJson.id}`,
    context.request as unknown as Request,
  ) as unknown as CFRequest;

  /** get cache */
  const cacheRes = await cache.match(cacheKey);

  /** return cache if exists */
  if (cacheRes) {
    return cacheRes;
  }

  const response = OgpResponse(yasunoriJson);

  /** save cache */
  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
};
