import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { describe, expect, it } from "vitest";
import { server } from "./index.js";

describe("getAllAwesomeYasunori", () => {
  it("get all awesome yasunori", async () => {
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
    console.log(result);

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
});

describe("getRandomAwesomeYasunori", () => {
  it("get a random awesome yasunori", async () => {
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
    console.log(result);

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
});
