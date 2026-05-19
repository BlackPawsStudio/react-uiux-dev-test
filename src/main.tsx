import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
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
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import "./styles/tailwind.css";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";
import SettingsPage from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

interface PageProps {
  search?: string;
}

interface Route {
  path: string;
  label: string;
  icon: LucideIcon;
  component: ComponentType<PageProps>;
}

const routes: Route[] = [
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

const SEARCHABLE_PATHS = new Set<string>(["/", "/projects", "/team"]);

type Theme = "light" | "dark";

function normalizePath(path: string | null | undefined): string {
  const pathOnly = (path || "/").split("?")[0] || "/";
  if (pathOnly === "/") return "/";
  return pathOnly.startsWith("/")
    ? pathOnly.replace(/\/+$/, "") || "/"
    : `/${pathOnly}`;
}

function readPath(): string {
  return normalizePath(window.location.pathname);
}

function readLegacyHashPath(): string | null {
  const raw = window.location.hash.replace("#", "");
  if (!raw) return null;
  return normalizePath(raw);
}

function App() {
  const [path, setPath] = useState<string>(() => {
    const legacy = readLegacyHashPath();
    if (legacy) {
      window.history.replaceState(null, "", legacy);
      return legacy;
    }
    return readPath();
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) ?? "light",
  );
  const [globalSearch, setGlobalSearch] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  function navigate(nextPath: string) {
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
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const currentRoute = useMemo(
    () => routes.find((route) => route.path === path),
    [path],
  );

  const Page: ComponentType<PageProps> = currentRoute?.component ?? NotFound;
  const showSearch = SEARCHABLE_PATHS.has(path);

  useEffect(() => {
    if (!showSearch) setGlobalSearch("");
  }, [showSearch]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[15] cursor-pointer border-0 bg-slate-900/45 p-0 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
      <aside
        className={clsx(
          "z-20 flex flex-col gap-6 bg-gray-900 p-6 text-white",
          "lg:sticky lg:top-0 lg:h-screen",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-[290px] max-lg:-translate-x-[120%] max-lg:transition-transform max-lg:duration-200 motion-reduce:transition-none",
          sidebarOpen && "max-lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-[42px] w-[42px] place-items-center rounded-[14px] bg-gradient-to-br from-violet-600 to-cyan-500 font-black">
            N
          </div>
          <div>
            <strong>Northstar</strong>
            <span className="block text-gray-400">Ops Console</span>
          </div>
          <Button
            variant="icon"
            className="ml-auto text-white hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </Button>
        </div>
        <nav className="grid gap-2" aria-label="Main navigation">
          {routes.map((route) => {
            const Icon = route.icon;
            const active = path === route.path;
            return (
              <a
                key={route.path}
                className={clsx(
                  "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-gray-300 no-underline transition-colors hover:bg-white/10 hover:text-white",
                  active && "bg-white/10 text-white",
                )}
                href={route.path}
                aria-current={active ? "page" : undefined}
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
        <div className="mt-auto rounded-[18px] border border-white/10 p-4">
          <p className="m-0">Candidate task</p>
          <small className="block text-gray-400">
            Find and fix UX, CSS, routing, state, and accessibility issues.
          </small>
        </div>
      </aside>

      <main className="min-w-0" ref={mainRef} tabIndex={-1}>
        <header className="sticky top-0 z-[5] flex h-[76px] items-center gap-4 bg-white/70 px-4 backdrop-blur-md lg:px-7 dark:bg-slate-900/75">
          <Button
            variant="icon"
            className="lg:hidden justify-start"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
          >
            <Menu size={20} />
          </Button>
          <div className="min-w-0 flex-1">
            {showSearch && (
              <Input
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                placeholder="Search..."
                aria-label="Search"
              />
            )}
          </div>
          <Button
            variant="primary"
            className="whitespace-nowrap max-[520px]:px-3 max-[520px]:py-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
        </header>
        <section className="p-[18px] lg:p-[30px]">
          <Page {...(showSearch ? { search: globalSearch } : {})} />
        </section>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");
createRoot(rootElement).render(<App />);
