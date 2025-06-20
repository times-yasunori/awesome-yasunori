import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { server } from "./server";

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

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");

  const content = result.content as CallToolResult["content"];

  // check the content length is 1
  expect(result.content).toHaveLength(1);

  // check the content is a string
  expect(content[0]).toHaveProperty("type", "text");

  // check the content is a string type
  expect(content[0].type).toStrictEqual("text");

  // check the content includes "awesome yasunori"
  expect(content[0].text).toContain("id: ");
  expect(content[0].text).toContain("title: ");
  expect(content[0].text).toContain("date: ");
  expect(content[0].text).toContain("at: ");
  expect(content[0].text).toContain("senpan: ");
  expect(content[0].text).toContain("content: ");
  expect(content[0].text).toContain("yasunoriはおもちゃ");
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

  // check the result is a CallToolResult
  expect(result).toHaveProperty("content");
  const content = result.content as CallToolResult["content"];

  // check the content length is 1
  expect(result.content).toHaveLength(1);

  // check the content is a string
  expect(content[0]).toHaveProperty("type", "text");

  // check the content is a string type
  expect(content[0].type).toStrictEqual("text");

  // check the content includes "awesome yasunori"
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
  expect(content[0].text).toContain("title: yasunoriの母");
  expect(content[0].text).toContain("date: '2024-06-25'");
  expect(content[0].text).toContain("at: vim-jp radioお便り");
  expect(content[0].text).toContain("senpan: takeokunn");
  expect(content[0].text).toContain("content: ");
  expect(content[0].text).toContain("tomoyaさん、ありすえさんこんにちは");
});
