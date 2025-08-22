import { client } from "@awesome-yasunori/api/client";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stringify } from "@std/yaml";
import { z } from "zod";
import { searchYasunori } from "./search.js";

// サーバーインスタンスの作成
export const server = new McpServer({
  name: "awesome-yasunori",
  version: "0.1.0",
});

server.tool("getAllAwesomeYasunori", "get all awesome yasunori", async () => {
  const res = await client.awesome.$get();
  if (!res.ok) {
    throw new Error("Failed to get all awesome yasunori");
  }
  const allYasunori = await res.json();
  return {
    content: [
      {
        type: "text",
        text: stringify(allYasunori),
      },
    ],
  };
});

server.tool(
  "getRandomAwesomeYasunori",
  "get random awesome yasunori",
  async () => {
    const res = await client.awesome.random.$get();
    if (!res.ok) {
      throw new Error("Failed to get random awesome yasunori");
    }
    const randomYasunori = await res.json();
    return {
      content: [
        {
          type: "text",
          text: stringify(randomYasunori),
        },
      ],
    };
  },
);

server.tool(
  "getAwesomeYasunoriById",
  "get awesome yasunori by id",
  { id: z.number().int().min(0).describe("Awesome Yasunori ID") },
  async ({ id }) => {
    const res = await client.awesome[":id"].$get({
      param: { id: id.toString() },
    });
    if (!res.ok) {
      throw new Error("Failed to get awesome yasunori by id");
    }
    const awesomeYasunori = await res.json();
    return {
      content: [
        {
          type: "text",
          text: stringify(awesomeYasunori),
        },
      ],
    };
  },
);

server.tool(
  "searchAwesomeYasunori",
  "search awesome yasunori entries using full-text search with BM25 algorithm",
  {
    query: z
      .string()
      .describe("Search query to find relevant yasunori entries"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("Maximum number of results to return (default: 10)"),
    threshold: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .describe("Minimum relevance score threshold (default: 0)"),
  },
  async ({ query, limit = 10, threshold = 0 }) => {
    try {
      const searchResult = await searchYasunori(query, { limit, threshold });
      return {
        content: [
          {
            type: "text",
            text: stringify({
              query,
              count: searchResult.count,
              elapsed: searchResult.elapsed,
              results: searchResult.entries,
            }),
          },
        ],
      };
    } catch (error) {
      throw new Error(
        `Failed to search awesome yasunori: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  },
);
