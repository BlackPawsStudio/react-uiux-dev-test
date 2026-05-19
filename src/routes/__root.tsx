import { useEffect, useRef, useState } from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
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
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import NotFound from "../pages/NotFound";
import { SearchProvider } from "../contexts/SearchContext";

interface NavRoute {
  path: "/" | "/projects" | "/team" | "/reports" | "/billing" | "/settings" | "/support";
  label: string;
  icon: LucideIcon;
}

const navRoutes: NavRoute[] = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/projects", label: "Projects", icon: ShoppingBag },
  { path: "/team", label: "Team", icon: Users },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/billing", label: "Billing", icon: CreditCard },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/support", label: "Support", icon: HelpCircle },
];

const SEARCHABLE_PATHS = new Set<string>(["/", "/projects", "/team"]);

type Theme = "light" | "dark";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const location = useLocation();
  const path = location.pathname;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme | null) ?? "light",
  );
  const [globalSearch, setGlobalSearch] = useState("");
  const mainRef = useRef<HTMLElement>(null);

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
          {navRoutes.map((route) => {
            const Icon = route.icon;
            const baseClass =
              "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-gray-300 no-underline transition-colors hover:bg-white/10 hover:text-white";
            return (
              <Link
                key={route.path}
                to={route.path}
                className={baseClass}
                activeOptions={{ exact: true }}
                activeProps={{
                  className: clsx(baseClass, "bg-white/10 text-white"),
                  "aria-current": "page",
                }}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{route.label}</span>
              </Link>
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
          <SearchProvider value={showSearch ? globalSearch : ""}>
            <Outlet />
          </SearchProvider>
        </section>
      </main>
    </div>
  );
}
