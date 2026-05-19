import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import BuggyModal from "../components/BuggyModal.jsx";
import { projects, invoices } from "../data/mockData.js";

export default function Dashboard({ search }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(
    "Review blocked work, confirm invoices, and update client-facing status.",
  );
  const searchTerm = (search || "").toLowerCase();
  const totalBudget = useMemo(
    () => projects.reduce((sum, project) => sum + project.budget, 0),
    [],
  );
  const unpaid = invoices
    .filter((invoice) => !invoice.paid)
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const avgHealth = useMemo(
    () =>
      Math.round(
        projects.reduce((sum, project) => sum + project.health, 0) /
          projects.length,
      ),
    [],
  );
  const filtered = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm),
  );

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Executive Dashboard"
        description="A compact operations dashboard with many hidden UI and state issues for candidates to improve."
        action={
          <button
            type="button"
            className="primary-btn"
            onClick={() => setOpen(true)}
          >
            Create summary
          </button>
        }
      />
      <div className="stats-grid">
        <StatCard label="Active projects" value={projects.length} trend={12} />
        <StatCard
          label="Total budget"
          value={`£${totalBudget.toLocaleString()}`}
          trend={-4}
        />
        <StatCard
          label="Unpaid invoices"
          value={`£${unpaid.toLocaleString()}`}
          trend={8}
        />
        <StatCard label="Avg health" value={`${avgHealth}%`} trend={-11} />
      </div>
      <div className="content-grid two-col">
        <section className="panel oversized-panel">
          <h2>Project health</h2>
          <div className="health-list">
            {filtered.length === 0 ? (
              <p className="empty-state">No projects match your search.</p>
            ) : (
              filtered.map((project) => (
                <div className="health-row" key={project.id}>
                  <span>{project.name}</span>
                  <div className="health-bar">
                    <i style={{ width: `${project.health}%` }} />
                  </div>
                  <b>{project.health}%</b>
                </div>
              ))
            )}
          </div>
        </section>
        <section className="panel notes-panel">
          <h2>Today</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label htmlFor="dashboard-notes">Notes</label>
            <textarea
              id="dashboard-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </form>
        </section>
      </div>
      <BuggyModal
        title="Generate summary"
        description="Name your summary and generate a snapshot of current operations data."
        open={open}
        onClose={() => setOpen(false)}
      >
        <input placeholder="Summary name" aria-label="Summary name" />
        <button type="button" className="primary-btn">
          Generate
        </button>
      </BuggyModal>
    </>
  );
}
