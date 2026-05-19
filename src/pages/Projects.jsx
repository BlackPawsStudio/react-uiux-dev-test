import { useMemo, useState } from "react";
import clsx from "clsx";
import PageHeader from "../components/PageHeader.jsx";
import Panel from "../components/ui/Panel.jsx";
import Button from "../components/ui/Button.jsx";
import Select from "../components/ui/Select.jsx";
import Checkbox from "../components/ui/Checkbox.jsx";
import { projects } from "../data/mockData.js";

const statusClass = {
  Blocked: "font-bold text-[#b42318]",
  Active: "font-bold text-[#047857]",
  Paused: "font-bold text-[#b54708]",
};

export default function Projects({ search }) {
  const [status, setStatus] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState([]);

  const visible = useMemo(() => {
    let rows = projects;
    if (status !== "All")
      rows = rows.filter((project) => project.status === status);
    rows = rows.filter((project) =>
      project.name.toLowerCase().includes((search || "").toLowerCase()),
    );
    return rows.sort((a, b) =>
      sortAsc ? a.budget - b.budget : b.budget - a.budget,
    );
  }, [status, sortAsc, search]);

  function toggle(id) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="Manage project status, ownership, deadlines, and budget."
      />
      <Panel className="mb-4 flex flex-wrap items-center gap-3">
        <Select
          className="w-auto min-w-[140px]"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
          <option>Paused</option>
        </Select>
        <Button variant="secondary" onClick={() => setSortAsc(!sortAsc)}>
          Sort by budget ({sortAsc ? "low to high" : "high to low"})
        </Button>
        <span className="text-sm text-[#667085] dark:text-slate-400">
          {selected.length} selected
        </span>
      </Panel>
      <Panel className="overflow-auto">
        {visible.length === 0 ? (
          <p className="m-0 text-[#667085] dark:text-slate-400">
            No projects match your filters.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  <span className="sr-only">Select</span>
                </th>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  Name
                </th>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  Owner
                </th>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  Status
                </th>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  Budget
                </th>
                <th className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                  Due
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((project) => (
                <tr
                  key={project.id}
                  className={clsx(
                    "transition-colors hover:bg-brand/5",
                    project.status === "Blocked" &&
                      "bg-[#fff1f3] dark:bg-[#3f1d2a]",
                  )}
                  aria-label={
                    project.status === "Blocked"
                      ? `${project.name}, blocked`
                      : undefined
                  }
                >
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    <Checkbox
                      checked={selected.includes(project.id)}
                      onChange={() => toggle(project.id)}
                      aria-label={`Select ${project.name}`}
                    />
                  </td>
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    {project.name}
                  </td>
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    {project.owner}
                  </td>
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    <span className={statusClass[project.status] ?? "font-bold"}>
                      {project.status}
                    </span>
                  </td>
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    £{project.budget.toLocaleString()}
                  </td>
                  <td className="border-b border-gray-200 px-3.5 py-3.5 text-left dark:border-slate-700">
                    {project.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
