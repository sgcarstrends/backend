import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { RegistrationStat } from "@/types/cars";

interface Props {
  data: RegistrationStat[];
}

export const BarChartByType = ({ data }: Props) => {
  const chartData = data.map(({ name, count }) => ({
    label: name,
    count,
    fill: "var(--primary)",
  }));

  const chartConfig = {
    count: { label: "Count" },
    label: { color: "var(--background)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <XAxis type="number" dataKey="count" hide />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="count" radius={4}>
          <LabelList
            dataKey="label"
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey="count"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartByType;
