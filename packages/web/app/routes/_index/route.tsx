import { Stack } from "@mantine/core";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { AwesomeYasunoriCard } from "../../components/awesome-yasunori-card";
import { type IndexLoader, indexLoader } from "./loader";

export const loader = indexLoader;

export const meta: MetaFunction = () => {
  const title = "Awesome Yasunori";
  const description = "Welcome to awesome yasunori!";
  const url = "https://awesome.yasunori.dev";
  return [
    { title },
    { name: "description", content: description },
    { property: "og:url", content: url },
    { property: "og:site_name", content: title },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:locale", content: "ja" },
    { property: "og:type", content: "website" },
    // TODO
    // { property: 'og:image', content: "url" },
  ];
};

export default function Index() {
  const entries = useLoaderData<IndexLoader>();
  return (
    <Stack gap="lg">
      {entries.map((entry) => (
        <AwesomeYasunoriCard key={entry.id} entry={entry} />
      ))}
    </Stack>
  );
}
