import { z } from "zod";

export const usernameSchema = z.string().regex(/^[A-Za-z0-9_]{3,16}$/);
export const passwordSchema = z.string().min(8).max(128);
