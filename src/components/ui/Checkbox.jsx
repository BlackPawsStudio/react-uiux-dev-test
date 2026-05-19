import clsx from "clsx";
import { forwardRef } from "react";
import { Check } from "lucide-react";

const Checkbox = forwardRef(function Checkbox(
  { className, label, labelClassName, id, ...rest },
  ref,
) {
  const control = (
    <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={clsx(
          "peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 bg-white transition-colors hover:border-slate-400 checked:border-brand checked:bg-brand disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-950",
          className,
        )}
        {...rest}
      />
      <Check
        size={14}
        strokeWidth={3}
        className="pointer-events-none relative text-white opacity-0 peer-checked:opacity-100"
      />
    </span>
  );

  if (!label) return control;

  return (
    <label
      className={clsx(
        "inline-flex cursor-pointer items-center gap-2 select-none",
        labelClassName,
      )}
      htmlFor={id}
    >
      {control}
      <span>{label}</span>
    </label>
  );
});

export default Checkbox;
