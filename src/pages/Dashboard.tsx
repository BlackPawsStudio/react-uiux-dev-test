import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Modal from "../components/ui/Modal";
import { projects, invoices } from "../data/mockData";
import { useSearch } from "../contexts/SearchContext";

export default function Dashboard() {
  const search = useSearch();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(
    "Review blocked work, confirm invoices, and update client-facing status.",
  );
  const searchTerm = search.toLowerCase();

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
          <Button onClick={() => setOpen(true)} className="mt-4">
            Create summary
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_0.9fr]">
        <Panel>
          <h2 className="text-xl font-bold">Project health</h2>
          <div>
            {filtered.length === 0 ? (
              <p className="m-0 text-[#667085] dark:text-slate-400">
                No projects match your search.
              </p>
            ) : (
              filtered.map((project) => (
                <div
                  key={project.id}
                  className="my-3.5 grid grid-cols-1 items-center gap-3 sm:grid-cols-[180px_1fr_50px]"
                >
                  <span>{project.name}</span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
                    <i
                      className="block h-full bg-brand"
                      style={{ width: `${project.health}%` }}
                    />
                  </div>
                  <b>{project.health}%</b>
                </div>
              ))
            )}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-xl font-bold">Today</h2>
          <form
            className="grid gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="dashboard-notes" className="block font-semibold">
              Notes
            </label>
            <Textarea
              id="dashboard-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </form>
        </Panel>
      </div>
      <Modal
        title="Generate summary"
        description="Name your summary and generate a snapshot of current operations data."
        open={open}
        onClose={() => setOpen(false)}
      >
        <Input placeholder="Summary name" aria-label="Summary name" />
        <Button>Generate</Button>
      </Modal>
    </>
  );
}
