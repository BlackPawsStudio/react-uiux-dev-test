import { z } from "zod";

export const timezoneSchema = z.enum([
  "Europe/London",
  "America/New_York",
  "Asia/Tokyo",
]);

export const densitySchema = z.enum(["Compact", "Comfortable", "Spacious"]);

export const settingsSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .max(80, "Company name must be 80 characters or fewer."),
  timezone: timezoneSchema,
  emails: z.boolean(),
  density: densitySchema,
});

export type Timezone = z.infer<typeof timezoneSchema>;
export type Density = z.infer<typeof densitySchema>;
export type SettingsValues = z.infer<typeof settingsSchema>;

export const defaultSettings: SettingsValues = {
  company: "Northstar",
  timezone: "Europe/London",
  emails: true,
  density: "Comfortable",
};
