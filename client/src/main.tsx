import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initSentry } from "./lib/sentry";
import { initPostHog } from "./lib/posthog";

// Initialize error monitoring and analytics
initSentry();
initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
