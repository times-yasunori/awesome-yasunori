# Awesome Yasunori Image Generator

This is an application that generates images from Awesome Yasunori.

It's built using the wrapper[@cloudflare/pages-plugin-vercel-og](https://developers.cloudflare.com/pages/functions/plugins/vercel-og/) for [satori](https://github.com/vercel/satori), and it operates on Cloudflare Pages Functions.

## How to use

To retrieve an image of Awesome Yasunori with a specific ID, please send a request with the query parameter `id=<desired ID>`.

```
https://image.yasunori.dev/ogp?id=1
```

If no query parameters are added, the system will generate an image of Awesome Yasunori that has been randomly selected.

```
https://image.yasunori.dev/ogp
```

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```
