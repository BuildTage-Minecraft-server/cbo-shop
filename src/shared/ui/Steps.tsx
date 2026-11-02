import type { ReactNode } from "react";
import { cn } from "@/shared/lib";

export type StepItem = {
  title: string;
  text: string;
  extra?: ReactNode;
};

export function Steps({ items, columns = 3 }: { items: readonly StepItem[]; columns?: 3 | 4 }) {
  return (
    <ol className={cn("grid gap-10", columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-line-strong pt-6">
          <span className="font-display text-5xl font-bold leading-none text-accent">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-wide text-white">{item.title}</h3>
          <p className="mt-3 leading-7 text-body">{item.text}</p>
          {item.extra ? <div className="mt-5">{item.extra}</div> : null}
        </li>
      ))}
    </ol>
  );
}
