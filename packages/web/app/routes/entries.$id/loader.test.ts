import type { AppLoadContext, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { http, HttpResponse } from "msw";
import { mockServer } from "../../../mocks/server";
import { entryLoader } from "./loader";

describe("entryLoader", () => {
  test("returns data", async () => {
    const loaderFunctionArgs: LoaderFunctionArgs = {
      request: new Request("https://example.com", {
        method: "GET",
      }),
      params: {
        id: "1",
      },
      context: {} as AppLoadContext,
    };
    const result = await entryLoader(loaderFunctionArgs);
    expect(result).toStrictEqual({
      at: "vim-jp radioお便り",
      content:
        "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
      date: "2024-06-25",
      id: 1,
      meta: "",
      senpan: "takeokunn",
      title: "yasunoriの母",
    });
  });

  test("returns 404 if APIs return 400 error", async () => {
    mockServer.use(
      http.get("https://api.yasunori.dev/awesome", () => {
        return new HttpResponse(null, {
          status: 400,
        });
      }),
    );
    const loaderFunctionArgs: LoaderFunctionArgs = {
      request: new Request("https://example.com", {
        method: "GET",
      }),
      params: {
        id: "1",
      },
      context: {} as AppLoadContext,
    };
    expect(entryLoader(loaderFunctionArgs)).rejects.toEqual(
      new Response(null, { status: 404 }),
    );
  });

  test("returns 404 if id is not number", async () => {
    const loaderFunctionArgs: LoaderFunctionArgs = {
      request: new Request("https://example.com", {
        method: "GET",
      }),
      params: {
        id: "a",
      },
      context: {} as AppLoadContext,
    };
    expect(entryLoader(loaderFunctionArgs)).rejects.toEqual(
      new Response(null, { status: 404 }),
    );
  });

  test("returns 404 if entry is not found", async () => {
    const loaderFunctionArgs: LoaderFunctionArgs = {
      request: new Request("https://example.com", {
        method: "GET",
      }),
      params: {
        id: "0",
      },
      context: {} as AppLoadContext,
    };
    expect(entryLoader(loaderFunctionArgs)).rejects.toEqual(
      new Response(null, { status: 404 }),
    );
  });
});
