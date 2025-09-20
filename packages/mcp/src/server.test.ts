import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { server } from "./server";

test("getAllAwesomeYasunori with default pagination", async () => {
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  const result = await client.callTool({
    name: "getAllAwesomeYasunori",
    arguments: {},
  });

  expect(result).toHaveProperty("content");

  const content = result.content as CallToolResult["content"];

  expect(result.content).toHaveLength(1);
  expect(content[0]).toHaveProperty("type", "text");
  expect(content[0].type).toStrictEqual("text");
  expect(content[0].text).toContain("total: ");
  expect(content[0].text).toContain("offset: 0");
  expect(content[0].text).toContain("limit: 50");
  expect(content[0].text).toContain("items:");
  expect(content[0].text).toContain("yasunoriはおもちゃ");
});

test("getAllAwesomeYasunori with custom pagination", async () => {
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  const result = await client.callTool({
    name: "getAllAwesomeYasunori",
    arguments: { offset: 10, limit: 5 },
  });

  expect(result).toHaveProperty("content");

  const content = result.content as CallToolResult["content"];

  expect(content[0]).toHaveProperty("type", "text");
  expect(content[0].text).toContain("offset: 10");
  expect(content[0].text).toContain("limit: 5");
  expect(content[0].text).toContain("items:");
});

test("getAwesomeYasunoriCount", async () => {
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  const result = await client.callTool({
    name: "getAwesomeYasunoriCount",
    arguments: {},
  });

  expect(result).toHaveProperty("content");
  const content = result.content as CallToolResult["content"];

  expect(result.content).toHaveLength(1);
  expect(content[0]).toHaveProperty("type", "text");
  expect(content[0].type).toStrictEqual("text");
  expect(content[0].text).toContain("count: ");
});

test("getRandomAwesomeYasunori", async () => {
  const client = new Client({
    name: "test client",
    version: "0.1.0",
  });

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  await Promise.all([
    client.connect(clientTransport),
    server.connect(serverTransport),
  ]);

  const result = await client.callTool({
    name: "getRandomAwesomeYasunori",
    arguments: {},
  });

  expect(result).toHaveProperty("content");
  const content = result.content as CallToolResult["content"];

  expect(result.content).toHaveLength(1);
  expect(content[0]).toHaveProperty("type", "text");
  expect(content[0].type).toStrictEqual("text");
  expect(content[0].text).toContain("id: ");
  expect(content[0].text).toContain("title: ");
  expect(content[0].text).toContain("date: ");
  expect(content[0].text).toContain("at: ");
  expect(content[0].text).toContain("senpan: ");
  expect(content[0].text).toContain("content: ");
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

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");
  const content = result.content as CallToolResult["content"];

  // check the content length is 1
  expect(result.content).toHaveLength(1);
  // check the content is a string
  expect(content[0]).toHaveProperty("type", "text");

  // check the content is a string type
  expect(content[0].type).toStrictEqual("text");

  // check the content includes 1st awesome yasunori
  expect(content[0].text).toContain("id: 1");
  expect(content[0].text).toContain("title: テスト yasunori エントリ");
  expect(content[0].text).toContain("date: '2024-06-25'");
  expect(content[0].text).toContain("at: vim-jp radioお便り");
  expect(content[0].text).toContain("senpan: takeokunn");
  expect(content[0].text).toContain("content: ");
  expect(content[0].text).toContain("tomoyaさん、ありすえさんこんにちは");
});

test("searchAwesomeYasunori", async () => {
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

  // call the search tool
  const result = await client.callTool({
    name: "searchAwesomeYasunori",
    arguments: { query: "yasunori", limit: 5 },
  });

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");
  const content = result.content as CallToolResult["content"];

  // check the content length is 1
  expect(result.content).toHaveLength(1);

  // check the content is a string
  expect(content[0]).toHaveProperty("type", "text");

  // check the content is a string type
  expect(content[0].type).toStrictEqual("text");

  // check the search result structure
  expect(content[0].text).toContain("query: yasunori");
  expect(content[0].text).toContain("count:");
  expect(content[0].text).toContain("elapsed:");
  expect(content[0].text).toContain("results:");
});

test("awesomeyasunori resources", async () => {
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

  // list resources
  const resources = await client.listResources();
  expect(resources).toHaveProperty("resources");
  expect(resources.resources.length).toBeGreaterThan(0);
  expect(resources.resources.some((r) => r.name === "yasunori-entries")).toBe(
    true,
  );

  // get resource
  const resource = await client.readResource({ uri: "awesomeyasunori://1" });
  expect(resource).toHaveProperty("contents");
  const { contents } = resource;

  // check the content length is 1
  expect(contents).toHaveLength(1);
  const content = contents[0];

  // check the content includes 1st awesome yasunori
  expect(content.text).toContain("id: 1");
  expect(content.text).toContain("title: テスト yasunori エントリ");
  expect(content.text).toContain("date: '2024-06-25'");
  expect(content.text).toContain("at: vim-jp radioお便り");
  expect(content.text).toContain("senpan: takeokunn");
  expect(content.text).toContain("content: ");
  expect(content.text).toContain("tomoyaさん、ありすえさんこんにちは");
});
