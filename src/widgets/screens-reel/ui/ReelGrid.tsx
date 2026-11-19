"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib";

export function ReelGrid({ images, alt }: { images: readonly string[]; alt: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const featured = images.length % 3 === 0;

  const open = (index: number) => {
    setCurrent(index);
    dialog.current?.showModal();
  };

  const step = useCallback(
    (delta: number) => setCurrent((value) => (value + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const node = dialog.current;
    if (!node) return undefined;

    const onKey = (event: KeyboardEvent) => {
      if (!node.open) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {images.map((src, index) => (
          <li key={src} className={cn(featured && index === 0 && "sm:col-span-2 md:row-span-2")}>
            <button
              type="button"
              onClick={() => open(index)}
              aria-label={`${alt}, ${index + 1}. Открыть крупнее`}
              className="group relative block aspect-video size-full overflow-hidden border border-line-strong bg-surface"
            >
              <Image
                src={src}
                alt={`${alt}, ${index + 1}`}
                fill
                sizes={featured && index === 0 ? "(min-width: 768px) 760px, 100vw" : "(min-width: 768px) 370px, 50vw"}
                className="object-cover transition duration-300 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto max-h-[92dvh] w-[min(1280px,94vw)] border border-line-strong bg-ink p-0 text-fg backdrop:bg-black/85"
      >
        <div className="relative aspect-video w-full">
          <Image src={images[current]} alt={`${alt}, ${current + 1}`} fill sizes="94vw" className="object-contain" />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 text-sm text-muted">
          <span>
            {current + 1} / {images.length}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} className="btn btn--secondary">
              Назад
            </button>
            <button type="button" onClick={() => step(1)} className="btn btn--secondary">
              Вперёд
            </button>
            <button type="button" onClick={() => dialog.current?.close()} className="btn btn--primary">
              Закрыть
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
