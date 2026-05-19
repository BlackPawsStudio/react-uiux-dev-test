import { z } from "zod";

export const prioritySchema = z.enum(["Low", "Medium", "High"]);

export const ticketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Enter a ticket title.")
    .max(120, "Title must be 120 characters or fewer."),
  priority: prioritySchema,
});

export const ticketEditSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title cannot be empty.")
    .max(120, "Title must be 120 characters or fewer."),
});

export type Priority = z.infer<typeof prioritySchema>;
export type TicketValues = z.infer<typeof ticketSchema>;
export type TicketEditValues = z.infer<typeof ticketEditSchema>;
