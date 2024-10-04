import { Button, Flex, Group, Stack, rem } from "@mantine/core";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { AwesomeYasunoriCard } from "../../components/awesome-yasunori-card";
import { type EntryLoader, entryLoader } from "./loader";

export const loader = entryLoader;

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
