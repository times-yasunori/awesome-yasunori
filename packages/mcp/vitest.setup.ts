import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockYasunoriEntries = [
  {
    id: 1,
    title: "テスト yasunori エントリ",
    date: "2024-01-01",
    at: "vim-jp #times-yasunori",
    senpan: "testuser",
    content: "これはテスト用のコンテンツです",
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
);

beforeAll(() => mockServer.listen({ onUnhandledRequest: "error" }));
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

// テスト用にモックサーバーをexport
export { mockServer };
