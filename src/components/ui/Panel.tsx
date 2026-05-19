import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type PanelOwnProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
};

export type PanelProps<T extends ElementType = "section"> = PanelOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PanelOwnProps<T>>;

export default function Panel<T extends ElementType = "section">({
  as,
  className,
  children,
  ...rest
}: PanelProps<T>) {
  const Component = (as ?? "section") as ElementType;
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
