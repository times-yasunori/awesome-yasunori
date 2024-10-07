import { Button, Flex, Group, Stack, rem } from "@mantine/core";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { AwesomeYasunoriCard } from "../../components/awesome-yasunori-card";
import { type EntryLoader, entryLoader } from "./loader";

export const loader = entryLoader;

export const meta: MetaFunction<EntryLoader> = ({ data, location }) => {
  const title = data?.title ?? "Awesome Yasunori";
  const description = data?.content ?? "Awesome Yasurunori Content";
  const url = `https://awesome.yasunori.dev${location.pathname}`;
  const ogImageUrl = `https://image.yasunori.dev/ogp?id=${data?.id}`;
  const date = data?.date
    ? new Date(data.date).toISOString()
    : new Date().toISOString();
  return [
    { title },
    { name: "description", content: description },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Awesome Yasunori" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:locale", content: "ja" },
    { property: "og:type", content: "article" },
    { property: "article:section", content: "posts" },
    { property: "article:published_time", content: date },
    { property: "article:modified_time", content: date },
    { property: "og:image", content: ogImageUrl },
  ];
};

export default function Entry() {
  const entry = useLoaderData<EntryLoader>();
  const navigate = useNavigate();
  return (
    <Flex justify="center" align="center" mih={`calc(100vh - ${rem(32)})`}>
      <Stack>
        <AwesomeYasunoriCard entry={entry} maw={rem(800)} />
        <Group justify="end">
          <Button variant="subtle" onClick={() => navigate("/")}>
            Back to yasunories
          </Button>
        </Group>
      </Stack>
    </Flex>
  );
}
