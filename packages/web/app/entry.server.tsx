/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type {
  CacheStorage as CFCacheStorage,
  Request as CFRequest,
  Response as CFResponse,
  Cache,
} from "@cloudflare/workers-types";
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // This is ignored so we can keep it in the template for visibility.  Feel
  // free to delete this parameter in your app if you're not using it!
  loadContext: AppLoadContext,
) {
  // Use cache
  const url = new URL(request.url);
  let cacheKey: CFRequest;
  let cache: Cache;
  // remix vite:dev で caches がないと怒られないようにする
  if (typeof caches === "object") {
    cacheKey = new Request(url.toString(), request) as unknown as CFRequest;
    cache = (caches as unknown as CFCacheStorage).default;
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse?.body) {
      return new Response(cachedResponse.body as BodyInit, {
        headers: {
          ...cachedResponse.headers,
          "Custom-Cached-Response": "true",
        },
        status: cachedResponse.status,
      });
    }
  }

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        // biome-ignore lint/style/noParameterAssign: 自動生成されたコードのため
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  if (url.pathname === "/") {
    responseHeaders.set("Cache-Control", "public, maxage=1800"); // 30m
  } else {
    responseHeaders.set("Cache-Control", "public, maxage=86400"); // 1d
  }
  const response = new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  }) as unknown as CFResponse;

  // FIXME: AppLoadContext の型が渡ってこない
  // @ts-ignore
  loadContext.ctx?.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
