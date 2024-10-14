import { ActionIcon, rem } from "@mantine/core";
import {
  Spotlight,
  type SpotlightActionData,
  spotlight,
} from "@mantine/spotlight";
import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import IconSearch from "~icons/tabler/search";
import type { IndexLoader } from "../../routes/_index/loader";
import "@mantine/spotlight/styles.css";

export function YasunoriSpotlight() {
  const navigate = useNavigate();
  const data = useRouteLoaderData<IndexLoader>("routes/_index");
  const actions: SpotlightActionData[] =
    data?.map(({ id, title, content, senpan }) => {
      return {
        id: `${id}`,
        label: `${title} #${id}`,
        description:
          content.length > 100
            ? `${content.slice(0, 100)}… posted by ${senpan}`
            : `${content} posted by ${senpan}`,
        onClick: () => navigate(`/entries/${id}`),
      };
    }) ?? [];
  return (
    <>
      <Spotlight
        actions={actions}
        nothingFound="Yasunori is yasunoried."
        highlightQuery
        scrollable
        maxHeight={rem(500)}
        searchProps={{
          leftSection: (
            <IconSearch style={{ width: rem(20), height: rem(20) }} />
          ),
          placeholder: "Search yasunories...",
        }}
      />
      <ActionIcon variant="transparent" color="gray" onClick={spotlight.open}>
        <IconSearch />
      </ActionIcon>
    </>
  );
}
