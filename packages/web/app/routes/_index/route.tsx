import {
  ActionIcon,
  Avatar,
  Card,
  CopyButton,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import IconCheckBoxOutline from "~icons/material-symbols/check-rounded";
import IconCopyOutline from "~icons/material-symbols/content-copy-outline-rounded";
import { type IndexLoader, indexLoader } from "./loader";

export const loader = indexLoader;
export const meta: MetaFunction = () => {
  return [
    { title: "Awesome yasunori web" },
    { name: "description", content: "Welcome to awesome yasunori!" },
  ];
};

export default function Index() {
  const data = useLoaderData<IndexLoader>();
  return (
    <Stack gap="lg">
      {data?.map((d) => (
        <Card
          key={d.id}
          id={`${d.id}`}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Card.Section p="md" component={Stack}>
            <Title order={2} size="h2">
              {d.title}{" "}
              <Text c="dimmed" size="lg" span>
                #{d.id}
              </Text>
            </Title>
          </Card.Section>
          <Card.Section>
            <Paper p="md" style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: rem(6), right: rem(6) }}>
                <CopyButton value={d.content}>
                  {({ copied, copy }) => (
                    <ActionIcon variant="subtle" color="dark" onClick={copy}>
                      {copied ? <IconCheckBoxOutline /> : <IconCopyOutline />}
                    </ActionIcon>
                  )}
                </CopyButton>
              </div>
              <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                {d.content}
              </Markdown>
            </Paper>
          </Card.Section>
          <Card.Section p="md">
            <Group gap="sm" align="center">
              <Avatar
                src={`https://avatars.githubusercontent.com/${d.senpan}`}
                radius="sm"
              />
              <Stack gap="0">
                <Text fw={600}>{d.senpan}</Text>
                <Text size="sm" c="dimmed">
                  {d.date} at {d.at}
                </Text>
              </Stack>
            </Group>
          </Card.Section>
        </Card>
      ))}
    </Stack>
  );
}
