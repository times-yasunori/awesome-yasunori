import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import esMain from "es-main";
import { server } from "./server";

// mainなら、サーバーを起動する
if (esMain(import.meta)) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // 標準出力をするとサーバーのレスポンスとして解釈されてしまうので、標準エラー出力に出力する
  console.error("MCP Server running on stdio");
}
