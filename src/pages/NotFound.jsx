import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="Error"
        title="Page not found"
        description="The page you requested does not exist. Use the sidebar to return to a valid section."
        action={
          <Button
            variant="secondary"
            onClick={() => {
              window.history.pushState(null, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            Back to dashboard
          </Button>
        }
      />
    </>
  );
}
