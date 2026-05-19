import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { invoices } from "../data/mockData.js";

export default function Billing() {
  const [rows, setRows] = useState(invoices);
  const [discount, setDiscount] = useState("");

  const discountValue = discount === "" ? 0 : Number(discount);
  const discountInvalid =
    discount !== "" && (!Number.isFinite(discountValue) || discountValue < 0);

  const subtotal = useMemo(
    () => rows.reduce((sum, row) => sum + row.amount, 0),
    [rows],
  );
  const total = discountInvalid
    ? subtotal
    : Math.max(0, subtotal - discountValue);

  return (
    <>
      <PageHeader
        eyebrow="Finance"
        title="Billing"
        description="Invoices, payment state, and discount calculations."
      />
      <section className="panel billing-summary">
        <label>
          Discount
          <input
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            placeholder="500"
            inputMode="decimal"
            aria-invalid={discountInvalid}
            aria-describedby={discountInvalid ? "discount-error" : undefined}
          />
        </label>
        {discountInvalid && (
          <p id="discount-error" className="field-error" role="alert">
            Enter a valid non-negative number.
          </p>
        )}
        <strong>Total: £{total.toLocaleString()}</strong>
      </section>
      <div className="invoice-list">
        {rows.map((invoice) => (
          <article className="invoice-card" key={invoice.id}>
            <div>
              <h3>{invoice.id}</h3>
              <p>{invoice.client}</p>
            </div>
            <strong>£{invoice.amount.toLocaleString()}</strong>
            <span className={invoice.paid ? "pill paid" : "pill unpaid"}>
              <span className="sr-only">Payment status: </span>
              {invoice.paid ? "Paid" : "Due"}
            </span>
            <button
              type="button"
              onClick={() =>
                setRows(
                  rows.map((row) =>
                    row.id === invoice.id ? { ...row, paid: !row.paid } : row,
                  ),
                )
              }
              aria-label={`Mark ${invoice.id} as ${invoice.paid ? "unpaid" : "paid"}`}
            >
              {invoice.paid ? "Mark unpaid" : "Mark paid"}
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
