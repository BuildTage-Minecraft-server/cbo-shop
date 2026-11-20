"use client";

import { useEffect } from "react";

const MAX_STAGGER = 7;
const STEP_MS = 70;

function isGroup(el: Element) {
  if (el.tagName === "UL" || el.tagName === "OL") return true;
  return getComputedStyle(el).display === "grid";
}

function collect(root: ParentNode) {
  const targets: HTMLElement[] = [];

  root.querySelectorAll<HTMLElement>("main > section, main > div").forEach((section) => {
    const container = Array.from(section.children).find(
      (child): child is HTMLElement => child instanceof HTMLElement && !child.hasAttribute("aria-hidden"),
    );
    if (!container) return;

    Array.from(container.children).forEach((item, index) => {
      if (!(item instanceof HTMLElement)) return;
      if (item.hasAttribute("aria-hidden")) return;
      item.style.setProperty("--d", `${Math.min(index, MAX_STAGGER) * STEP_MS}ms`);
      targets.push(item);

      if (item.children.length > 1 && isGroup(item)) {
        Array.from(item.children).forEach((child, i) => {
          if (!(child instanceof HTMLElement)) return;
          child.style.setProperty("--d", `${Math.min(i, MAX_STAGGER) * STEP_MS + 80}ms`);
          targets.push(child);
        });
        targets.splice(targets.indexOf(item), 1);
      }
    });
  });

  return targets;
}

export function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = collect(document);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.classList.add("is-visible");
          const settle = () => {
            el.classList.remove("motion-hidden", "is-visible");
            el.style.removeProperty("--d");
          };
          el.addEventListener("transitionend", settle, { once: true });
          window.setTimeout(settle, 1400);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => {
      el.classList.add("motion-hidden");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
