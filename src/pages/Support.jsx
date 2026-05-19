import { useState } from "react";
import clsx from "clsx";
import PageHeader from "../components/PageHeader.jsx";
import Panel from "../components/ui/Panel.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import { FieldError } from "../components/ui/Field.jsx";

const priorities = ["Low", "Medium", "High"];

const priorityClass = {
  High: "font-bold text-[#b42318]",
  Medium: "font-bold text-[#b54708]",
  Low: "font-bold text-[#067647]",
};

export default function Support() {
  const [tickets, setTickets] = useState([
    { id: 1, title: "Client cannot export report", priority: "High", resolved: false },
    { id: 2, title: "Invoice duplicate after refresh", priority: "Medium", resolved: false },
    { id: 3, title: "Mobile menu overlaps content", priority: "Low", resolved: false },
  ]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  function addTicket() {
    const trimmed = title.trim();
    if (!trimmed) {
      setTitleError("Enter a ticket title.");
      return;
    }
    setTitleError("");
    setTickets((current) => [
      { id: Date.now(), title: trimmed, priority, resolved: false },
      ...current,
    ]);
    setTitle("");
    setPriority("Low");
  }

  function startEdit(ticket) {
    setEditingId(ticket.id);
    setEditTitle(ticket.title);
  }

  function saveEdit(id) {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, title: trimmed } : ticket,
      ),
    );
    setEditingId(null);
    setEditTitle("");
  }

  function resolveTicket(id) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, resolved: true } : ticket,
      ),
    );
  }

  function deleteTicket(id) {
    setTickets((current) => current.filter((ticket) => ticket.id !== id));
  }

  return (
    <>
      <PageHeader
        eyebrow="Helpdesk"
        title="Support"
        description="Ticket creation and filtering page."
      />
      <Panel as="article" className="mb-4">
        <h2 className="text-xl font-bold">How tickets work</h2>
        <p className="m-0">
          Use the composer below to log a new issue. Each ticket is triaged by
          priority so the team can respond in the right order.
        </p>
        <ul className="mt-2 list-disc pl-5">
          <li>
            <strong>High</strong> — production outages or blocked revenue.
          </li>
          <li>
            <strong>Medium</strong> — degraded experience with a workaround.
          </li>
          <li>
            <strong>Low</strong> — polish, questions, or non-urgent improvements.
          </li>
        </ul>
      </Panel>
      <Panel className="mb-4">
        <form
          className="flex flex-wrap items-start gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            addTicket();
          }}
        >
          <Input
            className="min-w-[160px] flex-1"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (titleError) setTitleError("");
            }}
            placeholder="New ticket title"
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? "ticket-title-error" : undefined}
          />
          <Select
            className="w-auto min-w-[140px]"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            aria-label="Priority"
          >
            {priorities.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </Select>
          <Button type="submit">Add ticket</Button>
        </form>
        <FieldError id="ticket-title-error" className="mt-2">
          {titleError}
        </FieldError>
      </Panel>
      <section className="grid gap-3" aria-live="polite">
        {tickets.map((ticket) => (
          <Panel
            as="article"
            key={ticket.id}
            className={clsx(
              "grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto]",
              ticket.resolved && "opacity-70",
            )}
          >
            {editingId === ticket.id ? (
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  className="min-w-[160px] flex-1"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  aria-label="Edit ticket title"
                />
                <Button onClick={() => saveEdit(ticket.id)}>Save</Button>
              </div>
            ) : (
              <strong>{ticket.title}</strong>
            )}
            <span
              className={clsx(
                priorityClass[ticket.priority] ?? "font-bold",
                "text-sm",
              )}
            >
              {ticket.priority}
              {ticket.resolved ? " · Resolved" : ""}
            </span>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              {editingId !== ticket.id && (
                <Button variant="secondary" onClick={() => startEdit(ticket)}>
                  Edit
                </Button>
              )}
              {!ticket.resolved && (
                <Button
                  variant="secondary"
                  onClick={() => resolveTicket(ticket.id)}
                >
                  Resolve
                </Button>
              )}
              <Button variant="danger" onClick={() => deleteTicket(ticket.id)}>
                Delete
              </Button>
            </div>
          </Panel>
        ))}
      </section>
    </>
  );
}
