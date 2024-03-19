import { ErrorBoundary } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="flex flex-col gap-2">
      <p>Something went wrong</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button className="mx-auto border p-2 border-black max-w-40" onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default fallbackRender;