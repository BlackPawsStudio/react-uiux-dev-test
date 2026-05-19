import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import PageHeader from "../components/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Checkbox from "../components/ui/Checkbox";
import { Field, FieldLabel } from "../components/ui/Field";
import {
  FormFieldErrors,
  hasErrors,
} from "../components/ui/form/FormFieldErrors";
import {
  defaultSettings,
  settingsSchema,
  type Density,
  type SettingsValues,
  type Timezone,
} from "../schemas/settings";

function loadSettings(): SettingsValues {
  try {
    const stored = localStorage.getItem("settings");
    if (!stored) return defaultSettings;
    const parsed = settingsSchema.safeParse({
      ...defaultSettings,
      ...(JSON.parse(stored) as Partial<SettingsValues>),
    });
    return parsed.success ? parsed.data : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const form = useForm({
    defaultValues: loadSettings(),
    validators: { onChange: settingsSchema, onSubmit: settingsSchema },
    onSubmit: ({ value }) => {
      localStorage.setItem("settings", JSON.stringify(value));
      setSaved(true);
    },
  });

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Settings"
        description="Company preferences validated with a shared Zod schema."
      />
      <Panel className="max-w-[720px]">
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field name="company">
            {(field) => (
              <Field>
                <FieldLabel>Company name</FieldLabel>
                <Input
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={hasErrors(field)}
                  aria-describedby={
                    hasErrors(field) ? `${field.name}-error` : undefined
                  }
                />
                <FormFieldErrors field={field} id={`${field.name}-error`} />
              </Field>
            )}
          </form.Field>

          <form.Field name="timezone">
            {(field) => (
              <Field>
                <FieldLabel>Timezone</FieldLabel>
                <Select
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value as Timezone)
                  }
                  onBlur={field.handleBlur}
                >
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </Select>
                <FormFieldErrors field={field} />
              </Field>
            )}
          </form.Field>

          <form.Field name="emails">
            {(field) => (
              <Checkbox
                label="Send email reports"
                checked={field.state.value}
                onChange={(event) => field.handleChange(event.target.checked)}
                onBlur={field.handleBlur}
              />
            )}
          </form.Field>

          <form.Field name="density">
            {(field) => (
              <Field>
                <FieldLabel>Density</FieldLabel>
                <Select
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.target.value as Density)
                  }
                  onBlur={field.handleBlur}
                >
                  <option value="Compact">Compact</option>
                  <option value="Comfortable">Comfortable</option>
                  <option value="Spacious">Spacious</option>
                </Select>
                <FormFieldErrors field={field} />
              </Field>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Saving…" : "Save settings"}
                </Button>
                {saved && (
                  <p
                    className="m-0 rounded-[14px] bg-[#ecfdf3] px-3 py-2 text-sm text-[#067647] dark:bg-[#14532d] dark:text-[#dcfce7]"
                    role="status"
                    aria-live="polite"
                  >
                    Settings saved.
                  </p>
                )}
              </div>
            )}
          </form.Subscribe>
        </form>
      </Panel>
    </>
  );
}
