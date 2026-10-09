// Build step 3 of 3 (see "build" in package.json).
// Renders every route to static HTML so search engines and AI crawlers, most
// of which don't run JavaScript, receive the full content, per-page head
// tags and JSON-LD. Also writes sitemap.xml, robots.txt and llms.txt.

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadEnv } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, pageMeta, jsonLd, ROUTES, NOT_FOUND_PATH, SITE, sitemapXml, robotsTxt, llmsTxt } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const env = loadEnv("production", root, "");
const today = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// The template hard-codes a placeholder origin for the dev server; swap in
// SITE_URL from src/data/meta.js so the domain is configured in one place.
const template = readFileSync(join(dist, "index.html"), "utf8").replaceAll("https://mohammed-imad.vercel.app", SITE);

function headFor(route) {
  const m = pageMeta(route);
  const url = `${SITE}${m.path}`;
  const ld = JSON.stringify(jsonLd(route, { dateModified: today })).replace(/</g, "\\u003c");
  const verify = [
    env.VITE_GOOGLE_SITE_VERIFICATION && `<meta name="google-site-verification" content="${esc(env.VITE_GOOGLE_SITE_VERIFICATION)}" />`,
    env.VITE_BING_SITE_VERIFICATION && `<meta name="msvalidate.01" content="${esc(env.VITE_BING_SITE_VERIFICATION)}" />`,
  ].filter(Boolean);
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    ...verify,
    `<script type="application/ld+json">${ld}</script>`,
  ].join("\n    ");
}

function page(route) {
  const noindex = !!pageMeta(route).noindex;
  let head = headFor(route);
  if (noindex) head += '\n    <meta name="robots" content="noindex" />';
  const html = render(route);
  return template
    .replace(/<!--seo:start[\s\S]*?<!--seo:end-->/, head)
    .replace(/<meta name="robots" content="index[^>]*>\n?\s*/, noindex ? "" : (m) => m)
    // data-route lets the client check this HTML was built for the URL it's
    // being served at before hydrating (hosts may fall back to another page).
    .replace('<div id="root"></div>', `<div id="root" data-route="${route}">${html}</div>`);
}

const out = (rel, content) => {
  const file = join(dist, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

for (const route of ROUTES) {
  out(join(route, "index.html"), page(route));
  console.log(`prerendered ${route}`);
}
out("404.html", page(NOT_FOUND_PATH));
out("sitemap.xml", sitemapXml(today));
out("robots.txt", robotsTxt());
out("llms.txt", llmsTxt());
rmSync(ssrDir, { recursive: true, force: true });
console.log(`wrote sitemap.xml, robots.txt, llms.txt, 404.html for ${SITE}`);
