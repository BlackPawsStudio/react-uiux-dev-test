import clsx from "clsx";
import Panel from "./ui/Panel";

export interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
}

export default function StatCard({ label, value, trend }: StatCardProps) {
  const trendClass =
    trend > 0
      ? "text-[#047857]"
      : trend < 0
        ? "text-[#b42318]"
        : "text-[#667085]";
  const trendPrefix = trend > 0 ? "+" : "";

  return (
    <Panel as="article" className="p-5">
      <p className="m-0 mb-3 text-sm text-[#667085] dark:text-slate-400">
        {label}
      </p>
      <strong className="block text-3xl">{value}</strong>
      <span className={clsx("text-sm font-semibold", trendClass)}>
        {trendPrefix}
        {trend}%
      </span>
    </Panel>
  );
}
