import type { SerializeFrom } from "@remix-run/cloudflare";
import type { IndexLoader } from "../../routes/_index/loader";

interface MonthlyPostsAggregatedData {
  year: number;
  month: number;
  yearMonth: string;
  amount: number;
}

export function monthlyPostsAggregate(
  source: SerializeFrom<IndexLoader>,
): MonthlyPostsAggregatedData[] {
  // 年月ごとの投稿数をカウントする
  const counts = new Map<string, number>();
  for (const data of source) {
    const dateParts = data.date.split("-");
    const yearMonth = `${dateParts.at(0)}-${dateParts.at(1)}`;
    if (!counts.has(yearMonth)) {
      counts.set(yearMonth, 1);
    } else {
      counts.set(yearMonth, (counts.get(yearMonth) ?? 0) + 1);
    }
  }

  // 集計配列を作成する
  const aggregated: MonthlyPostsAggregatedData[] = [];
  for (const [yearMonth, count] of counts.entries()) {
    const dateParts = yearMonth.split("-");
    const year = Number(dateParts.at(0));
    const month = Number(dateParts.at(1));
    aggregated.push({
      year,
      month,
      yearMonth,
      amount: count,
    });
  }

  // 年月の昇順でソートする
  aggregated.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  return aggregated;
}
