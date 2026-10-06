import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { projectIdFromPath } from "./seo/site.js";

// Used only by scripts/prerender.mjs at build time.
export function render(url) {
  return renderToString(
    <StrictMode>
      <App initialProjectId={projectIdFromPath(url)} />
    </StrictMode>
  );
}

export { pageMeta, jsonLd, projectIdFromPath, ROUTES, SITE, sitemapXml, robotsTxt, llmsTxt } from "./seo/site.js";
