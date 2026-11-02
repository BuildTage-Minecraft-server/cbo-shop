"use client";

import { useState } from "react";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="inline-flex max-w-full items-stretch border border-line-strong bg-surface">
      <div className="min-w-0 px-4 py-2.5">
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="truncate font-display text-xl font-semibold tracking-wide text-white">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="border-l border-line-strong px-4 font-display text-sm font-semibold uppercase tracking-wider text-accent transition hover:bg-surface-2"
      >
        {copied ? "Скопировано" : "Копировать"}
      </button>
    </div>
  );
}
