import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockYasunoriEntries = [
  {
    id: 1,
    title: "テスト yasunori エントリ",
    date: "2024-06-25",
    at: "vim-jp radioお便り",
    senpan: "takeokunn",
    content: "tomoyaさん、ありすえさんこんにちは。yasunoriはおもちゃです。",
    meta: "テストメタ情報",
  },
  {
    id: 2,
    title: "別のエントリ",
    date: "2024-01-02",
    at: "vim-jp #general",
    senpan: "anotheruser",
    content: "別のコンテンツ yasunori についての話",
    meta: "",
  },
  {
    id: 3,
    title: "プログラミング関連",
    date: "2024-01-03",
    at: "vim-jp #times-programming",
    senpan: "developer",
    content: "プログラミングの話題です",
    meta: "技術系の話",
  },
];

const mockServer = setupServer(
  http.get("*/awesome", () => {
    return HttpResponse.json(mockYasunoriEntries);
  }),
  http.get("*/awesome/random", () => {
    const randomEntry =
      mockYasunoriEntries[
        Math.floor(Math.random() * mockYasunoriEntries.length)
      ];
    return HttpResponse.json(randomEntry);
  }),
  http.get("*/awesome/:id", ({ params }) => {
    const id = Number(params.id);
    const entry = mockYasunoriEntries.find((e) => e.id === id);
    if (!entry) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(entry);
  }),
);

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

// テスト用にモックサーバーをexport
export { mockServer };
