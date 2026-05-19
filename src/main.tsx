import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./styles/tailwind.css";
import { routeTree } from "./routeTree.gen";

function migrateLegacyHashPath() {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return;
  const pathOnly = raw.split("?")[0] || "/";
  const normalized =
    pathOnly === "/"
      ? "/"
      : pathOnly.startsWith("/")
        ? pathOnly.replace(/\/+$/, "") || "/"
        : `/${pathOnly}`;
  window.history.replaceState(null, "", normalized);
}

migrateLegacyHashPath();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element #root not found");
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
