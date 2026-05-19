import { useMemo, useState } from "react";
import clsx from "clsx";
import PageHeader from "../components/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";
import { team, type TeamMember } from "../data/mockData";

export interface TeamProps {
  search?: string;
}

export default function Team({ search }: TeamProps) {
  const [members, setMembers] = useState<TeamMember[]>(team);
  const [showInactive, setShowInactive] = useState(false);
  const searchTerm = (search ?? "").toLowerCase();

  const visible = useMemo(() => {
    return members.filter((member) => {
      const matchesActive = showInactive || member.active;
      const haystack =
        `${member.name} ${member.role} ${member.location}`.toLowerCase();
      return matchesActive && haystack.includes(searchTerm);
    });
  }, [members, showInactive, searchTerm]);

  function removeMember(id: number) {
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
      <Panel className="mb-4 px-4 py-3">
        <Checkbox
          label="Show inactive"
          checked={showInactive}
          onChange={(event) => setShowInactive(event.target.checked)}
        />
      </Panel>
      {visible.length === 0 ? (
        <Panel>
          <p className="m-0 text-[#667085] dark:text-slate-400">
            No team members match your filters.
          </p>
        </Panel>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((member) => {
            const overCapacity = member.capacity > 100;
            const barWidth = Math.min(member.capacity, 100);
            return (
              <Panel
                as="article"
                key={member.id}
                className="grid grid-cols-[56px_1fr_auto] items-center gap-3.5"
              >
                <div className="grid h-[52px] w-[52px] place-items-center rounded-[18px] bg-violet-200 font-black text-violet-900">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="m-0 text-lg font-semibold">{member.name}</h3>
                  <p className="m-0 text-sm text-[#667085] dark:text-slate-400">
                    {member.role} · {member.location}
                  </p>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
                    <span
                      className={clsx(
                        "block h-full",
                        overCapacity ? "bg-[#b42318]" : "bg-brand",
                      )}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <small
                    className={clsx(
                      "mt-1 block text-xs",
                      overCapacity
                        ? "font-bold text-[#b42318]"
                        : "text-[#667085] dark:text-slate-400",
                    )}
                  >
                    {member.capacity}% allocated
                    {overCapacity ? " (over capacity)" : ""}
                  </small>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => removeMember(member.id)}
                >
                  Remove
                </Button>
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}
