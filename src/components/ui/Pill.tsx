import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export type PillTone = "neutral" | "success" | "danger" | "warning" | "info";

const tones: Record<PillTone, string> = {
  neutral: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  success: "bg-[#dcfae6] text-[#067647]",
  danger: "bg-[#fee4e2] text-[#b42318]",
  warning: "bg-[#fef0c7] text-[#b54708]",
  info: "bg-[#e0e7ff] text-[#3730a3]",
};

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: PillTone;
  children?: ReactNode;
}

export default function Pill({
  tone = "neutral",
  className,
  children,
  ...rest
}: PillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-extrabold",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
