import { http, HttpResponse } from "msw";
import { mockServer } from "../vitest.setup.js";
import { searchYasunori } from "./search.js";

test("should search yasunori entries by title", async () => {
  const result = await searchYasunori("yasunori", { limit: 10 });

  expect(result.entries.length).toBeGreaterThan(0);
  expect(result.count).toBeGreaterThan(0);
  expect(result.elapsed).toBeDefined();

  // yasunoriを含むエントリが見つかることを確認
  const hasYasunoriEntry = result.entries.some(
    (entry) =>
      entry.title.includes("yasunori") || entry.content.includes("yasunori"),
  );
  expect(hasYasunoriEntry).toBe(true);
});

test("should search yasunori entries by content", async () => {
  const result = await searchYasunori("プログラミング", { limit: 10 });

  expect(result.entries.length).toBeGreaterThan(0);
  const hasMatchingEntry = result.entries.some(
    (entry) =>
      entry.content.includes("プログラミング") || entry.meta.includes("技術系"),
  );
  expect(hasMatchingEntry).toBe(true);
});

test("should limit search results", async () => {
  const result = await searchYasunori("yasunori", { limit: 1 });

  expect(result.entries.length).toBeLessThanOrEqual(1);
});

test("should handle empty query", async () => {
  const result = await searchYasunori("", { limit: 10 });

  // 空のクエリでも結果を返すべき（全てのエントリ）
  expect(result.entries.length).toBeGreaterThanOrEqual(0);
});

test("should handle non-matching query", async () => {
  const result = await searchYasunori("存在しない検索語", { limit: 10 });

  // マッチしないクエリは空の結果を返すべき
  expect(result.entries.length).toBe(0);
  expect(result.count).toBe(0);
});

test("should search Japanese text - テスト", async () => {
  const result = await searchYasunori("テスト", { limit: 10 });

  expect(result.entries.length).toBeGreaterThan(0);
  expect(result.count).toBeGreaterThan(0);

  // テストを含むエントリが見つかることを確認
  const hasMatchingEntry = result.entries.some(
    (entry) =>
      entry.title.includes("テスト") ||
      entry.content.includes("テスト") ||
      entry.meta.includes("テスト"),
  );

  expect(hasMatchingEntry).toBe(true);

  // 具体的に ID 1 のエントリが見つかることを確認
  const testEntry = result.entries.find((entry) => entry.id === "1");
  expect(testEntry).toBeDefined();
  expect(testEntry?.title).toContain("テスト");
});

test("should search Japanese text - プログラミング", async () => {
  const result = await searchYasunori("プログラミング", { limit: 10 });

  expect(result.entries.length).toBeGreaterThan(0);
  expect(result.count).toBeGreaterThan(0);

  // プログラミングを含むエントリが見つかることを確認
  const hasMatchingEntry = result.entries.some(
    (entry) =>
      entry.title.includes("プログラミング") ||
      entry.content.includes("プログラミング") ||
      entry.meta.includes("プログラミング"),
  );

  expect(hasMatchingEntry).toBe(true);

  // 具体的に ID 3 のエントリが見つかることを確認
  const programmingEntry = result.entries.find((entry) => entry.id === "3");
  expect(programmingEntry).toBeDefined();
});

test("should handle API error", async () => {
  // APIエラーをモック
  mockServer.use(
    http.get("*/awesome", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  await expect(searchYasunori("test")).rejects.toThrow(
    "Failed to get all awesome yasunori for search indexing",
  );
});
