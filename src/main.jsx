import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/sections.css";
import "./styles/print.css";
import App from "./App.jsx";
import { projectIdFromPath } from "./seo/site.js";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App initialProjectId={projectIdFromPath(window.location.pathname)} />
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs), so hydrate them;
// the dev server serves an empty root, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
