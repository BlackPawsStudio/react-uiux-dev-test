import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";

const priorities = ["Low", "Medium", "High"];

export default function Support() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Client cannot export report",
      priority: "High",
      resolved: false,
    },
    {
      id: 2,
      title: "Invoice duplicate after refresh",
      priority: "Medium",
      resolved: false,
    },
    {
      id: 3,
      title: "Mobile menu overlaps content",
      priority: "Low",
      resolved: false,
    },
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
    setTickets([
      { id: Date.now(), title: trimmed, priority, resolved: false },
      ...tickets,
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
      <article className="panel support-intro">
        <h2>How tickets work</h2>
        <p>
          Use the composer below to log a new issue. Each ticket is triaged by
          priority so the team can respond in the right order.
        </p>
        <ul>
          <li>
            <strong>High</strong> — production outages or blocked revenue.
          </li>
          <li>
            <strong>Medium</strong> — degraded experience with a workaround.
          </li>
          <li>
            <strong>Low</strong> — polish, questions, or non-urgent
            improvements.
          </li>
        </ul>
      </article>
      <section className="panel ticket-composer">
        <input
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (titleError) setTitleError("");
          }}
          placeholder="New ticket title"
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? "ticket-title-error" : undefined}
        />
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          aria-label="Priority"
        >
          {priorities.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button type="button" onClick={addTicket}>
          Add ticket
        </button>
        {titleError && (
          <p id="ticket-title-error" className="field-error" role="alert">
            {titleError}
          </p>
        )}
      </section>
      <section className="ticket-list" aria-live="polite">
        {tickets.map((ticket) => (
          <article
            className={ticket.resolved ? "ticket ticket--resolved" : "ticket"}
            key={ticket.id}
          >
            {editingId === ticket.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  aria-label="Edit ticket title"
                />
                <button type="button" onClick={() => saveEdit(ticket.id)}>
                  Save
                </button>
              </>
            ) : (
              <strong>{ticket.title}</strong>
            )}
            <span
              className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
            >
              {ticket.priority}
              {ticket.resolved ? " · Resolved" : ""}
            </span>
            <div className="ticket-actions">
              {editingId !== ticket.id && (
                <button type="button" onClick={() => startEdit(ticket)}>
                  Edit
                </button>
              )}
              {!ticket.resolved && (
                <button type="button" onClick={() => resolveTicket(ticket.id)}>
                  Resolve
                </button>
              )}
              <button type="button" onClick={() => deleteTicket(ticket.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
