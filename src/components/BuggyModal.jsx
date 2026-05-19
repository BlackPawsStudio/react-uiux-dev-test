import { useEffect, useId } from "react";

export default function BuggyModal({
  title,
  description,
  children,
  open,
  onClose,
}) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    if (!open) return undefined;
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
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        <h2 id={titleId}>{title}</h2>
        {description && (
          <p id={descriptionId} className="modal-description">
            {description}
          </p>
        )}
        {children}
      </section>
    </div>
  );
}
