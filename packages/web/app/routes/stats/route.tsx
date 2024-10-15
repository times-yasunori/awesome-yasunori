import { LineChart } from "@mantine/charts";
import { Stack, Text, Title } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import type { IndexLoader } from "../_index/loader";
export { indexLoader as loader } from "../_index/loader";
import "@mantine/charts/styles.css";
import { monthlyPostsAggregate } from "./aggregate";

export default function Stats() {
  const source = useLoaderData<IndexLoader>();
  const monthlyPostsAggregateData = monthlyPostsAggregate(source);
  return (
    <Stack gap="xl">
      <Stack id="monthly-posts" gap="lg">
        <Title order={2} size="h2">
          Monthly Posts
        </Title>
        <LineChart
          h={300}
          data={monthlyPostsAggregateData}
          dataKey="yearMonth"
          series={[{ name: "amount", label: "Posts" }]}
        />
      </Stack>
      <Text>More statistics are being implemented.</Text>
    </Stack>
  );
}
