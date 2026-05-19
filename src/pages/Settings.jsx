import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Panel from "../components/ui/Panel.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Checkbox from "../components/ui/Checkbox.jsx";
import { Field, FieldLabel } from "../components/ui/Field.jsx";

const defaultSettings = {
  company: "Northstar",
  timezone: "Europe/London",
  emails: true,
  density: "Comfortable",
};

function loadSettings() {
  try {
    const stored = localStorage.getItem("settings");
    return stored
      ? { ...defaultSettings, ...JSON.parse(stored) }
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(loadSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  function save() {
    localStorage.setItem("settings", JSON.stringify(settings));
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Settings"
        description="Company preferences with intentionally inconsistent form behavior."
      />
      <Panel className="grid max-w-[720px] gap-5">
        <Field>
          <FieldLabel>Company name</FieldLabel>
          <Input
            value={settings.company}
            onChange={(event) =>
              setSettings({ ...settings, company: event.target.value })
            }
          />
        </Field>
        <Field>
          <FieldLabel>Timezone</FieldLabel>
          <Select
            value={settings.timezone}
            onChange={(event) =>
              setSettings({ ...settings, timezone: event.target.value })
            }
          >
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </Select>
        </Field>
        <Checkbox
          label="Send email reports"
          checked={settings.emails}
          onChange={(event) =>
            setSettings({ ...settings, emails: event.target.checked })
          }
        />
        <Field>
          <FieldLabel>Density</FieldLabel>
          <Select
            value={settings.density}
            onChange={(event) =>
              setSettings({ ...settings, density: event.target.value })
            }
          >
            <option>Compact</option>
            <option>Comfortable</option>
            <option>Spacious</option>
          </Select>
        </Field>
        <div className="flex items-center gap-3">
          <Button onClick={save}>Save settings</Button>
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
      </Panel>
    </>
  );
}
