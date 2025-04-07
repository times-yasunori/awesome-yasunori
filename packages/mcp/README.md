# Awesome Yasunori MCP

https://github.com/user-attachments/assets/670ee49e-9426-46a3-a373-1539190454d0

## How to use

1. Build the cli tool
```bash
git clone https://github.com/times-yasunori/awesome-yasunori.git
cd awesome-yasunori
pnpm install
cd packages/mcp
```

There are two ways to use MCP servers.

2.1. Run the server on your terminal
```bash
pnpm dev
```

Then you can register the localhost address to your MCP client.

2.2 Call from your Client

You can execute server from your MCP client (e.g. Claude Desktop).

The below example is for Claude Desktop.

2.2.1 Build the server
```bash
pnpm build
```

You can find the built server in `packages/mcp/dist/index.mjs`.
2.2.2 Register the server to your MCP client

Edit the configuration file of your MCP client.

```json
{
  "globalShortcut": "Alt+Ctrl+Space",
  "mcpServers": {
    "awesome-yasunori": {
      "command": "node",
      "args": [
        "/Absolute/Path/Of/times-yasunori/awesome-yasunori/packages/mcp/dist/index.mjs"
      ]
    }
  }
}

```

2.2.3 Run the MCP client

Relaunch the MCP client and ask about awesome-yasunori! 

