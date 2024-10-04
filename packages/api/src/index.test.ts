import app from "./index";

describe("Test GET /", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(200);
  });

  test("Should return message response", async () => {
    const res = await app.request("http://localhost/");
    const parsed = await res.json();
    expect(parsed).toStrictEqual({
      message:
        "Here is Yasunori APIs. <https://github.com/times-yasunori/awesome-yasunori/packages/api>",
    });
  });
});

describe("Test GET /awesome", () => {
  test("Should return 200 response", async () => {
    const res = await app.request("http://localhost/awesome");
    expect(res.status).toBe(200);
  });

  test("Should return entries response", async () => {
    const res = await app.request("http://localhost/awesome");
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
    const res = await app.request("http://localhost/awesome/random");
    expect(res.status).toBe(200);
  });

  test("Should return entries response", async () => {
    const res = await app.request("http://localhost/awesome/random");
    const parsed = await res.json<unknown>();
    console.log(parsed);
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
