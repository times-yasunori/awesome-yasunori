import { Stack, Title, Card, Paper, Badge, Group } from "@mantine/core";
import { useAwesomeYasunori } from "../hooks/use-awesome-yasunori";
import type { MetaFunction } from "@remix-run/node";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const meta: MetaFunction = () => {
  return [
    { title: "Awesome yasunori web" },
    { name: "description", content: "Welcome to awesome yasunori!" },
  ];
};

export default function Index() {
  const { data } = useAwesomeYasunori();
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
          <Stack mb="lg">
            <Title order={2} size="h2">
              {d.title}
            </Title>
            <Group gap="xs">
              <Badge color="pink">#{d.id}</Badge>
              <Badge color="blue">{d.senpan}</Badge>
              <Badge color="green">{d.at}</Badge>
              <Badge color="cyan">{d.date}</Badge>
            </Group>
          </Stack>
          <Paper p="md">
            <Markdown remarkPlugins={[remarkGfm]}>{d.content}</Markdown>
          </Paper>
        </Card>
      ))}
    </Stack>
  );
}
