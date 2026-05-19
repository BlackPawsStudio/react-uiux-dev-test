import { z } from "zod";

export const summarySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Give the summary a name.")
    .max(80, "Name must be 80 characters or fewer."),
});

export type SummaryValues = z.infer<typeof summarySchema>;
