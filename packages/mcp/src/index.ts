import { client } from "@awesome-yasunori/api/client";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { stringify } from "@std/yaml";
import esMain from "es-main";
import { server } from "./server.ts";

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
