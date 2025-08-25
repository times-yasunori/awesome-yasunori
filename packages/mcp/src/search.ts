import { client } from "@awesome-yasunori/api/client";
import { create, insert, search } from "@orama/orama";

export interface YasunoriEntry {
  id: string;
  title: string;
  date: string;
  at: string;
  senpan: string;
  content: string;
  meta: string;
}

export interface SearchResult {
  entries: YasunoriEntry[];
  count: number;
  elapsed: string;
}

export async function searchYasunori(
  query: string,
  options: {
    limit?: number;
    threshold?: number;
    boost?: Record<string, number>;
  } = {},
): Promise<SearchResult> {
  const { limit = 10, threshold = 0, boost } = options;

  // リクエストごとに新しい検索インデックスを作成（ステートレス）
  const db = create({
    schema: {
      id: "string",
      title: "string",
      date: "string",
      at: "string",
      senpan: "string",
      content: "string",
      meta: "string",
    },
    components: {
      tokenizer: {
        stemming: false,
        stopWords: false,
      },
    },
  });

  // すべてのyasunoriエントリを取得してインデックス化
  const res = await client.awesome.$get();
  if (!res.ok) {
    throw new Error("Failed to get all awesome yasunori for search indexing");
  }

  const allYasunori = await res.json();

  for (const entry of allYasunori) {
    await insert(db, {
      id: entry.id.toString(),
      title: entry.title,
      date: entry.date,
      at: entry.at,
      senpan: entry.senpan,
      content: entry.content,
      meta: entry.meta || "",
    });
  }

  // 検索を実行
  const searchResults = await search(db, {
    term: query,
    properties: ["title", "content", "meta", "senpan", "at"],
    limit,
    threshold,
    boost: boost || {
      title: 2,
      content: 1,
      meta: 0.5,
      senpan: 0.5,
      at: 0.5,
    },
  });

  return {
    entries: searchResults.hits.map((hit) => hit.document as YasunoriEntry),
    count: searchResults.count,
    elapsed: searchResults.elapsed.formatted,
  };
}
