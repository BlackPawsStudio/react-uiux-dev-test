import { z } from "zod";

export const billingSchema = z.object({
  discount: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === "") return true;
        const parsed = Number(value);
        return Number.isFinite(parsed) && parsed >= 0;
      },
      { message: "Enter a valid non-negative number." },
    ),
});

export type BillingValues = z.infer<typeof billingSchema>;

export function parseDiscount(value: string): number {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
