import clsx from "clsx";
import { forwardRef, type SelectHTMLAttributes } from "react";

const chevron =
  "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      style={{
        backgroundImage: chevron,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        backgroundSize: "16px",
      }}
      className={clsx(
        "h-12 w-full appearance-none rounded-[14px] border border-[#d0d5dd] bg-white pl-3.5 pr-10 text-ink disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:[&_option]:bg-slate-900 dark:[&_option]:text-slate-50",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
});

export default Select;
