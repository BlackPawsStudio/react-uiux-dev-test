import clsx from "clsx";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "min-h-[180px] w-full rounded-[18px] border border-[#d0d5dd] bg-white px-3.5 py-3 text-ink placeholder:text-slate-400 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500",
        className,
      )}
      {...rest}
    />
  );
});

export default Textarea;
