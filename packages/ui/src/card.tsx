import { type ReactNode } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className="ui-bg-slate-900 p-2 ui-rounded-2xl">
      <h2 className="ui-pb-2 ui-mb-2 ui-text-2xl ui-font-semibold ui-border-b ui-border-slate-600">
        {title}
      </h2>
      <div className="ui-m-0">
        {children}
      </div>
    </div>
  );
}