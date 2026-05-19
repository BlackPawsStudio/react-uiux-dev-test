import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { projects } from "../data/mockData.js";

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
      <section className="toolbar panel">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Blocked</option>
          <option>Paused</option>
        </select>
        <button type="button" onClick={() => setSortAsc(!sortAsc)}>
          Sort by budget ({sortAsc ? "low to high" : "high to low"})
        </button>
        <span>{selected.length} selected</span>
      </section>
      <section className="panel table-wrap">
        {visible.length === 0 ? (
          <p className="empty-state">No projects match your filters.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Owner</th>
                <th scope="col">Status</th>
                <th scope="col">Budget</th>
                <th scope="col">Due</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((project) => (
                <tr
                  key={project.id}
                  className={project.status === "Blocked" ? "danger-row" : ""}
                  aria-label={
                    project.status === "Blocked"
                      ? `${project.name}, blocked`
                      : undefined
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(project.id)}
                      onChange={() => toggle(project.id)}
                      aria-label={`Select ${project.name}`}
                    />
                  </td>
                  <td>{project.name}</td>
                  <td>{project.owner}</td>
                  <td>
                    <span
                      className={`status-text status-${project.status.toLowerCase()}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td>£{project.budget}</td>
                  <td>{project.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
