import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";

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
      <section className="panel settings-form">
        <label>
          Company name
          <input
            value={settings.company}
            onChange={(event) =>
              setSettings({ ...settings, company: event.target.value })
            }
          />
        </label>
        <label>
          Timezone
          <select
            value={settings.timezone}
            onChange={(event) =>
              setSettings({ ...settings, timezone: event.target.value })
            }
          >
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
          </select>
        </label>
        <label className="checkbox-line">
          <input
            type="checkbox"
            checked={settings.emails}
            onChange={(event) =>
              setSettings({ ...settings, emails: event.target.checked })
            }
          />
          Send email reports
        </label>
        <label>
          Density
          <select
            value={settings.density}
            onChange={(event) =>
              setSettings({ ...settings, density: event.target.value })
            }
          >
            <option>Compact</option>
            <option>Comfortable</option>
            <option>Spacious</option>
          </select>
        </label>
        <button type="button" className="primary-btn" onClick={save}>
          Save settings
        </button>
        {saved && (
          <p className="toast" role="status" aria-live="polite">
            Settings saved.
          </p>
        )}
      </section>
    </>
  );
}
