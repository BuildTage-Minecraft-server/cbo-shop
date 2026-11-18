"use client";

import { useEffect, useState } from "react";
import { refinePlatform } from "../lib/platform";
import type { DetectedPlatform } from "../lib/platform";

export function usePlatform(initial: DetectedPlatform): DetectedPlatform {
  const [platform, setPlatform] = useState(initial);

  useEffect(() => {
    let active = true;
    refinePlatform(initial).then((next) => {
      if (active) setPlatform(next);
    });
    return () => {
      active = false;
    };
  }, [initial]);

  return platform;
}
