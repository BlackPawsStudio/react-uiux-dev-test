import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  ShoppingBag,
  CreditCard,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import "./styles/global.scss";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Team from "./pages/Team.jsx";
import Reports from "./pages/Reports.jsx";
import Billing from "./pages/Billing.jsx";
import SettingsPage from "./pages/Settings.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";

const routes = [
  { path: "/", label: "Dashboard", icon: Home, component: Dashboard },
  {
    path: "/projects",
    label: "Projects",
    icon: ShoppingBag,
    component: Projects,
  },
  { path: "/team", label: "Team", icon: Users, component: Team },
  { path: "/reports", label: "Reports", icon: BarChart3, component: Reports },
  { path: "/billing", label: "Billing", icon: CreditCard, component: Billing },
  {
    path: "/settings",
    label: "Settings",
    icon: Settings,
    component: SettingsPage,
  },
  { path: "/support", label: "Support", icon: HelpCircle, component: Support },
];

const SEARCHABLE_PATHS = new Set(["/", "/projects", "/team"]);

function normalizePath(path) {
  const pathOnly = (path || "/").split("?")[0] || "/";
  if (pathOnly === "/") return "/";
  return pathOnly.startsWith("/")
    ? pathOnly.replace(/\/+$/, "") || "/"
    : `/${pathOnly}`;
}

function readPath() {
  return normalizePath(window.location.pathname);
}

function readLegacyHashPath() {
  const raw = window.location.hash.replace("#", "");
  if (!raw) return null;
  return normalizePath(raw);
}

function App() {
  const [path, setPath] = useState(() => {
    const legacy = readLegacyHashPath();
    if (legacy) {
      window.history.replaceState(null, "", legacy);
      return legacy;
    }
    return readPath();
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [globalSearch, setGlobalSearch] = useState("");
  const mainRef = useRef(null);

  function navigate(nextPath) {
    const normalized = normalizePath(nextPath);
    if (normalized !== window.location.pathname) {
      window.history.pushState(null, "", normalized);
    }
    setPath(normalized);
  }

  useEffect(() => {
    const onPopState = () => setPath(readPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    mainRef.current?.focus();
  }, [path]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const currentRoute = useMemo(() => {
    return routes.find((route) => route.path === path);
  }, [path]);

  const Page = currentRoute?.component ?? NotFound;
  const showSearch = SEARCHABLE_PATHS.has(path);

  useEffect(() => {
    if (!showSearch) setGlobalSearch("");
  }, [showSearch]);

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
      <aside className={clsx("sidebar", sidebarOpen && "sidebar--open")}>
        <div className="brand-block">
          <div className="brand-logo">N</div>
          <div>
            <strong>Northstar</strong>
            <span>Ops Console</span>
          </div>
          <button
            className="icon-only close-mobile"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <a
                key={route.path}
                className={clsx("nav-item", path === route.path && "active")}
                href={route.path}
                aria-current={path === route.path ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(route.path);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{route.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <p>Candidate task</p>
          <small>
            Find and fix UX, CSS, routing, state, and accessibility issues.
          </small>
        </div>
      </aside>

      <main className="main-area" ref={mainRef} tabIndex={-1}>
        <header className="topbar">
          <button
            className="icon-only menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
          >
            <Menu size={20} />
          </button>
          {showSearch ? (
            <div className="search-box">
              <input
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          ) : (
            <div className="topbar-spacer" />
          )}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </button>
        </header>
        <section className="page-frame">
          <Page {...(showSearch ? { search: globalSearch } : {})} />
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
