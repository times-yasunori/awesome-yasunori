import { client as AYClient, client } from "@awesome-yasunori/api/client";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// サーバーインスタンスの作成
export const server = new McpServer({
  name: "awesome-yasunori",
  version: "0.1.0",
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
          text: `Here is a random awesome yasunori: ${JSON.stringify(randomYasunori)}`,
        },
      ],
    };
  },
);
