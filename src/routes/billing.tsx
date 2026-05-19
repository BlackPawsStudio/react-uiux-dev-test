import { createFileRoute } from "@tanstack/react-router";
import Billing from "../pages/Billing";

export const Route = createFileRoute("/billing")({
  component: Billing,
});
