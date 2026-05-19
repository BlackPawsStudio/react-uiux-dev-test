import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "h-12 rounded-[14px] border-0 bg-brand px-4 text-white hover:opacity-90",
  secondary:
    "h-12 rounded-[14px] border border-slate-300 bg-white px-4 text-ink hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost:
    "h-10 rounded-[14px] border-0 bg-transparent px-3 text-inherit hover:bg-black/5 dark:hover:bg-white/5",
  danger:
    "h-12 rounded-[14px] border-0 bg-[#b42318] px-4 text-white hover:opacity-90",
  icon:
    "h-10 w-10 rounded-full border-0 bg-transparent text-inherit hover:bg-black/5 dark:hover:bg-white/10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children?: ReactNode;
}

export default function Button({
  variant = "primary",
  type = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
