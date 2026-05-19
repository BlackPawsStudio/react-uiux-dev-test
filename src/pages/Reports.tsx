import { useMemo } from "react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/ui/Panel";
import { reportRows } from "../data/mockData";

export default function Reports() {
  const maxRevenue = useMemo(
    () => Math.max(...reportRows.map((row) => row.revenue), 1),
    [],
  );

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Reports"
        description="Revenue, churn, and user trends shown with deliberately fragile charts."
      />
      <Panel className="mb-4 h-[360px]" aria-labelledby="revenue-chart-title">
        <h2 id="revenue-chart-title" className="text-xl font-bold">
          Revenue
        </h2>
        <div
          className="flex h-[260px] items-end gap-4 py-5"
          role="img"
          aria-label="Revenue by month. Detailed figures are in the table below."
        >
          {reportRows.map((row) => (
            <div
              key={row.month}
              className="relative min-h-[20px] w-20 rounded-t-[14px] rounded-b bg-brand text-white"
              style={{ height: `${(row.revenue / maxRevenue) * 100}%` }}
              title={`${row.month}: £${row.revenue.toLocaleString()}`}
            >
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-sm text-[#475467] dark:text-slate-400">
                {row.month}
              </span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="overflow-auto" aria-labelledby="revenue-table-title">
        <h2 id="revenue-table-title" className="sr-only">
          Revenue data table
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                Month
              </th>
              <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                Revenue
              </th>
              <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                Churn
              </th>
              <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                Users
              </th>
            </tr>
          </thead>
          <tbody>
            {reportRows.map((row) => (
              <tr key={row.month} className="transition-colors hover:bg-brand/5">
                <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  {row.month}
                </td>
                <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  £{row.revenue.toLocaleString()}
                </td>
                <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  {row.churn}%
                </td>
                <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  {row.users.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}
