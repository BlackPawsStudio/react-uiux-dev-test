import { useState } from "react";
import clsx from "clsx";
import { useForm } from "@tanstack/react-form";
import PageHeader from "../components/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import {
  FormFieldErrors,
  hasErrors,
} from "../components/ui/form/FormFieldErrors";
import {
  prioritySchema,
  ticketEditSchema,
  ticketSchema,
  type Priority,
  type TicketValues,
} from "../schemas/ticket";

interface Ticket {
  id: number;
  title: string;
  priority: Priority;
  resolved: boolean;
}

const priorities: Priority[] = prioritySchema.options;

const priorityClass: Record<Priority, string> = {
  High: "font-bold text-[#b42318]",
  Medium: "font-bold text-[#b54708]",
  Low: "font-bold text-[#067647]",
};

const initialTickets: Ticket[] = [
  { id: 1, title: "Client cannot export report", priority: "High", resolved: false },
  { id: 2, title: "Invoice duplicate after refresh", priority: "Medium", resolved: false },
  { id: 3, title: "Mobile menu overlaps content", priority: "Low", resolved: false },
];

const defaultTicket: TicketValues = { title: "", priority: "Low" };

export default function Support() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [editingId, setEditingId] = useState<number | null>(null);

  const addForm = useForm({
    defaultValues: defaultTicket,
    validators: { onChange: ticketSchema, onSubmit: ticketSchema },
    onSubmit: ({ value, formApi }) => {
      setTickets((current) => [
        {
          id: Date.now(),
          title: value.title.trim(),
          priority: value.priority,
          resolved: false,
        },
        ...current,
      ]);
      formApi.reset();
    },
  });

  function resolveTicket(id: number) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, resolved: true } : ticket,
      ),
    );
  }

  function deleteTicket(id: number) {
    setTickets((current) => current.filter((ticket) => ticket.id !== id));
  }

  function saveEdit(id: number, title: string) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, title } : ticket,
      ),
    );
    setEditingId(null);
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
            event.stopPropagation();
            void addForm.handleSubmit();
          }}
        >
          <addForm.Field name="title">
            {(field) => (
              <div className="flex min-w-[160px] flex-1 flex-col gap-1">
                <Input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="New ticket title"
                  aria-invalid={hasErrors(field)}
                  aria-describedby={
                    hasErrors(field) ? "ticket-title-error" : undefined
                  }
                />
                <FormFieldErrors field={field} id="ticket-title-error" />
              </div>
            )}
          </addForm.Field>
          <addForm.Field name="priority">
            {(field) => (
              <Select
                className="w-auto min-w-[140px]"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.target.value as Priority)
                }
                onBlur={field.handleBlur}
                aria-label="Priority"
              >
                {priorities.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            )}
          </addForm.Field>
          <addForm.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                Add ticket
              </Button>
            )}
          </addForm.Subscribe>
        </form>
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
              <TicketEditForm
                initialTitle={ticket.title}
                onCancel={() => setEditingId(null)}
                onSave={(title) => saveEdit(ticket.id, title)}
              />
            ) : (
              <strong>{ticket.title}</strong>
            )}
            <span className={clsx(priorityClass[ticket.priority], "text-sm")}>
              {ticket.priority}
              {ticket.resolved ? " · Resolved" : ""}
            </span>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              {editingId !== ticket.id && (
                <Button
                  variant="secondary"
                  onClick={() => setEditingId(ticket.id)}
                >
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

interface TicketEditFormProps {
  initialTitle: string;
  onSave: (title: string) => void;
  onCancel: () => void;
}

function TicketEditForm({ initialTitle, onSave, onCancel }: TicketEditFormProps) {
  const form = useForm({
    defaultValues: { title: initialTitle },
    validators: { onChange: ticketEditSchema, onSubmit: ticketEditSchema },
    onSubmit: ({ value }) => onSave(value.title.trim()),
  });

  return (
    <form
      className="flex flex-wrap items-start gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="title">
        {(field) => (
          <div className="flex min-w-[160px] flex-1 flex-col gap-1">
            <Input
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              aria-label="Edit ticket title"
              aria-invalid={hasErrors(field)}
              aria-describedby={
                hasErrors(field) ? `edit-title-error-${field.name}` : undefined
              }
            />
            <FormFieldErrors
              field={field}
              id={`edit-title-error-${field.name}`}
            />
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <Button type="submit" disabled={!canSubmit}>
            Save
          </Button>
        )}
      </form.Subscribe>
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}
