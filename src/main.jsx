import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/sections.css";
import "./styles/print.css";
import App from "./App.jsx";
import { resolveRoute } from "./seo/site.js";

const root = document.getElementById("root");
const path = window.location.pathname;
const app = (
  <StrictMode>
    <App initialPath={path} />
  </StrictMode>
);

// Production pages are pre-rendered (scripts/prerender.mjs). Hydrate only when
// the HTML was built for the page this URL shows; if a host served some other
// page as a fallback, or in dev (empty root), render from scratch instead.
const same = (a, b) => {
  const x = resolveRoute(a);
  const y = resolveRoute(b);
  return x.page.id === y.page.id && x.projectId === y.projectId;
};
const builtFor = root.dataset.route;

if (root.hasChildNodes() && builtFor && same(builtFor, path)) hydrateRoot(root, app);
else {
  root.replaceChildren();
  createRoot(root).render(app);
}
