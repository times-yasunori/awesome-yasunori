import type { ApiRoute } from "@awesome-yasunori/api/src/index.js";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import type {
  CacheStorage as CFCacheStorage,
  Request as CFRequest,
  Response as CFResponse,
  PagesFunction,
} from "@cloudflare/workers-types";
import { hc } from "hono/client";
import React from "react";

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
  const { title, content, senpan, date, at, id } = await res.json();

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
    `${API_BASE_URL}/awesome/${id}`,
    context.request as unknown as Request,
  ) as unknown as CFRequest;

  /** get cache */
  const cacheRes = await cache.match(cacheKey);

  /** return cache if exists */
  if (cacheRes) {
    return cacheRes;
  }

  const response: CFResponse = new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#2e2e2e",
        border: "2px solid #424242",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: 1200,
          padding: 48,
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#c9c9c9",
            fontSize: 48,
          }}
        >
          {title}
        </div>
        {idParams !== null && (
          <div
            style={{
              display: "flex",
              color: "#828282",
              fontSize: 36,
            }}
          >
            #{idParams}
          </div>
        )}
      </div>
      <div
        style={{
          flex: 2,
          backgroundColor: "#242424",
          color: "#c9c9c9",
          fontSize: 36,
          maxWidth: 1200,
          overflow: "hidden",
          paddingLeft: 48,
          paddingRight: 48,
          paddingTop: 32,
          paddingBottom: 32,
        }}
      >
        {content}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            color: "#d1d5db",
            display: "flex",
            alignItems: "center",
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <img
            alt={senpan}
            src={`https://avatars.githubusercontent.com/${senpan}`}
            width={84}
            height={84}
            style={{ borderRadius: 8, marginRight: 24 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }}
          >
            <div style={{ display: "flex", color: "#c9c9c9", fontSize: 42 }}>
              {senpan}
            </div>
            <div style={{ display: "flex", fontSize: 32, color: "#828282" }}>
              {date} at {at}
            </div>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );

  /** save cache */
  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
};
