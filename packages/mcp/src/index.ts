import { client } from "@awesome-yasunori/api/client";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { stringify } from "@std/yaml";
import esMain from "es-main";
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

server.resource(
  "all awesome yasunori",
  new ResourceTemplate("awesomeyasunori://{id}", {
    list: async () => {
      // TODO: use list api but it is not merged yet
      const res = await client.awesome.$get();
      if (!res.ok) {
        return { resources: [] };
      }
      const allYasunori = await res.json();
      const resources = allYasunori
        .map((yasunori) => ({
          name: yasunori.title,
          id: yasunori.id,
          uri: `awesomeyasunori://${yasunori.id}`,
        }))
        .sort((a, b) => a.id - b.id);
      return { resources };
    },
  }),
  async (uri: URL) => {
    const id = uri.hostname;
    const res = await client.awesome[":id"].$get({
      param: { id: id.toString() },
    });
    if (!res.ok) {
      return { contents: [] };
    }
    const awesomeYasunori = await res.json();
    return {
      contents: [
        {
          uri: uri.href,
          text: stringify(awesomeYasunori),
        },
      ],
    };
  },
);

// mainなら、サーバーを起動する
if (esMain(import.meta)) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // 標準出力をするとサーバーのレスポンスとして解釈されてしまうので、標準エラー出力に出力する
  console.error("MCP Server running on stdio");
}
