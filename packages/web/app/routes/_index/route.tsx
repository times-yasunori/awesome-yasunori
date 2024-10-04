import { Stack } from "@mantine/core";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { AwesomeYasunoriCard } from "../../components/awesome-yasunori-card";
import { type IndexLoader, indexLoader } from "./loader";

export const loader = indexLoader;
export const meta: MetaFunction = () => {
  return [
    { title: "Awesome yasunori web" },
    { name: "description", content: "Welcome to awesome yasunori!" },
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
