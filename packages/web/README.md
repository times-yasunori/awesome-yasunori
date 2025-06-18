# Awesome Yasunori web

This is a website that allows you to elegantly appreciate "Awesome Yasunori" by utilizing the APIs of Yasunori.

https://awesome.yasunori.dev

## Features

- Browse all Awesome Yasunori entries with elegant UI
- Search and filter yasunori entries
- Responsive design for mobile and desktop
- RSS feed support at `/feed.xml`
- Statistics page showing yasunori trends

## Related APIs

This web application consumes the [Yasunori APIs](../api/) which also provides:
- **MCP (Model Context Protocol)**: Chat with LLMs about Awesome Yasunori data via HTTP streaming transport at `https://api.yasunori.dev/awesome/mcp`

## Development

Run the dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```
