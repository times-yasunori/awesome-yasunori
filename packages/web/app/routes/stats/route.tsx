import { BarChart, LineChart } from "@mantine/charts";
import { Stack, Text, Title } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import type { IndexLoader } from "../_index/loader";
export { indexLoader as loader } from "../_index/loader";
import "@mantine/charts/styles.css";
import { monthlyPostsAggregate, senpanAggregate } from "./aggregate";

export const statsContents = [
  {
    id: "monthly-posts",
    title: "Monthly Posts",
  },
  {
    id: "senpan-ranking",
    title: "Senpan Ranking",
  },
] as const;

export default function Stats() {
  const source = useLoaderData<IndexLoader>();
  const monthlyPostsAggregateData = monthlyPostsAggregate(source);
  const senpanAggregateData = senpanAggregate(source);
  return (
    <Stack gap="xl">
      <Stack id={`${statsContents.at(0)?.id}`} gap="lg">
        <Title order={2} size="h2">
          {statsContents.at(0)?.title}
        </Title>
        <LineChart
          h={300}
          data={monthlyPostsAggregateData}
          dataKey="yearMonth"
          series={[{ name: "amount", label: "Posts" }]}
        />
      </Stack>
      <Stack id={`${statsContents.at(1)?.id}`} gap="lg">
        <Title order={2} size="h2">
          {statsContents.at(1)?.title}
        </Title>
        <BarChart
          pl="xl" // これがないと名前が左にはみだす
          orientation="vertical"
          h={500}
          data={senpanAggregateData}
          dataKey="senpan"
          series={[{ name: "amount", label: "Posts" }]}
          tickLine="x"
          gridAxis="y"
        />
      </Stack>
      <Text>More statistics are being implemented.</Text>
    </Stack>
  );
}
