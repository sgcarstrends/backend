import { TrendingDown, TrendingUp } from "lucide-react";
import { formatPercent } from "@/utils/format-percent";

interface TrendIndicatorProps {
  change: number;
  label: string;
}

const TrendIndicator = ({ change, label }: TrendIndicatorProps) => (
  <div className="flex items-center gap-1">
    <span
      className={`flex items-center gap-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
    >
      {change >= 0 ? (
        <TrendingUp className="size-4" />
      ) : (
        <TrendingDown className="size-4" />
      )}
      {formatPercent(Math.abs(change), { maximumFractionDigits: 1 })}
    </span>
    <span className="text-muted-foreground text-sm">{label}</span>
  </div>
);
 
interface MetricsComparisonProps {
  current: number;
  previousMonth: number;
  previousYear: number;
}

export const MetricsComparison = ({
  current,
  previousMonth,
  previousYear,
}: MetricsComparisonProps) => {
  const monthChange = (current - previousMonth) / previousMonth;
  const yearChange = (current - previousYear) / previousYear;

  return (
    <div className="flex flex-col gap-1">
      <TrendIndicator change={monthChange} label="vs. Last Month" />
      <TrendIndicator change={yearChange} label="vs. Last Year" />
    </div>
  );
};
