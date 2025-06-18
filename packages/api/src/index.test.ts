import app from "./index";

describe("Test GET /", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("/");
    expect(res.status).toBe(200);
  });

  test("Should return message response", async () => {
    const res = await app.request("/");
    const parsed = await res.json();
    expect(parsed).toStrictEqual({
      message:
        "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
    });
  });
});

describe("Test GET /awesome", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("/awesome");
    expect(res.status).toBe(200);
  });

  test("Should return entries response", async () => {
    const res = await app.request("/awesome");
    const parsed = await res.json<Array<unknown>>();
    expect(parsed.at(-1)).toStrictEqual({
      id: 1,
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      meta: "",
      senpan: "takeokunn",
      title: "yasunoriの母",
    });
  });

  test("Should return entries replaced yasunori response", async () => {
    const res = await app.request("/awesome?yasunori=takeokunn");
    const parsed = await res.json<Array<unknown>>();
    expect(parsed.at(-1)).toStrictEqual({
      id: 1,
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、takeokunnの母です。\n\ntakeokunnがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      meta: "",
      senpan: "takeokunn",
      title: "takeokunnの母",
    });
  });
});

describe("Test GET /awesome/random", () => {
  beforeEach(() => {
    vi.mock("random-item", () => {
      return {
        default: vi.fn((array: unknown[]) => array.at(-1)),
      };
    });
  });

  test("Should return 200 response", async () => {
    const res = await app.request("/awesome/random");
    expect(res.status).toBe(200);
  });

  test("Should return entries response", async () => {
    const res = await app.request("/awesome/random");
    const parsed = await res.json<unknown>();
    expect(parsed).toStrictEqual({
      id: 1,
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      meta: "",
      senpan: "takeokunn",
      title: "yasunoriの母",
    });
  });
});

describe("Test GET /awesome/:id", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("/awesome/1");
    expect(res.status).toBe(200);
  });

  test("Should return entries response", async () => {
    const res = await app.request("/awesome/1");
    const parsed = await res.json<unknown>();
    expect(parsed).toStrictEqual({
      id: 1,
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      meta: "",
      senpan: "takeokunn",
      title: "yasunoriの母",
    });
  });

  test("Should return 404 error response if entry not found", async () => {
    const res = await app.request("/awesome/0");
    expect(res.status).toBe(404);
    expect(await res.json()).toStrictEqual({ errors: ["not found"] });
  });

  test("Should return 404 error response if params is not number", async () => {
    const res = await app.request("/awesome/id");
    expect(res.status).toBe(404);
    expect(await res.json()).toMatchObject({
      errors: [{ type: "safe_integer" }],
    });
  });
});

describe("Test POST /awesome/from-slack-text", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("/awesome/from-slack-text", {
      method: "POST",
    });
    expect(res.status).toBe(200);
  });

  test("Should return YA toml response", async () => {
    const res = await app.request("/awesome/from-slack-text", {
      method: "POST",
      body: `tomoya
  21:06
えっ、yasunori 知らないの？
↑
yasuhara`,
    });
    const parsed = await res.text();
    const today = new Date().toISOString().split("T").at(0);
    const [header, id, ...rest] = parsed.split("\n");
    expect(header).toStrictEqual("[[yasunori]]");
    expect(id).toMatch("id = "); // いまのテスト環境だとidが変化するため値のテストはできない
    expect(rest.join("\n")).toStrictEqual(`title = "えっ、yasunori 知らないの？"
date = "${today}"
at = "vim-jp #times-yasunori"
senpan = "tomoya"
content = """
えっ、yasunori 知らないの？
↑
yasuhara
"""
meta = """
"""
`);
  });

  test("Should return blank YA toml response", async () => {
    const res = await app.request("/awesome/from-slack-text", {
      method: "POST",
    });
    const parsed = await res.text();
    const today = new Date().toISOString().split("T").at(0);
    const [header, id, ...rest] = parsed.split("\n");
    expect(header).toStrictEqual("[[yasunori]]");
    expect(id).toMatch("id = "); // いまのテスト環境だとidが変化するため値のテストはできない
    expect(rest.join("\n")).toStrictEqual(`title = ""
date = "${today}"
at = "vim-jp #times-yasunori"
senpan = ""
content = """

"""
meta = """
"""
`);
  });
});

describe("Test GET /awesome/list", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("/awesome/list");
    expect(res.status).toBe(200);
  });

  test("Should return entries list response", async () => {
    const res = await app.request("/awesome/list");
    const parsed = await res.json<Array<unknown>>();

    expect(parsed.at(-1)).toStrictEqual({
      id: 1,
      title: "yasunoriの母",
    });
  });
});

describe("Test MCP HTTP Streaming Transport", () => {
  test("Should handle MCP endpoint and return SSE response", async () => {
    const res = await app.request("/awesome/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {},
      }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");

    const text = await res.text();
    expect(text).toContain("event: message");
    expect(text).toContain("jsonrpc");
    expect(text).toContain("getAllAwesomeYasunori");
    expect(text).toContain("getRandomAwesomeYasunori");
    expect(text).toContain("getAwesomeYasunoriById");
  });

  test("Should handle tool call and return yasunori data", async () => {
    const res = await app.request("/awesome/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "getAwesomeYasunoriById",
          arguments: {
            id: 1,
          },
        },
      }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");

    const text = await res.text();
    expect(text).toContain("event: message");
    expect(text).toContain("jsonrpc");
    expect(text).toContain("yasunoriの母");
  });
});
