import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  type CardProps,
  CopyButton,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  rem,
} from "@mantine/core";
import type { SerializeFrom } from "@remix-run/cloudflare";
import { useNavigate } from "@remix-run/react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import IconCopy from "~icons/tabler/copy";
import IconrCopyCheckFilled from "~icons/tabler/copy-check-filled";
import IconShare from "~icons/tabler/share";
import { useIsMobile } from "../../hooks/use-is-mobile";
import type { IndexLoader } from "../../routes/_index/loader";

interface Props extends CardProps {
  entry: SerializeFrom<IndexLoader>[number];
}

export function AwesomeYasunoriCard({
  entry: { id, title, date, at, senpan, content, meta },
  ...cardProps
}: Props) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <Card
      id={`${id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      {...cardProps}
    >
      <Card.Section p="md" component={Stack}>
        <Title order={2} size="h2">
          {title}{" "}
          <Button
            variant="transparent"
            size="xs"
            onClick={() => navigate(`/entries/${id}`)}
          >
            <Text c="dimmed" size="lg" span>
              #{id}
            </Text>
          </Button>
        </Title>
      </Card.Section>
      <Card.Section>
        <Paper p="md" style={{ position: "relative" }} radius={0}>
          <div style={{ position: "absolute", top: rem(6), right: rem(6) }}>
            <CopyButton
              value={`${content}\nhttps://awesome.yasunori.dev/entries/${id}`}
            >
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied!" : "Copy awesome yasunori"}
                  withArrow
                  position="left"
                >
                  <ActionIcon variant="subtle" color="dark" onClick={copy}>
                    {copied ? <IconrCopyCheckFilled /> : <IconCopy />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </div>
          <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>
            {content}
          </Markdown>
        </Paper>
      </Card.Section>
      {meta && (
        <>
          <Card.Section px="md">
            <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>
              {meta}
            </Markdown>
          </Card.Section>
          <Card.Section>
            <Divider />
          </Card.Section>
        </>
      )}
      <Card.Section p="md">
        <Group align="center" justify="space-between">
          <Group gap="sm" align="center">
            <Avatar
              src={`https://avatars.githubusercontent.com/${senpan}`}
              radius="sm"
            />
            <Stack gap="0">
              <Text fw={600}>{senpan}</Text>
              <Text size="sm" c="dimmed">
                {date} at {at}
              </Text>
            </Stack>
          </Group>
          {!isMobile && <FooterActionIcons id={id} />}
        </Group>
      </Card.Section>
      {isMobile && (
        <>
          <Card.Section>
            <Divider />
          </Card.Section>
          <Card.Section py="sm" px="md">
            <FooterActionIcons id={id} />
          </Card.Section>
        </>
      )}
    </Card>
  );
}

function FooterActionIcons({ id }: Pick<Pick<Props, "entry">["entry"], "id">) {
  return (
    <Group gap="sm" align="center" justify="flex-end">
      <CopyButton value={`https://awesome.yasunori.dev/entries/${id}`}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? "Copied share link!" : "Copy share link"}
            withArrow
            position="left"
          >
            <ActionIcon variant="subtle" onClick={copy}>
              <IconShare />
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  );
}
