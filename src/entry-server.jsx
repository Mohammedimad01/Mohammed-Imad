import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Used only by scripts/prerender.mjs at build time.
export function render(url) {
  return renderToString(
    <StrictMode>
      <App initialPath={url} />
    </StrictMode>
  );
}

export { pageMeta, jsonLd, ROUTES, NOT_FOUND_PATH, SITE, sitemapXml, robotsTxt, llmsTxt } from "./seo/site.js";
