import clsx from "clsx";

export default function Panel({
  as: Component = "section",
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={clsx(
        "rounded-3xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
