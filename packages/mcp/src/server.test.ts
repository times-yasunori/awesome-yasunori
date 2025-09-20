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

  expect(result.structuredContent).toBeDefined();
  const structured = result.structuredContent as {
    total: number;
    offset: number | null;
    limit: number | null;
    items: Array<{
      id: number;
      title: string;
      date: string;
      at: string;
      senpan: string;
      content: string;
      meta?: string | null;
    }>;
  };

  expect(structured.total).toBeGreaterThan(0);
  expect(structured.offset).toBeNull();
  expect(structured.limit).toBeNull();
  expect(structured.items.length).toBeGreaterThan(0);
  const [firstItem] = structured.items;
  expect(firstItem).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    date: expect.any(String),
    at: expect.any(String),
    senpan: expect.any(String),
    content: expect.any(String),
  });

  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];
  expect(content).toHaveLength(1);
  expect(content[0]?.type).toBe("text");
  expect(content[0]?.text).toContain("total: ");
  // When no parameters provided, offset and limit are null (returns all items)
  expect(content[0]?.text).toContain("offset: null");
  expect(content[0]?.text).toContain("limit: null");
  expect(content[0]?.text).toContain("items:");
  expect(content[0]?.text).toContain("yasunoriはおもちゃ");
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

  const structured = result.structuredContent as {
    total: number;
    offset: number;
    limit: number;
    items: Array<Record<string, unknown>>;
  };
  expect(structured.offset).toBe(10);
  expect(structured.limit).toBe(5);
  expect(structured.items.length).toBeLessThanOrEqual(5);

  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];
  expect(content[0]?.type).toBe("text");
  expect(content[0]?.text).toContain("offset: 10");
  expect(content[0]?.text).toContain("limit: 5");
  expect(content[0]?.text).toContain("items:");
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

  const structured = result.structuredContent as { count: number };
  expect(structured.count).toBeGreaterThan(0);

  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];
  expect(content).toHaveLength(1);
  expect(content[0]?.type).toBe("text");
  expect(content[0]?.text).toContain("count: ");
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

  const structured = result.structuredContent as {
    id: number;
    title: string;
    date: string;
    at: string;
    senpan: string;
    content: string;
    meta?: string | null;
  };
  expect(structured.id).toBeGreaterThan(0);

  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];
  expect(content).toHaveLength(1);
  expect(content[0]?.type).toBe("text");
  expect(content[0]?.text).toContain("id: ");
  expect(content[0]?.text).toContain("title: ");
  expect(content[0]?.text).toContain("date: ");
  expect(content[0]?.text).toContain("at: ");
  expect(content[0]?.text).toContain("senpan: ");
  expect(content[0]?.text).toContain("content: ");
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

  const structured = result.structuredContent as {
    id: number;
    title: string;
    date: string;
    at: string;
    senpan: string;
    content: string;
    meta?: string | null;
  };
  expect(structured.id).toBe(1);
  expect(structured.title).toContain("yasunori");
  expect(structured.date).toBe("2024-06-25");
  expect(structured.at).toContain("vim-jp");

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");
  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];

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

  const structured = result.structuredContent as {
    query: string;
    limit: number;
    threshold: number;
    count: number;
    elapsed: string;
    results: Array<Record<string, unknown>>;
  };

  expect(structured.query).toBe("yasunori");
  expect(structured.limit).toBe(5);
  expect(structured.count).toBeGreaterThan(0);
  expect(structured.results.length).toBeGreaterThan(0);

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");
  const content = result.content as Extract<
    CallToolResult["content"][0],
    { type: "text" }
  >[];

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
