import PageHeader from "../components/PageHeader.jsx";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="Error"
      title="Page not found"
      description="The page you requested does not exist. Use the sidebar to return to a valid section."
    />
  );
}
