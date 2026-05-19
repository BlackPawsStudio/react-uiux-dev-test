export type ProjectStatus = "Active" | "Blocked" | "Paused";

export interface Project {
  id: number;
  name: string;
  owner: string;
  status: ProjectStatus;
  budget: number;
  due: string;
  health: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  capacity: number;
  location: string;
  active: boolean;
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  paid: boolean;
  due: string;
}

export interface ReportRow {
  month: string;
  revenue: number;
  churn: number;
  users: number;
}

export const projects: Project[] = [
  { id: 1, name: "Apollo Redesign", owner: "Mina", status: "Active", budget: 42000, due: "2026-05-22", health: 81 },
  { id: 2, name: "Atlas Checkout", owner: "Jon", status: "Blocked", budget: 18000, due: "2026-04-30", health: 22 },
  { id: 3, name: "Nimbus Analytics", owner: "Sofia", status: "Active", budget: 56000, due: "2026-07-12", health: 62 },
  { id: 4, name: "Pilot Mobile", owner: "Raj", status: "Paused", budget: 9300, due: "2026-06-04", health: 47 },
  { id: 5, name: "Beacon Onboarding", owner: "Leah", status: "Active", budget: 21000, due: "2026-06-16", health: 73 },
  { id: 6, name: "Orbit CRM", owner: "Mina", status: "Blocked", budget: 33000, due: "2026-05-18", health: 34 },
];

export const team: TeamMember[] = [
  { id: 1, name: "Mina Patel", role: "Designer", capacity: 85, location: "London", active: true },
  { id: 2, name: "Jon Bell", role: "Frontend", capacity: 107, location: "Berlin", active: true },
  { id: 3, name: "Sofia Grant", role: "Product", capacity: 64, location: "Madrid", active: false },
  { id: 4, name: "Raj Kumar", role: "Backend", capacity: 76, location: "Remote", active: true },
  { id: 5, name: "Leah Stone", role: "QA", capacity: 31, location: "Dublin", active: false },
];

export const invoices: Invoice[] = [
  { id: "INV-1001", client: "Acme Ltd", amount: 12400, paid: true, due: "2026-05-03" },
  { id: "INV-1002", client: "Bright Labs", amount: 8800, paid: false, due: "2026-05-15" },
  { id: "INV-1003", client: "Cloudline", amount: 18100, paid: false, due: "2026-05-20" },
  { id: "INV-1004", client: "Northwind", amount: 3300, paid: true, due: "2026-04-28" },
];

export const reportRows: ReportRow[] = [
  { month: "Jan", revenue: 43000, churn: 3.2, users: 1200 },
  { month: "Feb", revenue: 51000, churn: 4.6, users: 1310 },
  { month: "Mar", revenue: 48000, churn: 2.9, users: 1490 },
  { month: "Apr", revenue: 62000, churn: 7.1, users: 1620 },
  { month: "May", revenue: 39000, churn: 5.8, users: 1580 },
];
