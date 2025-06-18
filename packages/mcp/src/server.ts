import { client } from "@awesome-yasunori/api/client";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stringify } from "@std/yaml";
import { z } from "zod";

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
