import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "h-12 w-full rounded-[14px] border border-[#d0d5dd] bg-white px-3.5 text-ink placeholder:text-slate-400 disabled:opacity-60 aria-[invalid=true]:border-[#b42318] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500",
        className,
      )}
      {...rest}
    />
  );
});

export default Input;
