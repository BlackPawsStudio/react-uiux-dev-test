import clsx from "clsx";

export function Field({ className, children, ...rest }) {
  return (
    <label className={clsx("grid gap-3", className)} {...rest}>
      {children}
    </label>
  );
}

export function FieldLabel({ className, children, ...rest }) {
  return (
    <span
      className={clsx("text-sm font-semibold text-ink dark:text-slate-200", className)}
      {...rest}
    >
      {children}
    </span>
  );
}

export function FieldError({ id, className, children, ...rest }) {
  if (!children) return null;
  return (
    <p
      id={id}
      role="alert"
      className={clsx("m-0 text-sm text-[#b42318]", className)}
      {...rest}
    >
      {children}
    </p>
  );
}
