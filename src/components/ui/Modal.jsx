import { useEffect, useId } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import Button from "./Button.jsx";

export default function Modal({
  title,
  description,
  children,
  open,
  onClose,
  className,
}) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-30 grid place-items-center bg-slate-900/60 dark:bg-slate-900/80 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(event) => event.stopPropagation()}
        className={clsx(
          "relative w-full max-w-[520px] rounded-[28px] bg-white p-7 text-ink shadow-2xl dark:bg-slate-900 dark:text-slate-100 dark:border-brand dark:border",
          className,
        )}
      >
        <Button
          variant="icon"
          className="absolute right-4 top-4 h-9 w-9 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={16} />
        </Button>
        <h2 id={titleId} className="mt-0 mb-2 text-xl font-bold">
          {title}
        </h2>
        {description && (
          <p
            id={descriptionId}
            className="mb-4 text-sm text-slate-500 dark:text-slate-400"
          >
            {description}
          </p>
        )}
        <div className="grid gap-3">{children}</div>
      </section>
    </div>
  );
}
