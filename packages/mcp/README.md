# Awesome Yasunori MCP

https://github.com/user-attachments/assets/670ee49e-9426-46a3-a373-1539190454d0

## How to use

You have three ways to use Awesome Yasunori MCP servers.

### Use HTTP Streaming Transport (Remote)

The easiest way to use Awesome Yasunori MCP is via HTTP streaming transport. You can connect to the hosted MCP server without any local setup.

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "awesome-yasunori": {
      "transport": {
        "type": "http",
        "uri": "https://api.yasunori.dev/awesome/mcp"
      }
    }
  }
}
```

#### Testing with MCP Inspector

You can test the HTTP streaming transport using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

1. Start the MCP Inspector:
   ```bash
   DANGEROUSLY_OMIT_AUTH=true npx @modelcontextprotocol/inspector
   ```
2. Open the MCP Inspector in your browser (usually `http://localhost:5173`)
3. Enter the endpoint URL: `https://api.yasunori.dev/awesome/mcp`
4. Test the available tools:
   - `getAllAwesomeYasunori`: Get all yasunori entries
   - `getRandomAwesomeYasunori`: Get a random yasunori entry
   - `getAwesomeYasunoriById`: Get a specific yasunori entry by ID

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

