import { useMemo, useState } from "react";
import clsx from "clsx";
import PageHeader from "../components/PageHeader.jsx";
import { team } from "../data/mockData.js";

export default function Team({ search }) {
  const [members, setMembers] = useState(team);
  const [showInactive, setShowInactive] = useState(false);
  const searchTerm = (search || "").toLowerCase();

  const visible = useMemo(() => {
    return members.filter((member) => {
      const matchesActive = showInactive || member.active;
      const haystack =
        `${member.name} ${member.role} ${member.location}`.toLowerCase();
      const matchesSearch = haystack.includes(searchTerm);
      return matchesActive && matchesSearch;
    });
  }, [members, showInactive, searchTerm]);

  function removeMember(id) {
    const member = members.find((item) => item.id === id);
    if (!member) return;
    if (!window.confirm(`Remove ${member.name} from the team?`)) return;
    setMembers((current) => current.filter((item) => item.id !== id));
  }

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Team capacity"
        description="Review active team members and workload balance."
      />
      <label className="toggle-row panel">
        <input
          type="checkbox"
          checked={showInactive}
          onChange={(event) => setShowInactive(event.target.checked)}
        />
        Show inactive
      </label>
      <div className="card-grid">
        {visible.map((member) => {
          const overCapacity = member.capacity > 100;
          const barWidth = Math.min(member.capacity, 100);
          return (
            <article className="person-card" key={member.id}>
              <div className="avatar">{member.name[0]}</div>
              <div>
                <h3>{member.name}</h3>
                <p>
                  {member.role} · {member.location}
                </p>
                <div
                  className={clsx("meter", overCapacity && "meter--warning")}
                >
                  <span style={{ width: `${barWidth}%` }} />
                </div>
                <small
                  className={overCapacity ? "capacity-warning" : undefined}
                >
                  {member.capacity}% allocated
                  {overCapacity ? " (over capacity)" : ""}
                </small>
              </div>
              <button type="button" onClick={() => removeMember(member.id)}>
                Remove
              </button>
            </article>
          );
        })}
      </div>
    </>
  );
}
