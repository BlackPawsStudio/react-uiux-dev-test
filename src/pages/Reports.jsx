import { useMemo } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { reportRows } from "../data/mockData.js";

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
      <section
        className="panel chart-panel"
        aria-labelledby="revenue-chart-title"
      >
        <h2 id="revenue-chart-title">Revenue</h2>
        <div
          className="bar-chart"
          role="img"
          aria-label="Revenue by month. Detailed figures are in the table below."
        >
          {reportRows.map((row) => (
            <div
              key={row.month}
              className="chart-bar"
              style={{ height: `${(row.revenue / maxRevenue) * 100}%` }}
              title={`${row.month}: £${row.revenue.toLocaleString()}`}
            >
              <span>{row.month}</span>
            </div>
          ))}
        </div>
      </section>
      <section
        className="panel table-wrap"
        aria-labelledby="revenue-table-title"
      >
        <h2 id="revenue-table-title" className="sr-only">
          Revenue data table
        </h2>
        <table className="data-table compact" id="revenue-data-table">
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Revenue</th>
              <th scope="col">Churn</th>
              <th scope="col">Users</th>
            </tr>
          </thead>
          <tbody>
            {reportRows.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>£{row.revenue.toLocaleString()}</td>
                <td>{row.churn}%</td>
                <td>{row.users.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
