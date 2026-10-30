export const ACCENTS = ["blue", "pink", "green", "orange", "yellow", "red", "purple", "cyan"] as const;

export type Accent = (typeof ACCENTS)[number];
