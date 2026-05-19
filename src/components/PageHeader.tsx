import type { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-4 flex flex-col items-start justify-between gap-4 max-[520px]:block sm:flex-row sm:items-end">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </span>
        <h1 className="my-1.5 text-[clamp(2rem,4vw,3.25rem)] tracking-tighter">
          {title}
        </h1>
        {description && (
          <p className="m-0 max-w-[760px] text-[#667085] dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
