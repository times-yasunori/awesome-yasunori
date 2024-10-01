# Yasunori APIs

The Yasunori APIs are web APIs that utilize a curated list related to [yasunori0418](https://github.com/yasunori0418).

Specifically, they can be used in the following ways:

```
curl https://api.yasunori.dev/awesome
```

## Development

We are using [Hono](https://hono.dev/) as our web application framework.

The recommended development environment is Node.js, and we use pnpm as our package manager. Please install these first and then navigate to the `packages/api` directory. Once there, please run the following command. This will launch your development environment.

```sh
$ pnpm install
$ pnpm generate:json
$ pnpm run dev
```
Notably, since the yasunori.toml file is converted and loaded into
awesome-yasunori.json beforehand, if you update the yasunori.toml
file, changes will not be reflected unless you run the `pnpm
generate:json` command to convert it each time. Otherwise, the content
mentioned in the latest yasunori.toml file will not be applied.

In addition, we have prepared the following commands for your use in
development. Please utilize them as needed.

```sh
$ pnpm test      # Run tests
$ pnpm typecheck # Run type checking
$ pnpm lint      # Run linting
$ pnpm format    # Run formatting
```

## Deployment

yasunori APIs deploying on Cloudflare Pages using [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

```sh
$ pnpm run deploy
```
