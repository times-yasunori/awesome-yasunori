import type {
  CacheStorage as CFCacheStorage,
  Request as CFRequest,
  Response as CFResponse,
} from "@cloudflare/workers-types";
import type { EventContext } from "@cloudflare/workers-types";
import { API_BASE_URL } from "../env";

/** OGP用 cache 関数
 *  キャッシュはこのアプリケーションへのリクエストURLで判定するのではなく、
 *  APIからのレスポンスのデータを元に判定を行う必要がある。
 *  理由は、/awesome/random からのレスポンスがランダムであるため、
 *  リクエストURLをそのままキャッシュキーにしてしまうと、キャッシュが残っているかぎり、
 *  レスポンスが固定されてしまい、ランダム表示されないためです。 */
export async function ogpCache({
  id,
  context,
}: {
  id: number;
  // biome-ignore lint/suspicious/noExplicitAny: contextの型はよくわからんので any でよい
  context: EventContext<unknown, any, Record<string, unknown>>;
}) {
  const cache = (caches as unknown as CFCacheStorage).default;
  /** キャッシュキー
   * APIのリソースURLをキーとして利用することでランダムであっても正しいエントリーの画像が取得される */
  const cacheKey = new Request(
    `${API_BASE_URL}/awesome/${id}`,
    context.request as unknown as Request,
  ) as unknown as CFRequest;

  /** キャシュレスポンス */
  const cacheRes = await cache.match(cacheKey);

  /** キャッシュを保存するメソッド */
  const cachePut = (response: CFResponse) =>
    cache.put(cacheKey, response.clone());

  return { cacheRes, cachePut };
}
