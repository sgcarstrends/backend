"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  data: any[];
}

export const TrendChart = ({ data }: Props) => {
  const monthlyTotals: { [key: string]: number } = {};
  for (const { month, count } of data) {
    if (monthlyTotals[month]) {
      monthlyTotals[month] += count;
    } else {
      monthlyTotals[month] = count;
    }
  }

  const chartData = Object.entries(monthlyTotals).map(([month, count]) => ({
    month,
    count,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickMargin={8} />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" label />}
        />
        <Line
          dataKey="count"
          type="monotone"
          fill="var(--primary)"
          stroke="var(--primary)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
};

const chartConfig = {
  count: { label: "Count" },
} satisfies ChartConfig;
