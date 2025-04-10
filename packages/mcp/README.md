# Awesome Yasunori MCP

https://github.com/user-attachments/assets/670ee49e-9426-46a3-a373-1539190454d0

## How to use

You have two ways to use MCP servers.

### Get the latest version from pkg.pr.new

```json
{
  "mcpServers": {
    "awesome-yasunori": {
      "command": "npx",
      "args": [
        "-y",
        "https://pkg.pr.new/times-yasunori/awesome-yasunori/mcp@180" // you can check the latest version on pkg.pr.new
      ]
    }
  }
}
```

### Build the server from source

1.1 Clone the repository
```bash
git clone https://github.com/times-yasunori/awesome-yasunori.git
cd awesome-yasunori
pnpm install
cd packages/mcp
```

1.2 Build the server
```bash
pnpm build
```

You can find the built server in `packages/mcp/dist/index.mjs`.

1.3  Register the server to your MCP client

Edit the configuration file of your MCP client.

```json
{
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

