import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { expect, test } from "vitest";
import { server } from "./index.js";

test("getAllAwesomeYasunori", async () => {
  // create client for testing
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  // create in-memory transport for testing
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  // connect client and server
  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // call the tool
  const result = await client.callTool({
    name: "getAllAwesomeYasunori",
    arguments: {},
  });

  // expect the result to be a string
  expect(result).toEqual({
    content: [
      {
        type: "text",
        text: expect.stringContaining("all awesome yasunori"),
      },
    ],
  });
});

test("getRandomAwesomeYasunori", async () => {
  // create client for testing
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  // create in-memory transport for testing
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  // connect client and server
  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // call the tool
  const result = await client.callTool({
    name: "getRandomAwesomeYasunori",
    arguments: {},
  });

  // expect the result to be a string
  expect(result).toEqual({
    content: [
      {
        type: "text",
        text: expect.stringContaining("random awesome yasunori"),
      },
    ],
  });
});

test("getAwesomeYasunoriById", async () => {
  // create client for testing
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  // create in-memory transport for testing
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  // connect client and server
  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  // call the tool
  const result = await client.callTool({
    name: "getAwesomeYasunoriById",
    arguments: { id: 1 },
  });

  // expect the result to be a string
  expect(result).toEqual({
    content: [
      {
        type: "text",
        text: expect.stringContaining(
          JSON.stringify(
            "tomoyaさん、ありすえさんこんにちは。\nはじめまして、yasunoriの母です。\n\nyasunoriがソフトウェアエンジニアを志してから様子がおかしくなってしまいました。\n家ですれ違う時「Vim....Vim....」という独り言をずっと唱えていたり、部屋からは「設定させていただきありがとうございます!!」という大声が聞こえてきたり、\n「会合があるから東京に行ってくる、帰りは遅くなる」と言い残して出て行き、帰ってくると満面の笑みで「Vimはいいぞ」と一言言って自室に篭るようになりました。\n\ntomoyaさんありすえさんもVimコミュニティの人達だと伺いましたが、息子の身に一体何が起きてしまったのか教えていただけると幸いです。\n",
          ),
        ),
      },
    ],
  });
});
