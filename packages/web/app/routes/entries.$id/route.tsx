import { Flex, rem } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { AwesomeYasunoriCard } from "../../components/awesome-yasunori-card";
import { type EntryLoader, entryLoader } from "./loader";

export const loader = entryLoader;

export default function Entry() {
  const entry = useLoaderData<EntryLoader>();
  return (
    <Flex justify="center" align="center" mih="calc(100vh - 60px - 32px)">
      <AwesomeYasunoriCard entry={entry} maw={rem(800)} />
    </Flex>
  );
}
