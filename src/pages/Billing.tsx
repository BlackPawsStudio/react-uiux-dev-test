import { useMemo, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form";
import PageHeader from "../components/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Pill from "../components/ui/Pill";
import { Field, FieldLabel } from "../components/ui/Field";
import {
  FormFieldErrors,
  hasErrors,
} from "../components/ui/form/FormFieldErrors";
import { invoices, type Invoice } from "../data/mockData";
import { billingSchema, parseDiscount } from "../schemas/billing";

export default function Billing() {
  const [rows, setRows] = useState<Invoice[]>(invoices);

  const form = useForm({
    defaultValues: { discount: "" },
    validators: { onChange: billingSchema },
  });

  const discountValue = useStore(form.store, (state) => state.values.discount);

  const subtotal = useMemo(
    () => rows.reduce((sum, row) => sum + row.amount, 0),
    [rows],
  );
  const total = Math.max(0, subtotal - parseDiscount(discountValue));

  return (
    <>
      <PageHeader
        eyebrow="Finance"
        title="Billing"
        description="Invoices, payment state, and discount calculations."
      />
      <Panel className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <form.Field name="discount">
          {(field) => (
            <Field className="min-w-[200px]">
              <FieldLabel>Discount</FieldLabel>
              <Input
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="500"
                inputMode="decimal"
                aria-invalid={hasErrors(field)}
                aria-describedby={
                  hasErrors(field) ? "discount-error" : undefined
                }
              />
              <FormFieldErrors field={field} id="discount-error" />
            </Field>
          )}
        </form.Field>
        <strong className="text-xl">Total: £{total.toLocaleString()}</strong>
      </Panel>
      <div className="grid gap-3">
        {rows.map((invoice) => (
          <Panel
            as="article"
            key={invoice.id}
            className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_120px_90px_auto]"
          >
            <div>
              <h3 className="m-0 text-base font-semibold">{invoice.id}</h3>
              <p className="m-0 text-sm text-[#667085] dark:text-slate-400">
                {invoice.client}
              </p>
            </div>
            <strong>£{invoice.amount.toLocaleString()}</strong>
            <Pill tone={invoice.paid ? "success" : "danger"}>
              <span className="sr-only">Payment status: </span>
              {invoice.paid ? "Paid" : "Due"}
            </Pill>
            <Button
              variant="secondary"
              onClick={() =>
                setRows((current) =>
                  current.map((row) =>
                    row.id === invoice.id ? { ...row, paid: !row.paid } : row,
                  ),
                )
              }
              aria-label={`Mark ${invoice.id} as ${invoice.paid ? "unpaid" : "paid"}`}
            >
              {invoice.paid ? "Mark unpaid" : "Mark paid"}
            </Button>
          </Panel>
        ))}
      </div>
    </>
  );
}
